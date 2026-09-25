import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import ts from 'typescript';

import { generateApi } from '../../src';

export type GeneratedFiles = Record<string, string>;

export const makeTmpDir = (prefix = 'sta-test-') => fs.mkdtempSync(path.join(os.tmpdir(), prefix));

const readDirRecursive = (dir: string, base = dir): GeneratedFiles => {
  const result: GeneratedFiles = {};
  if (!fs.existsSync(dir)) return result;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      Object.assign(result, readDirRecursive(full, base));
    } else {
      result[path.relative(base, full).split(path.sep).join('/')] = fs.readFileSync(full, 'utf8');
    }
  }
  return result;
};

/** freezes `value` and everything reachable from it */
export const deepFreeze = <T>(value: T): T => {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const key of Reflect.ownKeys(value)) {
      deepFreeze((value as Record<PropertyKey, unknown>)[key]);
    }
  }
  return value;
};

/**
 * Writes `spec` to a temp file, runs `generateApi` into a temp output dir and
 * returns every written file keyed by its path relative to the output dir.
 */
export const generate = async (spec: object | string, options: Record<string, any> = {}) => {
  const dir = makeTmpDir();
  const input = path.join(dir, typeof spec === 'string' ? 'spec.yaml' : 'spec.json');
  fs.writeFileSync(input, typeof spec === 'string' ? spec : JSON.stringify(spec));
  const output = path.join(dir, 'out');

  // `STA_FREEZE=1` (`npm run test:immutability`): pass the spec as a deep-frozen object,
  // so any change of the input document by the generator throws
  const freezeInput = process.env.STA_FREEZE && typeof spec === 'object';
  const result = await generateApi({
    name: 'api.ts',
    silent: true,
    ...options,
    ...(freezeInput ? { spec: deepFreeze(structuredClone(spec)) } : { input }),
    output,
  } as any);

  return { files: readDirRecursive(output), output, result };
};

/**
 * Type-checks generated TypeScript files with strict settings and returns the
 * diagnostics as formatted strings (empty array = compiles cleanly).
 */
export const typeCheck = (files: GeneratedFiles, extraOptions: ts.CompilerOptions = {}) => {
  const dir = makeTmpDir('sta-tsc-');
  const fileNames: string[] = [];
  for (const [name, content] of Object.entries(files)) {
    if (!/\.(ts|tsx)$/.test(name)) continue;
    const full = path.join(dir, name);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
    fileNames.push(full);
  }
  // Stub for the axios client so generated axios code can be type-checked offline.
  const axiosStub = path.join(dir, 'node_modules/axios/index.d.ts');
  fs.mkdirSync(path.dirname(axiosStub), { recursive: true });
  fs.writeFileSync(
    axiosStub,
    `export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
export interface AxiosRequestConfig<D = any> { url?: string; method?: string; baseURL?: string; headers?: any; params?: any; data?: D; responseType?: ResponseType; signal?: any; [key: string]: any }
export interface AxiosResponse<T = any, D = any> { data: T; status: number; statusText: string; headers: any; config: AxiosRequestConfig<D> }
export interface HeadersDefaults { common: any; [key: string]: any }
export interface AxiosInstance { defaults: AxiosRequestConfig & { headers: HeadersDefaults }; request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R> }
declare const axios: { create(config?: AxiosRequestConfig): AxiosInstance };
export default axios;
`
  );

  const program = ts.createProgram(fileNames, {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Node10,
    lib: ['lib.es2020.d.ts', 'lib.dom.d.ts'],
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    esModuleInterop: true,
    ...extraOptions,
  });
  return ts.getPreEmitDiagnostics(program).map((d) => {
    const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
    if (!d.file || d.start === undefined) return message;
    const { line } = d.file.getLineAndCharacterOfPosition(d.start);
    return `${path.relative(dir, d.file.fileName)}:${line + 1} ${message}`;
  });
};
