import { includes, isArray, isObject, isUndefined, map, size } from 'lodash-es';

import { SCHEMA_TYPES } from '../../constants';
import type { EnumFieldContent, ParsedEnumSchema, ParsedSchema } from '../../types/parsed';
import { MonoSchemaParser } from '../mono-schema-parser';
import { EnumKeyResolver } from '../util/enum-key-resolver';

/** enum of tuples (`enum: [["a", "b"], ["c", "d"]]`), only the first value is checked */
const isTupleEnum = (enumValues: unknown[]): enumValues is unknown[][] => isArray(enumValues[0]);

class EnumSchemaParser extends MonoSchemaParser<ParsedSchema> {
  enumKeyResolver: EnumKeyResolver = new EnumKeyResolver(this.config, this.logger, []);

  extractEnum = (pathTypeName: string): ParsedSchema => {
    const generatedTypeName = this.schemaUtils.resolveTypeName(pathTypeName, {
      suffixes: this.config.extractingOptions.enumSuffix,
      resolver: this.config.extractingOptions.enumNameResolver,
    });
    const customComponent = this.schemaComponentsMap.createComponent(
      // `null` is joined as an empty string
      this.schemaComponentsMap.createRef(['components', 'schemas', generatedTypeName ?? '']),
      {
        ...this.schema,
      }
    );
    return this.schemaParserFabric.parseSchema(customComponent);
  };

  parse(): ParsedSchema {
    const pathTypeName = this.buildTypeNameFromPath();

    if (this.config.extractEnums && !this.typeName && pathTypeName != undefined) {
      return this.extractEnum(pathTypeName);
    }

    const refType = this.schemaUtils.getSchemaRefType(this.schema);
    const $ref = (refType && refType.$ref) || undefined;

    // `null` can't be an enum member, it is kept as `nullable` instead (e.g. OAS 3.1 `enum: ["a", null]`)
    // note: the source schema must not be mutated, it can be shared between several usages
    const hasNullValue = Array.isArray(this.schema.enum) && this.schema.enum.includes(null);
    const enumValues = Array.isArray(this.schema.enum)
      ? this.schema.enum.filter((key) => key != undefined)
      : this.schema.enum;

    if (Array.isArray(enumValues) && isTupleEnum(enumValues)) {
      return this.schemaParserFabric.parseSchema(
        {
          oneOf: enumValues.map((enumNames) => ({
            type: 'array',
            items: enumNames.map((enumName) => ({
              type: 'string',
              enum: [enumName],
            })),
          })),
        },
        this.typeName,
        this.schemaPath
      );
    }

    // OAS 3.1 `type: ["string", "null"]` - use the first non-null type as key type
    const keyType = this.schemaUtils.getSchemaType(
      isArray(this.schema.type)
        ? {
            ...this.schema,
            type: this.schema.type.find((type) => type !== this.config.Ts.Keyword.Null),
          }
        : this.schema
    );
    const enumNames = this.schemaUtils.getEnumNames(this.schema);

    const formatValue = (value: unknown) => {
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

    const content: EnumFieldContent[] =
      isArray(enumNames) && size(enumNames)
        ? map(enumNames, (enumName, index) => {
            const enumValue = enumValues?.[index];
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
        : map(enumValues, (value) => {
            return {
              key: this.formatEnumKey({ value }),
              type: keyType,
              value: formatValue(value),
            };
          });

    // boolean values can't be members of a TS enum, such enums are generated as union types
    const hasBooleanValues = content.some(
      ({ value }) =>
        value === this.config.Ts.BooleanValue(true) || value === this.config.Ts.BooleanValue(false)
    );

    const parsed: ParsedEnumSchema = {
      ...(isObject(this.schema) ? this.schema : {}),
      ...(hasNullValue ? { nullable: true } : {}),
      enum: enumValues,
      $ref,
      typeName: this.typeName || ($ref && refType?.typeName) || undefined,
      $parsedSchema: true,
      schemaType: SCHEMA_TYPES.ENUM,
      type: SCHEMA_TYPES.ENUM,
      keyType,
      typeIdentifier:
        this.config.generateUnionEnums || hasBooleanValues
          ? this.config.Ts.Keyword.Type
          : this.config.Ts.Keyword.Enum,
      name: this.typeName,
      description: this.schemaFormatters.formatDescription(this.schema.description),
      content,
    };
    return parsed;
  }

  formatEnumKey = ({ key, value }: { key?: string; value: unknown }): string => {
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

    // the enum key resolver always resolves a name (it has a fallback)
    return this.enumKeyResolver.resolve([formatted]) ?? formatted;
  };
}

export { EnumSchemaParser };
