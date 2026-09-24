import { describe, expect, it } from 'vitest';

import { generate, typeCheck } from '../helpers/generate';
import { loadFixture, oas, ok, squash } from './spec-helpers';

const countMatches = (code: string, re: RegExp) => (code.match(re) || []).length;

describe('real component names are reserved', () => {
  it('extracted response body does not overwrite an existing `GetAData` component', async () => {
    const spec = oas(
      {
        '/a': {
          get: {
            operationId: 'getA',
            responses: ok({ type: 'object', properties: { fromRoute: { type: 'string' } } }),
          },
        },
      },
      { GetAData: { type: 'object', properties: { userDefined: { type: 'number' } } } }
    );
    const { files } = await generate(spec, { extractResponseBody: true });
    const code = squash(files['api.ts']);
    expect(code).toContain('exportinterfaceGetAData{userDefined?:number;}');
    expect(code).toContain('exportinterfaceGetAResult{fromRoute?:string;}');
    expect(code).toContain('this.request<GetAResult,any>');
    expect(typeCheck(files)).toEqual([]);
  });

  it('extracted enum does not overwrite an existing `UserStatusEnum` component', async () => {
    const spec = oas(
      {
        '/users': {
          get: { operationId: 'listUsers', responses: ok({ $ref: '#/components/schemas/User' }) },
        },
      },
      {
        User: {
          type: 'object',
          properties: { status: { type: 'string', enum: ['active', 'blocked'] } },
        },
        UserStatusEnum: { type: 'string', enum: ['legacy'] },
      }
    );
    const { files } = await generate(spec, { extractEnums: true });
    const code = squash(files['api.ts']);
    expect(code).toContain('exportenumUserStatusEnum{Legacy="legacy",}');
    expect(code).toContain('exportenumUserStatusEnum1{Active="active",Blocked="blocked",}');
    expect(code).toContain('status?:UserStatusEnum1;');
    expect(typeCheck(files)).toEqual([]);
  });

  it('extracted request body does not overwrite an existing component', async () => {
    const spec = oas(
      {
        '/a': {
          post: {
            operationId: 'createA',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { type: 'object', properties: { x: { type: 'string' } } },
                },
              },
            },
            responses: ok({ $ref: '#/components/schemas/CreateAPayload' }),
          },
        },
      },
      { CreateAPayload: { type: 'object', properties: { original: { type: 'boolean' } } } }
    );
    const { files } = await generate(spec, { extractRequestBody: true });
    const code = squash(files['api.ts']);
    expect(code).toContain('exportinterfaceCreateAPayload{original?:boolean;}');
    expect(code).toContain('exportinterfaceCreateABody{x?:string;}');
    expect(code).toContain(
      'createA:(data:CreateABody,params:RequestParams={})=>this.request<CreateAPayload,any>'
    );
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('extractRequestParams + extractEnums', () => {
  it('extracts an enum query param only once', async () => {
    const spec = oas({
      '/a': {
        get: {
          operationId: 'getA',
          parameters: [{ name: 'q', in: 'query', schema: { type: 'string', enum: ['x', 'y'] } }],
          responses: ok({ type: 'string' }),
        },
      },
    });
    const { files } = await generate(spec, {
      extractRequestParams: true,
      extractEnums: true,
      generateRouteTypes: true,
    });
    const code = files['api.ts'];
    expect(countMatches(code, /export enum/g)).toBe(1);
    expect(code).toContain('export enum GetAParamsQEnum');
    expect(code).not.toContain('GetAParams1');
    expect(squash(code)).toContain('exportinterfaceGetAParams{q?:GetAParamsQEnum;}');
    expect(squash(code)).toContain('exporttypeRequestQuery={q?:GetAParamsQEnum;};');
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('extractEnums + path params', () => {
  const spec = oas({
    '/items/{kind}': {
      get: {
        operationId: 'getItem',
        parameters: [
          {
            name: 'kind',
            in: 'path',
            required: true,
            schema: { type: 'string', enum: ['a', 'b'] },
          },
          { name: 'q', in: 'query', schema: { type: 'string', enum: ['x', 'y'] } },
        ],
        responses: ok({ type: 'string' }),
      },
    },
  });

  it.each([{ extractRequestParams: true }, { extractRequestParams: false }])(
    'extracts every enum once (%o)',
    async (opts) => {
      const { files } = await generate(spec, {
        ...opts,
        extractEnums: true,
        generateRouteTypes: true,
      });
      const code = files['api.ts'];
      expect(countMatches(code, /export enum/g)).toBe(2);
      expect(code).toContain('export enum GetItemParamsKindEnum');
      expect(code).toContain('export enum GetItemParamsQEnum');
      expect(typeCheck(files)).toEqual([]);
    }
  );
});

describe('determinism', () => {
  const options = [
    {},
    {
      extractRequestParams: true,
      extractRequestBody: true,
      extractResponseBody: true,
      extractResponseError: true,
      extractEnums: true,
    },
    { modular: true, generateRouteTypes: true },
  ];

  it.each(options)('generates identical output for the same spec (%o)', async (opts) => {
    const spec = loadFixture('petstore.json');
    const first = await generate(spec, opts);
    const second = await generate(spec, opts);
    expect(second.files).toEqual(first.files);
  });

  it('resolves colliding generated names with a stable counter', async () => {
    // both operations produce the `GetItemData` name candidate
    const spec = oas(
      {
        '/v1/item': {
          get: {
            operationId: 'getItem',
            responses: ok({ type: 'object', properties: { a: { type: 'string' } } }),
          },
        },
        '/v2/item': {
          get: {
            operationId: 'getItem',
            responses: ok({ type: 'object', properties: { b: { type: 'string' } } }),
          },
        },
        '/v3/item': {
          get: {
            operationId: 'getItem',
            responses: ok({ type: 'object', properties: { c: { type: 'string' } } }),
          },
        },
      },
      {
        GetItemData: { type: 'object', properties: { taken: { type: 'string' } } },
        GetItemResult: { type: 'object', properties: { taken: { type: 'string' } } },
        GetItemOutput: { type: 'object', properties: { taken: { type: 'string' } } },
      }
    );
    const results = await Promise.all(
      [1, 2, 3].map(() => generate(spec, { extractResponseBody: true }))
    );
    for (const { files } of results) {
      const code = files['api.ts'];
      expect(code).toContain('export interface GetItemData1');
      expect(code).toContain('export interface GetItemData2');
      expect(code).toContain('export interface GetItemData3');
      expect(typeCheck(files)).toEqual([]);
    }
    expect(results[1].files).toEqual(results[0].files);
    expect(results[2].files).toEqual(results[0].files);
  });
});
