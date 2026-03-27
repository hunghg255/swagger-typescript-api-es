# IOptions Full Reference

All options for `defaultConfig()` in `swagger-typescript-api.config.ts`.

## Core Options

| Option | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | `"Api.ts"` | Output filename |
| `output` | `string` | `"./"` | Output directory path |
| `url` | `string` | — | URL to remote swagger/OpenAPI schema |
| `input` | `string` | — | Local path to swagger JSON/YAML file |
| `httpClientType` | `'axios' \| 'fetch'` | `'fetch'` | HTTP client to use in generated code |
| `cleanOutput` | `boolean` | `false` | Delete output folder contents before generating |

## Type Generation Options

| Option | Type | Default | Description |
|---|---|---|---|
| `generateClient` | `boolean` | `true` | Generate HTTP client class |
| `generateRouteTypes` | `boolean` | `false` | Generate route type definitions |
| `generateResponses` | `boolean` | `false` | Generate response type definitions |
| `extractRequestParams` | `boolean` | `false` | Extract request params into separate types |
| `extractRequestBody` | `boolean` | `false` | Extract request body into separate types |
| `extractEnums` | `boolean` | `false` | Extract enums into separate declarations |
| `unwrapResponseData` | `boolean` | `false` | Return response data directly (not wrapped in axios response) |
| `generateUnionEnums` | `boolean` | `false` | Generate union types instead of enums |
| `enumNamesAsValues` | `boolean` | `false` | Use enum name as value |
| `toJS` | `boolean` | `false` | Generate JavaScript instead of TypeScript |
| `addReadonly` | `boolean` | `false` | Add `readonly` to generated properties |
| `anotherArrayType` | `boolean` | `false` | Use `Array<T>` instead of `T[]` |

## Naming Options

| Option | Type | Description |
|---|---|---|
| `typePrefix` | `string` | Prefix for all generated type names |
| `typeSuffix` | `string` | Suffix for all generated type names |
| `enumKeyPrefix` | `string` | Prefix for enum keys |
| `enumKeySuffix` | `string` | Suffix for enum keys |
| `fixInvalidTypeNamePrefix` | `string` | Prefix to fix invalid type names |
| `fixInvalidEnumKeyPrefix` | `string` | Prefix to fix invalid enum keys |
| `moduleNameFirstTag` | `boolean` | Use first tag as module/class name |

## Sorting Options

| Option | Type | Description |
|---|---|---|
| `sortTypes` | `boolean` | Sort generated types alphabetically |
| `sortRouters` | `boolean` | Sort generated routes alphabetically |

## Formatting Options

| Option | Type | Description |
|---|---|---|
| `oxfmtOptrions.printWidth` | `number` | Line width for formatter |
| `oxfmtOptrions.tabWidth` | `number` | Tab width |
| `oxfmtOptrions.trailingComma` | `'all' \| string` | Trailing comma style |
| `oxfmtOptrions.parser` | `'typescript' \| string` | Parser to use |

## Advanced Options

| Option | Type | Description |
|---|---|---|
| `templates` | `string` | Path to custom EJS templates folder |
| `extraTemplates` | `[]` | Extra template files to generate additional output files |
| `singleHttpClient` | `boolean` | Use a single shared HTTP client instance |
| `defaultResponseAsSuccess` | `boolean` | Treat default response as success |
| `spec` | `object` | Inline swagger spec object (alternative to url/input) |
| `constants` | `Record<string, any>` | Constants available in templates |
| `codeGenConstructs` | `function` | Override code generation constructs |
| `primitiveTypeConstructs` | `function` | Override primitive type mappings |

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
