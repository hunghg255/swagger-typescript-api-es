import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const FIXTURES_DIR = fileURLToPath(new URL('../fixtures', import.meta.url));

export const loadFixture = (name: string): any => {
  const content = fs.readFileSync(path.join(FIXTURES_DIR, name), 'utf8');
  return name.endsWith('.json') ? JSON.parse(content) : content;
};

/** Builds a minimal OpenAPI 3.0 document. */
export const oas = (
  paths: Record<string, any> = {},
  schemas: Record<string, any> = {},
  extra: Record<string, any> = {}
) => {
  const { components, ...rest } = extra;
  return {
    openapi: '3.0.3',
    info: { title: 'test', version: '1.0.0' },
    paths,
    components: { schemas, ...components },
    ...rest,
  };
};

export const jsonContent = (schema: any) => ({ 'application/json': { schema } });

/** `200` JSON response with the given schema. */
export const ok = (schema: any, description = 'ok') => ({
  200: { description, content: jsonContent(schema) },
});

/**
 * Removes whitespace and normalizes quotes to `"`,
 * so assertions don't depend on the code formatter.
 */
export const squash = (code: string) =>
  code
    .replace(/\s+/g, '')
    .replace(/'/g, '"')
    // leading union bars added by the formatter: `=| A | B` -> `=A | B`
    .replace(/([<,=(:])\|/g, '$1');
