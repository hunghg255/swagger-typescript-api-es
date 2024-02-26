/* eslint-disable indent */
/* eslint-disable unicorn/no-array-callback-reference */
/* eslint-disable unicorn/no-null */
/* eslint-disable valid-typeof */
/* eslint-disable unicorn/no-nested-ternary */

import camelCase from 'lodash/camelCase';
import compact from 'lodash/compact';
import filter from 'lodash/filter';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import keys from 'lodash/keys';
import uniq from 'lodash/uniq';

import { SCHEMA_TYPES } from '../constants';
import { internalCase } from '../util/internal-case';
import { pascalCase } from '../util/pascal-case';

class SchemaUtils {
  /** @type {CodeGenConfig} */
  config;
  /** @type {SchemaComponentsMap} */
  schemaComponentsMap;
  /** @type {TypeNameFormatter} */
  typeNameFormatter;
  /** @type {SchemaWalker} */
  schemaWalker;

  constructor({ config, schemaComponentsMap, typeNameFormatter, schemaWalker }: any) {
    this.config = config;
    this.schemaComponentsMap = schemaComponentsMap;
    this.typeNameFormatter = typeNameFormatter;
    this.schemaWalker = schemaWalker;
  }

  getRequiredProperties = (schema: any) => {
    return uniq((schema && isArray(schema.required) && schema.required) || []);
  };

  isRefSchema = (schema: any) => {
    return !!(schema && schema.$ref);
  };

  getEnumNames = (schema: any) => {
    return (
      schema['x-enumNames'] ||
      schema.xEnumNames ||
      schema['x-enumnames'] ||
      schema['x-enum-varnames']
    );
  };

  getSchemaRefType = (schema: any) => {
    if (!this.isRefSchema(schema)) {
      return undefined;
    }
    // const resolved = this.schemaWalker.findByRef(schema.$ref);
    return this.schemaComponentsMap.get(schema.$ref);
  };

  isPropertyRequired = (name: any, propertySchema: any, rootSchema: any) => {
    if (propertySchema['x-omitempty'] === false) {
      return true;
    }

    const isRequired = isBoolean(propertySchema.required)
      ? !!propertySchema.required
      : isArray(rootSchema.required)
        ? rootSchema.required.includes(name)
        : !!rootSchema.required;

    if (this.config.convertedFromSwagger2) {
      return typeof propertySchema.nullable === this.config.Ts.Keyword.Undefined
        ? isRequired
        : !propertySchema.nullable;
    }
    return isRequired;
  };

  isNullMissingInType = (schema: any, type: any) => {
    const { nullable, type: schemaType } = schema || {};
    return (
      (nullable || !!get(schema, 'x-nullable') || schemaType === this.config.Ts.Keyword.Null) &&
      isString(type) &&
      !type.includes(` ${this.config.Ts.Keyword.Null}`) &&
      !type.includes(`${this.config.Ts.Keyword.Null} `)
    );
  };

  safeAddNullToType = (schema: any, type: any) => {
    if (this.isNullMissingInType(schema, type)) {
      return this.config.Ts.UnionType([type, this.config.Ts.Keyword.Null]);
    }
    return type;
  };

  getSchemaPrimitiveType = (rawSchema: any) => {
    const schema = rawSchema || {};

    if (schema.type) {
      return internalCase(schema.type);
    }
    if (schema.enum) {
      const enumFieldType = typeof schema.enum[0];
      if (enumFieldType === this.config.Ts.Keyword.Undefined) {
        return;
      }

      return internalCase(enumFieldType);
    }
    if (keys(schema.properties).length > 0) {
      return SCHEMA_TYPES.OBJECT;
    }
    if (schema.items) {
      return SCHEMA_TYPES.ARRAY;
    }

    return null;
  };

  checkAndAddRequiredKeys = (schema: any, resultType: any) => {
    if ('$$requiredKeys' in schema && schema.$$requiredKeys.length > 0) {
      this.config.update({
        internalTemplateOptions: {
          addUtilRequiredKeysType: true,
        },
      });
      return this.config.Ts.TypeWithGeneric(this.config.Ts.CodeGenKeyword.UtilRequiredKeys, [
        resultType,
        this.config.Ts.UnionType(schema.$$requiredKeys.map(this.config.Ts.StringValue)),
      ]);
    }

    return resultType;
  };

  makeAddRequiredToChildSchema = (parentSchema: any, childSchema: any) => {
    if (!childSchema) {
      return childSchema;
    }

    const required = uniq([
      ...this.getRequiredProperties(parentSchema),
      ...this.getRequiredProperties(childSchema),
    ]);

    const refData = this.getSchemaRefType(childSchema);

    if (refData) {
      const refObjectProperties = keys(
        (refData.rawTypeData && refData.rawTypeData.properties) || {},
      );
      const existedRequiredKeys = refObjectProperties.filter((key) => required.includes(key));

      if (existedRequiredKeys.length === 0) {
        return childSchema;
      }

      return {
        ...childSchema,
        $$requiredKeys: existedRequiredKeys,
      };
    } else if (childSchema.properties) {
      const childSchemaProperties = keys(childSchema.properties);
      const existedRequiredKeys = childSchemaProperties.filter((key) => required.includes(key));

      if (existedRequiredKeys.length === 0) {
        return childSchema;
      }

      return {
        required: uniq([...this.getRequiredProperties(childSchema), ...existedRequiredKeys]),
        ...childSchema,
      };
    }

    return childSchema;
  };

  filterSchemaContents = (contents: any, filterFn: any) => {
    return uniq(filter(contents, (type) => filterFn(type)));
  };

  resolveTypeName = (
    typeName: any,
    { suffixes, resolver, prefixes, shouldReserve = true }: any,
  ) => {
    return resolver
      ? this.config.componentTypeNameResolver.resolve(null, (reserved: any) => {
          return resolver(pascalCase(typeName), reserved);
        })
      : this.config.componentTypeNameResolver.resolve(
          [
            ...(prefixes || []).map((prefix: any) => pascalCase(`${prefix} ${typeName}`)),
            ...(suffixes || []).map((suffix: any) => pascalCase(`${typeName} ${suffix}`)),
          ],
          shouldReserve,
        );
  };

  getComplexType = (schema: any) => {
    if (schema.oneOf) {
      return SCHEMA_TYPES.COMPLEX_ONE_OF;
    }
    if (schema.allOf) {
      return SCHEMA_TYPES.COMPLEX_ALL_OF;
    }
    if (schema.anyOf) {
      return SCHEMA_TYPES.COMPLEX_ANY_OF;
    }
    // TODO :(
    if (schema.not) {
      return SCHEMA_TYPES.COMPLEX_NOT;
    }

    return SCHEMA_TYPES.COMPLEX_UNKNOWN;
  };

  getInternalSchemaType = (schema: any) => {
    if (!isEmpty(schema.enum) || !isEmpty(this.getEnumNames(schema))) {
      return SCHEMA_TYPES.ENUM;
    }
    if (schema.discriminator) {
      return SCHEMA_TYPES.DISCRIMINATOR;
    }
    if (schema.allOf || schema.oneOf || schema.anyOf || schema.not) {
      return SCHEMA_TYPES.COMPLEX;
    }
    if (!isEmpty(schema.properties)) {
      return SCHEMA_TYPES.OBJECT;
    }
    if (schema.type === SCHEMA_TYPES.ARRAY) {
      return SCHEMA_TYPES.ARRAY;
    }

    return SCHEMA_TYPES.PRIMITIVE;
  };

  getSchemaType = (schema: any) => {
    if (!schema) {
      return this.config.Ts.Keyword.Any;
    }

    const refTypeInfo = this.getSchemaRefType(schema);

    if (refTypeInfo) {
      return this.checkAndAddRequiredKeys(
        schema,
        this.safeAddNullToType(schema, this.typeNameFormatter.format(refTypeInfo.typeName)),
      );
    }

    let resultType;

    if (this.isConstantSchema(schema)) {
      resultType = this.formatJsValue(schema.const);
    } else {
      const primitiveType = this.getSchemaPrimitiveType(schema);

      // eslint-disable-next-line eqeqeq
      if (primitiveType == undefined) {
        return this.config.Ts.Keyword.Any;
      }

      const typeAlias =
        get(this.config.primitiveTypes, [primitiveType, schema.format]) ||
        get(this.config.primitiveTypes, [primitiveType, '$default']) ||
        this.config.primitiveTypes[primitiveType];

      resultType = isFunction(typeAlias) ? typeAlias(schema, this) : typeAlias || primitiveType;
    }

    if (!resultType) {
      return this.config.Ts.Keyword.Any;
    }

    return this.checkAndAddRequiredKeys(schema, this.safeAddNullToType(schema, resultType));
  };

  buildTypeNameFromPath = (schemaPath: any) => {
    schemaPath = uniq(compact(schemaPath));

    if (!schemaPath || !schemaPath[0]) {
      return null;
    }

    return pascalCase(camelCase(uniq([schemaPath[0], schemaPath.at(-1)]).join('_')));
  };

  isConstantSchema(schema: any) {
    return 'const' in schema;
  }

  formatJsValue = (value: any) => {
    switch (typeof value) {
      case 'string': {
        return this.config.Ts.StringValue(value);
      }
      case 'boolean': {
        return this.config.Ts.BooleanValue(value);
      }
      case 'number': {
        return this.config.Ts.NumberValue(value);
      }
      default: {
        if (value === null) {
          return this.config.Ts.NullValue(value);
        }

        return this.config.Ts.Keyword.Any;
      }
    }
  };
}

export { SchemaUtils };
