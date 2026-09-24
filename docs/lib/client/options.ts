import {
  BOOLEAN_OPTIONS,
  type BooleanOption,
  HTTP_CLIENTS,
  type HttpClient,
  type PlaygroundOptions,
  STRING_OPTIONS,
  type StringOption,
} from '../api-types';

/** fully-populated options used by the UI (every key has a value) */
export type FullOptions = Record<BooleanOption, boolean> &
  Record<StringOption, string> & { httpClientType: HttpClient; moduleNameIndex: number };

export const DEFAULT_OPTIONS: FullOptions = {
  ...(Object.fromEntries(BOOLEAN_OPTIONS.map((k) => [k, false])) as Record<BooleanOption, boolean>),
  ...(Object.fromEntries(STRING_OPTIONS.map((k) => [k, ''])) as Record<StringOption, string>),
  generateClient: true,
  httpClientType: 'fetch',
  moduleNameIndex: 0,
};

export interface OptionMeta {
  label: string;
  description: string;
  /** CLI flag, `null` when the option can only be set in a config file */
  flag: string | null;
  /** boolean flags: `--noClient true` means `generateClient: false` */
  invert?: boolean;
  /** `--extract-enums` is a plain switch */
  switch?: boolean;
  placeholder?: string;
}

export const OPTION_META: Record<BooleanOption | StringOption | 'httpClientType' | 'moduleNameIndex', OptionMeta> = {
  httpClientType: {
    label: 'HTTP client',
    description: 'HTTP client used by the generated code.',
    flag: '--httpClientType',
  },
  modular: {
    label: 'Modular output',
    description: 'Separate files for the HTTP client, data contracts and each route module.',
    flag: '--modular',
  },
  generateClient: {
    label: 'Generate client',
    description: 'Generate the API class and HTTP client. Off = data contracts only.',
    flag: '--noClient',
    invert: true,
  },
  toJS: {
    label: 'JavaScript output',
    description: 'Emit a .js module with a .d.ts declaration file instead of .ts.',
    flag: '--js',
  },
  singleHttpClient: {
    label: 'Single HTTP client',
    description: 'Pass an HttpClient instance to the Api constructor instead of extending it.',
    flag: '--single-http-client',
  },
  generateRouteTypes: {
    label: 'Route types',
    description: 'Generate type definitions for the API routes (namespaces with request/response types).',
    flag: '--route-types',
  },
  generateUnionEnums: {
    label: 'Union enums',
    description: 'Generate every enum as a union type (T1 | T2 | TN).',
    flag: '--union-enums',
  },
  extractEnums: {
    label: 'Extract enums',
    description: 'Extract inline enums into TypeScript enum declarations.',
    flag: '--extract-enums',
    switch: true,
  },
  addReadonly: {
    label: 'Readonly properties',
    description: 'Mark readOnly: true schema properties as readonly.',
    flag: '--add-readonly',
  },
  anotherArrayType: {
    label: 'Array<T> syntax',
    description: 'Write array types as Array<Type> instead of Type[].',
    flag: '--another-array-type',
  },
  sortTypes: {
    label: 'Sort types',
    description: 'Sort types and their fields alphabetically.',
    flag: '--sort-types',
  },
  extractRequestParams: {
    label: 'Request params',
    description: 'Extract request params into a data contract (path + query combined in one object).',
    flag: '--extract-request-params',
  },
  extractRequestBody: {
    label: 'Request body',
    description: 'Extract request body types into data contracts.',
    flag: '--extract-request-body',
  },
  extractResponseBody: {
    label: 'Response body',
    description: 'Extract response body types into data contracts.',
    flag: '--extract-response-body',
  },
  extractResponseError: {
    label: 'Response error',
    description: 'Extract response error types into data contracts.',
    flag: '--extract-response-error',
  },
  generateResponses: {
    label: 'Response info',
    description: 'Generate extra information about responses, including typings for bad responses.',
    flag: '--r',
  },
  sortRoutes: {
    label: 'Sort routes',
    description: 'Sort routes alphabetically.',
    flag: '--sort-routes',
  },
  moduleNameFirstTag: {
    label: 'Module = first tag',
    description: 'Group routes into modules by their first tag instead of the path.',
    flag: '--module-name-first-tag',
  },
  unwrapResponseData: {
    label: 'Unwrap response data',
    description: 'Resolve requests with the response data instead of the full response.',
    flag: '--unwrap-response-data',
  },
  defaultResponseAsSuccess: {
    label: 'Default as success',
    description: 'Treat the "default" response as a success response too.',
    flag: '--d',
  },
  disableThrowOnError: {
    label: "Don't throw on error",
    description: '(fetch) Do not throw when response.ok is not true.',
    flag: '--disable-throw-on-error',
  },
  enumNamesAsValues: {
    label: 'x-enumNames as values',
    description: 'Use the values in x-enumNames as enum values, not only as keys.',
    flag: '--enum-names-as-values',
  },
  name: {
    label: 'File name',
    description: 'Output file name in single-file mode.',
    flag: '--n',
    placeholder: 'Api.ts',
  },
  apiClassName: {
    label: 'API class name',
    description: 'Name of the generated API class.',
    flag: '--api-class-name',
    placeholder: 'Api',
  },
  typePrefix: {
    label: 'Type prefix',
    description: 'Prefix for data contract names.',
    flag: '--type-prefix',
    placeholder: 'e.g. I',
  },
  typeSuffix: {
    label: 'Type suffix',
    description: 'Suffix for data contract names.',
    flag: '--type-suffix',
    placeholder: 'e.g. Dto',
  },
  enumKeyPrefix: {
    label: 'Enum key prefix',
    description: 'Prefix for enum keys (config file only).',
    flag: null,
    placeholder: '',
  },
  enumKeySuffix: {
    label: 'Enum key suffix',
    description: 'Suffix for enum keys (config file only).',
    flag: null,
    placeholder: '',
  },
  defaultResponseType: {
    label: 'Default response type',
    description: 'Type used for an empty response schema.',
    flag: '--default-response',
    placeholder: 'void',
  },
  moduleNameIndex: {
    label: 'Module name index',
    description: 'Path segment used to group routes into modules (GET:/fruits/getFruit with 0 → fruits).',
    flag: '--module-name-index',
    placeholder: '0',
  },
};

export const OPTION_GROUPS: { id: string; title: string; options: BooleanOption[] }[] = [
  {
    id: 'output',
    title: 'Output',
    options: ['modular', 'generateClient', 'toJS', 'singleHttpClient', 'generateRouteTypes'],
  },
  {
    id: 'types',
    title: 'Types',
    options: ['generateUnionEnums', 'extractEnums', 'addReadonly', 'anotherArrayType', 'sortTypes'],
  },
  {
    id: 'extraction',
    title: 'Extraction',
    options: [
      'extractRequestParams',
      'extractRequestBody',
      'extractResponseBody',
      'extractResponseError',
      'generateResponses',
    ],
  },
  {
    id: 'routes',
    title: 'Routes',
    options: [
      'sortRoutes',
      'moduleNameFirstTag',
      'unwrapResponseData',
      'defaultResponseAsSuccess',
      'disableThrowOnError',
      'enumNamesAsValues',
    ],
  },
];

export type OptionKey = keyof FullOptions;

/** keys whose value differs from the default */
export function changedKeys(options: FullOptions): OptionKey[] {
  return (Object.keys(DEFAULT_OPTIONS) as OptionKey[]).filter((k) => {
    const value = options[k];
    const def = DEFAULT_OPTIONS[k];
    return typeof value === 'string' ? value.trim() !== def : value !== def;
  });
}

/** request payload: only the options that differ from the defaults */
export function toRequestOptions(options: FullOptions): PlaygroundOptions {
  const out: Record<string, unknown> = {};
  for (const key of changedKeys(options)) {
    const value = options[key];
    out[key] = typeof value === 'string' ? value.trim() : value;
  }
  return out as PlaygroundOptions;
}

/** merges an untrusted partial object (localStorage / query) over the defaults */
export function sanitizeOptions(input: unknown): FullOptions {
  const result: FullOptions = { ...DEFAULT_OPTIONS };
  if (!input || typeof input !== 'object') return result;
  const src = input as Record<string, unknown>;
  for (const key of BOOLEAN_OPTIONS) if (typeof src[key] === 'boolean') result[key] = src[key] as boolean;
  for (const key of STRING_OPTIONS) if (typeof src[key] === 'string') result[key] = (src[key] as string).slice(0, 100);
  if (HTTP_CLIENTS.includes(src.httpClientType as HttpClient)) result.httpClientType = src.httpClientType as HttpClient;
  const idx = Number(src.moduleNameIndex);
  if (Number.isInteger(idx) && idx >= 0 && idx <= 20) result.moduleNameIndex = idx;
  return result;
}

/* ---------------------------------------------------------------- URL query */

export function optionsToQuery(options: FullOptions, params = new URLSearchParams()): URLSearchParams {
  for (const key of changedKeys(options)) {
    const value = options[key];
    params.set(key, typeof value === 'boolean' ? (value ? '1' : '0') : String(value).trim());
  }
  return params;
}

export function optionsFromQuery(params: URLSearchParams): FullOptions | null {
  const out: Record<string, unknown> = {};
  let found = false;
  for (const key of BOOLEAN_OPTIONS) {
    const v = params.get(key);
    if (v !== null) {
      out[key] = v === '1' || v === 'true';
      found = true;
    }
  }
  for (const key of STRING_OPTIONS) {
    const v = params.get(key);
    if (v !== null) {
      out[key] = v;
      found = true;
    }
  }
  const client = params.get('httpClientType');
  if (client !== null) {
    out.httpClientType = client;
    found = true;
  }
  const idx = params.get('moduleNameIndex');
  if (idx !== null) {
    out.moduleNameIndex = Number(idx);
    found = true;
  }
  return found ? sanitizeOptions(out) : null;
}

/* ----------------------------------------------------------- config snippet */

const quote = (value: string) => `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

export function buildConfigFile(options: FullOptions, source: { url?: string }): string {
  const lines: string[] = [];
  lines.push(source.url ? `  url: ${quote(source.url)},` : `  input: './openapi.json', // or url: 'https://…'`);
  lines.push(`  output: './src/api',`);
  for (const key of changedKeys(options)) {
    const value = options[key];
    const printed = typeof value === 'string' ? quote(value.trim()) : String(value);
    lines.push(`  ${key}: ${printed},`);
  }
  return `import { defaultConfig } from 'swagger-typescript-api-es';\n\nexport default defaultConfig({\n${lines.join('\n')}\n});\n`;
}

const shellArg = (value: string) => (/^[\w./:@%+=,-]+$/.test(value) ? value : `'${value.replace(/'/g, `'\\''`)}'`);

export function buildCliCommand(options: FullOptions, source: { url?: string }): { command: string; configOnly: string[] } {
  const parts = ['npx swagger-typescript-api-es', `--u ${shellArg(source.url || './openapi.json')}`, '--o ./src/api'];
  const configOnly: string[] = [];
  for (const key of changedKeys(options)) {
    const meta = OPTION_META[key];
    const value = options[key];
    if (!meta.flag) {
      configOnly.push(key);
      continue;
    }
    if (typeof value === 'boolean') {
      if (meta.switch) {
        if (value) parts.push(meta.flag);
      } else {
        parts.push(`${meta.flag} ${meta.invert ? !value : value}`);
      }
    } else {
      parts.push(`${meta.flag} ${shellArg(String(value).trim())}`);
    }
  }
  const command = parts.length > 3 ? parts.join(' \\\n  ') : parts.join(' ');
  return { command, configOnly };
}
