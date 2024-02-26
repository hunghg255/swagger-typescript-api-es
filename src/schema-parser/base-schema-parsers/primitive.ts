/* eslint-disable indent */
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

import { SCHEMA_TYPES } from '../../constants';
import { MonoSchemaParser } from '../mono-schema-parser';

class PrimitiveSchemaParser extends MonoSchemaParser {
  parse() {
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

    if (isArray(type) && type.length > 0) {
      contentType = this.schemaParser._complexSchemaParsers.oneOf({
        ...(isObject(this.schema) ? this.schema : {}),
        oneOf: type.map((type) => ({ type })),
      });
    }

    if (isArray(items) && type === SCHEMA_TYPES.ARRAY) {
      contentType = this.config.Ts.Tuple(
        items.map((item) =>
          this.schemaParserFabric
            .createSchemaParser({ schema: item, schemaPath: this.schemaPath })
            .getInlineParseContent(),
        ),
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
        type === this.config.Ts.Keyword.Null
          ? type
          : contentType || this.schemaUtils.getSchemaType(this.schema),
    };
  }
}

export { PrimitiveSchemaParser };
