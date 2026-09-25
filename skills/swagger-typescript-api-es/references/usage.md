# Using the generated client

Examples use a client generated from a petstore spec (`servers: [{ url: 'https://petstore.example.com/v1' }]`,
paths `/pets`, `/pets/{petId}`, `/store/...`, `/users/{username}`, `GET /`). All snippets type-check
with `strict: true` against the generated code.

## Shape of the generated code

- Data contracts: `export interface Pet`, `export enum PetStatus`, `export type OrderItem = ...`.
- `HttpClient<SecurityDataType>` with `request()`, `setSecurityData()`, plus `ApiConfig`,
  `RequestParams`, `FullRequestParams`, `ContentType` (a `const` object + type) and, for fetch,
  `HttpResponse<Data, Error>`.
- `class Api<SecurityDataType> extends HttpClient<SecurityDataType>`: routes without a module are
  methods (`api.getRoot()`), the others are grouped by the first path segment
  (`api.pets.listPets()`, `api.store.placeOrder()`). Names come from `operationId`.
- Method arguments: path params, `query`, `data` (body), `params: RequestParams = {}`; required
  arguments come first. A body is optional unless the spec says `required: true`. Path params are
  sent through `encodeURIComponent`.

## fetch (default `httpClientType`)

```ts
import { Api, ContentType, type HttpResponse } from './api/Api';
import type { Error as ApiError, Pet } from './api/Api'; // `Error` would shadow the global

const api = new Api<string>({
  baseUrl: 'https://api.example.com', // default: servers[0].url of the spec
  baseApiParams: { headers: { 'X-App': 'web' }, credentials: 'include' }, // merged into every request
  // runs for routes with `security` (or `secure: true`); its result is merged into the request
  securityWorker: (token) => (token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
  customFetch: (input, init) => fetch(input, init), // SSR, retries, tests, ...
  injectHeaders: async (headers: Record<string, string>) => ({ ...headers, 'X-Req': '1' }),
});

api.setSecurityData('jwt-token'); // `null` to log out

try {
  const res = await api.pets.getPet(1); // HttpResponse<Pet, ApiError>
  const pet: Pet = res.data;
  console.log(res.status, pet.name);
} catch (e) {
  // non-2xx: rejects with the HttpResponse (network errors reject with a TypeError)
  const res = e as HttpResponse<unknown, ApiError>;
  console.error(res.status, res.error?.message);
}

// optional query object, then per-request params (RequestInit + secure/type/format/baseUrl/cancelToken)
await api.pets.listPets({ limit: 10 }, { headers: { 'X-Trace': '1' } });
await api.pets.listPets();

// the body is optional unless `requestBody.required: true`
await api.pets.updatePet('42'); // data?: NewPet
await api.pets.createPet({ name: 'Rex' }); // data: NewPet

// multipart/form-data: pass File / Blob fields, the client builds the FormData
await api.pets.uploadPetPhoto('42', { file: new File(['x'], 'a.png'), caption: 'hi' });

// cancellation with a token...
const pending = api.pets.listPets({}, { cancelToken: 'pets' });
api.abortRequest('pets');
await pending.catch(() => {});
// ...or a plain AbortSignal
await api.pets.listPets({}, { signal: AbortSignal.timeout(5_000) });

// low-level request
await api.request<Pet>({
  path: '/pets',
  method: 'POST',
  body: { name: 'Rex' },
  type: ContentType.Json,
  format: 'json',
  secure: true,
});
```

Notes:

- `ApiConfig` (fetch): `baseUrl`, `baseApiParams` (defaults: `credentials: 'same-origin'`,
  `redirect: 'follow'`, `referrerPolicy: 'no-referrer'`), `securityWorker`, `customFetch`,
  `injectHeaders(headers) => headers | Promise<headers>`.
- `baseApiParams: { secure: true }` calls `securityWorker` for every request.
- The response body is read with `format` (`json`, `text`, `blob`, `formData`, ...); binary
  responses use `blob`. On errors the parsed body is in `response.error`.
- Query values `undefined` / `null` are skipped; arrays are sent as repeated keys (`tags=a&tags=b`).

### `disableThrowOnError: true`

```ts
import { Api } from './api/Api';

const api = new Api();
const res = await api.pets.getPet(1); // resolves for every status
if (!res.ok) {
  console.error(res.status, res.error);
} else {
  console.log(res.data.name);
}
```

### `unwrapResponseData: true`

```ts
import { Api, type Pet } from './api/Api';

const api = new Api();
const pet: Pet = await api.pets.getPet(1); // the body; failures still reject with the HttpResponse
```

### `extractRequestParams: true`

```ts
import { Api, type ListPetsParams } from './api/Api';

const api = new Api();
const query: ListPetsParams = { limit: 10 };
await api.pets.listPets(query);
await api.pets.listPets(); // optional: no path params and every query param is optional
```

## axios (`httpClientType: 'axios'`)

Install `axios` in the app. `ApiConfig` extends `AxiosRequestConfig` (so `baseURL` with a capital
`URL`, `timeout`, `headers`, ...) and adds `securityWorker`, `secure`, `format` (default
`responseType`), `instance` and `injectHeaders`.

```ts
import axios from 'axios';

import { Api, type Pet } from './api/Api';

const api = new Api<string>({
  baseURL: 'https://api.example.com', // default: servers[0].url of the spec
  timeout: 10_000,
  securityWorker: (token) => (token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
  secure: true, // call securityWorker for every request, not only secured routes
  format: 'json',
});
api.setSecurityData('jwt-token');

// reuse your own axios instance (interceptors, adapters, ...): the other axios options are then ignored
const shared = axios.create({ baseURL: 'https://api.example.com' });
const api2 = new Api({ instance: shared });

try {
  const { data, status } = await api.pets.getPet(1); // AxiosResponse<Pet>
  const pet: Pet = data;
  console.log(status, pet.name);
} catch (e) {
  if (axios.isAxiosError(e)) console.error(e.response?.status, e.response?.data);
}

// per-request AxiosRequestConfig; cancel with an AbortSignal
const controller = new AbortController();
await api2.pets.listPets({ limit: 5 }, { signal: controller.signal, headers: { 'X-Trace': '1' } });

api.instance.interceptors.request.use((config) => config); // the underlying instance
```

The axios client has no `abortRequest` / `cancelToken` and ignores `disableThrowOnError` (axios
itself rejects on non-2xx). `unwrapResponseData: true` resolves with `response.data`.

## `singleHttpClient: true`

`Api` no longer extends `HttpClient`; pass one shared instance (also works in modular mode, where
every module class takes the `HttpClient`):

```ts
import { Api, HttpClient } from './api/Api';

const http = new HttpClient<string>({
  baseUrl: 'https://api.example.com',
  securityWorker: (token) => (token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
});
http.setSecurityData('jwt-token');

const api = new Api(http); // methods call this.http.request
const { data } = await api.pets.getPet(1);
api.http.abortRequest('some-token');
```

## Modular (`modular: true`)

Files: `data-contracts.ts`, `http-client.ts`, one class per module (`Pets.ts`, `Store.ts`,
`Users.ts`, `Common.ts` for `GET /`), and with `generateRouteTypes` `PetsRoute.ts`, ...,
`CommonRoute.ts`. Each module class extends `HttpClient` and has flat methods.

```ts
import type { Pet } from './api/data-contracts';
import type { ApiConfig } from './api/http-client';
import { Pets } from './api/Pets';
import type { Pets as PetsRoutes } from './api/PetsRoute';
import { Store } from './api/Store';

const config: ApiConfig<string> = {
  baseUrl: 'https://api.example.com',
  securityWorker: (token) => (token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
};
const pets = new Pets<string>(config);
const store = new Store<string>(config);
pets.setSecurityData('jwt-token'); // security data is per instance
store.setSecurityData('jwt-token');

const { data } = await pets.listPets({ limit: 10 });
const first: Pet | undefined = data[0];

// route types (generateRouteTypes: true)
const query: PetsRoutes.ListPets.RequestQuery = { limit: 1 };
const body: PetsRoutes.ListPets.ResponseBody = data;
```

A module named like a data contract becomes `class <Module>Api` (namespace `<Module>Route`).

## Tips

- Regenerate instead of editing generated files; customise with options, hooks or templates.
- Wrap the generated `Api` in your own module to centralise `baseUrl`, auth and error mapping.
- For React Query / SWR, call the methods in query functions: `queryFn: () => api.pets.getPet(id).then((r) => r.data)`
  (or directly with `unwrapResponseData: true`).
