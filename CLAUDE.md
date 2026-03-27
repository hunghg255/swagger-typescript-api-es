# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`swagger-typescript-api-es` is an ESM/TypeScript rewrite of [acacode/swagger-typescript-api](https://github.com/acacode/swagger-typescript-api). It generates TypeScript API clients from OpenAPI 3.0 / Swagger 2.0 specifications.

## Commands

```bash
# Build (compiles TypeScript + copies templates to dist/)
npm run build

# Development stub build (fast, no real compilation)
npm run dev

# Run tests (no test files exist yet — vitest will exit cleanly)
npm test

# Run a single test file
npx vitest run <path-to-test>

# Lint
npm run lint
npm run lint:fix

# Format
npm run fmt
npm run fmt:check

# Run the playground (play/test.ts)
npm start

# Test the built CLI
npm run test:cli

# Test the CLI directly from source
npm run test:cli1
```

**Commit convention** is enforced via `verify-commit-msg` on `commit-msg` hook. Linting runs on `pre-commit`. Follow conventional commits (`feat:`, `fix:`, `chore:`, etc.).

## Architecture

### Code Generation Pipeline

The core flow in `src/code-gen-process.ts`:

1. **Schema Resolution** (`src/swagger-schema-resolver.ts`) — fetches spec from URL or file, converts Swagger 2.0 → OpenAPI 3.0 via `swagger2openapi`, resolves `$ref`s.
2. **Component Mapping** (`src/schema-components-map.ts`) — indexes all `#/components/schemas/*` entries.
3. **Schema Walking** (`src/schema-walker.ts`) — traverses and caches resolved schema nodes (WIP).
4. **Schema Parsing** (`src/schema-parser/`) — recursively parses schema nodes into internal type representations.
5. **Route Extraction** (`src/schema-routes/schema-routes.ts`) — converts OpenAPI paths/operations into method descriptors.
6. **Template Rendering** (`src/templates-worker.ts`) — uses the [Eta](https://eta.js.org/) template engine to emit TypeScript code.
7. **Code Formatting** (`src/code-formatter.ts`) — formats output with `oxfmt` (Biome-based formatter); config loaded from `.oxfmtrc.json` in the project root.
8. **File Output** (`src/util/file-system.ts`) — writes files to disk.

`ComponentTypeNameResolver` (`src/component-type-name-resolver.ts`) handles deduplication of generated type names across components. `TypeNameFormatter` (`src/type-name-formatter.ts`) applies prefix/suffix options and casing rules.

### Schema Parser Structure

```
src/schema-parser/
  schema-parser.ts          # Orchestrates parsing, delegates to base/complex parsers
  schema-parser-fabric.ts   # Factory: instantiates parsers based on schema shape
  schema-formatters.ts      # Formats parsed schemas into type strings
  schema-utils.ts           # Shared utilities
  base-schema-parsers/      # object, array, primitive, enum, complex, discriminator
  complex-schema-parsers/   # allOf, anyOf, oneOf, not
```

### Template System

Templates live in `templates/` and are copied to `dist/templates/` on build:

- `templates/base/` — shared partials used by both output modes
- `templates/default/` — single-file output (all types + client in one file)
- `templates/modular/` — multi-file output (separate `http-client`, `data-contracts`, and per-tag route files)

Custom templates can be provided via the `--templates` CLI flag or `templates` config option.

### Configuration

All configuration options live in `src/configuration.ts` (`CodeGenConfig` class). The public `IOptions` interface is in `src/types.ts` — note the intentional typo `oxfmtOptrions` (public API, do not rename). The CLI reads a `swagger-typescript-api.config.ts` (or `.js`/`.json`) config file from the project root via `unreadconfig`/`cosmiconfig`.

### Entry Points

- **CLI**: `bin/cli.mjs` → `src/cli.ts` → `src/cli-start.ts`
- **Programmatic API**: `src/index.ts` exports `generateApi` and `defaultConfig`

### Module System

This is **ESM only** (`"type": "module"` in package.json). No CommonJS interop. Use `.ts` imports with explicit extensions where needed.

### Build

`build.config.ts` uses `unbuild` with esbuild. Outputs:

- `dist/index.mjs` + `dist/index.d.ts` — library entry
- `dist/cli.mjs` — CLI entry
- `dist/templates/` — copied from `templates/` post-build

## Key Hooks for Customization

Users can provide hooks in their config to customize generation:

```
onInit, onPrepareConfig, onPreParseSchema, onParseSchema,
onCreateComponent, onCreateRoute, onCreateRouteName,
onFormatRouteName, onFormatTypeName, onCreateRequestParams
```
