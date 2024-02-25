import { MonoSchemaParser } from '~src/schema-parser/mono-schema-parser';

class NotSchemaParser extends MonoSchemaParser {
  parse() {
    return this.config.Ts.Keyword.Any;
  }
}

export { NotSchemaParser };
