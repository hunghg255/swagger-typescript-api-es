import { isObject, map, some, values } from 'lodash-es';

import { SCHEMA_TYPES } from '../../constants';
import type { SchemaObject } from '../../types/openapi';
import type { ObjectFieldContent, ParsedObjectSchema } from '../../types/parsed';
import { MonoSchemaParser } from '../mono-schema-parser';

class ObjectSchemaParser extends MonoSchemaParser<ParsedObjectSchema> {
  parse(): ParsedObjectSchema {
    const contentProperties = this.getObjectSchemaContent(this.schema);

    return {
      ...(isObject(this.schema) ? this.schema : {}),
      $schemaPath: [...this.schemaPath],
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.OBJECT,
      type: SCHEMA_TYPES.OBJECT,
      typeIdentifier: this.config.Ts.Keyword.Interface,
      name: this.typeName,
      description: this.schemaFormatters.formatDescription(this.schema.description),
      allFieldsAreOptional: !some(values(contentProperties), (part) => part.isRequired),
      content: contentProperties,
    };
  }

  getObjectSchemaContent = (schema: SchemaObject | null | undefined): ObjectFieldContent[] => {
    const { properties, additionalProperties } = schema || {};

    const propertiesContent = map(properties, (property, name): ObjectFieldContent => {
      const required = this.schemaUtils.isPropertyRequired(name, property, schema || {});
      const refRawSchema: SchemaObject =
        this.schemaUtils.getSchemaRefType(property)?.rawTypeData ?? {};
      const nullable = !!(refRawSchema.nullable || property.nullable);
      const fieldName = this.typeNameFormatter.isValidName(name)
        ? name
        : this.config.Ts.StringValue(name);
      const fieldValue = this.schemaParserFabric
        .createSchemaParser({
          schema: property,
          schemaPath: [...this.schemaPath, name],
        })
        .getInlineParseContent();
      const readOnly = property.readOnly;

      return {
        ...property,
        $$raw: property,
        title: property.title,
        description:
          property.description ||
          this.schemaUtils.getComplexSchemaDescription(property) ||
          refRawSchema.description ||
          this.schemaUtils.getComplexSchemaDescription(refRawSchema) ||
          '',
        isRequired: required,
        isNullable: nullable,
        name: fieldName,
        value: fieldValue,
        field: this.config.Ts.TypeField({
          readonly: readOnly && this.config.addReadonly,
          optional: !required,
          key: fieldName,
          value: fieldValue,
        }),
      };
    });

    if (additionalProperties) {
      propertiesContent.push({
        $$raw: { additionalProperties },
        description: '',
        isRequired: false,
        field: this.config.Ts.InterfaceDynamicField(
          this.config.Ts.Keyword.String,
          this.config.Ts.Keyword.Any
        ),
      });
    }

    return propertiesContent;
  };
}

export { ObjectSchemaParser };
