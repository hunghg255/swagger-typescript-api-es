import { describe, expect, it, vi } from 'vitest';

import { ComponentTypeNameResolver } from '../../src/component-type-name-resolver';
import { NameResolver } from '../../src/util/name-resolver';

const logger = { debug: vi.fn(), warn: vi.fn() };

describe('NameResolver', () => {
  const create = (reserved: string[] = []) =>
    new NameResolver({}, logger, reserved, (variants: string[]) => `${variants[0]}Fallback`);

  it('reserves and resolves the first free variant', () => {
    const resolver = create(['A']);
    expect(resolver.resolve(['A', 'B', 'C'])).toBe('B');
    expect(resolver.isReserved('B')).toBe(true);
    expect(resolver.resolve(['A', 'B', 'C'])).toBe('C');
  });

  it('uses the fallback when every variant is reserved', () => {
    const resolver = create(['A']);
    expect(resolver.resolve(['A'])).toBe('AFallback');
    expect(resolver.isReserved('AFallback')).toBe(true);
  });

  it('does not reserve when shouldReserve is false', () => {
    const resolver = create(['A']);
    // the reservation check is skipped as well
    expect(resolver.resolve(['A', 'B'], undefined, undefined, false)).toBe('A');
    expect(resolver.resolve(['B'], undefined, undefined, false)).toBe('B');
    expect(resolver.isReserved('B')).toBe(false);
  });

  it('supports a custom resolver function', () => {
    const resolver = create(['X1']);
    let i = 0;
    expect(resolver.resolve(null, () => `X${++i}`)).toBe('X2');
    expect(resolver.isReserved('X2')).toBe(true);
    expect(resolver.resolve(null, () => 'Y', undefined, false)).toBe('Y');
    expect(resolver.isReserved('Y')).toBe(false);
  });

  it('unreserves names', () => {
    const resolver = create(['A', 'B', 'C']);
    resolver.unreserve(['A', 'C']);
    expect(resolver.reservedNames).toEqual(['B']);
    expect(resolver.isReserved('A')).toBe(false);
    expect(resolver.resolve(['A'])).toBe('A');
  });

  it('reserve ignores duplicates and empty names', () => {
    const resolver = create();
    resolver.reserve(['A', 'A', '', null, 'B']);
    expect(resolver.reservedNames).toEqual(['A', 'B']);
  });
});

describe('ComponentTypeNameResolver', () => {
  const config = { typeNameResolverName: 'ComponentType', componentTypeNameResolver: {} };

  it('generates deterministic names with a counter per variant', () => {
    const resolver = new ComponentTypeNameResolver(config, logger, ['Data', 'Result']);
    expect(resolver.resolve(['Data', 'Result'])).toBe('Data1');
    expect(resolver.resolve(['Data', 'Result'])).toBe('Data2');
    expect(resolver.resolve(['Result', 'Data'])).toBe('Result1');
  });

  it('skips generated names that are already reserved', () => {
    const resolver = new ComponentTypeNameResolver(config, logger, ['Data', 'Data1', 'Data2']);
    expect(resolver.resolve(['Data'])).toBe('Data3');
  });

  it('is identical for independent instances', () => {
    const run = () => {
      const resolver = new ComponentTypeNameResolver(config, logger, ['A', 'B', 'C']);
      return Array.from({ length: 10 }, () => resolver.resolve(['A', 'B', 'C']));
    };
    expect(run()).toEqual(run());
    expect(run()).toEqual(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10']);
  });

  it('uses `typeNameResolverName` for the fallback name', () => {
    const resolver = new ComponentTypeNameResolver(config, logger, []);
    expect(resolver.resolve([])).toBe('ComponentType1');
    expect(resolver.resolve([])).toBe('ComponentType2');
  });
});
