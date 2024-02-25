/* eslint-disable indent */
/* eslint-disable unicorn/no-array-callback-reference */
/* eslint-disable unicorn/no-null */
/* eslint-disable valid-typeof */
/* eslint-disable unicorn/no-nested-ternary */
import _, { camelCase } from 'lodash';

import { internalCase } from '~src/util/internal-case';
import { pascalCase } from '~src/util/pascal-case';

import { SCHEMA_TYPES } from '../constants';

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
    return _.uniq((schema && _.isArray(schema.required) && schema.required) || []);
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

    const isRequired = _.isBoolean(propertySchema.required)
      ? !!propertySchema.required
      : _.isArray(rootSchema.required)
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
      (nullable || !!_.get(schema, 'x-nullable') || schemaType === this.config.Ts.Keyword.Null) &&
      _.isString(type) &&
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
    if (_.keys(schema.properties).length > 0) {
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

    const required = _.uniq([
      ...this.getRequiredProperties(parentSchema),
      ...this.getRequiredProperties(childSchema),
    ]);

    const refData = this.getSchemaRefType(childSchema);

    if (refData) {
      const refObjectProperties = _.keys(
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
      const childSchemaProperties = _.keys(childSchema.properties);
      const existedRequiredKeys = childSchemaProperties.filter((key) => required.includes(key));

      if (existedRequiredKeys.length === 0) {
        return childSchema;
      }

      return {
        required: _.uniq([...this.getRequiredProperties(childSchema), ...existedRequiredKeys]),
        ...childSchema,
      };
    }

    return childSchema;
  };

  filterSchemaContents = (contents: any, filterFn: any) => {
    return _.uniq(_.filter(contents, (type) => filterFn(type)));
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
    if (!_.isEmpty(schema.enum) || !_.isEmpty(this.getEnumNames(schema))) {
      return SCHEMA_TYPES.ENUM;
    }
    if (schema.discriminator) {
      return SCHEMA_TYPES.DISCRIMINATOR;
    }
    if (schema.allOf || schema.oneOf || schema.anyOf || schema.not) {
      return SCHEMA_TYPES.COMPLEX;
    }
    if (!_.isEmpty(schema.properties)) {
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
        _.get(this.config.primitiveTypes, [primitiveType, schema.format]) ||
        _.get(this.config.primitiveTypes, [primitiveType, '$default']) ||
        this.config.primitiveTypes[primitiveType];

      resultType = _.isFunction(typeAlias) ? typeAlias(schema, this) : typeAlias || primitiveType;
    }

    if (!resultType) {
      return this.config.Ts.Keyword.Any;
    }

    return this.checkAndAddRequiredKeys(schema, this.safeAddNullToType(schema, resultType));
  };

  buildTypeNameFromPath = (schemaPath: any) => {
    schemaPath = _.uniq(_.compact(schemaPath));

    if (!schemaPath || !schemaPath[0]) {
      return null;
    }

    return pascalCase(camelCase(_.uniq([schemaPath[0], schemaPath.at(-1)]).join('_')));
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
