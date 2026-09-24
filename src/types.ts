import type { FormatConfig } from 'oxfmt';

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

  input?: string;
  spec?: {
    swagger?: '2.0' | '3.0';
    info?: {
      version?: string;
      title?: string;
    };
  };
  templates?: string;
  httpClientType?: 'axios' | 'fetch'; // or "fetch"
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
  oxfmtOptrions?: FormatConfig & {
    /** @deprecated ignored, the parser is inferred from the file extension */
    parser?: 'typescript' | string;
  };
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
  requestOptions?: Record<string, any> & { timeout?: number };
  extractingOptions?: {
    requestBodySuffix?: string[];
    requestParamsSuffix?: string[];
    responseBodySuffix?: string[];
    responseErrorSuffix?: string[];
  };

  /** allow to generate extra files based with this extra templates, see more below */
  extraTemplates?: [];
  anotherArrayType?: boolean;
  fixInvalidTypeNamePrefix?: string;
  fixInvalidEnumKeyPrefix?: string;
  constants?: Record<string, any>;
  templateInfos?: any;
  codeGenConstructs?: (constructs: any) => Record<string, any>;
  primitiveTypeConstructs?: (constructs: any) => Record<string, any>;
  hooks?: {
    onCreateComponent?: (component: any) => void;
    onCreateRequestParams?: (rawType: any) => void;
    onCreateRoute?: (routeData: any) => void;
    onCreateRouteName?: (routeNameInfo: any, rawRouteInfo: any) => void;
    onFormatRouteName?: (routeInfo: any, templateRouteName: any) => void;
    onFormatTypeName?: (typeName: any, rawTypeName: any, schemaType: any) => void;
    onInit?: (configuration: any) => void;
    onPreParseSchema?: (originalSchema: any, typeName: any, schemaType: any) => void;
    onParseSchema?: (originalSchema: any, parsedSchema: any) => void;
    onPrepareConfig?: (currentConfiguration: any) => void;
  };
}

export interface GeneratedFile {
  fileName: string;
  fileExtension: string;
  fileContent: string;
}

export interface GenerateApiOutput {
  /** generated files (also returned when `output: false`) */
  files: GeneratedFile[];
  configuration: Record<string, any>;
  getTemplate: (...args: any[]) => any;
  renderTemplate: (...args: any[]) => any;
  createFile: (params: {
    path: string;
    fileName: string;
    content: string;
    withPrefix?: boolean;
  }) => void;
  formatTSContent: (code: string) => Promise<string>;
}

export interface GenerateTemplatesParams {
  cleanOutput?: boolean;
  /** output directory for the source templates */
  output?: string;
  httpClientType?: 'axios' | 'fetch';
  modular?: boolean;
  silent?: boolean;
  version?: string;
  /** rewrite templates that already exist in `output` */
  rewrite?: boolean;
}
