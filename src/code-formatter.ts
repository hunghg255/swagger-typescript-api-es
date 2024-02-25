/* eslint-disable indent */
import _ from 'lodash';
import prettier from 'prettier';
import ts from 'typescript';

class CodeFormatter {
  /**
   * @type {CodeGenConfig}
   */
  config;

  constructor({ config }: any) {
    this.config = config;
  }

  removeUnusedImports = (content: any) => {
    const tempFileName = 'file.ts';

    const host = new TsLanguageServiceHost(tempFileName, content);
    const languageService: any = ts.createLanguageService(host);

    const fileTextChanges = languageService.organizeImports(
      { type: 'file', fileName: tempFileName },
      { newLineCharacter: ts.sys.newLine },
    )[0];

    if (fileTextChanges && fileTextChanges.textChanges.length > 0) {
      return _.reduceRight(
        fileTextChanges.textChanges,
        (content, { span, newText }) =>
          `${content.slice(0, span.start)}${newText}${content.slice(span.start + span.length)}`,
        content,
      );
    }

    return content;
  };

  /**
   * @param content
   * @returns {Promise<string>}
   */
  prettierFormat = async (content: any) => {
    const formatted = await prettier.format(content, this.config.prettierOptions);
    return formatted;
  };

  formatCode = async (code: any, { removeUnusedImports = true, prettierFormat = true } = {}) => {
    if (removeUnusedImports) {
      code = this.removeUnusedImports(code);
    }
    if (prettierFormat) {
      code = await this.prettierFormat(code);
    }
    return code;
  };
}

class TsLanguageServiceHost {
  constructor(fileName: any, content: any) {
    const tsconfig = ts.findConfigFile(fileName, ts.sys.fileExists);

    Object.assign(this, {
      fileName,
      content,
      compilerOptions: tsconfig
        ? (ts as any).convertCompilerOptionsFromJson(
            ts.readConfigFile(tsconfig, ts.sys.readFile).config.compilerOptions,
          ).options
        : ts.getDefaultCompilerOptions(),
    });
  }

  getNewLine() {
    return 'newLine' in ts.sys ? ts.sys.newLine : '\n';
  }

  getScriptFileNames() {
    // @ts-ignore
    return [this.fileName];
  }

  getCompilationSettings() {
    // @ts-ignore
    return this.compilerOptions;
  }

  getDefaultLibFileName() {
    return ts.getDefaultLibFileName(this.getCompilationSettings());
  }

  getCurrentDirectory() {
    return process.cwd();
  }

  getScriptVersion() {
    return ts.version;
  }

  getScriptSnapshot() {
    // @ts-ignore
    return ts.ScriptSnapshot.fromString(this.content);
  }

  readFile(fileName: any, encoding: any) {
    // @ts-ignore
    if (fileName === this.fileName) {
      // @ts-ignore
      return this.content;
    }

    return ts.sys.readFile(fileName, encoding);
  }

  fileExists(path: any) {
    return ts.sys.fileExists(path);
  }
}

export { CodeFormatter };
