import { describe, expect, it } from 'vitest';

import type { ParsedSchema } from '../types/parsed';
import { ParsedSchemaCache } from './parsed-schema-cache';

const parsed = (name: string) => ({ name, content: [] }) as unknown as ParsedSchema;

describe('ParsedSchemaCache', () => {
  it('stores parse results by object identity, ignores primitives', () => {
    const cache = new ParsedSchemaCache();
    const schema = { type: 'string' };
    cache.set(schema, parsed('a'));
    expect(cache.get(schema)).toEqual(parsed('a'));
    expect(cache.get({ type: 'string' })).toBeUndefined();
    cache.set('text', parsed('b'));
    expect(cache.get('text')).toBeUndefined();
    expect(cache.get(null)).toBeUndefined();
  });

  it('inherit: a copy gets the result of its source, without overwriting its own', () => {
    const cache = new ParsedSchemaCache();
    const source = { type: 'string' };
    const own = { type: 'number' };
    const result = parsed('source');
    cache.set(source, result);
    cache.set(own, parsed('own'));

    const copy = cache.inherit(source, { ...source, nullable: true });
    expect(cache.get(copy)).toBe(result);
    expect(cache.inherit(source, own)).toBe(own);
    expect(cache.get(own)).toEqual(parsed('own'));
    // nothing to inherit
    const plain = cache.inherit({ type: 'boolean' }, { type: 'boolean' });
    expect(cache.get(plain)).toBeUndefined();
  });

  it('cloneDeep copies the objects and their parse results (like cloneDeep with `$parsed`)', () => {
    const cache = new ParsedSchemaCache();
    const shared = { type: 'string' };
    interface TestSchema {
      type: string;
      properties: { a: object; b: object; list: { type: string; items: object } };
      created: Date;
      pattern: RegExp;
      self?: TestSchema;
    }
    const schema: TestSchema = {
      type: 'object',
      properties: { a: shared, b: shared, list: { type: 'array', items: shared } },
      created: new Date(0),
      pattern: /^a+$/g,
    };
    schema.self = schema;
    const nestedResult = { name: 'Nested', content: [{ rawSchema: shared }] };
    cache.set(shared, nestedResult as unknown as ParsedSchema);

    const copy = cache.cloneDeep(schema);

    expect(copy).not.toBe(schema);
    expect(copy.properties.a).not.toBe(shared);
    expect(copy.properties.a).toEqual(shared);
    // shared references and cycles stay shared in the copy
    expect(copy.properties.a).toBe(copy.properties.b);
    expect(copy.properties.list.items).toBe(copy.properties.a);
    expect(copy.self).toBe(copy);
    expect(copy.created).toEqual(new Date(0));
    expect(copy.created).not.toBe(schema.created);
    expect(copy.pattern.source).toBe('^a+$');
    expect(copy.pattern.flags).toBe('g');

    // the parse result is copied too, and references the copied schema
    const copiedResult = cache.get(copy.properties.a) as unknown as typeof nestedResult;
    expect(copiedResult).toEqual(nestedResult);
    expect(copiedResult).not.toBe(nestedResult);
    expect(copiedResult.content[0].rawSchema).toBe(copy.properties.a);
    // the source is untouched
    expect(cache.get(shared)).toBe(nestedResult);
    expect(cache.get(copy)).toBeUndefined();
  });
});
