import { isArray, isObject } from 'lodash-es';

import { SCHEMA_TYPES } from '../../constants';
import { MonoSchemaParser } from '../mono-schema-parser';

class ArraySchemaParser extends MonoSchemaParser {
  parse() {
    let contentType;
    const { type, description, items } = this.schema || {};

    if (isArray(items) && type === SCHEMA_TYPES.ARRAY) {
      const tupleContent = [];
      for (const item of items) {
        tupleContent.push(
          this.schemaParserFabric
            .createSchemaParser({ schema: item, schemaPath: this.schemaPath })
            .getInlineParseContent(),
        );
      }
      contentType = this.config.Ts.Tuple(tupleContent);
    } else {
      const content = this.schemaParserFabric
        .createSchemaParser({ schema: items, schemaPath: this.schemaPath })
        .getInlineParseContent();
      contentType = this.config.Ts.ArrayType(content);
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
      content: this.schemaUtils.safeAddNullToType(this.schema, contentType),
    };
  }
}

export { ArraySchemaParser };
