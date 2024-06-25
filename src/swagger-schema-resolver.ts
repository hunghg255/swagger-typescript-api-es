import yaml from 'js-yaml';
import { cloneDeep, compact, each, find, get, merge, uniq } from 'lodash-es';
import pc from 'picocolors';
import converter from 'swagger2openapi';

import { Request } from './util/request';

class SwaggerSchemaResolver {
  /**
   * @type {CodeGenConfig}
   */
  config;
  /**
   * @type {Logger}
   */
  logger;
  /**
   * @type {FileSystem}
   */
  fileSystem;
  /**
   * @type {Request}
   */
  request;

  constructor({ config, logger, fileSystem }: any) {
    this.config = config;
    this.logger = logger;
    this.fileSystem = fileSystem;
    this.request = new Request(config, logger);
  }

  /**
   *
   * @returns {Promise<{usageSchema: Record<string, *>, originalSchema: Record<string, *>}>}
   */
  async create() {
    const { spec, patch, input, url, disableStrictSSL, disableProxy, authorizationToken } = this
      .config as any;

    if (this.config.spec) {
      return await this.convertSwaggerObject(spec, { patch });
    }

    const swaggerSchemaFile = await this.fetchSwaggerSchemaFile(
      input,
      url,
      disableStrictSSL,
      disableProxy,
      authorizationToken,
    );
    const swaggerSchemaObject = this.processSwaggerSchemaFile(swaggerSchemaFile);
    return await this.convertSwaggerObject(swaggerSchemaObject, { patch });
  }

  /**
   *
   * @param swaggerSchema {Record<string, any>}
   * @param converterOptions {{ patch?: boolean }}
   * @returns {Promise<{ usageSchema: Record<string, any>, originalSchema: Record<string, any>}>}
   */
  convertSwaggerObject(swaggerSchema: any, converterOptions: any) {
    return new Promise((resolve) => {
      const result = cloneDeep(swaggerSchema);

      result.info = merge(
        {
          title: 'No title',
          version: '',
        },
        result.info,
      );

      if (result.openapi) {
        resolve({
          usageSchema: result,
          originalSchema: cloneDeep(result),
        });
      } else {
        result.paths = merge({}, result.paths);

        converter.convertObj(
          result,
          {
            ...converterOptions,
            warnOnly: true,
            refSiblings: 'preserve',
            rbname: 'requestBodyName',
          },
          (err, options) => {
            const parsedSwaggerSchema = get(err, 'options.openapi', get(options, 'openapi'));
            if (!parsedSwaggerSchema && err) {
              throw new Error(err as any);
            }
            this.config.update({ convertedFromSwagger2: true });
            resolve({
              usageSchema: parsedSwaggerSchema,
              originalSchema: result,
            });
          },
        );
      }
    });
  }

  getSwaggerSchemaByPath = (pathToSwagger: any) => {
    this.logger.log(`Try to get swagger by path "${pathToSwagger}"`);
    return this.fileSystem.getFileContent(pathToSwagger);
  };

  async fetchSwaggerSchemaFile(
    pathToSwagger: any,
    urlToSwagger: any,
    disableStrictSSL: any,
    disableProxy: any,
    authToken: any,
  ) {
    if (this.fileSystem.pathIsExist(pathToSwagger)) {
      return this.getSwaggerSchemaByPath(pathToSwagger);
    } else {
      this.logger.log(`Try to get swagger by URL ${pc.cyan(`"${urlToSwagger}"`)}`);
      return await this.request.download({
        url: urlToSwagger,
        disableStrictSSL,
        authToken,
        disableProxy,
      });
    }
  }

  processSwaggerSchemaFile(file: any) {
    if (typeof file !== 'string') {
      return file;
    }

    try {
      return JSON.parse(file);
    } catch {
      return yaml.load(file);
    }
  }

  fixSwaggerSchema({ usageSchema, originalSchema }: any) {
    const usagePaths = get(usageSchema, 'paths');
    const originalPaths = get(originalSchema, 'paths');

    // walk by routes
    each(usagePaths, (usagePathObject, route) => {
      const originalPathObject = get(originalPaths, route);

      // walk by methods
      each(usagePathObject, (usageRouteInfo, methodName) => {
        const originalRouteInfo = get(originalPathObject, methodName);
        const usageRouteParams = get(usageRouteInfo, 'parameters', []);
        const originalRouteParams = get(originalRouteInfo, 'parameters', []);

        if (typeof usageRouteInfo === 'object') {
          usageRouteInfo.consumes = uniq(
            compact([...(usageRouteInfo.consumes || []), ...(originalRouteInfo.consumes || [])]),
          );
          usageRouteInfo.produces = uniq(
            compact([...(usageRouteInfo.produces || []), ...(originalRouteInfo.produces || [])]),
          );
        }

        each(originalRouteParams, (originalRouteParam) => {
          const existUsageParam = find(
            usageRouteParams,
            (param) => originalRouteParam.in === param.in && originalRouteParam.name === param.name,
          );
          if (!existUsageParam) {
            usageRouteParams.push(originalRouteParam);
          }
        });
      });
    });
  }
}

export { SwaggerSchemaResolver };
