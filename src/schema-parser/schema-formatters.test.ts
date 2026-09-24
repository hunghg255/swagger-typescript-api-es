import { describe, expect, it } from 'vitest';

import { CodeGenConfig } from '../configuration';
import { SchemaFormatters } from './schema-formatters';

const createFormatters = () =>
  new SchemaFormatters({
    config: new CodeGenConfig({}),
    logger: {},
    schemaUtils: {
      safeAddNullToType: (_schema, type) => type,
      isNullableSchema: () => false,
    },
    templatesWorker: { renderTemplate: () => '' },
  });

describe('SchemaFormatters.formatDescription', () => {
  it('escapes comment terminators in schema descriptions', () => {
    const formatters = createFormatters();

    expect(formatters.formatDescription('rows by **paramId**/KLINE', true)).toBe(
      'rows by **paramId**\\/KLINE'
    );
  });
});
