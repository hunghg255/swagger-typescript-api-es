/* eslint-disable indent */

import compact from 'lodash/compact';
import get from 'lodash/get';
import includes from 'lodash/includes';
import isString from 'lodash/isString';
import map from 'lodash/map';
import replace from 'lodash/replace';
import trim from 'lodash/trim';

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
          content: this.config.Ts.UnionType(map(parsedSchema.content, ({ value }) => value)),
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
              ]),
            ) || this.config.Ts.Keyword.Any,
      };
    },
    [SCHEMA_TYPES.OBJECT]: (parsedSchema: any) => {
      if (isString(parsedSchema.content)) {
        return {
          ...parsedSchema,
          typeIdentifier: this.config.Ts.Keyword.Type,
          content: this.schemaUtils.safeAddNullToType(parsedSchema.content),
        };
      }

      return {
        ...parsedSchema,
        typeIdentifier: this.config.Ts.Keyword.Type,
        content: this.schemaUtils.safeAddNullToType(
          parsedSchema,
          parsedSchema.content.length > 0
            ? this.config.Ts.ObjectWrapper(this.formatObjectContent(parsedSchema.content))
            : this.config.Ts.RecordType(this.config.Ts.Keyword.String, this.config.Ts.Keyword.Any),
        ),
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

  formatDescription = (description: any, inline: any) => {
    if (!description) {
      return '';
    }

    let prettified = description;

    prettified = replace(prettified, /\*\//g, '*/');

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
        },
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
