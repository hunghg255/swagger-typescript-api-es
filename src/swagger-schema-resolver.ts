import path from 'node:path';

import yaml from 'js-yaml';
import { cloneDeep, compact, each, find, get, merge, uniq } from 'lodash-es';
import pc from 'picocolors';
import converter from 'swagger2openapi';
import type { ConvertInputOptions } from 'swagger2openapi';

import type { CodeGenConfig } from './configuration';
import type {
  MaybeRef,
  OperationObject,
  ParameterObject,
  ResolvedSwaggerSchema,
} from './types/openapi';
import type { FileSystem } from './util/file-system';
import type { Logger } from './util/logger';
import { Request } from './util/request';
import {
  isOpenAPIV3Document,
  isOperationObject,
  isRecord,
  isSwaggerV2Document,
} from './util/type-guards';

/** options of the swagger 2 -> OpenAPI 3 conversion */
export interface ConverterOptions {
  /** fix up small errors in the swagger source definition */
  patch?: boolean;
}

/**
 * `swagger2openapi.convertObj` accepting every object:
 * unsupported documents are rejected by the converter itself.
 */
interface SwaggerConverter {
  convertObj(
    schema: object,
    options: Partial<ConvertInputOptions>,
    callback: (error: unknown, options: unknown) => void
  ): void;
}

const swaggerConverter: SwaggerConverter = converter;

/** config fields used by `SwaggerSchemaResolver` */
export type SwaggerSchemaResolverConfig = Pick<
  CodeGenConfig,
  | 'spec'
  | 'patch'
  | 'input'
  | 'url'
  | 'disableStrictSSL'
  | 'disableProxy'
  | 'authorizationToken'
  | 'requestOptions'
  | 'update'
>;

export interface SwaggerSchemaResolverDeps {
  config: SwaggerSchemaResolverConfig;
  logger: Pick<Logger, 'log' | 'warn'>;
  fileSystem: Pick<FileSystem, 'getFileContent' | 'pathIsExist'>;
}

/** `in` + `name` of a parameter (`undefined` for `$ref` parameters) */
const getParameterLocation = (parameter: MaybeRef<ParameterObject>) =>
  'in' in parameter ? [parameter.in, parameter.name] : [undefined, undefined];

class SwaggerSchemaResolver {
  config: SwaggerSchemaResolverConfig;
  logger: SwaggerSchemaResolverDeps['logger'];
  fileSystem: SwaggerSchemaResolverDeps['fileSystem'];
  request: Request;

  constructor({ config, logger, fileSystem }: SwaggerSchemaResolverDeps) {
    this.config = config;
    this.logger = logger;
    this.fileSystem = fileSystem;
    this.request = new Request(config, logger);
  }

  async create(): Promise<ResolvedSwaggerSchema> {
    const { spec, patch, input, url, disableStrictSSL, disableProxy, authorizationToken } =
      this.config;

    if (this.config.spec) {
      return await this.convertSwaggerObject(spec, { patch });
    }

    const swaggerSchemaFile = await this.fetchSwaggerSchemaFile(
      input,
      url,
      disableStrictSSL,
      disableProxy,
      authorizationToken
    );
    const swaggerSchemaObject = this.processSwaggerSchemaFile(swaggerSchemaFile);
    return await this.convertSwaggerObject(swaggerSchemaObject, { patch });
  }

  /**
   * Converts a Swagger 2 document to OpenAPI 3 (OpenAPI 3 documents are used as is).
   */
  convertSwaggerObject(
    swaggerSchema: unknown,
    converterOptions: ConverterOptions
  ): Promise<ResolvedSwaggerSchema> {
    if (!isRecord(swaggerSchema)) {
      throw new Error(`Invalid swagger schema: expected an object, got ${typeof swaggerSchema}`);
    }

    return new Promise((resolve, reject) => {
      const result = cloneDeep(swaggerSchema);

      result.info = merge(
        {
          title: 'No title',
          version: '',
        },
        result.info
      );

      if (isOpenAPIV3Document(result)) {
        resolve({
          usageSchema: result,
          originalSchema: cloneDeep(result),
        });
      } else {
        result.paths = merge({}, result.paths);

        try {
          swaggerConverter.convertObj(
            result,
            {
              ...converterOptions,
              warnOnly: true,
              refSiblings: 'preserve',
              rbname: 'requestBodyName',
            },
            (err, options) => {
              const parsedSwaggerSchema: unknown = get(
                err,
                'options.openapi',
                get(options, 'openapi')
              );
              // the converter accepts swagger 2 documents only
              if (!isOpenAPIV3Document(parsedSwaggerSchema) || !isSwaggerV2Document(result)) {
                reject(
                  err instanceof Error
                    ? err
                    : new Error(
                        `Failed to convert swagger schema to OpenAPI 3${err ? `: ${err}` : ''}`
                      )
                );
                return;
              }
              this.config.update({ convertedFromSwagger2: true });
              resolve({
                usageSchema: parsedSwaggerSchema,
                originalSchema: result,
              });
            }
          );
        } catch (error) {
          reject(error);
        }
      }
    });
  }

  getSwaggerSchemaByPath = (pathToSwagger: string) => {
    this.logger.log(`Try to get swagger by path "${pathToSwagger}"`);
    return this.fileSystem.getFileContent(pathToSwagger);
  };

  async fetchSwaggerSchemaFile(
    pathToSwagger: string | undefined,
    urlToSwagger: string | undefined,
    disableStrictSSL?: boolean,
    disableProxy?: boolean,
    authToken?: string
  ): Promise<string> {
    if (pathToSwagger && this.fileSystem.pathIsExist(pathToSwagger)) {
      return this.getSwaggerSchemaByPath(pathToSwagger);
    }

    // If urlToSwagger is not an HTTP URL, try to read it as a local file
    if (urlToSwagger && !/^https?:\/\//i.test(urlToSwagger)) {
      const resolvedPath = path.resolve(process.cwd(), urlToSwagger);
      if (this.fileSystem.pathIsExist(resolvedPath)) {
        this.logger.log(`Try to get swagger by path "${resolvedPath}"`);
        return this.getSwaggerSchemaByPath(resolvedPath);
      }

      throw new Error(`swagger schema file "${resolvedPath}" does not exist`);
    }

    if (!urlToSwagger) {
      throw new Error(
        pathToSwagger
          ? `swagger schema file "${path.resolve(process.cwd(), pathToSwagger)}" does not exist`
          : 'swagger schema is not specified (use `input`, `url` or `spec`)'
      );
    }

    this.logger.log(`Try to get swagger by URL ${pc.cyan(`"${urlToSwagger}"`)}`);
    return await this.request.download({
      url: urlToSwagger,
      disableStrictSSL,
      authToken,
      disableProxy,
    });
  }

  /**
   * Parses a JSON / YAML document (non-string values are returned as is).
   */
  processSwaggerSchemaFile(file: unknown): unknown {
    if (typeof file !== 'string') {
      return file;
    }

    try {
      return JSON.parse(file);
    } catch {
      return yaml.load(file);
    }
  }

  /**
   * Copies Swagger 2 `consumes` / `produces` and parameters lost by the conversion
   * from the original schema into the usage schema.
   */
  fixSwaggerSchema({
    usageSchema,
    originalSchema,
  }: {
    usageSchema: Pick<ResolvedSwaggerSchema['usageSchema'], 'paths'>;
    originalSchema: Pick<ResolvedSwaggerSchema['originalSchema'], 'paths'>;
  }) {
    const usagePaths = usageSchema.paths;
    const originalPaths = originalSchema.paths;

    // walk by routes
    each(usagePaths, (usagePathObject, route) => {
      const originalPathObject: unknown = get(originalPaths, route);

      // walk by methods
      each(usagePathObject, (usageRouteInfo: unknown, methodName) => {
        // skip path level keys which are not operations (`parameters`, `servers`, ...)
        if (!isOperationObject(usageRouteInfo)) {
          return;
        }

        const originalRouteInfoValue: unknown = get(originalPathObject, methodName);
        const originalRouteInfo: OperationObject = isOperationObject(originalRouteInfoValue)
          ? originalRouteInfoValue
          : {};
        const originalRouteParams = originalRouteInfo.parameters || [];

        usageRouteInfo.consumes = uniq(
          compact([...(usageRouteInfo.consumes || []), ...(originalRouteInfo.consumes || [])])
        );
        usageRouteInfo.produces = uniq(
          compact([...(usageRouteInfo.produces || []), ...(originalRouteInfo.produces || [])])
        );

        each(originalRouteParams, (originalRouteParam) => {
          const usageRouteParams = usageRouteInfo.parameters || [];
          const [originalIn, originalName] = getParameterLocation(originalRouteParam);
          const existUsageParam = find(usageRouteParams, (param) => {
            const [paramIn, paramName] = getParameterLocation(param);
            return originalIn === paramIn && originalName === paramName;
          });
          if (!existUsageParam) {
            // attach the array, so params are not pushed into a throwaway default value
            usageRouteInfo.parameters = [...usageRouteParams, originalRouteParam];
          }
        });
      });
    });
  }
}

export { SwaggerSchemaResolver };
