import { describe, expect, it } from 'vitest';

import { SchemaFormatters } from './schema-formatters';

const createFormatters = () =>
  new SchemaFormatters({
    config: {},
    logger: {},
    schemaUtils: {},
    templatesWorker: {},
  });

describe('SchemaFormatters.formatDescription', () => {
  it('escapes comment terminators in schema descriptions', () => {
    const formatters = createFormatters();

    expect(formatters.formatDescription('rows by **paramId**/KLINE', true)).toBe(
      'rows by **paramId**\\/KLINE'
    );
  });
});
