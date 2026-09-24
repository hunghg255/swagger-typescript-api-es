import { beforeAll, describe, expect, it } from 'vitest';

import { jsonContent, squash } from '../generation/spec-helpers';
import { generate, typeCheck } from '../helpers/generate';

const idParam = { name: 'id', in: 'path', required: true, schema: { type: 'string' } };

const spec = {
  openapi: '3.0.3',
  info: { title: 'Req', version: '2.1' },
  servers: [{ url: 'https://api.example.com/v1' }, { url: 'https://staging.example.com' }],
  security: [{ bearer: [] }],
  components: {
    securitySchemes: { bearer: { type: 'http', scheme: 'bearer' } },
    schemas: { Item: { type: 'object', properties: { id: { type: 'string' } } } },
  },
  paths: {
    '/items/{id}': {
      get: {
        operationId: 'getItem',
        parameters: [
          idParam,
          { name: 'X-Request-Id', in: 'header', required: true, schema: { type: 'string' } },
          { name: 'X-Opt', in: 'header', schema: { type: 'integer' } },
          { name: 'session', in: 'cookie', schema: { type: 'string' } },
          { name: 'expand', in: 'query', schema: { type: 'array', items: { type: 'string' } } },
        ],
        responses: {
          200: { description: 'ok', content: jsonContent({ $ref: '#/components/schemas/Item' }) },
        },
      },
      put: {
        operationId: 'putItem',
        security: [],
        parameters: [idParam],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/Item' } },
            'application/x-www-form-urlencoded': {
              schema: { $ref: '#/components/schemas/Item' },
            },
            'text/plain': { schema: { type: 'string' } },
          },
        },
        responses: {
          200: { description: 'ok', content: jsonContent({ $ref: '#/components/schemas/Item' }) },
        },
      },
    },
    '/items/{id}/form': {
      post: {
        operationId: 'postForm',
        security: [],
        parameters: [idParam],
        requestBody: {
          required: true,
          content: {
            'application/x-www-form-urlencoded': {
              schema: {
                type: 'object',
                required: ['a'],
                properties: { a: { type: 'string' }, b: { type: 'integer' } },
              },
            },
          },
        },
        responses: { 204: { description: 'ok' } },
      },
    },
    '/items/{id}/upload': {
      post: {
        operationId: 'upload',
        parameters: [idParam],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['file'],
                properties: {
                  file: { type: 'string', format: 'binary' },
                  note: { type: 'string' },
                },
              },
            },
          },
        },
        responses: { 204: { description: 'ok' } },
      },
    },
    '/items/{id}/text': {
      post: {
        operationId: 'postText',
        security: [],
        parameters: [idParam],
        requestBody: { required: true, content: { 'text/plain': { schema: { type: 'string' } } } },
        responses: {
          200: { description: 'ok', content: { 'text/plain': { schema: { type: 'string' } } } },
        },
      },
    },
    '/items/{id}/download': {
      get: {
        operationId: 'download',
        security: [],
        parameters: [idParam],
        responses: {
          200: {
            description: 'ok',
            content: {
              'application/octet-stream': { schema: { type: 'string', format: 'binary' } },
            },
          },
        },
      },
    },
    '/items/{id}/image': {
      get: {
        operationId: 'image',
        security: [],
        parameters: [idParam],
        responses: {
          200: {
            description: 'ok',
            content: { 'image/png': { schema: { type: 'string', format: 'binary' } } },
          },
        },
      },
    },
  },
};

/** squashed client method `name: (...) => this.request<...>({...})` */
const method = (code: string, name: string) => {
  const match = code.match(new RegExp(`${name}:\\(.*?\\.\\.\\.params,\\}\\)`));
  if (!match) throw new Error(`method ${name} not found`);
  return match[0];
};

describe.each(['fetch', 'axios'])('request features (%s)', (httpClientType) => {
  let files: Record<string, string>;
  let code: string;
  beforeAll(async () => {
    ({ files } = await generate(spec, { httpClientType, generateRouteTypes: true }));
    code = squash(files['api.ts']);
  });

  it('compiles', () => {
    expect(typeCheck(files)).toEqual([]);
  });

  it('uses the first server url as the default base url', () => {
    expect(code).toContain('@baseUrlhttps://api.example.com/v1');
    expect(code).toContain(
      httpClientType === 'fetch'
        ? 'publicbaseUrl:string="https://api.example.com/v1";'
        : 'baseURL:axiosConfig.baseURL||"https://api.example.com/v1"'
    );
    expect(code).not.toContain('staging.example.com');
  });

  it('marks routes covered by a security scheme as `secure: true` (global security, `security: []` opts out)', () => {
    expect(method(code, 'getItem')).toContain('secure:true,');
    expect(method(code, 'upload')).toContain('secure:true,');
    for (const name of ['putItem', 'postForm', 'postText', 'download', 'image']) {
      expect(method(code, name)).not.toContain('secure');
    }
    expect(code).toContain('securityWorker');
  });

  it('header params are typed in route types (not client args), cookie params are ignored', () => {
    expect(code).toContain('exporttypeRequestHeaders={"X-Request-Id":string;"X-Opt"?:number;};');
    expect(method(code, 'getItem')).toMatch(
      /^getItem:\(id:string,query\?:\{expand\?:string\[\];\},params:RequestParams=\{\}\)/
    );
    expect(code).not.toContain('session');
  });

  it('prefers JSON when a request body has several content types', () => {
    expect(method(code, 'putItem')).toContain('putItem:(id:string,data:Item,params');
    expect(method(code, 'putItem')).toContain('type:ContentType.Json,');
  });

  it('form-urlencoded, multipart and text/plain bodies', () => {
    expect(method(code, 'postForm')).toContain('data:{a:string;b?:number;}');
    expect(method(code, 'postForm')).toContain('type:ContentType.UrlEncoded,');
    expect(method(code, 'upload')).toContain('file:File;note?:string;');
    expect(method(code, 'upload')).toContain('type:ContentType.FormData,');
    expect(method(code, 'postText')).toContain('postText:(id:string,data:string,params');
    expect(method(code, 'postText')).toContain('type:ContentType.Text,');
  });

  it('reads text/plain responses as text', () => {
    expect(method(code, 'postText')).toContain('this.request<string,any>');
    expect(method(code, 'postText')).toContain('format:"text",');
  });

  it('image responses are read as blob', () => {
    expect(method(code, 'image')).toContain('this.request<File,any>');
    expect(method(code, 'image')).toContain('format:"blob",');
  });

  it('octet-stream download responses are typed as File', () => {
    const download = method(code, 'download');
    expect(download).toContain('this.request<File,any>');
    // the fetch client reads nothing without a format, axios keeps its default responseType
    if (httpClientType === 'fetch') {
      expect(download).toContain('format:"blob",');
    } else {
      expect(download).not.toContain('format:');
    }
  });
});

describe('modular response formats', () => {
  it('reads text and binary responses in module files too', async () => {
    const { files } = await generate(spec, { modular: true });
    const items = squash(files['Items.ts']);
    expect(items).toMatch(/postText=\(.*?format:"text",/);
    expect(items).toMatch(/download=\(.*?format:"blob",/);
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('servers', () => {
  it('uses an empty base url without servers', async () => {
    const { files } = await generate({ ...spec, servers: undefined });
    const code = squash(files['api.ts']);
    expect(code).toContain('publicbaseUrl:string="";');
    expect(code).not.toContain('@baseUrl');
  });
});

describe('swagger 2.0 requests', () => {
  const swagger2 = {
    swagger: '2.0',
    info: { title: 't', version: '1' },
    host: 'api.example.com',
    basePath: '/v2',
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: { key: { type: 'apiKey', in: 'header', name: 'X-Key' } },
    definitions: {
      User: { type: 'object', properties: { name: { type: 'string' } } },
    },
    paths: {
      '/users/{id}/avatar': {
        post: {
          operationId: 'uploadAvatar',
          consumes: ['multipart/form-data'],
          security: [{ key: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, type: 'string' },
            { name: 'file', in: 'formData', type: 'file', required: true },
            { name: 'caption', in: 'formData', type: 'string' },
          ],
          responses: { 200: { description: 'ok', schema: { $ref: '#/definitions/User' } } },
        },
      },
      '/users/{id}/report': {
        get: {
          operationId: 'getReport',
          produces: ['text/plain'],
          parameters: [{ name: 'id', in: 'path', required: true, type: 'string' }],
          responses: { 200: { description: 'ok', schema: { type: 'string' } } },
        },
        put: {
          operationId: 'putForm',
          consumes: ['application/x-www-form-urlencoded'],
          parameters: [
            { name: 'id', in: 'path', required: true, type: 'string' },
            { name: 'a', in: 'formData', type: 'string', required: true },
          ],
          responses: { 204: { description: 'ok' } },
        },
      },
      '/users': {
        post: {
          operationId: 'createUser',
          parameters: [
            { name: 'user', in: 'body', required: true, schema: { $ref: '#/definitions/User' } },
          ],
          responses: { 201: { description: 'ok', schema: { $ref: '#/definitions/User' } } },
        },
      },
    },
  };

  let files: Record<string, string>;
  let code: string;
  beforeAll(async () => {
    ({ files } = await generate(swagger2));
    code = squash(files['api.ts']);
  });

  it('compiles', () => {
    expect(typeCheck(files)).toEqual([]);
  });

  it('builds the base url from schemes/host/basePath', () => {
    expect(code).toContain('publicbaseUrl:string="https://api.example.com/v2";');
  });

  it('formData params with a file -> multipart body, security -> secure', () => {
    const upload = method(code, 'uploadAvatar');
    expect(upload).toContain('data:{file:File;caption?:string;}');
    expect(upload).toContain('type:ContentType.FormData,');
    expect(upload).toContain('secure:true,');
    expect(upload).toContain('this.request<User,any>');
  });

  it('formData params with `consumes: application/x-www-form-urlencoded` -> url encoded body', () => {
    const putForm = method(code, 'putForm');
    expect(putForm).toContain('data:{a:string;}');
    expect(putForm).toContain('type:ContentType.UrlEncoded,');
  });

  it('`produces: text/plain` -> text response', () => {
    const report = method(code, 'getReport');
    expect(report).toContain('this.request<string,any>');
    expect(report).toContain('format:"text",');
  });

  it('`in: body` params -> JSON body named after the param', () => {
    const create = method(code, 'createUser');
    expect(create).toContain('createUser:(user:User,params');
    expect(create).toContain('body:user,');
    expect(create).toContain('type:ContentType.Json,');
  });
});
