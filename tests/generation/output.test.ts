import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { generateApi } from '../../src';
import { generate, makeTmpDir, typeCheck } from '../helpers/generate';
import { oas, ok, squash } from './spec-helpers';

// `GET /` has no module -> "out of module" route
const spec = oas(
  {
    '/': { get: { operationId: 'getRoot', responses: ok({ type: 'string' }) } },
    '/health': {
      get: { operationId: 'getHealth', responses: ok({ $ref: '#/components/schemas/Health' }) },
    },
    '/items/{id}': {
      get: {
        operationId: 'getItem',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: ok({ $ref: '#/components/schemas/Item' }),
      },
    },
  },
  {
    Item: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } },
    Health: { type: 'string', enum: ['up', 'down'] },
  }
);

describe('single file output', () => {
  it.each(['fetch', 'axios'])('emits out-of-module routes (%s)', async (httpClientType) => {
    const { files } = await generate(spec, { httpClientType, generateRouteTypes: true });
    const code = squash(files['api.ts']);
    // route types for the out-of-module route
    expect(code).toContain('exportnamespaceGetRoot{');
    expect(code).toContain('exportnamespaceItems{');
    // client method for the out-of-module route
    expect(code).toContain('getRoot=(params:RequestParams={})=>');
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('modular output', () => {
  const cases = [
    { httpClientType: 'fetch', generateRouteTypes: false },
    { httpClientType: 'fetch', generateRouteTypes: true },
    { httpClientType: 'axios', generateRouteTypes: false },
    { httpClientType: 'axios', generateRouteTypes: true },
  ];

  it.each(cases)('is complete and compiles (%o)', async (options) => {
    const { files } = await generate(spec, { modular: true, ...options });
    const expectedFiles = [
      'Common.ts',
      'Health.ts',
      'Items.ts',
      'data-contracts.ts',
      'http-client.ts',
      ...(options.generateRouteTypes ? ['CommonRoute.ts', 'HealthRoute.ts', 'ItemsRoute.ts'] : []),
    ].sort();
    expect(Object.keys(files).sort()).toEqual(expectedFiles);

    // out-of-module client + route types
    expect(squash(files['Common.ts'])).toContain(
      'exportclassCommon<SecurityDataType=unknown>extendsHttpClient<SecurityDataType>'
    );
    expect(squash(files['Common.ts'])).toContain('getRoot=(params:RequestParams={})=>');
    if (options.generateRouteTypes) {
      expect(squash(files['CommonRoute.ts'])).toContain('exportnamespaceCommon{');
      // namespace doesn't conflict with the imported `Health` data contract
      expect(squash(files['HealthRoute.ts'])).toContain('exportnamespaceHealthRoute{');
      expect(squash(files['CommonRoute.ts'])).toContain('exportnamespaceGetRoot{');
    }

    // class name doesn't conflict with the imported `Health` data contract
    expect(squash(files['Health.ts'])).toContain('exportclassHealthApi<SecurityDataType=unknown>');

    // axios client doesn't declare HttpResponse
    if (options.httpClientType === 'axios') {
      expect(files['Items.ts']).not.toContain('HttpResponse');
    } else {
      expect(files['Items.ts']).toContain('HttpResponse');
    }

    expect(typeCheck(files)).toEqual([]);
  });

  it('works without the client (route types only)', async () => {
    const { files } = await generate(spec, {
      modular: true,
      generateClient: false,
      generateRouteTypes: true,
    });
    expect(Object.keys(files).sort()).toEqual([
      'CommonRoute.ts',
      'HealthRoute.ts',
      'ItemsRoute.ts',
      'data-contracts.ts',
    ]);
    expect(typeCheck(files)).toEqual([]);
  });

  it('works with singleHttpClient', async () => {
    const { files } = await generate(spec, {
      modular: true,
      singleHttpClient: true,
      httpClientType: 'axios',
    });
    expect(files['Items.ts']).toContain('constructor(http: HttpClient<SecurityDataType>)');
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('routes info flags', () => {
  it('reports security/query/form-data routes', async () => {
    const { result } = await generate(
      oas(
        {
          '/a': {
            post: {
              operationId: 'upload',
              security: [{ key: [] }],
              parameters: [{ name: 'q', in: 'query', schema: { type: 'string' } }],
              requestBody: {
                content: {
                  'multipart/form-data': {
                    schema: {
                      type: 'object',
                      properties: { file: { type: 'string', format: 'binary' } },
                    },
                  },
                },
              },
              responses: ok({ type: 'string' }),
            },
          },
        },
        {},
        { components: { securitySchemes: { key: { type: 'apiKey', in: 'header', name: 'k' } } } }
      )
    );
    const configuration = (result as any).configuration;
    expect(configuration.hasSecurityRoutes).toBe(true);
    expect(configuration.hasQueryRoutes).toBe(true);
    expect(configuration.hasFormDataRoutes).toBe(true);
  });

  it('is false when there are no such routes', async () => {
    const { result } = await generate(spec);
    const configuration = (result as any).configuration;
    expect(configuration.hasSecurityRoutes).toBe(false);
    expect(configuration.hasQueryRoutes).toBe(false);
    expect(configuration.hasFormDataRoutes).toBe(false);
  });
});

describe('output path', () => {
  const writeSpec = () => {
    const dir = makeTmpDir();
    const input = path.join(dir, 'spec.json');
    fs.writeFileSync(input, JSON.stringify(spec));
    return { dir, input };
  };

  it('throws a clear error when output points to a file', async () => {
    const { dir, input } = writeSpec();
    const output = path.join(dir, 'not-a-dir.ts');
    fs.writeFileSync(output, '// existing file');

    await expect(
      generateApi({ name: 'api.ts', silent: true, input, output } as any)
    ).rejects.toThrow(/is not a directory/);
    expect(fs.readFileSync(output, 'utf8')).toBe('// existing file');
  });

  it('throws when the output directory cannot be created', async () => {
    const { dir, input } = writeSpec();
    const file = path.join(dir, 'file');
    fs.writeFileSync(file, '');

    await expect(
      generateApi({ name: 'api.ts', silent: true, input, output: path.join(file, 'nested') } as any)
    ).rejects.toThrow(/Unable to create output directory/);
  });

  it('creates a missing output directory', async () => {
    const { dir, input } = writeSpec();
    const output = path.join(dir, 'a', 'b');
    await generateApi({ name: 'api.ts', silent: true, input, output } as any);
    expect(fs.existsSync(path.join(output, 'api.ts'))).toBe(true);
  });
});
