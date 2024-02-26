/* eslint-disable unicorn/no-null */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import path from 'node:path';

import { cosmiconfigSync } from 'cosmiconfig';
import cloneDeep from 'lodash/cloneDeep';
import compact from 'lodash/compact';
import join from 'lodash/join';
import map from 'lodash/map';
import merge from 'lodash/merge';
import uniq from 'lodash/uniq';
import ts from 'typescript';

import { ComponentTypeNameResolver } from './component-type-name-resolver';
import * as CONSTANTS from './constants';
import { IOptions } from './types';
import { objectAssign } from './util/object-assign';

const TsKeyword = {
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

const TsCodeGenKeyword = {
  UtilRequiredKeys: 'UtilRequiredKeys',
};

/**
 * @type {GenerateApiConfiguration["config"]}}
 */
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
  swaggerSchema = null;
  /** original (converted to json) swagger schema ref */
  originalSchema = null;

  /** { "#/components/schemas/Foo": @TypeInfo, ... } */
  componentsMap = {};
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
  fileNames = {
    dataContracts: 'data-contracts',
    routeTypes: 'route-types',
    httpClient: 'http-client',
    outOfModuleApi: 'Common',
  };

  routeNameDuplicatesMap = new Map();
  prettierOptions = { ...CONSTANTS.PRETTIER_OPTIONS };
  hooks = {
    onPreBuildRoutePath: (routePath: any) => void 0,
    onBuildRoutePath: (routeData: any) => void 0,
    onInsertPathParam: (pathParam: any) => void 0,
    onCreateComponent: (schema: any) => schema,
    onPreParseSchema: (originalSchema: any, typeName: any, schemaType: any) => void 0,
    onParseSchema: (originalSchema: any, parsedSchema: any) => parsedSchema,
    onCreateRoute: (routeData: any) => routeData,
    onInit: (config: any, codeGenProcess: any) => config,
    onPrepareConfig: (apiConfig: any) => apiConfig,
    onCreateRequestParams: (rawType: any) => {},
    onCreateRouteName: () => {},
    onFormatTypeName: (typeName: any, rawTypeName: any, schemaType: any) => {},
    onFormatRouteName: (routeInfo: any, templateRouteName: any) => {},
  };

  defaultResponseType;
  singleHttpClient = false;
  httpClientType = CONSTANTS.HTTP_CLIENT.FETCH;
  unwrapResponseData = false;
  disableThrowOnError = false;
  sortTypes = false;
  sortRoutes = false;
  templatePaths = {
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
  templatesToRender = {
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

  /**
   * @type {Record<string, (...args: any[]) => MonoSchemaParser>}
   */
  schemaParsers = {};
  toJS = false;
  silent = false;
  typePrefix = '';
  typeSuffix = '';
  enumKeyPrefix = '';
  enumKeySuffix = '';
  patch = false;
  /** @type {ComponentTypeNameResolver} */
  componentTypeNameResolver;
  /** name of the main exported class */
  apiClassName = 'Api';
  debug = false;
  anotherArrayType = false;
  internalTemplateOptions = {
    addUtilRequiredKeysType: false,
  };

  extraTemplates = [];
  input = '';
  modular = false;
  output = '';
  url = '';
  cleanOutput = false;
  spec = null;
  fileName = 'Api.ts';
  authorizationToken = void 0;
  requestOptions = null;

  jsPrimitiveTypes = [];
  jsEmptyTypes = [];
  fixInvalidTypeNamePrefix = 'Type';
  fixInvalidEnumKeyPrefix = 'Value';

  enumKeyResolverName = 'Value';
  typeNameResolverName = 'ComponentType';
  specificArgNameResolverName = 'arg';

  successResponseStatusRange = [200, 299];

  /** @type {ExtractingOptions} */
  extractingOptions = {
    requestBodySuffix: ['Payload', 'Body', 'Input'],
    requestParamsSuffix: ['Params'],
    responseBodySuffix: ['Data', 'Result', 'Output'],
    responseErrorSuffix: ['Error', 'Fail', 'Fails', 'ErrorData', 'HttpError', 'BadResponse'],
    enumSuffix: ['Enum'],
    discriminatorMappingSuffix: ['Mapping', 'Mapper', 'MapType'],
    discriminatorAbstractPrefix: ['Base', 'Abstract', 'Discriminator', 'Internal', 'Polymorph'],
  };

  compilerTsConfig = {
    module: 'ESNext',
    noImplicitReturns: true,
    alwaysStrict: true,
    target: ts.ScriptTarget.ESNext,
    declaration: true,
    noImplicitAny: false,
    sourceMap: false,
    removeComments: false,
    disableSizeLimit: true,
    esModuleInterop: true,
    emitDecoratorMetadata: true,
    skipLibCheck: true,
  };

  customTranslator: any;

  Ts = {
    Keyword: cloneDeep(TsKeyword),
    CodeGenKeyword: cloneDeep(TsCodeGenKeyword),
    /**
     * $A[] or Array<$A>
     */
    ArrayType: (content: any) => {
      if (this.anotherArrayType) {
        return this.Ts.TypeWithGeneric(this.Ts.Keyword.Array, [content]);
      }

      return `${this.Ts.ExpressionGroup(content)}[]`;
    },
    /**
     * "$A"
     */
    StringValue: (content: any) => `"${content}"`,
    /**
     * $A
     */
    BooleanValue: (content: any) => `${content}`,
    /**
     * $A
     */
    NumberValue: (content: any) => `${content}`,
    /**
     * $A
     */
    NullValue: (content: any) => 'null',
    /**
     * $A1 | $A2
     */
    UnionType: (contents: any) => join(uniq(contents), ` ${this.Ts.Keyword.Union} `),
    /**
     * ($A1)
     */
    ExpressionGroup: (content: any) => (content ? `(${content})` : ''),
    /**
     * $A1 & $A2
     */
    IntersectionType: (contents: any) => join(uniq(contents), ` ${this.Ts.Keyword.Intersection} `),
    /**
     * Record<$A1, $A2>
     */
    RecordType: (key: any, value: any) =>
      this.Ts.TypeWithGeneric(this.Ts.Keyword.Record, [key, value]),
    /**
     * readonly $key?:$value
     */
    TypeField: ({ readonly, key, optional, value }: any) =>
      compact([readonly && 'readonly ', key, optional && '?', ': ', value]).join(''),
    /**
     * [key: $A1]: $A2
     */
    InterfaceDynamicField: (key: any, value: any) => `[key: ${key}]: ${value}`,

    /**
     * EnumName.EnumKey
     */
    EnumUsageKey: (enumStruct: any, key: any) => `${enumStruct}.${key}`,
    /**
     * $A1 = $A2
     */
    EnumField: (key: any, value: any) => `${key} = ${value}`,
    /**
     * $A0.key = $A0.value,
     * $A1.key = $A1.value,
     * $AN.key = $AN.value,
     */
    EnumFieldsWrapper: (contents: any) =>
      map(contents, ({ key, value }) => `  ${this.Ts.EnumField(key, value)}`).join(',\n'),
    /**
     * {\n $A \n}
     */
    ObjectWrapper: (content: any) => `{\n${content}\n}`,
    /**
     * /** $A *\/
     */
    MultilineComment: (contents: any, formatFn: any) =>
      [
        ...(contents.length === 1
          ? [`/** ${contents[0]} */`]
          : ['/**', ...contents.map((content: any) => ` * ${content}`), ' */']),
      ].map((part) => `${formatFn ? formatFn(part) : part}\n`),
    /**
     * $A1<...$A2.join(,)>
     */
    TypeWithGeneric: (typeName: any, genericArgs: any) => {
      return `${typeName}${genericArgs.length > 0 ? `<${genericArgs.join(',')}>` : ''}`;
    },
    /**
     * [$A1, $A2, ...$AN]
     */
    Tuple: (values: any) => {
      return `[${values.join(', ')}]`;
    },
  };

  /**
   * swagger schema type -> typescript type
   * https://json-schema.org/understanding-json-schema/reference/string.html#dates-and-times
   * @type {Record<string, string | ((schema: any, parser: SchemaParser) => string) | ({ $default: string } & Record<string, string | ((schema: any, parser: SchemaParser) => string)>)>}
   */
  primitiveTypes = {
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

  templateInfos = [
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

  /**
   * @param config {Partial<GenerateApiConfiguration['config']>}
   */
  constructor({
    prettierOptions = getDefaultPrettierOptions(),
    codeGenConstructs,
    primitiveTypeConstructs,
    constants,
    templateInfos,
    hooks,
    output,
    ...otherConfig
  }: IOptions) {
    objectAssign(this.Ts, codeGenConstructs);
    objectAssign(this.primitiveTypes, primitiveTypeConstructs);

    this.defaultResponseType = this.Ts.Keyword.Void;

    this.update({
      ...otherConfig,
      prettierOptions:
        prettierOptions === undefined ? getDefaultPrettierOptions() : prettierOptions,
      hooks: merge(this.hooks, hooks || {}),
      constants: {
        ...CONSTANTS,
        ...constants,
      },
      templateInfos: templateInfos || this.templateInfos,
      output: path.resolve(process.cwd(), output),
    });

    this.jsPrimitiveTypes = [
      this.Ts.Keyword.Number,
      this.Ts.Keyword.String,
      this.Ts.Keyword.Boolean,
    ] as any;
    this.jsEmptyTypes = [this.Ts.Keyword.Null, this.Ts.Keyword.Undefined] as any;
    this.componentTypeNameResolver = new ComponentTypeNameResolver(this, null, []);
  }

  /**
   *
   * @param update {Partial<GenerateApiConfiguration["config"]>}
   */
  update = (update: any) => {
    objectAssign(this, update);
  };
}

const getDefaultPrettierOptions = () => {
  const prettier = cosmiconfigSync('prettier').search();

  if (prettier) {
    return {
      ...prettier.config,
      parser: 'typescript',
    };
  }

  return { ...CONSTANTS.PRETTIER_OPTIONS };
};

export { CodeGenConfig };
