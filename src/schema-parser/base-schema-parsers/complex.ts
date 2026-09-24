import { clone, compact, isObject, omit } from 'lodash-es';

import { SCHEMA_TYPES } from '../../constants';
import type { ParsedComplexSchema } from '../../types/parsed';
import { MonoSchemaParser } from '../mono-schema-parser';
import { COMPLEX_SCHEMA_TYPES } from '../schema-utils';

class ComplexSchemaParser extends MonoSchemaParser<ParsedComplexSchema> {
  parse(): ParsedComplexSchema {
    const complexType = this.schemaUtils.getComplexType(this.schema);
    const simpleSchema = omit(clone(this.schema), COMPLEX_SCHEMA_TYPES);
    // the complex parser is used for schemas with `allOf` / `oneOf` / `anyOf` / `not` only
    const complexSchemaContent =
      complexType === SCHEMA_TYPES.COMPLEX_UNKNOWN
        ? undefined
        : this.schemaParser._complexSchemaParsers[complexType](this.schema);

    return {
      ...(isObject(this.schema) ? this.schema : {}),
      $schemaPath: [...this.schemaPath],
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.COMPLEX,
      type: SCHEMA_TYPES.PRIMITIVE,
      typeIdentifier: this.config.Ts.Keyword.Type,
      name: this.typeName,
      description: this.schemaFormatters.formatDescription(
        this.schema.description || this.schemaUtils.getComplexSchemaDescription(this.schema) || ''
      ),
      content:
        this.config.Ts.IntersectionType(
          compact([
            this.config.Ts.ExpressionGroup(complexSchemaContent),
            this.schemaUtils.getInternalSchemaType(simpleSchema) === SCHEMA_TYPES.OBJECT &&
              this.config.Ts.ExpressionGroup(
                this.schemaParserFabric
                  .createSchemaParser({
                    schema: simpleSchema,
                    schemaPath: this.schemaPath,
                  })
                  .getInlineParseContent()
              ),
          ])
        ) || this.config.Ts.Keyword.Any,
    };
  }
}

export { ComplexSchemaParser };
