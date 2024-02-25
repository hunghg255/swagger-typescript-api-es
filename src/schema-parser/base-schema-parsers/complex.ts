import _ from 'lodash';

import { SCHEMA_TYPES } from '~src/constants';
import { MonoSchemaParser } from '~src/schema-parser/mono-schema-parser';

class ComplexSchemaParser extends MonoSchemaParser {
  parse() {
    const complexType = this.schemaUtils.getComplexType(this.schema);
    const simpleSchema = _.omit(
      _.clone(this.schema),
      _.keys(this.schemaParser._complexSchemaParsers),
    );
    const complexSchemaContent = this.schemaParser._complexSchemaParsers[complexType](this.schema);

    return {
      ...(_.isObject(this.schema) ? this.schema : {}),
      $schemaPath: [...this.schemaPath],
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.COMPLEX,
      type: SCHEMA_TYPES.PRIMITIVE,
      typeIdentifier: this.config.Ts.Keyword.Type,
      name: this.typeName,
      description: this.schemaFormatters.formatDescription(
        this.schema.description ||
          _.compact(_.map(this.schema[complexType], 'description'))[0] ||
          '',
      ),
      content:
        this.config.Ts.IntersectionType(
          _.compact([
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
