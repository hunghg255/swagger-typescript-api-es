import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { generateApi } from '../../src';
import { generate, makeTmpDir, typeCheck } from '../helpers/generate';
import { petSpec } from './fixtures';

const writeSpec = (spec: object) => {
  const dir = makeTmpDir();
  const input = path.join(dir, 'spec.json');
  fs.writeFileSync(input, JSON.stringify(spec));
  return { dir, input };
};

describe('generateApi', () => {
  it('writes Api.ts when no name is given', async () => {
    const { dir, input } = writeSpec(petSpec);
    const output = path.join(dir, 'out');

    const result: any = await generateApi({ input, output, silent: true } as any);

    expect(fs.readdirSync(output)).toEqual(['Api.ts']);
    expect(result.files.map((f: any) => `${f.fileName}${f.fileExtension}`)).toEqual(['Api.ts']);
  });

  it('output: false generates in memory without touching the disk', async () => {
    const { dir, input } = writeSpec(petSpec);

    const result: any = await generateApi({ input, output: false, silent: true } as any);

    expect(fs.readdirSync(dir)).toEqual(['spec.json']);
    expect(result.files).toHaveLength(1);
    expect(result.files[0].fileContent).toContain('export interface Pet');
  });

  it('returns files info for every entry when called with an array', async () => {
    const { dir, input } = writeSpec(petSpec);
    const results: any = await generateApi([
      { input, output: dir, name: 'a.ts', silent: true },
      { input, output: false, name: 'b.ts', silent: true },
    ] as any);

    expect(results).toHaveLength(2);
    expect(results[0].files[0].fileName).toBe('a');
    expect(results[1].files[0].fileName).toBe('b');
    expect(fs.existsSync(path.join(dir, 'a.ts'))).toBe(true);
    expect(fs.existsSync(path.join(dir, 'b.ts'))).toBe(false);
  });

  it('honours oxfmtOptrions', async () => {
    const { files: defaults } = await generate(petSpec);
    expect(defaults['api.ts']).toContain("'application/json'");
    expect(defaults['api.ts']).toMatch(/^ {2}\S/m);

    const { files } = await generate(petSpec, {
      oxfmtOptrions: { singleQuote: false, useTabs: true },
    });
    const content = files['api.ts'];
    expect(content).not.toMatch(/^ {2}\S/m);
    expect(content).toMatch(/^\t\S/m);
    expect(content).not.toContain("'application/json'");
    expect(content).toContain('"application/json"');
  });

  it('supports utils.require() inside custom templates (ESM-safe require)', async () => {
    const templates = makeTmpDir('sta-tpl-');
    fs.writeFileSync(
      path.join(templates, 'helper.cjs'),
      'module.exports = { stamp: "from-helper" };'
    );
    fs.writeFileSync(
      path.join(templates, 'data-contracts.ejs'),
      `<% const { require } = it.utils; const helper = require('./helper.cjs'); const os = require('node:os'); %>
export const STAMP = "<%~ helper.stamp %>";
export const EOL_LEN = <%~ os.EOL.length %>;
`
    );

    const { files } = await generate(petSpec, { templates });
    expect(files['api.ts']).toContain("export const STAMP = 'from-helper';");
    expect(files['api.ts']).toContain('export const EOL_LEN = 1;');
  });
});

describe('toJS', () => {
  const cases = [
    { httpClientType: 'fetch', unwrapResponseData: false, modular: false },
    { httpClientType: 'fetch', unwrapResponseData: true, modular: false },
    { httpClientType: 'axios', unwrapResponseData: false, modular: false },
    { httpClientType: 'axios', unwrapResponseData: true, modular: false },
    { httpClientType: 'fetch', unwrapResponseData: false, modular: true },
    { httpClientType: 'axios', unwrapResponseData: false, modular: true },
  ];

  it.each(cases)('emits .js + valid .d.ts for %o', async (options) => {
    const { files } = await generate(petSpec, { toJS: true, ...options });

    const names = Object.keys(files).sort();
    expect(names.some((n) => n.endsWith('.js'))).toBe(true);
    for (const name of names) {
      expect(name).toMatch(/\.(js|d\.ts)$/);
    }
    for (const js of names.filter((n) => n.endsWith('.js'))) {
      expect(names).toContain(js.replace(/\.js$/, '.d.ts'));
      expect(files[js]).not.toMatch(/:\s*Promise</);
    }

    const apiDts = options.modular ? files['Pets.d.ts'] : files['api.d.ts'];
    const expectedReturn = options.unwrapResponseData
      ? 'Promise<Pet>'
      : options.httpClientType === 'axios'
        ? 'AxiosResponse<Pet>>'
        : 'Promise<HttpResponse<Pet, any>>';
    expect(apiDts).toContain(expectedReturn);

    const dts = Object.fromEntries(Object.entries(files).filter(([n]) => n.endsWith('.d.ts')));
    expect(typeCheck(dts)).toEqual([]);
  });
});
