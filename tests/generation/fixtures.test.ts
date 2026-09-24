import { describe, expect, it } from 'vitest';

import { generate, typeCheck } from '../helpers/generate';
import { loadFixture, squash } from './spec-helpers';

const ALL_EXTRACT = {
  extractRequestParams: true,
  extractRequestBody: true,
  extractResponseBody: true,
  extractResponseError: true,
  extractEnums: true,
};

const matrix: [string, Record<string, any>][] = [
  ['default fetch', {}],
  ['default axios', { httpClientType: 'axios' }],
  ['modular fetch', { modular: true }],
  ['modular axios', { modular: true, httpClientType: 'axios' }],
  ['generateRouteTypes', { generateRouteTypes: true }],
  [
    'modular + generateRouteTypes',
    { modular: true, generateRouteTypes: true, httpClientType: 'axios' },
  ],
  ['all extract options', ALL_EXTRACT],
  [
    'all extract options + modular + route types',
    { ...ALL_EXTRACT, modular: true, generateRouteTypes: true },
  ],
  ['extractResponses', { extractResponses: true }],
  ['unwrapResponseData (fetch)', { unwrapResponseData: true }],
  ['unwrapResponseData (axios)', { unwrapResponseData: true, httpClientType: 'axios' }],
  ['singleHttpClient', { singleHttpClient: true }],
  ['generateUnionEnums', { generateUnionEnums: true }],
  ['generateResponses', { generateResponses: true }],
  ['sortTypes + sortRoutes', { sortTypes: true, sortRoutes: true }],
];

describe('petstore fixture (OpenAPI 3)', () => {
  const spec = loadFixture('petstore.json');

  it.each(matrix)('compiles: %s', async (_name, options) => {
    const { files } = await generate(spec, options);
    expect(Object.keys(files).length).toBeGreaterThan(0);
    expect(typeCheck(files)).toEqual([]);
  });

  it('generates the expected single file client', async () => {
    const { files } = await generate(spec);
    const code = squash(files['api.ts']);

    // path-level string `petId` is overridden by operation-level integer `petId`
    expect(code).toContain(
      'getPet:(petId:number,params:RequestParams={})=>this.request<Pet,Error>'
    );
    // "2XX" success + $ref error responses
    expect(code).toContain(
      'createPet:(data:NewPet,params:RequestParams={})=>this.request<Pet,{message:string;field?:string;}|ValidationError>'
    );
    // body without `required` is optional
    expect(code).toContain('updatePet:(petId:string,data?:NewPet,params:RequestParams={})');
    // 204
    expect(code).toContain('this.request<void,Error>');
    // string response isn't typed as the `Username` component
    expect(code).toContain('this.request<string,any>');
    // out-of-module route
    expect(code).toContain('getRoot=(params:RequestParams={})=>this.request<ApiInfo,any>');
    // form data
    expect(code).toContain('type:ContentType.FormData');
    expect(code).toContain('type:ContentType.UrlEncoded');

    expect(files['api.ts']).toMatchSnapshot();
  });

  it('generates the expected modular output', async () => {
    const { files } = await generate(spec, {
      ...ALL_EXTRACT,
      modular: true,
      generateRouteTypes: true,
      httpClientType: 'axios',
    });
    expect(Object.keys(files).sort()).toEqual([
      'Common.ts',
      'CommonRoute.ts',
      'Pets.ts',
      'PetsRoute.ts',
      'Store.ts',
      'StoreRoute.ts',
      'Users.ts',
      'UsersRoute.ts',
      'data-contracts.ts',
      'http-client.ts',
    ]);
    for (const name of [
      'data-contracts.ts',
      'Pets.ts',
      'PetsRoute.ts',
      'Common.ts',
      'CommonRoute.ts',
    ]) {
      expect(files[name]).toMatchSnapshot(name);
    }
  });
});

describe('swagger 2.0 fixture', () => {
  const spec = loadFixture('swagger2.yaml');

  it.each(matrix)('compiles: %s', async (_name, options) => {
    const { files } = await generate(spec, options);
    expect(typeCheck(files)).toEqual([]);
  });

  it('keeps `required` of body parameters', async () => {
    const { files } = await generate(spec);
    const code = squash(files['api.ts']);
    expect(code).toContain('createItem:(item:NewItem,params:RequestParams={})');
    expect(code).toContain('updateItem:(itemId:string,item?:NewItem,params:RequestParams={})');
    expect(code).toContain(
      'uploadItemImage:(itemId:string,data:{file:File;note?:string;},params:RequestParams={})'
    );
    expect(code).toContain('this.request<Item[],Error>');
    expect(code).toContain('note?:string|null;');
    expect(files['api.ts']).toMatchSnapshot();
  });
});
