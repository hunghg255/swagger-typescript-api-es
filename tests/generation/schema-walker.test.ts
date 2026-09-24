import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { SchemaWalker } from '../../src/schema-walker';
import { makeTmpDir } from '../helpers/generate';

const logger = { debug: () => {} };

const schema = {
  components: {
    schemas: {
      Pet: { type: 'object', properties: { name: { type: 'string' } } },
      'a/b': { type: 'string' },
      'til~de': { type: 'number' },
    },
  },
};

describe('SchemaWalker', () => {
  it('finds local refs', () => {
    const walker = new SchemaWalker({ config: {}, logger });
    walker.addSchema('$usage', schema);
    expect(walker.findByRef('#/components/schemas/Pet')).toEqual(schema.components.schemas.Pet);
    // cached
    expect(walker.caches.has('#/components/schemas/Pet')).toBe(true);
    expect(walker.findByRef('#/components/schemas/Pet')).toBe(
      walker.findByRef('#/components/schemas/Pet')
    );
  });

  it('decodes JSON pointer escapes', () => {
    const walker = new SchemaWalker({ config: {}, logger });
    walker.addSchema('$usage', schema);
    expect(walker.findByRef('#/components/schemas/a~1b')).toEqual({ type: 'string' });
    expect(walker.findByRef('#/components/schemas/til~0de')).toEqual({ type: 'number' });
  });

  it('returns undefined/null for missing and remote refs', () => {
    const walker = new SchemaWalker({ config: {}, logger });
    walker.addSchema('$usage', schema);
    expect(walker.findByRef('#/components/schemas/Missing')).toBeFalsy();
    expect(walker.findByRef('https://example.com/schema.json#/components/schemas/Pet')).toBeNull();
  });

  it('resolves refs into another file', () => {
    const dir = makeTmpDir();
    const file = path.join(dir, 'other.json');
    fs.writeFileSync(file, JSON.stringify(schema));
    const swaggerSchemaResolver = {
      getSwaggerSchemaByPath: (p: string) => fs.readFileSync(p, 'utf8'),
      processSwaggerSchemaFile: (content: string) => JSON.parse(content),
    };
    const walker = new SchemaWalker({ config: {}, logger, swaggerSchemaResolver });
    expect(walker.findByRef(`${file}#/components/schemas/Pet`)).toEqual(
      schema.components.schemas.Pet
    );
    // the file is loaded once
    expect(walker.schemas.has(file)).toBe(true);
  });
});
