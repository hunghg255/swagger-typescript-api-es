import { beforeAll, describe, expect, it } from 'vitest';

import { oas, squash } from '../generation/spec-helpers';
import { generate, typeCheck } from '../helpers/generate';

const spec = oas(
  {
    '/pets': {
      get: {
        operationId: 'listPets',
        responses: {
          200: {
            description: 'ok',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Pet' } },
              },
            },
          },
        },
      },
    },
  },
  {
    Pet: {
      type: 'object',
      required: ['status'],
      properties: {
        status: { $ref: '#/components/schemas/Status' },
        profile: { $ref: '#/components/schemas/user-profile' },
        model: { $ref: '#/components/schemas/3dModel' },
        color: { $ref: '#/components/schemas/Color' },
      },
    },
    'user-profile': { type: 'object', properties: { name: { type: 'string' } } },
    '3dModel': { type: 'object', properties: { url: { type: 'string' } } },
    Status: { type: 'string', enum: ['active', 'in-active', '1st'] },
    Color: { type: 'integer', enum: [1, 2], 'x-enumNames': ['Red', 'Green'] },
    Level: { type: 'integer', enum: [10, 20], 'x-enum-varnames': ['Low', 'High'] },
    NamesOnly: { type: 'string', 'x-enumNames': ['One', 'Two'] },
  }
);

describe('default naming', () => {
  let code: string;
  let files: Record<string, string>;
  beforeAll(async () => {
    ({ files } = await generate(spec));
    code = squash(files['api.ts']);
  });

  it('pascal-cases dashed names and prefixes names starting with a digit with "Type"', () => {
    expect(code).toContain('exportinterfaceUserProfile{');
    expect(code).toContain('exportinterfaceType3DModel{');
    expect(code).toContain('profile?:UserProfile;model?:Type3DModel;');
  });

  it('formats enum keys and prefixes keys starting with a digit with "Value"', () => {
    expect(code).toContain(
      'exportenumStatus{Active="active",InActive="in-active",Value1st="1st",}'
    );
  });

  it('uses x-enumNames / x-enum-varnames as enum keys and keeps the values', () => {
    expect(code).toContain('exportenumColor{Red=1,Green=2,}');
    expect(code).toContain('exportenumLevel{Low=10,High=20,}');
  });

  it('uses x-enumNames as string values when there is no `enum`', () => {
    expect(code).toContain('exportenumNamesOnly{One="One",Two="Two",}');
  });

  it('compiles', () => {
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('typePrefix / typeSuffix', () => {
  let code: string;
  let files: Record<string, string>;
  beforeAll(async () => {
    ({ files } = await generate(spec, { typePrefix: 'I', typeSuffix: 'Dto' }));
    code = squash(files['api.ts']);
  });

  it('applies to every component name and every usage', () => {
    expect(code).toContain('exportinterfaceIPetDto{status:IStatusDto;');
    expect(code).toContain('profile?:IUserProfileDto;');
    expect(code).toContain('exportenumIColorDto{');
    expect(code).toContain('this.request<IPetDto[],any>');
    expect(code).not.toMatch(/interfacePet\{/);
  });

  it('does not touch enum keys', () => {
    expect(code).toContain('exportenumIStatusDto{Active="active",');
  });

  it('compiles', () => {
    expect(typeCheck(files)).toEqual([]);
  });
});

describe('enumKeyPrefix / enumKeySuffix / fixInvalid*Prefix / enumNamesAsValues', () => {
  let code: string;
  let files: Record<string, string>;
  beforeAll(async () => {
    ({ files } = await generate(spec, {
      enumKeyPrefix: 'P',
      enumKeySuffix: 'S',
      fixInvalidTypeNamePrefix: 'Fix',
      fixInvalidEnumKeyPrefix: 'N',
      enumNamesAsValues: true,
    }));
    code = squash(files['api.ts']);
  });

  it('wraps enum keys with enumKeyPrefix / enumKeySuffix (not type names)', () => {
    expect(code).toContain('exportenumStatus{PActiveS="active",PInActiveS="in-active",');
    expect(code).toContain('exportinterfacePet{');
  });

  it('uses fixInvalidEnumKeyPrefix for enum keys starting with a digit', () => {
    expect(code).toContain('PN1stS="1st"');
  });

  it('uses fixInvalidTypeNamePrefix for type names starting with a digit', () => {
    expect(code).toContain('exportinterfaceFix3DModel{');
    expect(code).toContain('model?:Fix3DModel;');
    expect(code).not.toContain('Type3DModel');
  });

  it('enumNamesAsValues uses x-enumNames / x-enum-varnames as string values', () => {
    expect(code).toContain('exportenumColor{PRedS="Red",PGreenS="Green",}');
    expect(code).toContain('exportenumLevel{PLowS="Low",PHighS="High",}');
  });

  it('compiles', () => {
    expect(typeCheck(files)).toEqual([]);
  });
});
