/**
 * OpenAPI 3.0 / 3.1 and Swagger 2.0 document types.
 *
 * The types describe what the generator reads, so they are intentionally lenient:
 * - vendor extensions (`x-*`) are allowed everywhere as `unknown`
 * - string literal unions also accept other strings, so specs imported from JSON
 *   (where TypeScript widens literals to `string`) stay assignable
 * - `SchemaObject` also covers `$ref` schemas and a few keys added by the generator itself
 */

/** `x-*` vendor extensions */
export type VendorExtensions = { [extension: `x-${string}`]: unknown };

/** a literal union which still accepts other strings */
export type LooseString<T extends string> = T | (string & {});

export type SchemaTypeName = LooseString<
  'string' | 'number' | 'integer' | 'boolean' | 'object' | 'array' | 'null' | 'file'
>;

export interface ReferenceObject extends VendorExtensions {
  $ref: string;
  /** OAS 3.1 */
  summary?: string;
  /** OAS 3.1 */
  description?: string;
}

export type MaybeRef<T> = T | ReferenceObject;

export interface ExternalDocumentationObject extends VendorExtensions {
  url: string;
  description?: string;
}

export interface XmlObject extends VendorExtensions {
  name?: string;
  namespace?: string;
  prefix?: string;
  attribute?: boolean;
  wrapped?: boolean;
}

export interface DiscriminatorObject extends VendorExtensions {
  propertyName: string;
  /** `{ mappingKey: "#/components/schemas/Foo" }` */
  mapping?: Record<string, string>;
}

/**
 * JSON schema (OAS 3.0 schema object + OAS 3.1 / JSON schema bits + Swagger 2 bits).
 * `$ref` schemas are described by the same type (`{ $ref: "#/components/schemas/Foo" }`).
 */
export interface SchemaObject extends VendorExtensions {
  $ref?: string;
  /** OAS 3.1: `type: ["string", "null"]` */
  type?: SchemaTypeName | SchemaTypeName[];
  format?: string;
  title?: string;
  description?: string;
  default?: unknown;
  example?: unknown;
  /** OAS 3.1 */
  examples?: unknown;

  enum?: unknown[];
  /** OAS 3.1 */
  const?: unknown;

  /** OAS 3.0 */
  nullable?: boolean;
  /** Swagger 2 / OAS 3.0 vendor extension */
  'x-nullable'?: boolean;
  'x-enumNames'?: string[];
  'x-enumnames'?: string[];
  'x-enum-varnames'?: string[];
  /** not an extension, but some generators emit it */
  xEnumNames?: string[];
  'x-omitempty'?: boolean;

  readOnly?: boolean;
  writeOnly?: boolean;
  deprecated?: boolean;

  /**
   * `string[]` for object schemas.
   * `boolean` for Swagger 2 parameters merged with their schema (`{ ...parameter, ...parameter.schema }`)
   */
  required?: string[] | boolean;
  properties?: Record<string, SchemaObject>;
  additionalProperties?: boolean | SchemaObject;
  patternProperties?: Record<string, SchemaObject>;
  propertyNames?: SchemaObject;
  minProperties?: number;
  maxProperties?: number;

  /** array item schema, or a list of schemas for a tuple */
  items?: SchemaObject | SchemaObject[];
  /** OAS 3.1 tuple */
  prefixItems?: SchemaObject[];
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;

  allOf?: SchemaObject[];
  oneOf?: SchemaObject[];
  anyOf?: SchemaObject[];
  not?: SchemaObject;
  discriminator?: DiscriminatorObject;

  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean | number;
  minimum?: number;
  exclusiveMinimum?: boolean | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;

  xml?: XmlObject;
  externalDocs?: ExternalDocumentationObject;

  // #region keys added by the generator

  /** required keys of a referenced schema (`UtilRequiredKeys<Type, "a" | "b">`) */
  $$requiredKeys?: string[];
  /** original name of a request param (`a.b` -> `aB`) */
  $origName?: string;
  /** content type of a request/response schema (see `SchemaRoutes.getSchemaFromRequestType`) */
  dataType?: string;
  /** schema of a component created by the generator (e.g. discriminator mapping type) */
  internal?: boolean;
  /** generic arguments of a generated type (`type Foo<Key, Type> = ...`) */
  genericArgs?: { name: string; default?: string }[];

  // #endregion
}

export type ParameterLocation = LooseString<
  'path' | 'query' | 'header' | 'cookie' | 'formData' | 'body'
>;

export interface ExampleObject extends VendorExtensions {
  summary?: string;
  description?: string;
  value?: unknown;
  externalValue?: string;
}

export interface EncodingObject extends VendorExtensions {
  contentType?: string;
  headers?: Record<string, MaybeRef<HeaderObject>>;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
}

export interface MediaTypeObject extends VendorExtensions {
  schema?: SchemaObject;
  example?: unknown;
  examples?: Record<string, MaybeRef<ExampleObject>>;
  encoding?: Record<string, EncodingObject>;
}

/** `{ "application/json": { schema } }` */
export type ContentObject = Record<string, MediaTypeObject>;

interface ParameterBaseObject extends VendorExtensions {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
  schema?: SchemaObject;
  example?: unknown;
  examples?: Record<string, MaybeRef<ExampleObject>>;
  content?: ContentObject;

  // #region Swagger 2 (non body) parameter fields
  type?: SchemaTypeName;
  format?: string;
  items?: SchemaObject;
  collectionFormat?: string;
  enum?: unknown[];
  default?: unknown;
  // #endregion
}

export interface ParameterObject extends ParameterBaseObject {
  name: string;
  in: ParameterLocation;
}

export type HeaderObject = ParameterBaseObject;

export interface RequestBodyObject extends VendorExtensions {
  description?: string;
  content: ContentObject;
  required?: boolean;
  /** Swagger 2 body parameter name (`swagger2openapi` option `rbname`) */
  name?: string;
}

export interface LinkObject extends VendorExtensions {
  operationRef?: string;
  operationId?: string;
  parameters?: Record<string, unknown>;
  requestBody?: unknown;
  description?: string;
  server?: ServerObject;
}

export interface ResponseObject extends VendorExtensions {
  description?: string;
  headers?: Record<string, MaybeRef<HeaderObject>>;
  content?: ContentObject;
  links?: Record<string, MaybeRef<LinkObject>>;
  /** Swagger 2 */
  schema?: SchemaObject;
}

/** `{ "200": {...}, "default": {...} }` */
export type ResponsesObject = Record<string, MaybeRef<ResponseObject>>;

export type SecurityRequirementObject = Record<string, string[]>;

export interface ServerVariableObject extends VendorExtensions {
  enum?: string[];
  default: string;
  description?: string;
}

export interface ServerObject extends VendorExtensions {
  url: string;
  description?: string;
  variables?: Record<string, ServerVariableObject>;
}

export type CallbackObject = Record<string, PathItemObject>;

export interface OperationObject extends VendorExtensions {
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
  operationId?: string;
  parameters?: MaybeRef<ParameterObject>[];
  requestBody?: MaybeRef<RequestBodyObject>;
  responses?: ResponsesObject;
  callbacks?: Record<string, MaybeRef<CallbackObject>>;
  deprecated?: boolean;
  security?: SecurityRequirementObject[];
  servers?: ServerObject[];

  // #region Swagger 2 (kept in the converted schema by `SwaggerSchemaResolver.fixSwaggerSchema`)
  consumes?: string[];
  produces?: string[];
  schemes?: string[];
  /** body parameter name (`swagger2openapi` option `rbname`) */
  requestBodyName?: string;
  // #endregion
}

export type HttpMethod = LooseString<
  'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace'
>;

export interface PathItemObject extends VendorExtensions {
  $ref?: string;
  summary?: string;
  description?: string;
  get?: OperationObject;
  put?: OperationObject;
  post?: OperationObject;
  delete?: OperationObject;
  options?: OperationObject;
  head?: OperationObject;
  patch?: OperationObject;
  trace?: OperationObject;
  servers?: ServerObject[];
  parameters?: MaybeRef<ParameterObject>[];
}

/** `{ "/pets/{id}": {...} }` */
export type PathsObject = Record<string, PathItemObject>;

export interface OAuthFlowObject extends VendorExtensions {
  authorizationUrl?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  scopes: Record<string, string>;
}

export interface SecuritySchemeObject extends VendorExtensions {
  type: LooseString<'apiKey' | 'http' | 'oauth2' | 'openIdConnect' | 'mutualTLS' | 'basic'>;
  description?: string;
  name?: string;
  in?: LooseString<'query' | 'header' | 'cookie'>;
  scheme?: string;
  bearerFormat?: string;
  flows?: {
    implicit?: OAuthFlowObject;
    password?: OAuthFlowObject;
    clientCredentials?: OAuthFlowObject;
    authorizationCode?: OAuthFlowObject;
  };
  openIdConnectUrl?: string;
  /** Swagger 2 */
  flow?: string;
  authorizationUrl?: string;
  tokenUrl?: string;
  scopes?: Record<string, string>;
}

export interface ComponentsObject extends VendorExtensions {
  schemas?: Record<string, SchemaObject>;
  responses?: Record<string, MaybeRef<ResponseObject>>;
  parameters?: Record<string, MaybeRef<ParameterObject>>;
  examples?: Record<string, MaybeRef<ExampleObject>>;
  requestBodies?: Record<string, MaybeRef<RequestBodyObject>>;
  headers?: Record<string, MaybeRef<HeaderObject>>;
  securitySchemes?: Record<string, MaybeRef<SecuritySchemeObject>>;
  links?: Record<string, MaybeRef<LinkObject>>;
  callbacks?: Record<string, MaybeRef<CallbackObject>>;
  /** OAS 3.1 */
  pathItems?: Record<string, MaybeRef<PathItemObject>>;
}

/** name of a `#/components/*` section */
export type ComponentName = LooseString<keyof Omit<ComponentsObject, `x-${string}`>>;

export interface ContactObject extends VendorExtensions {
  name?: string;
  url?: string;
  email?: string;
}

export interface LicenseObject extends VendorExtensions {
  name: string;
  url?: string;
  /** OAS 3.1 */
  identifier?: string;
}

/**
 * `title` and `version` are required by the specification,
 * the generator falls back to `"No title"` / `""` when they are missing
 */
export interface InfoObject extends VendorExtensions {
  title?: string;
  version?: string;
  description?: string;
  termsOfService?: string;
  contact?: ContactObject;
  license?: LicenseObject;
  /** OAS 3.1 */
  summary?: string;
}

export interface TagObject extends VendorExtensions {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
}

/** OpenAPI 3.0 / 3.1 document */
export interface OpenAPIV3Document extends VendorExtensions {
  openapi: string;
  info?: InfoObject;
  servers?: ServerObject[];
  paths?: PathsObject;
  components?: ComponentsObject;
  security?: SecurityRequirementObject[];
  tags?: TagObject[];
  externalDocs?: ExternalDocumentationObject;
  /** OAS 3.1 */
  webhooks?: Record<string, MaybeRef<PathItemObject>>;
  /** OAS 3.1 */
  jsonSchemaDialect?: string;

  // #region Swagger 2 (not present in OpenAPI 3 documents, read by `createApiConfig`)
  host?: string;
  basePath?: string;
  // #endregion
}

/** Swagger 2.0 document */
export interface SwaggerV2Document extends VendorExtensions {
  swagger: string;
  info?: InfoObject;
  host?: string;
  basePath?: string;
  schemes?: string[];
  consumes?: string[];
  produces?: string[];
  paths?: PathsObject;
  definitions?: Record<string, SchemaObject>;
  parameters?: Record<string, ParameterObject>;
  responses?: Record<string, ResponseObject>;
  securityDefinitions?: Record<string, SecuritySchemeObject>;
  security?: SecurityRequirementObject[];
  tags?: TagObject[];
  externalDocs?: ExternalDocumentationObject;
}

/** an OpenAPI 3.x or Swagger 2.0 document (e.g. `IOptions.spec`) */
export type OpenAPIDocument = OpenAPIV3Document | SwaggerV2Document;

/** result of `SwaggerSchemaResolver.create()` */
export interface ResolvedSwaggerSchema {
  /** OpenAPI 3 document used for generation (converted from Swagger 2 if needed) */
  usageSchema: OpenAPIV3Document;
  /** the input document (Swagger 2 or OpenAPI 3) */
  originalSchema: OpenAPIDocument;
}
