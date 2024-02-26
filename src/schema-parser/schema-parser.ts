/* eslint-disable eqeqeq */
/* eslint-disable unicorn/no-null */
/* eslint-disable no-unused-vars */
import first from 'lodash/first';
import get from 'lodash/get';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import values from 'lodash/values';

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
import { SCHEMA_TYPES } from '../constants.js';
import { sortByProperty } from '../util/sort-by-property';

class SchemaParser {
  /** @type {SchemaParserFabric} */
  schemaParserFabric;
  /** @type {CodeGenConfig} */
  config;
  /** @type {Logger} */
  logger;
  /** @type {SchemaComponentsMap} */
  schemaComponentsMap;
  /** @type {TypeNameFormatter} */
  typeNameFormatter;
  /** @type {SchemaFormatters} */
  schemaFormatters;
  /** @type {SchemaUtils} */
  schemaUtils;
  /** @type {TemplatesWorker} */
  templatesWorker;
  /** @type {SchemaWalker} */
  schemaWalker;

  typeName;
  schema;
  schemaPath: any = [];

  constructor(schemaParserFabric: any, { typeName, schema, schemaPath } = {} as any) {
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

  _complexSchemaParsers = {
    [SCHEMA_TYPES.COMPLEX_ONE_OF]: (schema: any) => {
      const SchemaParser = this.config.schemaParsers.complexOneOf || OneOfSchemaParser;
      const schemaParser = new SchemaParser(this, schema, null, this.schemaPath);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.COMPLEX_ALL_OF]: (schema: any) => {
      const SchemaParser = this.config.schemaParsers.complexAllOf || AllOfSchemaParser;
      const schemaParser = new SchemaParser(this, schema, null, this.schemaPath);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.COMPLEX_ANY_OF]: (schema: any) => {
      const SchemaParser = this.config.schemaParsers.complexAnyOf || AnyOfSchemaParser;
      const schemaParser = new SchemaParser(this, schema, null, this.schemaPath);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.COMPLEX_NOT]: (schema: any) => {
      const SchemaParser = this.config.schemaParsers.complexNot || NotSchemaParser;
      const schemaParser = new SchemaParser(this, schema, null, this.schemaPath);
      return schemaParser.parse();
    },
  };

  _baseSchemaParsers = {
    [SCHEMA_TYPES.ENUM]: (schema: any, typeName: any) => {
      const SchemaParser = this.config.schemaParsers.enum || EnumSchemaParser;
      const schemaParser = new SchemaParser(this, schema, typeName, this.schemaPath);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.OBJECT]: (schema: any, typeName: any) => {
      const SchemaParser = this.config.schemaParsers.object || ObjectSchemaParser;
      const schemaParser = new SchemaParser(this, schema, typeName, this.schemaPath);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.COMPLEX]: (schema: any, typeName: any) => {
      const SchemaParser = this.config.schemaParsers.complex || ComplexSchemaParser;
      const schemaParser = new SchemaParser(this, schema, typeName, this.schemaPath);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.PRIMITIVE]: (schema: any, typeName: any) => {
      const SchemaParser = this.config.schemaParsers.primitive || PrimitiveSchemaParser;
      const schemaParser = new SchemaParser(this, schema, typeName, this.schemaPath);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.DISCRIMINATOR]: (schema: any, typeName: any) => {
      const SchemaParser = this.config.schemaParsers.discriminator || DiscriminatorSchemaParser;
      const schemaParser = new SchemaParser(this, schema, typeName, this.schemaPath);
      return schemaParser.parse();
    },
    [SCHEMA_TYPES.ARRAY]: (schema: any, typeName: any) => {
      const SchemaParser = this.config.schemaParsers.array || ArraySchemaParser;
      const schemaParser = new SchemaParser(this, schema, typeName, this.schemaPath);
      return schemaParser.parse();
    },
  };

  /**
   * @return {Record<string, any>}
   */
  parseSchema = () => {
    if (!this.schema) {
      return this._baseSchemaParsers[SCHEMA_TYPES.PRIMITIVE](null, this.typeName);
    }

    let schemaType = null;
    let parsedSchema = null;

    if (typeof this.schema === 'string') {
      return this.schema;
    }

    if (!this.schema.$parsed) {
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
        this.schema.$parsed = schemaParser.parseSchema();
        return this.schema.$parsed;
      }

      // #endregion

      schemaType = this.schemaUtils.getInternalSchemaType(this.schema);

      this.schemaPath.push(this.typeName);

      merge(
        this.schema,
        this.config.hooks.onPreParseSchema(this.schema, this.typeName, schemaType),
      );
      parsedSchema = this._baseSchemaParsers[schemaType](this.schema, this.typeName);
      this.schema.$parsed =
        this.config.hooks.onParseSchema(this.schema, parsedSchema) || parsedSchema;

      if (this.config.sortTypes && Array.isArray(this.schema.$parsed?.content)) {
        this.schema.$parsed.content = this.schema.$parsed.content.sort(sortByProperty('name'));
      }
    }

    this.schemaPath.pop();

    return this.schema.$parsed;
  };

  getInlineParseContent = () => {
    const parsedSchema = this.parseSchema();
    const formattedSchema = this.schemaFormatters.formatSchema(parsedSchema, 'inline');
    return formattedSchema.content;
  };

  getParseContent = () => {
    const parsedSchema = this.parseSchema();
    const formattedSchema = this.schemaFormatters.formatSchema(parsedSchema, 'base');
    return formattedSchema.content;
  };

  extractSchemaFromResponseStruct = (responseStruct: any) => {
    const { content, ...extras } = responseStruct;

    const firstResponse = first(values(content));
    const firstSchema = get(firstResponse, 'schema');

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
