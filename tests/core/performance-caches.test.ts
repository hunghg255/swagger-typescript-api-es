import fs from 'node:fs';
import path from 'node:path';

import ts from 'typescript';
import { describe, expect, it, vi } from 'vitest';

import { CodeGenConfig } from '../../src/configuration';
import { TemplatesWorker } from '../../src/templates-worker';
import { generate, typeCheck } from '../helpers/generate';

const SRC_DIR = path.resolve(__dirname, '../../src');

const listSourceFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listSourceFiles(full);
    return entry.name.endsWith('.ts') && !entry.name.endsWith('.test.ts') ? [full] : [];
  });

const spec = {
  openapi: '3.0.3',
  info: { title: 't', version: '1' },
  paths: Object.fromEntries(
    Array.from({ length: 20 }, (_, i) => [
      `/items${i}/{id}`,
      {
        get: {
          operationId: `getItem${i}`,
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: {
              description: 'ok',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Item' } } },
            },
          },
        },
      },
    ])
  ),
  components: {
    schemas: { Item: { type: 'object', properties: { id: { type: 'string' } } } },
  },
};

const createWorker = (getFileContent: (path: string) => string) => {
  const config = new CodeGenConfig({});
  const worker = new TemplatesWorker({
    config,
    logger: { log: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() } as any,
    fileSystem: { pathIsExist: () => true, getFileContent } as any,
    getRenderTemplateData: () => ({}) as any,
  });
  config.update({ templatePaths: worker.getTemplatePaths(config) });
  return { config, worker };
};

describe('compiled template cache', () => {
  it('compiles each template source once, however many times it is rendered', () => {
    const { worker } = createWorker(() => '');
    for (let i = 0; i < 50; i++) {
      expect(worker.renderTemplate('<%~ it.value %>!', { value: i })).toBe(`${i}!`);
    }
    expect(worker.renderTemplate('other <%~ it.value %>', { value: 1 })).toBe('other 1');
    expect(worker.compiledTemplates.size).toBe(2);
  });

  it('includeFile still receives its own data', () => {
    const { worker } = createWorker((file) =>
      file.includes('partial') ? 'partial:<%~ it.x %>' : ''
    );
    const out = worker.renderTemplate(
      '<% for (const x of it.xs) { %><%~ includeFile("@base/partial", { x }) %>;<% } %>',
      { xs: [1, 2, 3] }
    );
    expect(out).toBe('partial:1;partial:2;partial:3;');
  });
});

describe('included template contents cache', () => {
  it('reads an included template from disk once', () => {
    const getFileContent = vi.fn(() => 'content');
    const { worker } = createWorker(getFileContent);
    for (let i = 0; i < 10; i++) {
      expect(worker.getTemplateContent('@base/data-contracts')).toBe('content');
    }
    expect(getFileContent).toHaveBeenCalledTimes(1);
  });

  it('is invalidated when templatePaths change', () => {
    const getFileContent = vi.fn((file: string) => file);
    const { config, worker } = createWorker(getFileContent);
    const first = worker.getTemplateContent('@base/data-contracts');
    config.update({ templatePaths: { ...config.templatePaths, base: '/other/base' } });
    const second = worker.getTemplateContent('@base/data-contracts');
    expect(second).not.toBe(first);
    expect(second).toContain('/other/base');
    expect(getFileContent).toHaveBeenCalledTimes(2);
  });
});

describe('typescript is loaded lazily', () => {
  it('is only imported as a type in src (runtime import only in the JS translator)', () => {
    const valueImports = listSourceFiles(SRC_DIR).filter((file) =>
      /^import\s+(?!type\b)[^;]*from\s+['"]typescript['"]/m.test(fs.readFileSync(file, 'utf8'))
    );
    expect(valueImports).toEqual([]);
    expect(fs.readFileSync(path.join(SRC_DIR, 'translators/javascript.ts'), 'utf8')).toContain(
      "import('typescript')"
    );
  });

  it('keeps the compiler options equal to the typescript enum values', () => {
    const config = new CodeGenConfig({});
    expect(config.compilerTsConfig.module).toBe(ts.ModuleKind.ESNext);
    expect(config.compilerTsConfig.target).toBe(ts.ScriptTarget.ESNext);
  });

  it('toJS still works', async () => {
    const { files } = await generate(spec, { toJS: true });
    expect(Object.keys(files).sort()).toEqual(['api.d.ts', 'api.js']);
    expect(files['api.js']).toContain('getItem19');
    expect(typeCheck({ 'api.d.ts': files['api.d.ts'] })).toEqual([]);
  });
});

describe('caches do not leak between generations', () => {
  it('generates the same output twice and with different options', async () => {
    const a = await generate(spec);
    const b = await generate(spec);
    const modular = await generate(spec, { modular: true });
    expect(b.files).toEqual(a.files);
    expect(Object.keys(modular.files).length).toBeGreaterThan(1);
    expect(typeCheck(modular.files)).toEqual([]);
  });
});

describe('config.update with big documents', () => {
  it('replaces spec / swaggerSchema / originalSchema by reference instead of deep-merging', () => {
    const config = new CodeGenConfig({});
    const first = {
      openapi: '3.0.0',
      info: { title: 'a', version: '1' },
      paths: { '/a': {} },
    } as any;
    const second = {
      openapi: '3.0.0',
      info: { title: 'b', version: '1' },
      paths: { '/b': {} },
    } as any;
    config.update({ swaggerSchema: first, originalSchema: first, spec: first });
    config.update({ swaggerSchema: second });
    expect(config.swaggerSchema).toBe(second);
    // not merged with the previous document
    expect(Object.keys(config.swaggerSchema!.paths!)).toEqual(['/b']);
    expect(config.originalSchema).toBe(first);
    expect(config.spec).toBe(first);
  });

  it('still deep-merges other options', () => {
    const config = new CodeGenConfig({});
    config.update({ extractingOptions: { requestBodySuffix: ['Body'] } } as any);
    // lodash semantics: arrays are merged index by index (defaults: Payload, Body, Input)
    expect(config.extractingOptions.requestBodySuffix).toEqual(['Body', 'Body', 'Input']);
    expect(config.extractingOptions.responseBodySuffix.length).toBeGreaterThan(0);
  });

  it('does not mutate the spec passed by the user', async () => {
    const input = structuredClone(spec);
    await generate(input, { modular: true, extractEnums: true });
    expect(input).toEqual(spec);
  });

  it('applies what onInit returns, and accepts the mutated config itself', async () => {
    const a = await generate(spec, {
      hooks: { onInit: (config: any) => ({ ...config, apiClassName: 'FromHook' }) },
    });
    expect(a.files['api.ts']).toContain('class FromHook');
    const b = await generate(spec, {
      hooks: {
        onInit: (config: any) => {
          config.apiClassName = 'Mutated';
          return config;
        },
      },
    });
    expect(b.files['api.ts']).toContain('class Mutated');
  });
});
