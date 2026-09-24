/**
 * Runtime tests for the generated http clients: the fixture spec is generated
 * for every client variant, the emitted TypeScript is imported and its methods
 * are called against a local HTTP server that records the requests.
 */
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { type ClientVariant, type LoadedClient, loadClient } from './load-client';
import { startServer, type TestServer } from './server';

const variants: ClientVariant[] = [
  { name: 'fetch', httpClientType: 'fetch' },
  { name: 'fetch modular', httpClientType: 'fetch', modular: true },
  { name: 'fetch unwrapResponseData', httpClientType: 'fetch', unwrapResponseData: true },
  { name: 'fetch singleHttpClient', httpClientType: 'fetch', singleHttpClient: true },
  {
    name: 'fetch modular singleHttpClient',
    httpClientType: 'fetch',
    modular: true,
    singleHttpClient: true,
  },
  { name: 'fetch extractRequestParams', httpClientType: 'fetch', extractRequestParams: true },
  { name: 'fetch toJS', httpClientType: 'fetch', toJS: true },
  { name: 'axios', httpClientType: 'axios' },
  { name: 'axios modular', httpClientType: 'axios', modular: true },
  { name: 'axios unwrapResponseData', httpClientType: 'axios', unwrapResponseData: true },
  { name: 'axios singleHttpClient', httpClientType: 'axios', singleHttpClient: true },
  {
    name: 'axios modular singleHttpClient',
    httpClientType: 'axios',
    modular: true,
    singleHttpClient: true,
  },
  { name: 'axios extractRequestParams', httpClientType: 'axios', extractRequestParams: true },
  { name: 'axios modular toJS', httpClientType: 'axios', modular: true, toJS: true },
];

let server: TestServer;

beforeAll(async () => {
  server = await startServer();
});

afterAll(async () => {
  await server?.close();
});

describe.each(variants)('generated $name client', (variant) => {
  const isFetch = variant.httpClientType === 'fetch';
  let create: (config?: Record<string, unknown>) => LoadedClient;
  let client: LoadedClient;

  const baseConfig = (extra: Record<string, unknown> = {}) => ({
    ...(isFetch ? { baseUrl: server.url } : { baseURL: server.url }),
    ...extra,
  });

  /** response payload, whether or not the client unwraps it */
  const dataOf = (result: any) => (variant.unwrapResponseData ? result : result.data);

  /** status + body of a rejected request (fetch: HttpResponse, axios: AxiosError) */
  const errorOf = async (promise: Promise<unknown>) => {
    const error: any = await promise.then(
      () => {
        throw new Error('expected the request to reject');
      },
      (e) => e
    );
    if (isFetch) {
      expect(error).toBeInstanceOf(Response);
      expect(error.ok).toBe(false);
      return { status: error.status, body: error.error };
    }
    expect(error.isAxiosError).toBe(true);
    return { status: error.response.status, body: error.response.data };
  };

  const getPetPhoto = (petId: number, photoId: string, query?: Record<string, unknown>) =>
    variant.extractRequestParams
      ? client.pets.getPetPhoto({ petId, photoId, ...query })
      : client.pets.getPetPhoto(petId, photoId, query);

  beforeAll(async () => {
    ({ create } = await loadClient(variant));
  });

  beforeEach(() => {
    server.reset();
    client = create(baseConfig());
  });

  describe('path and query params', () => {
    it('interpolates path params', async () => {
      const result = await client.pets.getPet('pet-42');
      expect(server.last()).toMatchObject({ method: 'GET', path: '/pets/pet-42', rawQuery: '' });
      expect(dataOf(result)).toMatchObject({ method: 'GET', path: '/pets/pet-42' });
    });

    it('interpolates several path params and keeps query params separate', async () => {
      await getPetPhoto(7, 'front', { size: 'large' });
      expect(server.last()).toMatchObject({
        path: '/pets/7/photos/front',
        query: { size: 'large' },
      });
    });

    it('lets the URL parser percent-encode spaces in path params', async () => {
      await getPetPhoto(7, 'front view');
      expect(server.last().path).toBe('/pets/7/photos/front%20view');
    });

    it('encodes reserved characters in path params', async () => {
      await client.pets.getPet('a b/c?d');
      expect(server.last().path).toBe('/pets/a%20b%2Fc%3Fd');
    });

    it('serializes primitive, boolean and array query params', async () => {
      await client.pets.listPets({ limit: 10, tags: ['a', 'b c'], active: false });
      const request = server.last();
      if (isFetch) {
        // repeated keys: tags=a&tags=b%20c
        expect(request.rawQuery).toBe('limit=10&tags=a&tags=b%20c&active=false');
        expect(request.query).toEqual({ limit: '10', tags: ['a', 'b c'], active: 'false' });
      } else {
        // axios default params serializer: tags[]=a&tags[]=b+c
        expect(request.query).toEqual({ limit: '10', 'tags[]': ['a', 'b c'], active: 'false' });
      }
    });

    it('skips undefined and null query params', async () => {
      await client.pets.listPets({ limit: 1, active: undefined, name: null });
      expect(server.last().query).toEqual({ limit: '1' });
    });

    it('omits the query string when there is no query', async () => {
      await client.pets.listPets();
      expect(server.last().url).toBe('/pets');
    });
  });

  describe('request bodies', () => {
    it.each([
      ['POST', 'createPet', 201],
      ['PUT', 'replacePet', 200],
      ['PATCH', 'updatePet', 200],
    ])('sends a JSON body with %s', async (method, operation, status) => {
      const body = { name: 'Rex', tags: ['good', 'boy'] };
      const result =
        operation === 'createPet'
          ? await client.pets.createPet(body)
          : await client.pets[operation]('pet-1', body);

      const request = server.last();
      expect(request.method).toBe(method);
      expect(request.contentType).toBe('application/json');
      expect(request.body).toEqual(body);
      expect(dataOf(result)).toEqual({ method, path: request.path, query: {}, body });
      if (!variant.unwrapResponseData) expect(result.status).toBe(status);
    });

    it('sends multipart/form-data with a file and fields', async () => {
      const file = new File(['hello file'], 'hello.txt', { type: 'text/plain' });
      const result = await client.uploads.uploadMultipart({
        file,
        description: 'a file',
        count: 3,
      });

      const request = server.last();
      // the boundary must be generated by the runtime, not overwritten by the client
      expect(request.contentType).toMatch(/^multipart\/form-data; boundary=/);
      expect(request.body).toEqual({
        file: { kind: 'file', value: 'hello file', name: 'hello.txt', type: 'text/plain' },
        description: { kind: 'field', value: 'a file' },
        count: { kind: 'field', value: '3' },
      });
      expect(dataOf(result).body).toEqual(request.body);
    });

    it('sends multipart/form-data with a Blob', async () => {
      const blob = new Blob([new Uint8Array([1, 2, 3])], { type: 'application/octet-stream' });
      await client.uploads.uploadMultipart({ file: blob });

      const request = server.last();
      expect(request.body).toMatchObject({
        file: { kind: 'file', type: 'application/octet-stream' },
      });
      expect(request.rawBody.includes(Buffer.from([1, 2, 3]))).toBe(true);
    });

    it('sends an x-www-form-urlencoded body', async () => {
      await client.uploads.uploadUrlEncoded({ name: 'a b&c', count: 2, flag: true });

      const request = server.last();
      expect(request.contentType).toBe('application/x-www-form-urlencoded');
      expect(request.body).toEqual({ name: 'a b&c', count: '2', flag: 'true' });
    });

    it('sends a text/plain body as is', async () => {
      await client.uploads.uploadText('just "text"');

      const request = server.last();
      expect(request.contentType).toBe('text/plain');
      expect(request.rawBody.toString()).toBe('just "text"');
    });

    it('stringifies a non-string text/plain body', async () => {
      await client.uploads.uploadText({ not: 'a string' } as any);
      expect(server.last().rawBody.toString()).toBe('{"not":"a string"}');
    });

    it('sends no body for GET requests', async () => {
      await client.pets.getPet('1');
      expect(server.last().rawBody.length).toBe(0);
      expect(server.last().contentType).toBeUndefined();
    });
  });

  describe('headers', () => {
    it('sends per-request headers', async () => {
      await client.pets.getPet('1', { headers: { 'X-Trace-Id': 'trace-1' } });
      expect(server.last().headers['x-trace-id']).toBe('trace-1');
    });

    it('sends default headers from the client config and lets requests override them', async () => {
      client = create(
        baseConfig(
          isFetch
            ? { baseApiParams: { headers: { 'X-Base': 'base', 'X-Both': 'base' } } }
            : { headers: { 'X-Base': 'base', 'X-Both': 'base' } }
        )
      );
      await client.pets.createPet({ name: 'a' }, { headers: { 'X-Both': 'request' } });

      const { headers } = server.last();
      expect(headers['x-base']).toBe('base');
      expect(headers['x-both']).toBe('request');
      expect(headers['content-type']).toBe('application/json');
    });

    it('passes the final headers through injectHeaders', async () => {
      const seen: Record<string, unknown>[] = [];
      client = create(
        baseConfig({
          injectHeaders: async (headers: Record<string, unknown>) => {
            seen.push(headers);
            return { ...headers, 'X-Injected': 'yes' };
          },
        })
      );
      await client.pets.createPet({ name: 'a' });

      expect(seen[0]).toMatchObject({ 'Content-Type': 'application/json' });
      expect(server.last().headers['x-injected']).toBe('yes');
    });
  });

  describe('security', () => {
    const securityWorker = (data: { token: string } | null) =>
      data ? { headers: { Authorization: `Bearer ${data.token}` } } : {};

    const setSecurityData = (data: { token: string } | null) => {
      for (const http of client.httpClients) http.setSecurityData(data);
    };

    beforeEach(() => {
      client = create(baseConfig({ securityWorker }));
    });

    it('adds the auth header only to secure routes', async () => {
      setSecurityData({ token: 'secret' });

      await client.auth.getSecure();
      expect(server.last().headers.authorization).toBe('Bearer secret');

      await client.auth.getPublic();
      expect(server.last().headers.authorization).toBeUndefined();
    });

    it('uses the latest security data', async () => {
      await client.auth.getSecure();
      expect(server.last().headers.authorization).toBeUndefined();

      setSecurityData({ token: 'first' });
      await client.auth.getSecure();
      expect(server.last().headers.authorization).toBe('Bearer first');

      setSecurityData({ token: 'second' });
      await client.auth.getSecure();
      expect(server.last().headers.authorization).toBe('Bearer second');
    });

    it('lets a request opt out of / into the security worker', async () => {
      setSecurityData({ token: 'secret' });

      await client.auth.getSecure({ secure: false });
      expect(server.last().headers.authorization).toBeUndefined();

      await client.auth.getPublic({ secure: true });
      expect(server.last().headers.authorization).toBe('Bearer secret');
    });

    it('awaits an async security worker', async () => {
      client = create(
        baseConfig({
          securityWorker: async (data: { token: string } | null) => securityWorker(data),
        })
      );
      setSecurityData({ token: 'async' });
      await client.auth.getSecure();
      expect(server.last().headers.authorization).toBe('Bearer async');
    });
  });

  describe('responses and errors', () => {
    it.each([404, 500])('rejects on %i with the error body', async (code) => {
      const error = await errorOf(client.status.getStatus(code));
      expect(error).toEqual({ status: code, body: { code, message: `status ${code}` } });
    });

    it('resolves non-200 success codes', async () => {
      const result = await client.status.getStatus(202);
      expect(dataOf(result)).toMatchObject({ path: '/status/202' });
      if (!variant.unwrapResponseData) expect(result.status).toBe(202);
    });

    it('resolves a 204 response without a body', async () => {
      const result = await client.pets.deletePet('1');
      expect(server.last()).toMatchObject({ method: 'DELETE', path: '/pets/1' });
      if (variant.unwrapResponseData) {
        expect(result ?? '').toBe('');
      } else {
        expect(result.status).toBe(204);
      }
    });

    it('resolves a 204 response of a route that expects JSON', async () => {
      const result = await client.status.getStatus(204);
      const data = dataOf(result);
      expect(data ?? '').toBe('');
    });
  });
});
