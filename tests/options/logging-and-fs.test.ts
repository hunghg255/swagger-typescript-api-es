import fs from 'node:fs';
import path from 'node:path';

import { afterEach, describe, expect, it, vi } from 'vitest';

import { generateApi } from '../../src';
import { PrettyError, handleError } from '../../src/errors';
import { FileSystem } from '../../src/util/file-system';
import { Logger } from '../../src/util/logger';
import { oas, ok } from '../generation/spec-helpers';
import { makeTmpDir } from '../helpers/generate';

afterEach(() => {
  vi.restoreAllMocks();
});

const muteConsole = () => ({
  log: vi.spyOn(console, 'log').mockImplementation(() => undefined),
  warn: vi.spyOn(console, 'warn').mockImplementation(() => undefined),
  error: vi.spyOn(console, 'error').mockImplementation(() => undefined),
  debug: vi.spyOn(console, 'debug').mockImplementation(() => undefined),
});

const printed = (spy: { mock: { calls: any[][] } }) =>
  spy.mock.calls.map((c) => c.join(' ')).join('\n');

describe('errors', () => {
  it('PrettyError keeps its name, message and a stack', () => {
    const error = new PrettyError('boom');
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('PrettyError');
    expect(error.message).toBe('boom');
    expect(error.stack).toContain('boom');
  });

  it('PrettyError works without Error.captureStackTrace', () => {
    const original = Error.captureStackTrace;
    // @ts-expect-error simulate a runtime without captureStackTrace
    Error.captureStackTrace = undefined;
    try {
      expect(new PrettyError('no capture').stack).toContain('no capture');
    } finally {
      Error.captureStackTrace = original;
    }
  });

  it('handleError prints only PrettyError messages and always sets the exit code', () => {
    const { error } = muteConsole();
    const exitCode = process.exitCode;
    try {
      handleError(new Error('internal'));
      expect(error).not.toHaveBeenCalled();
      expect(process.exitCode).toBe(1);

      process.exitCode = 0;
      handleError(new PrettyError('user facing'));
      expect(error).toHaveBeenCalledWith('user facing');
      expect(process.exitCode).toBe(1);
    } finally {
      process.exitCode = exitCode;
    }
  });
});

describe('Logger', () => {
  const create = (config: any) => new Logger({ config: { version: '9.9.9', ...config } });

  it('prints a banner with the version once, before the first message', () => {
    const { log } = muteConsole();
    const logger = create({ silent: false });
    logger.log('first');
    logger.event('second');
    const out = printed(log);
    expect(out.match(/swagger-typescript-api\(9\.9\.9\)/g)).toHaveLength(1);
    expect(out).toContain('debug mode DISABLED');
    expect(out.indexOf('9.9.9')).toBeLessThan(out.indexOf('first'));
    expect(out).toContain('second');
  });

  it('debug() is a no-op unless debug mode is on', () => {
    const { log, debug } = muteConsole();
    create({ silent: false, debug: false }).debug('hidden');
    expect(printed(log) + printed(debug)).not.toContain('hidden');
  });

  it('debug mode prints the type, a timestamp, messages, extras and a stack trace', () => {
    const { log, debug, warn } = muteConsole();
    const logger = create({ silent: false, debug: true, debugExtras: ['extra', 'info'] });
    logger.debug('dbg message', '\nsecond line');
    logger.warn('warn message');

    const debugOut = printed(debug);
    expect(printed(log)).toContain('debug mode ENABLED');
    expect(debugOut).toContain('[debug]');
    expect(debugOut).toMatch(/\d{4}-\d{2}-\d{2}T/);
    expect(debugOut).toContain('[extra info]');
    expect(debugOut).toContain('[message] dbg message');
    expect(debugOut).toContain('\n          second line');
    expect(debugOut).toContain('---');
    // other levels also get the verbose format in debug mode
    expect(printed(warn)).toContain('[warn]');
    expect(printed(warn)).toContain('warn message');
  });

  it('indents multiline messages', () => {
    const { warn } = muteConsole();
    create({ silent: false }).warn('first', '\nnext line');
    expect(printed(warn)).toMatch(/first \n.+ {3}next line/);
  });
});

describe('generateApi logging', () => {
  const spec = oas({ '/a': { get: { operationId: 'getA', responses: ok({ type: 'string' }) } } });

  it('logs progress when not silent', async () => {
    const { log } = muteConsole();
    const output = path.join(makeTmpDir(), 'out');
    await generateApi({ spec: spec as any, output, name: 'api.ts' });
    const out = printed(log);
    expect(out).toContain('Start generating your typescript api');
    expect(out).toContain('"api.ts"');
    expect(out).toContain(output);
  });

  it('logs debug information with debug: true', async () => {
    const { debug } = muteConsole();
    await generateApi({ spec: spec as any, output: false, debug: true, silent: false });
    expect(printed(debug)).toContain('Generating output for');
  });

  it('warns when a custom template is missing and uses the built-in one', async () => {
    const { warn } = muteConsole();
    const templates = makeTmpDir('sta-empty-tpl-');
    const result = await generateApi({ spec: spec as any, output: false, templates });
    expect(printed(warn)).toContain(`template not found in "${templates}"`);
    expect(result.files[0].fileContent).toContain('export class Api');
  });
});

describe('FileSystem', () => {
  const create = () => {
    const logger = { debug: vi.fn() };
    return { logger, fileSystem: new FileSystem({ logger } as any) };
  };

  it('cleanDir removes the content of a directory', () => {
    const { fileSystem } = create();
    const dir = makeTmpDir();
    fs.mkdirSync(path.join(dir, 'a/b'), { recursive: true });
    fs.writeFileSync(path.join(dir, 'a/b/c.ts'), 'x');
    fs.writeFileSync(path.join(dir, 'd.ts'), 'x');
    fileSystem.cleanDir(dir);
    expect(fs.existsSync(dir)).toBe(true);
    expect(fs.readdirSync(dir)).toEqual([]);
  });

  it('removeDir / createDir report failures through logger.debug', () => {
    const { fileSystem, logger } = create();
    fileSystem.removeDir(path.join(makeTmpDir(), 'missing'));
    expect(logger.debug).toHaveBeenCalledWith('failed to remove dir', expect.any(Error));

    const file = path.join(makeTmpDir(), 'file');
    fs.writeFileSync(file, 'x');
    fileSystem.createDir(path.join(file, 'sub'));
    expect(logger.debug).toHaveBeenCalledWith('failed to create dir', expect.any(Error));
  });

  it('createDir creates nested directories', () => {
    const { fileSystem } = create();
    const nested = path.join(makeTmpDir(), 'a/b/c');
    fileSystem.createDir(nested);
    expect(fileSystem.pathIsDir(nested)).toBe(true);
  });

  it('pathIsDir / pathIsExist', () => {
    const { fileSystem } = create();
    const dir = makeTmpDir();
    const file = path.join(dir, 'f.txt');
    fs.writeFileSync(file, 'x');
    expect(fileSystem.pathIsDir(dir)).toBe(true);
    expect(fileSystem.pathIsDir(file)).toBe(false);
    expect(fileSystem.pathIsDir(path.join(dir, 'missing'))).toBe(false);
    expect(fileSystem.pathIsDir('')).toBe(false);
    expect(fileSystem.pathIsExist(file)).toBe(true);
    expect(fileSystem.pathIsExist('')).toBe(false);
    expect(fileSystem.readDir(dir)).toEqual(['f.txt']);
  });

  it('cropExtension removes only the last extension', () => {
    const { fileSystem } = create();
    expect(fileSystem.cropExtension('api.ts')).toBe('api');
    expect(fileSystem.cropExtension('api.d.ts')).toBe('api.d');
    expect(fileSystem.cropExtension('api')).toBe('api');
  });

  it('createFile adds the generated-file banner with withPrefix', () => {
    const { fileSystem } = create();
    const dir = makeTmpDir();
    fileSystem.createFile({ path: dir, fileName: 'a.ts', content: 'export {};', withPrefix: true });
    const content = fs.readFileSync(path.join(dir, 'a.ts'), 'utf8');
    expect(content.startsWith('/* eslint-disable */')).toBe(true);
    expect(content).toContain('THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API-ES');
    expect(content.endsWith('export {};')).toBe(true);
  });

  it('works with the default logger', () => {
    const fileSystem = new FileSystem();
    expect(() => fileSystem.removeDir(path.join(makeTmpDir(), 'missing'))).not.toThrow();
  });
});
