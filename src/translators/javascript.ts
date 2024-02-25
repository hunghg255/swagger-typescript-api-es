import ts from 'typescript';

import { Translator } from './translator';

class JavascriptTranslator extends Translator {
  /**
   * @param {TranslatorIO} input
   * @returns {Record<string, string>}
   */
  compileTSCode = (input: any) => {
    const fileNameFull = `${input.fileName}${input.fileExtension}`;
    const output = {};
    const host = ts.createCompilerHost(this.config.compilerTsConfig, true);
    const fileNames = [fileNameFull];
    const originalSourceFileGet = host.getSourceFile.bind(host);
    host.getSourceFile = (sourceFileName, languageVersion, onError, shouldCreateNewSourceFile) => {
      if (sourceFileName !== fileNameFull) {
        return originalSourceFileGet(
          sourceFileName,
          languageVersion,
          onError,
          shouldCreateNewSourceFile,
        );
      }

      return ts.createSourceFile(
        sourceFileName,
        input.fileContent,
        languageVersion,
        true,
        ts.ScriptKind.TS,
      );
    };

    host.writeFile = (fileName: any, contents: any) => {
      // @ts-ignore
      output[fileName] = contents;
    };

    ts.createProgram(fileNames, this.config.compilerTsConfig, host).emit();

    return output;
  };

  translate = async (input: any) => {
    const compiled: any = this.compileTSCode(input);

    const jsFileName = `${input.fileName}${ts.Extension.Js}`;
    const dtsFileName = `${input.fileName}${ts.Extension.Dts}`;
    const sourceContent = compiled[jsFileName];
    const tsImportRows = input.fileContent
      .split('\n')
      .filter((line: any) => line.startsWith('import '));
    const declarationContent = compiled[dtsFileName]
      .split('\n')
      .map((line: any) => {
        if (line.startsWith('import ')) {
          return tsImportRows.shift();
        }
        return line;
      })
      .join('\n');

    return [
      {
        fileName: input.fileName,
        fileExtension: ts.Extension.Js,
        fileContent: await this.codeFormatter.formatCode(sourceContent),
      },
      {
        fileName: input.fileName,
        fileExtension: ts.Extension.Dts,
        fileContent: await this.codeFormatter.formatCode(declarationContent),
      },
    ];
  };
}

export { JavascriptTranslator };
