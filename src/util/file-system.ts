import fs from 'node:fs';
import { resolve } from 'node:path';

import _ from 'lodash';
import makeDir from 'make-dir';

import { __dirname_esm } from '~src/constants';

import { Logger } from './logger';

const FILE_PREFIX = `/* eslint-disable */
/*
 * ----------------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API-ES            ##
 * ## SOURCE: https://github.com/hunghg255/swagger-typescript-api-es   ##
 * ----------------------------------------------------------------------
 */

`;

class FileSystem {
  /** @type {Logger} */
  logger;

  // @ts-ignore
  constructor({ logger = new Logger('file-system') } = {}) {
    this.logger = logger;
  }

  getFileContent = (path: any) => {
    return fs.readFileSync(path, { encoding: 'utf8' } as any);
  };

  readDir = (path: any) => {
    return fs.readdirSync(path);
  };

  pathIsDir = (path: any) => {
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

  cropExtension = (fileName: any) => {
    const fileNameParts = _.split(fileName, '.');

    if (fileNameParts.length > 1) {
      fileNameParts.pop();
    }

    return fileNameParts.join('.');
  };

  removeDir = (path: any) => {
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

  createDir = (path: any) => {
    try {
      makeDir.sync(path);
    } catch (error) {
      this.logger.debug('failed to create dir', error);
    }
  };

  cleanDir = (path: any) => {
    this.removeDir(path);
    this.createDir(path);
  };

  pathIsExist = (path: any) => {
    return !!path && fs.existsSync(path);
  };

  createFile = ({ path, fileName, content, withPrefix }: any) => {
    const absolutePath = resolve(__dirname_esm, path, `./${fileName}`);
    const fileContent = `${withPrefix ? FILE_PREFIX : ''}${content}`;

    // @ts-ignore
    return fs.writeFileSync(absolutePath, fileContent, _.noop);
  };
}

export { FileSystem };
