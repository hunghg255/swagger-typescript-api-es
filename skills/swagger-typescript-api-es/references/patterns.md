# Common patterns

All configs go in `swagger-typescript-api.config.ts` (or `.js` / `.mjs` / `.cjs`) in the directory
the CLI runs from, and are generated with `npx swagger-typescript-api-es` (or a `gen-api-types`
script). The same objects can be passed to `generateApi()`.

## 1. Axios client from a remote URL

```ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  url: 'https://api.example.com/swagger.json',
  output: './src/api',
  name: 'api.ts',
  httpClientType: 'axios', // install axios in the app
  unwrapResponseData: true, // api.pets.getPet(1) resolves with Pet, not AxiosResponse<Pet>
  extractEnums: true,
  cleanOutput: true, // empties ./src/api first: keep hand-written files elsewhere
});
```

## 2. Fetch client from a local file

```ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  input: './openapi.yaml', // JSON or YAML, relative to cwd
  output: './src/generated',
  generateResponses: true, // @response lines in the JSDoc
  sortTypes: true,
});
```

## 3. Several APIs

An array config generates every entry in turn:

```ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig([
  { url: 'https://auth.example.com/api-json', output: './src/api/auth', name: 'auth.ts' },
  { url: 'https://pay.example.com/api-json', output: './src/api/payment', name: 'payment.ts' },
]);
```

Or one file per API with `--custom-config` (js/ts/json exporting one object). Order of precedence:
config file < custom config < CLI flags (with an array config, the custom config and flags are
applied to every entry):

```bash
swagger-typescript-api-es --custom-config ./api-auth.config.ts
swagger-typescript-api-es --custom-config ./api-payment.config.ts --httpClientType axios
```

## 4. Large schemas: extract and sort

```ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  url: 'https://api.example.com/openapi.json',
  output: './src/api',
  modular: true, // data-contracts.ts, http-client.ts, one class per module
  generateRouteTypes: true, // <Module>Route.ts namespaces
  extractRequestParams: true, // listPets(query?: ListPetsParams); path + query -> getPet({ id, ...query }: GetPetParams)
  extractRequestBody: true, // CreatePetPayload
  extractResponseBody: true,
  extractEnums: true,
  sortTypes: true, // stable diffs
  sortRoutes: true,
});
```

The generator is fast (a 1500-schema / 3000-operation spec takes about 1.3 s from the CLI). The input
document is never modified, and it is only deep-copied when hooks, custom parsers, templates or
type constructs are used.

## 5. Naming: prefixes, suffixes, renames

```ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  input: './openapi.json',
  output: './src/api',
  typePrefix: 'Api', // Pet -> ApiPet, PetStatus -> ApiPetStatus
  enumKeyPrefix: 'E', // ApiPetStatus.ESold
  apiClassName: 'PetStoreApi',
  hooks: {
    // receives the name with prefix/suffix applied; return undefined to keep it
    onFormatTypeName: (typeName, _rawTypeName, schemaType) =>
      schemaType === 'type-name' ? typeName.replace(/Dto$/, '') : undefined,
    onFormatRouteName: (routeInfo) => (routeInfo.operationId === 'getPet' ? 'findPet' : undefined),
  },
});
```

## 6. Skip or change routes and types with hooks

```ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  input: './openapi.json',
  output: './src/api',
  hooks: {
    onCreateRoute: (route) => (route.raw.route.startsWith('/internal') ? false : route), // false skips it
    // rewrite the path before parsing: the request path (and module name) change too,
    // so put '/api/v1' into baseUrl
    onPreBuildRoutePath: (path) => path.replace(/^\/api\/v1/, ''),
    onCreateComponent: (component) => component,
    onPrepareConfig: (configuration) => configuration, // data passed to the templates
  },
  // `format: date-time` strings typed as Date (the client does not parse them for you)
  primitiveTypeConstructs: { string: { 'date-time': 'Date' } },
});
```

Hook arguments are typed (`Hooks`, `ParsedRoute`, `RawRouteInfo`, ...). Reading properties that are
not in those types needs a cast.

## 7. Programmatic, in memory

```ts
import { generateApi, type GenerateApiOutput } from 'swagger-typescript-api-es';

const result: GenerateApiOutput = await generateApi({
  url: 'https://api.example.com/swagger.json',
  output: false, // nothing is written
  requestOptions: { timeout: 30_000 }, // schema download timeout (default 60000)
});

for (const { fileName, fileExtension, fileContent } of result.files) {
  console.log(fileName + fileExtension, fileContent.length);
}

// spec already in memory (it is not modified); an array returns an array of results
const [first] = await generateApi([
  { spec: { openapi: '3.0.3', info: { title: 'x', version: '1' }, paths: {} }, output: false },
]);
console.log(first.files.length);
```

`generateApi` rejects on errors (bad schema, failed download, output path that is a file).

## 8. Protected schema, proxies, self-signed certificates

```ts
import { defaultConfig } from 'swagger-typescript-api-es';
import { ProxyAgent } from 'undici'; // npm i -D undici

export default defaultConfig({
  url: 'https://internal.example.com/swagger.json',
  output: './src/api',
  authorizationToken: `Bearer ${process.env.API_TOKEN}`, // sent as-is in Authorization
  disableStrictSSL: true, // self-signed certificate
  // HTTP(S)_PROXY / NO_PROXY are used by default; disableProxy: true connects directly,
  // or pass your own undici dispatcher (replaces proxy + SSL handling):
  requestOptions: {
    dispatcher: new ProxyAgent('http://proxy:3128'),
    headers: { 'X-Key': 'k' },
    timeout: 120_000,
  },
});
```

## 9. Custom templates

```ts
import { generateTemplates } from 'swagger-typescript-api-es';

// copy the built-in Eta templates once, then edit them
await generateTemplates({ output: './api-templates', httpClientType: 'fetch', modular: false });
```

```ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  input: './openapi.json',
  output: './src/api',
  templates: './api-templates', // missing files fall back to the built-in ones
  extraTemplates: [{ name: 'endpoints.ts', path: './api-templates/endpoints.ejs' }],
  constants: { API_VERSION: 'v1' }, // `config.constants.API_VERSION` in templates
});
```

In templates, `it` holds `apiConfig`, `config`, `modelTypes`, `routes` and `utils`; `utils._` has
lodash-compatible helpers (`es-toolkit/compat`), and `includeFile('@base/route-docs', { ... })`
includes built-in partials.

## 10. Formatting of the output

Defaults < `.oxfmtrc.json` in cwd < `oxfmtOptrions`:

```ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  input: './openapi.json',
  output: './src/api',
  oxfmtOptrions: { singleQuote: false, printWidth: 120, semi: false },
});
```

## 11. Scripts and CI

```json
{
  "scripts": {
    "gen-api-types": "swagger-typescript-api-es",
    "gen-api-types:check": "swagger-typescript-api-es && git diff --exit-code src/api"
  }
}
```

The CLI exits with `1` on any error, so a broken schema fails the CI job. Flags need values:
`swagger-typescript-api-es -u ./openapi.json -o ./src/api --modular true --silent true`.
