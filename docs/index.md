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

## Install

:::code-group-open

```bash [npm]
npm i swagger-typescript-api-es@latest --save-dev
```

```bash [yarn]
yarn dlx swagger-typescript-api-es@latest --save-dev
```

```bash [pnpm]
pnpm i swagger-typescript-api-es@latest --save-dev
```

```bash [bun]
bun i swagger-typescript-api-es@latest --save-dev
```

:::code-group-close

- Create a file `swagger-typescript-api.config.ts` in the root of the project

```ts twoslash
import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  name: 'api-axios.ts',
  output: './src/apis/axios-gentype',
  url: 'http://localhost:5002/api-json',
  httpClientType: 'axios',
});
```

- Options

```ts twoslash
// Options
interface IOptions {
  /**
   *  name of output typescript api file (default: "Api.ts")
   */
  name: string;
  /**
   * output path of typescript api file (default: "./")
   */
  output: string;
  /**
   * path/url to swagger scheme
   */
  url: string;
  input?: string;
  spec?: {
    swagger?: '2.0' | '3.0';
    info?: {
      version?: string;
      title?: string;
    };
  };
  templates?: string;
  httpClientType?: 'axios' | 'fetch';
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
   * By default prettier config is load from your project
   */
  prettier?: {
    printWidth?: number;
    tabWidth?: number;
    trailingComma?: 'all' | string;
    parser?: 'typescript' | string;
  };
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
  sortRouters?: boolean;
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
  prettierOptions?: Record<string, any>;
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
