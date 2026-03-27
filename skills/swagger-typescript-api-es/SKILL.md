---
name: swagger-typescript-api-es
description: Guide for using swagger-typescript-api-es — a CLI and Node.js tool that generates TypeScript API clients from Swagger/OpenAPI schemas (ESM rewrite). Use when user asks to generate TypeScript API types from Swagger or OpenAPI, auto-generate axios or fetch HTTP client from swagger.json, set up swagger-typescript-api.config.ts, run gen-api-types script, or use swagger-typescript-api-es CLI.
license: MIT
metadata:
  author: hunghg255
  version: 0.0.13
  source: https://github.com/hunghg255/swagger-typescript-api-es
---

# swagger-typescript-api-es

ESM + TypeScript rewrite of [swagger-typescript-api](https://github.com/acacode/swagger-typescript-api). Generates fully-typed TypeScript API clients (axios or fetch) from a Swagger 2.0 / OpenAPI 3.0 schema URL or file.

## Install

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
import { defaultConfig } from 'swagger-typescript-api-es'

export default defaultConfig({
  name: 'api-axios.ts',                  // output filename
  output: './src/apis/axios-gentype',     // output directory
  url: 'http://localhost:5002/api-json',  // swagger schema URL
  httpClientType: 'axios',               // 'axios' | 'fetch'
})
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

| Flag | Description |
|---|---|
| `-u <url>` | URL to swagger schema |
| `-o <path>` | Output directory |
| `-n <name>` | Output filename |
| `--axios` | Use axios HTTP client |
| `--fetch` | Use fetch HTTP client |

## Using a Local Schema File

Instead of `url`, use `input` for a local file:

```ts
export default defaultConfig({
  name: 'api.ts',
  output: './src/api',
  input: './swagger.json',   // local file path
  httpClientType: 'fetch',
})
```

## Gotchas

- **Config filename must be exactly `swagger-typescript-api.config.ts`** (or `.js` / `.mjs`) — the CLI looks for this name by default.
- **`url` and `input` are mutually exclusive** — use `url` for remote schemas, `input` for local files. Providing both causes unpredictable behavior.
- **`output` directory must exist or be creatable** — the tool does not create deeply nested paths automatically; ensure parent dirs exist.
- **`cleanOutput: true` deletes everything in the output folder before generating** — do not point it at a folder that has hand-written files.
- **`httpClientType` defaults to `fetch`** — explicitly set `'axios'` if your project uses axios, otherwise the generated client won't import it.
- **`unwrapResponseData: true` changes the return shape** — with it, `api.getUser()` returns the data directly instead of the full axios response; set consistently across your codebase.
- **`extractEnums: true` is needed for proper enum generation** — without it, enums are inlined as string literals in types.
- **Swagger 2.0 vs OpenAPI 3.0** — both are supported but some options like `generateResponses` behave differently between versions. Test with your actual schema.

See `references/options.md` for the full IOptions reference.
See `references/patterns.md` for common usage patterns.
