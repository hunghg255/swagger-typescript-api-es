import { describe, expect, it, vi } from 'vitest';

import { generateId } from '../../src/util/id';
import { Logger } from '../../src/util/logger';

describe('generateId', () => {
  it('returns 12 chars of [a-z0-9] by default', () => {
    for (let i = 0; i < 200; i++) {
      expect(generateId()).toMatch(/^[a-z0-9]{12}$/);
    }
  });

  it('respects the size argument', () => {
    expect(generateId(5)).toHaveLength(5);
  });

  it('is unique enough', () => {
    const ids = new Set(Array.from({ length: 5000 }, () => generateId()));
    expect(ids.size).toBe(5000);
  });
});

describe('Logger emojis', () => {
  it.each([
    ['log', '✨'],
    ['success', '✅'],
    ['warn', '❗'],
    ['error', '⛔'],
  ] as const)('%s prints %s', (method, emoji) => {
    const spy = vi
      .spyOn(console, method === 'success' ? 'log' : method)
      .mockImplementation(() => {});
    const logger = new Logger({ config: { silent: false, debug: false, version: 'x' } });
    logger.firstLog = false;
    (logger as any)[method]('hello');
    expect(spy.mock.calls.flat().join(' ')).toContain(emoji);
    spy.mockRestore();
  });
});
