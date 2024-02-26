/* eslint-disable unicorn/no-array-reduce */
/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable no-void */
/* eslint-disable unicorn/no-array-callback-reference */
/* eslint-disable indent */
/* eslint-disable unicorn/prefer-array-some */
/* eslint-disable unicorn/no-null */
/* eslint-disable unicorn/prefer-spread */

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
  get,
  includes,
  isEqual,
  isNaN,
  isObject,
  keys,
  map,
  reduce,
  replace,
  slice,
  some,
  split,
  startsWith,
  uniq,
} from 'lodash-es';

import { SpecificArgNameResolver } from './util/specific-arg-name-resolver';
import {
  DEFAULT_BODY_ARG_NAME,
  RESERVED_BODY_ARG_NAMES,
  RESERVED_PATH_ARG_NAMES,
  RESERVED_QUERY_ARG_NAMES,
} from '../../src/constants';
import { generateId } from '../util/id';

const CONTENT_KIND = {
  JSON: 'JSON',
  URL_ENCODED: 'URL_ENCODED',
  FORM_DATA: 'FORM_DATA',
  IMAGE: 'IMAGE',
  OTHER: 'OTHER',
  TEXT: 'TEXT',
};

class SchemaRoutes {
  /**
   * @type {CodeGenConfig}
   */
  config;
  /**
   * @type {SchemaParserFabric}
   */
  schemaParserFabric;
  /**
   * @type {SchemaUtils}
   */
  schemaUtils;
  /**
   * @type {TypeNameFormatter}
   */
  typeNameFormatter;
  /**
   * @type {SchemaComponentsMap}
   */
  schemaComponentsMap;
  /**
   * @type {Logger}
   */
  logger;
  /**
   * @type {TemplatesWorker}
   */
  templatesWorker;

  FORM_DATA_TYPES: any = [];

  routes: any = [];
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
  }: any) {
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

  createRequestsMap = (routeInfoByMethodsMap: any) => {
    const parameters = get(routeInfoByMethodsMap, 'parameters');

    return reduce(
      routeInfoByMethodsMap,
      (acc: any, requestInfo, method) => {
        if (startsWith(method, 'x-') || ['parameters', '$ref'].includes(method)) {
          return acc;
        }

        acc[method] = {
          ...requestInfo,
          parameters: compact(concat(parameters, requestInfo.parameters)),
        };

        return acc;
      },
      {},
    );
  };

  parseRouteName = (originalRouteName: any) => {
    const routeName = this.config.hooks.onPreBuildRoutePath(originalRouteName) || originalRouteName;

    const pathParamMatches = (routeName || '').match(
      /({(([A-z])([\dA-Za-z]-?_?\.?)+)(\d+)?})|(:(([A-z])([\dA-Za-z]-?_?\.?)+)(\d+)?:?)/g,
    );

    // used in case when path parameters is not declared in requestInfo.parameters ("in": "path")
    const pathParams: any = reduce(
      pathParamMatches,
      (pathParams: any, match) => {
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
      [],
    );

    let fixedRoute = reduce(
      pathParams,
      (fixedRoute, pathParam, i, arr) => {
        const insertion =
          this.config.hooks.onInsertPathParam(pathParam.name, i, arr, fixedRoute) || pathParam.name;
        return replace(fixedRoute, pathParam.$match, `\${${insertion}}`);
      },
      routeName || '',
    );

    const queryParamMatches = fixedRoute.match(/({\?.*})/g);
    const queryParams = [];

    if (queryParamMatches && queryParamMatches.length > 0) {
      for (const match of queryParamMatches) {
        fixedRoute = fixedRoute.replace(match, '');
      }

      for (const paramName of uniq(
        queryParamMatches
          .join(',')
          .replaceAll(/({\?)|(})|\s/g, '')
          .split(','),
      )) {
        if (includes(paramName as any, '-')) {
          this.logger.warn('wrong query param name', paramName);
        }

        queryParams.push({
          $match: paramName,
          name: camelCase(paramName as any),
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

    const result = {
      originalRoute: originalRouteName || '',
      route: fixedRoute,
      pathParams,
      queryParams,
    };

    return this.config.hooks.onBuildRoutePath(result) || result;
  };

  getRouteParams = (
    routeInfo: any,
    pathParamsFromRouteName: any,
    queryParamsFromRouteName: any,
  ) => {
    const { parameters } = routeInfo;

    const routeParams: any = {
      path: [],
      header: [],
      body: [],
      query: [],
      formData: [],
      cookie: [],
    };

    each(parameters, (parameter) => {
      const refTypeInfo = this.schemaParserFabric.schemaUtils.getSchemaRefType(parameter);
      let routeParam = null;

      if (refTypeInfo && refTypeInfo.rawTypeData.in && refTypeInfo.rawTypeData) {
        if (!routeParams[refTypeInfo.rawTypeData.in]) {
          routeParams[refTypeInfo.rawTypeData.in] = [];
        }

        routeParam = {
          ...refTypeInfo.rawTypeData,
          ...refTypeInfo.rawTypeData.schema,
        };
      } else {
        if (!parameter.in) {
          return;
        }

        if (!routeParams[parameter.in]) {
          routeParams[parameter.in] = [];
        }

        routeParam = {
          ...parameter,
          ...parameter.schema,
        };
      }

      if (routeParam.in === 'path') {
        if (!routeParam.name) {
          return;
        }

        routeParam.name = camelCase(routeParam.name);
      }

      if (routeParam) {
        routeParams[routeParam.in].push(routeParam);
      }
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
        (parameter) => parameter.name === queryParam.name,
      );

      if (!alreadyExist) {
        routeParams.query.push(queryParam);
      }
    });

    return routeParams;
  };

  getContentTypes = (requestInfo: any, extraContentTypes: any) =>
    uniq(
      compact([
        ...(extraContentTypes || []),
        ...flatMap(
          requestInfo,
          (requestInfoData) => requestInfoData && keys(requestInfoData.content),
        ),
      ]),
    );

  getContentKind = (contentTypes: any) => {
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

  isSuccessStatus = (status: any) =>
    (this.config.defaultResponseAsSuccess && status === 'default') ||
    (+status >= this.config.successResponseStatusRange[0] &&
      +status <= this.config.successResponseStatusRange[1]) ||
    status === '2xx';

  getSchemaFromRequestType = (requestInfo: any) => {
    const content = get(requestInfo, 'content');

    if (!content) {
      return null;
    }

    /* content: { "multipart/form-data": { schema: {...} }, "application/json": { schema: {...} } } */

    /* for example: dataType = "multipart/form-data" */
    for (const dataType in content) {
      if (content[dataType] && content[dataType].schema) {
        return {
          ...content[dataType].schema,
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
  }: any) => {
    // TODO: make more flexible pick schema without content type
    const schema = this.getSchemaFromRequestType(requestInfo);
    const refTypeInfo = this.schemaParserFabric.schemaUtils.getSchemaRefType(requestInfo);

    if (schema) {
      const content = this.schemaParserFabric.getInlineParseContent(schema, typeName, [
        operationId,
      ]);
      const foundedSchemaByName = find(
        parsedSchemas,
        (parsedSchema) => this.typeNameFormatter.format(parsedSchema.name) === content,
      );
      const foundSchemaByContent = find(parsedSchemas, (parsedSchema) =>
        isEqual(parsedSchema.content, content),
      );

      const foundSchema = foundedSchemaByName || foundSchemaByContent;

      return foundSchema ? this.typeNameFormatter.format(foundSchema.name) : content;
    }

    if (refTypeInfo) {
      // const refTypeWithoutOpId = refType.replace(operationId, '');
      // const foundedSchemaByName = find(parsedSchemas, ({ name }) => name === refType || name === refTypeWithoutOpId)

      // TODO:HACK fix problem of swagger2opeanpi
      const typeNameWithoutOpId = replace(refTypeInfo.typeName, operationId, '');
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
            [operationId],
          );
        }
        default: {
          return this.schemaParserFabric.getInlineParseContent(
            refTypeInfo.rawTypeData,
            refTypeInfo.typeName || null,
            [operationId],
          );
        }
      }
    }

    return defaultType || this.config.Ts.Keyword.Any;
  };

  getRequestInfoTypes = ({ requestInfos, parsedSchemas, operationId, defaultType }: any) =>
    reduce(
      requestInfos,
      (acc: any, requestInfo: any, status: any) => {
        // @ts-ignore
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
              }),
            ),
            description: this.schemaParserFabric.schemaFormatters.formatDescription(
              requestInfo.description || '',
              true,
            ),
            status: isNaN(+status) ? status : +status,
            isSuccess: this.isSuccessStatus(status),
          },
        ];
      },
      [],
    );

  getResponseBodyInfo = (routeInfo: any, parsedSchemas: any) => {
    const { produces, operationId, responses } = routeInfo;

    const contentTypes = this.getContentTypes(responses, [
      ...(produces || []),
      routeInfo['x-accepts'],
    ]);

    const responseInfos = this.getRequestInfoTypes({
      requestInfos: responses,
      parsedSchemas,
      operationId,
      defaultType: this.config.defaultResponseType,
    });

    const successResponse = responseInfos.find((response) => response.isSuccess);
    const errorResponses = responseInfos.filter(
      (response) => !response.isSuccess && response.type !== this.config.Ts.Keyword.Any,
    );

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const handleResponseHeaders = (src: any) => {
      if (!src) {
        return 'headers: {},';
      }
      const headerTypes = Object.fromEntries(
        Object.entries(src).map(([k, v]) => {
          return [k, this.schemaUtils.getSchemaType(v)];
        }),
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
        response.headers,
      )} config: {} }`,
            ),
          ) || this.config.Ts.Keyword.Any,
      },
    };
  };

  convertRouteParamsIntoObject = (params: any) => {
    return reduce(
      params,
      (objectSchema, schemaPart) => {
        if (!schemaPart || !schemaPart.name) {
          return objectSchema;
        }

        let usageName = `${schemaPart.name}`;

        if (usageName.includes('.')) {
          usageName = camelCase(usageName);
        }

        return {
          ...objectSchema,
          properties: {
            ...objectSchema.properties,
            [usageName]: {
              ...schemaPart,
              ...schemaPart.schema,
              $origName: schemaPart.name,
              name: usageName,
            },
          },
        };
      },
      {
        properties: {},
        type: 'object',
      },
    );
  };

  getRequestBodyInfo = (routeInfo: any, routeParams: any, parsedSchemas: any, routeName: any) => {
    const { requestBody, consumes, requestBodyName, operationId } = routeInfo;
    let schema = null;
    let content: any = null;

    const contentTypes = this.getContentTypes(
      [requestBody],
      [...(consumes || []), routeInfo['x-contentType']],
    );
    let contentKind = this.getContentKind(contentTypes);

    let typeName = null;

    if (this.config.extractRequestBody) {
      typeName = this.schemaUtils.resolveTypeName(routeName.usage, {
        suffixes: this.config.extractingOptions.requestBodySuffix,
        resolver: this.config.extractingOptions.requestBodyNameResolver,
      });
    }

    if (routeParams.formData.length > 0) {
      contentKind = CONTENT_KIND.FORM_DATA;
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
        }),
      );

      // TODO: Refactor that.
      // It needed for cases when swagger schema is not declared request body type as form data
      // but request body data type contains form data types like File
      if (this.FORM_DATA_TYPES.some((dataType: any) => includes(content, `: ${dataType}`))) {
        contentKind = CONTENT_KIND.FORM_DATA;
      }
    }

    if (schema && !schema.$ref && this.config.extractRequestBody) {
      schema = this.schemaParserFabric.createParsedComponent({
        schema,
        typeName,
        schemaPath: [operationId],
      });
      content = this.schemaParserFabric.getInlineParseContent({
        $ref: schema.$ref,
      });
    }

    return {
      paramName: requestBodyName || (requestBody && requestBody.name) || DEFAULT_BODY_ARG_NAME,
      contentTypes,
      contentKind,
      schema,
      type: content,
      required: requestBody && (requestBody.required === undefined || !!requestBody.required),
    };
  };

  createRequestParamsSchema = ({
    queryParams,
    queryObjectSchema,
    pathArgsSchemas,
    extractRequestParams,
    routeName,
  }: any) => {
    if (!queryParams || queryParams.length === 0) {
      return null;
    }

    const pathParams = reduce(
      pathArgsSchemas,
      (acc: any, pathArgSchema) => {
        if (pathArgSchema.name) {
          acc[pathArgSchema.name] = {
            ...pathArgSchema,
            in: 'path',
          };
        }

        return acc;
      },
      {},
    );

    const fixedQueryParams = reduce(
      get(queryObjectSchema, 'properties', {}),
      (acc: any, property, name) => {
        if (name && isObject(property)) {
          acc[name] = {
            ...property,
            in: 'query',
          };
        }

        return acc;
      },
      {},
    );

    const schema = {
      ...queryObjectSchema,
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

  extractResponseBodyIfItNeeded = (routeInfo: any, responseBodyInfo: any, routeName: any) => {
    if (
      responseBodyInfo.responses.length > 0 &&
      responseBodyInfo.success &&
      responseBodyInfo.success.schema
    ) {
      const typeName = this.schemaUtils.resolveTypeName(routeName.usage, {
        suffixes: this.config.extractingOptions.responseBodySuffix,
        resolver: this.config.extractingOptions.responseBodyNameResolver,
      });

      const idx = responseBodyInfo.responses.indexOf(responseBodyInfo.success.schema);

      const successResponse = responseBodyInfo.success;

      if (successResponse.schema && !successResponse.schema.$ref) {
        const schema = this.getSchemaFromRequestType(successResponse.schema);
        successResponse.schema = this.schemaParserFabric.createParsedComponent({
          schema,
          typeName,
          schemaPath: [routeInfo.operationId],
        });
        successResponse.type = this.schemaParserFabric.getInlineParseContent({
          $ref: successResponse.schema.$ref,
        });

        if (idx > -1) {
          assign(responseBodyInfo.responses[idx], {
            ...successResponse.schema,
            type: successResponse.type,
          });
        }
      }
    }
  };

  extractResponseErrorIfItNeeded = (routeInfo: any, responseBodyInfo: any, routeName: any) => {
    if (
      responseBodyInfo.responses.length > 0 &&
      responseBodyInfo.error.schemas &&
      responseBodyInfo.error.schemas.length > 0
    ) {
      const typeName = this.schemaUtils.resolveTypeName(routeName.usage, {
        suffixes: this.config.extractingOptions.responseErrorSuffix,
        resolver: this.config.extractingOptions.responseErrorNameResolver,
      });

      const errorSchemas = responseBodyInfo.error.schemas
        .map(this.getSchemaFromRequestType)
        .filter(Boolean);

      if (errorSchemas.length === 0) {
        return;
      }

      const schema = this.schemaParserFabric.parseSchema(
        {
          oneOf: errorSchemas,
          title: errorSchemas
            .map((schema: any) => schema.title)
            .filter(Boolean)
            .join(' '),
          description: errorSchemas
            .map((schema: any) => schema.description)
            .filter(Boolean)
            .join('\n'),
        },
        null,
        [routeInfo.operationId],
      );
      const component = this.schemaComponentsMap.createComponent(
        this.schemaComponentsMap.createRef(['components', 'schemas', typeName]),
        { ...schema },
      );
      responseBodyInfo.error.schemas = [component];
      responseBodyInfo.error.type = this.typeNameFormatter.format(component.typeName);
    }
  };

  getRouteName = (rawRouteInfo: any) => {
    const { moduleName } = rawRouteInfo;
    const { routeNameDuplicatesMap, templatesToRender } = this.config as any;
    const routeNameTemplate = templatesToRender.routeName;

    const routeNameFromTemplate = this.templatesWorker.renderTemplate(routeNameTemplate, {
      routeInfo: rawRouteInfo,
    });

    const routeName =
      this.config.hooks.onFormatRouteName(rawRouteInfo, routeNameFromTemplate) ||
      routeNameFromTemplate;

    const duplicateIdentifier = `${moduleName}|${routeName}`;

    if (routeName && routeNameDuplicatesMap.has(duplicateIdentifier)) {
      routeNameDuplicatesMap.set(
        duplicateIdentifier,
        routeNameDuplicatesMap.get(duplicateIdentifier) + 1,
      );

      this.logger.warn(
        `Module "${moduleName}" already has method "${routeName}()"`,
        `\nThis method has been renamed to "${
          routeName + routeNameDuplicatesMap.get(duplicateIdentifier)
        }()" to solve conflict names.`,
      );
    } else {
      routeNameDuplicatesMap.set(duplicateIdentifier, 1);
    }

    const duplicates = routeNameDuplicatesMap.get(duplicateIdentifier);

    const routeNameInfo = {
      usage: routeName + (duplicates > 1 ? duplicates : ''),
      original: routeName,
      duplicate: duplicates > 1,
    };

    return this.config.hooks.onCreateRouteName(routeNameInfo, rawRouteInfo) || routeNameInfo;
  };

  parseRouteInfo = (
    rawRouteName: any,
    routeInfo: any,
    method: any,
    usageSchema: any,
    parsedSchemas: any,
  ) => {
    const { security: globalSecurity } = usageSchema;
    const { moduleNameIndex, moduleNameFirstTag, extractRequestParams } = this.config as any;
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
    } = routeInfo as any;
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
      queryParamsFromRouteName,
    );

    const pathArgs = routeParams.path.map((pathArgSchema: any) => ({
      name: pathArgSchema.name,
      optional: !pathArgSchema.required,
      // mark it as any for now, because "getInlineParseContent" breaks type names of extracted enums
      type: this.config.Ts.Keyword.Any,
      description: pathArgSchema.description,
    }));
    const pathArgsNames = pathArgs.map((arg: any) => arg.name);

    const responseBodyInfo = this.getResponseBodyInfo(routeInfo, parsedSchemas);

    const rawRouteInfo = {
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
      routeName,
    );

    const requestParamsSchema = this.createRequestParamsSchema({
      queryParams: routeParams.query,
      pathArgsSchemas: routeParams.path,
      queryObjectSchema,
      extractRequestParams,
      routeName,
    });

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

    const nameResolver = new SpecificArgNameResolver(this.config, this.logger, pathArgsNames);

    const specificArgs = {
      query: queryType
        ? {
            // @ts-ignore
            name: nameResolver.resolve(RESERVED_QUERY_ARG_NAMES),
            optional: this.schemaParserFabric.parseSchema(queryObjectSchema, null, [
              routeName.usage,
            ]).allFieldsAreOptional,
            type: queryType,
          }
        : void 0,
      body: requestBodyInfo.type
        ? {
            // @ts-ignore
            name: nameResolver.resolve([requestBodyInfo.paramName, ...RESERVED_BODY_ARG_NAMES]),
            optional: !requestBodyInfo.required,
            type: requestBodyInfo.type,
          }
        : void 0,
      pathParams: pathType
        ? {
            // @ts-ignore
            name: nameResolver.resolve(RESERVED_PATH_ARG_NAMES),
            optional: this.schemaParserFabric.parseSchema(pathObjectSchema, null, [routeName.usage])
              .allFieldsAreOptional,
            type: pathType,
          }
        : void 0,
      headers: headersType
        ? {
            // @ts-ignore
            name: nameResolver.resolve(RESERVED_HEADER_ARG_NAMES),
            optional: this.schemaParserFabric.parseSchema(headersObjectSchema, null, [
              routeName.usage,
            ]).allFieldsAreOptional,
            type: headersType,
          }
        : void 0,
    };

    for (const [i, pathArg] of pathArgs.entries()) {
      pathArg.type = this.schemaParserFabric.getInlineParseContent(
        routeParams.path[i].schema,
        null,
        [typeName],
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
        path: route,
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

  attachSchema = ({ usageSchema, parsedSchemas }: any) => {
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
          parsedSchemas,
        );
        const processedRouteInfo = this.config.hooks.onCreateRoute(parsedRouteInfo);
        if (processedRouteInfo !== false) {
          const route = processedRouteInfo || parsedRouteInfo;

          if (!this.hasSecurityRoutes && route.security) {
            this.hasSecurityRoutes = route.security;
          }
          if (!this.hasQueryRoutes && route.hasQuery) {
            this.hasQueryRoutes = route.hasQuery;
          }
          if (!this.hasFormDataRoutes && route.hasFormDataParams) {
            this.hasFormDataRoutes = route.hasFormDataParams;
          }

          this.routes.push(route);
        }
      });
    });
  };

  getGroupedRoutes = () => {
    const groupedRoutes = this.routes.reduce(
      (modules: any, route: any) => {
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
      },
    );

    const routeGroups = reduce(
      groupedRoutes,
      (acc: any, routesGroup, moduleName) => {
        if (moduleName === '$outOfModule') {
          acc.outOfModule = routesGroup;
        } else {
          if (!acc.combined) {
            acc.combined = [];
          }

          acc.combined.push({
            moduleName,
            routes: map(routesGroup, (route) => {
              const { original: originalName, usage: usageName } = route.routeName;

              // TODO: https://github.com/acacode/swagger-typescript-api/issues/152
              // TODO: refactor
              if (
                routesGroup.length > 1 &&
                usageName !== originalName &&
                !some(
                  routesGroup,
                  ({ routeName, id }) => id !== route.id && originalName === routeName.original,
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
      {},
    );

    if (this.config.sortRoutes) {
      if (routeGroups.outOfModule) {
        routeGroups.outOfModule = this.sortRoutes(routeGroups.outOfModule);
      }
      if (routeGroups.combined) {
        each(routeGroups.combined, (routeGroup) => {
          routeGroup.routes = this.sortRoutes(routeGroup.routes);
        });
      }
    }

    return routeGroups;
  };

  sortRoutes = (routes: any) => {
    return slice(routes).sort((routeA: any, routeB: any) =>
      routeA.routeName.usage.localeCompare(routeB.routeName.usage),
    );
  };
}

export { SchemaRoutes };
