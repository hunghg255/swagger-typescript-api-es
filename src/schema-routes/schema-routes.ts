import {
  assign,
  camelCase,
  compact,
  concat,
  each,
  endsWith,
  entries,
  find,
  flatMap,
  forEach,
  includes,
  isEqual,
  isNaN,
  isObject,
  keys,
  map,
  omit,
  reduce,
  replace,
  slice,
  some,
  split,
  startsWith,
  uniq,
  values,
} from 'lodash-es';

import type { CodeGenConfig } from '../configuration';
import {
  DEFAULT_BODY_ARG_NAME,
  RESERVED_BODY_ARG_NAMES,
  RESERVED_HEADER_ARG_NAMES,
  RESERVED_PATH_ARG_NAMES,
  RESERVED_QUERY_ARG_NAMES,
  SCHEMA_TYPES,
} from '../constants';
import type { SchemaComponentsMap } from '../schema-components-map';
import type { SchemaParserFabric } from '../schema-parser/schema-parser-fabric';
import type { SchemaUtils } from '../schema-parser/schema-utils';
import type { TemplatesWorker } from '../templates-worker';
import type { TypeNameFormatter } from '../type-name-formatter';
import type {
  ContentObject,
  HeaderObject,
  HttpMethod,
  MaybeRef,
  OpenAPIV3Document,
  OperationObject,
  ParameterLocation,
  ParameterObject,
  PathItemObject,
  ResponseObject,
  ResponsesObject,
  SchemaObject,
} from '../types/openapi';
import type {
  BuildRoutePathResult,
  ContentKind,
  GroupedRoutes,
  ModuleRoutes,
  ParsedRoute,
  ParsedSchema,
  PathArg,
  RawRouteInfo,
  RequestBodyInfo,
  ResponseBodyInfo,
  ResponseInfo,
  RouteNameInfo,
  RouteNameParam,
  RouteParam,
  RouteParams,
  SchemaComponent,
  SpecificArgs,
} from '../types/parsed';
import { generateId } from '../util/id';
import type { Logger } from '../util/logger';
import { isOperationObject, isRecord } from '../util/type-guards';
import { SpecificArgNameResolver } from './util/specific-arg-name-resolver';

const CONTENT_KIND = {
  JSON: 'JSON',
  URL_ENCODED: 'URL_ENCODED',
  FORM_DATA: 'FORM_DATA',
  IMAGE: 'IMAGE',
  OTHER: 'OTHER',
  TEXT: 'TEXT',
} as const satisfies Record<ContentKind, ContentKind>;

/** config fields used by `SchemaRoutes` */
export type SchemaRoutesConfig = Pick<
  CodeGenConfig,
  | 'hooks'
  | 'Ts'
  | 'defaultResponseAsSuccess'
  | 'successResponseStatusRange'
  | 'defaultResponseType'
  | 'extractRequestBody'
  | 'extractRequestParams'
  | 'extractResponseBody'
  | 'extractResponseError'
  | 'extractingOptions'
  | 'routeNameDuplicatesMap'
  | 'templatesToRender'
  | 'moduleNameIndex'
  | 'moduleNameFirstTag'
  | 'sortRoutes'
  | 'specificArgNameResolverName'
>;

/** instances used by `SchemaRoutes` (a `CodeGenProcess`) */
export interface SchemaRoutesDeps {
  config: SchemaRoutesConfig;
  schemaParserFabric: SchemaParserFabric;
  schemaComponentsMap: SchemaComponentsMap;
  logger: Pick<Logger, 'warn' | 'debug'>;
  templatesWorker: Pick<TemplatesWorker, 'renderTemplate'>;
  typeNameFormatter: Pick<TypeNameFormatter, 'format'>;
}

/** an object which can have a `content` map (request body, response, parameter or a `$ref` to them) */
interface ContentHolder {
  $ref?: string;
  content?: ContentObject;
}

/** a request/response (`ContentHolder`) or a component value resolved from a `$ref` */
type RequestInfoLike = ContentHolder | SchemaComponent['rawTypeData'] | null | undefined;

/** param schema with its location (`{ ...schema, in: "path" }`) */
type LocatedSchemaObject = SchemaObject & { in: ParameterLocation };

/** `value` is a (resolved) parameter object with a location (`in`) */
const isParameterObject = (value: unknown): value is ParameterObject =>
  isRecord(value) && !!value.in;

/** `value` is an object with a `schema` (e.g. an OpenAPI 3 header object) */
const hasSchema = (value: unknown): value is { schema: SchemaObject } =>
  isRecord(value) && !!value.schema;

/** `content` of a request body / response (the structure of the document is trusted) */
const getContentObject = (value: unknown): ContentObject | null => {
  if (!isRecord(value)) {
    return null;
  }
  const { content } = value;
  return isContentObject(content) ? content : null;
};

const isContentObject = (value: unknown): value is ContentObject => isRecord(value);

/** a component created by the generator (e.g. an extracted response body) */
const isSchemaComponent = (value: ResponseInfo | SchemaComponent): value is SchemaComponent =>
  'rawTypeData' in value && 'componentName' in value;

/** `allFieldsAreOptional` of a parsed object schema (`false` for other schemas) */
const isAllFieldsOptional = (parsedSchema: ParsedSchema) =>
  'allFieldsAreOptional' in parsedSchema && !!parsedSchema.allFieldsAreOptional;

/** vendor extension with a content type (`x-accepts`, `x-contentType`) */
const getExtraContentType = (value: unknown) => (typeof value === 'string' ? value : undefined);

class SchemaRoutes {
  config: SchemaRoutesConfig;
  schemaParserFabric: SchemaParserFabric;
  schemaUtils: SchemaUtils;
  typeNameFormatter: Pick<TypeNameFormatter, 'format'>;
  schemaComponentsMap: SchemaComponentsMap;
  logger: Pick<Logger, 'warn' | 'debug'>;
  templatesWorker: Pick<TemplatesWorker, 'renderTemplate'>;

  FORM_DATA_TYPES: string[] = [];

  routes: ParsedRoute[] = [];
  hasSecurityRoutes = false;
  hasQueryRoutes = false;
  hasFormDataRoutes = false;

  constructor({
    config,
    schemaParserFabric,
    schemaComponentsMap,
    logger,
    templatesWorker,
    typeNameFormatter,
  }: SchemaRoutesDeps) {
    this.config = config;
    this.schemaParserFabric = schemaParserFabric;
    this.schemaUtils = this.schemaParserFabric.schemaUtils;
    this.typeNameFormatter = typeNameFormatter;
    this.schemaComponentsMap = schemaComponentsMap;
    this.logger = logger;
    this.templatesWorker = templatesWorker;

    this.FORM_DATA_TYPES = uniq([
      this.schemaUtils.getSchemaType({ type: 'string', format: 'file' }),
      this.schemaUtils.getSchemaType({ type: 'string', format: 'binary' }),
    ]);
  }

  /**
   * Unique key of a parameter (name + location), resolving `$ref` parameters.
   */
  getParameterKey = (parameter: MaybeRef<ParameterObject>): string | null => {
    const $ref = isRecord(parameter) ? parameter.$ref : undefined;
    const resolved =
      typeof $ref === 'string' && $ref
        ? this.schemaComponentsMap.get($ref)?.rawTypeData
        : parameter;
    if (!isParameterObject(resolved) || !resolved.name) {
      return null;
    }
    return `${resolved.in}:${resolved.name}`;
  };

  /**
   * Merges path-level and operation-level parameters.
   * Operation-level parameters override path-level ones with the same name and location.
   */
  mergeParameters = (
    pathParameters: PathItemObject['parameters'],
    operationParameters: OperationObject['parameters']
  ): MaybeRef<ParameterObject>[] => {
    const operationParams = compact(concat(operationParameters));
    const overriddenKeys = new Set(compact(operationParams.map(this.getParameterKey)));

    return [
      ...compact(concat(pathParameters)).filter((parameter) => {
        const key = this.getParameterKey(parameter);
        return !key || !overriddenKeys.has(key);
      }),
      ...operationParams,
    ];
  };

  createRequestsMap = (routeInfoByMethodsMap: PathItemObject): Record<string, OperationObject> => {
    const parameters = routeInfoByMethodsMap?.parameters;

    return reduce(
      routeInfoByMethodsMap,
      (acc: Record<string, OperationObject>, requestInfo: unknown, method: string) => {
        if (
          startsWith(method, 'x-') ||
          ['parameters', '$ref', 'summary', 'description', 'servers'].includes(method) ||
          !isOperationObject(requestInfo)
        ) {
          return acc;
        }

        acc[method] = {
          ...requestInfo,
          parameters: this.mergeParameters(parameters, requestInfo.parameters),
        };

        return acc;
      },
      {}
    );
  };

  parseRouteName = (originalRouteName: string): BuildRoutePathResult => {
    const routeName = this.config.hooks.onPreBuildRoutePath(originalRouteName) || originalRouteName;

    const pathParamMatches = (routeName || '').match(
      /({(([A-z])([\dA-Za-z]-?_?\.?)+)(\d+)?})|(:(([A-z])([\dA-Za-z]-?_?\.?)+)(\d+)?:?)/g
    );

    // used in case when path parameters is not declared in requestInfo.parameters ("in": "path")
    const pathParams = reduce(
      pathParamMatches,
      (pathParams: RouteNameParam[], match) => {
        const paramName = replace(match, /[:{}]/g, '');

        if (!paramName) {
          return pathParams;
        }

        if (includes(paramName, '-')) {
          this.logger.warn('wrong path param name', paramName);
        }

        pathParams.push({
          $match: match,
          name: camelCase(paramName),
          required: true,
          type: 'string',
          description: '',
          schema: {
            type: 'string',
          },
          in: 'path',
        });

        return pathParams;
      },
      []
    );

    let fixedRoute = reduce(
      pathParams,
      (fixedRoute: string, pathParam, i, arr) => {
        const insertion =
          this.config.hooks.onInsertPathParam(pathParam.name, i, arr, fixedRoute) || pathParam.name;
        return replace(fixedRoute, pathParam.$match, `\${${insertion}}`);
      },
      routeName || ''
    );

    const queryParamMatches = fixedRoute.match(/({\?.*})/g);
    const queryParams: RouteNameParam[] = [];

    if (queryParamMatches && queryParamMatches.length > 0) {
      for (const match of queryParamMatches) {
        fixedRoute = fixedRoute.replace(match, '');
      }

      for (const paramName of uniq(
        queryParamMatches
          .join(',')
          .replaceAll(/({\?)|(})|\s/g, '')
          .split(',')
      )) {
        if (includes(paramName, '-')) {
          this.logger.warn('wrong query param name', paramName);
        }

        queryParams.push({
          $match: paramName,
          name: camelCase(paramName),
          required: true,
          type: 'string',
          description: '',
          schema: {
            type: 'string',
          },
          in: 'query',
        });
      }
    }

    const result: BuildRoutePathResult = {
      originalRoute: originalRouteName || '',
      route: fixedRoute,
      pathParams,
      queryParams,
    };

    return this.config.hooks.onBuildRoutePath(result) || result;
  };

  /**
   * Wraps path params inserted into the request path (`/pets/${petId}`) with
   * `encodeURIComponent`, so values like "a/b" or "a?b" don't change the request target.
   * Insertions customized via `hooks.onInsertPathParam` are kept as is.
   */
  encodePathParams = (route: string, pathParamNames: string[]) =>
    pathParamNames.reduce(
      (path, name) => path.split(`\${${name}}`).join(`\${encodeURIComponent(${name})}`),
      route
    );

  getRouteParams = (
    routeInfo: Pick<OperationObject, 'parameters'>,
    pathParamsFromRouteName: RouteNameParam[],
    queryParamsFromRouteName: RouteNameParam[]
  ): RouteParams => {
    const { parameters } = routeInfo;

    const routeParams: RouteParams = {
      path: [],
      header: [],
      body: [],
      query: [],
      formData: [],
      cookie: [],
    };

    each(parameters, (parameter) => {
      const refTypeInfo = this.schemaParserFabric.schemaUtils.getSchemaRefType(parameter);
      // `$ref` parameters are resolved, unresolved `$ref`s (without `in`) are skipped
      const resolvedParameter =
        refTypeInfo && isParameterObject(refTypeInfo.rawTypeData)
          ? refTypeInfo.rawTypeData
          : parameter;

      if (!isParameterObject(resolvedParameter)) {
        return;
      }

      if (!routeParams[resolvedParameter.in]) {
        routeParams[resolvedParameter.in] = [];
      }

      const routeParam = {
        ...resolvedParameter,
        ...resolvedParameter.schema,
      };

      if (routeParam.in === 'path') {
        if (!routeParam.name) {
          return;
        }

        routeParam.name = camelCase(routeParam.name);
      }

      routeParams[routeParam.in].push(routeParam);
    });

    // used in case when path parameters is not declared in requestInfo.parameters ("in": "path")
    each(pathParamsFromRouteName, (pathParam) => {
      const alreadyExist = some(routeParams.path, (parameter) => parameter.name === pathParam.name);

      if (!alreadyExist) {
        routeParams.path.push(pathParam);
      }
    });
    // used in case when path parameters is not declared in requestInfo.parameters ("in": "path")
    each(queryParamsFromRouteName, (queryParam) => {
      const alreadyExist = some(
        routeParams.query,
        (parameter) => parameter.name === queryParam.name
      );

      if (!alreadyExist) {
        routeParams.query.push(queryParam);
      }
    });

    return routeParams;
  };

  getContentTypes = (
    requestInfo: (ContentHolder | null | undefined)[] | Record<string, ContentHolder> | undefined,
    extraContentTypes?: (string | null | undefined)[]
  ): string[] =>
    uniq(
      compact([
        ...(extraContentTypes || []),
        ...flatMap(
          Array.isArray(requestInfo) ? requestInfo : values(requestInfo),
          (requestInfoData) => (requestInfoData ? keys(requestInfoData.content) : [])
        ),
      ])
    );

  getContentKind = (contentTypes: string[]): ContentKind => {
    if (
      some(contentTypes, (contentType) => startsWith(contentType, 'application/json')) ||
      some(contentTypes, (contentType) => endsWith(contentType, '+json'))
    ) {
      return CONTENT_KIND.JSON;
    }

    if (contentTypes.includes('application/x-www-form-urlencoded')) {
      return CONTENT_KIND.URL_ENCODED;
    }

    if (contentTypes.includes('multipart/form-data')) {
      return CONTENT_KIND.FORM_DATA;
    }

    if (some(contentTypes, (contentType) => includes(contentType, 'image/'))) {
      return CONTENT_KIND.IMAGE;
    }

    if (some(contentTypes, (contentType) => startsWith(contentType, 'text/'))) {
      return CONTENT_KIND.TEXT;
    }

    return CONTENT_KIND.OTHER;
  };

  isSuccessStatus = (status: string | number) =>
    (this.config.defaultResponseAsSuccess && status === 'default') ||
    (+status >= this.config.successResponseStatusRange[0] &&
      +status <= this.config.successResponseStatusRange[1]) ||
    // OpenAPI allows status code ranges in any case: "2XX" / "2xx"
    /^2xx$/i.test(`${status}`);

  /** schema of the first content type of a request body / response (with its `dataType`) */
  getSchemaFromRequestType = (requestInfo: RequestInfoLike): SchemaObject | null => {
    const content = getContentObject(requestInfo);

    if (!content) {
      return null;
    }

    /* content: { "multipart/form-data": { schema: {...} }, "application/json": { schema: {...} } } */

    /* for example: dataType = "multipart/form-data" */
    for (const dataType in content) {
      const mediaType = content[dataType];
      if (mediaType && mediaType.schema) {
        return {
          ...mediaType.schema,
          dataType,
        };
      }
    }

    return null;
  };

  getTypeFromRequestInfo = ({
    requestInfo,
    parsedSchemas,
    operationId,
    defaultType,
    typeName,
  }: {
    requestInfo: MaybeRef<ResponseObject> | ContentHolder;
    parsedSchemas: ParsedSchema[];
    operationId?: string;
    defaultType?: string;
    typeName?: string | null;
  }): string => {
    // TODO: make more flexible pick schema without content type
    const schema = this.getSchemaFromRequestType(requestInfo);
    const refTypeInfo = this.schemaParserFabric.schemaUtils.getSchemaRefType(requestInfo);

    if (schema) {
      const content = this.schemaParserFabric.getInlineParseContent(schema, typeName, [
        operationId,
      ]);
      // formatted name of this component is equal to the content
      const foundSchemaByName = find(
        parsedSchemas,
        (parsedSchema) => this.typeNameFormatter.format(parsedSchema.name) === content
      );

      if (foundSchemaByName) {
        return content;
      }

      // Reuse a component whose inline content is identical to this one.
      // Only composite (allOf/oneOf/anyOf/discriminator) components are considered:
      // for primitive components (e.g. `UserId: { type: string }`) an equal content
      // says nothing about identity and would type every `string` as `UserId`.
      const foundSchemaByContent = find(
        parsedSchemas,
        (parsedSchema): parsedSchema is ParsedSchema & { name: string } =>
          parsedSchema.schemaType === SCHEMA_TYPES.COMPLEX &&
          typeof parsedSchema.name === 'string' &&
          isEqual(parsedSchema.content, content)
      );

      return foundSchemaByContent
        ? this.typeNameFormatter.format(foundSchemaByContent.name)
        : content;
    }

    if (refTypeInfo) {
      // const refTypeWithoutOpId = refType.replace(operationId, '');
      // const foundedSchemaByName = find(parsedSchemas, ({ name }) => name === refType || name === refTypeWithoutOpId)

      // TODO:HACK fix problem of swagger2opeanpi
      const typeNameWithoutOpId = operationId
        ? replace(refTypeInfo.typeName, operationId, '')
        : refTypeInfo.typeName;
      if (find(parsedSchemas, (schema) => schema.name === typeNameWithoutOpId)) {
        return this.typeNameFormatter.format(typeNameWithoutOpId);
      }

      switch (refTypeInfo.componentName) {
        case 'schemas': {
          return this.typeNameFormatter.format(refTypeInfo.typeName);
        }
        case 'responses':
        case 'requestBodies': {
          return this.schemaParserFabric.getInlineParseContent(
            this.getSchemaFromRequestType(refTypeInfo.rawTypeData),
            refTypeInfo.typeName || null,
            [operationId]
          );
        }
        default: {
          return this.schemaParserFabric.getInlineParseContent(
            refTypeInfo.rawTypeData,
            refTypeInfo.typeName || null,
            [operationId]
          );
        }
      }
    }

    return defaultType || this.config.Ts.Keyword.Any;
  };

  getRequestInfoTypes = ({
    requestInfos,
    parsedSchemas,
    operationId,
    defaultType,
  }: {
    requestInfos: ResponsesObject | undefined;
    parsedSchemas: ParsedSchema[];
    operationId?: string;
    defaultType?: string;
  }): ResponseInfo[] =>
    reduce(
      requestInfos,
      (acc: ResponseInfo[], requestInfo, status) => {
        const contentTypes = this.getContentTypes([requestInfo]);

        return [
          ...acc,
          {
            ...requestInfo,
            contentTypes,
            contentKind: this.getContentKind(contentTypes),
            type: this.schemaParserFabric.schemaUtils.safeAddNullToType(
              requestInfo,
              this.getTypeFromRequestInfo({
                requestInfo,
                parsedSchemas,
                operationId,
                defaultType,
              })
            ),
            description: this.schemaParserFabric.schemaFormatters.formatDescription(
              requestInfo.description || '',
              true
            ),
            status: isNaN(+status) ? status : +status,
            isSuccess: this.isSuccessStatus(status),
          },
        ];
      },
      []
    );

  getResponseBodyInfo = (
    routeInfo: OperationObject,
    parsedSchemas: ParsedSchema[]
  ): ResponseBodyInfo => {
    const { produces, operationId, responses } = routeInfo;

    const contentTypes = this.getContentTypes(responses, [
      ...(produces || []),
      getExtraContentType(routeInfo['x-accepts']),
    ]);

    const responseInfos = this.getRequestInfoTypes({
      requestInfos: responses,
      parsedSchemas,
      operationId,
      defaultType: this.config.defaultResponseType,
    });

    const successResponse = responseInfos.find((response) => response.isSuccess);
    const errorResponses = responseInfos.filter(
      (response) => !response.isSuccess && response.type !== this.config.Ts.Keyword.Any
    );

    const handleResponseHeaders = (src: ResponseInfo['headers']) => {
      if (!src) {
        return 'headers: {},';
      }
      const headerTypes = Object.fromEntries(
        Object.entries(src).map(([k, v]: [string, MaybeRef<HeaderObject>]) => {
          // header object: { description, schema: {...} } (OpenAPI 3) or { type } (Swagger 2)
          const headerSchema = hasSchema(v) ? v.schema : v;
          return [k, this.schemaUtils.getSchemaType(headerSchema)];
        })
      );
      const r = `headers: { ${Object.entries(headerTypes)
        .map(([k, v]) => `"${k}": ${v}`)
        .join(',')} },`;
      return r;
    };

    return {
      contentTypes,
      responses: responseInfos,
      success: {
        schema: successResponse,
        type: (successResponse && successResponse.type) || this.config.Ts.Keyword.Any,
      },
      error: {
        schemas: errorResponses,
        type:
          this.config.Ts.UnionType(errorResponses.map((response) => response.type)) ||
          this.config.Ts.Keyword.Any,
      },
      full: {
        types:
          this.config.Ts.UnionType(
            responseInfos.map(
              (response) => `{
      data: ${response.type}, status: ${response.status}, statusCode: ${
        response.status
      }, statusText: "${response.description}", ${handleResponseHeaders(
        response.headers
      )} config: {} }`
            )
          ) || this.config.Ts.Keyword.Any,
      },
    };
  };

  /** object schema with the params as properties */
  convertRouteParamsIntoObject = (params: RouteParam[]): SchemaObject => {
    const objectSchema: SchemaObject = {
      properties: {},
      type: 'object',
    };

    return reduce(
      params,
      (objectSchema: SchemaObject, schemaPart) => {
        if (!schemaPart || !schemaPart.name) {
          return objectSchema;
        }

        let usageName = `${schemaPart.name}`;

        if (usageName.includes('.')) {
          usageName = camelCase(usageName);
        }

        const property: RouteParam = {
          ...schemaPart,
          ...schemaPart.schema,
          $origName: schemaPart.name,
          name: usageName,
        };

        return {
          ...objectSchema,
          properties: {
            ...objectSchema.properties,
            [usageName]: property,
          },
        };
      },
      objectSchema
    );
  };

  getRequestBodyInfo = (
    routeInfo: OperationObject,
    routeParams: RouteParams,
    parsedSchemas: ParsedSchema[],
    routeName: RouteNameInfo
  ): RequestBodyInfo => {
    const { requestBody, consumes, requestBodyName, operationId } = routeInfo;
    let schema: SchemaObject | null = null;
    let content: string | null = null;

    const contentTypes = this.getContentTypes(
      [requestBody],
      [...(consumes || []), getExtraContentType(routeInfo['x-contentType'])]
    );
    let contentKind = this.getContentKind(contentTypes);

    let typeName: string | null = null;

    if (this.config.extractRequestBody) {
      typeName = this.schemaUtils.resolveTypeName(routeName.usage, {
        suffixes: this.config.extractingOptions.requestBodySuffix,
        resolver: this.config.extractingOptions.requestBodyNameResolver,
      });
    }

    if (routeParams.formData.length > 0) {
      // swagger 2 `in: formData` params are sent as multipart unless the route consumes
      // `application/x-www-form-urlencoded`
      if (contentKind !== CONTENT_KIND.URL_ENCODED) {
        contentKind = CONTENT_KIND.FORM_DATA;
      }
      schema = this.convertRouteParamsIntoObject(routeParams.formData);
      content = this.schemaParserFabric.getInlineParseContent(schema, typeName, [operationId]);
    } else if (contentKind === CONTENT_KIND.FORM_DATA) {
      schema = this.getSchemaFromRequestType(requestBody);
      content = this.schemaParserFabric.getInlineParseContent(schema, typeName, [operationId]);
    } else if (requestBody) {
      schema = this.getSchemaFromRequestType(requestBody);
      content = this.schemaParserFabric.schemaUtils.safeAddNullToType(
        requestBody,
        this.getTypeFromRequestInfo({
          requestInfo: requestBody,
          parsedSchemas,
          operationId,
          typeName,
        })
      );

      // TODO: Refactor that.
      // It needed for cases when swagger schema is not declared request body type as form data
      // but request body data type contains form data types like File
      if (this.FORM_DATA_TYPES.some((dataType) => includes(content, `: ${dataType}`))) {
        contentKind = CONTENT_KIND.FORM_DATA;
      }
    }

    let requestBodySchema: SchemaObject | SchemaComponent | null = schema;

    if (schema && !schema.$ref && this.config.extractRequestBody) {
      const component = this.schemaParserFabric.createParsedComponent({
        schema,
        typeName,
        schemaPath: [operationId],
      });
      requestBodySchema = component;
      content = this.schemaParserFabric.getInlineParseContent(
        { $ref: component.$ref },
        undefined,
        undefined
      );
    }

    const requestBodyObjectName =
      requestBody && 'name' in requestBody ? requestBody.name : undefined;

    return {
      paramName: requestBodyName || requestBodyObjectName || DEFAULT_BODY_ARG_NAME,
      contentTypes,
      contentKind,
      schema: requestBodySchema,
      type: content,
      // OpenAPI: `requestBody.required` defaults to `false`
      required: !!requestBody && 'required' in requestBody && !!requestBody.required,
    };
  };

  createRequestParamsSchema = ({
    queryParams,
    queryObjectSchema,
    pathArgsSchemas,
    extractRequestParams,
    routeName,
  }: {
    queryParams: RouteParam[];
    queryObjectSchema: SchemaObject;
    pathArgsSchemas: (SchemaObject | RouteParam)[];
    extractRequestParams: boolean;
    routeName: RouteNameInfo;
  }): SchemaObject | SchemaComponent | null => {
    if (!queryParams || queryParams.length === 0) {
      return null;
    }

    const pathParams = reduce(
      pathArgsSchemas,
      (acc: Record<string, LocatedSchemaObject>, pathArgSchema) => {
        const name = 'name' in pathArgSchema ? pathArgSchema.name : undefined;
        if (typeof name === 'string' && name) {
          acc[name] = {
            ...pathArgSchema,
            in: 'path',
          };
        }

        return acc;
      },
      {}
    );

    const fixedQueryParams = reduce(
      queryObjectSchema.properties ?? {},
      (acc: Record<string, LocatedSchemaObject>, property, name) => {
        if (name && isObject(property)) {
          acc[name] = {
            ...property,
            in: 'query',
          };
        }

        return acc;
      },
      {}
    );

    const schema: SchemaObject = {
      // `$parsed` belongs to the query object schema only (it doesn't contain path params),
      // parsed query properties are reused
      ...omit(queryObjectSchema, '$parsed'),
      properties: {
        ...fixedQueryParams,
        ...pathParams,
      },
    };

    const fixedSchema = this.config.hooks.onCreateRequestParams(schema);

    if (fixedSchema) {
      return fixedSchema;
    }

    if (extractRequestParams) {
      const generatedTypeName = this.schemaUtils.resolveTypeName(routeName.usage, {
        suffixes: this.config.extractingOptions.requestParamsSuffix,
        resolver: this.config.extractingOptions.requestParamsNameResolver,
      });

      return this.schemaParserFabric.createParsedComponent({
        typeName: generatedTypeName,
        schema,
      });
    }

    return schema;
  };

  extractResponseBodyIfItNeeded = (
    routeInfo: OperationObject,
    responseBodyInfo: ResponseBodyInfo,
    routeName: RouteNameInfo
  ) => {
    if (
      responseBodyInfo.responses.length > 0 &&
      responseBodyInfo.success &&
      responseBodyInfo.success.schema
    ) {
      const successResponse = responseBodyInfo.success;
      const successSchema = successResponse.schema;

      // not a `$ref` response and not extracted yet
      if (successSchema && !successSchema.$ref && !isSchemaComponent(successSchema)) {
        const idx = responseBodyInfo.responses.indexOf(successSchema);

        const schema = this.getSchemaFromRequestType(successSchema);

        // response without content (e.g. 204) - nothing to extract
        if (!schema) {
          return;
        }

        const typeName = this.schemaUtils.resolveTypeName(routeName.usage, {
          suffixes: this.config.extractingOptions.responseBodySuffix,
          resolver: this.config.extractingOptions.responseBodyNameResolver,
        });

        const component = this.schemaParserFabric.createParsedComponent({
          schema,
          typeName,
          schemaPath: [routeInfo.operationId],
        });
        successResponse.schema = component;
        successResponse.type = this.schemaParserFabric.getInlineParseContent(
          { $ref: component.$ref },
          undefined,
          undefined
        );

        if (idx > -1) {
          assign(responseBodyInfo.responses[idx], {
            ...component,
            type: successResponse.type,
          });
        }
      }
    }
  };

  extractResponseErrorIfItNeeded = (
    routeInfo: OperationObject,
    responseBodyInfo: ResponseBodyInfo,
    routeName: RouteNameInfo
  ) => {
    if (
      responseBodyInfo.responses.length > 0 &&
      responseBodyInfo.error.schemas &&
      responseBodyInfo.error.schemas.length > 0
    ) {
      const errorSchemas = responseBodyInfo.error.schemas
        .map((errorSchema) => {
          // resolve `$ref: "#/components/responses/Name"` error responses
          const refTypeInfo = this.schemaUtils.getSchemaRefType(errorSchema);
          return this.getSchemaFromRequestType(refTypeInfo ? refTypeInfo.rawTypeData : errorSchema);
        })
        .filter((schema): schema is SchemaObject => !!schema);

      if (errorSchemas.length === 0) {
        return;
      }

      const typeName = this.schemaUtils.resolveTypeName(routeName.usage, {
        suffixes: this.config.extractingOptions.responseErrorSuffix,
        resolver: this.config.extractingOptions.responseErrorNameResolver,
      });

      const schema = this.schemaParserFabric.parseSchema(
        {
          oneOf: errorSchemas,
          title: errorSchemas
            .map((schema) => schema.title)
            .filter(Boolean)
            .join(' '),
          description: errorSchemas
            .map((schema) => schema.description)
            .filter(Boolean)
            .join('\n'),
        },
        null,
        [routeInfo.operationId]
      );
      const component = this.schemaComponentsMap.createComponent(
        // `null` is joined as an empty string (`#/components/schemas/`)
        this.schemaComponentsMap.createRef(['components', 'schemas', typeName ?? '']),
        { ...schema }
      );
      responseBodyInfo.error.schemas = [component];
      responseBodyInfo.error.type = this.typeNameFormatter.format(component.typeName);
    }
  };

  getRouteName = (rawRouteInfo: RawRouteInfo): RouteNameInfo => {
    const { moduleName } = rawRouteInfo;
    const { routeNameDuplicatesMap, templatesToRender } = this.config;
    const routeNameTemplate = templatesToRender.routeName;

    const routeNameFromTemplate = this.templatesWorker.renderTemplate(routeNameTemplate, {
      routeInfo: rawRouteInfo,
    });

    const routeName =
      this.config.hooks.onFormatRouteName(rawRouteInfo, routeNameFromTemplate) ||
      routeNameFromTemplate;

    const duplicateIdentifier = `${moduleName}|${routeName}`;
    const previousDuplicates = routeName
      ? routeNameDuplicatesMap.get(duplicateIdentifier)
      : undefined;
    const duplicates = previousDuplicates === undefined ? 1 : previousDuplicates + 1;

    routeNameDuplicatesMap.set(duplicateIdentifier, duplicates);

    if (previousDuplicates !== undefined) {
      this.logger.warn(
        `Module "${moduleName}" already has method "${routeName}()"`,
        `\nThis method has been renamed to "${routeName + duplicates}()" to solve conflict names.`
      );
    }

    const routeNameInfo: RouteNameInfo = {
      usage: routeName + (duplicates > 1 ? duplicates : ''),
      original: routeName,
      duplicate: duplicates > 1,
    };

    return this.config.hooks.onCreateRouteName(routeNameInfo, rawRouteInfo) || routeNameInfo;
  };

  parseRouteInfo = (
    rawRouteName: string,
    routeInfo: OperationObject,
    method: HttpMethod,
    usageSchema: Pick<OpenAPIV3Document, 'security'>,
    parsedSchemas: ParsedSchema[]
  ): ParsedRoute => {
    const { security: globalSecurity } = usageSchema;
    const { moduleNameIndex, moduleNameFirstTag, extractRequestParams } = this.config;
    const {
      operationId,
      requestBody,
      security,
      summary,
      description,
      tags,
      responses,
      produces,
      consumes,
      ...otherInfo
    } = routeInfo;
    const {
      route,
      pathParams: pathParamsFromRouteName,
      queryParams: queryParamsFromRouteName,
    } = this.parseRouteName(rawRouteName);

    const routeId = generateId();
    const firstTag = tags && tags.length > 0 ? tags[0] : null;
    const moduleName =
      moduleNameFirstTag && firstTag
        ? camelCase(firstTag)
        : camelCase(compact(split(route, '/'))[moduleNameIndex]);
    let hasSecurity = !!(globalSecurity && globalSecurity.length > 0);
    if (security) {
      hasSecurity = security.length > 0;
    }

    const routeParams = this.getRouteParams(
      routeInfo,
      pathParamsFromRouteName,
      queryParamsFromRouteName
    );

    // path params always have a name (see `getRouteParams`)
    const pathArgs = routeParams.path.map(
      (pathArgSchema): PathArg => ({
        name: `${pathArgSchema.name}`,
        optional: !pathArgSchema.required,
        // mark it as any for now, because "getInlineParseContent" breaks type names of extracted enums
        type: this.config.Ts.Keyword.Any,
        description: pathArgSchema.description,
      })
    );
    const pathArgsNames = pathArgs.map((arg) => arg.name);

    const responseBodyInfo = this.getResponseBodyInfo(routeInfo, parsedSchemas);

    const rawRouteInfo: RawRouteInfo = {
      ...otherInfo,
      pathArgs,
      operationId,
      method,
      route: rawRouteName,
      moduleName,
      responsesTypes: responseBodyInfo.responses,
      description,
      tags,
      summary,
      responses,
      produces,
      requestBody,
      consumes,
    };

    const queryObjectSchema = this.convertRouteParamsIntoObject(routeParams.query);
    const pathObjectSchema = this.convertRouteParamsIntoObject(routeParams.path);
    const headersObjectSchema = this.convertRouteParamsIntoObject(routeParams.header);

    const routeName = this.getRouteName(rawRouteInfo);

    const requestBodyInfo = this.getRequestBodyInfo(
      routeInfo,
      routeParams,
      parsedSchemas,
      routeName
    );

    if (this.config.extractResponseBody) {
      this.extractResponseBodyIfItNeeded(routeInfo, responseBodyInfo, routeName);
    }
    if (this.config.extractResponseError) {
      this.extractResponseErrorIfItNeeded(routeInfo, responseBodyInfo, routeName);
    }

    const typeName = this.schemaUtils.resolveTypeName(routeName.usage, {
      suffixes: this.config.extractingOptions.requestParamsSuffix,
      resolver: this.config.extractingOptions.requestParamsNameResolver,
      shouldReserve: false,
    });

    const queryType =
      routeParams.query.length > 0
        ? this.schemaParserFabric.getInlineParseContent(queryObjectSchema, null, [typeName])
        : null;
    const pathType =
      routeParams.path.length > 0
        ? this.schemaParserFabric.getInlineParseContent(pathObjectSchema, null, [typeName])
        : null;
    const headersType =
      routeParams.header.length > 0
        ? this.schemaParserFabric.getInlineParseContent(headersObjectSchema, null, [typeName])
        : null;

    // must be created after parsing of the query/path schemas above:
    // extracted request params reuse already parsed (cached) query params
    // otherwise inline enums would be extracted twice (with `extractEnums`)
    const requestParamsSchema = this.createRequestParamsSchema({
      queryParams: routeParams.query,
      // reuse already parsed path params (see `pathType`)
      pathArgsSchemas: routeParams.path.map(
        (pathParam) =>
          (pathParam.name !== undefined && pathObjectSchema.properties?.[pathParam.name]) ||
          pathParam
      ),
      queryObjectSchema,
      extractRequestParams,
      routeName,
    });

    const nameResolver = new SpecificArgNameResolver(this.config, this.logger, pathArgsNames);

    const specificArgs: SpecificArgs = {
      query: queryType
        ? {
            name: nameResolver.resolveArgName(RESERVED_QUERY_ARG_NAMES),
            optional: isAllFieldsOptional(
              this.schemaParserFabric.parseSchema(queryObjectSchema, null, [routeName.usage])
            ),
            type: queryType,
          }
        : void 0,
      body: requestBodyInfo.type
        ? {
            name: nameResolver.resolveArgName([
              requestBodyInfo.paramName,
              ...RESERVED_BODY_ARG_NAMES,
            ]),
            optional: !requestBodyInfo.required,
            type: requestBodyInfo.type,
          }
        : void 0,
      pathParams: pathType
        ? {
            name: nameResolver.resolveArgName(RESERVED_PATH_ARG_NAMES),
            optional: isAllFieldsOptional(
              this.schemaParserFabric.parseSchema(pathObjectSchema, null, [routeName.usage])
            ),
            type: pathType,
          }
        : void 0,
      headers: headersType
        ? {
            name: nameResolver.resolveArgName(RESERVED_HEADER_ARG_NAMES),
            optional: isAllFieldsOptional(
              this.schemaParserFabric.parseSchema(headersObjectSchema, null, [routeName.usage])
            ),
            type: headersType,
          }
        : void 0,
    };

    for (const [i, pathArg] of pathArgs.entries()) {
      // reuse already parsed path params (see `pathType`),
      // otherwise inline enums would be extracted twice (with `extractEnums`)
      pathArg.type = this.schemaParserFabric.getInlineParseContent(
        pathObjectSchema.properties?.[pathArg.name] || routeParams.path[i].schema,
        null,
        [typeName]
      );
    }

    return {
      id: routeId,
      namespace: replace(moduleName, /^(\d)/, 'v$1'),
      routeName,
      routeParams,
      requestBodyInfo,
      responseBodyInfo,
      specificArgs,
      queryObjectSchema,
      pathObjectSchema,
      headersObjectSchema,
      responseBodySchema: responseBodyInfo.success.schema,
      requestBodySchema: requestBodyInfo.schema,
      specificArgNameResolver: nameResolver,
      request: {
        contentTypes: requestBodyInfo.contentTypes,
        parameters: pathArgs,
        path: this.encodePathParams(route, pathArgsNames),
        formData: requestBodyInfo.contentKind === CONTENT_KIND.FORM_DATA,
        isQueryBody: requestBodyInfo.contentKind === CONTENT_KIND.URL_ENCODED,
        security: hasSecurity,
        method,
        requestParams: requestParamsSchema,

        payload: specificArgs.body,
        query: specificArgs.query,
        pathParams: specificArgs.pathParams,
        headers: specificArgs.headers,
      },
      response: {
        contentTypes: responseBodyInfo.contentTypes,
        type: responseBodyInfo.success.type,
        errorType: responseBodyInfo.error.type,
        fullTypes: responseBodyInfo.full.types,
      },
      raw: rawRouteInfo,
    };
  };

  attachSchema = ({
    usageSchema,
    parsedSchemas,
  }: {
    usageSchema: Pick<OpenAPIV3Document, 'paths' | 'security'>;
    parsedSchemas: ParsedSchema[];
  }) => {
    this.config.routeNameDuplicatesMap.clear();

    const pathsEntries = entries(usageSchema.paths);

    forEach(pathsEntries, ([rawRouteName, routeInfoByMethodsMap]) => {
      const routeInfosMap = this.createRequestsMap(routeInfoByMethodsMap);

      forEach(routeInfosMap, (routeInfo, method) => {
        const parsedRouteInfo = this.parseRouteInfo(
          rawRouteName,
          routeInfo,
          method,
          usageSchema,
          parsedSchemas
        );
        const processedRouteInfo = this.config.hooks.onCreateRoute(parsedRouteInfo);
        if (processedRouteInfo !== false) {
          const route = processedRouteInfo || parsedRouteInfo;

          if (!this.hasSecurityRoutes && route.request?.security) {
            this.hasSecurityRoutes = !!route.request.security;
          }
          if (!this.hasQueryRoutes && route.request?.query) {
            this.hasQueryRoutes = true;
          }
          if (!this.hasFormDataRoutes && route.request?.formData) {
            this.hasFormDataRoutes = !!route.request.formData;
          }

          this.routes.push(route);
        }
      });
    });
  };

  getGroupedRoutes = (): GroupedRoutes => {
    const groupedRoutes = this.routes.reduce(
      (modules: Record<string, ParsedRoute[]>, route) => {
        if (route.namespace) {
          if (!modules[route.namespace]) {
            modules[route.namespace] = [];
          }

          modules[route.namespace].push(route);
        } else {
          modules.$outOfModule.push(route);
        }

        return modules;
      },
      {
        $outOfModule: [],
      }
    );

    const routeGroups = reduce(
      groupedRoutes,
      (acc: GroupedRoutes, routesGroup, moduleName) => {
        if (moduleName === '$outOfModule') {
          acc.outOfModule = routesGroup;
        } else {
          if (!acc.combined) {
            acc.combined = [];
          }

          acc.combined.push({
            moduleName,
            routes: map(routesGroup, (route): ParsedRoute => {
              const { original: originalName, usage: usageName } = route.routeName;

              // TODO: https://github.com/acacode/swagger-typescript-api/issues/152
              // TODO: refactor
              if (
                routesGroup.length > 1 &&
                usageName !== originalName &&
                !some(
                  routesGroup,
                  ({ routeName, id }) => id !== route.id && originalName === routeName.original
                )
              ) {
                return {
                  ...route,
                  routeName: {
                    ...route.routeName,
                    usage: originalName,
                  },
                };
              }

              return route;
            }),
          });
        }
        return acc;
      },
      {}
    );

    if (this.config.sortRoutes) {
      if (routeGroups.outOfModule) {
        routeGroups.outOfModule = this.sortRoutes(routeGroups.outOfModule);
      }
      if (routeGroups.combined) {
        each(routeGroups.combined, (routeGroup: ModuleRoutes) => {
          routeGroup.routes = this.sortRoutes(routeGroup.routes);
        });
      }
    }

    return routeGroups;
  };

  sortRoutes = (routes: ParsedRoute[]): ParsedRoute[] => {
    return slice(routes).sort((routeA, routeB) =>
      routeA.routeName.usage.localeCompare(routeB.routeName.usage)
    );
  };
}

export { SchemaRoutes };
