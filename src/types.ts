import type { CodeGenProcess } from './code-gen-process';
import type { CodeGenConfig } from './configuration';
import type { TemplatesWorker } from './templates-worker';
import type {
  ExtraTemplate,
  ExtractingOptions,
  FileNames,
  GenerateApiConfiguration,
  GeneratedFile,
  Hooks,
  HttpClientType,
  OxfmtOptions,
  PrimitiveTypeStruct,
  RequestOptions,
  SchemaParsers,
  TemplateInfo,
  TranslatorConstructor,
  TsConstructs,
  TsConstructsOverrides,
} from './types/config';
import type { OpenAPIDocument } from './types/openapi';
import type { FileSystem } from './util/file-system';

export type * from './types/config';
export type * from './types/openapi';
export type * from './types/parsed';

/** a value, or a function receiving the current value and returning changes to deep-merge into it */
export type ConstructsUpdater<T, TUpdate = T> = TUpdate | ((constructs: T) => TUpdate);

export interface IOptions {
  /**
   *  name of output typescript api file (default: "Api.ts")
   */
  name?: string;
  /**
   * output path of typescript api file (default: "./").
   * `false` - don't write files, only return them from `generateApi`
   */
  output?: string | false;
  /**
   * path/url to swagger scheme
   */
  url?: string;
  /** path to a local swagger scheme file */
  input?: string;
  /** swagger scheme object (OpenAPI 3.x or Swagger 2.0 document) already in memory */
  spec?: OpenAPIDocument;
  /** path to folder containing templates */
  templates?: string;
  httpClientType?: HttpClientType;
  defaultResponseAsSuccess?: boolean;
  generateClient?: boolean;
  generateRouteTypes?: boolean;
  generateResponses?: boolean;
  toJS?: boolean;
  extractRequestParams?: boolean;
  extractRequestBody?: boolean;
  extractEnums?: boolean;
  unwrapResponseData?: boolean;
  /**
   * oxfmt options for the generated code.
   * Applied over the built-in defaults and the `.oxfmtrc.json` of your project (cwd), if any.
   */
  oxfmtOptrions?: OxfmtOptions;
  singleHttpClient?: boolean;
  cleanOutput?: boolean;
  enumNamesAsValues?: boolean;
  moduleNameFirstTag?: boolean;
  generateUnionEnums?: boolean;
  typePrefix?: string;
  typeSuffix?: string;
  enumKeyPrefix?: string;
  enumKeySuffix?: string;
  addReadonly?: boolean;
  sortTypes?: boolean;
  sortRoutes?: boolean;
  /** @deprecated use `sortRoutes` */
  sortRouters?: boolean;
  modular?: boolean;
  silent?: boolean;
  debug?: boolean;
  patch?: boolean;
  apiClassName?: string;
  moduleNameIndex?: number;
  extractResponseBody?: boolean;
  extractResponseError?: boolean;
  /** extract `#/components/responses/*` into data contracts */
  extractResponses?: boolean;
  disableThrowOnError?: boolean;
  /** default type for empty response schema (default: "void") */
  defaultResponseType?: string;
  disableStrictSSL?: boolean;
  disableProxy?: boolean;
  authorizationToken?: string;
  /**
   * extra `fetch` options used to download the schema from `url`.
   * `timeout` - request timeout in ms (default: 60000)
   */
  requestOptions?: RequestOptions;
  /** suffixes/prefixes (and custom resolvers) for names of extracted types */
  extractingOptions?: Partial<ExtractingOptions>;

  /** allow to generate extra files based with this extra templates */
  extraTemplates?: ExtraTemplate[];
  anotherArrayType?: boolean;
  fixInvalidTypeNamePrefix?: string;
  fixInvalidEnumKeyPrefix?: string;
  /** extra constants available in templates as `config.constants` */
  constants?: Record<string, unknown>;
  /** templates to render (`[{ name: "api", fileName: "api" }, ...]`) */
  templateInfos?: TemplateInfo[];
  /** changes deep-merged into `config.Ts` */
  codeGenConstructs?: ConstructsUpdater<TsConstructs, TsConstructsOverrides>;
  /** changes deep-merged into `config.primitiveTypes` */
  primitiveTypeConstructs?: ConstructsUpdater<PrimitiveTypeStruct, Partial<PrimitiveTypeStruct>>;
  /** custom schema parsers (classes extending `MonoSchemaParser`) */
  schemaParsers?: SchemaParsers;
  /** translator of the generated TS code (a class extending `Translator`) */
  customTranslator?: TranslatorConstructor;
  /** names of the files generated with `modular` */
  fileNames?: Partial<FileNames>;
  /** range of successful response status codes (default: `[200, 299]`) */
  successResponseStatusRange?: [number, number];
  /** prefix of fallback type names (default: "ComponentType") */
  typeNameResolverName?: string;
  /** prefix of fallback enum keys (default: "Value") */
  enumKeyResolverName?: string;
  /** prefix of fallback argument names (default: "arg") */
  specificArgNameResolverName?: string;
  hooks?: Partial<Hooks>;
}

/** options of the code generation process (`name` is renamed to `fileName`) */
export interface CodeGenProcessOptions extends Omit<IOptions, 'name'> {
  fileName?: string;
}

export interface GenerateApiOutput {
  /** generated files (also returned when `output: false`) */
  files: GeneratedFile[];
  /** data passed to the templates */
  configuration: GenerateApiConfiguration;
  getTemplate: TemplatesWorker['getTemplate'];
  renderTemplate: TemplatesWorker['renderTemplate'];
  createFile: FileSystem['createFile'];
  formatTSContent: (code: string) => Promise<string>;
}

/** configuration of the code generation process (`hooks.onInit`, `config` in templates) */
export type GenerateApiConfig = CodeGenConfig;

/** the code generation process (second argument of `hooks.onInit`) */
export type GenerateApiProcess = CodeGenProcess;

export interface GenerateTemplatesParams {
  cleanOutput?: boolean;
  /** output directory for the source templates */
  output?: string;
  httpClientType?: HttpClientType;
  modular?: boolean;
  silent?: boolean;
  version?: string;
  /** rewrite templates that already exist in `output` */
  rewrite?: boolean;
}
