import fs from 'node:fs';
import path from 'node:path';

import * as oxfmt from 'oxfmt';
import type { FormatConfig } from 'oxfmt';

import { OXC_FORMAT_OPTIONS } from './constants';
import type { OxfmtOptions } from './types/config';
import type { Logger } from './util/logger';
import { isObjectRecord } from './util/type-guards';

/** config fields used by `CodeFormatter` */
export interface CodeFormatterConfig {
  oxfmtOptrions?: OxfmtOptions | null;
}

/** `.oxfmtrc.json` keys that are not format options */
const NON_FORMAT_RC_KEYS = ['$schema', 'ignorePatterns', 'overrides'];

class CodeFormatter {
  config: CodeFormatterConfig;
  logger: Pick<Logger, 'warn' | 'error'> | null | undefined;

  projectOptions: FormatConfig | null = null;

  constructor({
    config,
    logger,
  }: {
    config: CodeFormatterConfig;
    logger?: Pick<Logger, 'warn' | 'error'> | null;
  }) {
    this.config = config;
    this.logger = logger;
  }

  /**
   * Reads format options from `.oxfmtrc.json` in the current working directory (if any).
   */
  getProjectOptions = (): FormatConfig => {
    const rcPath = path.resolve(process.cwd(), '.oxfmtrc.json');

    if (!fs.existsSync(rcPath)) {
      return {};
    }

    try {
      const rc: unknown = JSON.parse(fs.readFileSync(rcPath, 'utf8'));
      if (!isObjectRecord(rc)) {
        throw new TypeError('expected an object');
      }
      for (const key of NON_FORMAT_RC_KEYS) {
        delete rc[key];
      }
      return rc;
    } catch (error) {
      this.logger?.warn(`failed to read "${rcPath}", using default format options`, error);
      return {};
    }
  };

  /**
   * defaults < `.oxfmtrc.json` < `config.oxfmtOptrions`
   */
  getFormatOptions = (): FormatConfig => {
    // `parser` is not an oxfmt option (kept in the public type for backward compatibility)
    const { parser: _parser, ...userOptions } = this.config.oxfmtOptrions || {};

    return {
      ...OXC_FORMAT_OPTIONS,
      ...(this.projectOptions ??= this.getProjectOptions()),
      ...userOptions,
    };
  };

  oxcFormat = async (content: string): Promise<string> => {
    try {
      const formatted = await oxfmt.format('file.ts', content, this.getFormatOptions());

      if (formatted.errors?.length) {
        this.logger?.warn(
          'failed to format generated code, it is written unformatted:',
          ...formatted.errors.map((error) => error.codeframe || error.message)
        );
      }

      return formatted.code;
    } catch (error) {
      this.logger?.error('failed to format generated code', error);

      return content;
    }
  };

  formatCode = async (code: string) => {
    return this.oxcFormat(code);
  };
}

export { CodeFormatter };
