import { compact, replace, startCase } from 'es-toolkit/compat';

import type { CodeGenConfig } from './configuration';
import type { FormattingSchemaType } from './types/config';
import type { Logger } from './util/logger';

export interface TypeNameFormatOptions {
  type?: FormattingSchemaType;
}

/** config fields used by `TypeNameFormatter` */
export type TypeNameFormatterConfig = Pick<
  CodeGenConfig,
  | 'enumKeyPrefix'
  | 'enumKeySuffix'
  | 'typePrefix'
  | 'typeSuffix'
  | 'hooks'
  | 'fixInvalidEnumKeyPrefix'
  | 'fixInvalidTypeNamePrefix'
>;

class TypeNameFormatter {
  formattedModelNamesMap = new Map<string, string>();

  config: TypeNameFormatterConfig;

  logger: Pick<Logger, 'warn'>;

  constructor({
    config,
    logger,
  }: {
    config: TypeNameFormatterConfig;
    logger: Pick<Logger, 'warn'>;
  }) {
    this.config = config;
    this.logger = logger;
  }

  /**
   * Formats a type name (applies prefix/suffix, fixes invalid names, `hooks.onFormatTypeName`).
   * A non-string `name` is returned as is.
   * (bound, can be passed around as a function, e.g. `utils.formatModelName`)
   */
  format = this.formatName.bind(this);

  formatName(name: string, options?: TypeNameFormatOptions | null): string;
  formatName(
    name: string | null | undefined,
    options?: TypeNameFormatOptions | null
  ): string | null | undefined;
  formatName(
    name: string | null | undefined,
    options?: TypeNameFormatOptions | null
  ): string | null | undefined {
    options = options || {};

    const schemaType: FormattingSchemaType = options.type || 'type-name';

    const typePrefix =
      schemaType === 'enum-key' ? this.config.enumKeyPrefix : this.config.typePrefix;
    const typeSuffix =
      schemaType === 'enum-key' ? this.config.enumKeySuffix : this.config.typeSuffix;

    const hashKey = `${typePrefix}_${name}_${typeSuffix}`;

    if (typeof name !== 'string') {
      this.logger.warn('wrong name of the model name', name);
      return name;
    }

    // constant names like LEFT_ARROW, RIGHT_FORWARD, ETC_KEY, _KEY_NUM_
    if (/^([A-Z_]+)$/g.test(name)) {
      return compact([typePrefix, name, typeSuffix]).join('_');
    }

    const formattedModelName = this.formattedModelNamesMap.get(hashKey);

    if (formattedModelName !== undefined) {
      return formattedModelName;
    }

    const fixedModelName = this.fixModelName(name, { type: schemaType });

    const formattedName = replace(
      startCase(`${typePrefix}_${fixedModelName}_${typeSuffix}`),
      /\s/g,
      ''
    );
    const formattedResultName =
      this.config.hooks.onFormatTypeName(formattedName, name, schemaType) || formattedName;

    this.formattedModelNamesMap.set(hashKey, formattedResultName);

    return formattedResultName;
  }

  isValidName = (name: string) => /^([$A-Z_a-z]+)$/g.test(name);

  fixModelName = (name: string, options?: TypeNameFormatOptions | null) => {
    const { type } = options || {};

    if (!this.isValidName(name)) {
      if (!/^[$A-Z_a-z]/g.test(name)) {
        const fixPrefix =
          type === 'enum-key'
            ? this.config.fixInvalidEnumKeyPrefix
            : this.config.fixInvalidTypeNamePrefix;
        name = `${fixPrefix} ${name}`;
      }

      // specific replaces for TSOA 3.x
      if (name.includes('.')) {
        name = name
          .replaceAll(/Exclude_keyof[A-Za-z]+/g, () => 'ExcludeKeys')
          .replaceAll('%22~AND~%22', 'And')
          .replaceAll('%22~OR~%22', 'Or')
          .replaceAll(/(\.?%22)|\./g, '_')
          .replace(/__+$/, '');
      }

      if (name.includes('-')) {
        name = startCase(name).replaceAll(' ', '');
      }
    }

    return name;
  };
}

export { TypeNameFormatter };
