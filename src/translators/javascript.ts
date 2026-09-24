import ts from 'typescript';

import type { TranslatorIO } from '../types/config';
import { Translator } from './translator';

class JavascriptTranslator extends Translator {
  /**
   * @returns emitted files: Record<fileName, content>
   */
  compileTSCode = (input: TranslatorIO) => {
    const fileNameFull = `${input.fileName}${input.fileExtension}`;
    const output: Record<string, string> = {};
    const host = ts.createCompilerHost(this.config.compilerTsConfig, true);
    const fileNames = [fileNameFull];
    const originalSourceFileGet = host.getSourceFile.bind(host);
    host.getSourceFile = (sourceFileName, languageVersion, onError, shouldCreateNewSourceFile) => {
      if (sourceFileName !== fileNameFull) {
        return originalSourceFileGet(
          sourceFileName,
          languageVersion,
          onError,
          shouldCreateNewSourceFile
        );
      }

      return ts.createSourceFile(
        sourceFileName,
        input.fileContent,
        languageVersion,
        true,
        ts.ScriptKind.TS
      );
    };

    host.writeFile = (fileName, contents) => {
      output[fileName] = contents;
    };

    ts.createProgram(fileNames, this.config.compilerTsConfig, host).emit();

    return output;
  };

  translate = async (input: TranslatorIO): Promise<TranslatorIO[]> => {
    const compiled = this.compileTSCode(input);

    const jsFileName = `${input.fileName}${ts.Extension.Js}`;
    const dtsFileName = `${input.fileName}${ts.Extension.Dts}`;
    const sourceContent = compiled[jsFileName];
    const tsImportRows = input.fileContent.split('\n').filter((line) => line.startsWith('import '));
    const declarationContent = compiled[dtsFileName]
      .split('\n')
      .map((line) => {
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
