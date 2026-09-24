import { compact, includes, isString, map, replace, trim } from 'lodash-es';

import { SCHEMA_TYPES } from '../constants';
import type { SchemaObject } from '../types/openapi';
import type {
  EnumFieldContent,
  FormattedSchema,
  ObjectFieldContent,
  ParsedSchema,
} from '../types/parsed';
import type { Logger } from '../util/logger';
import type { SchemaParserConfig, SchemaParserFabricDeps } from './schema-parser-fabric';
import type { SchemaUtils } from './schema-utils';

/** formats a parsed schema (renders its content) */
export type SchemaFormatter = (parsedSchema: ParsedSchema) => FormattedSchema;

/** `"base"` - content of a type declaration, `"inline"` - inline type */
export type SchemaFormatType = 'base' | 'inline';

/** dependencies of `SchemaFormatters` (a `SchemaParserFabric`) */
export interface SchemaFormattersDeps {
  config: Pick<SchemaParserConfig, 'Ts' | 'generateUnionEnums' | 'templatesToRender'>;
  logger: Partial<Pick<Logger, 'debug' | 'warn'>>;
  schemaUtils: Pick<SchemaUtils, 'safeAddNullToType' | 'isNullableSchema'>;
  templatesWorker: SchemaParserFabricDeps['templatesWorker'];
}

/** an item of a parsed content (the characters of a string content are iterated too, like by lodash `map`) */
type ParsedContentItem = string | ObjectFieldContent | EnumFieldContent;

/** `value` of an enum field (`undefined` for other items) */
const getContentItemValue = (item: ParsedContentItem) =>
  typeof item === 'object' && item && 'value' in item ? item.value : undefined;

/** `key` of an enum field (`undefined` for other items) */
const getContentItemKey = (item: ParsedContentItem) =>
  typeof item === 'object' && item && 'key' in item ? item.key : undefined;

/** `field` of an object field (`undefined` for other items) */
const getContentItemField = (item: ParsedContentItem) =>
  typeof item === 'object' && item && 'field' in item ? item.field : undefined;

/**
 * A parsed schema which is not formatted (`primitive` and `complex` schemas have a rendered content).
 * The content is not checked, as before (only hooks can put a non-string content here).
 */
const toUnformattedSchema = (parsedSchema: ParsedSchema): FormattedSchema =>
  parsedSchema as FormattedSchema;

class SchemaFormatters {
  config: SchemaFormattersDeps['config'];
  logger: SchemaFormattersDeps['logger'];
  templatesWorker: SchemaFormattersDeps['templatesWorker'];
  schemaUtils: SchemaFormattersDeps['schemaUtils'];

  /**
   * @param schemaParser {SchemaParser | SchemaParserFabric}
   */
  constructor(schemaParser: SchemaFormattersDeps) {
    this.config = schemaParser.config;
    this.logger = schemaParser.logger;
    this.schemaUtils = schemaParser.schemaUtils;
    this.templatesWorker = schemaParser.templatesWorker;
  }

  base: Record<'enum' | 'object' | 'primitive', SchemaFormatter> = {
    [SCHEMA_TYPES.ENUM]: (parsedSchema) => {
      const { content } = parsedSchema;
      const contentItems: ArrayLike<ParsedContentItem> = content;

      if (
        this.config.generateUnionEnums ||
        parsedSchema.typeIdentifier === this.config.Ts.Keyword.Type
      ) {
        return {
          ...parsedSchema,
          $content: content,
          content: this.config.Ts.UnionType(
            compact([
              ...map(contentItems, getContentItemValue),
              parsedSchema.nullable && this.config.Ts.Keyword.Null,
            ])
          ),
        };
      }

      return {
        ...parsedSchema,
        $content: content,
        content: this.config.Ts.EnumFieldsWrapper(
          parsedSchema.type === SCHEMA_TYPES.ENUM
            ? parsedSchema.content
            : // not an enum schema (e.g. formatted by a template): the items are rendered as they are
              map(contentItems, (item) => ({
                key: `${getContentItemKey(item)}`,
                value: `${getContentItemValue(item)}`,
              }))
        ),
      };
    },
    [SCHEMA_TYPES.OBJECT]: (parsedSchema) => {
      if (parsedSchema.nullable) {
        return this.inline[SCHEMA_TYPES.OBJECT](parsedSchema);
      }
      return {
        ...parsedSchema,
        $content: parsedSchema.content,
        content: this.formatObjectContent(parsedSchema.content),
      };
    },
    [SCHEMA_TYPES.PRIMITIVE]: (parsedSchema) => {
      return {
        ...toUnformattedSchema(parsedSchema),
        $content: parsedSchema.content,
      };
    },
  };

  inline: Record<'enum' | 'object', SchemaFormatter> = {
    [SCHEMA_TYPES.ENUM]: (parsedSchema) => {
      const contentItems: ArrayLike<ParsedContentItem> = parsedSchema.content;
      return {
        ...parsedSchema,
        content: parsedSchema.$ref
          ? `${parsedSchema.typeName}`
          : this.config.Ts.UnionType(
              compact([
                ...map(contentItems, (item) => `${getContentItemValue(item)}`),
                parsedSchema.nullable && this.config.Ts.Keyword.Null,
              ])
            ) || this.config.Ts.Keyword.Any,
      };
    },
    [SCHEMA_TYPES.OBJECT]: (parsedSchema) => {
      const { content } = parsedSchema;
      if (isString(content)) {
        return {
          ...parsedSchema,
          typeIdentifier: this.config.Ts.Keyword.Type,
          content: this.schemaUtils.safeAddNullToType(parsedSchema, content),
        };
      }

      const objectType =
        content.length > 0
          ? this.config.Ts.ObjectWrapper(this.formatObjectContent(content))
          : this.config.Ts.RecordType(this.config.Ts.Keyword.String, this.config.Ts.Keyword.Any);

      return {
        ...parsedSchema,
        typeIdentifier: this.config.Ts.Keyword.Type,
        // `null` of nested fields (`{ a: string | null }`) is not the `null` of the object itself,
        // so `safeAddNullToType` (which looks for "null" in the type string) can't be used here
        content: this.schemaUtils.isNullableSchema(parsedSchema)
          ? this.config.Ts.UnionType([objectType, this.config.Ts.Keyword.Null])
          : objectType,
      };
    },
  };

  /**
   * @param parsedSchema parsed schema
   * @param formatType `"base"` (content of a type declaration) or `"inline"` (inline type)
   */
  formatSchema = (
    parsedSchema: ParsedSchema,
    formatType: SchemaFormatType = 'base'
  ): FormattedSchema => {
    // a raw schema with a cached parsed schema can be passed too (e.g. from templates)
    const rawSchema: SchemaObject | undefined = parsedSchema;
    const schemaType = parsedSchema?.schemaType || rawSchema?.$parsed?.schemaType;
    const formatters: Partial<Record<string, SchemaFormatter>> | undefined = this[formatType];
    const formatterFn = schemaType ? formatters?.[schemaType] : undefined;
    return (formatterFn && formatterFn(parsedSchema)) || toUnformattedSchema(parsedSchema);
  };

  /**
   * Escapes a value that is going to be placed inside a JSDoc block comment,
   * so it can't terminate the comment (`*\/`).
   */
  escapeJSDocContent = (content: unknown): string => {
    if (content === undefined || content === null) {
      return '';
    }
    return replace(`${content}`, /\*\//g, '*\\/');
  };

  formatDescription = (description: unknown, inline?: boolean): string => {
    if (!description) {
      return '';
    }

    // Prevent schema text from terminating the generated JSDoc block.
    const prettified = this.escapeJSDocContent(description);

    const hasMultipleLines = includes(prettified, '\n');

    if (!hasMultipleLines) {
      return prettified;
    }

    if (inline) {
      return `${prettified}`
        .split(/\n/g)
        .map((part) => trim(part))
        .filter(Boolean)
        .join(' ')
        .valueOf();
    }

    return replace(prettified, /\n$/g, '');
  };

  /** renders the fields of an object schema (with their JSDoc) */
  formatObjectContent = (content: ParsedSchema['content']): string => {
    const fields = [];

    for (const part of content) {
      const extraSpace = '  ';
      const result = `${extraSpace}${getContentItemField(part)},\n`;

      const renderedJsDoc = this.templatesWorker.renderTemplate(
        this.config.templatesToRender.dataContractJsDoc,
        {
          data: part,
        }
      );

      const routeNameFromTemplate = renderedJsDoc
        .split('\n')
        .map((c) => `${extraSpace}${c}`)
        .join('\n');

      if (routeNameFromTemplate) {
        fields.push(`${routeNameFromTemplate}${result}`);
      } else {
        fields.push(`${result}`);
      }
    }

    return fields.join('');
  };
}

export { SchemaFormatters };
