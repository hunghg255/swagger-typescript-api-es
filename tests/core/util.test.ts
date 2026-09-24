import fs from 'node:fs';
import path from 'node:path';

import { afterEach, describe, expect, it, vi } from 'vitest';

import { CodeFormatter } from '../../src/code-formatter';
import { FileSystem } from '../../src/util/file-system';
import { Logger } from '../../src/util/logger';
import { makeTmpDir } from '../helpers/generate';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('FileSystem.createFile', () => {
  it('resolves relative paths against process.cwd()', () => {
    const cwd = makeTmpDir('sta-cwd-');
    fs.mkdirSync(path.join(cwd, 'out'));
    vi.spyOn(process, 'cwd').mockReturnValue(cwd);

    new FileSystem({ logger: { debug: vi.fn() } } as any).createFile({
      path: './out',
      fileName: 'a.ts',
      content: 'x',
      withPrefix: false,
    });

    expect(fs.readFileSync(path.join(cwd, 'out/a.ts'), 'utf8')).toBe('x');
  });

  it('createDir ignores a falsy path', () => {
    const logger = { debug: vi.fn() };
    new FileSystem({ logger } as any).createDir(false);
    expect(logger.debug).not.toHaveBeenCalled();
  });
});

describe('Logger', () => {
  const create = (config: any) => new Logger({ config: { version: '0', ...config } });

  it('silent suppresses log/warn but keeps errors', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const logger = create({ silent: true });

    logger.log('a');
    logger.success('b');
    logger.event('c');
    logger.warn('d');
    logger.error('something failed');

    expect(log).not.toHaveBeenCalled();
    expect(warn).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledTimes(1);
    expect(error.mock.calls[0].join(' ')).toContain('something failed');
  });

  it('non-silent prints logs', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    create({ silent: false }).log('hello');
    expect(log.mock.calls.flat().join(' ')).toContain('hello');
  });
});

describe('CodeFormatter', () => {
  const create = (oxfmtOptrions: any = {}, logger: any = { error: vi.fn(), warn: vi.fn() }) =>
    new CodeFormatter({ config: { oxfmtOptrions }, logger });

  it('uses the built-in defaults (single quotes, 2 spaces)', async () => {
    vi.spyOn(process, 'cwd').mockReturnValue(makeTmpDir('sta-fmt-'));
    const out = await create().formatCode('const a = {b: "x"}');
    expect(out).toBe("const a = { b: 'x' };\n");
  });

  it('merges user oxfmtOptrions over defaults', async () => {
    vi.spyOn(process, 'cwd').mockReturnValue(makeTmpDir('sta-fmt-'));
    const out = await create({ singleQuote: false, semi: false }).formatCode('const a = {b: "x"}');
    expect(out).toBe('const a = { b: "x" }\n');
  });

  it('reads .oxfmtrc.json from cwd; user options still win', async () => {
    const cwd = makeTmpDir('sta-fmt-');
    fs.writeFileSync(
      path.join(cwd, '.oxfmtrc.json'),
      JSON.stringify({ $schema: 'x', ignorePatterns: ['a'], semi: false, useTabs: true })
    );
    vi.spyOn(process, 'cwd').mockReturnValue(cwd);

    expect(await create().formatCode('if (a) {b("x")}')).toBe("if (a) {\n\tb('x')\n}\n");
    expect(await create({ useTabs: false }).formatCode('if (a) {b("x")}')).toBe(
      "if (a) {\n  b('x')\n}\n"
    );
  });

  it('reports format errors through the logger and returns the input', async () => {
    vi.spyOn(process, 'cwd').mockReturnValue(makeTmpDir('sta-fmt-'));
    const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const logger = { error: vi.fn(), warn: vi.fn() };
    const out = await create({}, logger).formatCode('const a = {');
    expect(out).toBe('const a = {');
    expect(logger.warn.mock.calls.length + logger.error.mock.calls.length).toBeGreaterThan(0);
    expect(consoleLog).not.toHaveBeenCalled();
  });
});
