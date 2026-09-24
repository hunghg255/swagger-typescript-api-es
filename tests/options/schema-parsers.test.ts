import { beforeAll, describe, expect, it } from 'vitest';

import { oas, ok, squash } from '../generation/spec-helpers';
import { generate, typeCheck } from '../helpers/generate';

const STRING_FORMATS = [
  'time',
  'duration',
  'email',
  'idn-email',
  'idn-hostname',
  'ipv4',
  'ipv6',
  'uri',
  'uri-reference',
  'uri-template',
  'json-pointer',
  'relative-json-pointer',
  'regex',
  'unknown-format',
];

const schemas = {
  Cat: {
    type: 'object',
    required: ['kind'],
    properties: { kind: { type: 'string' }, meow: { type: 'boolean' } },
  },
  Dog: {
    type: 'object',
    required: ['kind'],
    properties: { kind: { type: 'string' }, bark: { type: 'boolean' } },
  },
  PetNoMapping: {
    oneOf: [{ $ref: '#/components/schemas/Cat' }, { $ref: '#/components/schemas/Dog' }],
    discriminator: { propertyName: 'kind' },
  },
  PetMapped: {
    oneOf: [{ $ref: '#/components/schemas/Cat' }, { $ref: '#/components/schemas/Dog' }],
    discriminator: {
      propertyName: 'kind',
      mapping: { cat: '#/components/schemas/Cat', dog: '#/components/schemas/Dog' },
    },
  },
  Flags: { type: 'boolean', enum: [true, false] },
  NullableFlag: { type: 'boolean', enum: [true, null] },
  Nums: { type: 'number', enum: [1.5, 2] },
  OnlyNull: { enum: [null] },
  Pairs: {
    type: 'array',
    enum: [
      ['a', 'b'],
      ['c', 'd'],
    ],
  },
  Formats: {
    type: 'object',
    properties: {
      ...Object.fromEntries(
        STRING_FORMATS.map((f) => [f.replace(/-/g, '_'), { type: 'string', format: f }])
      ),
      file: { type: 'string', format: 'file' },
    },
  },
  FileType: { type: 'file' },
  Obj: { type: 'object' },
  Holder: {
    type: 'object',
    properties: {
      flag: { $ref: '#/components/schemas/Flags' },
      inlineFlag: { type: 'boolean', enum: [true] },
    },
  },
};

const spec = oas(
  {
    '/holder': {
      get: { operationId: 'getHolder', responses: ok({ $ref: '#/components/schemas/Holder' }) },
    },
  },
  schemas
);

describe('schema parsers', () => {
  let files: Record<string, string>;
  let code: string;
  beforeAll(async () => {
    ({ files } = await generate(spec));
    code = squash(files['api.ts']);
  });

  it('compiles', () => {
    expect(typeCheck(files)).toEqual([]);
  });

  it('discriminator without mapping -> plain union', () => {
    expect(code).toContain('exporttypePetNoMapping=Cat|Dog;');
  });

  it('discriminator with oneOf + mapping -> tagged union', () => {
    expect(code).toContain('exporttypePetMapped=({kind:"cat";}&Cat)|({kind:"dog";}&Dog);');
  });

  it('boolean enums are union types (TS enums cannot hold booleans)', () => {
    expect(code).toContain('exporttypeFlags=true|false;');
    expect(code).toContain('exporttypeNullableFlag=true|null;');
    expect(code).not.toContain('enumFlags');
    expect(code).toContain('flag?:Flags;inlineFlag?:true;');
  });

  it('number enums keep number values', () => {
    expect(code).toContain('exportenumNums{Value15=1.5,Value2=2,}');
  });

  it('an enum with only `null` is `null`', () => {
    expect(code).toContain('exporttypeOnlyNull=null;');
  });

  it('an enum of arrays -> union of tuples', () => {
    expect(code).toContain('exporttypePairs=["a","b"]|["c","d"];');
  });

  it('string formats map to string (file -> File) and are documented', () => {
    for (const format of STRING_FORMATS) {
      expect(code).toContain(`/**@format${format}*/${format.replace(/-/g, '_')}?:string;`);
    }
    expect(code).toContain('/**@formatfile*/file?:File;');
    expect(code).toContain('exporttypeFileType=File;');
    expect(code).toContain('exporttypeObj=object;');
  });
});

describe('schema parsers with generateUnionEnums', () => {
  it('keeps boolean enums as unions', async () => {
    const { files } = await generate(spec, { generateUnionEnums: true });
    const code = squash(files['api.ts']);
    expect(code).toContain('exporttypeFlags=true|false;');
    expect(code).toContain('exporttypeNums=1.5|2;');
    expect(typeCheck(files)).toEqual([]);
  });
});
