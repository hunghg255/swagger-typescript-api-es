import {
  camelCase,
  compact,
  filter,
  isArray,
  isBoolean,
  isEmpty,
  isString,
  keys,
  uniq,
} from 'es-toolkit/compat';

import { SCHEMA_TYPES } from '../constants';
import type { SchemaWalker } from '../schema-walker';
import type {
  ExtractingNameResolver,
  PrimitiveTypeFormats,
  PrimitiveTypeStructValue,
  SchemaPath,
} from '../types/config';
import type { SchemaObject } from '../types/openapi';
import type { BaseSchemaType, ComplexSchemaType, SchemaComponent } from '../types/parsed';
import { internalCase } from '../util/internal-case';
import { pascalCase } from '../util/pascal-case';
import { isObjectRecord, isRecord } from '../util/type-guards';
import type {
  SchemaParserComponentsMap,
  SchemaParserConfig,
  SchemaParserTypeNameFormatter,
} from './schema-parser-fabric';

/** keys of `SchemaParser._complexSchemaParsers` (in the same order) */
export const COMPLEX_SCHEMA_TYPES: ComplexSchemaType[] = [
  SCHEMA_TYPES.COMPLEX_ONE_OF,
  SCHEMA_TYPES.COMPLEX_ALL_OF,
  SCHEMA_TYPES.COMPLEX_ANY_OF,
  SCHEMA_TYPES.COMPLEX_NOT,
];

/** `{ $default, "date-time": ... }` struct of a primitive type (not a type alias) */
const isPrimitiveTypeFormats = (
  value: PrimitiveTypeStructValue | PrimitiveTypeFormats | undefined
): value is PrimitiveTypeFormats => isObjectRecord(value);

/** a list of `allOf` / `oneOf` / `anyOf` schemas (`not` is a single schema) */
export const isSchemaList = (
  value: SchemaObject | SchemaObject[] | undefined
): value is SchemaObject[] => Array.isArray(value);

/** dependencies of `SchemaUtils` (a `SchemaParserFabric`) */
export interface SchemaUtilsDeps {
  config: Pick<
    SchemaParserConfig,
    'Ts' | 'primitiveTypes' | 'componentTypeNameResolver' | 'update' | 'convertedFromSwagger2'
  >;
  schemaComponentsMap: Pick<SchemaParserComponentsMap, 'get'>;
  typeNameFormatter: Pick<SchemaParserTypeNameFormatter, 'format'>;
  /** not used yet */
  schemaWalker?: SchemaWalker;
}

/** options of `SchemaUtils.resolveTypeName` */
export interface ResolveTypeNameOptions {
  /** name variants: `<typeName><suffix>` */
  suffixes?: string[];
  /** name variants: `<prefix><typeName>` */
  prefixes?: string[];
  /** custom name resolver (used instead of `suffixes` / `prefixes`) */
  resolver?: ExtractingNameResolver;
  /** reserve the resolved name (default: `true`) */
  shouldReserve?: boolean;
}

class SchemaUtils {
  config: SchemaUtilsDeps['config'];
  schemaComponentsMap: SchemaUtilsDeps['schemaComponentsMap'];
  typeNameFormatter: SchemaUtilsDeps['typeNameFormatter'];
  schemaWalker: SchemaWalker | undefined;

  constructor({ config, schemaComponentsMap, typeNameFormatter, schemaWalker }: SchemaUtilsDeps) {
    this.config = config;
    this.schemaComponentsMap = schemaComponentsMap;
    this.typeNameFormatter = typeNameFormatter;
    this.schemaWalker = schemaWalker;
  }

  getRequiredProperties = (schema: SchemaObject | null | undefined): string[] => {
    return uniq(schema && isArray(schema.required) ? schema.required : []);
  };

  isRefSchema = <T>(schema: T): schema is T & { $ref: string } => {
    return isRecord(schema) && !!schema.$ref;
  };

  getEnumNames = (schema: SchemaObject): string[] | undefined => {
    return (
      schema['x-enumNames'] ||
      schema.xEnumNames ||
      schema['x-enumnames'] ||
      schema['x-enum-varnames']
    );
  };

  /**
   * @returns the referenced component, `null` if it is not found, `undefined` for a non `$ref` schema
   */
  getSchemaRefType = (schema: unknown): SchemaComponent | null | undefined => {
    if (!this.isRefSchema(schema)) {
      return undefined;
    }
    // const resolved = this.schemaWalker.findByRef(schema.$ref);
    return this.schemaComponentsMap.get(schema.$ref);
  };

  isPropertyRequired = (
    name: string,
    propertySchema: SchemaObject,
    rootSchema: SchemaObject
  ): boolean => {
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

  isNullableSchema = (schema: SchemaObject | null | undefined): boolean => {
    const { nullable, type: schemaType } = schema || {};
    return !!(nullable || !!schema?.['x-nullable'] || schemaType === this.config.Ts.Keyword.Null);
  };

  isNullMissingInType = (schema: SchemaObject | null | undefined, type: unknown): boolean => {
    return (
      this.isNullableSchema(schema) &&
      isString(type) &&
      !type.includes(` ${this.config.Ts.Keyword.Null}`) &&
      !type.includes(`${this.config.Ts.Keyword.Null} `)
    );
  };

  /** adds `| null` to the type of a nullable schema (a non-string type is returned as is) */
  safeAddNullToType = <T>(schema: SchemaObject | null | undefined, type: T): T | string => {
    if (isString(type) && this.isNullMissingInType(schema, type)) {
      return this.config.Ts.UnionType([type, this.config.Ts.Keyword.Null]);
    }
    return type;
  };

  /** `internalCase` of the schema type (`"string"`, `"object"`, ...) */
  getSchemaPrimitiveType = (
    rawSchema: SchemaObject | null | undefined
  ): string | null | undefined => {
    const schema = rawSchema || {};

    if (schema.type) {
      // OAS 3.1 type list is joined with commas (as by lodash `lowerCase`)
      return internalCase(String(schema.type));
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

  /** wraps the type into `UtilRequiredKeys<Type, "a" | "b">` if the schema has `$$requiredKeys` */
  checkAndAddRequiredKeys = (schema: SchemaObject, resultType: string): string => {
    const requiredKeys = schema.$$requiredKeys;
    if ('$$requiredKeys' in schema && requiredKeys && requiredKeys.length > 0) {
      this.config.update({
        internalTemplateOptions: {
          addUtilRequiredKeysType: true,
        },
      });
      return this.config.Ts.TypeWithGeneric(this.config.Ts.CodeGenKeyword.UtilRequiredKeys, [
        resultType,
        this.config.Ts.UnionType(requiredKeys.map(this.config.Ts.StringValue)),
      ]);
    }

    return resultType;
  };

  makeAddRequiredToChildSchema = (
    parentSchema: SchemaObject,
    childSchema: SchemaObject | null | undefined
  ): SchemaObject | null | undefined => {
    if (!childSchema) {
      return childSchema;
    }

    const required = uniq([
      ...this.getRequiredProperties(parentSchema),
      ...this.getRequiredProperties(childSchema),
    ]);

    const refData = this.getSchemaRefType(childSchema);

    if (refData) {
      const refRawSchema: SchemaObject = refData.rawTypeData;
      const refObjectProperties = keys((refRawSchema && refRawSchema.properties) || {});
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
        ...childSchema,
        required: uniq([...this.getRequiredProperties(childSchema), ...existedRequiredKeys]),
      };
    }

    return childSchema;
  };

  filterSchemaContents = <T>(
    contents: T[] | null | undefined,
    filterFn: (content: T) => boolean
  ): T[] => {
    return uniq(filter(contents, (type) => filterFn(type)));
  };

  /** resolves a free (not reserved) name of an extracted type */
  resolveTypeName = (
    typeName: string | null | undefined,
    { suffixes, resolver, prefixes, shouldReserve = true }: ResolveTypeNameOptions
  ): string | null => {
    const componentTypeNameResolver = this.config.componentTypeNameResolver;

    return resolver
      ? componentTypeNameResolver.resolve(
          null,
          () =>
            resolver(pascalCase(typeName ?? undefined), componentTypeNameResolver.reservedNames),
          undefined,
          shouldReserve
        )
      : componentTypeNameResolver.resolve(
          [
            ...(prefixes || []).map((prefix) => pascalCase(`${prefix} ${typeName}`)),
            ...(suffixes || []).map((suffix) => pascalCase(`${typeName} ${suffix}`)),
          ],
          undefined,
          undefined,
          shouldReserve
        );
  };

  getComplexType = (
    schema: SchemaObject
  ): ComplexSchemaType | typeof SCHEMA_TYPES.COMPLEX_UNKNOWN => {
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

  /**
   * @returns the first description of the `oneOf` / `allOf` / `anyOf` items
   * (or of the values of the `not` schema, which are iterated like by lodash `map`)
   */
  getComplexSchemaDescription = (schema: SchemaObject): string | undefined => {
    const complexType = this.getComplexType(schema);
    if (complexType === SCHEMA_TYPES.COMPLEX_UNKNOWN) {
      return undefined;
    }
    const children = schema[complexType];
    const descriptions = isSchemaList(children)
      ? // items can be invalid (`null`) in a raw schema
        children.map((child) => child?.description)
      : Object.values(children || {}).map((value) =>
          isRecord(value) && isString(value.description) ? value.description : undefined
        );
    return compact(descriptions)[0];
  };

  getInternalSchemaType = (schema: SchemaObject): BaseSchemaType => {
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

  /** inline TS type of the schema */
  getSchemaType = (schema: SchemaObject | null | undefined): string => {
    if (!schema) {
      return this.config.Ts.Keyword.Any;
    }

    const refTypeInfo = this.getSchemaRefType(schema);

    if (refTypeInfo) {
      // referenced enum with `null` value (e.g. OAS 3.1 `enum: ["a", null]`),
      // `null` can't be a member of TS enum so it is added on the usage side
      const refRawSchema: SchemaObject = refTypeInfo.rawTypeData;
      const isEnumWithNull = isArray(refRawSchema?.enum) && refRawSchema.enum.includes(null);
      return this.checkAndAddRequiredKeys(
        schema,
        this.safeAddNullToType(
          isEnumWithNull ? { ...schema, nullable: true } : schema,
          this.typeNameFormatter.format(refTypeInfo.typeName)
        )
      );
    }

    let resultType: string | undefined;

    if (this.isConstantSchema(schema)) {
      resultType = this.formatJsValue(schema.const);
    } else {
      const primitiveType = this.getSchemaPrimitiveType(schema);

      if (primitiveType == undefined) {
        return this.config.Ts.Keyword.Any;
      }

      const typeStruct = this.config.primitiveTypes[primitiveType];
      const typeFormats = isPrimitiveTypeFormats(typeStruct) ? typeStruct : undefined;
      const typeAlias = typeFormats?.[String(schema.format)] || typeFormats?.$default || typeStruct;

      // a formats struct without the schema format and without `$default` is not a type alias
      resultType =
        typeof typeAlias === 'function'
          ? typeAlias(schema, this)
          : (isString(typeAlias) && typeAlias) || primitiveType;
    }

    if (!resultType) {
      return this.config.Ts.Keyword.Any;
    }

    return this.checkAndAddRequiredKeys(schema, this.safeAddNullToType(schema, resultType));
  };

  buildTypeNameFromPath = (schemaPath: SchemaPath | null | undefined): string | null => {
    const typeNames = uniq(compact(schemaPath));

    if (!typeNames || !typeNames[0]) {
      return null;
    }

    return pascalCase(camelCase(uniq([typeNames[0], typeNames.at(-1)]).join('_')));
  };

  isConstantSchema(schema: SchemaObject) {
    return 'const' in schema;
  }

  /** TS literal type of a JS value (`any` for objects) */
  formatJsValue = (value: unknown): string => {
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
