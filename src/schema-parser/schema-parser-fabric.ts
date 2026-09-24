import { cloneDeep } from 'lodash-es';

import type { CodeGenConfig } from '../configuration';
import type { SchemaComponentsMap } from '../schema-components-map';
import type { SchemaWalker } from '../schema-walker';
import type { TemplatesWorker } from '../templates-worker';
import type { TypeNameFormatter } from '../type-name-formatter';
import type { SchemaPath } from '../types/config';
import type { SchemaObject } from '../types/openapi';
import type { ParsedSchema, SchemaComponent } from '../types/parsed';
import type { Logger } from '../util/logger';
import { SchemaFormatters } from './schema-formatters';
import { SchemaParser } from './schema-parser';
import type { SchemaParserOptions } from './schema-parser';
import { SchemaUtils } from './schema-utils';

/** config fields used by the schema parsers, utils and formatters */
export type SchemaParserConfig = Pick<
  CodeGenConfig,
  | 'Ts'
  | 'hooks'
  | 'schemaParsers'
  | 'primitiveTypes'
  | 'componentTypeNameResolver'
  | 'extractingOptions'
  | 'templatesToRender'
  | 'update'
  | 'sortTypes'
  | 'extractEnums'
  | 'generateUnionEnums'
  | 'enumNamesAsValues'
  | 'enumKeyResolverName'
  | 'addReadonly'
  | 'convertedFromSwagger2'
>;

/** `SchemaComponentsMap` methods used by the schema parsers */
export type SchemaParserComponentsMap = Pick<
  SchemaComponentsMap,
  'get' | 'createComponent' | 'createRef'
>;

/** `TypeNameFormatter` methods used by the schema parsers */
export type SchemaParserTypeNameFormatter = Pick<TypeNameFormatter, 'format' | 'isValidName'>;

/** dependencies of `SchemaParserFabric` (a `CodeGenProcess`) */
export interface SchemaParserFabricDeps {
  config: SchemaParserConfig;
  logger: Pick<Logger, 'debug' | 'warn'>;
  templatesWorker: Pick<TemplatesWorker, 'renderTemplate'>;
  schemaComponentsMap: SchemaParserComponentsMap;
  typeNameFormatter: SchemaParserTypeNameFormatter;
  /** not used yet */
  schemaWalker?: SchemaWalker;
}

/** options of `SchemaParserFabric.createSchema` */
export interface CreateSchemaOptions {
  /** content of the parsed schema */
  content: string;
  /** schema to parse (and to link the content to) */
  linkedSchema?: SchemaObject;
  /** component to parse (and to link the content and the other props to) */
  linkedComponent?: SchemaComponent;
  schemaPath?: SchemaPath;
  /** other props assigned to the parsed schema */
  [schemaProp: string]: unknown;
}

/** options of `SchemaParserFabric.createParsedComponent` */
export interface CreateParsedComponentOptions {
  typeName: string | null;
  schema: SchemaObject;
  schemaPath?: SchemaPath;
}

class SchemaParserFabric {
  config: SchemaParserConfig;
  logger: SchemaParserFabricDeps['logger'];
  schemaComponentsMap: SchemaParserComponentsMap;
  typeNameFormatter: SchemaParserTypeNameFormatter;
  schemaFormatters: SchemaFormatters;
  templatesWorker: SchemaParserFabricDeps['templatesWorker'];
  schemaUtils: SchemaUtils;
  schemaWalker: SchemaWalker | undefined;

  constructor({
    config,
    logger,
    templatesWorker,
    schemaComponentsMap,
    typeNameFormatter,
    schemaWalker,
  }: SchemaParserFabricDeps) {
    this.config = config;
    this.logger = logger;
    this.schemaComponentsMap = schemaComponentsMap;
    this.typeNameFormatter = typeNameFormatter;
    this.templatesWorker = templatesWorker;
    this.schemaWalker = schemaWalker;
    this.schemaUtils = new SchemaUtils(this);
    this.schemaFormatters = new SchemaFormatters(this);
  }

  createSchemaParser = ({ schema, typeName, schemaPath }: SchemaParserOptions) => {
    return new SchemaParser(this, { schema, typeName, schemaPath });
  };

  /**
   * Parses `linkedComponent` (or `linkedSchema`) and replaces the content of the parsed schema.
   * @param content schema content
   * @param linkedSchema link content to attached schema
   * @param linkedComponent link content and other schema props to attached component
   * @param schemaPath
   * @param otherSchemaProps
   * @returns the parsed schema (or component)
   */
  createSchema = ({
    content,
    linkedSchema = {},
    linkedComponent,
    schemaPath,
    ...otherSchemaProps
  }: CreateSchemaOptions): SchemaObject => {
    const schema: SchemaObject = linkedComponent || linkedSchema;
    const parser = this.createSchemaParser({
      schema,
      schemaPath,
    });
    const parsed = parser.parseSchema();
    Object.assign(parsed, { content }, otherSchemaProps);
    if (linkedComponent) {
      linkedComponent.typeData = parsed;
    }
    // the parser replaces invalid schemas (e.g. an enum with a single `null` value)
    return parser.schema || schema;
  };

  /**
   * Creates a `#/components/schemas/<typeName>` component from a copy of the schema and parses it.
   */
  createParsedComponent = ({
    typeName,
    schema,
    schemaPath,
  }: CreateParsedComponentOptions): SchemaComponent & { typeData: ParsedSchema } => {
    const schemaCopy = cloneDeep(schema);
    const customComponent = this.schemaComponentsMap.createComponent(
      // `null` is joined as an empty string
      this.schemaComponentsMap.createRef(['components', 'schemas', typeName ?? '']),
      schemaCopy
    );
    const parsed = this.parseSchema(schemaCopy, undefined, schemaPath);

    parsed.name = typeName;

    return Object.assign(customComponent, { typeData: parsed });
  };

  /**
   * @param schema schema to parse (a missing schema is parsed as `any`)
   * @param typeName type name of the schema (component name)
   * @param [schemaPath] path of type names used to build names of extracted types
   */
  parseSchema = (
    schema: SchemaObject | null | undefined,
    typeName?: string | null,
    schemaPath: SchemaPath = []
  ): ParsedSchema => {
    const schemaParser = this.createSchemaParser({
      schema,
      typeName,
      schemaPath,
    });
    return schemaParser.parseSchema();
  };

  /**
   * @param schema schema to parse
   * @param typeName type name of the schema (component name)
   * @param [schemaPath] path of type names used to build names of extracted types
   * @returns inline TS type of the schema
   */
  getInlineParseContent = (
    schema: SchemaObject | null | undefined,
    typeName?: string | null,
    schemaPath?: SchemaPath
  ): string => {
    const parser = this.createSchemaParser({ schema, typeName, schemaPath });
    return parser.getInlineParseContent();
  };

  /**
   * @param schema schema to parse
   * @param typeName type name of the schema (component name)
   * @param [schemaPath] path of type names used to build names of extracted types
   * @returns TS type of the schema (content of the type declaration)
   */
  getParseContent = (
    schema: SchemaObject | null | undefined,
    typeName?: string | null,
    schemaPath?: SchemaPath
  ): string => {
    const parser = this.createSchemaParser({ schema, typeName, schemaPath });
    return parser.getParseContent();
  };
}

export { SchemaParserFabric };
