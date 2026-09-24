/**
 * Runtime behaviour specific to the generated fetch http client.
 */
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { type LoadedClient, loadClient } from './load-client';
import { startServer, type TestServer } from './server';

let server: TestServer;
let create: (config?: Record<string, unknown>) => LoadedClient;
let client: LoadedClient;

/** waits until the server has received `count` requests */
const waitForRequests = (count: number) =>
  vi.waitFor(() => expect(server.requests.length).toBeGreaterThanOrEqual(count), {
    timeout: 2000,
    interval: 5,
  });

beforeAll(async () => {
  server = await startServer();
  ({ create } = await loadClient({ name: 'fetch', httpClientType: 'fetch' }));
});

afterAll(async () => {
  await server?.close();
});

beforeEach(() => {
  server.reset();
  client = create({ baseUrl: server.url });
});

describe('base url', () => {
  it('defaults to the first server of the spec', () => {
    const api = create();
    expect(api.httpClients[0].baseUrl).toBe('http://example.invalid/api');
  });

  it('can be overridden per request', async () => {
    client = create();
    await client.auth.getPublic({ baseUrl: server.url });
    expect(server.last().path).toBe('/auth/public');
  });
});

describe('HttpResponse', () => {
  it('is the native Response with parsed `data` and empty `error`', async () => {
    const response = await client.pets.getPet('1');
    expect(response).toBeInstanceOf(Response);
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('application/json');
    expect(response.data).toMatchObject({ path: '/pets/1' });
    expect(response.error).toBeNull();
  });

  it('exposes a JSON parse failure of a successful response on `error` instead of throwing', async () => {
    const response = await client.downloads.downloadText({ format: 'json' });
    expect(response.ok).toBe(true);
    expect(response.data).toBeNull();
    expect(response.error).toBeInstanceOf(SyntaxError);
  });

  it('lets a request override the response format', async () => {
    const response = await client.auth.getPublic({ format: 'text' });
    expect(typeof response.data).toBe('string');
    expect(JSON.parse(response.data)).toMatchObject({ path: '/auth/public' });
  });
});

describe('downloads', () => {
  it('reads image responses as Blob', async () => {
    const response = await client.downloads.downloadImage();
    expect(response.data).toBeInstanceOf(Blob);
    expect(response.data.type).toBe('image/png');
    expect([...new Uint8Array(await response.data.arrayBuffer())].slice(0, 4)).toEqual([
      0x89, 0x50, 0x4e, 0x47,
    ]);
  });

  it('reads application/octet-stream responses as Blob', async () => {
    const response = await client.downloads.downloadBinary();
    expect(response.data).toBeInstanceOf(Blob);
    expect([...new Uint8Array(await response.data.arrayBuffer())]).toEqual([
      0, 1, 2, 3, 250, 251, 252, 253,
    ]);
  });

  it('reads text/plain responses as text', async () => {
    const response = await client.downloads.downloadText();
    expect(response.data).toBe('hello text');
  });

  it('reads the body as ArrayBuffer when requested', async () => {
    const response = await client.downloads.downloadBinary({ format: 'arrayBuffer' });
    expect(response.data).toBeInstanceOf(ArrayBuffer);
    expect(response.data.byteLength).toBe(8);
  });
});

describe('form data', () => {
  it('JSON-stringifies object and array fields', async () => {
    await client.uploads.uploadMultipart({
      file: new Blob(['x']),
      meta: { a: 1 },
      list: ['a', 'b'],
    } as any);
    expect(server.last().body).toMatchObject({
      meta: { kind: 'field', value: '{"a":1}' },
      list: { kind: 'field', value: '["a","b"]' },
    });
  });
});

describe('cancellation', () => {
  it('aborts an in-flight request via cancelToken + abortRequest', async () => {
    const promise = client.status.getSlow({ delay: 5000 }, { cancelToken: 'slow' });
    await waitForRequests(1);

    client.httpClients[0].abortRequest('slow');

    await expect(promise).rejects.toMatchObject({ name: 'AbortError' });
    await vi.waitFor(() => expect(server.last().aborted).toBe(true), { timeout: 2000 });
  });

  it('reuses the cancel token after a request completed', async () => {
    await client.status.getSlow({ delay: 0 }, { cancelToken: 'reuse' });
    const response = await client.status.getSlow({ delay: 0 }, { cancelToken: 'reuse' });
    expect(response.status).toBe(200);
  });

  it('ignores abortRequest for an unknown token', () => {
    expect(() => client.httpClients[0].abortRequest('unknown')).not.toThrow();
  });

  it('aborts via a caller provided AbortSignal', async () => {
    const controller = new AbortController();
    const promise = client.status.getSlow({ delay: 5000 }, { signal: controller.signal });
    await waitForRequests(1);

    controller.abort();

    await expect(promise).rejects.toMatchObject({ name: 'AbortError' });
  });
});

describe('customFetch', () => {
  it('sends every request through the provided fetch', async () => {
    const customFetch = vi.fn((...args: Parameters<typeof fetch>) => fetch(...args));
    client = create({ baseUrl: server.url, customFetch });

    const response = await client.pets.createPet({ name: 'Rex' }, { headers: { 'X-A': 'a' } });

    expect(customFetch).toHaveBeenCalledTimes(1);
    const [url, init] = customFetch.mock.calls[0];
    expect(url).toBe(`${server.url}/pets`);
    expect(init).toMatchObject({
      method: 'POST',
      body: '{"name":"Rex"}',
      headers: { 'Content-Type': 'application/json', 'X-A': 'a' },
    });
    expect(response.data).toMatchObject({ body: { name: 'Rex' } });
  });

  it('can answer without hitting the network', async () => {
    const customFetch = vi.fn(async () => Response.json({ mocked: true }, { status: 200 }));
    client = create({ baseUrl: server.url, customFetch });

    const response = await client.pets.getPet('1');

    expect(response.data).toEqual({ mocked: true });
    expect(server.requests).toHaveLength(0);
  });
});

describe('baseApiParams', () => {
  it('`secure: true` runs the security worker for every route', async () => {
    client = create({
      baseUrl: server.url,
      baseApiParams: { secure: true },
      securityWorker: () => ({ headers: { Authorization: 'Bearer all' } }),
    });
    await client.auth.getPublic();
    expect(server.last().headers.authorization).toBe('Bearer all');
  });

  it('`format` is used for routes without a response format', async () => {
    client = create({ baseUrl: server.url, baseApiParams: { format: 'text' } });
    const response = await client.pets.deletePet('1');
    expect(response.status).toBe(204);
    expect(response.data).toBe('');
  });
});

describe('disableThrowOnError', () => {
  let createNoThrow: typeof create;

  beforeAll(async () => {
    ({ create: createNoThrow } = await loadClient({
      name: 'fetch disableThrowOnError',
      httpClientType: 'fetch',
      disableThrowOnError: true,
    }));
  });

  it.each([404, 500])('resolves %i responses with the error body', async (code) => {
    const api = createNoThrow({ baseUrl: server.url });
    const response = await api.status.getStatus(code);
    expect(response.ok).toBe(false);
    expect(response.status).toBe(code);
    expect(response.data).toBeNull();
    expect(response.error).toEqual({ code, message: `status ${code}` });
  });

  it('still resolves successful responses', async () => {
    const api = createNoThrow({ baseUrl: server.url });
    const response = await api.pets.getPet('1');
    expect(response.data).toMatchObject({ path: '/pets/1' });
  });

  it('still rejects on network errors', async () => {
    const api = createNoThrow({ baseUrl: 'http://127.0.0.1:1' });
    await expect(api.pets.getPet('1')).rejects.toThrow(TypeError);
  });
});
