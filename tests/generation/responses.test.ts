import { describe, expect, it } from 'vitest';

import { generate, typeCheck } from '../helpers/generate';
import { jsonContent, oas, ok, squash } from './spec-helpers';

const errorComponents = {
  responses: {
    NotFound: {
      description: 'not found',
      content: jsonContent({ $ref: '#/components/schemas/Problem' }),
    },
    Conflict: {
      description: 'conflict',
      content: jsonContent({ type: 'object', properties: { reason: { type: 'string' } } }),
    },
  },
};

const schemas = {
  Item: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } },
  Problem: { type: 'object', required: ['title'], properties: { title: { type: 'string' } } },
};

describe('success status', () => {
  it('treats "2XX" (any case) as a success response', async () => {
    const spec = oas(
      {
        '/upper': {
          post: {
            operationId: 'upper',
            responses: {
              '2XX': {
                description: 'ok',
                content: jsonContent({ $ref: '#/components/schemas/Item' }),
              },
              400: {
                description: 'bad',
                content: jsonContent({ $ref: '#/components/schemas/Problem' }),
              },
            },
          },
        },
        '/lower': {
          post: {
            operationId: 'lower',
            responses: {
              '2xx': {
                description: 'ok',
                content: jsonContent({ $ref: '#/components/schemas/Item' }),
              },
            },
          },
        },
      },
      schemas
    );
    const { files } = await generate(spec);
    const code = squash(files['api.ts']);
    expect(code).toContain('upper:(params:RequestParams={})=>this.request<Item,Problem>');
    expect(code).toContain('lower:(params:RequestParams={})=>this.request<Item,any>');
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('error responses', () => {
  const spec = oas(
    {
      '/items/{id}': {
        get: {
          operationId: 'getItem',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            ...ok({ $ref: '#/components/schemas/Item' }),
            404: { $ref: '#/components/responses/NotFound' },
            409: { $ref: '#/components/responses/Conflict' },
          },
        },
      },
    },
    schemas,
    { components: errorComponents }
  );

  it('resolves $ref error responses', async () => {
    const { files } = await generate(spec);
    expect(squash(files['api.ts'])).toContain('this.request<Item,Problem|{reason?:string;}>');
    expect(typeCheck(files)).toEqual([]);
  });

  it('keeps $ref error responses with extractResponseError', async () => {
    const { files } = await generate(spec, { extractResponseError: true });
    const code = squash(files['api.ts']);
    expect(code).toContain('exporttypeGetItemError=Problem|{reason?:string;};');
    expect(code).toContain('this.request<Item,GetItemError>');
    expect(typeCheck(files)).toEqual([]);
  });

  it('parses response components up front with extractResponses', async () => {
    const { files } = await generate(spec, { extractResponses: true });
    const code = squash(files['api.ts']);
    expect(code).toContain('exportinterfaceConflict{reason?:string;}');
    // route uses the response component name instead of an inline copy of it
    expect(code).toContain('this.request<Item,NotFound|Conflict>');
    expect(typeCheck(files)).toEqual([]);
  });

  it('uses response components as types with extractResponses', async () => {
    const withCollision = oas(
      {
        '/items': {
          get: {
            operationId: 'listItems',
            responses: {
              ...ok({ type: 'string' }),
              404: { $ref: '#/components/responses/Problem' },
            },
          },
        },
      },
      schemas,
      {
        components: {
          responses: {
            ...errorComponents.responses,
            // same name as a schema component
            Problem: {
              description: 'problem',
              content: jsonContent({ $ref: '#/components/schemas/Problem' }),
            },
          },
        },
      }
    );
    const { files } = await generate(withCollision, { extractResponses: true });
    const code = squash(files['api.ts']);
    // responses are parsed and emitted as types
    expect(code).toContain('exporttypeNotFound=Problem;');
    expect(code).toContain('exportinterfaceConflict{reason?:string;}');
    expect(code).toContain('exporttypeProblemResponse=Problem;');
    expect(code).toContain('this.request<string,ProblemResponse>');
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('responses without content', () => {
  const spec = oas(
    {
      '/items': {
        post: {
          operationId: 'createItem',
          responses: { 204: { description: 'created' } },
        },
        get: {
          operationId: 'listItems',
          responses: ok({ type: 'array', items: { $ref: '#/components/schemas/Item' } }),
        },
      },
    },
    schemas
  );

  it('returns void and does not extract a response body type', async () => {
    const { files } = await generate(spec, { extractResponseBody: true });
    const code = squash(files['api.ts']);
    expect(code).toContain('createItem:(params:RequestParams={})=>this.request<void,any>');
    expect(code).not.toContain('CreateItemData');
    expect(code).toContain('exporttypeListItemsData=Item[];');
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('response types are not matched to primitive components by content', () => {
  const spec = oas(
    {
      '/name': { get: { operationId: 'getName', responses: ok({ type: 'string' }) } },
      '/pair': {
        get: {
          operationId: 'getPair',
          responses: ok({
            allOf: [
              { $ref: '#/components/schemas/Item' },
              { $ref: '#/components/schemas/Problem' },
            ],
          }),
        },
      },
    },
    {
      ...schemas,
      UserId: { type: 'string' },
      Count: { type: 'integer' },
      Pair: {
        allOf: [{ $ref: '#/components/schemas/Item' }, { $ref: '#/components/schemas/Problem' }],
      },
    }
  );

  it('keeps `string` for a string response and reuses composite components', async () => {
    const { files } = await generate(spec);
    const code = squash(files['api.ts']);
    expect(code).toContain('getName:(params:RequestParams={})=>this.request<string,any>');
    // composite component with equal content is still reused (upstream behaviour)
    expect(code).toContain('getPair:(params:RequestParams={})=>this.request<Pair,any>');
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('response headers', () => {
  it('types headers by their schema in full response types', async () => {
    const spec = oas({
      '/items': {
        get: {
          operationId: 'listItems',
          responses: {
            200: {
              description: 'ok',
              headers: {
                'X-Total': { description: 'total', schema: { type: 'integer' } },
                'X-Next': { schema: { type: 'string', nullable: true } },
              },
              content: jsonContent({ type: 'string' }),
            },
          },
        },
      },
    });
    const { result } = await generate(spec);
    const route = (result as any).configuration.routes.combined[0].routes[0];
    const fullTypes = squash(route.response.fullTypes);
    expect(fullTypes).toContain('headers:{"X-Total":number,"X-Next":string|null}');
  });
});
