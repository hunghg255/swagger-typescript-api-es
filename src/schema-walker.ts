/* eslint-disable unicorn/no-null */

import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';

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

  constructor({ config, logger }: any) {
    this.logger = logger;
    this.config = config;
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
    this.logger.debug('try to resolve ref by path', ref);

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
      this.logger.debug('remote refs not supported', ref);
      return null;
    } else {
      // @ts-ignore
      const [address, path] = path.split('#');
      let swaggerSchemaObject;

      if (this.schemas.has(address)) {
        swaggerSchemaObject = this.schemas.get(address);
      } else {
        const pathToSchema = path.resolve(process.cwd(), address);
        const swaggerSchemaFile = this.swaggerSchemaResolver.getSwaggerSchemaByPath(pathToSchema);
        swaggerSchemaObject =
          this.swaggerSchemaResolver.processSwaggerSchemaFile(swaggerSchemaFile);
        this.schemas.set(address, swaggerSchemaObject);
      }

      return this._getRefDataFromSchema(swaggerSchemaObject, path);
    }
  };

  _isLocalRef = (ref: any) => {
    return ref.startsWith('#');
  };

  _isRemoteRef = (ref: any) => {
    return ref.startsWith('http://') || ref.startsWith('https://');
  };

  _getRefDataFromSchema = (schema: any, ref: any) => {
    const path = ref.replace('#', '').split('/');
    const refData = get(schema, path);
    if (refData) {
      this.caches.set(ref, refData);
    }
    return refData;
  };
}

export { SchemaWalker };
