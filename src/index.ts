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
import { GenerateApiOutput, IOptions } from './types';

const createCodeGenProcess = ({ name, ...config }: IOptions): { start(): Promise<any> } =>
  new CodeGenProcess({
    ...config,
    // `undefined` keeps the default file name ("Api.ts")
    fileName: name,
  } as any);

async function generateApi(options: IOptions): Promise<GenerateApiOutput>;
async function generateApi(options: IOptions[]): Promise<GenerateApiOutput[]>;
async function generateApi(
  options: IOptions | IOptions[]
): Promise<GenerateApiOutput | GenerateApiOutput[]>;
async function generateApi(options: IOptions | IOptions[]) {
  if (Array.isArray(options)) {
    const results: GenerateApiOutput[] = [];
    for (const option of options) {
      results.push(await createCodeGenProcess(option).start());
    }
    return results;
  }

  return createCodeGenProcess(options).start();
}

export const defaultConfig = (options: IOptions | IOptions[]) => {
  return options;
};

export { generateApi };
export * as constants from './constants';

export { generateTemplates } from './commands/generate-templates';
