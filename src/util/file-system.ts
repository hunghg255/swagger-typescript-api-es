import fs from 'node:fs';
import { resolve } from 'node:path';

import { split } from 'lodash-es';

import { Logger } from './logger';

const FILE_PREFIX = `/* eslint-disable */
/*
 * ----------------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API-ES            ##
 * ----------------------------------------------------------------------
 */

`;

/** params of `FileSystem.createFile` */
export interface CreateFileParams {
  /** output directory (relative paths are resolved against `process.cwd()`) */
  path: string;
  fileName: string;
  content: string;
  /** add the "generated file" banner */
  withPrefix?: boolean;
}

/** a path, or a falsy value (ignored) */
type MaybePath = string | false | null | undefined;

class FileSystem {
  logger: Pick<Logger, 'debug'>;

  constructor({ logger = new Logger({ config: {} }) }: { logger?: Pick<Logger, 'debug'> } = {}) {
    this.logger = logger;
  }

  getFileContent = (path: string) => {
    return fs.readFileSync(path, { encoding: 'utf8' });
  };

  readDir = (path: string) => {
    return fs.readdirSync(path);
  };

  pathIsDir = (path: MaybePath) => {
    if (!path) {
      return false;
    }

    try {
      const stat = fs.statSync(path);
      return stat.isDirectory();
    } catch {
      return false;
    }
  };

  cropExtension = (fileName: string) => {
    const fileNameParts = split(fileName, '.');

    if (fileNameParts.length > 1) {
      fileNameParts.pop();
    }

    return fileNameParts.join('.');
  };

  removeDir = (path: string) => {
    try {
      if (typeof fs.rmSync === 'function') {
        fs.rmSync(path, { recursive: true });
      } else {
        fs.rmdirSync(path, { recursive: true });
      }
    } catch (error) {
      this.logger.debug('failed to remove dir', error);
    }
  };

  createDir = (path: MaybePath) => {
    if (!path) {
      return;
    }

    try {
      fs.mkdirSync(path, { recursive: true });
    } catch (error) {
      this.logger.debug('failed to create dir', error);
    }
  };

  cleanDir = (path: string) => {
    this.removeDir(path);
    this.createDir(path);
  };

  pathIsExist = (path: MaybePath) => {
    return !!path && fs.existsSync(path);
  };

  createFile = ({ path, fileName, content, withPrefix }: CreateFileParams) => {
    // relative paths are relative to the user's working directory, not to this package
    const absolutePath = resolve(process.cwd(), path, `./${fileName}`);
    const fileContent = `${withPrefix ? FILE_PREFIX : ''}${content}`;

    // note: the third argument of `writeFileSync` is `options`, a function there is ignored
    return fs.writeFileSync(absolutePath, fileContent);
  };
}

export { FileSystem };
