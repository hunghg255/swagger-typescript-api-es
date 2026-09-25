import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it, vi } from 'vitest';

import { generateApi } from '../../src';
import { SwaggerSchemaResolver } from '../../src/swagger-schema-resolver';
import { FileSystem } from '../../src/util/file-system';
import { generate, makeTmpDir } from '../helpers/generate';
import { petSpec, swagger2Spec } from './fixtures';

const createResolver = (config: any = {}) => {
  const logger = { log: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() };
  return new SwaggerSchemaResolver({
    config: { update: vi.fn(), requestOptions: null, ...config },
    logger,
    fileSystem: new FileSystem({ logger } as any),
  });
};

describe('SwaggerSchemaResolver', () => {
  it('rejects (not crashes) on an unsupported swagger document', async () => {
    const resolver = createResolver();
    const invalid = { swagger: '1.2', info: { title: 't', version: '1' }, paths: {} };
    await expect(resolver.convertSwaggerObject(invalid, {})).rejects.toThrow(
      /Unsupported swagger\/OpenAPI version: 1.2/
    );
  });

  it('rejects on a document that is neither swagger nor openapi', async () => {
    const resolver = createResolver();
    await expect(resolver.convertSwaggerObject({ foo: 'bar' }, {})).rejects.toThrow(
      /Unsupported swagger\/OpenAPI version/
    );
  });

  it('generateApi rejects for an unsupported swagger input', async () => {
    const dir = makeTmpDir();
    const input = path.join(dir, 'bad.json');
    fs.writeFileSync(input, JSON.stringify({ swagger: '1.2', info: {}, paths: {} }));
    await expect(generateApi({ input, output: false, silent: true } as any)).rejects.toThrow(
      /Unsupported swagger/
    );
  });

  it('parses JSON and YAML files', () => {
    const resolver = createResolver();
    expect(resolver.processSwaggerSchemaFile('{"openapi":"3.0.0"}')).toEqual({ openapi: '3.0.0' });
    expect(resolver.processSwaggerSchemaFile('openapi: 3.0.0\ninfo:\n  title: t\n')).toEqual({
      openapi: '3.0.0',
      info: { title: 't' },
    });
  });

  it('generates from a YAML spec', async () => {
    const yaml = `openapi: 3.0.0
info: { title: t, version: '1' }
paths:
  /ping:
    get:
      operationId: ping
      responses:
        '200':
          description: ok
          content:
            application/json:
              schema: { type: string }
`;
    const { files } = await generate(yaml);
    expect(files['api.ts']).toContain('ping');
  });

  it('converts swagger 2 and merges original params into the usage schema', async () => {
    const resolver = createResolver();
    const swagger: any = await resolver.convertSwaggerObject(swagger2Spec, {});
    expect(swagger.usageSchema.openapi).toMatch(/^3\./);

    resolver.fixSwaggerSchema(swagger);

    const upload = swagger.usageSchema.paths['/upload'].post;
    const put = swagger.usageSchema.paths['/items/{id}'].put;
    // operation with only formData params: they must be attached, not pushed to a throwaway array
    expect(upload.parameters.map((p: any) => p.name).sort()).toEqual(['file', 'note']);
    expect(put.parameters.map((p: any) => p.name).sort()).toEqual(['id', 'title']);
    expect(upload.consumes).toEqual(['multipart/form-data']);
  });

  it('generates form data bodies for swagger 2 operations with only formData params', async () => {
    const { files } = await generate(swagger2Spec);
    const content = files['api.ts'];
    expect(content).toMatch(/upload: \(\s*data: \{[^}]*file: File/);
    expect(content).toContain('ContentType.FormData');
  });

  it('fixSwaggerSchema tolerates routes missing in the original schema and path-level keys', () => {
    const resolver = createResolver();
    const usageSchema = {
      paths: {
        '/a': {
          parameters: [{ name: 'x', in: 'query' }],
          get: { responses: {} },
        },
      },
    };
    expect(() => resolver.fixSwaggerSchema({ usageSchema, originalSchema: {} })).not.toThrow();
    expect((usageSchema.paths['/a'].get as any).consumes).toEqual([]);
  });

  it('keeps openapi 3 specs as-is', async () => {
    const resolver = createResolver();
    const swagger: any = await resolver.convertSwaggerObject(petSpec, {});
    expect(swagger.usageSchema.paths).toEqual(petSpec.paths);
  });
});

describe('SwaggerSchemaResolver.fetchSwaggerSchemaFile', () => {
  it('throws a clear error for a missing local file (url)', async () => {
    await expect(
      createResolver().fetchSwaggerSchemaFile(
        undefined,
        './nope/spec.json',
        false,
        false,
        undefined
      )
    ).rejects.toThrow(/swagger schema file ".*nope\/spec\.json" does not exist/);
  });

  it('throws a clear error for a missing input file', async () => {
    await expect(
      generateApi({ input: '/nope/spec.json', output: false, silent: true } as any)
    ).rejects.toThrow(/"\/nope\/spec\.json" does not exist/);
  });

  it('throws when no schema source is given', async () => {
    await expect(generateApi({ output: false, silent: true } as any)).rejects.toThrow(
      /not specified/
    );
  });
});

describe('document structure validation', () => {
  it.each([
    [
      'paths',
      { swagger: '2.0', info: { title: 't', version: '1' }, paths: 'nope' },
      /"paths" must be an object, got string/,
    ],
    [
      'paths (array)',
      { openapi: '3.0.0', info: { title: 't', version: '1' }, paths: [] },
      /"paths" must be an object, got array/,
    ],
    [
      'components',
      { openapi: '3.0.0', info: { title: 't', version: '1' }, paths: {}, components: 1 },
      /"components" must be an object, got number/,
    ],
    [
      'definitions',
      { swagger: '2.0', info: { title: 't', version: '1' }, paths: {}, definitions: 'x' },
      /"definitions" must be an object/,
    ],
  ])('rejects a non-object %s', async (_name, spec, message) => {
    await expect(
      generateApi({ spec: spec as any, output: false, silent: true } as any)
    ).rejects.toThrow(message);
  });
});
