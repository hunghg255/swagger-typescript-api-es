import * as oxfmt from 'oxfmt';

class CodeFormatter {
  /**
   * @type {CodeGenConfig}
   */
  config;

  constructor({ config }: any) {
    this.config = config;
  }

  /**
   * @param content
   * @returns {Promise<string>}
   */
  oxcFormat = async (content: any) => {
    try {
      const formatted = await oxfmt.format('file.ts', content, {
        singleQuote: true,
        jsxSingleQuote: true,
        printWidth: 100,
        trailingComma: 'es5',
        tabWidth: 2,
        semi: true,
        sortImports: {
          groups: [
            'builtin',
            'external',
            ['internal', 'subpath'],
            ['parent', 'sibling', 'index'],
            'style',
            'unknown',
          ],
        },
      });

      return formatted.code;
    } catch (error) {
      console.log(error);

      return content;
    }
  };

  formatCode = async (code: string) => {
    return this.oxcFormat(code);
  };
}

// class TsLanguageServiceHost {
//   constructor(fileName: any, content: any) {
//     const tsconfig = ts.findConfigFile(fileName, ts.sys.fileExists);

//     Object.assign(this, {
//       fileName,
//       content,
//       compilerOptions: tsconfig
//         ? (ts as any).convertCompilerOptionsFromJson(
//             ts.readConfigFile(tsconfig, ts.sys.readFile).config.compilerOptions
//           ).options
//         : ts.getDefaultCompilerOptions(),
//     });
//   }

//   getNewLine() {
//     return 'newLine' in ts.sys ? ts.sys.newLine : '\n';
//   }

//   getScriptFileNames() {
//     // @ts-ignore
//     return [this.fileName];
//   }

//   getCompilationSettings() {
//     // @ts-ignore
//     return this.compilerOptions;
//   }

//   getDefaultLibFileName() {
//     return ts.getDefaultLibFileName(this.getCompilationSettings());
//   }

//   getCurrentDirectory() {
//     return process.cwd();
//   }

//   getScriptVersion() {
//     return ts.version;
//   }

//   getScriptSnapshot() {
//     // @ts-ignore
//     return ts.ScriptSnapshot.fromString(this.content);
//   }

//   readFile(fileName: any, encoding: any) {
//     // @ts-ignore
//     if (fileName === this.fileName) {
//       // @ts-ignore
//       return this.content;
//     }

//     return ts.sys.readFile(fileName, encoding);
//   }

//   fileExists(path: any) {
//     return ts.sys.fileExists(path);
//   }
// }

export { CodeFormatter };
