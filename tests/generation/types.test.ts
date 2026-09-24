import { describe, expect, it } from 'vitest';

import { CodeGenProcess } from '../../src/code-gen-process';
import { generate, makeTmpDir, typeCheck } from '../helpers/generate';
import { oas, ok, squash } from './spec-helpers';

const oas31 = (schemas: Record<string, any>) => ({
  ...oas(
    {
      '/ping': {
        get: { operationId: 'ping', responses: ok({ $ref: '#/components/schemas/Holder' }) },
      },
    },
    schemas
  ),
  openapi: '3.1.0',
});

describe('enums with null', () => {
  const schemas = {
    Holder: {
      type: 'object',
      properties: {
        inline: { type: ['string', 'null'], enum: ['a', 'b', null] },
        ref: { $ref: '#/components/schemas/Level' },
        shared1: { $ref: '#/components/schemas/Shared' },
        shared2: { $ref: '#/components/schemas/Shared' },
      },
    },
    Level: { type: ['string', 'null'], enum: ['low', 'high', null] },
    Shared: { type: 'string', enum: ['x', null] },
  };

  it('keeps `| null` for inline and referenced enums', async () => {
    const { files } = await generate(oas31(schemas));
    const code = squash(files['api.ts']);
    expect(code).toContain('inline?:"a"|"b"|null;');
    expect(code).toContain('exportenumLevel{Low="low",High="high",}');
    expect(code).toContain('ref?:Level|null;');
    expect(code).toContain('shared1?:Shared|null;');
    expect(code).toContain('shared2?:Shared|null;');
    expect(typeCheck(files)).toEqual([]);
  });

  it('keeps `| null` for union enums', async () => {
    const { files } = await generate(oas31(schemas), { generateUnionEnums: true });
    const code = squash(files['api.ts']);
    expect(code).toContain('exporttypeLevel="low"|"high"|null;');
    expect(code).toContain('inline?:"a"|"b"|null;');
    expect(typeCheck(files)).toEqual([]);
  });

  it('does not mutate the input schema', async () => {
    const spec = oas31(schemas);
    const process = await generate(spec);
    const raw = (process.result as any).configuration.config.swaggerSchema.components.schemas
      .Shared;
    expect(raw.enum).toEqual(['x', null]);
  });

  it('with extractEnums', async () => {
    const { files } = await generate(oas31(schemas), { extractEnums: true });
    const code = squash(files['api.ts']);
    expect(code).toContain('inline?:HolderInlineEnum|null;');
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('OAS 3.1 type arrays', () => {
  it('keeps items/format/additionalProperties of every type variant', async () => {
    const { files } = await generate(
      oas31({
        Holder: {
          type: 'object',
          properties: {
            tags: { type: ['array', 'null'], items: { type: 'string' } },
            ids: { type: ['array', 'null'], items: { $ref: '#/components/schemas/Id' } },
            map: { type: ['object', 'null'], additionalProperties: { type: 'integer' } },
            when: { type: ['string', 'null'], format: 'date-time' },
            count: { type: ['integer', 'string'] },
          },
        },
        Id: { type: 'string' },
      })
    );
    const code = squash(files['api.ts']);
    expect(code).toContain('tags?:string[]|null;');
    expect(code).toContain('ids?:Id[]|null;');
    expect(code).toContain('map?:Record<string,number>|null;');
    expect(code).toContain('when?:string|null;');
    expect(code).toContain('count?:number|string;');
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('nullable', () => {
  it('nullable object types', async () => {
    const { files } = await generate(
      oas(
        {
          '/a': { get: { operationId: 'a', responses: ok({ $ref: '#/components/schemas/Box' }) } },
        },
        {
          Box: {
            type: 'object',
            nullable: true,
            properties: {
              inner: { type: 'object', nullable: true, properties: { v: { type: 'string' } } },
            },
          },
        }
      )
    );
    const code = squash(files['api.ts']);
    expect(code).toContain('exporttypeBox={inner?:{v?:string;}|null;}|null;');
    expect(typeCheck(files)).toEqual([]);
  });

  it('inline object formatter keeps string content and adds null (unit)', () => {
    const codeGen: any = new CodeGenProcess({
      name: 'api.ts',
      output: makeTmpDir(),
      input: 'none',
    } as any);
    const { schemaFormatters } = codeGen.schemaParserFabric;
    expect(
      schemaFormatters.inline.object({ schemaType: 'object', nullable: true, content: 'Foo' })
        .content
    ).toBe('Foo | null');
    expect(schemaFormatters.inline.object({ schemaType: 'object', content: 'Foo' }).content).toBe(
      'Foo'
    );
  });
});

describe('allOf', () => {
  it('keeps properties required by the parent schema', async () => {
    const { files } = await generate(
      oas(
        {
          '/a': {
            get: { operationId: 'a', responses: ok({ $ref: '#/components/schemas/Named' }) },
          },
        },
        {
          Base: { type: 'object', properties: { id: { type: 'string' } } },
          Named: {
            required: ['id', 'name', 'kind'],
            allOf: [
              { $ref: '#/components/schemas/Base' },
              {
                type: 'object',
                required: ['kind'],
                properties: {
                  name: { type: 'string' },
                  kind: { type: 'string' },
                  extra: { type: 'string' },
                },
              },
            ],
          },
        }
      )
    );
    const code = squash(files['api.ts']);
    expect(code).toContain('UtilRequiredKeys<Base,"id">');
    expect(code).toContain('{name:string;kind:string;extra?:string;}');
    expect(typeCheck(files)).toEqual([]);
  });
});
