import { describe, expect, it } from 'vitest';

import { generate, typeCheck } from './generate';

describe('test helpers', () => {
  it('generates and type-checks a minimal spec', async () => {
    const { files } = await generate({
      openapi: '3.0.0',
      info: { title: 't', version: '1' },
      paths: {
        '/ping': {
          get: {
            operationId: 'ping',
            responses: {
              200: {
                description: 'ok',
                content: { 'application/json': { schema: { type: 'string' } } },
              },
            },
          },
        },
      },
    });
    expect(Object.keys(files)).toEqual(['api.ts']);
    expect(typeCheck(files)).toEqual([]);
  });
});
