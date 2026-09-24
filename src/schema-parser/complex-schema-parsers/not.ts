import { MonoSchemaParser } from '../mono-schema-parser';

class NotSchemaParser extends MonoSchemaParser<string> {
  parse(): string {
    return this.config.Ts.Keyword.Any;
  }
}

export { NotSchemaParser };
