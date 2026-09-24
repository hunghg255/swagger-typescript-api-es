import path from 'node:path';

import { cloneDeep, get } from 'lodash-es';

// TODO: WIP
// this class will be needed to walk by schema everywhere
class SchemaWalker {
  /** @type {Logger} */
  logger;
  /** @type {CodeGenConfig} */
  config;
  /** @type {SwaggerSchemaResolver} */
  swaggerSchemaResolver: any;
  /** @type {Map<string, Record<string, any>>} */
  schemas = new Map();
  /** @type {Map<string, Record<string, any>>} */
  caches = new Map();

  constructor({ config, logger, swaggerSchemaResolver }: any) {
    this.logger = logger;
    this.config = config;
    this.swaggerSchemaResolver = swaggerSchemaResolver;
  }

  /**
   * @param name {string}
   * @param schema {Record<string, any>}
   */
  addSchema = (name: any, schema: any) => {
    this.schemas.set(name, cloneDeep(schema));
  };

  /**
   * @param ref {string}
   * @returns {any}
   */
  findByRef = (ref: any) => {
    this.logger?.debug('Try to resolve ref by path', ref);

    if (this.caches.has(ref)) {
      return this.caches.get(ref);
    }

    const schemas = [...this.schemas.values()];
    if (this._isLocalRef(ref)) {
      for (const schema of schemas) {
        const refData = this._getRefDataFromSchema(schema, ref);
        if (refData) {
          return refData;
        }
      }
    } else if (this._isRemoteRef(ref)) {
      this.logger?.debug('Remote refs not supported', ref);
      return null;
    } else {
      const [address, refPath = ''] = ref.split('#');
      let swaggerSchemaObject;

      if (this.schemas.has(address)) {
        swaggerSchemaObject = this.schemas.get(address);
      } else {
        if (!this.swaggerSchemaResolver) {
          this.logger?.debug('Unable to resolve file ref without schema resolver', ref);
          return null;
        }
        const pathToSchema = path.resolve(process.cwd(), address);
        const swaggerSchemaFile = this.swaggerSchemaResolver.getSwaggerSchemaByPath(pathToSchema);
        swaggerSchemaObject =
          this.swaggerSchemaResolver.processSwaggerSchemaFile(swaggerSchemaFile);
        this.schemas.set(address, swaggerSchemaObject);
      }

      return this._getRefDataFromSchema(swaggerSchemaObject, refPath, ref);
    }

    return null;
  };

  _isLocalRef = (ref: any) => {
    return ref.startsWith('#');
  };

  _isRemoteRef = (ref: any) => {
    return ref.startsWith('http://') || ref.startsWith('https://');
  };

  /**
   * @param schema {Record<string, any>}
   * @param ref {string} JSON pointer, e.g. "#/components/schemas/Pet" or "/components/schemas/Pet"
   * @param [cacheKey] {string}
   */
  _getRefDataFromSchema = (schema: any, ref: any, cacheKey = ref) => {
    const refPath = ref
      .replace(/^#/, '')
      .split('/')
      .filter(Boolean)
      // JSON pointer escaping (RFC 6901)
      .map((part: string) => decodeURIComponent(part).replaceAll('~1', '/').replaceAll('~0', '~'));
    const refData = refPath.length > 0 ? get(schema, refPath) : schema;
    if (refData) {
      this.caches.set(cacheKey, refData);
    }
    return refData;
  };
}

export { SchemaWalker };
