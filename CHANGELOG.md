# Changelog

## v0.2.0 (unreleased)

### ⚠️ Breaking changes

- **Node.js >= 20** is required (`engines.node`).
- **Request body is optional unless the schema marks it `required: true`** (OpenAPI default). Methods
  like `createItem(data: Item)` become `createItem(data?: Item)` when `requestBody.required` is missing.
- **Extracted query params are optional** (`extractRequestParams`) when the route has no path params
  and every query param is optional: `listPets(query?: ListPetsParams)`.
- **Path params are encoded** with `encodeURIComponent` in generated clients (`/pets/${encodeURIComponent(petId)}`).
- **The config file is always read by the CLI** and CLI flags are merged over it (flags win). Before,
  passing any flag ignored `swagger-typescript-api.config.*` completely.
- **The CLI exits with code `1` on errors** (was `0`).
- **Schema download uses undici `fetch`:**
  - `HTTP_PROXY` / `HTTPS_PROXY` / `NO_PROXY` are respected by default, `disableProxy: true` connects directly.
  - node-fetch style `requestOptions.agent` is not supported anymore, pass an undici `dispatcher` instead.
  - Non-2xx responses and network errors fail the generation with a clear message; downloads time out
    after 60s (`requestOptions.timeout`).
- **`silent: true` still prints errors.**
- **Modular output:**
  - route types of routes without a module (e.g. `GET /`) are written to `CommonRoute.ts`;
  - a module whose name clashes with a data contract gets an `Api` / `Route` suffix (`HealthApi`);
  - a response component with the same name as a schema component is renamed (`ErrorResponse`) with `extractResponses`.
- **Boolean enums** are generated as union types (`true | false`) — a TS `enum` with boolean values does not compile.
- **Type names are deterministic**: the same spec always produces the same names (they were picked randomly on name clashes).

- Schemas no longer get a `$parsed` property (an undocumented internal cache) and the `spec` object
  passed to `generateApi` is never modified.

### 🐞 Bug fixes

- CLI:
  - multi-word flags (`--extract-enums`, `--union-enums`, `--api-class-name`, ...) were ignored;
  - wrong targets for `--d`, `--r`, `--union-enums`, `--route-types`, `--default-response`; `--noClient` was inverted;
  - `--custom-config` did nothing; a missing config file crashed the CLI.
- `output` defaults to `./`; `output: false` generates in memory; `undefined` options no longer wipe defaults
  (a missing `name` produced a hidden `.ts` file).
- A failed download was parsed as the schema; invalid Swagger 2 documents crashed the process instead of rejecting.
- `toJS: true` always crashed; its `.d.ts` had a broken `Promise<HttpResponse<...>` type.
- `oxfmtOptrions` and `.oxfmtrc.json` were ignored by the formatter.
- `utils.require()` in custom templates, `generateTemplates()` and relative `createFile()` paths were broken.
- Generated code that did not compile:
  - `*/` in `pattern`, `example`, `title`, `summary`, ... closed JSDoc comments;
  - duplicate identifiers from path-level + operation-level parameters;
  - modular + axios (`HttpResponse` import), modular + discriminator (internal types imports).
- Wrong types:
  - `2XX` responses were not treated as success; `$ref` error responses were dropped; 204 responses became `any`;
  - `required` of `allOf` children was lost; `null` in `enum` and OAS 3.1 `type` arrays were lost;
  - responses were typed as unrelated primitive components with the same content;
  - user components were overwritten by extracted types with the same name;
  - duplicated enums with `extractRequestParams` + `extractEnums`.
- Missing output: out-of-module routes in modular mode and in route types; response components with `extractResponses`.
- Fetch client: `data` was `null` for text and binary responses; `null` query params were sent as `"null"`.
- Swagger 2 `formData` with `x-www-form-urlencoded` was sent as multipart.
- Vendor extensions under `components` were treated as components.
- `primitiveTypeConstructs` without `$default` could produce `[object Object]` types.
- `$ref` names containing "undefined" could resolve to the wrong schema for operations without `operationId`.

### ⚡ Performance

- The generator no longer changes the input document, so it is not deep-copied anymore:
  - parse results are cached aside (`ParsedSchemaCache`) instead of `schema.$parsed`, the
    `items` without `type`, discriminator mapping and `consumes` / `produces` fixes are applied to copies;
  - the document is copied only when custom code (hooks, schema parsers, templates, type constructs)
    could change it; `originalSchema` shares the unchanged objects with the input;
  - ~25% faster in-process generation of large specs, ~14% faster CLI run; guarded by
    `npm run test:immutability` (the whole suite with deep-frozen inputs) in CI.
- Compiled Eta templates are cached (they were recompiled for every route, model and include) and
  included template files are read once.
- `typescript` is only loaded when `toJS` is used (~400ms less startup).
- `lodash-es` replaced by `es-toolkit` (`es-toolkit/compat` where lodash semantics matter, the faster
  core `cloneDeep` for documents). `utils._` in templates keeps the same lodash-compatible functions.
- The config no longer deep-merges whole documents (`spec`, `swaggerSchema`, `originalSchema`) and
  skips the no-op `onInit` update, which copied the whole schema several times.
- Algorithmic fixes:
  - response / request types were resolved by scanning (and re-formatting the names of) every
    component for every route (O(routes × components), 3.4M `formatName` calls on a 1500 / 3000 spec):
    now an index built once;
  - `$ref` lookups in the components map and reserved-name checks use a `Map` / `Set` instead of
    linear scans;
  - memoized `pascalCase` / `internalCase`, pooled random bytes for route ids, and a document read
    from a file / URL is no longer deep-copied before use.
- CLI run (new process): small spec ~840ms → ~380ms; 1500 schemas / 3000 operations ~3.6s → ~1.3s.
  In-process generation of that spec (`npm run bench`): ~2.6s → ~0.7s. The generated output is unchanged.

### 🏎 Dependencies

- Replaced `unprompts` with `cac` (drops `unbuild`/`esbuild` from runtime dependencies), `node-fetch-h2` with
  `undici`, removed `make-dir`, `nanoid`, `node-emoji` and `lodash-es` (now `es-toolkit`), declared `picocolors`.
- `npm audit`: 0 vulnerabilities.

### 🏷 Types

- The whole codebase is strictly typed (no `any` / `@ts-ignore`, enforced by oxlint).
- Public types are exported: `IOptions`, `Hooks`, `GenerateApiOutput`, `GeneratedFile`, `OpenAPIDocument`,
  `SchemaObject`, `ParsedRoute`, ... `spec` accepts a full OpenAPI/Swagger document, hooks have typed
  arguments and return values. Configs that relied on `any` (e.g. reading unknown properties in hooks)
  may need a cast.

### 🧪 Tests & tooling

- ~800 tests: CLI/config, generation, every option and hook, and runtime tests of generated fetch/axios clients
  against a local HTTP server.
- CI runs lint, format check, typecheck, tests and build on Node 20 and 22.
- README, docs and the agent skill were rewritten to match the code.
