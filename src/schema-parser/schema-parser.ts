import { first, merge, omit, values } from 'lodash-es';

import { SCHEMA_TYPES } from '../constants.js';
import type { SchemaPath } from '../types/config';
import type { ContentObject, SchemaObject } from '../types/openapi';
import type { BaseSchemaType, ComplexSchemaType, ParsedSchema } from '../types/parsed';
import { sortByProperty } from '../util/sort-by-property';
import { isRecord } from '../util/type-guards';
import { ArraySchemaParser } from './base-schema-parsers/array';
import { ComplexSchemaParser } from './base-schema-parsers/complex';
import { DiscriminatorSchemaParser } from './base-schema-parsers/discriminator';
import { EnumSchemaParser } from './base-schema-parsers/enum';
import { ObjectSchemaParser } from './base-schema-parsers/object';
import { PrimitiveSchemaParser } from './base-schema-parsers/primitive';
import { AllOfSchemaParser } from './complex-schema-parsers/all-of';
import { AnyOfSchemaParser } from './complex-schema-parsers/any-of';
import { NotSchemaParser } from './complex-schema-parsers/not';
import { OneOfSchemaParser } from './complex-schema-parsers/one-of';
import type { SchemaParserFabric } from './schema-parser-fabric';

/** options of `SchemaParser` (`SchemaParserFabric.createSchemaParser`) */
export interface SchemaParserOptions {
  /** schema to parse (a missing schema is parsed as `any`) */
  schema?: SchemaObject | null;
  typeName?: string | null;
  schemaPath?: SchemaPath;
}

/** a parser of a complex schema (`allOf`, `oneOf`, ...), returns the inline type */
export type ComplexSchemaParserFn = (schema: SchemaObject) => string;

/** a parser of a base schema kind (`SchemaUtils.getInternalSchemaType`) */
export type BaseSchemaParserFn = (schema: SchemaObject, typeName: string | null) => ParsedSchema;

/** a response/request body struct (`{ content: { "application/json": { schema } } }`), the content is trusted */
const isContentObject = (value: unknown): value is ContentObject => isRecord(value);

class SchemaParser {
  schemaParserFabric: SchemaParserFabric;
  config: SchemaParserFabric['config'];
  logger: SchemaParserFabric['logger'];
  schemaComponentsMap: SchemaParserFabric['schemaComponentsMap'];
  typeNameFormatter: SchemaParserFabric['typeNameFormatter'];
  schemaFormatters: SchemaParserFabric['schemaFormatters'];
  schemaUtils: SchemaParserFabric['schemaUtils'];
  templatesWorker: SchemaParserFabric['templatesWorker'];
  schemaWalker: SchemaParserFabric['schemaWalker'];

  typeName: string | null;
  schema: SchemaObject | null | undefined;
  schemaPath: SchemaPath = [];

  constructor(
    schemaParserFabric: SchemaParserFabric,
    { typeName, schema, schemaPath }: SchemaParserOptions = {}
  ) {
    this.schemaParserFabric = schemaParserFabric;
    this.config = schemaParserFabric.config;
    this.logger = schemaParserFabric.logger;
    this.templatesWorker = schemaParserFabric.templatesWorker;
    this.schemaComponentsMap = schemaParserFabric.schemaComponentsMap;
    this.typeNameFormatter = schemaParserFabric.typeNameFormatter;
    this.schemaWalker = schemaParserFabric.schemaWalker;
    this.schemaFormatters = schemaParserFabric.schemaFormatters;
    this.schemaUtils = schemaParserFabric.schemaUtils;

    this.typeName = typeName || null;
    this.schema = schema;
    this.schemaPath = [...(schemaPath || [])];
  }

  _complexSchemaParsers: Record<ComplexSchemaType, ComplexSchemaParserFn> = {
    [SCHEMA_TYPES.COMPLEX_ONE_OF]: (schema) => {
      const SchemaParser = this.config.schemaParsers.complexOneOf || OneOfSchemaParser;
      const schemaParser = new SchemaParser(this, schema, null, this.schemaPath);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.COMPLEX_ALL_OF]: (schema) => {
      const SchemaParser = this.config.schemaParsers.complexAllOf || AllOfSchemaParser;
      const schemaParser = new SchemaParser(this, schema, null, this.schemaPath);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.COMPLEX_ANY_OF]: (schema) => {
      const SchemaParser = this.config.schemaParsers.complexAnyOf || AnyOfSchemaParser;
      const schemaParser = new SchemaParser(this, schema, null, this.schemaPath);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.COMPLEX_NOT]: (schema) => {
      const SchemaParser = this.config.schemaParsers.complexNot || NotSchemaParser;
      const schemaParser = new SchemaParser(this, schema, null, this.schemaPath);
      return schemaParser.parse();
    },
  };

  _baseSchemaParsers: Record<Exclude<BaseSchemaType, 'primitive'>, BaseSchemaParserFn> & {
    /** also parses a missing schema (as `any`) */
    primitive: (schema: SchemaObject | null, typeName: string | null) => ParsedSchema;
  } = {
    [SCHEMA_TYPES.ENUM]: (schema, typeName) => {
      const SchemaParser = this.config.schemaParsers.enum || EnumSchemaParser;
      const schemaParser = new SchemaParser(this, schema, typeName, this.schemaPath);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.OBJECT]: (schema, typeName) => {
      const SchemaParser = this.config.schemaParsers.object || ObjectSchemaParser;
      const schemaParser = new SchemaParser(this, schema, typeName, this.schemaPath);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.COMPLEX]: (schema, typeName) => {
      const SchemaParser = this.config.schemaParsers.complex || ComplexSchemaParser;
      const schemaParser = new SchemaParser(this, schema, typeName, this.schemaPath);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.PRIMITIVE]: (schema, typeName) => {
      const SchemaParser = this.config.schemaParsers.primitive || PrimitiveSchemaParser;
      const schemaParser = new SchemaParser(this, schema, typeName, this.schemaPath);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.DISCRIMINATOR]: (schema, typeName) => {
      const SchemaParser = this.config.schemaParsers.discriminator || DiscriminatorSchemaParser;
      const schemaParser = new SchemaParser(this, schema, typeName, this.schemaPath);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.ARRAY]: (schema, typeName) => {
      const SchemaParser = this.config.schemaParsers.array || ArraySchemaParser;
      const schemaParser = new SchemaParser(this, schema, typeName, this.schemaPath);
      return schemaParser.parse();
    },
  };

  /**
   * Parses the schema (the result is cached as `schema.$parsed`).
   * A string "schema" is returned as is.
   */
  parseSchema = (): ParsedSchema => {
    if (!this.schema) {
      return this._baseSchemaParsers[SCHEMA_TYPES.PRIMITIVE](null, this.typeName);
    }

    let schemaType: BaseSchemaType;
    let parsedSchema = null;

    if (typeof this.schema === 'string') {
      return this.schema;
    }

    let parsed = this.schema.$parsed;

    if (!parsed) {
      if (!this.typeName && this.schemaUtils.isRefSchema(this.schema)) {
        this.typeName = this.schemaUtils.getSchemaType(this.schema);
      }

      // #region swagger schemas fixes

      // schema has items but don't have array type
      if (this.schema.items && !Array.isArray(this.schema.items) && !this.schema.type) {
        this.schema.type = SCHEMA_TYPES.ARRAY;
      }
      // schema is enum with one null value
      if (
        Array.isArray(this.schema.enum) &&
        this.schema.enum.length === 1 &&
        this.schema.enum[0] == undefined
      ) {
        this.logger.debug('invalid enum schema', this.schema);
        this.schema = { type: this.config.Ts.Keyword.Null };
      }
      // schema is response schema
      if ('content' in this.schema && typeof this.schema.content === 'object') {
        const schema = this.extractSchemaFromResponseStruct(this.schema);
        const schemaParser = this.schemaParserFabric.createSchemaParser({
          schema,
          typeName: this.typeName,
          schemaPath: this.schemaPath,
        });
        const responseParsed = schemaParser.parseSchema();
        this.schema.$parsed = responseParsed;
        return responseParsed;
      }

      // #endregion

      schemaType = this.schemaUtils.getInternalSchemaType(this.schema);

      this.schemaPath.push(this.typeName);

      merge(
        this.schema,
        this.config.hooks.onPreParseSchema(this.schema, this.typeName, schemaType)
      );
      parsedSchema = this._baseSchemaParsers[schemaType](this.schema, this.typeName);
      parsed = this.config.hooks.onParseSchema(this.schema, parsedSchema) || parsedSchema;
      this.schema.$parsed = parsed;

      if (this.config.sortTypes && Array.isArray(parsed?.content)) {
        // sorted in place
        parsed.content.sort(sortByProperty('name'));
      }
    }

    this.schemaPath.pop();

    return parsed;
  };

  getInlineParseContent = (): string => {
    const parsedSchema = this.parseSchema();
    const formattedSchema = this.schemaFormatters.formatSchema(parsedSchema, 'inline');
    return formattedSchema.content;
  };

  getParseContent = (): string => {
    const parsedSchema = this.parseSchema();
    const formattedSchema = this.schemaFormatters.formatSchema(parsedSchema, 'base');
    return formattedSchema.content;
  };

  /**
   * @returns schema of the first content type merged with the response struct and the media type
   */
  extractSchemaFromResponseStruct = (
    responseStruct: SchemaObject & { content?: unknown }
  ): SchemaObject | undefined => {
    const { content, ...extras } = responseStruct;

    const firstResponse = first(isContentObject(content) ? values(content) : []);
    const firstSchema = firstResponse?.schema;

    if (!firstSchema) {
      return;
    }

    return {
      ...extras,
      ...omit(firstResponse, 'schema'),
      ...firstSchema,
    };
  };
}

export { SchemaParser };
