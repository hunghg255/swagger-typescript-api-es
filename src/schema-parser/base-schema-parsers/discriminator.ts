/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable indent */
import clone from 'lodash/clone';
import cloneDeep from 'lodash/cloneDeep';
import entries from 'lodash/entries';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import keys from 'lodash/keys';
import omit from 'lodash/omit';
import reduce from 'lodash/reduce';

import { SCHEMA_TYPES } from '../../constants';
import { MonoSchemaParser } from '../mono-schema-parser';

class DiscriminatorSchemaParser extends MonoSchemaParser {
  parse() {
    const ts = this.config.Ts;
    const { discriminator, ...noDiscriminatorSchema } = this.schema;

    if (!discriminator.mapping) {
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
      [abstractSchemaStruct?.content, discriminatorSchemaStruct?.content].filter(Boolean),
    );

    return {
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
  }

  createDiscriminatorSchema = ({ skipMappingType, abstractSchemaStruct }: any) => {
    const ts = this.config.Ts;

    const refPath = this.schemaComponentsMap.createRef(['components', 'schemas', this.typeName]);
    const { discriminator } = this.schema;
    const mappingEntries = entries(discriminator.mapping);
    const ableToCreateMappingType =
      !skipMappingType && !!(abstractSchemaStruct?.typeName && mappingEntries.length > 0);
    const mappingContents = [];
    let mappingTypeName: any;

    /** { mapping_key: SchemaEnum.MappingKey, ... } */
    const mappingPropertySchemaEnumKeysMap: any = this.createMappingPropertySchemaEnumKeys({
      abstractSchemaStruct,
      discPropertyName: discriminator.propertyName,
    });

    if (ableToCreateMappingType) {
      const rawTypeName = `${abstractSchemaStruct.typeName}_${discriminator.propertyName}`;
      const generatedTypeName = this.schemaUtils.resolveTypeName(rawTypeName, {
        suffixes: this.config.extractingOptions.discriminatorMappingSuffix,
        resolver: this.config.extractingOptions.discriminatorMappingNameResolver,
      });

      const content = ts.IntersectionType([
        ts.ObjectWrapper(
          ts.TypeField({
            key: ts.StringValue(discriminator.propertyName),
            value: 'Key',
          }),
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

      component.typeData.content = content;

      mappingTypeName = this.typeNameFormatter.format(component.typeName);
    }

    /** returns (GenericType<"mapping_key", MappingType>) or ({ discriminatorProperty: "mapping_key" } & MappingType) */
    const createMappingContent = (mappingSchema: any, mappingKey: any) => {
      const content = this.schemaParserFabric
        .createSchemaParser({
          schema: mappingSchema,
          schemaPath: this.schemaPath,
        })
        .getInlineParseContent();

      const mappingUsageKey =
        mappingPropertySchemaEnumKeysMap[mappingKey] || ts.StringValue(mappingKey);

      return ableToCreateMappingType
        ? ts.TypeWithGeneric(mappingTypeName, [mappingUsageKey, content])
        : ts.ExpressionGroup(
            ts.IntersectionType([
              ts.ObjectWrapper(
                ts.TypeField({
                  key: discriminator.propertyName,
                  value: mappingUsageKey,
                }),
              ),
              content,
            ]),
          );
    };

    for (const [mappingKey, schema] of mappingEntries) {
      const mappingSchema = typeof schema === 'string' ? { $ref: schema } : schema;

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

  createMappingPropertySchemaEnumKeys = ({ abstractSchemaStruct, discPropertyName }: any) => {
    const ts = this.config.Ts;

    let mappingPropertySchemaEnumKeysMap = {};
    let mappingPropertySchema = get(abstractSchemaStruct?.component?.rawTypeData, [
      'properties',
      discPropertyName,
    ]);
    if (this.schemaUtils.isRefSchema(mappingPropertySchema)) {
      mappingPropertySchema = this.schemaUtils.getSchemaRefType(mappingPropertySchema);
    }

    if (mappingPropertySchema?.rawTypeData?.$parsed?.type === SCHEMA_TYPES.ENUM) {
      mappingPropertySchemaEnumKeysMap = reduce(
        mappingPropertySchema.rawTypeData.$parsed.enum,
        (acc: any, key, index) => {
          const enumKey = mappingPropertySchema.rawTypeData.$parsed.content[index].key;
          acc[key] = ts.EnumUsageKey(mappingPropertySchema.rawTypeData.$parsed.typeName, enumKey);
          return acc;
        },
        {},
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
  }: any) => {
    const complexSchemaKeys = keys(this.schemaParser._complexSchemaParsers);
    // override parent dependencies
    if (mappingSchema.$ref && abstractSchemaStruct?.component?.$ref) {
      const mappingRefSchema = this.schemaUtils.getSchemaRefType(mappingSchema)?.rawTypeData;
      if (mappingRefSchema) {
        for (const schemaKey of complexSchemaKeys) {
          if (isArray(mappingRefSchema[schemaKey])) {
            mappingRefSchema[schemaKey] = mappingRefSchema[schemaKey].map((schema: any) => {
              if (schema.$ref === refPath) {
                return {
                  ...schema,
                  $ref: abstractSchemaStruct.component.$ref,
                };
              }
              if (this.schemaUtils.getInternalSchemaType(schema) === SCHEMA_TYPES.OBJECT) {
                for (const schemaPropertyName in schema.properties) {
                  const schemaProperty = schema.properties[schemaPropertyName];
                  if (
                    schemaPropertyName === discPropertyName &&
                    this.schemaUtils.getInternalSchemaType(schemaProperty) === SCHEMA_TYPES.ENUM &&
                    schemaProperty.enum.length === 1 &&
                    mappingPropertySchemaEnumKeysMap[schemaProperty.enum[0]]
                  ) {
                    schema.properties[schemaPropertyName] = this.schemaParserFabric.createSchema({
                      content: mappingPropertySchemaEnumKeysMap[schemaProperty.enum[0]],
                    });
                  }
                }
              }
              return schema;
            });
          }
        }
      }
    }
  };

  createAbstractSchemaStruct = () => {
    const { discriminator, ...noDiscriminatorSchema } = this.schema;
    const complexSchemaKeys = keys(this.schemaParser._complexSchemaParsers);
    const schema = omit(clone(noDiscriminatorSchema), complexSchemaKeys);
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
      this.schemaComponentsMap.createRef(['components', 'schemas', typeName]),
      {
        ...schema,
        internal: true,
      },
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

  createComplexSchemaStruct = () => {
    const ts = this.config.Ts;
    const complexType = this.schemaUtils.getComplexType(this.schema);

    if (complexType === SCHEMA_TYPES.COMPLEX_UNKNOWN) {
      return undefined;
    }

    return {
      content: ts.ExpressionGroup(
        this.schemaParser._complexSchemaParsers[complexType](this.schema),
      ),
    };
  };
}

export { DiscriminatorSchemaParser };
