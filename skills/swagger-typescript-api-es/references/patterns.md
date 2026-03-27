# Common Patterns

## Pattern 1: Axios Client from Remote URL

```ts
// swagger-typescript-api.config.ts
import { defaultConfig } from 'swagger-typescript-api-es'

export default defaultConfig({
  name: 'api.ts',
  output: './src/api',
  url: 'https://api.example.com/swagger.json',
  httpClientType: 'axios',
  unwrapResponseData: true,   // api.getUser() returns data directly
  extractEnums: true,
  cleanOutput: true,
})
```

## Pattern 2: Fetch Client from Local File

```ts
import { defaultConfig } from 'swagger-typescript-api-es'

export default defaultConfig({
  name: 'api.ts',
  output: './src/generated',
  input: './openapi.json',     // local OpenAPI file
  httpClientType: 'fetch',
  generateResponses: true,
  sortTypes: true,
})
```

## Pattern 3: Multiple API Services

Use separate config files and separate npm scripts for each service:

```ts
// auth-api.config.ts
import { defaultConfig } from 'swagger-typescript-api-es'
export default defaultConfig({
  name: 'auth-api.ts',
  output: './src/api/auth',
  url: 'https://auth.example.com/api-json',
  httpClientType: 'axios',
})

// payment-api.config.ts
import { defaultConfig } from 'swagger-typescript-api-es'
export default defaultConfig({
  name: 'payment-api.ts',
  output: './src/api/payment',
  url: 'https://payment.example.com/api-json',
  httpClientType: 'axios',
})
```

Note: The CLI does not currently support `-c` for custom config names like csvgtocss does.
Run each config by temporarily renaming or use a wrapper script.

## Pattern 4: Extract & Sort for Large Schemas

For large APIs with many endpoints:

```ts
export default defaultConfig({
  name: 'api.ts',
  output: './src/generated',
  url: 'https://api.example.com/openapi.json',
  httpClientType: 'axios',
  extractRequestParams: true,   // cleaner param types
  extractRequestBody: true,     // cleaner body types
  extractEnums: true,           // reusable enum declarations
  sortTypes: true,              // alphabetical types = easier diffs
  sortRouters: true,
  cleanOutput: true,
  unwrapResponseData: true,
})
```

## Pattern 5: Type Prefixing to Avoid Conflicts

When generated type names clash with existing types:

```ts
export default defaultConfig({
  name: 'api.ts',
  output: './src/api',
  url: 'https://api.example.com/swagger.json',
  typePrefix: 'Api',            // UserDto → ApiUserDto
  enumKeyPrefix: 'E',           // Status.Active → EStatus.EActive
})
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
      return typeName.replace(/Dto$/, '')
    },
    onCreateRoute: (routeData) => {
      // Log every generated route for debugging
      console.log('Route:', routeData.request.path)
    },
  },
})
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
