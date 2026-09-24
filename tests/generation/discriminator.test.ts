import { describe, expect, it } from 'vitest';

import { generate, typeCheck } from '../helpers/generate';
import { oas, ok, squash } from './spec-helpers';

const spec = oas(
  {
    '/pets': {
      get: {
        tags: ['pets'],
        operationId: 'listPets',
        responses: ok({ type: 'array', items: { $ref: '#/components/schemas/Pet' } }),
      },
    },
  },
  {
    PetType: { type: 'string', enum: ['dog', 'cat'] },
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
          // x-enumNames without `enum`
          properties: {
            petType: { type: 'string', 'x-enumNames': ['Cat'] },
            lives: { type: 'integer' },
          },
        },
      ],
    },
  }
);

describe('discriminator', () => {
  it('generates mapping types (single file)', async () => {
    const { files } = await generate(spec);
    const code = squash(files['api.ts']);
    expect(code).toContain('typeBasePetPetTypeMapping<Key,Type>={petType:Key;}&Type;');
    expect(code).toContain(
      'exporttypePet=BasePet&(BasePetPetTypeMapping<PetType.Dog,Dog>|BasePetPetTypeMapping<PetType.Cat,Cat>);'
    );
    expect(code).toContain('exporttypeDog=BasePet&{petType?:PetType.Dog;bark?:boolean;};');
    // `x-enumNames` without `enum` doesn't crash the mapping
    expect(code).toContain('exporttypeCat=BasePet&{petType?:"Cat";lives?:number;};');
    expect(typeCheck(files)).toEqual([]);
  });

  it.each(['fetch', 'axios'])('modular output compiles (%s)', async (httpClientType) => {
    const { files } = await generate(spec, {
      modular: true,
      httpClientType,
      generateRouteTypes: true,
    });
    expect(Object.keys(files).sort()).toEqual([
      'Pets.ts',
      'PetsRoute.ts',
      'data-contracts.ts',
      'http-client.ts',
    ]);
    // internal types are not exported from data-contracts and must not be imported
    expect(files['data-contracts.ts']).toMatch(/^type BasePetPetTypeMapping</m);
    expect(files['data-contracts.ts']).toMatch(/^interface BasePet \{/m);
    for (const file of ['Pets.ts', 'PetsRoute.ts']) {
      expect(files[file]).toMatch(/import \{ PetType, Pet, Dog, Cat \} from '.\/data-contracts'/);
      expect(files[file]).not.toContain('BasePet');
    }
    expect(typeCheck(files)).toEqual([]);
  });
});
