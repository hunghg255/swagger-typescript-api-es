import { describe, expect, it } from 'vitest';

import { generate, typeCheck } from '../helpers/generate';
import { oas, ok } from './spec-helpers';

describe('JSDoc escaping of "*/"', () => {
  const spec = oas(
    {
      '/links': {
        get: {
          operationId: 'getLinks',
          summary: 'Summary with */ terminator',
          description: 'Description with */ terminator',
          tags: ['links'],
          responses: {
            200: {
              description: 'Response */ description',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Link' } } },
            },
          },
        },
      },
    },
    {
      Link: {
        type: 'object',
        title: 'Link */ title',
        description: 'Link */ description',
        properties: {
          url: {
            type: 'string',
            title: 'Url */ title',
            pattern: '^https?://.*/$',
            example: 'https://example.com/*/',
            default: 'https://example.com/a/*/b',
          },
          meta: {
            type: 'object',
            example: { glob: '**/*/' },
            properties: { tag: { type: 'string' } },
          },
        },
      },
      Code: { type: 'string', pattern: 'a*/b', title: 'Code */ title', example: '*/' },
    },
    { info: { title: 'Api */ title', version: '1.0.0', description: 'Api */ description' } }
  );

  it('escapes every value placed into JSDoc comments (single file)', async () => {
    const { files } = await generate(spec, { generateResponses: true });
    const code = files['api.ts'];

    expect(code).toContain('@pattern ^https?://.*\\/$');
    expect(code).toContain('Url *\\/ title');
    expect(code).toContain('Link *\\/ title');
    expect(code).toContain('@example "https://example.com/*\\/"');
    expect(code).toContain('@default "https://example.com/a/*\\/b"');
    expect(code).toContain('@pattern a*\\/b');
    expect(code).toContain('@summary Summary with *\\/ terminator');
    expect(code).toContain('@description Description with *\\/ terminator');
    expect(code).toContain('Response *\\/ description');
    expect(code).toContain('@title Api *\\/ title');
    // the only "*/" left are the ones that close generated comments
    expect(code).not.toMatch(/[^\s*]\*\/[^\n]/);

    expect(typeCheck(files)).toEqual([]);
  });

  it('escapes route docs of route types', async () => {
    const { files } = await generate(spec, { generateRouteTypes: true, generateClient: false });
    expect(files['api.ts']).toContain('@summary Summary with *\\/ terminator');
    expect(typeCheck(files)).toEqual([]);
  });

  it('still produces valid code for a regular description', async () => {
    const { files } = await generate(
      oas(
        { '/a': { get: { operationId: 'a', responses: ok({ type: 'string' }) } } },
        {
          A: { type: 'string', description: 'glob **/KLINE' },
        }
      )
    );
    expect(files['api.ts']).toContain('glob **\\/KLINE');
    expect(typeCheck(files)).toEqual([]);
  });
});
