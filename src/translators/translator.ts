import type { CodeFormatter } from '../code-formatter';
import type { CodeGenConfig } from '../configuration';
import type { TranslatorIO } from '../types/config';
import type { Logger } from '../util/logger';

/** code generation process fields used by translators */
export interface TranslatorDeps {
  logger: Logger;
  config: CodeGenConfig;
  codeFormatter: CodeFormatter;
}

/**
 * Translates generated TS code (e.g. to JS + d.ts).
 * Custom translators (`customTranslator` option) extend this class.
 */
class Translator {
  logger: Logger;
  config: CodeGenConfig;
  codeFormatter: CodeFormatter;

  /**
   * @param codeGenProcess
   */
  constructor(codeGenProcess: TranslatorDeps) {
    this.logger = codeGenProcess.logger;
    this.config = codeGenProcess.config;
    this.codeFormatter = codeGenProcess.codeFormatter;
  }

  translate(_input: TranslatorIO): Promise<TranslatorIO[]> {
    throw new Error('not implemented');
  }
}

export { Translator };
