import fs from 'node:fs';
import path from 'node:path';

import * as oxfmt from 'oxfmt';

import { OXC_FORMAT_OPTIONS } from './constants';

/** `.oxfmtrc.json` keys that are not format options */
const NON_FORMAT_RC_KEYS = ['$schema', 'ignorePatterns', 'overrides'];

class CodeFormatter {
  /**
   * @type {CodeGenConfig}
   */
  config;
  /**
   * @type {Logger}
   */
  logger;

  projectOptions: Record<string, any> | null = null;

  constructor({ config, logger }: any) {
    this.config = config;
    this.logger = logger;
  }

  /**
   * Reads format options from `.oxfmtrc.json` in the current working directory (if any).
   */
  getProjectOptions = () => {
    const rcPath = path.resolve(process.cwd(), '.oxfmtrc.json');

    if (!fs.existsSync(rcPath)) {
      return {};
    }

    try {
      const rc = JSON.parse(fs.readFileSync(rcPath, 'utf8'));
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
  getFormatOptions = () => {
    // `parser` is not an oxfmt option (kept in the public type for backward compatibility)
    const { parser: _parser, ...userOptions } = (this.config.oxfmtOptrions || {}) as any;

    return {
      ...OXC_FORMAT_OPTIONS,
      ...(this.projectOptions ??= this.getProjectOptions()),
      ...userOptions,
    };
  };

  /**
   * @param content
   * @returns {Promise<string>}
   */
  oxcFormat = async (content: any) => {
    try {
      const formatted = await oxfmt.format('file.ts', content, this.getFormatOptions() as any);

      if (formatted.errors?.length) {
        this.logger?.warn(
          'failed to format generated code, it is written unformatted:',
          ...formatted.errors.map((error: any) => error.codeframe || error.message)
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
