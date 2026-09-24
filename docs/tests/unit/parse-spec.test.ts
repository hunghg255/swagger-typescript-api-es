import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { MAX_SPEC_BYTES } from '@/lib/api-types';
import { HttpError } from '@/lib/server/errors';
import { parseSpecText } from '@/lib/server/parse-spec';

const fixtures = path.resolve(__dirname, '../../../tests/fixtures');

const expectStatus = (fn: () => unknown, status: number, message?: RegExp) => {
  try {
    fn();
  } catch (error) {
    expect(error).toBeInstanceOf(HttpError);
    expect((error as HttpError).status).toBe(status);
    if (message) expect((error as HttpError).message).toMatch(message);
    return;
  }
  throw new Error(`expected a ${status} error`);
};

describe('parseSpecText', () => {
  it('parses JSON', () => {
    const doc = parseSpecText(readFileSync(path.join(fixtures, 'petstore.json'), 'utf8'));
    expect(doc.openapi).toMatch(/^3/);
  });

  it('parses YAML', () => {
    const doc = parseSpecText(readFileSync(path.join(fixtures, 'swagger2.yaml'), 'utf8'));
    expect(doc.swagger).toBe('2.0');
  });

  it('parses JSON with a BOM and YAML with a BOM', () => {
    expect(parseSpecText('﻿{"openapi":"3.0.0","info":{},"paths":{}}').openapi).toBe('3.0.0');
    expect(parseSpecText('﻿openapi: 3.1.0\npaths: {}\n').openapi).toBe('3.1.0');
  });

  it('gives friendly errors for invalid input', () => {
    expectStatus(() => parseSpecText(''), 400, /empty/);
    expectStatus(() => parseSpecText('   \n'), 400, /empty/);
    expectStatus(() => parseSpecText('{"openapi": '), 400, /Invalid JSON/);
    expectStatus(() => parseSpecText('openapi: [3.0'), 400, /Invalid YAML/);
    expectStatus(() => parseSpecText('[1, 2]'), 400, /object/);
    expectStatus(() => parseSpecText('just a string'), 400, /object/);
    expectStatus(() => parseSpecText('{"info": {}}'), 400, /"openapi" or "swagger"/);
    expectStatus(() => parseSpecText('openapi: {a: 1}'), 400, /"openapi" or "swagger"/);
    expectStatus(() => parseSpecText('openapi: 4.0.0'), 400, /Unsupported/);
    expectStatus(() => parseSpecText('swagger: "1.2"'), 400, /Unsupported/);
  });

  it('refuses unsafe YAML tags', () => {
    expectStatus(
      () => parseSpecText('openapi: 3.0.0\nx: !!js/function "function () { return 1 }"\n'),
      400,
      /Invalid YAML/
    );
  });

  it('refuses external $refs', () => {
    for (const ref of [
      '/etc/passwd',
      './other.yaml#/Pet',
      'http://169.254.169.254/latest',
      'file:///etc/passwd',
    ]) {
      expectStatus(
        () =>
          parseSpecText(
            JSON.stringify({
              openapi: '3.0.0',
              paths: {},
              components: { schemas: { A: { $ref: ref } } },
            })
          ),
        400,
        /External \$ref/
      );
    }
    expect(() =>
      parseSpecText(
        JSON.stringify({
          openapi: '3.0.0',
          paths: {},
          components: { schemas: { A: { $ref: '#/components/schemas/B' }, B: { type: 'string' } } },
        })
      )
    ).not.toThrow();
  });

  it('enforces MAX_SPEC_BYTES', () => {
    const big = JSON.stringify({ openapi: '3.0.0', paths: {}, x: 'a'.repeat(MAX_SPEC_BYTES) });
    expectStatus(() => parseSpecText(big), 413, /too large/);
    // multi-byte characters count as bytes, not as UTF-16 units
    const multiByte = `openapi: 3.0.0\nx: "${'é'.repeat(MAX_SPEC_BYTES / 2 + 10)}"\n`;
    expect(multiByte.length).toBeLessThan(MAX_SPEC_BYTES);
    expectStatus(() => parseSpecText(multiByte), 413);
  });

  it('refuses YAML alias bombs', () => {
    const lines = ['openapi: 3.0.0', 'a0: &a0 [x, x, x, x, x, x, x, x, x, x]'];
    for (let i = 1; i < 9; i++) {
      const prev = `*a${i - 1}`;
      lines.push(`a${i}: &a${i} [${Array.from({ length: 10 }, () => prev).join(', ')}]`);
    }
    expectStatus(() => parseSpecText(lines.join('\n')), 413, /too complex/);
  });

  it('refuses deeply nested documents', () => {
    const deep = `{"openapi":"3.0.0","x":${'['.repeat(1000)}${']'.repeat(1000)}}`;
    expectStatus(() => parseSpecText(deep), 400, /nested too deeply/);
  });
});
