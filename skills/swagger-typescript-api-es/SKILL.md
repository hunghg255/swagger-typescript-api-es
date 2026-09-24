---
name: swagger-typescript-api-es
description: Guide for using swagger-typescript-api-es — a CLI and Node.js tool that generates TypeScript API clients from Swagger/OpenAPI schemas (ESM rewrite). Use when user asks to generate TypeScript API types from Swagger or OpenAPI, auto-generate axios or fetch HTTP client from swagger.json, set up swagger-typescript-api.config.ts, run gen-api-types script, or use swagger-typescript-api-es CLI.
license: MIT
metadata:
  author: hunghg255
  version: 0.0.15
  source: https://github.com/hunghg255/swagger-typescript-api-es
---

# swagger-typescript-api-es

ESM + TypeScript rewrite of [swagger-typescript-api](https://github.com/acacode/swagger-typescript-api). Generates fully-typed TypeScript API clients (axios or fetch) from a Swagger 2.0 / OpenAPI 3.0 schema URL or file.

## Install

Requires Node.js >= 20.

```bash
npm i swagger-typescript-api-es@latest --save-dev
# or
pnpm i swagger-typescript-api-es@latest -D
```

## Quick Start (One-off CLI)

No install needed — run directly with npx:

```bash
npx swagger-typescript-api-es@latest -u https://petstore.swagger.io/v2/swagger.json -o ./src/api
```

## Project Setup (Config File)

### Step 1: Create `swagger-typescript-api.config.ts` at project root

```ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  name: 'api-axios.ts', // output filename
  output: './src/apis/axios-gentype', // output directory
  url: 'http://localhost:5002/api-json', // swagger schema URL
  httpClientType: 'axios', // 'axios' | 'fetch'
});
```

### Step 2: Add script to `package.json`

```json
{
  "scripts": {
    "gen-api-types": "swagger-typescript-api-es"
  }
}
```

### Step 3: Run

```bash
npm run gen-api-types
# or
pnpm gen-api-types
```

## CLI Flags

```bash
npx swagger-typescript-api-es@latest --help
```

Key flags:

| Flag                      | Description                                       |
| ------------------------- | ------------------------------------------------- |
| `-u <url>`                | Path/URL to swagger schema                        |
| `-o <path>`               | Output directory (default: `./`)                  |
| `-n <name>`               | Output filename (default: `Api.ts`)               |
| `--httpClientType <type>` | `axios` or `fetch` (default: `fetch`)             |
| `--modular true`          | Separate files for http client, contracts, routes |
| `--custom-config <path>`  | Extra options (hooks, ...) from a js/ts/json file |

- Flags accept both kebab-case and camelCase (`--union-enums` / `--unionEnums`); boolean flags take `true`/`false` (e.g. `--modular true`).
- CLI flags are merged over `swagger-typescript-api.config.*` (if it exists) and the `--custom-config` file — CLI flags win.
- The CLI exits with code `1` on errors.

## Using a Local Schema File

Instead of `url`, use `input` for a local file:

```ts
export default defaultConfig({
  name: 'api.ts',
  output: './src/api',
  input: './swagger.json', // local file path
  httpClientType: 'fetch',
});
```

## Gotchas

- **Config filename must be `swagger-typescript-api.config.ts`** (or `.js` / `.mjs` / `.cjs`) in the project root — the CLI looks for this name. It may export a single config or an array of configs.
- **Schema source precedence: `spec` > `input` > `url`** — `input` is used if the file exists; `url` also accepts a local file path. Set only one to avoid surprises.
- **`output` must be a directory** (default: `./`) — it is created (recursively) if missing; pointing it at an existing file fails. `output: false` generates in memory only (`generateApi` returns the files without writing).
- **`cleanOutput: true` deletes everything in the output folder before generating** — do not point it at a folder that has hand-written files.
- **`httpClientType` defaults to `fetch`** — explicitly set `'axios'` if your project uses axios, otherwise the generated client won't import it.
- **`unwrapResponseData: true` changes the return shape** — with it, `api.getUser()` returns the data directly instead of the full axios response; set consistently across your codebase.
- **`extractEnums: true` extracts inline enums** into separate enum declarations — without it, inline enums stay as union literals in types.
- **Request body is optional unless the schema marks it `required: true`**; with `extractRequestParams`, the extracted query params argument is optional when all its fields are optional.
- **`silent: true` hides logs but still prints errors.**
- **`sortRouters` is deprecated** — use `sortRoutes`. `disableProxy` is a no-op.
- **Swagger 2.0 vs OpenAPI 3.0** — both are supported but some options like `generateResponses` behave differently between versions. Test with your actual schema.

See `references/options.md` for the full IOptions reference.
See `references/patterns.md` for common usage patterns.
