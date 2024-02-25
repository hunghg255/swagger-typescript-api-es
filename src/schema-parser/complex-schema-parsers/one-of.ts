import _ from 'lodash';

import { MonoSchemaParser } from '~src/schema-parser/mono-schema-parser';

// T1 | T2
class OneOfSchemaParser extends MonoSchemaParser {
  parse() {
    const ignoreTypes = new Set([this.config.Ts.Keyword.Any]);
    const combined = _.map(this.schema.oneOf, (childSchema) =>
      this.schemaParserFabric.getInlineParseContent(
        this.schemaUtils.makeAddRequiredToChildSchema(this.schema, childSchema),
        undefined,
        this.schemaPath,
      ),
    );

    const filtered = this.schemaUtils.filterSchemaContents(
      combined,
      (content: any) => !ignoreTypes.has(content),
    );

    const type = this.config.Ts.UnionType(filtered);

    return this.schemaUtils.safeAddNullToType(this.schema, type);
  }
}

export { OneOfSchemaParser };
