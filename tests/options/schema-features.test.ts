import { beforeAll, describe, expect, it } from 'vitest';

import { oas, ok, squash } from '../generation/spec-helpers';
import { generate, typeCheck } from '../helpers/generate';

const schemas = {
  Node: {
    type: 'object',
    description: 'tree node',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid', readOnly: true },
      secret: {
        type: 'string',
        writeOnly: true,
        minLength: 8,
        maxLength: 64,
        pattern: '^a',
        example: 'abcdefgh',
      },
      parent: { $ref: '#/components/schemas/Node' },
      children: { type: 'array', items: { $ref: '#/components/schemas/Node' } },
      count: { type: 'integer', default: 3, minimum: 1, maximum: 10 },
      flag: { type: 'boolean', default: false },
      mode: { type: 'string', default: 'fast' },
      legacy: { type: 'string', deprecated: true, description: 'old field' },
      nullableAny: {
        anyOf: [{ type: 'string' }, { $ref: '#/components/schemas/Leaf' }],
        nullable: true,
      },
      notNumber: { not: { type: 'number' } },
      prim: { oneOf: [{ type: 'string' }, { type: 'integer' }, { type: 'boolean' }] },
      matrix: {
        type: 'array',
        items: { type: 'array', items: { type: 'array', items: { type: 'integer' } } },
      },
      implicitArr: { items: { type: 'string' } },
      pair: { type: 'array', items: [{ type: 'string' }, { $ref: '#/components/schemas/Leaf' }] },
      anyMap: { type: 'object', additionalProperties: true },
      leafMap: { type: 'object', additionalProperties: { $ref: '#/components/schemas/Leaf' } },
      numMap: { type: 'object', additionalProperties: { type: 'number' } },
      date: { type: 'string', format: 'date' },
      dateTime: { type: 'string', format: 'date-time' },
      bin: { type: 'string', format: 'binary' },
      constStr: { const: 'fixed' },
      constNum: { type: 'number', const: 42 },
      constBool: { const: true },
      constNull: { const: null },
      nullType: { type: 'null' },
    },
  },
  Leaf: { type: 'object', properties: { v: { type: 'number' } } },
  AnyOfTop: { anyOf: [{ $ref: '#/components/schemas/Leaf' }, { type: 'string' }] },
  AnyOfRequired: {
    type: 'object',
    required: ['v'],
    anyOf: [{ $ref: '#/components/schemas/Leaf' }, { type: 'object', properties: { w: {} } }],
  },
  NotTop: { not: { type: 'string' } },
  OneOfPrim: { oneOf: [{ type: 'string' }, { type: 'number' }], nullable: true },
  Tuple: { type: 'array', items: [{ type: 'string' }, { type: 'number' }] },
  Grid: { type: 'array', items: { type: 'array', items: { type: 'string' } } },
  Dict: { type: 'object', additionalProperties: { type: 'string' } },
  Old: { type: 'object', deprecated: true, properties: { a: { type: 'string' } } },
};

const spec = oas(
  {
    '/nodes/{id}': {
      get: {
        operationId: 'getNode',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: ok({ $ref: '#/components/schemas/Node' }),
      },
      delete: {
        operationId: 'deleteNode',
        deprecated: true,
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 204: { description: 'deleted' } },
      },
    },
  },
  schemas
);

/** the body (`{...}`) of `export interface <name>` */
const interfaceBody = (code: string, name: string) => {
  const match = code.match(new RegExp(`exportinterface${name}\\{(.*?)\\}(?=/\\*\\*|export)`));
  if (!match) throw new Error(`interface ${name} not found`);
  return match[1];
};

describe('schema features', () => {
  let files: Record<string, string>;
  let raw: string;
  let code: string;
  let node: string;

  beforeAll(async () => {
    ({ files } = await generate(spec));
    raw = files['api.ts'];
    code = squash(raw);
    node = interfaceBody(code, 'Node');
  });

  it('compiles', () => {
    expect(typeCheck(files)).toEqual([]);
  });

  it('recursive schemas reference themselves', () => {
    expect(node).toContain('parent?:Node;');
    expect(node).toContain('children?:Node[];');
  });

  it('anyOf -> union (inline, top level, nullable)', () => {
    expect(node).toContain('nullableAny?:string|Leaf|null;');
    expect(code).toContain('exporttypeAnyOfTop=Leaf|string;');
  });

  it('anyOf passes `required` of the parent to the members', () => {
    expect(code).toContain('exporttypeAnyOfRequired=UtilRequiredKeys<Leaf,"v">|{w?:any;};');
    expect(code).toContain('typeUtilRequiredKeys<T,KextendskeyofT>');
  });

  it('not -> any', () => {
    expect(node).toContain('notNumber?:any;');
    expect(code).toContain('exporttypeNotTop=any;');
  });

  it('oneOf with primitives -> union', () => {
    expect(node).toContain('prim?:string|number|boolean;');
    expect(code).toContain('exporttypeOneOfPrim=string|number|null;');
  });

  it('arrays of arrays', () => {
    expect(node).toContain('matrix?:number[][][];');
    expect(code).toContain('exporttypeGrid=string[][];');
  });

  it('`items` without `type` is an array', () => {
    expect(node).toContain('implicitArr?:string[];');
  });

  it('tuples (`items` as an array)', () => {
    expect(node).toContain('pair?:[string,Leaf];');
    expect(code).toContain('exporttypeTuple=[string,number];');
  });

  it('additionalProperties: true / schema -> Record', () => {
    expect(node).toContain('anyMap?:Record<string,any>;');
    expect(node).toContain('leafMap?:Record<string,Leaf>;');
    expect(node).toContain('numMap?:Record<string,number>;');
    expect(code).toContain('exporttypeDict=Record<string,string>;');
  });

  it('date formats are strings with a @format tag, binary is File', () => {
    expect(node).toContain('/**@formatdate*/date?:string;');
    expect(node).toContain('/**@formatdate-time*/dateTime?:string;');
    expect(node).toContain('/**@formatbinary*/bin?:File;');
  });

  it('const -> literal types', () => {
    expect(node).toContain('constStr?:"fixed";');
    expect(node).toContain('constNum?:42;');
    expect(node).toContain('constBool?:true;');
    expect(node).toContain('constNull?:null;');
    expect(node).toContain('nullType?:null;');
  });

  it('jsdoc: default values, limits, pattern, example, description', () => {
    expect(raw).toMatch(/\* @min 1\n\s+\* @max 10\n\s+\* @default 3\n\s+\*\/\n\s+count\?: number;/);
    expect(node).toContain('/**@defaultfalse*/flag?:boolean;');
    expect(node).toContain('/**@default"fast"*/mode?:string;');
    expect(node).toContain(
      '@minLength8*@maxLength64*@pattern^a*@example"abcdefgh"*/secret?:string;'
    );
    expect(code).toContain('/**treenode*/exportinterfaceNode{');
  });

  it('readOnly / writeOnly are plain fields without addReadonly', () => {
    expect(node).toContain('id:string;');
    expect(node).not.toContain('readonly');
    expect(node).toContain('secret?:string;');
  });

  it('@deprecated for fields, schemas and routes', () => {
    expect(node).toContain('/***oldfield*@deprecated*/legacy?:string;');
    expect(code).toContain('/**@deprecated*/exportinterfaceOld{');
    expect(code).toMatch(
      /@nameDeleteNode\*@requestDELETE:\/nodes\/\{id\}\*@deprecated\*\/deleteNode/
    );
    expect(code).not.toMatch(/@nameGetNode\*@requestGET:\/nodes\/\{id\}\*@deprecated/);
  });
});

describe('addReadonly', () => {
  it('marks readOnly properties as `readonly` (only them)', async () => {
    const { files } = await generate(spec, { addReadonly: true });
    const node = interfaceBody(squash(files['api.ts']), 'Node');
    expect(node).toContain('readonlyid:string;');
    expect(node.match(/readonly/g)).toHaveLength(1);
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('anotherArrayType', () => {
  it('uses Array<T> instead of T[]', async () => {
    const { files } = await generate(spec, { anotherArrayType: true });
    const code = squash(files['api.ts']);
    const node = interfaceBody(code, 'Node');
    expect(node).toContain('children?:Array<Node>;');
    expect(node).toContain('matrix?:Array<Array<Array<number>>>;');
    expect(code).toContain('exporttypeGrid=Array<Array<string>>;');
    expect(code).not.toMatch(/\w\[\]/);
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('swagger 2.0 schemas', () => {
  const swagger2 = {
    swagger: '2.0',
    info: { title: 't', version: '1' },
    paths: {
      '/users': {
        get: {
          operationId: 'listUsers',
          produces: ['application/json'],
          responses: {
            200: {
              description: 'ok',
              schema: { type: 'array', items: { $ref: '#/definitions/User' } },
            },
          },
        },
      },
    },
    definitions: {
      User: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', 'x-nullable': true },
          nick: { type: 'string', 'x-nullable': true },
          tags: { type: 'array', items: { type: 'string' } },
          avatar: { type: 'file' },
        },
      },
    },
  };

  it('x-nullable adds `| null` (and makes the field optional)', async () => {
    const { files } = await generate(swagger2);
    const user = interfaceBody(squash(files['api.ts']), 'User');
    expect(user).toContain('name:string;');
    expect(user).toContain('email?:string|null;');
    expect(user).toContain('nick?:string|null;');
    expect(user).toContain('tags?:string[];');
    expect(user).toContain('avatar?:File;');
    expect(squash(files['api.ts'])).toContain('this.request<User[],any>');
    expect(typeCheck(files)).toEqual([]);
  });
});
