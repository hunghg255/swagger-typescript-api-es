<p align="center">
<a href="https://www.npmjs.com/package/swagger-typescript-api-es" target="_blank" rel="noopener noreferrer">
<img src="https://api.iconify.design/devicon-plain:swagger-wordmark.svg?color=%2365fb92" alt="logo" width='150'/></a>
</p>

<p align="center">
  ESM and TypeScript rewrite of Acacode's
  <a href="https://github.com/acacode/swagger-typescript-api">swagger-typescript-api</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/swagger-typescript-api-es" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/swagger-typescript-api-es.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/swagger-typescript-api-es" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/npm/dt/swagger-typescript-api-es.svg?logo=npm" alt="NPM Downloads" /></a>
  <a href="https://bundlephobia.com/result?p=swagger-typescript-api-es" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/bundlephobia/minzip/swagger-typescript-api-es" alt="Minizip" /></a>
  <a href="https://github.com/hunghg255/swagger-typescript-api-es/graphs/contributors" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="Contributors" /></a>
  <a href="https://github.com/hunghg255/swagger-typescript-api-es/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/swagger-typescript-api-es" alt="License" /></a>
</p>

Generate a fully typed TypeScript API client (`fetch` or `axios`) and data contracts from an
**OpenAPI 3.0** or **Swagger 2.0** schema (JSON or YAML, from a URL or a local file).

## Table of contents

- [Differences from the original](#differences-from-the-original)
- [Requirements](#requirements)
- [Install](#install)
- [Quick start](#quick-start)
- [Config file](#config-file)
- [CLI](#cli)
- [Options reference](#options-reference)
- [Programmatic API](#programmatic-api)
- [Using the generated client](#using-the-generated-client)
- [Modular output](#modular-output)
- [Custom templates](#custom-templates)
- [Hooks](#hooks)
- [Formatting](#formatting)
- [Troubleshooting / FAQ](#troubleshooting--faq)
- [AI agent skill](#ai-agent-skill)
- [Contributing](#contributing)
- [License](#license)

## Differences from the original

`swagger-typescript-api-es` is based on
[acacode/swagger-typescript-api](https://github.com/acacode/swagger-typescript-api) and generates
the same kind of client, with these differences:

- **ESM only, written in TypeScript.** There is no CommonJS build.
- **Config file support.** The CLI loads `swagger-typescript-api.config.ts` (or `.js`/`.mjs`/`.cjs`)
  from the project root. The file can export one config or an array of configs, and `defaultConfig()`
  types it for you.
- **The CLI flags are different.** Flags are `--u`, `--o`, `--n`, `--t`, ... (for example
  `-u <url>` rather than upstream's `-p <path>`). Flags that take a value need one, so booleans are
  written as `--modular true`. See [CLI](#cli).
- **[oxfmt](https://oxc.rs/docs/guide/usage/formatter) formats the output**, not Prettier. Set
  formatter options with `oxfmtOptrions` (that spelling is the real option name) or with your
  project's `.oxfmtrc.json`.
- **`output: false`** generates in memory and returns the files from `generateApi` without
  writing them.
- The generated `ContentType` is a `const` object plus a type, not a TypeScript `enum`. Both
  generated HTTP clients also accept an `injectHeaders` callback.
- There is no `generate-templates` CLI command. To copy the built-in templates, call
  [`generateTemplates()`](#custom-templates) from code.

## Requirements

- **Node.js >= 20**
- **ESM.** The package is `"type": "module"`, so import it with `import`, not `require`.
- If you use `httpClientType: 'axios'`, `axios` must be installed in the project that uses the
  generated client.

## Install

```bash
# npm
npm i -D swagger-typescript-api-es
# yarn
yarn add -D swagger-typescript-api-es
# pnpm
pnpm add -D swagger-typescript-api-es
# bun
bun add -d swagger-typescript-api-es
```

To run it once without installing:

```bash
npx swagger-typescript-api-es@latest --help
# or: yarn dlx / pnpm dlx / bunx swagger-typescript-api-es@latest --help
```

## Quick start

**One-liner.** This writes `./src/api/Api.ts`:

```bash
npx swagger-typescript-api-es@latest -u https://petstore.swagger.io/v2/swagger.json -o ./src/api
```

**Config file.** Create `swagger-typescript-api.config.ts` in the project root:

```ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  name: 'api-axios.ts',
  output: './src/apis/axios-gentype',
  url: 'http://localhost:5002/api-json',
  httpClientType: 'axios',
});
```

Then add a script to `package.json` and run it with `npm run gen-api-types`:

```json
{
  "scripts": {
    "gen-api-types": "swagger-typescript-api-es"
  }
}
```

## Config file

The CLI looks for a config file in the current working directory (with
[`unreadconfig`](https://www.npmjs.com/package/unreadconfig)). The usual name is:

- `swagger-typescript-api.config.ts`, `.js`, `.mjs` or `.cjs`

It also finds `.swagger-typescript-apirc` in any of these forms: bare, `.json`, `.json5`, `.jsonc`,
`.yaml`, `.yml`, `.toml`, `.ini`, `.js`, `.ts`, `.cjs`, `.mjs`, or the same names under `.config/`.
These rc files are checked **before** `swagger-typescript-api.config.*`. As a last resort, the CLI
reads a `"swagger-typescript-api"` key in `package.json`. If none of these exist, the CLI needs
`--u` (or `--custom-config`).

`defaultConfig()` only returns what you pass it. It exists so that the config is typed. The file can
export a **single config** or an **array of configs**. Each config in an array is generated in turn:

```ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig([
  {
    name: 'api-axios.ts',
    output: './src/apis/axios-gentype',
    url: 'http://localhost:5002/api-json',
    httpClientType: 'axios',
  },
  {
    name: 'api-fetch.ts',
    output: './src/apis/fetch-gentype',
    input: './openapi.yaml', // local file
    httpClientType: 'fetch',
    modular: true,
  },
]);
```

**Precedence**, from lowest to highest:

1. The config file
2. The file passed with `--custom-config`
3. CLI flags

When the config file exports an array, the CLI flags and the `--custom-config` options are applied
on top of **every** entry.

## CLI

```bash
swagger-typescript-api-es [options]
```

- You can write flags in kebab-case or camelCase: `--union-enums true` and `--unionEnums true` are
  the same flag. Single-letter flags also work with one dash (`-u`, `-o`, `-n`, `-t`, `-d`, `-r`).
- **Boolean flags need a value.** Write `--modular true` or `--modular false`. `false`, `0`, `no`,
  `off` and an empty string count as `false`; anything else counts as `true`. A bare `--modular`
  fails with `option '--modular <modular>' value is missing`. `--extract-enums` is the only
  exception: it is a plain switch.
- `--module-name-index` must be a number.
- The exit code is `0` on success and `1` on any error. The error is printed as
  `❌ SWAGGER-TYPESCRIPT-API error: <message>`.
- `-h, --help` prints the help and `-v, --version` prints the version.

| Flag                              | Option                     | Default    | Description                                                                                                                                  |
| --------------------------------- | -------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `--u <url>`                       | `url`                      | –          | URL or local path of the swagger schema                                                                                                      |
| `--o <output>`                    | `output`                   | `"./"`     | Output **directory**                                                                                                                         |
| `--n <name>`                      | `name`                     | `"Api.ts"` | Output file name (single-file mode)                                                                                                          |
| `--t <templates>`                 | `templates`                | –          | Path to a folder with custom templates                                                                                                       |
| `--d <bool>`                      | `defaultResponseAsSuccess` | `false`    | Treat the `default` response as a success response too                                                                                       |
| `--r <bool>`                      | `generateResponses`        | `false`    | Generate extra information about request responses, including typings for bad responses                                                      |
| `--union-enums <bool>`            | `generateUnionEnums`       | `false`    | Generate every enum as a union type (`T1 \| T2 \| TN`)                                                                                       |
| `--add-readonly <bool>`           | `addReadonly`              | `false`    | Mark `readOnly: true` schema properties as `readonly`                                                                                        |
| `--route-types <bool>`            | `generateRouteTypes`       | `false`    | Generate type definitions for API routes                                                                                                     |
| `--noClient <bool>`               | `generateClient` (negated) | `false`    | Do not generate the API class or HTTP client                                                                                                 |
| `--enum-names-as-values <bool>`   | `enumNamesAsValues`        | `false`    | Use the values in `x-enumNames` as enum values, not only as keys                                                                             |
| `--extract-request-params <bool>` | `extractRequestParams`     | `false`    | Extract request params into a data contract, combining path and query params into one object                                                 |
| `--extract-request-body <bool>`   | `extractRequestBody`       | `false`    | Extract request body types into data contracts                                                                                               |
| `--extract-response-body <bool>`  | `extractResponseBody`      | `false`    | Extract response body types into data contracts                                                                                              |
| `--extract-response-error <bool>` | `extractResponseError`     | `false`    | Extract response error types into data contracts                                                                                             |
| `--extract-enums`                 | `extractEnums`             | `false`    | Extract inline enums into TypeScript `enum` declarations (plain switch, takes no value)                                                      |
| `--modular <bool>`                | `modular`                  | `false`    | Generate separate files for the HTTP client, data contracts and routes                                                                       |
| `--js <bool>`                     | `toJS`                     | `false`    | Generate a `.js` module with a `.d.ts` declaration file                                                                                      |
| `--module-name-index <number>`    | `moduleNameIndex`          | `0`        | Which path segment to group routes into modules by (`GET:/fruits/getFruit` with index `0` gives module `fruits`)                             |
| `--module-name-first-tag <bool>`  | `moduleNameFirstTag`       | `false`    | Group routes into modules by their first tag                                                                                                 |
| `--disableStrictSSL <bool>`       | `disableStrictSSL`         | `false`    | Skip TLS certificate checks when downloading the schema                                                                                      |
| `--disableProxy <bool>`           | `disableProxy`             | `false`    | Ignore `HTTP(S)_PROXY` env variables when downloading the schema                                                                             |
| `--httpClientType <fetch\|axios>` | `httpClientType`           | `"fetch"`  | HTTP client used by the generated code                                                                                                       |
| `--unwrap-response-data <bool>`   | `unwrapResponseData`       | `false`    | Resolve requests with the response `data` instead of the full response                                                                       |
| `--disable-throw-on-error <bool>` | `disableThrowOnError`      | `false`    | (fetch) Do not throw when `response.ok` is not `true`                                                                                        |
| `--single-http-client <bool>`     | `singleHttpClient`         | `false`    | Pass an `HttpClient` instance to the `Api` constructor instead of extending it                                                               |
| `--silent <bool>`                 | `silent`                   | `false`    | Print only errors                                                                                                                            |
| `--default-response <type>`       | `defaultResponseType`      | `"void"`   | Type to use for an empty response schema                                                                                                     |
| `--type-prefix <prefix>`          | `typePrefix`               | `""`       | Prefix for data contract names                                                                                                               |
| `--type-suffix <suffix>`          | `typeSuffix`               | `""`       | Suffix for data contract names                                                                                                               |
| `--clean-output <bool>`           | `cleanOutput`              | `false`    | Delete the output folder's contents before generating. **Can lose data**                                                                     |
| `--api-class-name <name>`         | `apiClassName`             | `"Api"`    | Name of the generated API class                                                                                                              |
| `--patch <bool>`                  | `patch`                    | `false`    | Fix small errors in the swagger source definition (Swagger 2.0 conversion)                                                                   |
| `--debug <bool>`                  | `debug`                    | `false`    | Print extra information about what the generator is doing                                                                                    |
| `--another-array-type <bool>`     | `anotherArrayType`         | `false`    | Write array types as `Array<Type>` (the default is `Type[]`)                                                                                 |
| `--sort-types <bool>`             | `sortTypes`                | `false`    | Sort types and their fields alphabetically                                                                                                   |
| `--sort-routes <bool>`            | `sortRoutes`               | `false`    | Sort routes alphabetically                                                                                                                   |
| `--custom-config <path>`          | –                          | –          | js/ts/json file (relative to the working directory) that exports an options **object**. Use it for options that have no flag, such as hooks. |

Many options have no flag, for example `hooks`, `requestOptions`, `oxfmtOptrions`, `input` and
`extractingOptions`. Set those in the config file or in `--custom-config`.

## Options reference

These are all the fields of `IOptions`, which `defaultConfig()` and `generateApi()` accept.
Relative paths resolve from `process.cwd()`.

### Input / output

| Option        | Type              | Default    | Description                                                                                                                                                                                             |
| ------------- | ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`         | `string`          | –          | URL of the schema. A value that does not start with `http(s)://` is read as a local file path.                                                                                                          |
| `input`       | `string`          | –          | Path to a local schema file (JSON or YAML). Used when the file exists.                                                                                                                                  |
| `spec`        | `object`          | –          | A schema object already in memory. It takes precedence over `input` and `url`.                                                                                                                          |
| `output`      | `string \| false` | `"./"`     | Output **directory**. It is created recursively if missing, and generation fails if it points to an existing file. With `false`, nothing is written and the files are only returned from `generateApi`. |
| `name`        | `string`          | `"Api.ts"` | File name in single-file mode. The last extension is dropped and replaced by `.ts` (or by `.js` + `.d.ts` with `toJS`), so include the extension: `my.api` becomes `my.ts`.                             |
| `cleanOutput` | `boolean`         | `false`    | Delete everything in `output` before writing.                                                                                                                                                           |
| `modular`     | `boolean`         | `false`    | Write separate files. See [Modular output](#modular-output).                                                                                                                                            |
| `toJS`        | `boolean`         | `false`    | Emit JavaScript (`.js`) plus declarations (`.d.ts`) instead of `.ts`.                                                                                                                                   |
| `templates`   | `string`          | –          | Folder with custom `.eta`/`.ejs` templates. See [Custom templates](#custom-templates).                                                                                                                  |
| `patch`       | `boolean`         | `false`    | Let `swagger2openapi` fix small errors while it converts Swagger 2.0.                                                                                                                                   |

Where the schema comes from, in order: `spec`, then `input` (if the file exists), then `url`.

### Client

| Option                | Type                 | Default   | Description                                                                                                                  |
| --------------------- | -------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `httpClientType`      | `'fetch' \| 'axios'` | `'fetch'` | HTTP client of the generated `HttpClient`.                                                                                   |
| `generateClient`      | `boolean`            | `true`    | Generate the `HttpClient` and `Api` classes. With `false`, only types are generated.                                         |
| `apiClassName`        | `string`             | `"Api"`   | Name of the main API class (single-file mode).                                                                               |
| `singleHttpClient`    | `boolean`            | `false`   | `Api` receives an `HttpClient` in its constructor (`new Api(http)`) instead of extending it.                                 |
| `unwrapResponseData`  | `boolean`            | `false`   | Methods resolve with the response body (`Promise<T>`) instead of `HttpResponse<T, E>` (fetch) or `AxiosResponse<T>` (axios). |
| `disableThrowOnError` | `boolean`            | `false`   | fetch client only: do not reject when `response.ok` is `false`, so the caller checks `response.error`.                       |
| `generateResponses`   | `boolean`            | `false`   | Generate extra information about request responses, including typings for bad responses.                                     |
| `generateRouteTypes`  | `boolean`            | `false`   | Generate a namespace of types per route (`RequestParams`, `RequestQuery`, `RequestBody`, `RequestHeaders`, `ResponseBody`).  |
| `defaultResponseType` | `string`             | `"void"`  | Type to use when a response has no schema.                                                                                   |

### Types and enums

| Option                     | Type      | Default   | Description                                                                                           |
| -------------------------- | --------- | --------- | ----------------------------------------------------------------------------------------------------- |
| `generateUnionEnums`       | `boolean` | `false`   | Generate enums as union types (`'a' \| 'b'`) instead of `enum`.                                       |
| `enumNamesAsValues`        | `boolean` | `false`   | Use `x-enumNames` as the enum values, not only as the keys.                                           |
| `addReadonly`              | `boolean` | `false`   | Mark properties that have `readOnly: true` in the schema as `readonly`.                               |
| `anotherArrayType`         | `boolean` | `false`   | Use `Array<T>` instead of `T[]`.                                                                      |
| `sortTypes`                | `boolean` | `false`   | Sort data contracts and their fields alphabetically.                                                  |
| `typePrefix`               | `string`  | `""`      | Prefix for every generated type name.                                                                 |
| `typeSuffix`               | `string`  | `""`      | Suffix for every generated type name.                                                                 |
| `enumKeyPrefix`            | `string`  | `""`      | Prefix for enum keys.                                                                                 |
| `enumKeySuffix`            | `string`  | `""`      | Suffix for enum keys.                                                                                 |
| `fixInvalidTypeNamePrefix` | `string`  | `"Type"`  | Prefix added to type names that are not valid identifiers (for example ones that start with a digit). |
| `fixInvalidEnumKeyPrefix`  | `string`  | `"Value"` | Prefix added to enum keys that are not valid identifiers.                                             |
| `defaultResponseAsSuccess` | `boolean` | `false`   | Also use the `default` response as the success type.                                                  |

### Extraction

| Option                 | Type      | Default                                  | Description                                                                                                                                                    |
| ---------------------- | --------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `extractRequestParams` | `boolean` | `false`                                  | Merge path and query params into one extracted type (e.g. `ListPetsParams`). The argument is optional when every field in it is optional.                      |
| `extractRequestBody`   | `boolean` | `false`                                  | Extract inline request bodies into named types (e.g. `CreatePetPayload`).                                                                                      |
| `extractResponseBody`  | `boolean` | `false`                                  | Extract inline success response bodies into named types (e.g. `GetPetData`).                                                                                   |
| `extractResponseError` | `boolean` | `false`                                  | Extract inline error response bodies into named types (e.g. `GetPetError`).                                                                                    |
| `extractEnums`         | `boolean` | `false`                                  | Extract inline enums into top-level `enum` declarations.                                                                                                       |
| `extractingOptions`    | `object`  | [see below](#extractingoptions-defaults) | Suffixes for the names of extracted types. When a name is taken, the next suffix in the list is tried. Your arrays are deep-merged over the defaults by index. |

<a id="extractingoptions-defaults"></a>Defaults of `extractingOptions`:

```ts
{
  requestBodySuffix: ['Payload', 'Body', 'Input'],
  requestParamsSuffix: ['Params'],
  responseBodySuffix: ['Data', 'Result', 'Output'],
  responseErrorSuffix: ['Error', 'Fail', 'Fails', 'ErrorData', 'HttpError', 'BadResponse'],
}
```

A request body is optional in the generated method unless the schema marks it `required: true`.

### Routes and modules

| Option               | Type      | Default | Description                                                                                                               |
| -------------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `moduleNameIndex`    | `number`  | `0`     | Path segment used to group routes: `/pets/{id}` with index `0` gives module `pets`, so the method is `api.pets.getPet()`. |
| `moduleNameFirstTag` | `boolean` | `false` | Group routes by their first tag (camelCased) instead of by path segment.                                                  |
| `sortRoutes`         | `boolean` | `false` | Sort routes alphabetically within each module.                                                                            |
| `sortRouters`        | `boolean` | –       | **Deprecated** alias of `sortRoutes`, used only when `sortRoutes` is not set.                                             |

Routes whose path has no module segment (for example `GET /`) become methods directly on the `Api`
class. In modular mode they go to `Common.ts`.

### Output formatting

| Option          | Type                          | Default                          | Description                                                                                                                         |
| --------------- | ----------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `oxfmtOptrions` | `FormatConfig` (from `oxfmt`) | [built-in defaults](#formatting) | oxfmt options for the generated code, applied last. The spelling is intentional and is part of the public API. `parser` is ignored. |

### Network (schema download)

| Option               | Type                                         | Default                  | Description                                                                                                                                                                        |
| -------------------- | -------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `requestOptions`     | `Record<string, any> & { timeout?: number }` | `null` (timeout `60000`) | Extra [undici `fetch`](https://undici.nodejs.org) options (`headers`, `dispatcher`, `signal`, ...) for downloading the schema from `url`. `timeout` is in ms, and `0` disables it. |
| `authorizationToken` | `string`                                     | –                        | Sent as-is in the `Authorization` header when downloading the schema (for example `"Bearer xxx"`).                                                                                 |
| `disableStrictSSL`   | `boolean`                                    | `false`                  | Accept self-signed or invalid TLS certificates for `https` schema URLs.                                                                                                            |
| `disableProxy`       | `boolean`                                    | `false`                  | By default the download goes through the proxy from `HTTP_PROXY` / `HTTPS_PROXY` (respecting `NO_PROXY`). `true` connects directly.                                                |

### Logging

| Option   | Type      | Default | Description                                                       |
| -------- | --------- | ------- | ----------------------------------------------------------------- |
| `silent` | `boolean` | `false` | Print only errors. Errors are still printed when this is `true`.  |
| `debug`  | `boolean` | `false` | Verbose logs with stack traces of the generator's internal steps. |

### Advanced

| Option                    | Type                                   | Default            | Description                                                                                                                 |
| ------------------------- | -------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `hooks`                   | `object`                               | no-ops             | Lifecycle hooks. See [Hooks](#hooks).                                                                                       |
| `extraTemplates`          | `{ name: string; path: string }[]`     | `[]`               | More templates rendered with the same data. Each one is written as its own file named `name` (the extension becomes `.ts`). |
| `templateInfos`           | `{ name: string; fileName: string }[]` | built-in list      | Maps template names to template file names. It **replaces** the built-in list (see [Custom templates](#custom-templates)).  |
| `constants`               | `Record<string, any>`                  | built-in constants | Merged over the built-in constants, which are exported as `constants` and are available in templates as `config.constants`. |
| `codeGenConstructs`       | `(constructs) => Record<string, any>`  | –                  | Override the TypeScript code constructs (`config.Ts`: `Keyword`, `ArrayType`, `UnionType`, `TypeField`, ...).               |
| `primitiveTypeConstructs` | `(constructs) => Record<string, any>`  | –                  | Override how schema types and formats map to TypeScript types (see the example below).                                      |

Example: map `date-time` strings to `Date` and `int64` integers to `bigint`.

```ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  url: 'https://petstore.swagger.io/v2/swagger.json',
  output: './src/api',
  primitiveTypeConstructs: (constructs) => ({
    string: { 'date-time': 'Date' },
    integer: { int64: 'bigint', $default: 'number' },
  }),
  codeGenConstructs: (constructs) => ({
    Keyword: { Any: 'unknown' }, // use `unknown` instead of `any`
  }),
});
```

## Programmatic API

```ts
import {
  constants,
  defaultConfig,
  generateApi,
  generateTemplates,
} from 'swagger-typescript-api-es';
```

### `generateApi(options)`

It returns a `Promise` of:

| Field             | Type                                                                 | Description                                                                                                                     |
| ----------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `files`           | `{ fileName: string; fileExtension: string; fileContent: string }[]` | The generated, formatted files. They are returned even when `output: false`. The "generated file" header is added only on disk. |
| `configuration`   | `object`                                                             | The data passed to the templates (`apiConfig`, `config`, `modelTypes`, `routes`, `utils`, ...).                                 |
| `getTemplate`     | `({ fileName?, name?, path? }) => string`                            | Resolve a template's source.                                                                                                    |
| `renderTemplate`  | `(template: string, data: object, options?) => string`               | Render an Eta template string.                                                                                                  |
| `createFile`      | `({ path, fileName, content, withPrefix? }) => void`                 | Write a file (relative to `process.cwd()`).                                                                                     |
| `formatTSContent` | `(code: string) => Promise<string>`                                  | Format code with the same oxfmt options.                                                                                        |

If you pass **an array** of options, it runs them one after another and resolves with **an array**
of results.

```ts
import { generateApi } from 'swagger-typescript-api-es';

// `output: false`: nothing is written to disk, the files are only returned
const { files } = await generateApi({
  url: 'https://petstore.swagger.io/v2/swagger.json',
  output: false,
  httpClientType: 'fetch',
  requestOptions: { timeout: 30_000 },
});

for (const { fileName, fileExtension, fileContent } of files) {
  console.log(`${fileName}${fileExtension}`, fileContent.length);
}

// an array of options gives an array of results
const results = await generateApi([
  { input: './specs/auth.yaml', output: './src/api/auth' },
  { input: './specs/billing.json', output: './src/api/billing', modular: true },
]);
console.log(results.length); // 2
```

`generateApi` rejects on errors: the schema is missing or invalid, the download fails, `output` is
an existing file, and so on.

All public types are exported from the package entry: `IOptions`, `Hooks`, `GenerateApiOutput`,
`GeneratedFile`, `OpenAPIDocument`, `SchemaObject`, `ParsedRoute`, ...

```ts
import type { GenerateApiOutput, IOptions } from 'swagger-typescript-api-es';
```

To pass a schema object you already have, use `spec` (typed as `OpenAPIDocument`, OpenAPI 3.x or
Swagger 2.0). The object is never modified by the generator, and it is not even copied unless hooks,
custom schema parsers, templates or type constructs are used:

```ts
import { readFile } from 'node:fs/promises';

import { generateApi } from 'swagger-typescript-api-es';

const spec = JSON.parse(await readFile('./openapi.json', 'utf8'));
await generateApi({ spec, output: './src/api' });
```

### `generateTemplates(params)`

This copies the built-in templates (`.ejs`) into a folder so you can customize them. See
[Custom templates](#custom-templates).

### `defaultConfig(options)`

Returns `options` unchanged. It exists to type the config file.

### `constants`

The built-in constants (`HTTP_CLIENT`, `SCHEMA_TYPES`, `OXC_FORMAT_OPTIONS`, `TEMPLATES_DIR`,
`RESERVED_*_ARG_NAMES`, ...).

## Using the generated client

The examples below come from a single-file client with the default `apiClassName: 'Api'`. The
method names come from `operationId` (camelCased). Without one, the name is built from the HTTP
method and the path.

### fetch (default)

```ts
import { Api, ContentType, HttpResponse, Pet } from './src/api/Api';

const api = new Api<string>({
  baseUrl: 'https://api.example.com', // default: first `servers[].url` of the schema
  baseApiParams: { headers: { 'X-App': 'web' } }, // defaults for every request (RequestInit)
  // called for routes with `security` (or requests with `secure: true`)
  securityWorker: (token) => (token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
  // optional: custom fetch (e.g. for SSR, retries, tests)
  customFetch: (...args) => fetch(...args),
});

api.setSecurityData('my-jwt-token');

try {
  // modules come from the path (`/pets/...` -> `api.pets`)
  const response = await api.pets.getPet(1);
  const pet: Pet = response.data;
  console.log(pet.name);
} catch (e) {
  // by default a non-2xx response rejects with the HttpResponse
  const response = e as HttpResponse<unknown, unknown>;
  console.error(response.status, response.error);
}

// per-request params (RequestInit + secure/type/format/baseUrl/cancelToken)
await api.pets.listPets({ limit: 10 }, { headers: { 'X-Trace': '1' } });

// cancellation
const request = api.pets.listPets({ limit: 10 }, { cancelToken: 'pets-list' });
api.abortRequest('pets-list');
await request.catch(() => {});

// raw request
await api.request<Pet>({ path: '/pets', method: 'POST', body: {}, type: ContentType.Json });
```

- With `disableThrowOnError: true`, failed responses resolve instead of rejecting. Check
  `response.ok` and `response.error` yourself.
- With `unwrapResponseData: true`, methods resolve with the body (`Promise<Pet>`). A failed request
  still rejects with the `HttpResponse`.
- `injectHeaders: (headers) => headers | Promise<headers>` in the constructor config can rewrite
  the headers of every request.

### axios

Generate with `httpClientType: 'axios'` (and install `axios`):

```ts
import axios from 'axios';

import { Api } from './src/api/Api';

const api = new Api<string>({
  baseURL: 'https://api.example.com', // any AxiosRequestConfig option is accepted
  timeout: 10_000,
  securityWorker: (token) => (token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
  secure: false, // call securityWorker for every request when true
  format: 'json', // default responseType
  // instance: axios.create({ ... }), // or reuse your own instance (interceptors, ...)
});

api.setSecurityData('my-jwt-token');

try {
  const { data: pet } = await api.pets.getPet(1); // AxiosResponse<Pet>
  console.log(pet.name);
} catch (e) {
  if (axios.isAxiosError(e)) {
    console.error(e.response?.status, e.response?.data);
  }
}

// the underlying axios instance
api.instance.interceptors.request.use((config) => config);
```

With `unwrapResponseData: true`, methods resolve with `response.data` directly. Cancel requests
with axios' own `signal` option: `api.pets.getPet(1, { signal: controller.signal })`.

### `singleHttpClient`

```ts
import { Api, HttpClient } from './src/api/Api';

const http = new HttpClient({ baseUrl: 'https://api.example.com' });
const api = new Api(http);
```

## Modular output

With `modular: true`, `output` gets several files instead of one (`name` is ignored):

```
src/api/
├── data-contracts.ts   # all types (data contracts)
├── http-client.ts      # HttpClient, ContentType, RequestParams, ... (when generateClient)
├── Pets.ts             # class Pets extends HttpClient, one file per module
├── Store.ts
├── Common.ts           # routes outside any module, e.g. `GET /`
├── PetsRoute.ts        # namespace Pets { ... } route types (generateRouteTypes: true)
├── StoreRoute.ts
└── CommonRoute.ts      # route types of out-of-module routes (generateRouteTypes: true)
```

- Module files are named `PascalCase(moduleName).ts`, and each exports a class of the same name.
  If that name clashes with a data contract, the class is named `<Module>Api` instead.
- Route type files are `<Module>Route.ts`. They export `namespace <Module>`, or
  `namespace <Module>Route` on a clash.
- With `generateClient: false`, only `data-contracts.ts` (and the route types) are written.
- With `toJS: true`, every file becomes `.js` + `.d.ts`.

```ts
import { Pets } from './src/api/Pets';
import { Store } from './src/api/Store';

const config = { baseUrl: 'https://api.example.com' };
const pets = new Pets(config);
const store = new Store(config);

const { data } = await pets.listPets();
```

In single-file mode, `generateRouteTypes: true` adds the route namespaces to the same file.

## Custom templates

Templates use [Eta](https://eta.js.org/) v2 syntax (`<%~ raw %>`, `<%= escaped %>`,
`<% code %>`, data in `it`). Files may end in `.eta` or `.ejs`.

**1. Copy the built-in templates:**

```ts
import { generateTemplates } from 'swagger-typescript-api-es';

await generateTemplates({
  output: './api-templates', // omit to only get the files back
  httpClientType: 'axios', // which http-client.ejs to copy (default: 'fetch')
  modular: false, // copy the modular or default api templates
  rewrite: false, // overwrite templates that already exist in `output`
  cleanOutput: false, // empty `output` first
  silent: false,
});
// resolves with { files: { name, content }[], configuration, createFile }
```

The copied files are flattened into one folder. Their `@base/`, `@default/` and `@modular/`
include paths are rewritten to `./`.

**2. Edit the files you need, and delete the rest.** A template missing from your folder falls back
to the built-in one.

**3. Point the generator at the folder:** `templates: './api-templates'` or
`--t ./api-templates`.

| Name (`templateInfos`)  | File                          | Output                                                  |
| ----------------------- | ----------------------------- | ------------------------------------------------------- |
| `api`                   | `api.ejs`                     | The `Api` class (default) or a module class (modular)   |
| `dataContracts`         | `data-contracts.ejs`          | All data contracts                                      |
| `dataContractJsDoc`     | `data-contract-jsdoc.ejs`     | JSDoc of a data contract                                |
| `interfaceDataContract` | `interface-data-contract.ejs` | An `interface` contract                                 |
| `typeDataContract`      | `type-data-contract.ejs`      | A `type` contract                                       |
| `enumDataContract`      | `enum-data-contract.ejs`      | An `enum` contract                                      |
| `objectFieldJsDoc`      | `object-field-jsdoc.ejs`      | JSDoc of an object field                                |
| `httpClient`            | `http-client.ejs`             | The `HttpClient` class (includes `http-clients/<type>`) |
| `routeTypes`            | `route-types.ejs`             | Route type namespaces                                   |
| `routeName`             | `route-name.ejs`              | Returns the method name of a route                      |

The partials they include are `procedure-call.ejs` (one API method), `route-docs.ejs` (JSDoc of a
method), `route-type.ejs` (one route namespace) and `http-clients/{fetch,axios}-http-client.ejs`.

**How templates are found:** your `templates` folder first, then `templates/base`, then
`templates/default` or `templates/modular`. Inside a template, `includeFile(path, data)` accepts the
prefixes `@base/`, `@default/`, `@modular/`, `@original/` and `@custom/`. A path without a prefix
is looked up in the custom folder, then in the built-in one.

**What `it` contains:** `apiConfig` (`baseUrl`, `title`, `version`, `info`, `servers`, `tags`, ...),
`config` (all options, including `config.Ts` constructs and `config.constants`), `modelTypes`,
`routes` (`{ outOfModule, combined }`), `route` (the current module, in modular `api` and
`routeTypes`), `hasSecurityRoutes`, `hasQueryRoutes`, `hasFormDataRoutes`, `generateResponses`,
`fileName`, `translateToJavaScript` and `utils`.

**`utils`:** `Ts`, `formatDescription`, `escapeJSDocContent`, `internalCase`, `classNameCase`,
`pascalCase`, `getInlineParseContent`, `getParseContent`, `getComponentByRef`, `parseSchema`,
`checkAndAddNull`, `safeAddNullToType`, `isNeedToAddNull`, `inlineExtraFormatters`, `formatters`,
`formatModelName`, `fmtToJSDocLine`, `NameResolver`, `require`, and `_`, lodash-compatible helpers
(from [`es-toolkit/compat`](https://es-toolkit.dev/compatibility.html)):
`compact`, `merge`, `each`, `isEmpty`, `sortByProperty`, `noop`, `isObject`, `isString`,
`isUndefined`, `map`, `uniq`, `size`, `replace`, `camelCase`, `lowerCase`, `values`, `join`, `get`,
`upperCase`, `sortBy`. `require('./x')` resolves from the templates folder. A package name
resolves from your project first.

**Extra files:** `extraTemplates: [{ name: 'endpoints.ts', path: './tpl/endpoints.ejs' }]` renders
each template with the same data and writes it next to the other files.

## Hooks

Set hooks under `hooks` in the config file (or `--custom-config`) or in `generateApi` options. When a
hook returns `undefined`, the original value is kept.

| Hook                    | Signature                                                             | Return value                                                            |
| ----------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `onInit`                | `(config, codeGenProcess) => config \| void`                          | Changes to apply to the configuration (runs after the schema is loaded) |
| `onPrepareConfig`       | `(templateData) => templateData \| void`                              | Replaces the data passed to the templates                               |
| `onCreateComponent`     | `(component) => component \| void`                                    | Replaces a `#/components/*` entry                                       |
| `onPreParseSchema`      | `(originalSchema, typeName, schemaType) => object \| void`            | Deep-merged into the schema before it is parsed                         |
| `onParseSchema`         | `(originalSchema, parsedSchema) => parsedSchema \| void`              | Replaces the parsed schema                                              |
| `onCreateRoute`         | `(routeData) => routeData \| false \| void`                           | Replaces the route. **`false` skips it.**                               |
| `onCreateRouteName`     | `(routeNameInfo, rawRouteInfo) => routeNameInfo \| void`              | Replaces `{ usage, original, duplicate }`                               |
| `onFormatRouteName`     | `(rawRouteInfo, templateRouteName) => string \| void`                 | New method name                                                         |
| `onFormatTypeName`      | `(typeName, rawTypeName, schemaType) => string \| void`               | New type name. `schemaType` is `'type-name'` or `'enum-key'`.           |
| `onCreateRequestParams` | `(rawType) => schema \| void`                                         | Replaces the schema of the request params object                        |
| `onPreBuildRoutePath`   | `(routePath) => string \| void`                                       | Rewrites the raw path before its params are parsed                      |
| `onBuildRoutePath`      | `({ originalRoute, route, pathParams, queryParams }) => same \| void` | Replaces the parsed path                                                |
| `onInsertPathParam`     | `(paramName, index, allParams, route) => string \| void`              | Expression inserted into `${...}` of the path template                  |

All hooks are typed (`Hooks` is exported), so a `.ts` config gets autocompletion and type checking
for their arguments and return values.

```ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  url: 'https://petstore.swagger.io/v2/swagger.json',
  output: './src/api',
  hooks: {
    // drop the "Dto" suffix from every type name
    onFormatTypeName: (typeName) => typeName.replace(/Dto$/, ''),
    // skip deprecated operations
    onCreateRoute: (routeData) => (routeData.raw.deprecated ? false : routeData),
    // name methods after the operationId, prefixed with the HTTP method
    onFormatRouteName: (routeInfo, templateRouteName) =>
      routeInfo.operationId ? `${routeInfo.method}_${routeInfo.operationId}` : templateRouteName,
  },
});
```

`rawRouteInfo` / `routeData.raw` contains the operation fields (`operationId`, `method`, `route`,
`moduleName`, `tags`, `summary`, `description`, `responses`, `requestBody`, `pathArgs`, ...).

## Formatting

Generated code is formatted with [oxfmt](https://oxc.rs/docs/guide/usage/formatter). Options are
merged in this order, and later ones win:

1. Built-in defaults: `singleQuote: true`, `jsxSingleQuote: true`, `printWidth: 100`,
   `trailingComma: 'es5'`, `tabWidth: 2`, `semi: true`, and grouped `sortImports`
2. `.oxfmtrc.json` in the current working directory, if there is one (its `$schema`,
   `ignorePatterns` and `overrides` are ignored)
3. `oxfmtOptrions` from your config. The spelling is intentional.

```ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  url: 'https://petstore.swagger.io/v2/swagger.json',
  oxfmtOptrions: { printWidth: 120, singleQuote: false, semi: false },
});
```

If formatting fails, a warning is printed and the code is written unformatted.

## Troubleshooting / FAQ

- **The CLI exits with code `1`.** Every error is printed as
  `❌ SWAGGER-TYPESCRIPT-API error: ...` and the process exits with `1`, so a failed generation
  also fails CI.
- **`option '--xxx <xxx>' value is missing`.** Boolean flags need a value: `--modular true`.
- **`missing swagger schema`.** Pass `--u <url>` or create `swagger-typescript-api.config.ts`
  containing `url`, `input` or `spec`. Every entry of an array config needs one.
- **Local file or URL?** `url` treats anything that does not start with `http://` or `https://` as a
  path relative to the working directory. `input` is always a local path. JSON and YAML both work.
- **`Output path "..." is not a directory`.** `output` must be a **directory**. Set the file name
  with `name` / `--n`.
- **`silent` still prints something.** `silent` hides logs, but errors are always printed.
- **Download timeouts.** The schema download times out after **60 s**. Change it with
  `requestOptions: { timeout: 120_000 }` (`0` disables the timeout). This option has no CLI flag.
- **Self-signed certificates.** Use `disableStrictSSL: true` (or `--disableStrictSSL true`).
- **Proxies.** The download respects `HTTP_PROXY` / `HTTPS_PROXY` / `NO_PROXY`. Use `disableProxy: true`
  to connect directly, or pass your own undici dispatcher:
  `requestOptions: { dispatcher: new ProxyAgent(proxyUrl) }` (`import { ProxyAgent } from 'undici'`).
  The node-fetch style `agent` option is no longer supported.
- **Protected schema.** Use `authorizationToken: 'Bearer <token>'` or
  `requestOptions: { headers: { ... } }`.
- **`sortRouters`** is deprecated. Use `sortRoutes`.
- **Why is the body or params argument optional?** A request body is optional unless the schema marks it
  `required: true`. With `extractRequestParams`, the params argument is optional when all its fields
  are optional.
- **`require is not defined` or `ERR_REQUIRE_ESM`.** The package is ESM only. Use `import` (and
  `"type": "module"` or `.mjs`/`.ts` for your own scripts).

## AI agent skill

```bash
npx skills add hunghg255/swagger-typescript-api-es
```

## Contributing

```bash
git clone https://github.com/hunghg255/swagger-typescript-api-es
cd swagger-typescript-api-es
npm install
```

| Script                      | What it does                                                                    |
| --------------------------- | ------------------------------------------------------------------------------- |
| `npm run build`             | Build with `unbuild` and copy `templates/` to `dist/templates/`                 |
| `npm run dev`               | Stub build (`unbuild --stub`) for fast local development                        |
| `npm test`                  | Run the tests with Vitest (`npm test -- --run` runs them once)                  |
| `npm run test:coverage`     | Run the tests once with v8 coverage                                             |
| `npm run test:immutability` | Run the tests with deep-frozen input specs (the generator must not change them) |
| `npm run lint`              | Lint with oxlint (`lint:fix` to fix)                                            |
| `npm run fmt`               | Format with oxfmt (`fmt:check` to check)                                        |
| `npm run typecheck`         | `tsc --noEmit`                                                                  |
| `npm start`                 | Run the playground `play/test.ts`                                               |
| `npm run bench`             | Build, then benchmark generation on small / large specs                         |
| `npm run test:cli`          | Run the built CLI (`node dist/cli.mjs`)                                         |
| `npm run test:cli1`         | Run the CLI from source (`tsx src/cli.ts`)                                      |

Tests live in `tests/`:

- `tests/core`: CLI, configuration, option parsing, schema resolving and download, `generateApi`
  and `generateTemplates`
- `tests/generation`: generated output (snapshots, naming, parameters, responses, types)
- `tests/options`: behaviour of individual options
- `tests/runtime`: runs the generated fetch and axios clients against real requests
- `tests/fixtures` and `tests/helpers`: shared schemas and helpers

To run a single file: `npx vitest run tests/core/cli-start.test.ts`.

### Docs site and online playground

`docs/` is a Next.js app with the documentation (rendered from this README) and a playground that
generates clients in a serverless function (`POST /api/generate`), so you can try options, view the
generated files and download them (one by one or as a `.zip`).

```bash
npm run build          # the docs app uses the library from ../dist
cd docs && npm install
npm run dev            # http://localhost:3000
```

See [`docs/README.md`](docs/README.md) for the API, its security limits and how to deploy it on Vercel.

CI runs lint, `fmt:check`, typecheck, the tests and the build on Node 20 and 22. Commit messages
follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`,
`chore:`, ...).

## License

Licensed under the [MIT License](https://github.com/hunghg255/swagger-typescript-api-es/blob/main/LICENSE).

Based on [swagger-typescript-api](https://github.com/acacode/swagger-typescript-api) by
[acacode](https://github.com/acacode) (MIT). Rewritten to TypeScript and ES modules by
[hunghg255](https://github.com/hunghg255).
