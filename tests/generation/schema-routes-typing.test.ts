import { describe, expect, it } from 'vitest';

import { generate } from '../helpers/generate';
import { jsonContent, oas, squash } from './spec-helpers';

describe('$ref responses of operations without operationId', () => {
  it('does not strip "undefined" from the referenced type name', async () => {
    // before: `typeName.replace(operationId, "")` with `operationId === undefined`
    // removed the "undefined" substring and resolved `PetundefinedResponse` to `PetResponse`
    const spec = oas(
      {
        '/pets': {
          get: {
            responses: { 200: { $ref: '#/components/responses/PetundefinedResponse' } },
          },
        },
      },
      {
        PetResponse: { type: 'object', properties: { wrong: { type: 'number' } } },
      },
      {
        components: {
          responses: {
            PetundefinedResponse: {
              description: 'ok',
              content: jsonContent({ type: 'object', properties: { name: { type: 'string' } } }),
            },
          },
        },
      }
    );
    const { files } = await generate(spec);
    const code = squash(files['api.ts']);
    expect(code).toContain('this.request<{name?:string;},any>');
    expect(code).not.toContain('this.request<PetResponse');
  });
});
