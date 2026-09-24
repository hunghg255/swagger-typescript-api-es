import { describe, expect, it } from 'vitest';

import { generate, typeCheck } from '../helpers/generate';
import { jsonContent, oas, ok, squash } from './spec-helpers';

describe('path-level and operation-level parameters', () => {
  const spec = oas(
    {
      '/items/{id}': {
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          { $ref: '#/components/parameters/Verbose' },
          { name: 'lang', in: 'query', schema: { type: 'string' } },
        ],
        summary: 'path item summary is not an operation',
        get: {
          operationId: 'getItem',
          parameters: [
            // overrides path-level `id` (same name + location)
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
            // overrides path-level $ref parameter
            { name: 'verbose', in: 'query', schema: { type: 'string', enum: ['yes', 'no'] } },
          ],
          responses: ok({ type: 'string' }),
        },
        delete: {
          operationId: 'deleteItem',
          // same name, different location - not an override
          parameters: [{ name: 'lang', in: 'header', schema: { type: 'string' } }],
          responses: { 204: { description: 'deleted' } },
        },
      },
      '/refs/{ref}': {
        parameters: [{ $ref: '#/components/parameters/RefId' }],
        get: {
          operationId: 'getRef',
          parameters: [{ $ref: '#/components/parameters/RefId' }],
          responses: ok({ type: 'string' }),
        },
      },
    },
    {},
    {
      components: {
        parameters: {
          Verbose: { name: 'verbose', in: 'query', schema: { type: 'boolean' } },
          RefId: { name: 'ref', in: 'path', required: true, schema: { type: 'string' } },
        },
      },
    }
  );

  it('operation-level parameters override path-level ones by (name, in)', async () => {
    const { files } = await generate(spec);
    const code = squash(files['api.ts']);

    expect(code).toContain('getItem:(id:number,query?:{lang?:string;verbose?:"yes"|"no";}');
    expect(code).not.toMatch(/getItem:\([^)]*verbose\?:boolean/);
    // not overridden for another operation of the same path
    expect(code).toContain('deleteItem:(id:string,query?:{verbose?:boolean;lang?:string;}');
    expect(code).toContain('getRef:(ref:string,params:RequestParams={})');
    // path item `summary` is not treated as an http method
    expect(code).not.toMatch(/summary(List|Detail)|method:"SUMMARY"|method:'SUMMARY'/);
    expect(typeCheck(files)).toEqual([]);
  });

  it('keeps path-level parameters with another location', async () => {
    const { result } = await generate(spec);
    const routes = (result as any).configuration.routes.combined.flatMap((m: any) => m.routes);
    const deleteRoute = routes.find((r: any) => r.routeName.usage === 'deleteItem');
    expect(deleteRoute.routeParams.query.map((p: any) => p.name)).toEqual(['verbose', 'lang']);
    expect(deleteRoute.routeParams.header.map((p: any) => p.name)).toEqual(['lang']);
  });

  it('compiles with extractRequestParams', async () => {
    const { files } = await generate(spec, { extractRequestParams: true });
    expect(squash(files['api.ts'])).toContain(
      'exportinterfaceGetItemParams{lang?:string;verbose?:"yes"|"no";id:number;}'
    );
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('request body', () => {
  const spec = oas(
    {
      '/items/{id}': {
        put: {
          operationId: 'replaceItem',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
            { name: 'force', in: 'query', required: true, schema: { type: 'boolean' } },
          ],
          // `required` is not set -> optional (OpenAPI default is false)
          requestBody: { content: jsonContent({ $ref: '#/components/schemas/Item' }) },
          responses: ok({ $ref: '#/components/schemas/Item' }),
        },
        post: {
          operationId: 'createItem',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: jsonContent({ $ref: '#/components/schemas/Item' }),
          },
          responses: ok({ $ref: '#/components/schemas/Item' }),
        },
        patch: {
          operationId: 'patchItem',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: false,
            content: jsonContent({ $ref: '#/components/schemas/Item' }),
          },
          responses: ok({ $ref: '#/components/schemas/Item' }),
        },
      },
    },
    { Item: { type: 'object', properties: { name: { type: 'string' } } } }
  );

  it('is optional unless `required: true`, optional args go after required ones', async () => {
    const { files } = await generate(spec);
    const code = squash(files['api.ts']);
    expect(code).toContain(
      'replaceItem:(id:string,query:{force:boolean;},data?:Item,params:RequestParams={})'
    );
    expect(code).toContain('createItem:(id:string,data:Item,params:RequestParams={})');
    expect(code).toContain('patchItem:(id:string,data?:Item,params:RequestParams={})');
    expect(typeCheck(files)).toEqual([]);
  });

  it('is optional in route types and with extracted params', async () => {
    const { files } = await generate(spec, {
      extractRequestParams: true,
      extractRequestBody: true,
      generateRouteTypes: true,
    });
    expect(squash(files['api.ts'])).toContain(
      'replaceItem:({id,...query}:ReplaceItemParams,data?:Item,params:RequestParams={})'
    );
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('extracted request params optionality', () => {
  const spec = oas({
    '/pets': {
      get: {
        operationId: 'listPets',
        parameters: [{ name: 'limit', in: 'query', schema: { type: 'integer' } }],
        responses: ok({ type: 'string' }),
      },
    },
    '/search': {
      get: {
        operationId: 'search',
        parameters: [{ name: 'q', in: 'query', required: true, schema: { type: 'string' } }],
        responses: ok({ type: 'string' }),
      },
    },
    '/pets/{petId}/toys': {
      get: {
        operationId: 'listToys',
        parameters: [
          { name: 'petId', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'limit', in: 'query', schema: { type: 'integer' } },
        ],
        responses: ok({ type: 'string' }),
      },
    },
  });

  for (const httpClientType of ['fetch', 'axios'] as const) {
    for (const modular of [false, true]) {
      it(`${httpClientType}${modular ? ' modular' : ''}: optional only when every field is optional`, async () => {
        const { files } = await generate(spec, {
          extractRequestParams: true,
          httpClientType,
          modular,
        });
        const code = squash(Object.values(files).join('\n'));

        // all query params optional, no path params -> argument can be omitted
        expect(code).toMatch(/listPets[:=]\(query\?:ListPetsParams,/);
        // required query param -> argument stays required
        expect(code).toMatch(/search[:=]\(query:SearchParams,/);
        // path params are destructured from the argument, so it is required
        expect(code).toMatch(/listToys[:=]\(\{petId,\.\.\.query\}:ListToysParams,/);
        expect(typeCheck(files)).toEqual([]);
      });
    }
  }
});
