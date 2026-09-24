/**
 * Types of the generator configuration (`CodeGenConfig`), hooks, TS code constructs and template data.
 */
import type { FormatConfig } from 'oxfmt';
import type { RequestInit } from 'undici';

import type { CodeGenProcess } from '../code-gen-process';
import type { CodeGenConfig } from '../configuration';
import type { SchemaComponentsMap } from '../schema-components-map';
import type { MonoSchemaParser } from '../schema-parser/mono-schema-parser';
import type { SchemaFormatters } from '../schema-parser/schema-formatters';
import type { SchemaParser } from '../schema-parser/schema-parser';
import type { SchemaParserFabric } from '../schema-parser/schema-parser-fabric';
import type { SchemaUtils } from '../schema-parser/schema-utils';
import type { Translator } from '../translators/translator';
import type { TypeNameFormatter } from '../type-name-formatter';
import type { NameResolver } from '../util/name-resolver';
import type {
  ExternalDocumentationObject,
  InfoObject,
  SchemaObject,
  ServerObject,
  TagObject,
} from './openapi';
import type {
  BaseSchemaType,
  BuildRoutePathResult,
  EnumFieldContent,
  GroupedRoutes,
  ModelType,
  ParsedRoute,
  ParsedSchema,
  RawRouteInfo,
  RouteNameInfo,
  RouteNameParam,
  SchemaComponent,
} from './parsed';

/** recursively optional (functions and arrays are kept as is) */
export type DeepPartial<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends readonly unknown[]
    ? T
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : T;

export type HttpClientType = 'fetch' | 'axios';

/** generated file (also the input/output of translators) */
export interface GeneratedFile {
  fileName: string;
  fileExtension: string;
  fileContent: string;
}

/** input / output of `Translator.translate` */
export type TranslatorIO = GeneratedFile;

/** constructor of a custom translator (`customTranslator` option) */
export type TranslatorConstructor = new (codeGenProcess: CodeGenProcess) => Translator;

/** `{ name: "endpoints.ts", path: "./tpl/endpoints.ejs" }` */
export interface ExtraTemplate {
  /** output file name */
  name: string;
  /** path to the template file */
  path: string;
}

/** `{ name: "api", fileName: "api" }` - template name and its file name (without extension) */
export interface TemplateInfo {
  name: string;
  fileName: string;
}

/** Record<templateName, templateContent> */
export interface TemplatesToRender {
  api: string;
  dataContracts: string;
  dataContractJsDoc: string;
  interfaceDataContract: string;
  typeDataContract: string;
  enumDataContract: string;
  objectFieldJsDoc: string;
  httpClient: string;
  routeTypes: string;
  routeName: string;
  /** templates added with the `templateInfos` option (`null` / `undefined` when not found) */
  [templateName: string]: string | null | undefined;
}

export type TemplatePaths = {
  /** `templates/base` */
  base: string;
  /** `templates/default` */
  default: string;
  /** `templates/modular` */
  modular: string;
  /** usage path if `--templates` option is not set */
  original: string;
  /** custom path to templates (`--templates`) */
  custom: string | null;
};

export interface FileNames {
  dataContracts: string;
  routeTypes: string;
  httpClient: string;
  outOfModuleApi: string;
}

/**
 * Custom name resolver of an extracted type.
 * Called until it returns a name which is not reserved yet, `undefined` gives up.
 */
export type ExtractingNameResolver = (
  typeName: string,
  reservedNames: string[]
) => string | undefined;

export interface ExtractingOptions {
  requestBodySuffix: string[];
  requestParamsSuffix: string[];
  responseBodySuffix: string[];
  responseErrorSuffix: string[];
  enumSuffix: string[];
  discriminatorMappingSuffix: string[];
  discriminatorAbstractPrefix: string[];
  requestBodyNameResolver?: ExtractingNameResolver;
  requestParamsNameResolver?: ExtractingNameResolver;
  responseBodyNameResolver?: ExtractingNameResolver;
  responseErrorNameResolver?: ExtractingNameResolver;
  enumNameResolver?: ExtractingNameResolver;
  discriminatorMappingNameResolver?: ExtractingNameResolver;
  discriminatorAbstractResolver?: ExtractingNameResolver;
}

// #region TS constructs (`config.Ts`, `codeGenConstructs` option)

export interface TsKeywords {
  Number: string;
  String: string;
  Boolean: string;
  Any: string;
  Void: string;
  Unknown: string;
  Null: string;
  Undefined: string;
  Object: string;
  File: string;
  Date: string;
  Type: string;
  Enum: string;
  Interface: string;
  Array: string;
  Record: string;
  Intersection: string;
  Union: string;
}

export interface TsCodeGenKeywords {
  UtilRequiredKeys: string;
}

export interface TsTypeFieldParams {
  readonly?: boolean;
  key: string;
  optional?: boolean;
  value: string;
}

/** helpers used to build TS code (`config.Ts`, `utils.Ts` in templates) */
export interface TsConstructs {
  Keyword: TsKeywords;
  CodeGenKeyword: TsCodeGenKeywords;
  /** `$A[]` or `Array<$A>` */
  ArrayType: (content: string) => string;
  /** `"$A"` */
  StringValue: (content: unknown) => string;
  /** `$A` */
  BooleanValue: (content: unknown) => string;
  /** `$A` */
  NumberValue: (content: unknown) => string;
  /** `null` */
  NullValue: (content?: unknown) => string;
  /** `$A1 | $A2` */
  UnionType: (contents: string[]) => string;
  /** `($A1)` */
  ExpressionGroup: (content: string | null | undefined) => string;
  /** `$A1 & $A2` */
  IntersectionType: (contents: string[]) => string;
  /** `Record<$A1, $A2>` */
  RecordType: (key: string, value: string) => string;
  /** `readonly $key?: $value` */
  TypeField: (field: TsTypeFieldParams) => string;
  /** `[key: $A1]: $A2` */
  InterfaceDynamicField: (key: string, value: string) => string;
  /** `EnumName.EnumKey` */
  EnumUsageKey: (enumStruct: string, key: string) => string;
  /** `$A1 = $A2` */
  EnumField: (key: string, value: string) => string;
  /** `$A0.key = $A0.value, $A1.key = $A1.value` */
  EnumFieldsWrapper: (contents: Pick<EnumFieldContent, 'key' | 'value'>[]) => string;
  /** `{\n $A \n}` */
  ObjectWrapper: (content: string) => string;
  /** `/** $A *\/` (one line per item) */
  MultilineComment: (contents: string[], formatFn?: (line: string) => string) => string[];
  /** `$A1<...$A2.join(,)>` */
  TypeWithGeneric: (typeName: string, genericArgs: string[]) => string;
  /** `[$A1, $A2, ...$AN]` */
  Tuple: (values: string[]) => string;
}

/** result of the `codeGenConstructs` option (deep-merged into `config.Ts`) */
export type TsConstructsOverrides = DeepPartial<TsConstructs>;

// #endregion

// #region primitive types (`config.primitiveTypes`, `primitiveTypeConstructs` option)

/** TS type, or a function returning it */
export type PrimitiveTypeStructValue =
  | string
  | ((schema: SchemaObject, schemaUtils: SchemaUtils) => string);

/** `{ $default: ..., "date-time": ..., binary: ... }` (keyed by `format`) */
export interface PrimitiveTypeFormats {
  $default?: PrimitiveTypeStructValue;
  [format: string]: PrimitiveTypeStructValue | undefined;
}

/** swagger schema type (`integer`, `string`, ...) -> TS type */
export type PrimitiveTypeStruct = Record<string, PrimitiveTypeStructValue | PrimitiveTypeFormats>;

// #endregion

// #region schema parsers (`config.schemaParsers`)

export type SchemaParserName =
  | 'complexOneOf'
  | 'complexAllOf'
  | 'complexAnyOf'
  | 'complexNot'
  | 'enum'
  | 'object'
  | 'complex'
  | 'primitive'
  | 'discriminator'
  | 'array';

/** path of type names used to build names of extracted types (`MonoSchemaParser.schemaPath`) */
export type SchemaPath = (string | null | undefined)[];

/**
 * a class extending `MonoSchemaParser`
 * @template TResult result of `parse()`
 * @template TSchema schema passed to the parser
 */
export type SchemaParserConstructor<
  TResult = ParsedSchema | string,
  TSchema extends SchemaObject | null = SchemaObject,
> = new (
  schemaParser: SchemaParser,
  schema: TSchema,
  typeName?: string | null,
  schemaPath?: SchemaPath
) => MonoSchemaParser<TResult, TSchema>;

/**
 * Custom schema parsers.
 * Complex parsers (`allOf`, `oneOf`, ...) return the inline type (string),
 * base parsers return a parsed schema (the primitive parser also gets `null` for a missing schema).
 */
export interface SchemaParsers {
  complexOneOf?: SchemaParserConstructor<string>;
  complexAllOf?: SchemaParserConstructor<string>;
  complexAnyOf?: SchemaParserConstructor<string>;
  complexNot?: SchemaParserConstructor<string>;
  enum?: SchemaParserConstructor<ParsedSchema>;
  object?: SchemaParserConstructor<ParsedSchema>;
  complex?: SchemaParserConstructor<ParsedSchema>;
  primitive?: SchemaParserConstructor<ParsedSchema, SchemaObject | null>;
  discriminator?: SchemaParserConstructor<ParsedSchema>;
  array?: SchemaParserConstructor<ParsedSchema>;
}

// #endregion

/** `"type-name"` (type names) or `"enum-key"` (enum keys) */
export type FormattingSchemaType = 'enum-key' | 'type-name';

/**
 * Hooks. Returning `undefined` (or nothing) keeps the original value.
 */
export interface Hooks {
  /** rewrites the raw path before its params are parsed */
  onPreBuildRoutePath: (routePath: string) => string | void;
  /** replaces the parsed route path */
  onBuildRoutePath: (routeData: BuildRoutePathResult) => BuildRoutePathResult | void;
  /** expression inserted into `${...}` of the path template */
  onInsertPathParam: (
    paramName: string,
    index: number,
    pathParams: RouteNameParam[],
    route: string
  ) => string | void;
  /** replaces a `#/components/*` entry */
  onCreateComponent: (component: SchemaComponent) => SchemaComponent | void;
  /** result is deep-merged into the schema before it is parsed */
  onPreParseSchema: (
    originalSchema: SchemaObject,
    typeName: string | null,
    schemaType: BaseSchemaType
  ) => SchemaObject | void;
  /** replaces the parsed schema */
  onParseSchema: (originalSchema: SchemaObject, parsedSchema: ParsedSchema) => ParsedSchema | void;
  /** replaces the route, `false` skips it */
  onCreateRoute: (routeData: ParsedRoute) => ParsedRoute | false | void;
  /** changes applied to the configuration (runs after the schema is loaded) */
  onInit: (configuration: CodeGenConfig, codeGenProcess: CodeGenProcess) => CodeGenConfig | void;
  /** replaces the data passed to the templates */
  onPrepareConfig: (
    currentConfiguration: GenerateApiConfiguration
  ) => GenerateApiConfiguration | void;
  /** replaces the schema of the request params object */
  onCreateRequestParams: (rawType: SchemaObject) => SchemaObject | SchemaComponent | void;
  /** replaces `{ usage, original, duplicate }` */
  onCreateRouteName: (
    routeNameInfo: RouteNameInfo,
    rawRouteInfo: RawRouteInfo
  ) => RouteNameInfo | void;
  /** new type name */
  onFormatTypeName: (
    typeName: string,
    rawTypeName: string,
    schemaType: FormattingSchemaType
  ) => string | void;
  /** new route (method) name */
  onFormatRouteName: (routeInfo: RawRouteInfo, templateRouteName: string) => string | void;
}

/** `oxfmtOptrions` option */
export type OxfmtOptions = FormatConfig & {
  /** @deprecated ignored, the parser is inferred from the file extension */
  parser?: 'typescript' | (string & {});
};

/**
 * extra `fetch` options used to download the schema from `url`.
 * `timeout` - request timeout in ms (default: 60000, `0` disables it)
 */
export type RequestOptions = RequestInit & {
  timeout?: number;
  /** @deprecated not supported anymore, use an undici `dispatcher` */
  agent?: unknown;
  [option: string]: unknown;
};

/** `apiConfig` template data (`CodeGenProcess.createApiConfig`) */
export interface ApiConfig {
  info: InfoObject;
  servers: ServerObject[];
  basePath?: string;
  host?: string;
  externalDocs: ExternalDocumentationObject & { description: string };
  tags: TagObject[];
  baseUrl: string;
  title: string;
  version?: string;
}

/** lodash functions available in templates as `utils._` */
export type TemplateLodashUtils = Record<
  | 'compact'
  | 'merge'
  | 'each'
  | 'isEmpty'
  | 'sortByProperty'
  | 'noop'
  | 'isObject'
  | 'isString'
  | 'isUndefined'
  | 'map'
  | 'uniq'
  | 'size'
  | 'replace'
  | 'camelCase'
  | 'lowerCase'
  | 'values'
  | 'join'
  | 'get'
  | 'upperCase'
  | 'sortBy',
  // lodash functions (their types come from `@types/lodash`, which is not a dependency)
  (...args: never[]) => unknown
>;

/** `utils` template data */
export interface RenderTemplateUtils {
  Ts: TsConstructs;
  formatDescription: SchemaFormatters['formatDescription'];
  escapeJSDocContent: SchemaFormatters['escapeJSDocContent'];
  internalCase: (value: string | undefined) => string;
  classNameCase: (value: string | undefined) => string;
  pascalCase: (value: string | undefined) => string;
  getInlineParseContent: SchemaParserFabric['getInlineParseContent'];
  getParseContent: SchemaParserFabric['getParseContent'];
  getComponentByRef: SchemaComponentsMap['get'];
  parseSchema: SchemaParserFabric['parseSchema'];
  checkAndAddNull: SchemaUtils['safeAddNullToType'];
  safeAddNullToType: SchemaUtils['safeAddNullToType'];
  isNeedToAddNull: SchemaUtils['isNullMissingInType'];
  inlineExtraFormatters: SchemaFormatters['inline'];
  formatters: SchemaFormatters['base'];
  formatModelName: TypeNameFormatter['format'];
  fmtToJSDocLine: (line: string, options: { eol?: boolean }) => string;
  NameResolver: typeof NameResolver;
  _: TemplateLodashUtils;
  /** `require` resolving paths from the templates folder and packages from the project */
  require: (packageOrPath: string) => unknown;
}

/** base template data (`CodeGenProcess.getRenderTemplateData`) */
export interface RenderTemplateData {
  utils: RenderTemplateUtils;
  config: CodeGenConfig;
}

/** data passed to the templates (`it`), argument/result of `hooks.onPrepareConfig` */
export interface GenerateApiConfiguration {
  apiConfig: ApiConfig;
  config: CodeGenConfig;
  modelTypes: ModelType[];
  hasSecurityRoutes: boolean;
  hasQueryRoutes: boolean;
  hasFormDataRoutes: boolean;
  generateResponses: boolean;
  routes: GroupedRoutes;
  extraTemplates: ExtraTemplate[];
  fileName: string;
  translateToJavaScript: boolean;
  customTranslator: Translator | null;
  utils: RenderTemplateUtils;
}
