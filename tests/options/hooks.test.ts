import { beforeAll, describe, expect, it, vi } from 'vitest';

import { CodeGenProcess } from '../../src/code-gen-process';
import { oas, ok, squash } from '../generation/spec-helpers';
import { generate, typeCheck } from '../helpers/generate';

const petRef = { $ref: '#/components/schemas/Pet' };
const petIdParam = { name: 'petId', in: 'path', required: true, schema: { type: 'integer' } };

const spec = oas(
  {
    '/v1/pets': {
      get: {
        operationId: 'listPets',
        parameters: [{ name: 'limit', in: 'query', schema: { type: 'integer' } }],
        responses: ok({ type: 'array', items: petRef }),
      },
      post: {
        operationId: 'createPet',
        requestBody: { required: true, content: { 'application/json': { schema: petRef } } },
        responses: ok(petRef),
      },
    },
    '/v1/pets/{petId}': {
      get: { operationId: 'getPet', parameters: [petIdParam], responses: ok(petRef) },
    },
    '/v1/internal/health': {
      get: { operationId: 'health', 'x-internal': true, responses: ok({ type: 'string' }) },
    },
  },
  {
    Pet: {
      type: 'object',
      required: ['id'],
      properties: { id: { type: 'integer' }, name: { type: 'string' } },
    },
    Owner: { type: 'object', properties: { name: { type: 'string' } } },
  }
);

describe('hooks', () => {
  const calls = {
    onInit: vi.fn(),
    onPrepareConfig: vi.fn(),
    onPreParseSchema: vi.fn(),
    onParseSchema: vi.fn(),
    onCreateComponent: vi.fn(),
    onCreateRoute: vi.fn(),
    onCreateRouteName: vi.fn(),
    onFormatRouteName: vi.fn(),
    onFormatTypeName: vi.fn(),
    onPreBuildRoutePath: vi.fn(),
    onBuildRoutePath: vi.fn(),
    onInsertPathParam: vi.fn(),
  };

  const hooks = {
    onInit: (config: any, process: any) => {
      calls.onInit(config, process);
      config.apiClassName = 'PetStore';
      return config;
    },
    onPrepareConfig: (configuration: any) => {
      calls.onPrepareConfig(configuration);
      return {
        ...configuration,
        apiConfig: {
          ...configuration.apiConfig,
          info: { ...configuration.apiConfig.info, title: 'Title From Hook' },
        },
      };
    },
    onCreateComponent: (component: any) => {
      calls.onCreateComponent(component);
      if (component.typeName === 'Owner') {
        return {
          ...component,
          rawTypeData: {
            ...component.rawTypeData,
            properties: { ...component.rawTypeData.properties, addedByHook: { type: 'boolean' } },
          },
        };
      }
      return undefined;
    },
    onPreParseSchema: (schema: any, typeName: any, schemaType: any) => {
      calls.onPreParseSchema(schema, typeName, schemaType);
      // merged into the schema before parsing
      return typeName === 'Owner' ? { description: 'owner (onPreParseSchema)' } : undefined;
    },
    onParseSchema: (schema: any, parsed: any) => {
      calls.onParseSchema(schema, parsed);
      return parsed.name === 'Pet' ? { ...parsed, description: 'pet (onParseSchema)' } : parsed;
    },
    onCreateRoute: (route: any) => {
      calls.onCreateRoute(route);
      // skip internal routes
      if (route.raw['x-internal']) return false;
      return undefined;
    },
    onFormatRouteName: (routeInfo: any, templateRouteName: string) => {
      calls.onFormatRouteName(routeInfo, templateRouteName);
      return routeInfo.method === 'post' ? `${templateRouteName}Now` : undefined;
    },
    onCreateRouteName: (routeNameInfo: any, rawRouteInfo: any) => {
      calls.onCreateRouteName(routeNameInfo, rawRouteInfo);
      if (rawRouteInfo.operationId !== 'getPet') return undefined;
      return { ...routeNameInfo, usage: 'fetchPet', original: 'fetchPet' };
    },
    onFormatTypeName: (formatted: string, raw: string, schemaType: string) => {
      calls.onFormatTypeName(formatted, raw, schemaType);
      return raw === 'Pet' ? 'Animal' : undefined;
    },
    onPreBuildRoutePath: (routePath: string) => {
      calls.onPreBuildRoutePath(routePath);
      return routePath.replace(/^\/v1/, '');
    },
    onBuildRoutePath: (data: any) => {
      calls.onBuildRoutePath(data);
      return { ...data, route: `/api${data.route}` };
    },
    onInsertPathParam: (name: string, index: number, params: any[], route: string) => {
      calls.onInsertPathParam(name, index, params, route);
      return `encodeURIComponent(${name})`;
    },
  };

  let files: Record<string, string>;
  let code: string;

  beforeAll(async () => {
    ({ files } = await generate(spec, { hooks }));
    code = squash(files['api.ts']);
  });

  it('compiles', () => {
    expect(typeCheck(files)).toEqual([]);
  });

  it('onInit gets the config + the process and can change the config', () => {
    expect(calls.onInit).toHaveBeenCalledTimes(1);
    const [config, process] = calls.onInit.mock.calls[0];
    expect(config.swaggerSchema.paths).toBeDefined();
    expect(process).toBeInstanceOf(CodeGenProcess);
    expect(code).toContain('exportclassPetStore<SecurityDataTypeextendsunknown>');
  });

  it('onPrepareConfig can replace the render configuration', () => {
    expect(calls.onPrepareConfig).toHaveBeenCalledTimes(1);
    const [configuration] = calls.onPrepareConfig.mock.calls[0];
    expect(configuration.apiConfig.title).toBe('test');
    expect(configuration.modelTypes.length).toBeGreaterThan(0);
    expect(code).toContain('@titleTitleFromHook');
  });

  it('onCreateComponent is called for every component and can replace it', () => {
    const names = calls.onCreateComponent.mock.calls.map(([c]) => c.typeName);
    expect(names).toEqual(expect.arrayContaining(['Pet', 'Owner']));
    expect(code).toContain('addedByHook?:boolean;');
  });

  it('onPreParseSchema result is merged into the schema', () => {
    expect(calls.onPreParseSchema).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'object' }),
      'Pet',
      'object'
    );
    expect(code).toContain('/**owner(onPreParseSchema)*/exportinterfaceOwner{');
  });

  it('onParseSchema can replace the parsed schema', () => {
    expect(calls.onParseSchema).toHaveBeenCalled();
    expect(code).toContain('/**pet(onParseSchema)*/exportinterfaceAnimal{');
  });

  it('onFormatTypeName renames types everywhere', () => {
    expect(calls.onFormatTypeName).toHaveBeenCalledWith('Pet', 'Pet', 'type-name');
    expect(code).not.toMatch(/\bPet\b/);
    expect(code).toContain('this.request<Animal[],any>');
  });

  it('onCreateRoute returning false skips the route', () => {
    const operationIds = calls.onCreateRoute.mock.calls.map(([r]) => r.raw.operationId);
    expect(operationIds).toEqual(['listPets', 'createPet', 'getPet', 'health']);
    expect(code).not.toContain('health');
    expect(code).not.toContain('internal');
  });

  it('onFormatRouteName changes the name from the route-name template', () => {
    expect(calls.onFormatRouteName).toHaveBeenCalledWith(
      expect.objectContaining({ operationId: 'createPet', method: 'post' }),
      'createPet'
    );
    expect(code).toContain('createPetNow:(data:Animal,');
  });

  it('onCreateRouteName can replace the route name info', () => {
    expect(calls.onCreateRouteName).toHaveBeenCalledWith(
      expect.objectContaining({ usage: 'getPet', original: 'getPet', duplicate: false }),
      expect.objectContaining({ operationId: 'getPet' })
    );
    expect(code).toContain('fetchPet:(petId:number,');
    expect(code).not.toContain('getPet:');
  });

  it('onPreBuildRoutePath / onBuildRoutePath / onInsertPathParam change the request path', () => {
    expect(calls.onPreBuildRoutePath).toHaveBeenCalledWith('/v1/pets/{petId}');
    expect(calls.onBuildRoutePath).toHaveBeenCalledWith(
      expect.objectContaining({ originalRoute: '/v1/pets/{petId}' })
    );
    expect(calls.onInsertPathParam).toHaveBeenCalledWith(
      'petId',
      0,
      [expect.objectContaining({ name: 'petId' })],
      '/pets/{petId}'
    );
    expect(code).toContain('path:`/api/pets/${encodeURIComponent(petId)}`');
    expect(code).toContain('path:`/api/pets`');
  });
});

describe('onCreateRoute', () => {
  it('can replace the route data', async () => {
    const { files } = await generate(spec, {
      hooks: {
        onCreateRoute: (route: any) => ({
          ...route,
          routeName: {
            usage: `${route.routeName.usage}Custom`,
            original: `${route.routeName.usage}Custom`,
          },
        }),
      },
    });
    const code = squash(files['api.ts']);
    expect(code).toContain('listPetsCustom:(');
    expect(code).toContain('healthCustom:(');
  });
});

describe('onCreateRequestParams', () => {
  it('replaces the request params schema', async () => {
    const onCreateRequestParams = vi.fn((schema: any) => ({
      ...schema,
      properties: { ...schema.properties, injected: { type: 'string' } },
    }));
    const { files } = await generate(spec, {
      extractRequestParams: true,
      hooks: { onCreateRequestParams },
    });
    expect(onCreateRequestParams).toHaveBeenCalledWith(
      expect.objectContaining({ properties: { limit: expect.objectContaining({ in: 'query' }) } })
    );
    const code = squash(files['api.ts']);
    expect(code).toContain('listPets:(query?:{limit?:number;injected?:string;},');
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('onCreateComponent', () => {
  it('is not called for primitive vendor extensions of `components`', async () => {
    const onCreateComponent = vi.fn(() => undefined);
    const { files } = await generate(
      oas({}, { Pet: { type: 'string' } }, { components: { 'x-origin': 'abc', 'x-count': 3 } }),
      { hooks: { onCreateComponent } }
    );
    // previously `x-origin: "abc"` was iterated char by char: `#/components/x-origin/0`, ...
    expect(onCreateComponent.mock.calls.map(([component]: any[]) => component.$ref)).toEqual([
      '#/components/schemas/Pet',
    ]);
    expect(squash(files['api.ts'])).toContain('exporttypePet=string;');
  });
});
