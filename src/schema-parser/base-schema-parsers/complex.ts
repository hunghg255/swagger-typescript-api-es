import {
  clone,
  compact,
  isObject,
  keys,
  map,
  omit
} from 'lodash-es';

import { SCHEMA_TYPES } from '../../constants';
import { MonoSchemaParser } from '../mono-schema-parser';

class ComplexSchemaParser extends MonoSchemaParser {
  parse() {
    const complexType = this.schemaUtils.getComplexType(this.schema);
    const simpleSchema = omit(clone(this.schema), keys(this.schemaParser._complexSchemaParsers));
    const complexSchemaContent = this.schemaParser._complexSchemaParsers[complexType](this.schema);

    return {
      ...(isObject(this.schema) ? this.schema : {}),
      $schemaPath: [...this.schemaPath],
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.COMPLEX,
      type: SCHEMA_TYPES.PRIMITIVE,
      typeIdentifier: this.config.Ts.Keyword.Type,
      name: this.typeName,
      description: this.schemaFormatters.formatDescription(
        this.schema.description || compact(map(this.schema[complexType], 'description'))[0] || '',
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
                  .getInlineParseContent(),
              ),
          ]),
        ) || this.config.Ts.Keyword.Any,
    };
  }
}

export { ComplexSchemaParser };
