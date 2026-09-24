import path from 'node:path';

import { cloneDeep, get } from 'lodash-es';

import type { SwaggerSchemaResolver } from './swagger-schema-resolver';
import type { Logger } from './util/logger';

/** `SwaggerSchemaResolver` methods used to load schemas of file refs */
export type SchemaWalkerSchemaResolver = Pick<
  SwaggerSchemaResolver,
  'getSwaggerSchemaByPath' | 'processSwaggerSchemaFile'
>;

export interface SchemaWalkerDeps {
  /** not used yet */
  config?: object;
  logger?: Pick<Logger, 'debug'> | null;
  swaggerSchemaResolver?: SchemaWalkerSchemaResolver | null;
}

// TODO: WIP
// this class will be needed to walk by schema everywhere
class SchemaWalker {
  logger: Pick<Logger, 'debug'> | null | undefined;
  config: object | undefined;
  swaggerSchemaResolver: SchemaWalkerSchemaResolver | null | undefined;
  /** schema name (`$usage`, `$original`, file path) -> schema */
  schemas = new Map<string, unknown>();
  /** ref -> resolved value */
  caches = new Map<string, unknown>();

  constructor({ config, logger, swaggerSchemaResolver }: SchemaWalkerDeps) {
    this.logger = logger;
    this.config = config;
    this.swaggerSchemaResolver = swaggerSchemaResolver;
  }

  addSchema = (name: string, schema: unknown) => {
    this.schemas.set(name, cloneDeep(schema));
  };

  /**
   * @returns value by the ref (`#/components/schemas/Pet`, `./other.json#/components/schemas/Pet`)
   */
  findByRef = (ref: string): unknown => {
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
      let swaggerSchemaObject: unknown;

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

  _isLocalRef = (ref: string) => {
    return ref.startsWith('#');
  };

  _isRemoteRef = (ref: string) => {
    return ref.startsWith('http://') || ref.startsWith('https://');
  };

  /**
   * @param schema
   * @param ref JSON pointer, e.g. "#/components/schemas/Pet" or "/components/schemas/Pet"
   * @param [cacheKey]
   */
  _getRefDataFromSchema = (schema: unknown, ref: string, cacheKey = ref): unknown => {
    const refPath = ref
      .replace(/^#/, '')
      .split('/')
      .filter(Boolean)
      // JSON pointer escaping (RFC 6901)
      .map((part: string) => decodeURIComponent(part).replaceAll('~1', '/').replaceAll('~0', '~'));
    const refData: unknown = refPath.length > 0 ? get(schema, refPath) : schema;
    if (refData) {
      this.caches.set(cacheKey, refData);
    }
    return refData;
  };
}

export { SchemaWalker };
