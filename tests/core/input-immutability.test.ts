import fs from 'node:fs';
import path from 'node:path';

import yaml from 'js-yaml';
import { describe, expect, it } from 'vitest';

import { generateApi } from '../../src';
import { deepFreeze } from '../helpers/generate';

/**
 * The generator must not change the input document: parse results are cached aside
 * (`ParsedSchemaCache`) and fixes are applied to copies. Without custom code the input is not even
 * copied, so a deep-frozen input throws (ESM is strict) if anything writes into it.
 */

const fixture = (name: string): Record<string, unknown> => {
  const content = fs.readFileSync(path.resolve(__dirname, '../fixtures', name), 'utf8');
  return (name.endsWith('.json') ? JSON.parse(content) : yaml.load(content)) as Record<
    string,
    unknown
  >;
};

/** every code path which used to change the document */
const edgeCases = {
  openapi: '3.0.3',
  // no `info`: the default title / version is added
  paths: {
    '/pets': {
      get: {
        operationId: 'listPets',
        parameters: [
          { name: 'status', in: 'query', schema: { type: 'string', enum: ['a', 'b'] } },
          { name: 'tags', in: 'query', schema: { items: { type: 'string' } } },
        ],
        responses: {
          200: {
            description: 'ok',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Pet' } },
              },
            },
          },
          400: { $ref: '#/components/responses/Error' },
        },
      },
      post: {
        operationId: 'createPet',
        requestBody: {
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Dog' } } },
        },
        responses: { 204: { description: 'created' } },
      },
    },
  },
  components: {
    responses: {
      Error: {
        description: 'error',
        content: {
          'application/json': {
            schema: { type: 'object', properties: { code: { type: 'integer' } } },
          },
        },
      },
    },
    schemas: {
      // `items` without `type` (was fixed in place: `type = "array"`)
      Names: { items: { type: 'string' } },
      // enum with a single `null` value
      OnlyNull: { enum: [null] },
      PetType: { type: 'string', enum: ['dog', 'cat'] },
      // discriminator mapping (the mapped schemas were changed in place)
      Pet: {
        type: 'object',
        required: ['petType'],
        properties: { petType: { $ref: '#/components/schemas/PetType' }, name: { type: 'string' } },
        discriminator: {
          propertyName: 'petType',
          mapping: { dog: '#/components/schemas/Dog', cat: '#/components/schemas/Cat' },
        },
      },
      Dog: {
        allOf: [
          { $ref: '#/components/schemas/Pet' },
          {
            type: 'object',
            properties: { petType: { type: 'string', enum: ['dog'] }, bark: { type: 'boolean' } },
          },
        ],
      },
      Cat: {
        allOf: [
          { $ref: '#/components/schemas/Pet' },
          {
            type: 'object',
            properties: { petType: { type: 'string', enum: ['cat'] }, lives: { type: 'integer' } },
          },
        ],
      },
      WithRequired: {
        allOf: [{ $ref: '#/components/schemas/Pet' }, { type: 'object', required: ['name'] }],
      },
      Nullable31: { type: ['string', 'null'], enum: ['x', null] },
    },
  },
};

const documents: Record<string, Record<string, unknown>> = {
  'petstore (OpenAPI 3)': fixture('petstore.json'),
  'runtime client (OpenAPI 3)': fixture('runtime-client.json'),
  'swagger 2': fixture('swagger2.yaml'),
  'edge cases': edgeCases,
};

const optionSets: Record<string, Record<string, unknown>> = {
  default: {},
  'modular + axios + route types': {
    modular: true,
    httpClientType: 'axios',
    generateRouteTypes: true,
  },
  'all extractions': {
    extractRequestParams: true,
    extractRequestBody: true,
    extractResponseBody: true,
    extractResponseError: true,
    extractEnums: true,
    extractResponses: true,
  },
  'types options': {
    generateUnionEnums: true,
    addReadonly: true,
    sortTypes: true,
    generateResponses: true,
  },
};

const run = (spec: unknown, options: Record<string, unknown>) =>
  generateApi({ spec: spec as any, output: false, silent: true, ...options });

describe('the input document is never changed', () => {
  for (const [documentName, document] of Object.entries(documents)) {
    for (const [optionsName, options] of Object.entries(optionSets)) {
      it(`${documentName}, ${optionsName}: a frozen input gives the same output`, async () => {
        const expected = await run(structuredClone(document), options);
        const frozen = deepFreeze(structuredClone(document));
        const actual = await run(frozen, options);
        expect(actual.files).toEqual(expected.files);
      });
    }
  }

  it('with custom code (hooks) the input is copied and stays unchanged', async () => {
    const input = structuredClone(edgeCases);
    const before = structuredClone(input);
    const result = await run(input, {
      extractEnums: true,
      hooks: {
        // changes the raw schemas it gets
        onPreParseSchema: (schema: any) => ({ ...schema, 'x-touched': true }),
        onParseSchema: (schema: any, parsed: any) => {
          schema.description = 'changed by a hook';
          return parsed;
        },
      },
    });
    expect(result.files.length).toBeGreaterThan(0);
    expect(input).toEqual(before);
  });

  it('exposes an unchanged originalSchema and a fixed usage schema', async () => {
    const input = deepFreeze(structuredClone(edgeCases));
    const { configuration } = await run(input, {});
    const config: any = configuration.config;
    // `info` default is on the copies, not on the input
    expect((input as any).info).toBeUndefined();
    expect(config.swaggerSchema.info).toEqual({ title: 'No title', version: '' });
    expect(config.originalSchema.info).toEqual({ title: 'No title', version: '' });
    // fixSwaggerSchema adds `consumes` / `produces` to copies of the operations
    expect(config.swaggerSchema.paths['/pets'].get.consumes).toEqual([]);
    expect((input as any).paths['/pets'].get.consumes).toBeUndefined();
    expect(config.originalSchema.paths['/pets'].get.consumes).toBeUndefined();
  });
});
