/**
 * Code examples of the /usage page.
 *
 * Every TypeScript snippet is type-checked (strict mode) against a client generated from
 * `tests/fixtures/petstore.json` with the options of its `client` variant:
 *
 * - `fetch`         default options
 * - `axios`         `httpClientType: 'axios'`
 * - `single`        `singleHttpClient: true`
 * - `modular`       `modular: true`
 * - `modularSingle` `modular: true, singleHttpClient: true`
 * - `unwrap`        `unwrapResponseData: true`
 * - `noThrow`       `disableThrowOnError: true`
 * - `routeTypes`    `generateRouteTypes: true`
 * - `config`        checked against the library's own types
 *
 * The generated client is at `./api/` next to the snippet; `./api-client` exports `api`
 * (a `new Api<string>()`). `prelude` lines are prepended when checking and are not shown.
 * Keep method names in sync with the fixture (`api.pets.listPets`, `api.pets.getPet`, ...).
 */
export type SnippetClient =
  | 'fetch'
  | 'axios'
  | 'single'
  | 'modular'
  | 'modularSingle'
  | 'unwrap'
  | 'noThrow'
  | 'routeTypes'
  | 'config';

export interface Snippet {
  code: string;
  lang: 'ts' | 'tsx' | 'bash';
  /** file name shown above the code */
  title?: string;
  /** generated client the snippet is checked against (`null`: not type-checked, e.g. shell) */
  client: SnippetClient | null;
  /** hidden code prepended when type-checking */
  prelude?: string;
}

const API = `import { api } from './api-client';\n`;

export const SNIPPETS = {
  generateCli: {
    lang: 'bash',
    title: 'Terminal',
    client: null,
    code: `npm i -D swagger-typescript-api-es

# fetch client (default): writes src/api/Api.ts
npx swagger-typescript-api-es -u ./openapi.json -o ./src/api

# axios client (install axios in your app)
npm i axios
npx swagger-typescript-api-es -u ./openapi.json -o ./src/api --httpClientType axios`,
  },

  generateConfig: {
    lang: 'ts',
    title: 'swagger-typescript-api.config.ts',
    client: 'config',
    code: `import { defaultConfig } from 'swagger-typescript-api-es';

export default defaultConfig({
  input: './openapi.json', // or url: 'https://api.example.com/openapi.json'
  output: './src/api',
  name: 'Api.ts',
  httpClientType: 'fetch', // or 'axios'
});`,
  },

  fetchCreate: {
    lang: 'ts',
    title: 'src/api-client.ts',
    client: 'fetch',
    code: `import { Api } from './api/Api';

export const api = new Api({
  // default: the first \`servers[].url\` of the spec
  baseUrl: 'https://petstore.example.com/v1',
  // RequestInit defaults for every request
  baseApiParams: {
    credentials: 'include', // send cookies to another origin
    headers: { 'X-Client': 'web' },
  },
});`,
  },

  axiosCreate: {
    lang: 'ts',
    title: 'src/api-client.ts',
    client: 'axios',
    code: `import { Api } from './api/Api';

// any AxiosRequestConfig option is accepted and passed to axios.create()
export const api = new Api({
  baseURL: 'https://petstore.example.com/v1',
  headers: { 'X-Client': 'web' },
  timeout: 10_000,
  withCredentials: true,
});`,
  },

  axiosInstance: {
    lang: 'ts',
    title: 'src/api-client.ts',
    client: 'axios',
    code: `import axios from 'axios';

import { Api } from './api/Api';

const instance = axios.create({
  baseURL: 'https://petstore.example.com/v1',
  timeout: 10_000,
});

instance.interceptors.response.use(undefined, (error) => {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    window.location.assign('/login');
  }
  return Promise.reject(error);
});

// with \`instance\`, the other axios options of the config are ignored
export const api = new Api({ instance });

// the instance is always available as \`api.instance\`
api.instance.defaults.headers.common['X-Client'] = 'web';`,
  },

  callMethods: {
    lang: 'ts',
    client: 'fetch',
    prelude: API,
    code: `import { PetStatus } from './api/Api';

// query parameters are one object (all optional here)
const { data: pets } = await api.pets.listPets({ status: PetStatus.Available, limit: 20 });

// path parameters are positional arguments
const { data: pet } = await api.pets.getPet(42);

// the request body is typed from the schema (NewPet)
const { data: created } = await api.pets.createPet({ name: 'Rex', tags: ['good-boy'] });

// path parameters first, then the body
await api.pets.updatePet(created.id, { name: 'Rex II' });
await api.pets.deletePet(created.id);`,
  },

  requestParams: {
    lang: 'ts',
    client: 'fetch',
    prelude: API,
    code: `const controller = new AbortController();

// the last argument of every method: RequestParams
await api.pets.listPets(
  { limit: 10 },
  {
    headers: { 'X-Request-Id': crypto.randomUUID() }, // merged over baseApiParams.headers
    signal: controller.signal, // or any other RequestInit option
    cache: 'no-store',
    secure: false, // skip the securityWorker for this call
    format: 'json', // how to read the body: 'json' | 'text' | 'blob' | ...
    baseUrl: 'https://staging.petstore.example.com/v1',
  }
);`,
  },

  requestParamsAxios: {
    lang: 'ts',
    client: 'axios',
    prelude: API,
    code: `// axios: RequestParams is an AxiosRequestConfig (+ secure, type, format)
await api.pets.listPets(
  { limit: 10 },
  { headers: { 'X-Request-Id': crypto.randomUUID() }, timeout: 5_000, secure: false }
);`,
  },

  injectHeaders: {
    lang: 'ts',
    client: 'fetch',
    prelude: `declare function getCsrfToken(): Promise<string>;\n`,
    code: `import { Api } from './api/Api';

export const api = new Api({
  // runs before every request with the merged headers; may be async
  injectHeaders: async (headers: Record<string, string>) => ({
    ...headers,
    'Accept-Language': navigator.language,
    'X-CSRF-Token': await getCsrfToken(), // your own helper
  }),
});`,
  },

  securityWorker: {
    lang: 'ts',
    title: 'src/api-client.ts',
    client: 'fetch',
    code: `import { Api } from './api/Api';

// the type argument is the type of your "security data", here an access token
export const api = new Api<string>({
  // called for every \`secure\` request with the value given to setSecurityData()
  securityWorker: (token) =>
    token ? { headers: { Authorization: \`Bearer \${token}\` } } : {},
});

export async function login(username: string, password: string) {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const { accessToken } = (await response.json()) as { accessToken: string };
  api.setSecurityData(accessToken); // every secure request now sends the token
}

export function logout() {
  api.setSecurityData(null);
}`,
  },

  securityWorkerAsync: {
    lang: 'ts',
    client: 'fetch',
    prelude: `declare const auth: { getFreshToken(): Promise<string> };\n`,
    code: `import { Api } from './api/Api';

// the worker may be async: refresh an expired token right before the request
export const api = new Api({
  securityWorker: async () => ({
    headers: { Authorization: \`Bearer \${await auth.getFreshToken()}\` },
  }),
  // call the worker for every request, not only for routes with \`security\`
  baseApiParams: { secure: true },
});`,
  },

  securityWorkerAxios: {
    lang: 'ts',
    client: 'axios',
    code: `import { Api } from './api/Api';

export const api = new Api<string>({
  baseURL: 'https://petstore.example.com/v1',
  // returns an AxiosRequestConfig
  securityWorker: (token) =>
    token ? { headers: { Authorization: \`Bearer \${token}\` } } : {},
  secure: true, // optional: call the worker for every request
});

api.setSecurityData('my-jwt');`,
  },

  singleHttpClient: {
    lang: 'ts',
    title: 'src/api-client.ts',
    client: 'single',
    code: `import { Api, HttpClient } from './api/Api';

// configure the transport once...
export const http = new HttpClient<string>({
  baseUrl: 'https://petstore.example.com/v1',
  securityWorker: (token) =>
    token ? { headers: { Authorization: \`Bearer \${token}\` } } : {},
});

// ...and hand it to the Api (it is available as api.http)
export const api = new Api(http);

http.setSecurityData('my-jwt');
const { data: pets } = await api.pets.listPets({ limit: 10 });`,
  },

  modularSeparate: {
    lang: 'ts',
    title: 'src/api-client.ts',
    client: 'modular',
    code: `import type { ApiConfig } from './api/http-client';
import { Pets } from './api/Pets';
import { Store } from './api/Store';

const config: ApiConfig<string> = {
  baseUrl: 'https://petstore.example.com/v1',
  securityWorker: (token) =>
    token ? { headers: { Authorization: \`Bearer \${token}\` } } : {},
};

// every module class extends HttpClient: each one has its own state
export const pets = new Pets(config);
export const store = new Store(config);

export function setToken(token: string | null) {
  pets.setSecurityData(token);
  store.setSecurityData(token);
}`,
  },

  modularShared: {
    lang: 'ts',
    title: 'src/api-client.ts',
    client: 'modularSingle',
    code: `import type { Pet } from './api/data-contracts';
import { HttpClient } from './api/http-client';
import { Pets } from './api/Pets';
import { Store } from './api/Store';
import { Users } from './api/Users';

export const http = new HttpClient<string>({
  baseUrl: 'https://petstore.example.com/v1',
  securityWorker: (token) =>
    token ? { headers: { Authorization: \`Bearer \${token}\` } } : {},
});

// one transport, one token, many modules
export const api = {
  pets: new Pets(http),
  store: new Store(http),
  users: new Users(http),
};

http.setSecurityData('my-jwt');
const { data } = await api.pets.listPets({ limit: 10 });
const first: Pet | undefined = data[0];`,
  },

  fetchErrors: {
    lang: 'ts',
    client: 'fetch',
    prelude: API,
    code: `// the spec's \`Error\` schema would shadow the global Error: rename it on import
import type { Error as ApiError, HttpResponse } from './api/Api';

try {
  const response = await api.pets.getPet(42); // HttpResponse<Pet, ApiError>
  console.log(response.status, response.data.name);
} catch (e) {
  if (e instanceof Response) {
    // a non-2xx response rejects with the HttpResponse; \`error\` is the parsed body
    const { status, error } = e as HttpResponse<unknown, ApiError>;
    console.error(status, error.message);
  } else {
    throw e; // network error, aborted request, ...
  }
}`,
  },

  noThrow: {
    lang: 'ts',
    client: 'noThrow',
    prelude: API,
    code: `// generated with disableThrowOnError: true
const response = await api.pets.getPet(42);

if (response.ok) {
  console.log(response.data.name); // Pet
} else {
  console.error(response.status, response.error.message); // the spec's error type
}`,
  },

  axiosErrors: {
    lang: 'ts',
    client: 'axios',
    prelude: API,
    code: `import axios from 'axios';

import type { Error as ApiError } from './api/Api';

try {
  const { data: pet, status } = await api.pets.getPet(42); // AxiosResponse<Pet>
  console.log(status, pet.name);
} catch (e) {
  if (axios.isAxiosError<ApiError>(e)) {
    // non-2xx responses reject with an AxiosError (axios' validateStatus)
    console.error(e.response?.status, e.response?.data.message);
  } else {
    throw e;
  }
}`,
  },

  unwrap: {
    lang: 'ts',
    client: 'unwrap',
    prelude: API,
    code: `// generated with unwrapResponseData: true
const pets = await api.pets.listPets({ limit: 10 }); // Pet[]
const pet = await api.pets.getPet(42); // Pet, not HttpResponse<Pet>

console.log(pets.length, pet.name);`,
  },

  cancelFetch: {
    lang: 'ts',
    client: 'fetch',
    prelude: API,
    code: `// tag a request with a cancelToken (string | number | symbol)...
const search = api.pets.listPets({ tags: ['cat'] }, { cancelToken: 'pet-search' });

// ...and abort it with the same token (e.g. when the user types again)
api.abortRequest('pet-search');
await search.catch((e: unknown) => console.log('aborted', e));

// or pass your own AbortSignal
await api.pets.listPets({ limit: 10 }, { signal: AbortSignal.timeout(5_000) });`,
  },

  cancelAxios: {
    lang: 'ts',
    client: 'axios',
    prelude: API,
    code: `import axios from 'axios';

const controller = new AbortController();
const search = api.pets.listPets({ tags: ['cat'] }, { signal: controller.signal });

controller.abort();

try {
  await search;
} catch (e) {
  if (axios.isCancel(e)) console.log('request canceled');
}`,
  },

  upload: {
    lang: 'ts',
    client: 'fetch',
    prelude: API,
    code: `// POST /pets/{petId}/photo is multipart/form-data (type: ContentType.FormData):
// pass a plain object, the client builds the FormData
export async function onPhotoSelected(petId: string, event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const { data: photo } = await api.pets.uploadPetPhoto(petId, { file, caption: 'Rex' });
  console.log(photo.url);
}

// application/x-www-form-urlencoded bodies are serialized for you as well
await api.store.placeOrder({ petId: 'pet-1', quantity: 2 });`,
  },

  download: {
    lang: 'ts',
    client: 'fetch',
    prelude: API,
    code: `// routes whose response is \`format: binary\` are generated with format: 'blob'.
// For anything else, override the format per call or use api.request():
const { data: blob } = await api.request<Blob>({
  path: '/pets/export',
  method: 'GET',
  secure: true,
  format: 'blob',
});

const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = 'pets.csv';
link.click();
URL.revokeObjectURL(link.href);`,
  },

  customFetchRetry: {
    lang: 'ts',
    client: 'fetch',
    code: `import { Api } from './api/Api';

// retry GET requests on network errors and 5xx responses
const fetchWithRetry: typeof fetch = async (input, init) => {
  const retries = (init?.method ?? 'GET') === 'GET' ? 2 : 0;
  for (let attempt = 0; ; attempt++) {
    try {
      const response = await fetch(input, init);
      if (response.status < 500 || attempt >= retries) return response;
    } catch (e) {
      if (attempt >= retries || init?.signal?.aborted) throw e;
    }
    await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** attempt));
  }
};

export const api = new Api({ customFetch: fetchWithRetry });`,
  },

  customFetchTest: {
    lang: 'ts',
    title: 'pets.test.ts',
    client: 'fetch',
    code: `import { Api, type Pet } from './api/Api';

const rex: Pet = { id: '1', name: 'Rex', createdAt: '2026-01-01T00:00:00Z' };

// no network, no mocking library: answer with a Response
const api = new Api({
  customFetch: async (input) => {
    if (String(input).endsWith('/pets/1')) return Response.json(rex);
    return Response.json({ code: 404, message: 'Not found' }, { status: 404 });
  },
});

const { data } = await api.pets.getPet(1);
console.assert(data.name === 'Rex');`,
  },

  ssr: {
    lang: 'ts',
    client: 'fetch',
    code: `import { Api } from './api/Api';

// on the server, create a client per request and forward the caller's cookies
export function createServerApi(cookie: string) {
  return new Api({
    baseUrl: process.env.PETSTORE_URL ?? 'https://petstore.example.com/v1',
    baseApiParams: { headers: { cookie } },
  });
}`,
  },

  reactQuery: {
    lang: 'tsx',
    title: 'src/pets/queries.ts',
    client: 'fetch',
    code: `import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '../api-client';
import type { NewPet } from '../api/Api';

export function usePets(limit = 20) {
  return useQuery({
    queryKey: ['pets', { limit }],
    // pass React Query's signal so unmounted queries are canceled
    queryFn: ({ signal }) => api.pets.listPets({ limit }, { signal }).then((r) => r.data),
  });
}

export function useCreatePet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pet: NewPet) => api.pets.createPet(pet).then((r) => r.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pets'] }),
  });
}`,
  },

  swr: {
    lang: 'tsx',
    title: 'src/pets/pet-name.tsx',
    client: 'fetch',
    code: `import useSWR from 'swr';

import { api } from '../api-client';

export function PetName({ petId }: { petId: number }) {
  const { data: pet, error, isLoading } = useSWR(['pet', petId] as const, ([, id]) =>
    api.pets.getPet(id).then((r) => r.data)
  );

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Could not load the pet.</p>;
  return <p>{pet?.name}</p>;
}`,
  },

  node: {
    lang: 'ts',
    title: 'scripts/sync-inventory.ts',
    client: 'fetch',
    code: `import { openAsBlob } from 'node:fs';

import { Api } from '../src/api/Api';

// Node.js 18+ has fetch, FormData and File built in: the fetch client works as is
const api = new Api<string>({
  baseUrl: process.env.PETSTORE_URL ?? 'https://petstore.example.com/v1',
  securityWorker: (token) =>
    token ? { headers: { Authorization: \`Bearer \${token}\` } } : {},
});
api.setSecurityData(process.env.PETSTORE_TOKEN ?? null);

const { data: inventory } = await api.store.getInventory();
console.table(inventory);

// upload a file from disk
const blob = await openAsBlob('./rex.jpg', { type: 'image/jpeg' });
const file = new File([blob], 'rex.jpg', { type: blob.type });
await api.pets.uploadPetPhoto('pet-1', { file });`,
  },

  typesContracts: {
    lang: 'ts',
    client: 'fetch',
    code: `// every schema of components/schemas is exported
// (from data-contracts.ts in modular mode)
import { PetStatus, type Api, type NewPet, type Pet } from './api/Api';

export const draft: NewPet = { name: 'Rex', status: PetStatus.Available };

export function isAvailable(pet: Pet) {
  return pet.status === PetStatus.Available;
}

// types of inline parameters and responses, derived from the methods
type PetsApi = Api<unknown>['pets'];
export type ListPetsQuery = NonNullable<Parameters<PetsApi['listPets']>[0]>;
export type ListPetsResult = Awaited<ReturnType<PetsApi['listPets']>>['data']; // Pet[]`,
  },

  typesRoutes: {
    lang: 'ts',
    client: 'routeTypes',
    code: `// generated with generateRouteTypes: true
import type { Pets } from './api/Api';

type Query = Pets.ListPets.RequestQuery; // { status?, tags?, limit?, sort? }
type Body = Pets.CreatePet.RequestBody; // NewPet
type Result = Pets.GetPet.ResponseBody; // Pet

export function toSearchParams(query: Query) {
  const entries = Object.entries(query).map(([key, value]) => [key, String(value)]);
  return new URLSearchParams(entries);
}

export type { Body, Result };`,
  },
} satisfies Record<string, Snippet>;

export type SnippetId = keyof typeof SNIPPETS;
