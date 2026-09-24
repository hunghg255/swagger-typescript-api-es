<p align="center">
<a href="https://www.npmjs.com/package/swagger-typescript-api-es" target="_blank" rel="noopener noreferrer">
<img src="https://api.iconify.design/devicon-plain:swagger-wordmark.svg?color=%2365fb92" alt="logo" style="width:150px;"/></a>
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

## API

:::code-group-open

```bash [npm]
npx swagger-typescript-api-es@latest --help
```

```bash [yarn]
yarn dlx swagger-typescript-api-es@latest --help
```

```bash [pnpm]
pnpx swagger-typescript-api-es@latest --help
```

```bash [bun]
bunx swagger-typescript-api-es@latest --help
```

:::code-group-close

## CLI

```bash
npx swagger-typescript-api-es@latest -u https://petstore.swagger.io/v2/swagger.json -o ./src/api
```

:::code-group-open

```bash [npm]
npx swagger-typescript-api-es@latest -u https://petstore.swagger.io/v2/swagger.json -o ./src/api
```

```bash [yarn]
yarn dlx swagger-typescript-api-es@latest -u https://petstore.swagger.io/v2/swagger.json -o ./src/api
```

```bash [pnpm]
pnpx swagger-typescript-api-es@latest -u https://petstore.swagger.io/v2/swagger.json -o ./src/api
```

```bash [bun]
bunx swagger-typescript-api-es@latest -u https://petstore.swagger.io/v2/swagger.json -o ./src/api
```

:::code-group-close

## CLI Options

| Option                     | Alias | Description                                                                                                                         | Default    |
| -------------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `--u <url>`                |       | Path/url to swagger scheme                                                                                                          | -          |
| `--o <output>`             |       | Output path of typescript api file                                                                                                  | `"./"`     |
| `--n <name>`               |       | Name of output typescript api file                                                                                                  | `"Api.ts"` |
| `--t <templates>`          |       | Path to folder containing templates                                                                                                 | -          |
| `--d <default-as-success>` |       | Use "default" response status code as success response too                                                                          | `false`    |
| `--r <responses>`          |       | Generate additional information about request responses also add typings for bad responses                                          | `false`    |
| `--union-enums`            |       | Generate all "enum" types as union types (T1 \| T2 \| TN)                                                                           | `false`    |
| `--add-readonly`           |       | Generate readonly properties                                                                                                        | `false`    |
| `--route-types`            |       | Generate type definitions for API routes                                                                                            | `false`    |
| `--noClient`               |       | Do not generate an API class                                                                                                        | `false`    |
| `--enum-names-as-values`   |       | Use values in "x-enumNames" as enum values (not only as keys)                                                                       | `false`    |
| `--extract-request-params` |       | Extract request params to data contract (Also combine path params and query params into one object)                                 | `false`    |
| `--extract-request-body`   |       | Extract request body type to data contract                                                                                          | `false`    |
| `--extract-response-body`  |       | Extract response body type to data contract                                                                                         | `false`    |
| `--extract-response-error` |       | Extract response error type to data contract                                                                                        | `false`    |
| `--extract-enums`          |       | Extract all enums from inline interface/type content to typescript enum construction                                                | `false`    |
| `--modular`                |       | Generate separated files for http client, data contracts, and routes                                                                | `false`    |
| `--js`                     |       | Generate js api module with declaration file                                                                                        | `false`    |
| `--module-name-index`      |       | Determines which path index should be used for routes separation (example: GET:/fruits/getFruit -> index:0 -> moduleName -> fruits) | `0`        |
| `--module-name-first-tag`  |       | Splits routes based on the first tag                                                                                                | `false`    |
| `--disableStrictSSL`       |       | Disable strict SSL                                                                                                                  | `false`    |
| `--disableProxy`           |       | Disable proxy                                                                                                                       | `false`    |
| `--httpClientType`         |       | HTTP client type                                                                                                                    | `"fetch"`  |
| `--unwrap-response-data`   |       | Unwrap the data item from the response                                                                                              | `false`    |
| `--disable-throw-on-error` |       | Do not throw an error when response.ok is not true                                                                                  | `false`    |
| `--single-http-client`     |       | Ability to send HttpClient instance to Api constructor                                                                              | `false`    |
| `--silent`                 |       | Output only errors to console                                                                                                       | `false`    |
| `--default-response`       |       | Default type for empty response schema                                                                                              | `"void"`   |
| `--type-prefix`            |       | Data contract name prefix                                                                                                           | `""`       |
| `--type-suffix`            |       | Data contract name suffix                                                                                                           | `""`       |
| `--clean-output`           |       | Clean output folder before generate api. WARNING: May cause data loss                                                               | `false`    |
| `--api-class-name`         |       | Name of the api class                                                                                                               | `"Api"`    |
| `--patch`                  |       | Fix up small errors in the swagger source definition                                                                                | `false`    |
| `--debug`                  |       | Additional information about processes inside this tool                                                                             | `false`    |
| `--another-array-type`     |       | Generate array types as Array\<Type\> (by default Type[])                                                                           | `false`    |
| `--sort-types`             |       | Sort fields and types                                                                                                               | `false`    |
| `--sort-routes`            |       | Sort routes in alphabetical order                                                                                                   | `false`    |
| `--custom-config`          |       | Path to a config file (js/ts/json) with extra options: primitiveTypeConstructs, hooks, ...                                          | `""`       |

Boolean flags accept `true`/`false` (e.g. `--modular true`). CLI flags are merged over the options of
`swagger-typescript-api.config.ts` (if it exists), CLI flags win. The CLI exits with code `1` on errors.

## Install

Requires Node.js >= 20.

:::code-group-open

```bash [npm]
npm i swagger-typescript-api-es@latest --save-dev
```

```bash [yarn]
yarn add -D swagger-typescript-api-es@latest
```

```bash [pnpm]
pnpm i swagger-typescript-api-es@latest --save-dev
```

```bash [bun]
bun add -d swagger-typescript-api-es@latest
```

:::code-group-close

- Create a file `swagger-typescript-api.config.ts` in the root of the project

```ts
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  name: 'api-axios.ts',
  output: './src/apis/axios-gentype',
  url: 'http://localhost:5002/api-json',
  httpClientType: 'axios',
});

// Or Array of configs
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
    url: 'http://localhost:5002/api-json',
    httpClientType: 'fetch',
  },
]);
```

- Options

```ts
// Options
interface IOptions {
  /**
   *  name of output typescript api file (default: "Api.ts")
   */
  name?: string;
  /**
   * output path of typescript api file (default: "./").
   * `false` - don't write files, only return them from `generateApi`
   */
  output?: string | false;
  /**
   * path/url to swagger scheme
   */
  url?: string;
  input?: string;
  spec?: {
    swagger?: '2.0' | '3.0';
    info?: {
      version?: string;
      title?: string;
    };
  };
  templates?: string;
  httpClientType?: 'axios' | 'fetch'; // default: 'fetch'
  defaultResponseAsSuccess?: boolean;
  generateClient?: boolean;
  generateRouteTypes?: boolean;
  generateResponses?: boolean;
  toJS?: boolean;
  extractRequestParams?: boolean;
  extractRequestBody?: boolean;
  extractEnums?: boolean;
  unwrapResponseData?: boolean;
  /**
   * oxfmt options for the generated code, applied over the built-in defaults
   * and the `.oxfmtrc.json` of your project (cwd), if any
   */
  oxfmtOptrions?: FormatConfig; // from 'oxfmt'
  singleHttpClient?: boolean;
  cleanOutput?: boolean;
  enumNamesAsValues?: boolean;
  moduleNameFirstTag?: boolean;
  generateUnionEnums?: boolean;
  typePrefix?: string;
  typeSuffix?: string;
  enumKeyPrefix?: string;
  enumKeySuffix?: string;
  addReadonly?: boolean;
  sortTypes?: boolean;
  sortRoutes?: boolean;
  modular?: boolean;
  /** output only errors to console */
  silent?: boolean;
  debug?: boolean;
  patch?: boolean;
  apiClassName?: string; // default: "Api"
  moduleNameIndex?: number; // default: 0
  extractResponseBody?: boolean;
  extractResponseError?: boolean;
  disableThrowOnError?: boolean;
  /** default type for empty response schema (default: "void") */
  defaultResponseType?: string;
  disableStrictSSL?: boolean;
  /** no-op, kept for backward compatibility */
  disableProxy?: boolean;
  authorizationToken?: string;
  /**
   * extra fetch options used to download the schema from `url`,
   * `timeout` - request timeout in ms (default: 60000)
   */
  requestOptions?: Record<string, any> & { timeout?: number };
  extractingOptions?: {
    requestBodySuffix?: string[];
    requestParamsSuffix?: string[];
    responseBodySuffix?: string[];
    responseErrorSuffix?: string[];
  };
  /** allow to generate extra files based with this extra templates, see more below */
  extraTemplates?: [];
  anotherArrayType?: boolean;
  fixInvalidTypeNamePrefix?: string;
  fixInvalidEnumKeyPrefix?: string;
  constants?: Record<string, any>;
  templateInfos?: any;
  codeGenConstructs?: (constructs: any) => Record<string, any>;
  primitiveTypeConstructs?: (constructs: any) => Record<string, any>;
  hooks?: {
    onCreateComponent?: (component: any) => void;
    onCreateRequestParams?: (rawType: any) => void;
    onCreateRoute?: (routeData: any) => void;
    onCreateRouteName?: (routeNameInfo: any, rawRouteInfo: any) => void;
    onFormatRouteName?: (routeInfo: any, templateRouteName: any) => void;
    onFormatTypeName?: (typeName: any, rawTypeName: any, schemaType: any) => void;
    onInit?: (configuration: any) => void;
    onPreParseSchema?: (originalSchema: any, typeName: any, schemaType: any) => void;
    onParseSchema?: (originalSchema: any, parsedSchema: any) => void;
    onPrepareConfig?: (currentConfiguration: any) => void;
  };
}
```

- Programmatic usage

```ts
import { generateApi } from 'swagger-typescript-api-es';

// `output: false` - nothing is written to disk, the generated files are only returned
const { files } = await generateApi({
  url: 'https://petstore.swagger.io/v2/swagger.json',
  output: false,
});

for (const { fileName, fileExtension, fileContent } of files) {
  console.log(`${fileName}${fileExtension}`, fileContent.length);
}

// an array of options returns an array of results
const results = await generateApi([{ url: '...', output: './src/api' }]);
```

- Config (file package.json)

```json
{
  ...
  "scripts": {
    ...
    "gen-api-types": "swagger-typescript-api-es"
  },
  ...
}
```

## 📝 License

Licensed under the [MIT License](https://github.com/hunghg255/swagger-typescript-api-es/blob/master/LICENSE).
