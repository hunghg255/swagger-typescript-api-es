import fs from 'node:fs';
import path from 'node:path';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { makeTmpDir } from '../helpers/generate';

const mocks = vi.hoisted(() => ({
  generateApi: vi.fn(),
  readConfig: vi.fn(),
}));

vi.mock('../../src/index.ts', () => ({ generateApi: mocks.generateApi }));
vi.mock('unreadconfig', async (importOriginal) => ({
  ...((await importOriginal()) as any),
  readConfig: mocks.readConfig,
}));

// eslint-disable-next-line import/first
import { startCli } from '../../src/cli-start';

const run = (...args: string[]) => startCli(['node', 'swagger-typescript-api-es', ...args]);

describe('startCli', () => {
  let exitSpy: any;
  let logSpy: any;

  beforeEach(() => {
    mocks.generateApi.mockReset().mockResolvedValue({ files: [] });
    mocks.readConfig.mockReset().mockReturnValue(null);
    exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => undefined) as any);
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('runs generateApi with CLI flags and exits 0 when no config file exists', async () => {
    await run('--u', 'spec.json', '--o', './out', '--union-enums', 'true', '--noClient', 'true');

    expect(mocks.generateApi).toHaveBeenCalledTimes(1);
    expect(mocks.generateApi).toHaveBeenCalledWith({
      url: 'spec.json',
      output: './out',
      generateUnionEnums: true,
      generateClient: false,
    });
    expect(exitSpy).toHaveBeenCalledWith(0);
  });

  it('prints a friendly error and exits 1 when generateApi rejects', async () => {
    mocks.generateApi.mockRejectedValue(new Error('boom'));

    await run('--u', 'spec.json');

    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(exitSpy).not.toHaveBeenCalledWith(0);
    expect(logSpy.mock.calls.flat().join(' ')).toMatch(/SWAGGER-TYPESCRIPT-API error: boom/);
  });

  it('exits 1 with a helpful message when neither config nor url are given', async () => {
    await run();

    expect(mocks.generateApi).not.toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(logSpy.mock.calls.flat().join(' ')).toMatch(/--u/);
  });

  it('uses the config file when no flags are passed', async () => {
    mocks.readConfig.mockReturnValue({ url: 'from-config.json', name: 'a.ts', output: './x' });

    await run();

    expect(mocks.generateApi).toHaveBeenCalledWith({
      url: 'from-config.json',
      name: 'a.ts',
      output: './x',
    });
    expect(exitSpy).toHaveBeenCalledWith(0);
  });

  it('merges config file with CLI flags, CLI flags win', async () => {
    mocks.readConfig.mockReturnValue({ url: 'from-config.json', name: 'a.ts', modular: false });

    await run('--n', 'b.ts', '--modular', 'true');

    expect(mocks.generateApi).toHaveBeenCalledWith({
      url: 'from-config.json',
      name: 'b.ts',
      modular: true,
    });
  });

  it('handles a config file exporting an array (merged by unreadconfig into an index object)', async () => {
    mocks.readConfig.mockReturnValue({
      0: { url: 'a.json', name: 'a.ts' },
      1: { url: 'b.json', name: 'b.ts' },
    });

    await run('--o', './out');

    expect(mocks.generateApi).toHaveBeenCalledWith([
      { url: 'a.json', name: 'a.ts', output: './out' },
      { url: 'b.json', name: 'b.ts', output: './out' },
    ]);
  });

  it('handles a config file exporting a real array', async () => {
    mocks.readConfig.mockReturnValue([{ url: 'a.json' }]);

    await run();

    expect(mocks.generateApi).toHaveBeenCalledWith([{ url: 'a.json' }]);
  });

  it('loads --custom-config and lets explicit flags override it', async () => {
    const dir = makeTmpDir('sta-cli-');
    const customConfig = path.join(dir, 'custom.config.mjs');
    fs.writeFileSync(
      customConfig,
      `export default { typePrefix: 'I', name: 'custom.ts', hooks: { onInit: (c) => c } };`
    );

    await run('--u', 'spec.json', '--custom-config', customConfig, '--n', 'flag.ts');

    const options = mocks.generateApi.mock.calls[0][0];
    expect(options.typePrefix).toBe('I');
    expect(options.name).toBe('flag.ts');
    expect(typeof options.hooks.onInit).toBe('function');
    expect(options).not.toHaveProperty('customConfig');
  });

  it('exits 1 when --custom-config points to a missing file', async () => {
    await run('--u', 'spec.json', '--custom-config', '/definitely/not/here.mjs');

    expect(mocks.generateApi).not.toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it('can be started more than once (commands are not registered twice)', async () => {
    await run('--u', 'a.json');
    await run('--u', 'b.json');

    expect(mocks.generateApi).toHaveBeenCalledTimes(2);
    expect(mocks.generateApi.mock.calls[1][0]).toEqual({ url: 'b.json' });
  });
});
