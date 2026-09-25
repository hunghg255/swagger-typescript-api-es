import { cloneDeep } from 'es-toolkit';
import { clone, compact, entries, isArray, isObject, keys, omit, reduce } from 'es-toolkit/compat';

import { SCHEMA_TYPES } from '../../constants';
import type { SchemaObject } from '../../types/openapi';
import type { ParsedComplexSchema, ParsedSchema, SchemaComponent } from '../../types/parsed';
import { MonoSchemaParser } from '../mono-schema-parser';
import { COMPLEX_SCHEMA_TYPES, isSchemaList } from '../schema-utils';

/** the abstract part of a discriminator schema (the schema without `discriminator` and complex keys) */
export interface DiscriminatorAbstractSchemaStruct {
  typeName: string | null;
  component: SchemaComponent;
  content: string;
}

/** `{ mappingKey: "EnumName.EnumKey" }` */
export type MappingPropertySchemaEnumKeysMap = Record<string, string>;

class DiscriminatorSchemaParser extends MonoSchemaParser<ParsedSchema> {
  parse(): ParsedSchema {
    const ts = this.config.Ts;
    const { discriminator, ...noDiscriminatorSchema } = this.schema;

    if (!discriminator?.mapping) {
      return this.schemaParserFabric
        .createSchemaParser({
          schema: noDiscriminatorSchema,
          typeName: this.typeName,
          schemaPath: this.schemaPath,
        })
        .parseSchema();
    }

    // https://github.com/acacode/swagger-typescript-api/issues/456
    // const skipMappingType = !!noDiscriminatorSchema.oneOf;
    const skipMappingType = false;

    const abstractSchemaStruct = this.createAbstractSchemaStruct();
    // const complexSchemaStruct = this.createComplexSchemaStruct();
    const discriminatorSchemaStruct = this.createDiscriminatorSchema({
      skipMappingType,
      abstractSchemaStruct,
    });

    const schemaContent = ts.IntersectionType(
      compact([abstractSchemaStruct?.content, discriminatorSchemaStruct?.content])
    );

    const parsed: ParsedComplexSchema = {
      ...(isObject(this.schema) ? this.schema : {}),
      $schemaPath: [...this.schemaPath],
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.COMPLEX,
      type: SCHEMA_TYPES.PRIMITIVE,
      typeIdentifier: ts.Keyword.Type,
      name: this.typeName,
      description: this.schemaFormatters.formatDescription(this.schema.description),
      content: schemaContent,
    };
    return parsed;
  }

  createDiscriminatorSchema = ({
    skipMappingType,
    abstractSchemaStruct,
  }: {
    skipMappingType: boolean;
    abstractSchemaStruct: DiscriminatorAbstractSchemaStruct | undefined;
  }): { content: string } | undefined => {
    const ts = this.config.Ts;

    // `null` / `undefined` are joined as an empty string
    const refPath = this.schemaComponentsMap.createRef([
      'components',
      'schemas',
      this.typeName ?? '',
    ]);
    const { discriminator } = this.schema;
    // the discriminator parser is used for schemas with `discriminator` only
    if (!discriminator) {
      return undefined;
    }
    const mappingEntries = entries(discriminator.mapping);
    const ableToCreateMappingType =
      !skipMappingType && !!(abstractSchemaStruct?.typeName && mappingEntries.length > 0);
    const mappingContents = [];
    let mappingTypeName: string | undefined;

    /** { mapping_key: SchemaEnum.MappingKey, ... } */
    const mappingPropertySchemaEnumKeysMap = this.createMappingPropertySchemaEnumKeys({
      abstractSchemaStruct,
      discPropertyName: discriminator.propertyName,
    });

    if (ableToCreateMappingType) {
      const rawTypeName = `${abstractSchemaStruct?.typeName}_${discriminator.propertyName}`;
      const generatedTypeName = this.schemaUtils.resolveTypeName(rawTypeName, {
        suffixes: this.config.extractingOptions.discriminatorMappingSuffix,
        resolver: this.config.extractingOptions.discriminatorMappingNameResolver,
      });

      const content = ts.IntersectionType([
        ts.ObjectWrapper(
          ts.TypeField({
            key: ts.StringValue(discriminator.propertyName),
            value: 'Key',
          })
        ),
        'Type',
      ]);

      const component = this.schemaParserFabric.createParsedComponent({
        typeName: generatedTypeName,
        schema: {
          type: 'object',
          properties: {},
          genericArgs: [{ name: 'Key' }, { name: 'Type' }],
          internal: true,
        },
      });

      // the parsed `Record<string, any>` content is replaced by the generic mapping type
      Object.assign(component.typeData, { content });

      mappingTypeName = this.typeNameFormatter.format(component.typeName);
    }

    /** returns (GenericType<"mapping_key", MappingType>) or ({ discriminatorProperty: "mapping_key" } & MappingType) */
    const createMappingContent = (mappingSchema: SchemaObject, mappingKey: string) => {
      const content = this.schemaParserFabric
        .createSchemaParser({
          schema: mappingSchema,
          schemaPath: this.schemaPath,
        })
        .getInlineParseContent();

      const mappingUsageKey =
        mappingPropertySchemaEnumKeysMap[mappingKey] || ts.StringValue(mappingKey);

      return ableToCreateMappingType
        ? ts.TypeWithGeneric(`${mappingTypeName}`, [mappingUsageKey, content])
        : ts.ExpressionGroup(
            ts.IntersectionType([
              ts.ObjectWrapper(
                ts.TypeField({
                  key: discriminator.propertyName,
                  value: mappingUsageKey,
                })
              ),
              content,
            ])
          );
    };

    for (const [mappingKey, schema] of mappingEntries) {
      const mappingSchema: SchemaObject = typeof schema === 'string' ? { $ref: schema } : schema;

      this.mutateMappingDependentSchema({
        discPropertyName: discriminator.propertyName,
        abstractSchemaStruct,
        mappingSchema,
        refPath,
        mappingPropertySchemaEnumKeysMap,
      });

      mappingContents.push(createMappingContent(mappingSchema, mappingKey));
    }

    if (skipMappingType) {
      return undefined;
    }

    const content = ts.ExpressionGroup(ts.UnionType(mappingContents));

    return {
      content,
    };
  };

  createMappingPropertySchemaEnumKeys = ({
    abstractSchemaStruct,
    discPropertyName,
  }: {
    abstractSchemaStruct: DiscriminatorAbstractSchemaStruct | undefined;
    discPropertyName: string;
  }): MappingPropertySchemaEnumKeysMap => {
    const ts = this.config.Ts;

    let mappingPropertySchemaEnumKeysMap: MappingPropertySchemaEnumKeysMap = {};
    const abstractRawSchema: SchemaObject | undefined =
      abstractSchemaStruct?.component?.rawTypeData;
    const mappingPropertySchema = abstractRawSchema?.properties?.[discPropertyName];
    // the discriminator property is an enum component
    const mappingPropertyComponent = this.schemaUtils.isRefSchema(mappingPropertySchema)
      ? this.schemaUtils.getSchemaRefType(mappingPropertySchema)
      : undefined;
    const mappingPropertyRawSchema: SchemaObject | undefined =
      mappingPropertyComponent?.rawTypeData;
    const parsedEnum = mappingPropertyRawSchema?.$parsed;

    if (parsedEnum?.type === SCHEMA_TYPES.ENUM) {
      mappingPropertySchemaEnumKeysMap = reduce(
        parsedEnum.enum,
        (acc: MappingPropertySchemaEnumKeysMap, key, index) => {
          const enumKey = parsedEnum.content[index].key;
          acc[String(key)] = ts.EnumUsageKey(`${parsedEnum.typeName}`, enumKey);
          return acc;
        },
        {}
      );
    }

    return mappingPropertySchemaEnumKeysMap;
  };

  mutateMappingDependentSchema = ({
    discPropertyName,
    abstractSchemaStruct,
    mappingSchema,
    refPath,
    mappingPropertySchemaEnumKeysMap,
  }: {
    discPropertyName: string;
    abstractSchemaStruct: DiscriminatorAbstractSchemaStruct | undefined;
    mappingSchema: SchemaObject;
    refPath: string;
    mappingPropertySchemaEnumKeysMap: MappingPropertySchemaEnumKeysMap;
  }): void => {
    const abstractRef = abstractSchemaStruct?.component?.$ref;
    // override parent dependencies
    if (mappingSchema.$ref && abstractRef) {
      const mappingRefSchema: SchemaObject | undefined =
        this.schemaUtils.getSchemaRefType(mappingSchema)?.rawTypeData;
      if (mappingRefSchema) {
        for (const schemaKey of COMPLEX_SCHEMA_TYPES) {
          const childSchemas = mappingRefSchema[schemaKey];
          if (isSchemaList(childSchemas)) {
            const mappedChildSchemas = childSchemas.map((schema): SchemaObject => {
              if (schema.$ref === refPath) {
                return {
                  ...schema,
                  $ref: abstractRef,
                };
              }
              if (this.schemaUtils.getInternalSchemaType(schema) === SCHEMA_TYPES.OBJECT) {
                const properties = schema.properties || {};
                for (const schemaPropertyName in properties) {
                  const schemaProperty = properties[schemaPropertyName];
                  if (
                    schemaPropertyName === discPropertyName &&
                    this.schemaUtils.getInternalSchemaType(schemaProperty) === SCHEMA_TYPES.ENUM &&
                    isArray(schemaProperty.enum) &&
                    schemaProperty.enum.length === 1 &&
                    mappingPropertySchemaEnumKeysMap[String(schemaProperty.enum[0])]
                  ) {
                    properties[schemaPropertyName] = this.schemaParserFabric.createSchema({
                      content: mappingPropertySchemaEnumKeysMap[String(schemaProperty.enum[0])],
                    });
                  }
                }
              }
              return schema;
            });
            // `not` is a single schema (an array is mapped too)
            Object.assign(mappingRefSchema, { [schemaKey]: mappedChildSchemas });
          }
        }
      }
    }
  };

  createAbstractSchemaStruct = (): DiscriminatorAbstractSchemaStruct | undefined => {
    const schema = omit(clone(this.schema), ['discriminator', ...COMPLEX_SCHEMA_TYPES]);
    const schemaIsAny =
      this.schemaParserFabric.getInlineParseContent(cloneDeep(schema)) ===
      this.config.Ts.Keyword.Any;
    const schemaIsEmpty = keys(schema).length === 0;

    if (schemaIsEmpty || schemaIsAny) {
      return undefined;
    }

    const typeName = this.schemaUtils.resolveTypeName(this.typeName, {
      prefixes: this.config.extractingOptions.discriminatorAbstractPrefix,
      resolver: this.config.extractingOptions.discriminatorAbstractResolver,
    });
    const component = this.schemaComponentsMap.createComponent(
      // `null` is joined as an empty string
      this.schemaComponentsMap.createRef(['components', 'schemas', typeName ?? '']),
      {
        ...schema,
        internal: true,
      }
    );
    const content = this.schemaParserFabric
      .createSchemaParser({ schema: component, schemaPath: this.schemaPath })
      .getInlineParseContent();

    return {
      typeName,
      component,
      content,
    };
  };

  createComplexSchemaStruct = (): { content: string } | undefined => {
    const ts = this.config.Ts;
    const complexType = this.schemaUtils.getComplexType(this.schema);

    if (complexType === SCHEMA_TYPES.COMPLEX_UNKNOWN) {
      return undefined;
    }

    return {
      content: ts.ExpressionGroup(
        this.schemaParser._complexSchemaParsers[complexType](this.schema)
      ),
    };
  };
}

export { DiscriminatorSchemaParser };
