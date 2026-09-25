import path from 'node:path';

import { cloneDeep, compact, join, map, merge, uniq } from 'lodash-es';
import type ts from 'typescript';

import { ComponentTypeNameResolver } from './component-type-name-resolver';
import * as CONSTANTS from './constants';
import type { CodeGenProcessOptions } from './types';
import type {
  DeepPartial,
  ExtraTemplate,
  ExtractingOptions,
  FileNames,
  Hooks,
  HttpClientType,
  OxfmtOptions,
  PrimitiveTypeStruct,
  RequestOptions,
  SchemaParsers,
  TemplateInfo,
  TemplatePaths,
  TemplatesToRender,
  TranslatorConstructor,
  TsConstructs,
} from './types/config';
import type { OpenAPIDocument, OpenAPIV3Document } from './types/openapi';
import type { SchemaComponent } from './types/parsed';
import { objectAssign } from './util/object-assign';

const TsKeyword: TsConstructs['Keyword'] = {
  Number: 'number',
  String: 'string',
  Boolean: 'boolean',
  Any: 'any',
  Void: 'void',
  Unknown: 'unknown',
  Null: 'null',
  Undefined: 'undefined',
  Object: 'object',
  File: 'File',
  Date: 'Date',
  Type: 'type',
  Enum: 'enum',
  Interface: 'interface',
  Array: 'Array',
  Record: 'Record',
  Intersection: '&',
  Union: '|',
};

const TsCodeGenKeyword: TsConstructs['CodeGenKeyword'] = {
  UtilRequiredKeys: 'UtilRequiredKeys',
};

/** changes applied with `CodeGenConfig.update` (deep-merged, `undefined` values are skipped) */
export type CodeGenConfigUpdate = {
  [K in keyof CodeGenConfig]?: CodeGenConfig[K] extends Map<unknown, unknown>
    ? CodeGenConfig[K]
    : DeepPartial<CodeGenConfig[K]>;
};

class CodeGenConfig {
  version = CONSTANTS.PROJECT_VERSION;
  /** CLI flag */
  templates = '';
  /** CLI flag */
  generateResponses = false;
  /** CLI flag */
  defaultResponseAsSuccess = false;
  /** CLI flag */
  generateRouteTypes = false;
  /** CLI flag */
  generateClient = true;
  /** CLI flag */
  generateUnionEnums = false;
  /** CLI flag */
  addReadonly = false;
  enumNamesAsValues = false;
  /** parsed swagger schema from getSwaggerObject() */

  /** parsed swagger schema ref */
  swaggerSchema: OpenAPIV3Document | null = null;
  /** original (converted to json) swagger schema ref */
  originalSchema: OpenAPIDocument | null = null;

  /** { "#/components/schemas/Foo": @TypeInfo, ... } */
  componentsMap: Record<string, SchemaComponent> = {};
  /** flag for catching convertion from swagger 2.0 */
  convertedFromSwagger2 = false;

  /** url index from paths used for merging into modules */
  moduleNameIndex = 0;

  /** use the first tag for the module name */
  moduleNameFirstTag = false;
  disableStrictSSL = false;
  disableProxy = false;
  extractRequestParams = false;
  extractRequestBody = false;
  extractResponseBody = false;
  extractResponseError = false;
  extractResponses = false;
  extractEnums = false;
  fileNames: FileNames = {
    dataContracts: 'data-contracts',
    routeTypes: 'route-types',
    httpClient: 'http-client',
    outOfModuleApi: 'Common',
  };

  /** `moduleName|routeName` -> number of routes with this name */
  routeNameDuplicatesMap = new Map<string, number>();
  /**
   * user formatter options, applied over `CONSTANTS.OXC_FORMAT_OPTIONS` and the project's
   * `.oxfmtrc.json` (see `CodeFormatter`)
   */
  oxfmtOptrions: OxfmtOptions = {};
  hooks: Hooks = {
    onPreBuildRoutePath: () => void 0,
    onBuildRoutePath: () => void 0,
    onInsertPathParam: () => void 0,
    onCreateComponent: (schema) => schema,
    onPreParseSchema: () => void 0,
    onParseSchema: (_originalSchema, parsedSchema) => parsedSchema,
    onCreateRoute: (routeData) => routeData,
    onInit: (config) => config,
    onPrepareConfig: (apiConfig) => apiConfig,
    onCreateRequestParams: () => {},
    onCreateRouteName: () => {},
    onFormatTypeName: () => {},
    onFormatRouteName: () => {},
  };

  defaultResponseType: string;
  singleHttpClient = false;
  httpClientType: HttpClientType = CONSTANTS.HTTP_CLIENT.FETCH;
  unwrapResponseData = false;
  disableThrowOnError = false;
  sortTypes = false;
  sortRoutes = false;
  templatePaths: TemplatePaths = {
    /** `templates/base` */
    base: '',
    /** `templates/default` */
    default: '',
    /** `templates/modular` */
    modular: '',
    /** usage path if `--templates` option is not set */
    original: '',
    /** custom path to templates (`--templates`) */
    custom: '',
  };

  /** Record<templateName, templateContent> */
  templatesToRender: TemplatesToRender = {
    api: '',
    dataContracts: '',
    dataContractJsDoc: '',
    interfaceDataContract: '',
    typeDataContract: '',
    enumDataContract: '',
    objectFieldJsDoc: '',
    httpClient: '',
    routeTypes: '',
    routeName: '',
  };

  /** custom schema parsers */
  schemaParsers: SchemaParsers = {};
  toJS = false;
  silent = false;
  typePrefix = '';
  typeSuffix = '';
  enumKeyPrefix = '';
  enumKeySuffix = '';
  patch = false;
  componentTypeNameResolver: ComponentTypeNameResolver;
  /** name of the main exported class */
  apiClassName = 'Api';
  debug = false;
  anotherArrayType = false;
  internalTemplateOptions = {
    addUtilRequiredKeysType: false,
  };

  extraTemplates: ExtraTemplate[] = [];
  input = '';
  modular = false;
  /** absolute output path, or `false` to only return generated files without writing them */
  output: string | false = '';
  url = '';
  cleanOutput = false;
  spec: OpenAPIDocument | null = null;
  fileName = 'Api.ts';
  authorizationToken: string | undefined = void 0;
  requestOptions: RequestOptions | null = null;

  jsPrimitiveTypes: string[] = [];
  jsEmptyTypes: string[] = [];
  fixInvalidTypeNamePrefix = 'Type';
  fixInvalidEnumKeyPrefix = 'Value';

  enumKeyResolverName = 'Value';
  typeNameResolverName = 'ComponentType';
  specificArgNameResolverName = 'arg';

  successResponseStatusRange: [number, number] = [200, 299];

  extractingOptions: ExtractingOptions = {
    requestBodySuffix: ['Payload', 'Body', 'Input'],
    requestParamsSuffix: ['Params'],
    responseBodySuffix: ['Data', 'Result', 'Output'],
    responseErrorSuffix: ['Error', 'Fail', 'Fails', 'ErrorData', 'HttpError', 'BadResponse'],
    enumSuffix: ['Enum'],
    discriminatorMappingSuffix: ['Mapping', 'Mapper', 'MapType'],
    discriminatorAbstractPrefix: ['Base', 'Abstract', 'Discriminator', 'Internal', 'Polymorph'],
  };

  compilerTsConfig: ts.CompilerOptions = {
    // `ts.ModuleKind.ESNext` (literal: `typescript` is only loaded when `toJS` is used)
    module: 99,
    noImplicitReturns: true,
    alwaysStrict: true,
    // `ts.ScriptTarget.ESNext`
    target: 99,
    declaration: true,
    noImplicitAny: false,
    sourceMap: false,
    removeComments: false,
    disableSizeLimit: true,
    esModuleInterop: true,
    emitDecoratorMetadata: true,
    skipLibCheck: true,
  };

  customTranslator?: TranslatorConstructor;

  /** `CONSTANTS` merged with the `constants` option (set in the constructor) */
  declare constants: typeof CONSTANTS & Record<string, unknown>;

  Ts: TsConstructs = {
    Keyword: cloneDeep(TsKeyword),
    CodeGenKeyword: cloneDeep(TsCodeGenKeyword),
    /**
     * $A[] or Array<$A>
     */
    ArrayType: (content) => {
      if (this.anotherArrayType) {
        return this.Ts.TypeWithGeneric(this.Ts.Keyword.Array, [content]);
      }

      return `${this.Ts.ExpressionGroup(content)}[]`;
    },
    /**
     * "$A"
     */
    StringValue: (content) => `"${content}"`,
    /**
     * $A
     */
    BooleanValue: (content) => `${content}`,
    /**
     * $A
     */
    NumberValue: (content) => `${content}`,
    /**
     * $A
     */
    NullValue: () => 'null',
    /**
     * $A1 | $A2
     */
    UnionType: (contents) => join(uniq(contents), ` ${this.Ts.Keyword.Union} `),
    /**
     * ($A1)
     */
    ExpressionGroup: (content) => (content ? `(${content})` : ''),
    /**
     * $A1 & $A2
     */
    IntersectionType: (contents) => join(uniq(contents), ` ${this.Ts.Keyword.Intersection} `),
    /**
     * Record<$A1, $A2>
     */
    RecordType: (key, value) => this.Ts.TypeWithGeneric(this.Ts.Keyword.Record, [key, value]),
    /**
     * readonly $key?:$value
     */
    TypeField: ({ readonly, key, optional, value }) =>
      compact([readonly && 'readonly ', key, optional && '?', ': ', value]).join(''),
    /**
     * [key: $A1]: $A2
     */
    InterfaceDynamicField: (key, value) => `[key: ${key}]: ${value}`,

    /**
     * EnumName.EnumKey
     */
    EnumUsageKey: (enumStruct, key) => `${enumStruct}.${key}`,
    /**
     * $A1 = $A2
     */
    EnumField: (key, value) => `${key} = ${value}`,
    /**
     * $A0.key = $A0.value,
     * $A1.key = $A1.value,
     * $AN.key = $AN.value,
     */
    EnumFieldsWrapper: (contents) =>
      map(contents, ({ key, value }) => `  ${this.Ts.EnumField(key, value)}`).join(',\n'),
    /**
     * {\n $A \n}
     */
    ObjectWrapper: (content) => `{\n${content}\n}`,
    /**
     * /** $A *\/
     */
    MultilineComment: (contents, formatFn) =>
      (contents.length === 1
        ? [`/** ${contents[0]} */`]
        : ['/**', ...contents.map((content) => ` * ${content}`), ' */']
      ).map((part) => `${formatFn ? formatFn(part) : part}\n`),
    /**
     * $A1<...$A2.join(,)>
     */
    TypeWithGeneric: (typeName, genericArgs) => {
      return `${typeName}${genericArgs.length > 0 ? `<${genericArgs.join(',')}>` : ''}`;
    },
    /**
     * [$A1, $A2, ...$AN]
     */
    Tuple: (values) => {
      return `[${values.join(', ')}]`;
    },
  };

  /**
   * swagger schema type -> typescript type
   * https://json-schema.org/understanding-json-schema/reference/string.html#dates-and-times
   */
  primitiveTypes: PrimitiveTypeStruct = {
    integer: () => this.Ts.Keyword.Number,
    number: () => this.Ts.Keyword.Number,
    boolean: () => this.Ts.Keyword.Boolean,
    object: () => this.Ts.Keyword.Object,
    file: () => this.Ts.Keyword.File,
    string: {
      $default: () => this.Ts.Keyword.String,

      /** formats */
      binary: () => this.Ts.Keyword.File,
      file: () => this.Ts.Keyword.File,
      'date-time': () => this.Ts.Keyword.String,
      time: () => this.Ts.Keyword.String,
      date: () => this.Ts.Keyword.String,
      duration: () => this.Ts.Keyword.String,
      email: () => this.Ts.Keyword.String,
      'idn-email': () => this.Ts.Keyword.String,
      'idn-hostname': () => this.Ts.Keyword.String,
      ipv4: () => this.Ts.Keyword.String,
      ipv6: () => this.Ts.Keyword.String,
      uuid: () => this.Ts.Keyword.String,
      uri: () => this.Ts.Keyword.String,
      'uri-reference': () => this.Ts.Keyword.String,
      'uri-template': () => this.Ts.Keyword.String,
      'json-pointer': () => this.Ts.Keyword.String,
      'relative-json-pointer': () => this.Ts.Keyword.String,
      regex: () => this.Ts.Keyword.String,
    },
  };

  templateInfos: TemplateInfo[] = [
    { name: 'api', fileName: 'api' },
    { name: 'dataContracts', fileName: 'data-contracts' },
    { name: 'dataContractJsDoc', fileName: 'data-contract-jsdoc' },
    { name: 'interfaceDataContract', fileName: 'interface-data-contract' },
    { name: 'typeDataContract', fileName: 'type-data-contract' },
    { name: 'enumDataContract', fileName: 'enum-data-contract' },
    { name: 'objectFieldJsDoc', fileName: 'object-field-jsdoc' },
    { name: 'httpClient', fileName: 'http-client' },
    { name: 'routeTypes', fileName: 'route-types' },
    { name: 'routeName', fileName: 'route-name' },
  ];

  templateExtensions = ['.eta', '.ejs'];

  constructor({
    oxfmtOptrions,
    codeGenConstructs,
    primitiveTypeConstructs,
    constants,
    templateInfos,
    hooks,
    output,
    ...otherConfig
  }: CodeGenProcessOptions) {
    objectAssign(this.Ts, codeGenConstructs);
    objectAssign(this.primitiveTypes, primitiveTypeConstructs);

    this.defaultResponseType = this.Ts.Keyword.Void;

    this.update({
      ...otherConfig,
      oxfmtOptrions,
      hooks: merge(this.hooks, hooks || {}),
      constants: {
        ...CONSTANTS,
        ...constants,
      },
      templateInfos: templateInfos || this.templateInfos,
      sortRoutes: otherConfig.sortRoutes ?? otherConfig.sortRouters,
      output: output === false ? false : path.resolve(process.cwd(), output || './'),
    });

    this.jsPrimitiveTypes = [
      this.Ts.Keyword.Number,
      this.Ts.Keyword.String,
      this.Ts.Keyword.Boolean,
    ];
    this.jsEmptyTypes = [this.Ts.Keyword.Null, this.Ts.Keyword.Undefined];
    this.componentTypeNameResolver = new ComponentTypeNameResolver(this, null, []);
  }

  update = (update: CodeGenConfigUpdate) => {
    objectAssign(this, update);
  };
}

export { CodeGenConfig };
