import { describe, expect, it } from 'vitest';

import { HttpError } from '@/lib/server/errors';
import { validateOptions, validateRequest } from '@/lib/server/validate';

const expect400 = (fn: () => unknown, message?: RegExp) => {
  try {
    fn();
  } catch (error) {
    expect(error).toBeInstanceOf(HttpError);
    expect((error as HttpError).status).toBe(400);
    if (message) expect((error as HttpError).message).toMatch(message);
    return;
  }
  throw new Error('expected a 400 error');
};

describe('validateRequest', () => {
  it('requires exactly one of spec / url', () => {
    expect400(() => validateRequest({}), /exactly one/);
    expect400(() => validateRequest({ spec: '{}', url: 'https://example.com' }), /exactly one/);
    expect400(() => validateRequest({ spec: '', url: '' }), /exactly one/);
    expect(validateRequest({ spec: 'openapi: 3.0.0' })).toEqual({
      spec: 'openapi: 3.0.0',
      options: {},
    });
    expect(validateRequest({ url: ' https://example.com/a.json ' })).toEqual({
      url: 'https://example.com/a.json',
      options: {},
    });
  });

  it('rejects wrong body / field types', () => {
    expect400(() => validateRequest(null));
    expect400(() => validateRequest([]));
    expect400(() => validateRequest('x'));
    expect400(() => validateRequest({ spec: { openapi: '3.0.0' } }), /spec/);
    expect400(() => validateRequest({ url: 42 }), /url/);
    expect400(() => validateRequest({ url: `https://e.com/${'a'.repeat(3000)}` }), /too long/);
    expect400(() => validateRequest({ spec: 'x', options: [] }), /options/);
    expect400(() => validateRequest({ spec: 'x', options: 'modular' }), /options/);
  });
});

describe('validateOptions', () => {
  it('keeps whitelisted options only (unknown keys are dropped)', () => {
    const options = validateOptions({
      modular: true,
      toJS: false,
      httpClientType: 'axios',
      moduleNameIndex: 1,
      apiClassName: 'PetApi',
      name: 'petstore.ts',
      typePrefix: 'I',
      // everything below must be dropped
      hooks: { onInit: 'x' },
      templates: '/etc',
      output: '/tmp',
      input: '/etc/passwd',
      url: 'http://169.254.169.254/',
      spec: {},
      cleanOutput: true,
      silent: false,
      authorizationToken: 'secret',
      requestOptions: { headers: {} },
      customTranslator: 'x',
      extraTemplates: [{ name: 'a', path: '/etc/passwd' }],
      constructor: 'x',
    });
    expect(options).toEqual({
      modular: true,
      toJS: false,
      httpClientType: 'axios',
      moduleNameIndex: 1,
      apiClassName: 'PetApi',
      name: 'petstore.ts',
      typePrefix: 'I',
    });
    expect(Object.getPrototypeOf(options)).toBe(Object.prototype);
  });

  it('ignores __proto__ keys from JSON', () => {
    const input = JSON.parse('{"__proto__": {"modular": true, "polluted": 1}, "toJS": true}');
    const options = validateOptions(input);
    expect(options).toEqual({ toJS: true });
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });

  it('type-checks known options', () => {
    expect400(() => validateOptions({ modular: 'true' }), /modular must be a boolean/);
    expect400(() => validateOptions({ toJS: 1 }), /boolean/);
    expect400(() => validateOptions({ apiClassName: 1 }), /string/);
    expect400(() => validateOptions({ httpClientType: 'got' }), /httpClientType/);
    expect400(() => validateOptions({ moduleNameIndex: 1.5 }), /moduleNameIndex/);
    expect400(() => validateOptions({ moduleNameIndex: -1 }), /moduleNameIndex/);
    expect400(() => validateOptions({ moduleNameIndex: '1' }), /moduleNameIndex/);
    expect400(() => validateOptions({ moduleNameIndex: 1000 }), /moduleNameIndex/);
  });

  it('treats null / empty strings as "default"', () => {
    expect(validateOptions({ modular: null, apiClassName: '', name: '   ' })).toEqual({});
    expect(validateOptions(undefined)).toEqual({});
  });

  it('limits string lengths and characters', () => {
    expect400(() => validateOptions({ typePrefix: 'A'.repeat(101) }), /too long/);
    expect400(() => validateOptions({ apiClassName: '1Api' }), /identifier/);
    expect400(() => validateOptions({ apiClassName: 'Api; process.exit()' }), /identifier/);
    expect400(() => validateOptions({ typeSuffix: 'a-b' }));
    expect400(() => validateOptions({ defaultResponseType: 'void\nconsole.log(1)' }));
    expect(validateOptions({ defaultResponseType: 'Record<string, unknown>' })).toEqual({
      defaultResponseType: 'Record<string, unknown>',
    });
  });

  it.each(['Api', 'Api.ts', 'my-api', 'my_api.ts', 'petstore2'])('accepts file name %s', (name) => {
    expect(validateOptions({ name })).toEqual({ name });
  });

  it.each([
    '../Api.ts',
    '/etc/passwd',
    'a/b.ts',
    'a\\b.ts',
    '.env',
    '..',
    'Api.js',
    'Api.d.ts',
    'Api.ts.exe',
    'Api..ts',
    'Api ts',
    'x'.repeat(70),
    'Api\u0000.ts',
  ])('rejects file name %j', (name) => {
    expect400(() => validateOptions({ name }), /options.name/);
  });
});
