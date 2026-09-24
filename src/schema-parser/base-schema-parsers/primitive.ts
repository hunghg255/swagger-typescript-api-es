import { isObject } from 'lodash-es';

import { SCHEMA_TYPES } from '../../constants';
import type { SchemaObject } from '../../types/openapi';
import type { ParsedPrimitiveSchema } from '../../types/parsed';
import { MonoSchemaParser } from '../mono-schema-parser';

class PrimitiveSchemaParser extends MonoSchemaParser<ParsedPrimitiveSchema, SchemaObject | null> {
  parse(): ParsedPrimitiveSchema {
    let contentType;
    const { additionalProperties, type, description, items } = this.schema || {};

    if (type === this.config.Ts.Keyword.Object && additionalProperties) {
      const fieldType = isObject(additionalProperties)
        ? this.schemaParserFabric
            .createSchemaParser({
              schema: additionalProperties,
              schemaPath: this.schemaPath,
            })
            .getInlineParseContent()
        : this.config.Ts.Keyword.Any;
      contentType = this.config.Ts.RecordType(this.config.Ts.Keyword.String, fieldType);
    }

    if (Array.isArray(type) && type.length > 0) {
      // OpenAPI 3.1: `type: ["array", "null"]` - keep the rest of the schema
      // (items, format, additionalProperties, ...) for every type variant
      const { type: _types, ...schemaWithoutType } = isObject(this.schema) ? this.schema : {};
      contentType = this.schemaParser._complexSchemaParsers.oneOf({
        ...schemaWithoutType,
        oneOf: type.map((type) => ({ ...schemaWithoutType, type })),
      });
    }

    if (Array.isArray(items) && type === SCHEMA_TYPES.ARRAY) {
      contentType = this.config.Ts.Tuple(
        items.map((item) =>
          this.schemaParserFabric
            .createSchemaParser({ schema: item, schemaPath: this.schemaPath })
            .getInlineParseContent()
        )
      );
    }

    return {
      ...(isObject(this.schema) ? this.schema : {}),
      $schemaPath: [...this.schemaPath],
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.PRIMITIVE,
      type: SCHEMA_TYPES.PRIMITIVE,
      typeIdentifier: this.config.Ts.Keyword.Type,
      name: this.typeName,
      description: this.schemaFormatters.formatDescription(description),
      // TODO: probably it should be refactored. `type === 'null'` is not flexible
      content:
        typeof type === 'string' && type === this.config.Ts.Keyword.Null
          ? type
          : contentType || this.schemaUtils.getSchemaType(this.schema),
    };
  }
}

export { PrimitiveSchemaParser };
