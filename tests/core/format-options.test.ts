import { describe, expect, it } from 'vitest';

import { CodeGenConfig } from '../../src/configuration';
import { formatOptions } from '../../src/util/formatOptions';

/**
 * Each entry: CLI option key as cac hands it to the action (camelCase), the
 * raw value, and the expected CodeGenConfig/IOptions key + value.
 */
const CASES: Array<[string, any, string, any]> = [
  ['u', 'https://x/swagger.json', 'url', 'https://x/swagger.json'],
  ['o', './out', 'output', './out'],
  ['n', 'api.ts', 'name', 'api.ts'],
  ['t', './tpl', 'templates', './tpl'],
  ['d', 'true', 'defaultResponseAsSuccess', true],
  ['r', 'true', 'generateResponses', true],
  ['unionEnums', 'true', 'generateUnionEnums', true],
  ['addReadonly', 'true', 'addReadonly', true],
  ['routeTypes', 'true', 'generateRouteTypes', true],
  ['noClient', 'true', 'generateClient', false],
  ['enumNamesAsValues', 'true', 'enumNamesAsValues', true],
  ['extractRequestParams', 'true', 'extractRequestParams', true],
  ['extractRequestBody', 'true', 'extractRequestBody', true],
  ['extractResponseBody', 'true', 'extractResponseBody', true],
  ['extractResponseError', 'true', 'extractResponseError', true],
  ['modular', 'true', 'modular', true],
  ['js', 'true', 'toJS', true],
  ['moduleNameIndex', 2, 'moduleNameIndex', 2],
  ['moduleNameFirstTag', 'true', 'moduleNameFirstTag', true],
  ['disableStrictSSL', 'true', 'disableStrictSSL', true],
  ['disableProxy', 'true', 'disableProxy', true],
  ['httpClientType', 'axios', 'httpClientType', 'axios'],
  ['unwrapResponseData', 'true', 'unwrapResponseData', true],
  ['disableThrowOnError', 'true', 'disableThrowOnError', true],
  ['singleHttpClient', 'true', 'singleHttpClient', true],
  ['silent', 'true', 'silent', true],
  ['defaultResponse', 'unknown', 'defaultResponseType', 'unknown'],
  ['typePrefix', 'I', 'typePrefix', 'I'],
  ['typeSuffix', 'Dto', 'typeSuffix', 'Dto'],
  ['cleanOutput', 'true', 'cleanOutput', true],
  ['apiClassName', 'MyApi', 'apiClassName', 'MyApi'],
  ['patch', 'true', 'patch', true],
  ['debug', 'true', 'debug', true],
  ['anotherArrayType', 'true', 'anotherArrayType', true],
  ['sortTypes', 'true', 'sortTypes', true],
  ['sortRoutes', 'true', 'sortRoutes', true],
  ['customConfig', './custom.config.mjs', 'customConfig', './custom.config.mjs'],
  ['extractEnums', true, 'extractEnums', true],
];

describe('formatOptions', () => {
  it.each(CASES)('maps camelCase cli key %s', (cliKey, value, configKey, expected) => {
    expect(formatOptions({ '--': [], [cliKey]: value })).toEqual({ [configKey]: expected });
  });

  it.each(
    CASES.filter(
      ([k]) =>
        /[A-Z]/.test(k) &&
        !['noClient', 'httpClientType', 'disableStrictSSL', 'disableProxy'].includes(k)
    )
  )('maps kebab-case key for %s', (cliKey, value, configKey, expected) => {
    const kebab = cliKey.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
    expect(formatOptions({ [kebab]: value })).toEqual({ [configKey]: expected });
  });

  it('maps every flag to an existing CodeGenConfig field (except name/customConfig)', () => {
    const config: any = new CodeGenConfig({} as any);
    for (const [, , configKey] of CASES) {
      if (configKey === 'name' || configKey === 'customConfig') continue;
      expect(configKey in config, configKey).toBe(true);
    }
  });

  it('parses boolean-like strings for boolean options', () => {
    expect(formatOptions({ modular: 'false', js: 'TRUE', sortTypes: true, patch: false })).toEqual({
      modular: false,
      toJS: true,
      sortTypes: true,
      patch: false,
    });
    expect(formatOptions({ noClient: 'false' })).toEqual({ generateClient: true });
    expect(formatOptions({ noClient: true })).toEqual({ generateClient: false });
  });

  it('coerces module-name-index to a number', () => {
    expect(formatOptions({ moduleNameIndex: '3' })).toEqual({ moduleNameIndex: 3 });
    expect(() => formatOptions({ moduleNameIndex: 'abc' })).toThrow(/module-name-index/);
  });

  it('keeps string options as strings even when mri parsed a number', () => {
    expect(formatOptions({ n: 123, typePrefix: 1 })).toEqual({ name: '123', typePrefix: '1' });
  });

  it('uses the last value when a flag is repeated', () => {
    expect(formatOptions({ o: ['./a', './b'] })).toEqual({ output: './b' });
  });

  it('ignores unknown keys and cac internals', () => {
    expect(formatOptions({ '--': [], foo: 'bar', h: true })).toEqual({});
  });
});
