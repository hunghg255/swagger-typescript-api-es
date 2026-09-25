# Options reference

All keys of `IOptions` (`import type { IOptions } from 'swagger-typescript-api-es'`), accepted by
`defaultConfig()`, `generateApi()`, config files and `--custom-config` files. Every key is optional.

## Input / output

| Option        | Type                 | Default    | Description                                                                                                                                     |
| ------------- | -------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`         | `string`             | —          | Schema URL. A value without `http://` / `https://` is read as a file path relative to cwd                                                       |
| `input`       | `string`             | —          | Local schema file (JSON or YAML). Used when the file exists, otherwise `url` is tried                                                           |
| `spec`        | `OpenAPIDocument`    | —          | Schema object already in memory (OpenAPI 3.x or Swagger 2.0). Wins over `input` / `url`. Never modified                                         |
| `output`      | `string \| false`    | `"./"`     | Output **directory**, resolved from cwd and created if missing. `false`: nothing is written                                                     |
| `name`        | `string`             | `"Api.ts"` | Output file name (single-file mode only)                                                                                                        |
| `cleanOutput` | `boolean`            | `false`    | Delete the contents of `output` before writing                                                                                                  |
| `modular`     | `boolean`            | `false`    | One file per module + `data-contracts.ts` + `http-client.ts` (see below)                                                                        |
| `fileNames`   | `Partial<FileNames>` | see below  | Modular file names: `dataContracts` (`data-contracts`), `routeTypes` (`route-types`), `httpClient` (`http-client`), `outOfModuleApi` (`Common`) |
| `toJS`        | `boolean`            | `false`    | Emit `.js` + `.d.ts` instead of `.ts` (loads `typescript` on demand)                                                                            |
| `silent`      | `boolean`            | `false`    | Hide logs (errors are still printed)                                                                                                            |
| `debug`       | `boolean`            | `false`    | Extra logs about the generation                                                                                                                 |
| `patch`       | `boolean`            | `false`    | Fix small errors in a Swagger 2.0 document while converting it                                                                                  |

Swagger 2.0 documents are converted to OpenAPI 3.0 (`swagger2openapi`) before parsing.

## Schema download (`url`)

| Option               | Type             | Default | Description                                                                                                                          |
| -------------------- | ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `authorizationToken` | `string`         | —       | Sent verbatim as the `Authorization` header (write `'Bearer <token>'` yourself)                                                      |
| `disableStrictSSL`   | `boolean`        | `false` | Skip TLS certificate validation (self-signed certs)                                                                                  |
| `disableProxy`       | `boolean`        | `false` | Connect directly. By default `HTTP_PROXY` / `HTTPS_PROXY` / `NO_PROXY` are respected (undici `EnvHttpProxyAgent`)                    |
| `requestOptions`     | `RequestOptions` | —       | undici `fetch` `RequestInit` (`headers`, `method`, `dispatcher`, `signal`, ...) + `timeout` in ms (default `60000`, `0` disables it) |

A custom `requestOptions.dispatcher` (e.g. `new ProxyAgent(url)` from `undici`) replaces the proxy /
SSL handling. The node-fetch style `requestOptions.agent` is no longer supported (a warning is
logged). Non-2xx responses, network errors and timeouts reject with
`Failed to fetch swagger schema from "<url>": ...`.

## Client

| Option                       | Type                 | Default      | Description                                                                             |
| ---------------------------- | -------------------- | ------------ | --------------------------------------------------------------------------------------- |
| `httpClientType`             | `'fetch' \| 'axios'` | `'fetch'`    | HTTP client of the generated code (axios must be installed in the consuming project)    |
| `generateClient`             | `boolean`            | `true`       | `false`: only types (no `HttpClient` / `Api`)                                           |
| `apiClassName`               | `string`             | `"Api"`      | Name of the main class (single-file mode)                                               |
| `singleHttpClient`           | `boolean`            | `false`      | `Api` does not extend `HttpClient`; its constructor takes an `HttpClient` instance      |
| `unwrapResponseData`         | `boolean`            | `false`      | Methods resolve with the response body instead of `HttpResponse` / `AxiosResponse`      |
| `disableThrowOnError`        | `boolean`            | `false`      | fetch client: resolve (not reject) on non-2xx; check `response.ok` / `response.error`   |
| `defaultResponseAsSuccess`   | `boolean`            | `false`      | Also use the `default` response as the success type                                     |
| `successResponseStatusRange` | `[number, number]`   | `[200, 299]` | Status codes treated as success when picking the response type                          |
| `defaultResponseType`        | `string`             | `"void"`     | Type used for responses without a schema                                                |
| `generateResponses`          | `boolean`            | `false`      | Add an `@response <status> <type> <description>` JSDoc line per response to each method |

## Types and enums

| Option                            | Type      | Default           | Description                                          |
| --------------------------------- | --------- | ----------------- | ---------------------------------------------------- |
| `generateUnionEnums`              | `boolean` | `false`           | Every enum becomes a union type (`'a' \| 'b'`)       |
| `extractEnums`                    | `boolean` | `false`           | Inline enums become named enum declarations          |
| `enumNamesAsValues`               | `boolean` | `false`           | Use `x-enumNames` as values too (not only as keys)   |
| `addReadonly`                     | `boolean` | `false`           | `readonly` properties                                |
| `anotherArrayType`                | `boolean` | `false`           | `Array<T>` instead of `T[]`                          |
| `sortTypes`                       | `boolean` | `false`           | Sort types and fields                                |
| `typePrefix` / `typeSuffix`       | `string`  | `""`              | Added to every data contract name                    |
| `enumKeyPrefix` / `enumKeySuffix` | `string`  | `""`              | Added to every enum key                              |
| `fixInvalidTypeNamePrefix`        | `string`  | `"Type"`          | Prefix for type names that are not valid identifiers |
| `fixInvalidEnumKeyPrefix`         | `string`  | `"Value"`         | Prefix for enum keys that are not valid identifiers  |
| `typeNameResolverName`            | `string`  | `"ComponentType"` | Prefix of fallback type names                        |
| `enumKeyResolverName`             | `string`  | `"Value"`         | Prefix of fallback enum keys                         |
| `specificArgNameResolverName`     | `string`  | `"arg"`           | Prefix of fallback argument names                    |

Boolean enums are always generated as unions. Type names are deterministic (the same spec gives the
same names).

## Extraction

| Option                 | Type                         | Default | Description                                                                                 |
| ---------------------- | ---------------------------- | ------- | ------------------------------------------------------------------------------------------- |
| `extractRequestParams` | `boolean`                    | `false` | Path + query params become one `<Route>Params` type and one argument                        |
| `extractRequestBody`   | `boolean`                    | `false` | Inline bodies become `<Route>Payload` types                                                 |
| `extractResponseBody`  | `boolean`                    | `false` | Inline success responses become `<Route>Data` types                                         |
| `extractResponseError` | `boolean`                    | `false` | Inline error responses become `<Route>Error` types                                          |
| `extractResponses`     | `boolean`                    | `false` | `#/components/responses/*` become data contracts (renamed on a clash, e.g. `ErrorResponse`) |
| `extractingOptions`    | `Partial<ExtractingOptions>` | below   | Suffixes tried in order, plus optional `*NameResolver(typeName, reservedNames)` functions   |

Default suffixes: `requestBodySuffix: ['Payload', 'Body', 'Input']`, `requestParamsSuffix: ['Params']`,
`responseBodySuffix: ['Data', 'Result', 'Output']`,
`responseErrorSuffix: ['Error', 'Fail', 'Fails', 'ErrorData', 'HttpError', 'BadResponse']`,
`enumSuffix: ['Enum']`, `discriminatorMappingSuffix: ['Mapping', 'Mapper', 'MapType']`,
`discriminatorAbstractPrefix: ['Base', 'Abstract', 'Discriminator', 'Internal', 'Polymorph']`.
Resolvers: `requestBodyNameResolver`, `requestParamsNameResolver`, `responseBodyNameResolver`,
`responseErrorNameResolver`, `enumNameResolver`, `discriminatorMappingNameResolver`,
`discriminatorAbstractResolver`. Extracted types never overwrite a real component with the same name.

## Routes and modules

| Option               | Type      | Default | Description                                                            |
| -------------------- | --------- | ------- | ---------------------------------------------------------------------- |
| `moduleNameIndex`    | `number`  | `0`     | Path segment used as module name (`/pets/{id}` -> `pets`)              |
| `moduleNameFirstTag` | `boolean` | `false` | Use the first tag of the operation as module name                      |
| `generateRouteTypes` | `boolean` | `false` | Also emit `namespace` route types (request params/query/body/response) |
| `sortRoutes`         | `boolean` | `false` | Sort routes alphabetically (`sortRouters` is a deprecated alias)       |

Method names come from `operationId` (camelCase); without one they are built from the method and path.

### Modular output files

- `data-contracts.ts`, `http-client.ts` (when `generateClient`)
- `<Module>.ts` per module, e.g. `Pets.ts` exporting `class Pets extends HttpClient`; routes outside
  any module (`GET /`) go to `Common.ts` (`fileNames.outOfModuleApi`)
- with `generateRouteTypes`: `<Module>Route.ts` exporting `namespace <Module>`, and `CommonRoute.ts`
- a module whose name clashes with a data contract gets a suffix: class `HealthApi`, namespace
  `HealthRoute` (the file names stay `Health.ts` / `HealthRoute.ts`)
- `name` and `apiClassName` are not used

## Formatting

Output is formatted with [oxfmt](https://oxc.rs/docs/guide/usage/formatter). Later wins:

1. built-in defaults (`constants.OXC_FORMAT_OPTIONS`): `singleQuote: true`, `jsxSingleQuote: true`,
   `printWidth: 100`, `trailingComma: 'es5'`, `tabWidth: 2`, `semi: true`, grouped `sortImports`
2. `.oxfmtrc.json` in `process.cwd()` (if present)
3. `oxfmtOptrions` (oxfmt `FormatConfig`; the spelling is the real public name). `parser` is ignored.

## Templates and advanced

| Option                    | Type                               | Description                                                                                                                             |
| ------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `templates`               | `string`                           | Folder of custom Eta templates (`.ejs` / `.eta`). Lookup: custom folder > `templates/base` > `templates/default` or `templates/modular` |
| `templateInfos`           | `TemplateInfo[]`                   | Template name -> file name (`{ name: 'api', fileName: 'api' }`, ...)                                                                    |
| `extraTemplates`          | `{ name: string; path: string }[]` | Extra files rendered with the same data (`name` = output file, `path` = template file)                                                  |
| `constants`               | `Record<string, unknown>`          | Merged into `config.constants` in templates                                                                                             |
| `codeGenConstructs`       | object or `(ts) => object`         | Changes deep-merged into `config.Ts` (TS code constructs: `Keyword`, `ArrayType`, `UnionType`, ...)                                     |
| `primitiveTypeConstructs` | object or `(types) => object`      | Changes deep-merged into schema type -> TS type map, e.g. `{ string: { 'date-time': 'Date' } }`                                         |
| `schemaParsers`           | `SchemaParsers`                    | Custom parser classes (extend `MonoSchemaParser`) for `object`, `enum`, `array`, `complexOneOf`, ...                                    |
| `customTranslator`        | `new (process) => Translator`      | Custom code translator (extend the exported `Translator`)                                                                               |
| `hooks`                   | `Partial<Hooks>`                   | See below                                                                                                                               |

In templates: `it` is the `GenerateApiConfiguration` (`apiConfig`, `config`, `modelTypes`, `routes`,
`utils`, ...). `utils._` is a set of lodash-compatible functions from `es-toolkit/compat` (`get`,
`map`, `compact`, `sortBy`, `camelCase`, `upperCase`, ...); `utils.require()` resolves paths from
the templates folder and packages from your project. Use `includeFile('@base/...', it)` to include
built-in partials. Copy the built-in templates with `generateTemplates({ output, httpClientType, modular })`.

## Hooks

Returning `undefined` (or nothing) keeps the original value. Any hook (or custom parser / template /
construct) makes the generator work on a deep copy of the schema, so your input is never changed.

```ts
interface Hooks {
  onInit(config: CodeGenConfig, process: CodeGenProcess): CodeGenConfig | void; // after the schema is loaded
  onPrepareConfig(configuration: GenerateApiConfiguration): GenerateApiConfiguration | void; // template data
  onCreateComponent(component: SchemaComponent): SchemaComponent | void; // each #/components/* entry
  onPreParseSchema(
    schema: SchemaObject,
    typeName: string | null,
    schemaType: BaseSchemaType
  ): SchemaObject | void; // deep-merged into the schema
  onParseSchema(schema: SchemaObject, parsed: ParsedSchema): ParsedSchema | void;
  onPreBuildRoutePath(routePath: string): string | void; // raw path, before params are parsed
  onBuildRoutePath(data: BuildRoutePathResult): BuildRoutePathResult | void; // { originalRoute, route, pathParams, queryParams }
  onInsertPathParam(
    paramName: string,
    index: number,
    pathParams: RouteNameParam[],
    route: string
  ): string | void; // expression put in `${...}` (not wrapped in encodeURIComponent)
  onCreateRequestParams(rawType: SchemaObject): SchemaObject | SchemaComponent | void;
  onCreateRoute(route: ParsedRoute): ParsedRoute | false | void; // false skips the route
  onCreateRouteName(nameInfo: RouteNameInfo, raw: RawRouteInfo): RouteNameInfo | void; // { usage, original, duplicate }
  onFormatRouteName(raw: RawRouteInfo, templateRouteName: string): string | void; // method name
  onFormatTypeName(
    typeName: string,
    rawTypeName: string,
    schemaType: 'type-name' | 'enum-key'
  ): string | void;
}
```

Useful fields: `route.raw` (`operationId`, `method`, `route` = original path, `moduleName`, `tags`,
`summary`, ...), `route.request.path` / `.method` / `.security`, `route.routeName.usage`,
`route.namespace` (module name).

## CLI flags

`swagger-typescript-api-es [flags]` (`-h` help, `-v` version). Kebab-case and camelCase spellings
are equivalent. Boolean values: `false`, `0`, `no`, `off` and `""` are false, anything else is true.

| Flag                                                    | Option                                               |
| ------------------------------------------------------- | ---------------------------------------------------- |
| `-u, --u <url>`                                         | `url`                                                |
| `-o, --o <output>`                                      | `output`                                             |
| `-n, --n <name>`                                        | `name`                                               |
| `-t, --t <templates>`                                   | `templates`                                          |
| `--httpClientType <fetch\|axios>`                       | `httpClientType`                                     |
| `--modular <bool>`                                      | `modular`                                            |
| `--js <bool>`                                           | `toJS`                                               |
| `--noClient <bool>`                                     | `generateClient` (inverted)                          |
| `--d <bool>`                                            | `defaultResponseAsSuccess`                           |
| `--r <bool>`                                            | `generateResponses`                                  |
| `--route-types <bool>`                                  | `generateRouteTypes`                                 |
| `--union-enums <bool>`                                  | `generateUnionEnums`                                 |
| `--extract-enums` (value optional)                      | `extractEnums`                                       |
| `--enum-names-as-values <bool>`                         | `enumNamesAsValues`                                  |
| `--add-readonly <bool>`                                 | `addReadonly`                                        |
| `--another-array-type <bool>`                           | `anotherArrayType`                                   |
| `--extract-request-params <bool>`                       | `extractRequestParams`                               |
| `--extract-request-body <bool>`                         | `extractRequestBody`                                 |
| `--extract-response-body <bool>`                        | `extractResponseBody`                                |
| `--extract-response-error <bool>`                       | `extractResponseError`                               |
| `--module-name-index <number>`                          | `moduleNameIndex`                                    |
| `--module-name-first-tag <bool>`                        | `moduleNameFirstTag`                                 |
| `--unwrap-response-data <bool>`                         | `unwrapResponseData`                                 |
| `--disable-throw-on-error <bool>`                       | `disableThrowOnError`                                |
| `--single-http-client <bool>`                           | `singleHttpClient`                                   |
| `--default-response <type>`                             | `defaultResponseType`                                |
| `--type-prefix <str>` / `--type-suffix <str>`           | `typePrefix` / `typeSuffix`                          |
| `--api-class-name <name>`                               | `apiClassName`                                       |
| `--clean-output <bool>`                                 | `cleanOutput`                                        |
| `--sort-types <bool>` / `--sort-routes <bool>`          | `sortTypes` / `sortRoutes`                           |
| `--disableStrictSSL <bool>` / `--disableProxy <bool>`   | `disableStrictSSL` / `disableProxy`                  |
| `--silent <bool>` / `--debug <bool>` / `--patch <bool>` | `silent` / `debug` / `patch`                         |
| `--custom-config <file>`                                | loads a js/ts/json file exporting one options object |

Options without a flag (`input`, `hooks`, `requestOptions`, `oxfmtOptrions`, `extractResponses`,
...) go in the config file or the `--custom-config` file.

## Programmatic API and exported types

```ts
import {
  constants,
  defaultConfig,
  generateApi,
  generateTemplates,
  Translator,
} from 'swagger-typescript-api-es';
import type {
  GenerateApiOutput,
  GeneratedFile,
  Hooks,
  IOptions,
  OpenAPIDocument,
  ParsedRoute,
} from 'swagger-typescript-api-es';
```

- `generateApi(options: IOptions): Promise<GenerateApiOutput>`; an array of options returns an array
  of results (generated one after another). Rejects on errors (no `process.exit`).
- `GenerateApiOutput`: `files: GeneratedFile[]` (`{ fileName, fileExtension, fileContent }`, returned
  with or without `output: false`), `configuration` (template data), `getTemplate`, `renderTemplate`,
  `createFile`, `formatTSContent(code): Promise<string>`.
- `defaultConfig(options)`: identity function that types a config object or array.
- `generateTemplates({ output, httpClientType, modular, cleanOutput, rewrite, silent })`: copies the
  built-in templates for customisation, resolves `{ files: SourceTemplate[] }`.
- Other exported types: `GenerateApiConfiguration`, `GenerateApiConfig`, `SchemaObject`,
  `OpenAPIV3Document`, `ParsedSchema`, `RawRouteInfo`, `RouteNameInfo`, `BuildRoutePathResult`,
  `SchemaComponent`, `RequestOptions`, `OxfmtOptions`, `ExtractingOptions`, `SchemaParsers`, ...
