# Common Patterns

## Pattern 1: Axios Client from Remote URL

```ts
// swagger-typescript-api.config.ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  name: 'api.ts',
  output: './src/api',
  url: 'https://api.example.com/swagger.json',
  httpClientType: 'axios',
  unwrapResponseData: true, // api.getUser() returns data directly
  extractEnums: true,
  cleanOutput: true,
});
```

## Pattern 2: Fetch Client from Local File

```ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  name: 'api.ts',
  output: './src/generated',
  input: './openapi.json', // local OpenAPI file
  httpClientType: 'fetch',
  generateResponses: true,
  sortTypes: true,
});
```

## Pattern 3: Multiple API Services

Export an array of configs from a single `swagger-typescript-api.config.ts` — each entry is generated in turn:

```ts
// swagger-typescript-api.config.ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig([
  {
    name: 'auth-api.ts',
    output: './src/api/auth',
    url: 'https://auth.example.com/api-json',
    httpClientType: 'axios',
  },
  {
    name: 'payment-api.ts',
    output: './src/api/payment',
    url: 'https://payment.example.com/api-json',
    httpClientType: 'axios',
  },
]);
```

Alternatively, keep per-service options in separate files and pass them with `--custom-config` (js/ts/json, must export an object). They are merged over `swagger-typescript-api.config.*` (if present), and CLI flags win over both:

```bash
swagger-typescript-api-es --custom-config ./auth-api.config.ts
swagger-typescript-api-es --custom-config ./payment-api.config.ts
```

## Pattern 4: Extract & Sort for Large Schemas

For large APIs with many endpoints:

```ts
export default defaultConfig({
  name: 'api.ts',
  output: './src/generated',
  url: 'https://api.example.com/openapi.json',
  httpClientType: 'axios',
  extractRequestParams: true, // cleaner param types
  extractRequestBody: true, // cleaner body types
  extractEnums: true, // reusable enum declarations
  sortTypes: true, // alphabetical types = easier diffs
  sortRoutes: true,
  cleanOutput: true,
  unwrapResponseData: true,
});
```

## Pattern 5: Type Prefixing to Avoid Conflicts

When generated type names clash with existing types:

```ts
export default defaultConfig({
  name: 'api.ts',
  output: './src/api',
  url: 'https://api.example.com/swagger.json',
  typePrefix: 'Api', // UserDto → ApiUserDto
  enumKeyPrefix: 'E', // Status.Active → ApiStatus.EActive (with typePrefix above)
});
```

## Pattern 6: Custom Hooks for Type Renaming

```ts
export default defaultConfig({
  name: 'api.ts',
  output: './src/api',
  url: 'https://api.example.com/swagger.json',
  hooks: {
    onFormatTypeName: (typeName, rawTypeName, schemaType) => {
      // Remove trailing "Dto" suffix from all type names
      return typeName.replace(/Dto$/, '');
    },
    onCreateRoute: (routeData) => {
      // Log every generated route for debugging
      console.log('Route:', routeData.request.path);
    },
  },
});
```

## Pattern 7: Programmatic, In-Memory Generation

```ts
import { generateApi } from 'swagger-typescript-api-es';

// `output: false` - nothing is written, the generated files are only returned
const { files } = await generateApi({
  url: 'https://api.example.com/swagger.json',
  output: false,
  requestOptions: { timeout: 30_000 }, // schema download timeout in ms (default: 60000)
});

for (const { fileName, fileExtension, fileContent } of files) {
  console.log(fileName + fileExtension, fileContent.length);
}

// an array of options returns an array of results (one per config)
const results = await generateApi([{ url: '...', output: './src/api' }]);
```

## package.json scripts

```json
{
  "scripts": {
    "gen-api-types": "swagger-typescript-api-es",
    "gen-api-types:watch": "nodemon --watch openapi.json --exec 'npm run gen-api-types'"
  }
}
```
