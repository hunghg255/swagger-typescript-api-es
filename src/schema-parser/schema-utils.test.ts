import { describe, expect, it } from 'vitest';

import { CodeGenConfig } from '../configuration';
import { SchemaComponentsMap } from '../schema-components-map';
import { TypeNameFormatter } from '../type-name-formatter';
import type { CodeGenProcessOptions } from '../types';
import { SchemaUtils } from './schema-utils';

const createSchemaUtils = (options: CodeGenProcessOptions = {}) => {
  const config = new CodeGenConfig(options);
  return new SchemaUtils({
    config,
    schemaComponentsMap: new SchemaComponentsMap({ config }),
    typeNameFormatter: new TypeNameFormatter({ config, logger: { warn: () => {} } }),
  });
};

describe('SchemaUtils.getSchemaType', () => {
  it('uses primitive type aliases by format', () => {
    const schemaUtils = createSchemaUtils({
      primitiveTypeConstructs: { string: { 'date-time': 'Date' } },
    });

    expect(schemaUtils.getSchemaType({ type: 'string', format: 'date-time' })).toBe('Date');
    expect(schemaUtils.getSchemaType({ type: 'string', format: 'uuid' })).toBe('string');
    expect(schemaUtils.getSchemaType({ type: 'string' })).toBe('string');
  });

  it('falls back to the schema type for a formats struct without the format and `$default`', () => {
    const schemaUtils = createSchemaUtils({
      primitiveTypeConstructs: { decimal: { money: 'Money' } },
    });

    expect(schemaUtils.getSchemaType({ type: 'decimal', format: 'money' })).toBe('Money');
    // was the formats struct itself (rendered as `[object Object]`)
    expect(schemaUtils.getSchemaType({ type: 'decimal' })).toBe('decimal');
    expect(schemaUtils.getSchemaType({ type: 'decimal', format: 'other' })).toBe('decimal');
  });
});
