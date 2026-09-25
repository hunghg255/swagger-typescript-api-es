import { isPlainObject } from 'es-toolkit/compat';

import type { OpenAPIV3Document, OperationObject, SwaggerV2Document } from '../types/openapi';

/** `value` is a non-null object (including arrays and class instances) */
export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

/** `value` is a non-null object which is not an array */
export const isObjectRecord = (value: unknown): value is Record<string, unknown> =>
  isRecord(value) && !Array.isArray(value);

// #region parsed documents
// Only the kind of a value is checked, the structure of a parsed (JSON/YAML) document is trusted.

/** an OpenAPI 3.x document (`openapi` is set) */
export const isOpenAPIV3Document = (value: unknown): value is OpenAPIV3Document =>
  isObjectRecord(value) && !!value.openapi;

/** a Swagger 2.0 document (`swagger` is set) */
export const isSwaggerV2Document = (value: unknown): value is SwaggerV2Document =>
  isObjectRecord(value) && !!value.swagger;

/** an operation of a path item (a plain object) */
export const isOperationObject = (value: unknown): value is OperationObject => isPlainObject(value);

// #endregion
