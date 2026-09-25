import type { ParsedSchema } from '../types/parsed';

const isObjectLike = (value: unknown): value is object =>
  typeof value === 'object' && value !== null;

/**
 * Parse results of raw schemas, keyed by the schema object.
 *
 * They used to be stored on the schemas themselves (`schema.$parsed`), which mutated the input
 * document (so it had to be deep-copied first). As an enumerable property, `$parsed` was also
 * carried over by every copy of a schema (`{ ...schema }`, `clone`, `cloneDeep`, `omit`, ...):
 * `inherit` and `cloneDeep` keep that behaviour where schemas are copied, so the output is unchanged.
 */
class ParsedSchemaCache {
  private parsed = new WeakMap<object, ParsedSchema>();

  get(schema: unknown): ParsedSchema | undefined {
    return isObjectLike(schema) ? this.parsed.get(schema) : undefined;
  }

  set(schema: unknown, parsed: ParsedSchema) {
    if (isObjectLike(schema)) {
      this.parsed.set(schema, parsed);
    }
  }

  /**
   * `copy` gets the parse result of `source` (as `{ ...source }` copied `source.$parsed`).
   * @returns `copy`
   */
  inherit<T>(source: unknown, copy: T): T {
    if (isObjectLike(source) && isObjectLike(copy) && !this.parsed.has(copy)) {
      const parsed = this.parsed.get(source);
      if (parsed !== undefined) {
        this.parsed.set(copy, parsed);
      }
    }
    return copy;
  }

  /**
   * Deep copy of a schema. Like `cloneDeep` did with `$parsed`, the parse results of the copied
   * objects are deep-copied too (with the same copies of the objects they reference).
   */
  cloneDeep<T>(value: T): T {
    return this.cloneValue(value, new Map()) as T;
  }

  private cloneValue(value: unknown, copies: Map<object, unknown>): unknown {
    if (!isObjectLike(value)) {
      return value;
    }

    const existing = copies.get(value);
    if (existing !== undefined) {
      return existing;
    }

    let copy: object;

    if (Array.isArray(value)) {
      const array: unknown[] = [];
      copies.set(value, array);
      for (const item of value) {
        array.push(this.cloneValue(item, copies));
      }
      copy = array;
    } else if (value instanceof Date) {
      copy = new Date(value.getTime());
      copies.set(value, copy);
    } else if (value instanceof RegExp) {
      copy = new RegExp(value.source, value.flags);
      copies.set(value, copy);
    } else {
      const object: Record<PropertyKey, unknown> = Object.create(Object.getPrototypeOf(value));
      copies.set(value, object);
      for (const key of Object.keys(value)) {
        object[key] = this.cloneValue((value as Record<string, unknown>)[key], copies);
      }
      copy = object;
    }

    const parsed = this.parsed.get(value);
    if (parsed !== undefined) {
      this.parsed.set(copy, this.cloneValue(parsed, copies) as ParsedSchema);
    }

    return copy;
  }
}

export { ParsedSchemaCache };
