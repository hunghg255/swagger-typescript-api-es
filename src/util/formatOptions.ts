type OptionType = 'string' | 'boolean' | 'number';

interface OptionInfo {
  /** CodeGenConfig / IOptions key */
  key: string;
  type: OptionType;
  /** boolean flag with inverted meaning (`--noClient true` -> `generateClient: false`) */
  invert?: boolean;
}

/**
 * CLI option name (as declared in `cli-start.ts`) -> config option.
 * Keys are normalized with `normalizeKey`, so both kebab-case (`union-enums`) and
 * camelCase (`unionEnums`, which is what cac hands to the action) are accepted.
 */
const MAP_KEY: Record<string, OptionInfo> = {
  u: { key: 'url', type: 'string' },
  o: { key: 'output', type: 'string' },
  n: { key: 'name', type: 'string' },
  t: { key: 'templates', type: 'string' },
  d: { key: 'defaultResponseAsSuccess', type: 'boolean' },
  r: { key: 'generateResponses', type: 'boolean' },
  'union-enums': { key: 'generateUnionEnums', type: 'boolean' },
  'add-readonly': { key: 'addReadonly', type: 'boolean' },
  'route-types': { key: 'generateRouteTypes', type: 'boolean' },
  noClient: { key: 'generateClient', type: 'boolean', invert: true },
  'enum-names-as-values': { key: 'enumNamesAsValues', type: 'boolean' },
  'extract-request-params': { key: 'extractRequestParams', type: 'boolean' },
  'extract-request-body': { key: 'extractRequestBody', type: 'boolean' },
  'extract-response-body': { key: 'extractResponseBody', type: 'boolean' },
  'extract-response-error': { key: 'extractResponseError', type: 'boolean' },
  modular: { key: 'modular', type: 'boolean' },
  js: { key: 'toJS', type: 'boolean' },
  'module-name-index': { key: 'moduleNameIndex', type: 'number' },
  'module-name-first-tag': { key: 'moduleNameFirstTag', type: 'boolean' },
  disableStrictSSL: { key: 'disableStrictSSL', type: 'boolean' },
  disableProxy: { key: 'disableProxy', type: 'boolean' },
  httpClientType: { key: 'httpClientType', type: 'string' },
  'unwrap-response-data': { key: 'unwrapResponseData', type: 'boolean' },
  'disable-throw-on-error': { key: 'disableThrowOnError', type: 'boolean' },
  'single-http-client': { key: 'singleHttpClient', type: 'boolean' },
  silent: { key: 'silent', type: 'boolean' },
  'default-response': { key: 'defaultResponseType', type: 'string' },
  'type-prefix': { key: 'typePrefix', type: 'string' },
  'type-suffix': { key: 'typeSuffix', type: 'string' },
  'clean-output': { key: 'cleanOutput', type: 'boolean' },
  'api-class-name': { key: 'apiClassName', type: 'string' },
  patch: { key: 'patch', type: 'boolean' },
  debug: { key: 'debug', type: 'boolean' },
  'another-array-type': { key: 'anotherArrayType', type: 'boolean' },
  'sort-types': { key: 'sortTypes', type: 'boolean' },
  'sort-routes': { key: 'sortRoutes', type: 'boolean' },
  /** path to a config file with extra options, loaded by `cli-start.ts` */
  'custom-config': { key: 'customConfig', type: 'string' },
  'extract-enums': { key: 'extractEnums', type: 'boolean' },
};

/** `union-enums`, `unionEnums` -> `unionenums` */
const normalizeKey = (key: string) => key.replace(/-/g, '').toLowerCase();

const OPTIONS = new Map(
  Object.entries(MAP_KEY).map(([cliKey, info]) => [normalizeKey(cliKey), { ...info, cliKey }])
);

const parseBoolean = (value: any) => {
  if (typeof value === 'string') {
    return !['false', '0', 'no', 'off', ''].includes(value.trim().toLowerCase());
  }

  return !!value;
};

const formatValue = (value: any, { type, invert, cliKey }: OptionInfo & { cliKey: string }) => {
  // repeated flags are collected into an array by the args parser, the last one wins
  const rawValue = Array.isArray(value) ? value[value.length - 1] : value;

  switch (type) {
    case 'boolean': {
      const bool = parseBoolean(rawValue);
      return invert ? !bool : bool;
    }
    case 'number': {
      const number = typeof rawValue === 'number' ? rawValue : Number(rawValue);
      if (rawValue === '' || rawValue === true || Number.isNaN(number)) {
        throw new Error(`Option --${cliKey} expects a number, got "${rawValue}"`);
      }
      return number;
    }
    default: {
      return rawValue === undefined || rawValue === null ? rawValue : String(rawValue);
    }
  }
};

export const formatOptions = (options: Record<string, any>) => {
  const formattedOptions = Object.keys(options).reduce((acc: any, key) => {
    const option = OPTIONS.get(normalizeKey(key));

    if (option && options[key] !== undefined) {
      acc[option.key] = formatValue(options[key], option);
    }

    return acc;
  }, {});

  return formattedOptions;
};
