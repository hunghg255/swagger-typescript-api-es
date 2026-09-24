/**
 * Shapes produced by the generator: components, parsed schemas, model types and routes.
 * These are the objects passed to hooks and templates.
 */
import type { SCHEMA_TYPES } from '../constants';
import type { NameResolver } from '../util/name-resolver';
import type {
  ComponentName,
  ExampleObject,
  HeaderObject,
  HttpMethod,
  LinkObject,
  MaybeRef,
  OperationObject,
  ParameterLocation,
  ParameterObject,
  PathItemObject,
  ReferenceObject,
  RequestBodyObject,
  ResponseObject,
  SchemaObject,
  SecuritySchemeObject,
} from './openapi';

/** `Omit` applied to every member of a union */
export type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

// #region schema types

/** `"array" | "object" | "enum" | "$ref" | "primitive" | "complex" | "discriminator" | "oneOf" | ...` */
export type SchemaType = (typeof SCHEMA_TYPES)[keyof typeof SCHEMA_TYPES];

/** internal schema type chosen by `SchemaUtils.getInternalSchemaType` (key of `SchemaParser._baseSchemaParsers`) */
export type BaseSchemaType =
  | typeof SCHEMA_TYPES.ENUM
  | typeof SCHEMA_TYPES.OBJECT
  | typeof SCHEMA_TYPES.COMPLEX
  | typeof SCHEMA_TYPES.PRIMITIVE
  | typeof SCHEMA_TYPES.DISCRIMINATOR
  | typeof SCHEMA_TYPES.ARRAY;

/** complex schema type chosen by `SchemaUtils.getComplexType` (key of `SchemaParser._complexSchemaParsers`) */
export type ComplexSchemaType =
  | typeof SCHEMA_TYPES.COMPLEX_ONE_OF
  | typeof SCHEMA_TYPES.COMPLEX_ALL_OF
  | typeof SCHEMA_TYPES.COMPLEX_ANY_OF
  | typeof SCHEMA_TYPES.COMPLEX_NOT;

/** `schemaType` of a parsed schema (what the formatters in `SchemaFormatters` are keyed by) */
export type ParsedSchemaType =
  | typeof SCHEMA_TYPES.ENUM
  | typeof SCHEMA_TYPES.OBJECT
  | typeof SCHEMA_TYPES.COMPLEX
  | typeof SCHEMA_TYPES.PRIMITIVE;

// #endregion

// #region parsed schemas

/** one field of a parsed object schema (`ObjectSchemaParser.getObjectSchemaContent`) */
export interface ObjectFieldContent extends Omit<SchemaObject, 'description' | 'required'> {
  /** original property schema */
  $$raw: SchemaObject;
  title?: string;
  description: string;
  isRequired: boolean;
  isNullable?: boolean;
  /** field name (quoted if it is not a valid identifier), missing for `additionalProperties` */
  name?: string;
  /** inline type of the field */
  value?: string;
  /** rendered field: `readonly name?: Type` / `[key: string]: <unknown type>` */
  field: string;
  required?: SchemaObject['required'];
}

/** one member of a parsed enum schema (`EnumSchemaParser`) */
export interface EnumFieldContent {
  key: string;
  /** TS type of the value (`string`, `number`, ...) */
  type: string;
  /** formatted value (`"a"`, `1`, `true`) */
  value: string;
}

/** fields every parser adds to the (spread) source schema */
interface ParsedSchemaCommon extends Omit<SchemaObject, 'type' | 'description' | 'enum'> {
  $parsedSchema: true;
  /** path of type names used to build names of extracted types */
  $schemaPath?: (string | null | undefined)[];
  /** kind of the parsed schema, used to pick a formatter */
  schemaType: ParsedSchemaType;
  /** `"primitive" | "object" | "enum"` */
  type: ParsedSchemaType;
  /** `type` / `interface` / `enum` (values of `config.Ts.Keyword`) */
  typeIdentifier: string;
  /** type name (component name) or `null`/`undefined` for inline schemas */
  name?: string | null;
  description?: string;
  typeName?: string | null;
}

/** primitive, array, tuple and `Record<>` schemas (`PrimitiveSchemaParser`, `ArraySchemaParser`) */
export interface ParsedPrimitiveSchema extends ParsedSchemaCommon {
  schemaType: typeof SCHEMA_TYPES.PRIMITIVE;
  type: typeof SCHEMA_TYPES.PRIMITIVE;
  content: string;
}

/** allOf / oneOf / anyOf / not / discriminator schemas (`ComplexSchemaParser`, `DiscriminatorSchemaParser`) */
export interface ParsedComplexSchema extends ParsedSchemaCommon {
  schemaType: typeof SCHEMA_TYPES.COMPLEX;
  type: typeof SCHEMA_TYPES.PRIMITIVE;
  content: string;
}

/** object schemas (`ObjectSchemaParser`) */
export interface ParsedObjectSchema extends ParsedSchemaCommon {
  schemaType: typeof SCHEMA_TYPES.OBJECT;
  type: typeof SCHEMA_TYPES.OBJECT;
  allFieldsAreOptional: boolean;
  content: ObjectFieldContent[];
}

/** enum schemas (`EnumSchemaParser`) */
export interface ParsedEnumSchema extends ParsedSchemaCommon {
  schemaType: typeof SCHEMA_TYPES.ENUM;
  type: typeof SCHEMA_TYPES.ENUM;
  /** enum values without `null` */
  enum?: unknown[];
  /** `$ref` of the enum component, if the parsed schema is a reference */
  $ref?: string;
  /** TS type of the enum keys */
  keyType: string;
  content: EnumFieldContent[];
}

/** result of `SchemaParser.parseSchema()` (stored as `schema.$parsed` and `component.typeData`) */
export type ParsedSchema =
  | ParsedPrimitiveSchema
  | ParsedComplexSchema
  | ParsedObjectSchema
  | ParsedEnumSchema;

/**
 * result of `SchemaFormatters.formatSchema(parsed, "base" | "inline")`:
 * the content is rendered to a string, the original content is kept as `$content`
 */
export type FormattedSchema = DistributiveOmit<ParsedSchema, 'content'> & {
  content: string;
  $content?: ParsedSchema['content'];
};

/**
 * an item of `modelTypes` (template data) - a formatted component (`CodeGenProcess.prepareModelType`).
 * `content` is the rendered content (a string for all built-in schema types).
 */
export type ModelType = DistributiveOmit<ParsedSchema, 'content' | 'name'> & {
  typeIdentifier: string;
  /** formatted type name */
  name: string | undefined;
  description?: string;
  /** rendered content (a string for all built-in schema types) */
  content: ParsedSchema['content'];
  $content: ParsedSchema['content'];
  rawContent: ParsedSchema['content'];
  typeData: FormattedSchema | ParsedSchema;
};

// #endregion

// #region components

/** raw value of a `#/components/<componentName>/<typeName>` entry */
export type ComponentRawTypeData =
  | SchemaObject
  | MaybeRef<ParameterObject>
  | MaybeRef<ResponseObject>
  | MaybeRef<RequestBodyObject>
  | MaybeRef<HeaderObject>
  | MaybeRef<SecuritySchemeObject>
  | MaybeRef<ExampleObject>
  | MaybeRef<LinkObject>
  | MaybeRef<PathItemObject>
  | ReferenceObject;

/**
 * an entry of `SchemaComponentsMap`.
 * A type alias (not an interface), so a component is assignable to `SchemaObject`:
 * components are also parsed as `$ref` schemas (`SchemaParserFabric.parseSchema(component)`).
 */
export type SchemaComponent<TRaw = ComponentRawTypeData> = {
  /** `#/components/schemas/Pet` */
  $ref: string;
  /** `Pet` (not formatted) */
  typeName: string;
  /** original schema / parameter / response / ... */
  rawTypeData: TRaw;
  /** `schemas`, `responses`, `parameters`, ... */
  componentName: ComponentName;
  /** result of the schema parser */
  typeData: ParsedSchema | null;
  /** cached result of `CodeGenProcess.prepareModelType` */
  $prepared?: ModelType | null;
};

// #endregion

// #region routes

export type ContentKind = 'JSON' | 'URL_ENCODED' | 'FORM_DATA' | 'IMAGE' | 'OTHER' | 'TEXT';

/** a path/query param found in the route path (`/pets/{id}`, `/pets{?limit}`) */
export interface RouteNameParam extends RouteParam {
  /** matched text (`{id}`) */
  $match: string;
  name: string;
  required: boolean;
  type: string;
  description: string;
  schema: SchemaObject;
  in: ParameterLocation;
}

/** result of `SchemaRoutes.parseRouteName` (and argument/result of `hooks.onBuildRoutePath`) */
export interface BuildRoutePathResult {
  originalRoute: string;
  /** route with inserted path params (`/pets/${id}`) */
  route: string;
  pathParams: RouteNameParam[];
  queryParams: RouteNameParam[];
}

/** a route parameter (`{ ...parameter, ...parameter.schema }`) */
export interface RouteParam extends Omit<SchemaObject, 'required'> {
  name?: string;
  in?: ParameterLocation;
  required?: boolean | string[];
  schema?: SchemaObject;
  /** set for params found in the route path */
  $match?: string;
  [key: string]: unknown;
}

export interface RouteParams {
  path: RouteParam[];
  header: RouteParam[];
  body: RouteParam[];
  query: RouteParam[];
  formData: RouteParam[];
  cookie: RouteParam[];
  [location: string]: RouteParam[];
}

/** `{ usage, original, duplicate }` (argument/result of `hooks.onCreateRouteName`) */
export interface RouteNameInfo {
  /** method name used in the generated code */
  usage: string;
  /** method name produced by the `route-name` template (or `hooks.onFormatRouteName`) */
  original: string;
  duplicate: boolean;
}

/** a path argument of a route method */
export interface PathArg {
  name: string;
  optional: boolean;
  /** inline TS type */
  type: string;
  description?: string;
}

/** a response of a route (`SchemaRoutes.getRequestInfoTypes`) */
export interface ResponseInfo extends Omit<ResponseObject, 'description'> {
  contentTypes: string[];
  contentKind: ContentKind;
  /** TS type of the response body */
  type: string;
  description: string;
  /** status code (`200`) or `"default"` / `"2XX"` */
  status: number | string;
  isSuccess: boolean;
  $ref?: string;
}

export interface ResponseBodyInfo {
  contentTypes: string[];
  responses: ResponseInfo[];
  success: {
    /** success response (a component when it is extracted with `extractResponseBody`) */
    schema?: ResponseInfo | SchemaComponent;
    type: string;
  };
  error: {
    /** error responses (a single component when they are extracted with `extractResponseError`) */
    schemas: (ResponseInfo | SchemaComponent)[];
    type: string;
  };
  full: {
    types: string;
  };
}

export interface RequestBodyInfo {
  paramName: string;
  contentTypes: string[];
  contentKind: ContentKind;
  /** request body schema (a component when it is extracted with `extractRequestBody`) */
  schema: SchemaObject | SchemaComponent | null;
  /** TS type of the request body */
  type: string | null;
  required: boolean;
}

/** an argument of a route method (query / body / path params / headers) */
export interface SpecificArg {
  name: string;
  optional: boolean;
  type: string;
}

export interface SpecificArgs {
  query?: SpecificArg;
  body?: SpecificArg;
  pathParams?: SpecificArg;
  headers?: SpecificArg;
}

/** operation info passed to the `route-name` template and route name hooks (`route.raw`) */
export interface RawRouteInfo extends Omit<OperationObject, 'parameters'> {
  pathArgs: PathArg[];
  operationId?: string;
  method: HttpMethod;
  /** original route path (`/pets/{id}`) */
  route: string;
  moduleName: string;
  responsesTypes: ResponseInfo[];
  parameters?: OperationObject['parameters'];
}

/** `route.request` */
export interface RouteRequestInfo {
  contentTypes: string[];
  parameters: PathArg[];
  /** request path with inserted path params (`/pets/${encodeURIComponent(id)}`) */
  path: string;
  formData: boolean;
  isQueryBody: boolean;
  security: boolean;
  method: HttpMethod;
  /** schema of all request params (query + path) */
  requestParams: SchemaObject | SchemaComponent | null;
  payload?: SpecificArg;
  query?: SpecificArg;
  pathParams?: SpecificArg;
  headers?: SpecificArg;
}

/** `route.response` */
export interface RouteResponseInfo {
  contentTypes: string[];
  type: string;
  errorType: string;
  fullTypes: string;
}

/** a parsed route (`SchemaRoutes.parseRouteInfo`, argument/result of `hooks.onCreateRoute`) */
export interface ParsedRoute {
  id: string;
  /** module name (`v1` for routes starting with a digit) */
  namespace: string;
  routeName: RouteNameInfo;
  routeParams: RouteParams;
  requestBodyInfo: RequestBodyInfo;
  responseBodyInfo: ResponseBodyInfo;
  specificArgs: SpecificArgs;
  queryObjectSchema: SchemaObject;
  pathObjectSchema: SchemaObject;
  headersObjectSchema: SchemaObject;
  responseBodySchema: ResponseBodyInfo['success']['schema'];
  requestBodySchema: RequestBodyInfo['schema'];
  specificArgNameResolver: NameResolver;
  request: RouteRequestInfo;
  response: RouteResponseInfo;
  raw: RawRouteInfo;
}

/** routes of one module */
export interface ModuleRoutes {
  moduleName: string;
  routes: ParsedRoute[];
}

/** `routes` template data (`SchemaRoutes.getGroupedRoutes`) */
export interface GroupedRoutes {
  /** routes without a module (e.g. `GET /`) */
  outOfModule?: ParsedRoute[];
  combined?: ModuleRoutes[];
}

// #endregion
