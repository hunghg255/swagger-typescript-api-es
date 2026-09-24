import path from 'node:path';

import ts from 'typescript';
import { describe, expect, it } from 'vitest';

import { CodeGenConfig } from '../../src/configuration';
import * as CONSTANTS from '../../src/constants';
import { objectAssign } from '../../src/util/object-assign';

describe('CodeGenConfig', () => {
  it('defaults output to the current working directory ("./")', () => {
    const config = new CodeGenConfig({} as any);
    expect(config.output).toBe(path.resolve(process.cwd(), './'));
  });

  it('resolves a relative output against cwd', () => {
    const config = new CodeGenConfig({ output: './gen' } as any);
    expect(config.output).toBe(path.resolve(process.cwd(), 'gen'));
  });

  it('keeps output: false (in-memory generation)', () => {
    const config = new CodeGenConfig({ output: false } as any);
    expect(config.output).toBe(false);
  });

  it('does not let undefined options override defaults', () => {
    const config = new CodeGenConfig({
      fileName: undefined,
      oxfmtOptrions: undefined,
      apiClassName: undefined,
      moduleNameIndex: undefined,
    } as any);
    expect(config.fileName).toBe('Api.ts');
    expect(config.apiClassName).toBe('Api');
    expect(config.moduleNameIndex).toBe(0);
    expect(config.oxfmtOptrions).toEqual({});
  });

  it('keeps explicit falsy values (null / false / 0 / "")', () => {
    const config = new CodeGenConfig({
      generateClient: false,
      moduleNameIndex: 0,
      typePrefix: '',
      spec: null,
    } as any);
    expect(config.generateClient).toBe(false);
    expect(config.moduleNameIndex).toBe(0);
    expect(config.typePrefix).toBe('');
    expect(config.spec).toBe(null);
  });

  it('uses TypeScript enums in compilerTsConfig', () => {
    const config = new CodeGenConfig({} as any);
    expect(config.compilerTsConfig.module).toBe(ts.ModuleKind.ESNext);
    expect(config.compilerTsConfig.target).toBe(ts.ScriptTarget.ESNext);
    // must not throw
    ts.createProgram([], config.compilerTsConfig as ts.CompilerOptions);
  });

  it('exposes formatter defaults in constants', () => {
    expect(CONSTANTS.OXC_FORMAT_OPTIONS).toMatchObject({ singleQuote: true, printWidth: 100 });
  });
});

describe('objectAssign', () => {
  it('skips undefined values at the top level and merges the rest', () => {
    const target: any = { a: 1, b: { c: 2, d: 3 }, e: 'x' };
    objectAssign(target, { a: undefined, b: { c: 5 }, e: null });
    expect(target).toEqual({ a: 1, b: { c: 5, d: 3 }, e: null });
  });

  it('supports updater functions', () => {
    const target: any = { a: 1 };
    objectAssign(target, (t: any) => ({ a: t.a + 1, b: undefined }));
    expect(target).toEqual({ a: 2 });
    expect('b' in target).toBe(false);
  });
});
