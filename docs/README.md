# swagger-typescript-api-es — docs & playground

Next.js 16 (App Router) site with the documentation and an online playground.
The playground calls `POST /api/generate`, which runs the generator of this repository
(`swagger-typescript-api-es` is linked from the repository root with `file:..` and uses the
root `dist/`).

## Development

```bash
# 1. build the library (repository root)
cd ..
npm ci
npm run build

# 2. run the site (docs/)
cd docs
npm ci
npm run dev            # http://localhost:3000
```

Rebuild the library (`npm run build` in the root) after changing `src/` or `templates/`.

| Command                                  | What                                                                    |
| ---------------------------------------- | ----------------------------------------------------------------------- |
| `npm run dev`                            | dev server                                                              |
| `npm run build` / `npm start`            | production build / server                                               |
| `npm run typecheck`                      | `tsc --noEmit`                                                          |
| `npm test`                               | unit tests (vitest, `tests/unit`)                                       |
| `npm run test:e2e`                       | end-to-end tests (playwright, `tests/e2e`)                              |
| `NEXT_OUTPUT_STANDALONE=1 npx next build` | self-contained build in `.next/standalone` (checks the traced files)    |

Try the API:

```bash
curl -s localhost:3000/api/generate -H 'content-type: application/json' \
  -d "{\"spec\": $(node -p 'JSON.stringify(require("fs").readFileSync("../tests/fixtures/petstore.json","utf8"))'), \"options\": {\"modular\": true}}"
```

## `POST /api/generate`

Request / response types: [`lib/api-types.ts`](lib/api-types.ts).

```jsonc
// request (Content-Type: application/json)
{ "spec": "<JSON or YAML text>", "options": { "modular": true, "httpClientType": "axios" } }
{ "url": "https://example.com/openapi.json", "options": {} }

// 200
{ "ok": true, "files": [{ "name": "Api.ts", "content": "..." }], "durationMs": 123 }
// 4xx / 5xx
{ "ok": false, "error": "user facing message" }
```

| Status | When                                                                                          |
| ------ | --------------------------------------------------------------------------------------------- |
| 400    | invalid body / option / schema text, blocked URL (private network, credentials, scheme)       |
| 413    | request or schema over `MAX_SPEC_BYTES` (3 MB), too complex schema, response over ~4.4 MB      |
| 415    | `Content-Type` is not `application/json`                                                      |
| 422    | the schema could not be downloaded (HTTP error, timeout, redirects) or the generation failed  |
| 429    | rate limited (`Retry-After` header)                                                           |
| 500    | unexpected error (details are only logged on the server)                                      |

Code: `app/api/generate/route.ts` → `lib/server/` (`handler.ts`, `validate.ts`, `parse-spec.ts`,
`fetch-spec.ts`, `ip.ts`, `rate-limit.ts`, `generate.ts`).

### Security

- **Options are whitelisted** (`BOOLEAN_OPTIONS`, `STRING_OPTIONS`, `httpClientType`,
  `moduleNameIndex`); unknown keys are dropped, known keys are type/format checked. Hooks,
  templates, paths, custom functions etc. can never reach the generator, which always runs with
  `output: false`, `silent: true`, `cleanOutput: false` and the document passed as `spec`.
- **Schema text**: max 3 MB, JSON or YAML (js-yaml safe schema), must have `openapi` / `swagger`;
  documents are walked with a node budget and a depth limit (YAML alias bombs, recursion);
  external `$ref`s (files / URLs) are rejected.
- **URLs (SSRF)**: the server downloads the schema itself (the library never fetches):
  `http`/`https` only, no credentials, `localhost` / `*.local` / `*.internal` names are blocked, the
  host is resolved once and **every** address must be public (private, loopback, link-local /
  cloud metadata, CGNAT, multicast, reserved, documentation ranges, IPv4-mapped / NAT64 / 6to4
  IPv6 forms of those, …). The connection is made to the checked address (pinned DNS lookup, so
  DNS rebinding between the check and the connection is not possible; TLS still validates the
  original host name). Redirects are followed manually (max 3) and every hop is checked again.
  10 s timeout, 3 MB limit on the (decompressed) body, environment proxies are ignored.
- **Limits**: generation timeout 20 s, `maxDuration` 30 s. The timeout only stops waiting —
  a pathological schema keeps the CPU busy until Vercel stops the function at `maxDuration`.
- **Rate limit**: 30 requests / minute / IP (`x-real-ip`, then `x-forwarded-for`), in memory.
  Set `GENERATE_RATE_LIMIT` to change it (`0` disables it, e.g. for e2e tests). Each Vercel
  instance has its own counters, so this is only a speed bump: **configure the Vercel Firewall**
  (a rate limiting rule on `/api/generate`, attack challenge mode if needed) for real protection.

## Deploy on Vercel

1. Import the repository, set **Root Directory** to `docs` and keep
   _Include files outside the root directory in the Build Step_ enabled (the library is built
   from the repository root).
2. [`vercel.json`](vercel.json) does the rest:
   - install: `cd .. && npm ci && npm run build && cd docs && npm ci` (root deps + library build,
     then the site deps),
   - build: `next build`, framework `nextjs`.
3. Node.js 20+ (22 recommended) in the project settings.
4. Add a Firewall rate limiting rule for `/api/generate`.

### How the generator gets into the function

The library is linked from `..`, so Turbopack would bundle it and break it (it replaces its
`__dirname`, so the templates are not found and the output is empty). `lib/server/generate.ts`
therefore imports `../dist/index.mjs` at runtime (not analysed by the bundler) and
[`next.config.ts`](next.config.ts) adds to the `/api/generate` function trace
(`outputFileTracingRoot` = repository root):

- `../dist/index.mjs`, `../dist/shared/**`, `../dist/templates/**`,
- the library's runtime dependency tree, computed from the root `package-lock.json`
  (`swagger2openapi`, `oxfmt` + its native `@oxfmt/binding-*`, `typescript`, `eta`, …).

Check it with `NEXT_OUTPUT_STANDALONE=1 npx next build`, copy `.next/standalone` somewhere outside
the repository and run `node docs/server.js` there, or inspect
`.next/server/app/api/generate/route.js.nft.json`.
