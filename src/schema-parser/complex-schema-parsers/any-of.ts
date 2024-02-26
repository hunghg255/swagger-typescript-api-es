import map from 'lodash/map';

import { MonoSchemaParser } from '../mono-schema-parser';

// T1 | T2
class AnyOfSchemaParser extends MonoSchemaParser {
  parse() {
    const ignoreTypes = new Set([this.config.Ts.Keyword.Any]);
    const combined = map(this.schema.anyOf, (childSchema) =>
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

export { AnyOfSchemaParser };
