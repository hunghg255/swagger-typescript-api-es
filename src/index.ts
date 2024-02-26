/**
  swagger-typescript-api

  MIT License

  Copyright (c) 2019-present acacode

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  'Software'), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @fileoverview Generate api via swagger scheme. Supports OA 3.0, 2.0, JSON, yaml.
 * @author Acacode
 *
 * Rewritten to TypeScript and ES Module by Hung (@hunghg255)
 */

import { CodeGenProcess } from './code-gen-process.js';
import { IOptions } from './types';

const generateApi = ({ name, prettier, ...config }: IOptions) => {
  const codeGenProcess = new CodeGenProcess({
    ...config,
    fileName: name,
    prettierOptions: prettier,
  } as any);
  return codeGenProcess.start();
};

export const defaultConfig = (options: IOptions) => {
  return options;
};

export { generateApi };
export * as constants from './constants';

export { generateTemplates } from './commands/generate-templates';
