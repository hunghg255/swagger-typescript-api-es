import _ from 'lodash';

import { SchemaFormatters } from '~src/schema-parser/schema-formatters';
import { SchemaParser } from '~src/schema-parser/schema-parser';
import { SchemaUtils } from '~src/schema-parser/schema-utils';

class SchemaParserFabric {
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
  /** @type {TemplatesWorker} */
  templatesWorker;
  /** @type {SchemaUtils} */
  schemaUtils;
  /** @type {SchemaWalker} */
  schemaWalker;

  constructor({
    config,
    logger,
    templatesWorker,
    schemaComponentsMap,
    typeNameFormatter,
    schemaWalker,
  }: any) {
    this.config = config;
    this.logger = logger;
    this.schemaComponentsMap = schemaComponentsMap;
    this.typeNameFormatter = typeNameFormatter;
    this.templatesWorker = templatesWorker;
    this.schemaWalker = schemaWalker;
    this.schemaUtils = new SchemaUtils(this);
    this.schemaFormatters = new SchemaFormatters(this);
  }

  createSchemaParser = ({ schema, typeName, schemaPath }: any) => {
    return new SchemaParser(this, { schema, typeName, schemaPath });
  };

  /**
   *
   * @param content schema content
   * @param linkedSchema link content to attached schema
   * @param linkedComponent link content and other schema props to attached component
   * @param schemaPath
   * @param otherSchemaProps
   * @returns {{}}
   */
  createSchema = ({
    content,
    linkedSchema = {},
    linkedComponent,
    schemaPath,
    ...otherSchemaProps
  }: any) => {
    const parser = this.createSchemaParser({
      schema: linkedComponent || linkedSchema,
      schemaPath,
    });
    const parsed = parser.parseSchema();
    parsed.content = content;
    Object.assign(parsed, otherSchemaProps);
    if (linkedComponent) {
      linkedComponent.typeData = parsed;
    }
    return parser.schema;
  };

  createParsedComponent = ({ typeName, schema, schemaPath }: any) => {
    const schemaCopy = _.cloneDeep(schema);
    const customComponent = this.schemaComponentsMap.createComponent(
      this.schemaComponentsMap.createRef(['components', 'schemas', typeName]),
      schemaCopy,
    );
    const parsed = this.parseSchema(schemaCopy, undefined, schemaPath);

    parsed.name = typeName;
    customComponent.typeData = parsed;

    return customComponent;
  };

  /**
   *
   * @param schema {any}
   * @param typeName {null | string}
   * @param [schemaPath] {string[]}
   * @return {Record<string, any>}
   */
  parseSchema = (schema: any, typeName = undefined, schemaPath = []) => {
    const schemaParser = this.createSchemaParser({
      schema,
      typeName,
      schemaPath,
    });
    return schemaParser.parseSchema();
  };

  /**
   *
   * @param schema {any}
   * @param typeName {null | string}
   * @param [schemaPath] {string[]}
   * @return {Record<string, any>}
   */
  getInlineParseContent = (schema: any, typeName: any, schemaPath: any) => {
    const parser = this.createSchemaParser({ schema, typeName, schemaPath });
    return parser.getInlineParseContent();
  };

  /**
   *
   * @param schema {any}
   * @param typeName {null | string}
   * @param [schemaPath] {string[]}
   * @return {Record<string, any>}
   */
  getParseContent = (schema: any, typeName: any, schemaPath: any) => {
    const parser = this.createSchemaParser({ schema, typeName, schemaPath });
    return parser.getParseContent();
  };
}

export { SchemaParserFabric };
