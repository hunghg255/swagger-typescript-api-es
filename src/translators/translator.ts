/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @typedef {{ fileName: string, fileExtension: string, fileContent: string }} TranslatorIO
 */

class Translator {
  /** @type {Logger} */
  logger;
  /** @type {CodeGenConfig} */
  config;
  /** @type {CodeFormatter} */
  codeFormatter;

  /**
   * @param codeGenProcess
   */
  constructor(codeGenProcess: any) {
    this.logger = codeGenProcess.logger;
    this.config = codeGenProcess.config;
    this.codeFormatter = codeGenProcess.codeFormatter;
  }

  /**
   *
   * @param input {TranslatorIO}
   * @return {Promise<TranslatorIO[]>}
   */
  translate(input: any) {
    throw new Error('not implemented');
  }
}

export { Translator };
