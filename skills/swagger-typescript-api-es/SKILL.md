---
name: swagger-typescript-api-es
description: Guide for swagger-typescript-api-es, an ESM/TypeScript CLI and Node.js library that generates typed TypeScript API clients (fetch or axios) from Swagger 2.0 / OpenAPI 3.x schemas. Use when the user wants to generate TypeScript types or an API client from swagger.json / openapi.yaml, set up swagger-typescript-api.config.ts, run the swagger-typescript-api-es CLI or a gen-api-types script, call generateApi() programmatically, write hooks or custom templates, or use a generated Api / HttpClient class (baseUrl, securityWorker, auth headers, error handling, modular output).
license: MIT
metadata:
  author: hunghg255
  version: 0.2.0
  source: https://github.com/hunghg255/swagger-typescript-api-es
---

# swagger-typescript-api-es

ESM + TypeScript rewrite of [swagger-typescript-api](https://github.com/acacode/swagger-typescript-api).
Reads a Swagger 2.0 / OpenAPI 3.x schema (URL, local JSON/YAML file or in-memory object) and writes a
typed client: data contracts + an `HttpClient` (fetch or axios) + an `Api` class with one method per operation.

## Install

Requires **Node.js >= 20**. ESM only (`import`, no `require`).

```bash
npm i -D swagger-typescript-api-es   # pnpm add -D / yarn add -D / bun add -d
npm i axios                          # only if you generate with httpClientType: 'axios'
```

## Quick start

```bash
# one-off, no install
npx swagger-typescript-api-es@latest -u https://petstore.swagger.io/v2/swagger.json -o ./src/api
# -> ./src/api/Api.ts (fetch client)
```

Project setup: `swagger-typescript-api.config.ts` (or `.js` / `.mjs` / `.cjs`) in the directory you
run the CLI from. It may export one config or an array (each entry is generated in turn).

```ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  url: 'http://localhost:5002/api-json', // or input: './openapi.yaml', or spec: {...}
  output: './src/api', // a directory (created if missing)
  name: 'api.ts', // file name (default "Api.ts"), ignored with modular
  httpClientType: 'axios', // default 'fetch'
});
```

```json
{ "scripts": { "gen-api-types": "swagger-typescript-api-es" } }
```

Programmatic:

```ts
import { generateApi } from 'swagger-typescript-api-es';

const { files } = await generateApi({ input: './openapi.json', output: false }); // in memory
// files: { fileName: 'Api', fileExtension: '.ts', fileContent: string }[]
```

Using the generated client (fetch):

```ts
import { Api } from './src/api/Api';

const api = new Api<string>({
  baseUrl: 'https://api.example.com',
  securityWorker: (token) => (token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
});
api.setSecurityData('jwt');
const { data: pet } = await api.pets.getPet(1); // rejects with the HttpResponse on non-2xx
```

## Key gotchas

- **CLI flags**: `-u/--u`, `-o/--o`, `-n/--n`, `-t/--t`, then kebab-case or camelCase
  (`--union-enums` = `--unionEnums`). Every flag except `--extract-enums` **needs a value**:
  `--modular true` (bare `--modular` fails with "value is missing"). Unknown flags are errors.
- **Precedence**: config file < `--custom-config <file>` (js/ts/json, one object) < CLI flags. With an
  array config, flags are applied to every entry. Errors print `❌ SWAGGER-TYPESCRIPT-API error: ...`
  and **exit with code 1**. `silent: true` hides logs but still prints errors.
- **Schema source**: `spec` > `input` (if the file exists) > `url`. `url` without `http(s)://` is read
  as a local path. The `spec` object you pass is never modified.
- **`output` is a directory**, never a file (`name` sets the file). `output: false` writes nothing
  and only returns the files. `cleanOutput: true` empties the directory first.
- **Download** (undici): respects `HTTP_PROXY`/`HTTPS_PROXY`/`NO_PROXY`; `disableProxy` connects
  directly; `disableStrictSSL` skips TLS checks; `requestOptions.timeout` defaults to 60 s (`0` = off);
  `requestOptions.dispatcher` for a custom undici dispatcher. node-fetch `agent` is not supported.
  `authorizationToken` is sent verbatim as `Authorization` (include `Bearer `).
- **Generated signatures**: `(pathParams..., query, data, params: RequestParams = {})`, with
  required arguments moved before optional ones (e.g. `updatePet(petId, data?, params)`).
  The body is optional unless `requestBody.required: true`; with `extractRequestParams` the params
  object is optional when there are no path params and all query params are optional. Path params
  are wrapped in `encodeURIComponent`.
- **Modules** come from the first path segment (`/pets/{id}` -> `api.pets.getPet`), not tags, unless
  `moduleNameFirstTag: true` or `moduleNameIndex` is set. Routes like `GET /` are methods on `Api`
  (modular: `Common.ts`).
- **Fetch client throws on non-2xx** (the `HttpResponse`, with `.error`) unless `disableThrowOnError`.
  `unwrapResponseData: true` makes methods resolve with the body instead of the response.
- A schema named `Error` generates `export interface Error`: import it as
  `import type { Error as ApiError }` to avoid shadowing the global.
- Output is formatted with **oxfmt**: built-in defaults < `.oxfmtrc.json` in cwd < `oxfmtOptrions`
  (that misspelling is the real option name).
- `sortRouters` is deprecated (use `sortRoutes`). `toJS: true` emits `.js` + `.d.ts`.

## References

- `references/options.md`: every `IOptions` key with defaults, CLI flag mapping, hooks with
  signatures, exported types, `generateApi` return value.
- `references/patterns.md`: config recipes (axios, local file, multiple APIs, large schemas, hooks,
  in-memory generation, custom templates, proxies/auth, CI).
- `references/usage.md`: using the generated client (fetch, axios, `singleHttpClient`, modular),
  auth, cancellation, error handling, file upload.

Docs: the repository README and the docs site with an online playground (the `docs/` Next.js app in
the repo) that generates clients from a pasted spec or URL.
