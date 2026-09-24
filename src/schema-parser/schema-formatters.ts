import { compact, get, includes, isString, map, replace, trim } from 'lodash-es';

import { SCHEMA_TYPES } from '../constants';

class SchemaFormatters {
  /** @type {CodeGenConfig} */
  config;
  /** @type {Logger} */
  logger;
  /** @type {TemplatesWorker} */
  templatesWorker;
  /** @type {SchemaUtils} */
  schemaUtils;

  /**
   * @param schemaParser {SchemaParser | SchemaParserFabric}
   */
  constructor(schemaParser: any) {
    this.config = schemaParser.config;
    this.logger = schemaParser.logger;
    this.schemaUtils = schemaParser.schemaUtils;
    this.templatesWorker = schemaParser.templatesWorker;
  }

  base = {
    [SCHEMA_TYPES.ENUM]: (parsedSchema: any) => {
      if (this.config.generateUnionEnums) {
        return {
          ...parsedSchema,
          $content: parsedSchema.content,
          content: this.config.Ts.UnionType(
            compact([
              ...map(parsedSchema.content, ({ value }) => value),
              parsedSchema.nullable && this.config.Ts.Keyword.Null,
            ])
          ),
        };
      }

      return {
        ...parsedSchema,
        $content: parsedSchema.content,
        content: this.config.Ts.EnumFieldsWrapper(parsedSchema.content),
      };
    },
    [SCHEMA_TYPES.OBJECT]: (parsedSchema: any) => {
      if (parsedSchema.nullable) {
        return this.inline[SCHEMA_TYPES.OBJECT](parsedSchema);
      }
      return {
        ...parsedSchema,
        $content: parsedSchema.content,
        content: this.formatObjectContent(parsedSchema.content),
      };
    },
    [SCHEMA_TYPES.PRIMITIVE]: (parsedSchema: any) => {
      return {
        ...parsedSchema,
        $content: parsedSchema.content,
      };
    },
  };

  inline = {
    [SCHEMA_TYPES.ENUM]: (parsedSchema: any) => {
      return {
        ...parsedSchema,
        content: parsedSchema.$ref
          ? parsedSchema.typeName
          : this.config.Ts.UnionType(
              compact([
                ...map(parsedSchema.content, ({ value }) => `${value}`),
                parsedSchema.nullable && this.config.Ts.Keyword.Null,
              ])
            ) || this.config.Ts.Keyword.Any,
      };
    },
    [SCHEMA_TYPES.OBJECT]: (parsedSchema: any) => {
      if (isString(parsedSchema.content)) {
        return {
          ...parsedSchema,
          typeIdentifier: this.config.Ts.Keyword.Type,
          content: this.schemaUtils.safeAddNullToType(parsedSchema, parsedSchema.content),
        };
      }

      const objectType =
        parsedSchema.content.length > 0
          ? this.config.Ts.ObjectWrapper(this.formatObjectContent(parsedSchema.content))
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
   * @param parsedSchema {Record<string, any>}
   * @param formatType {"base" | "inline"}
   */
  formatSchema = (parsedSchema: any, formatType = 'base') => {
    const schemaType =
      get(parsedSchema, ['schemaType']) || get(parsedSchema, ['$parsed', 'schemaType']);
    const formatterFn = get(this, [formatType, schemaType]);
    return (formatterFn && formatterFn(parsedSchema)) || parsedSchema;
  };

  /**
   * Escapes a value that is going to be placed inside a JSDoc block comment,
   * so it can't terminate the comment (`*\/`).
   */
  escapeJSDocContent = (content: any) => {
    if (content === undefined || content === null) {
      return '';
    }
    return replace(`${content}`, /\*\//g, '*\\/');
  };

  formatDescription = (description: any, inline?: any) => {
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

  formatObjectContent = (content: any) => {
    const fields = [];

    for (const part of content) {
      const extraSpace = '  ';
      const result = `${extraSpace}${part.field},\n`;

      const renderedJsDoc = this.templatesWorker.renderTemplate(
        this.config.templatesToRender.dataContractJsDoc,
        {
          data: part,
        }
      );

      const routeNameFromTemplate = renderedJsDoc
        .split('\n')
        .map((c: any) => `${extraSpace}${c}`)
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
