/* eslint-disable indent */
/* eslint-disable eqeqeq */
import {
  get,
  includes,
  isArray,
  isObject,
  isUndefined,
  map,
  size,
} from 'lodash-es';

import { SCHEMA_TYPES } from '../../constants';
import { MonoSchemaParser } from '../mono-schema-parser';
import { EnumKeyResolver } from '../util/enum-key-resolver';

class EnumSchemaParser extends MonoSchemaParser {
  /** @type {EnumKeyResolver} */
  enumKeyResolver: any;

  constructor(...args: any[]) {
    // @ts-ignore
    super(...args);
    this.enumKeyResolver = new EnumKeyResolver(this.config, this.logger, []);
  }

  extractEnum = (pathTypeName: any) => {
    const generatedTypeName = this.schemaUtils.resolveTypeName(pathTypeName, {
      suffixes: this.config.extractingOptions.enumSuffix,
      resolver: this.config.extractingOptions.enumNameResolver,
    });
    const customComponent = this.schemaComponentsMap.createComponent(
      this.schemaComponentsMap.createRef(['components', 'schemas', generatedTypeName]),
      {
        ...this.schema,
      },
    );
    return this.schemaParserFabric.parseSchema(customComponent);
  };

  parse() {
    const pathTypeName = this.buildTypeNameFromPath();

    if (this.config.extractEnums && !this.typeName && pathTypeName != undefined) {
      return this.extractEnum(pathTypeName);
    }

    const refType = this.schemaUtils.getSchemaRefType(this.schema);
    const $ref = (refType && refType.$ref) || undefined;

    // fix schema when enum has length 1+ but value is []
    if (Array.isArray(this.schema.enum)) {
      this.schema.enum = this.schema.enum.filter((key: any) => key != undefined);
    }

    if (Array.isArray(this.schema.enum) && Array.isArray(this.schema.enum[0])) {
      return this.schemaParserFabric.parseSchema(
        {
          oneOf: this.schema.enum.map((enumNames: any) => ({
            type: 'array',
            items: enumNames.map((enumName: any) => ({
              type: 'string',
              enum: [enumName],
            })),
          })),
        },
        this.typeName,
        this.schemaPath,
      );
    }

    const keyType = this.schemaUtils.getSchemaType(this.schema);
    const enumNames = this.schemaUtils.getEnumNames(this.schema);

    const formatValue = (value: any) => {
      if (value === null) {
        return this.config.Ts.NullValue(value);
      }
      if (includes(keyType, this.schemaUtils.getSchemaType({ type: 'number' }))) {
        return this.config.Ts.NumberValue(value);
      }
      if (includes(keyType, this.schemaUtils.getSchemaType({ type: 'boolean' }))) {
        return this.config.Ts.BooleanValue(value);
      }

      return this.config.Ts.StringValue(value);
    };

    const content =
      isArray(enumNames) && size(enumNames)
        ? map(enumNames, (enumName, index) => {
            const enumValue = get(this.schema.enum, index);
            const formattedKey = this.formatEnumKey({
              key: enumName,
              value: enumValue,
            });

            if (this.config.enumNamesAsValues || isUndefined(enumValue)) {
              return {
                key: formattedKey,
                type: this.config.Ts.Keyword.String,
                value: this.config.Ts.StringValue(enumName),
              };
            }

            return {
              key: formattedKey,
              type: keyType,
              value: formatValue(enumValue),
            };
          })
        : map(this.schema.enum, (value) => {
            return {
              key: this.formatEnumKey({ value }),
              type: keyType,
              value: formatValue(value),
            };
          });

    return {
      ...(isObject(this.schema) ? this.schema : {}),
      $ref,
      typeName: this.typeName || ($ref && refType.typeName) || undefined,
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.ENUM,
      type: SCHEMA_TYPES.ENUM,
      keyType,
      typeIdentifier: this.config.generateUnionEnums
        ? this.config.Ts.Keyword.Type
        : this.config.Ts.Keyword.Enum,
      name: this.typeName,
      description: this.schemaFormatters.formatDescription(this.schema.description),
      content,
    };
  }

  formatEnumKey = ({ key, value }: any) => {
    let formatted;

    if (key) {
      formatted = this.typeNameFormatter.format(key, {
        type: 'enum-key',
      });
    }

    if (!formatted) {
      formatted = this.typeNameFormatter.format(`${value}`, {
        type: 'enum-key',
      });
    }

    return this.enumKeyResolver.resolve([formatted]);
  };
}

export { EnumSchemaParser };
