import type { SchemaPath } from '../types/config';
import type { SchemaObject } from '../types/openapi';
import type { ParsedSchema } from '../types/parsed';
import type { SchemaParser } from './schema-parser';

/**
 * Base class of schema parsers (`config.schemaParsers`).
 * @template TResult result of `parse()`: a parsed schema (base parsers) or an inline type (complex parsers)
 * @template TSchema parsed schema (the primitive parser also gets `null` for a missing schema)
 */
class MonoSchemaParser<
  TResult = ParsedSchema | string,
  TSchema extends SchemaObject | null = SchemaObject,
> {
  schema: TSchema;
  typeName: string | null | undefined;
  schemaPath: SchemaPath;

  logger: SchemaParser['logger'];
  schemaParser: SchemaParser;
  schemaParserFabric: SchemaParser['schemaParserFabric'];
  typeNameFormatter: SchemaParser['typeNameFormatter'];
  schemaComponentsMap: SchemaParser['schemaComponentsMap'];
  schemaUtils: SchemaParser['schemaUtils'];
  config: SchemaParser['config'];
  schemaFormatters: SchemaParser['schemaFormatters'];

  constructor(
    schemaParser: SchemaParser,
    schema: TSchema,
    typeName: string | null | undefined = undefined,
    schemaPath: SchemaPath = []
  ) {
    this.schemaParser = schemaParser;
    this.schemaParserFabric = schemaParser.schemaParserFabric;
    this.logger = schemaParser.logger;
    this.schema = schema;
    this.typeName = typeName;
    this.typeNameFormatter = schemaParser.typeNameFormatter;
    this.schemaPath = schemaPath;
    this.schemaComponentsMap = this.schemaParser.schemaComponentsMap;
    this.schemaUtils = this.schemaParser.schemaUtils;
    this.config = this.schemaParser.config;
    this.schemaFormatters = this.schemaParser.schemaFormatters;
  }

  parse(): TResult {
    throw new Error('not implemented');
  }

  buildTypeNameFromPath = () => {
    return this.schemaUtils.buildTypeNameFromPath(this.schemaPath);
  };
}

export { MonoSchemaParser };
