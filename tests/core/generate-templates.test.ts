import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { generateTemplates } from '../../src';
import { makeTmpDir } from '../helpers/generate';

const repoTemplates = path.resolve(__dirname, '../../templates');

describe('generateTemplates', () => {
  it.each([
    { modular: false, httpClientType: 'fetch' as const },
    { modular: true, httpClientType: 'axios' as const },
  ])('writes the source templates (%o)', async ({ modular, httpClientType }) => {
    const output = path.join(makeTmpDir('sta-gen-tpl-'), 'templates');

    const result: any = await generateTemplates({
      output,
      modular,
      httpClientType,
      silent: true,
    } as any);

    const written = fs.readdirSync(output).sort();
    const expected = [
      ...fs.readdirSync(path.join(repoTemplates, 'base')),
      ...fs.readdirSync(path.join(repoTemplates, modular ? 'modular' : 'default')),
    ]
      .filter((f) => f.endsWith('.ejs'))
      .sort();

    expect(written).toEqual(expected);
    expect(result.files.map((f: any) => f.name).sort()).toEqual(expected);

    const httpClient = fs.readFileSync(path.join(output, 'http-client.ejs'), 'utf8');
    const apiTemplate = fs.readFileSync(path.join(output, 'api.ejs'), 'utf8');
    expect(httpClient).toBe(
      fs.readFileSync(
        path.join(repoTemplates, `base/http-clients/${httpClientType}-http-client.ejs`),
        'utf8'
      )
    );
    expect(apiTemplate).not.toMatch(/includeFile\(["'`]@(base|default|modular)\//);
  });

  it('does not overwrite existing templates unless rewrite is set', async () => {
    const output = makeTmpDir('sta-gen-tpl-');
    fs.writeFileSync(path.join(output, 'api.ejs'), 'custom');

    await generateTemplates({ output, silent: true } as any);
    expect(fs.readFileSync(path.join(output, 'api.ejs'), 'utf8')).toBe('custom');

    await generateTemplates({ output, silent: true, rewrite: true } as any);
    expect(fs.readFileSync(path.join(output, 'api.ejs'), 'utf8')).not.toBe('custom');
  });
});
