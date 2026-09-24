# IOptions Full Reference

All options for `defaultConfig()` in `swagger-typescript-api.config.ts`.

## Core Options

| Option           | Type                 | Default    | Description                                                                                                                                                        |
| ---------------- | -------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`           | `string`             | `"Api.ts"` | Output filename                                                                                                                                                    |
| `output`         | `string \| false`    | `"./"`     | Output directory path (created if missing). `false` generates in memory: files are only returned by `generateApi`                                                  |
| `url`            | `string`             | —          | URL to remote swagger/OpenAPI schema (a local file path also works)                                                                                                |
| `input`          | `string`             | —          | Local path to swagger JSON/YAML file                                                                                                                               |
| `httpClientType` | `'axios' \| 'fetch'` | `'fetch'`  | HTTP client to use in generated code                                                                                                                               |
| `cleanOutput`    | `boolean`            | `false`    | Delete output folder contents before generating                                                                                                                    |
| `modular`        | `boolean`            | `false`    | Separate files: `http-client`, `data-contracts` and one file per route module (routes outside any module go to `Common.ts`; their route types to `CommonRoute.ts`) |
| `apiClassName`   | `string`             | `"Api"`    | Name of the generated API class                                                                                                                                    |

## Type Generation Options

| Option                 | Type      | Default  | Description                                                   |
| ---------------------- | --------- | -------- | ------------------------------------------------------------- |
| `generateClient`       | `boolean` | `true`   | Generate HTTP client class                                    |
| `generateRouteTypes`   | `boolean` | `false`  | Generate route type definitions                               |
| `generateResponses`    | `boolean` | `false`  | Generate response type definitions                            |
| `extractRequestParams` | `boolean` | `false`  | Extract request params into separate types                    |
| `extractRequestBody`   | `boolean` | `false`  | Extract request body into separate types                      |
| `extractEnums`         | `boolean` | `false`  | Extract enums into separate declarations                      |
| `unwrapResponseData`   | `boolean` | `false`  | Return response data directly (not wrapped in axios response) |
| `generateUnionEnums`   | `boolean` | `false`  | Generate union types instead of enums                         |
| `enumNamesAsValues`    | `boolean` | `false`  | Use enum name as value                                        |
| `toJS`                 | `boolean` | `false`  | Generate JavaScript instead of TypeScript                     |
| `addReadonly`          | `boolean` | `false`  | Add `readonly` to generated properties                        |
| `anotherArrayType`     | `boolean` | `false`  | Use `Array<T>` instead of `T[]`                               |
| `extractResponseBody`  | `boolean` | `false`  | Extract response body into separate types                     |
| `extractResponseError` | `boolean` | `false`  | Extract response error into separate types                    |
| `defaultResponseType`  | `string`  | `"void"` | Type for empty response schemas                               |
| `disableThrowOnError`  | `boolean` | `false`  | Do not throw when `response.ok` is not true                   |

## Naming Options

| Option                     | Type      | Description                                                  |
| -------------------------- | --------- | ------------------------------------------------------------ |
| `typePrefix`               | `string`  | Prefix for all generated type names                          |
| `typeSuffix`               | `string`  | Suffix for all generated type names                          |
| `enumKeyPrefix`            | `string`  | Prefix for enum keys                                         |
| `enumKeySuffix`            | `string`  | Suffix for enum keys                                         |
| `fixInvalidTypeNamePrefix` | `string`  | Prefix to fix invalid type names                             |
| `fixInvalidEnumKeyPrefix`  | `string`  | Prefix to fix invalid enum keys                              |
| `moduleNameFirstTag`       | `boolean` | Use first tag as module/class name                           |
| `moduleNameIndex`          | `number`  | Path segment index used for module separation (default: `0`) |

## Sorting Options

| Option       | Type      | Description                                                                |
| ------------ | --------- | -------------------------------------------------------------------------- |
| `sortTypes`  | `boolean` | Sort generated types alphabetically                                        |
| `sortRoutes` | `boolean` | Sort generated routes alphabetically (`sortRouters` is a deprecated alias) |

## Formatting Options

Generated code is formatted with [oxfmt](https://oxc.rs/docs/guide/usage/formatter). Options are merged in this order (later wins):

1. built-in defaults: `singleQuote: true`, `jsxSingleQuote: true`, `printWidth: 100`, `trailingComma: 'es5'`, `tabWidth: 2`, `semi: true`, `sortImports` (grouped)
2. `.oxfmtrc.json` in the current working directory (if any)
3. `oxfmtOptrions` (note the spelling — it is the public option name)

| Option          | Type                          | Description                                                                                    |
| --------------- | ----------------------------- | ---------------------------------------------------------------------------------------------- |
| `oxfmtOptrions` | `FormatConfig` (from `oxfmt`) | Any oxfmt format option, e.g. `printWidth`, `tabWidth`, `trailingComma`, `singleQuote`, `semi` |

There is no `parser` option — the parser is inferred from the file extension (a passed `parser` is ignored).

## Advanced Options

| Option                     | Type                                         | Description                                                                          |
| -------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------ |
| `templates`                | `string`                                     | Path to custom templates folder (`.ejs` / `.eta`, Eta engine)                        |
| `extraTemplates`           | `[]`                                         | Extra template files to generate additional output files                             |
| `singleHttpClient`         | `boolean`                                    | Use a single shared HTTP client instance                                             |
| `defaultResponseAsSuccess` | `boolean`                                    | Treat default response as success                                                    |
| `spec`                     | `object`                                     | Inline swagger spec object (alternative to url/input)                                |
| `constants`                | `Record<string, any>`                        | Constants available in templates                                                     |
| `templateInfos`            | `{ name: string; fileName: string }[]`       | Template name -> template file mapping (e.g. `{ name: "api", fileName: "api" }`)     |
| `patch`                    | `boolean`                                    | Fix up small errors in the swagger source definition                                 |
| `silent`                   | `boolean`                                    | Output only errors to console                                                        |
| `debug`                    | `boolean`                                    | Log additional information about the generation process                              |
| `authorizationToken`       | `string`                                     | Sent as `Authorization` header when downloading the schema from `url`                |
| `disableStrictSSL`         | `boolean`                                    | Disable strict SSL when downloading the schema                                       |
| `disableProxy`             | `boolean`                                    | No-op, kept for backward compatibility                                               |
| `requestOptions`           | `Record<string, any> & { timeout?: number }` | Extra `fetch` options for downloading the schema; `timeout` in ms (default: `60000`) |
| `codeGenConstructs`        | `function`                                   | Override code generation constructs                                                  |
| `primitiveTypeConstructs`  | `function`                                   | Override primitive type mappings                                                     |

## Extracting Options

```ts
extractingOptions?: {
  requestBodySuffix?: string[]    // suffix for extracted request body types
  requestParamsSuffix?: string[]  // suffix for extracted request param types
  responseBodySuffix?: string[]   // suffix for extracted response body types
  responseErrorSuffix?: string[]  // suffix for extracted response error types
}
```

## Hooks

```ts
hooks?: {
  onCreateComponent?: (component: any) => void
  onCreateRequestParams?: (rawType: any) => void
  onCreateRoute?: (routeData: any) => void
  onCreateRouteName?: (routeNameInfo: any, rawRouteInfo: any) => void
  onFormatRouteName?: (routeInfo: any, templateRouteName: any) => void
  onFormatTypeName?: (typeName: any, rawTypeName: any, schemaType: any) => void
  onInit?: (configuration: any) => void
  onPreParseSchema?: (originalSchema: any, typeName: any, schemaType: any) => void
  onParseSchema?: (originalSchema: any, parsedSchema: any) => void
  onPrepareConfig?: (currentConfiguration: any) => void
}
```

Hooks allow intercepting and customizing generation at various stages. Useful for renaming types, skipping routes, or injecting custom logic.
