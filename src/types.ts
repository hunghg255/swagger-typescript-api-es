export interface IOptions {
  input: string;
  output: string;
  name: string;
  url: string;
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
  prettier?: {
    // By default prettier config is load from your project
    printWidth?: number;
    tabWidth?: number;
    trailingComma?: 'all' | string;
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
  sortRouters?: boolean;
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
  prettierOptions?: Record<string, any>;
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

export interface GenerateTemplatesParams {
  cleanOutput: boolean;
  output: string;
  httpClientType: 'axios' | 'fetch';
  modular: boolean;
  silent: boolean;
  version: string;
  rewrite: boolean;
}
