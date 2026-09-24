/**
 * Contract between the playground UI and `POST /api/generate`.
 * Only plain-data options are accepted (no hooks / templates / functions).
 */

export const HTTP_CLIENTS = ['fetch', 'axios'] as const;
export type HttpClient = (typeof HTTP_CLIENTS)[number];

/** boolean options exposed in the playground (all map 1:1 to `IOptions`) */
export const BOOLEAN_OPTIONS = [
  'modular',
  'generateClient',
  'generateRouteTypes',
  'generateResponses',
  'generateUnionEnums',
  'extractRequestParams',
  'extractRequestBody',
  'extractResponseBody',
  'extractResponseError',
  'extractEnums',
  'unwrapResponseData',
  'singleHttpClient',
  'addReadonly',
  'anotherArrayType',
  'sortTypes',
  'sortRoutes',
  'defaultResponseAsSuccess',
  'disableThrowOnError',
  'moduleNameFirstTag',
  'enumNamesAsValues',
  'toJS',
] as const;
export type BooleanOption = (typeof BOOLEAN_OPTIONS)[number];

/** string options exposed in the playground */
export const STRING_OPTIONS = [
  'name',
  'apiClassName',
  'typePrefix',
  'typeSuffix',
  'enumKeyPrefix',
  'enumKeySuffix',
  'defaultResponseType',
] as const;
export type StringOption = (typeof STRING_OPTIONS)[number];

export type PlaygroundOptions = Partial<Record<BooleanOption, boolean>> &
  Partial<Record<StringOption, string>> & {
    httpClientType?: HttpClient;
    moduleNameIndex?: number;
  };

export interface GenerateRequest {
  /** schema as text (JSON or YAML); exactly one of `spec` / `url` */
  spec?: string;
  /** public http(s) URL of the schema */
  url?: string;
  options?: PlaygroundOptions;
}

export interface GeneratedFileDto {
  /** file name with extension, e.g. `Api.ts`, `data-contracts.ts` */
  name: string;
  content: string;
}

export interface GenerateSuccess {
  ok: true;
  files: GeneratedFileDto[];
  /** generation time in ms */
  durationMs: number;
}

export interface GenerateFailure {
  ok: false;
  /** user facing error message */
  error: string;
}

export type GenerateResponse = GenerateSuccess | GenerateFailure;

/** limits shared by the server and the UI */
export const MAX_SPEC_BYTES = 3 * 1024 * 1024;
