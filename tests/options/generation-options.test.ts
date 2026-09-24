import fs from 'node:fs';
import path from 'node:path';

import { beforeAll, describe, expect, it } from 'vitest';

import { generateApi } from '../../src';
import { jsonContent, oas, ok, squash } from '../generation/spec-helpers';
import { generate, makeTmpDir, typeCheck } from '../helpers/generate';

const ref = (name: string) => ({ $ref: `#/components/schemas/${name}` });

const spec = oas(
  {
    '/api/v1/zoo/zebras': {
      get: {
        operationId: 'listZebras',
        tags: ['Animals'],
        responses: ok({ type: 'array', items: ref('Zebra') }),
      },
    },
    '/api/v1/zoo/keepers': {
      get: {
        operationId: 'listKeepers',
        tags: ['Staff'],
        responses: ok({ type: 'array', items: ref('Mole') }),
      },
    },
    '/api/v1/zoo/aardvarks/{id}': {
      delete: {
        operationId: 'deleteAardvark',
        tags: ['Animals'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 204: { description: 'deleted' } },
      },
    },
    '/api/v1/tickets': {
      post: {
        operationId: 'buyTicket',
        requestBody: { required: true, content: jsonContent(ref('Aardvark')) },
        responses: {
          200: { description: 'bought', content: jsonContent(ref('Zebra')) },
          404: { description: 'not found', content: jsonContent(ref('Mole')) },
          default: { description: 'unexpected', content: jsonContent({ type: 'string' }) },
        },
      },
    },
    '/api/v1/status': {
      get: {
        operationId: 'getStatus',
        responses: { default: { description: 'status', content: jsonContent(ref('Mole')) } },
      },
    },
    '/api/v1/ping': {
      get: { operationId: 'ping', responses: { 200: { description: 'pong' } } },
    },
  },
  {
    Zebra: { type: 'object', properties: { stripes: { type: 'integer' } } },
    Aardvark: { type: 'object', properties: { nose: { type: 'string' } } },
    Mole: { type: 'object', properties: { depth: { type: 'number' } } },
  }
);

/** squashed client method `name: (...) => this.request<...>({...})` */
const method = (code: string, name: string) => {
  const match = code.match(new RegExp(`${name}(?::|=)\\(.*?\\.\\.\\.params,\\}\\)`));
  if (!match) throw new Error(`method ${name} not found`);
  return match[0];
};

describe('defaults', () => {
  let files: Record<string, string>;
  let code: string;
  beforeAll(async () => {
    ({ files } = await generate(spec));
    code = squash(files['api.ts']);
  });

  it('compiles', () => {
    expect(typeCheck(files)).toEqual([]);
  });

  it('groups routes by the first path segment (moduleNameIndex: 0)', () => {
    expect(code).toContain('api={');
    expect(code).not.toContain('zoo={');
  });

  it('keeps the spec order of types and routes', () => {
    expect(code.indexOf('interfaceZebra')).toBeLessThan(code.indexOf('interfaceAardvark'));
    expect(code.indexOf('interfaceAardvark')).toBeLessThan(code.indexOf('interfaceMole'));
    expect(code.indexOf('listZebras:')).toBeLessThan(code.indexOf('listKeepers:'));
  });

  it('`default` response is an error, empty responses are void, errors are thrown', () => {
    expect(method(code, 'buyTicket')).toContain('this.request<Zebra,Mole|string>');
    expect(method(code, 'getStatus')).toContain('this.request<any,Mole>');
    expect(method(code, 'ping')).toContain('this.request<void,any>');
    expect(code).toContain('if(!response.ok)throwdata;');
    expect(code).not.toContain('@response');
  });

  it('names the class `Api`', () => {
    expect(code).toContain('exportclassApi<SecurityDataTypeextendsunknown>extendsHttpClient');
  });
});

describe('apiClassName / moduleNameIndex / sortTypes / sortRoutes', () => {
  let files: Record<string, string>;
  let code: string;
  beforeAll(async () => {
    ({ files } = await generate(spec, {
      apiClassName: 'ZooClient',
      moduleNameIndex: 2,
      sortTypes: true,
      sortRoutes: true,
    }));
    code = squash(files['api.ts']);
  });

  it('compiles', () => {
    expect(typeCheck(files)).toEqual([]);
  });

  it('apiClassName renames the main class', () => {
    expect(code).toContain('exportclassZooClient<SecurityDataTypeextendsunknown>extendsHttpClient');
    expect(code).not.toContain('classApi<');
  });

  it('moduleNameIndex picks the path segment used as module name', () => {
    expect(code).toContain('zoo={');
    expect(code).toContain('tickets={');
    expect(code).toContain('status={');
    expect(code).not.toContain('api={');
  });

  it('sortTypes sorts data contracts by name', () => {
    const order = ['interfaceAardvark', 'interfaceMole', 'interfaceZebra'].map((s) =>
      code.indexOf(s)
    );
    expect(order.every((i) => i >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it('sortRoutes sorts routes inside a module by name', () => {
    const order = ['deleteAardvark:', 'listKeepers:', 'listZebras:'].map((s) => code.indexOf(s));
    expect(order.every((i) => i >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it('sortRouters (deprecated alias) still sorts routes', async () => {
    const { files: sorted } = await generate(spec, { sortRouters: true });
    const sortedCode = squash(sorted['api.ts']);
    expect(sortedCode.indexOf('deleteAardvark:')).toBeLessThan(sortedCode.indexOf('listZebras:'));
  });
});

describe('moduleNameFirstTag', () => {
  it('uses the first tag as module name and falls back to the path', async () => {
    const { files } = await generate(spec, { moduleNameFirstTag: true, modular: true });
    expect(Object.keys(files).sort()).toEqual(
      ['Animals.ts', 'Api.ts', 'Staff.ts', 'data-contracts.ts', 'http-client.ts'].sort()
    );
    const animals = squash(files['Animals.ts']);
    expect(animals).toContain('listZebras=(');
    expect(animals).toContain('deleteAardvark=(');
    expect(squash(files['Staff.ts'])).toContain('listKeepers=(');
    expect(squash(files['Api.ts'])).toContain('buyTicket=(');
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('response options', () => {
  it('generateResponses adds @response jsdoc lines for every response', async () => {
    const { files } = await generate(spec, { generateResponses: true });
    const code = squash(files['api.ts']);
    expect(code).toContain(
      '*@response`200``Zebra`bought*@response`404``Mole`notfound*@response`default``string`unexpected*/buyTicket'
    );
    expect(code).toContain('*@response`204``void`deleted*/deleteAardvark');
  });

  it('defaultResponseAsSuccess treats `default` as a success response', async () => {
    const { files } = await generate(spec, { defaultResponseAsSuccess: true });
    const code = squash(files['api.ts']);
    expect(method(code, 'getStatus')).toContain('this.request<Mole,any>');
    // an explicit 2xx response still wins, `default` is not an error anymore
    expect(method(code, 'buyTicket')).toContain('this.request<Zebra,Mole>');
    expect(typeCheck(files)).toEqual([]);
  });

  it('defaultResponseType is used for responses without content', async () => {
    const { files } = await generate(spec, { defaultResponseType: 'unknown' });
    const code = squash(files['api.ts']);
    expect(method(code, 'ping')).toContain('this.request<unknown,any>');
    expect(method(code, 'deleteAardvark')).toContain('this.request<unknown,any>');
    expect(typeCheck(files)).toEqual([]);
  });

  it('disableThrowOnError removes the throw of the fetch client', async () => {
    const { files } = await generate(spec, { disableThrowOnError: true });
    const code = squash(files['api.ts']);
    expect(code).toContain('returndata;});};}');
    expect(code).not.toContain('throwdata');
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('spec option', () => {
  it('generates from a spec object without input/url', async () => {
    const result = await generateApi({
      spec: spec as any,
      output: false,
      silent: true,
      name: 'x.ts',
    });
    expect(result.files).toHaveLength(1);
    expect(result.files[0].fileName).toBe('x');
    expect(result.files[0].fileContent).toContain('export interface Zebra');
  });

  it('does not mutate the passed spec', async () => {
    const copy = structuredClone(spec);
    await generateApi({ spec: copy as any, output: false, silent: true });
    expect(copy).toEqual(spec);
  });

  it('converts a swagger 2.0 spec object', async () => {
    const result = await generateApi({
      spec: {
        swagger: '2.0',
        info: { title: 't', version: '1' },
        paths: {},
        definitions: { Foo: { type: 'object', properties: { a: { type: 'string' } } } },
      } as any,
      output: false,
      silent: true,
    });
    expect(squash(result.files[0].fileContent)).toContain('exportinterfaceFoo{a?:string;}');
  });
});

describe('patch', () => {
  const brokenSwagger2 = {
    swagger: '2.0',
    info: { title: 't', version: '1' },
    paths: {
      '/a/{id}': {
        get: {
          operationId: 'getA',
          // path params must be `required: true`, swagger2openapi fixes it only with `patch`
          parameters: [{ name: 'id', in: 'path', type: 'string' }],
          responses: { 200: { description: 'ok', schema: { type: 'string' } } },
        },
      },
    },
  };

  it('keeps the invalid (optional) path param without patch', async () => {
    const { files } = await generate(brokenSwagger2);
    expect(squash(files['api.ts'])).toContain('getA:(id?:string,params:RequestParams={})');
  });

  it('fixes patchable swagger 2.0 errors with patch: true', async () => {
    const { files } = await generate(brokenSwagger2, { patch: true });
    expect(squash(files['api.ts'])).toContain('getA:(id:string,params:RequestParams={})');
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('cleanOutput', () => {
  const run = async (cleanOutput: boolean) => {
    const dir = makeTmpDir();
    const output = path.join(dir, 'out');
    fs.mkdirSync(path.join(output, 'nested'), { recursive: true });
    fs.writeFileSync(path.join(output, 'stale.ts'), 'old');
    fs.writeFileSync(path.join(output, 'nested', 'old.ts'), 'old');
    await generateApi({ spec: spec as any, output, silent: true, name: 'api.ts', cleanOutput });
    return fs.readdirSync(output).sort();
  };

  it('removes files from a previous run', async () => {
    expect(await run(true)).toEqual(['api.ts']);
  });

  it('keeps them by default', async () => {
    expect(await run(false)).toEqual(['api.ts', 'nested', 'stale.ts']);
  });
});

describe('primitiveTypeConstructs / codeGenConstructs / constants', () => {
  const typesSpec = oas(
    {},
    {
      Event: {
        type: 'object',
        required: ['at'],
        properties: {
          at: { type: 'string', format: 'date-time' },
          id: { type: 'integer', format: 'int64' },
          count: { type: 'integer' },
          tags: { type: 'array', items: { type: 'string' } },
        },
      },
    }
  );

  it('primitiveTypeConstructs overrides schema type -> TS type mapping', async () => {
    const { files } = await generate(typesSpec, {
      primitiveTypeConstructs: (primitiveTypes: any) => ({
        string: { 'date-time': 'Date' },
        // replaces the `integer` function by a map of formats
        integer: { $default: primitiveTypes.number, int64: () => 'bigint' },
      }),
    });
    const code = squash(files['api.ts']);
    expect(code).toContain('at:Date;');
    expect(code).toContain('id?:bigint;');
    expect(code).toContain('count?:number;');
    expect(typeCheck(files)).toEqual([]);
  });

  it('codeGenConstructs overrides TS code constructs', async () => {
    const { files } = await generate(typesSpec, {
      codeGenConstructs: (constructs: any) => ({
        ArrayType: (content: string) => `ReadonlyArray<${content}>`,
        TypeField: ({ key, optional, value }: any) =>
          `readonly ${key}${optional ? '?' : ''}: ${value}`,
        Keyword: { ...constructs.Keyword, Number: 'bigint' },
      }),
    });
    const code = squash(files['api.ts']);
    expect(code).toContain('readonlytags?:ReadonlyArray<string>;');
    expect(code).toContain('readonlycount?:bigint;');
    expect(typeCheck(files)).toEqual([]);
  });

  it('constants are merged and exposed to templates as config.constants', async () => {
    const templates = makeTmpDir('sta-tpl-');
    fs.writeFileSync(
      path.join(templates, 'data-contracts.ejs'),
      'export const BANNER = "<%~ it.config.constants.BANNER %>"; export const FETCH = "<%~ it.config.constants.HTTP_CLIENT.FETCH %>";'
    );
    const { files } = await generate(typesSpec, {
      templates,
      constants: { BANNER: 'custom constant' },
    });
    expect(squash(files['api.ts'])).toContain(
      'exportconstBANNER="customconstant";exportconstFETCH="fetch";'
    );
  });
});

describe('extractingOptions', () => {
  it('uses custom suffixes for extracted types', async () => {
    const extractSpec = oas({
      '/things': {
        get: {
          operationId: 'getThings',
          parameters: [{ name: 'q', in: 'query', schema: { type: 'string' } }],
          responses: ok({ type: 'object', properties: { a: { type: 'string' } } }),
        },
        post: {
          operationId: 'addThing',
          requestBody: {
            required: true,
            content: jsonContent({ type: 'object', properties: { b: { type: 'string' } } }),
          },
          responses: { 204: { description: 'ok' } },
        },
      },
    });
    const { files } = await generate(extractSpec, {
      extractRequestParams: true,
      extractRequestBody: true,
      extractResponseBody: true,
      extractingOptions: {
        requestParamsSuffix: ['Query'],
        requestBodySuffix: ['Command'],
        responseBodySuffix: ['Reply'],
      },
    });
    const code = squash(files['api.ts']);
    expect(code).toContain('exportinterfaceGetThingsQuery{');
    expect(code).toContain('exportinterfaceAddThingCommand{');
    expect(code).toContain('exportinterfaceGetThingsReply{');
    expect(typeCheck(files)).toEqual([]);
  });
});
