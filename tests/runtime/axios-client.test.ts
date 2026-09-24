/**
 * Runtime behaviour specific to the generated axios http client.
 */
import axios from 'axios';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { type LoadedClient, loadClient } from './load-client';
import { startServer, type TestServer } from './server';

let server: TestServer;
let create: (config?: Record<string, unknown>) => LoadedClient;
let client: LoadedClient;

beforeAll(async () => {
  server = await startServer();
  ({ create } = await loadClient({ name: 'axios', httpClientType: 'axios' }));
});

afterAll(async () => {
  await server?.close();
});

beforeEach(() => {
  server.reset();
  client = create({ baseURL: server.url });
});

describe('axios instance', () => {
  it('defaults baseURL to the first server of the spec', () => {
    const api = create();
    expect(api.httpClients[0].instance.defaults.baseURL).toBe('http://example.invalid/api');
  });

  it('uses a provided axios instance', async () => {
    const instance = axios.create({ baseURL: server.url, headers: { 'X-Instance': 'custom' } });
    const requestSpy = vi.spyOn(instance, 'request');
    client = create({ instance });

    const response = await client.pets.getPet('1');

    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy.mock.calls[0][0]).toMatchObject({ url: '/pets/1', method: 'GET' });
    expect(server.last().headers['x-instance']).toBe('custom');
    expect(response.data).toMatchObject({ path: '/pets/1' });
  });

  it('returns the AxiosResponse', async () => {
    const response = await client.pets.createPet({ name: 'Rex' });
    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toBe('application/json');
    expect(response.config).toMatchObject({ url: '/pets', method: 'post', responseType: 'json' });
    expect(response.data).toMatchObject({ body: { name: 'Rex' } });
  });
});

describe('errors', () => {
  it('rejects with an AxiosError carrying the response', async () => {
    const error: any = await client.status.getStatus(418).catch((e: unknown) => e);
    expect(axios.isAxiosError(error)).toBe(true);
    expect(error.response.status).toBe(418);
    expect(error.response.data).toEqual({ code: 418, message: 'status 418' });
  });

  it('resolves error statuses when validateStatus accepts them', async () => {
    client = create({ baseURL: server.url, validateStatus: () => true });
    const response = await client.status.getStatus(500);
    expect(response.status).toBe(500);
    expect(response.data).toEqual({ code: 500, message: 'status 500' });
  });
});

describe('downloads', () => {
  it('reads text/plain responses as text', async () => {
    const response = await client.downloads.downloadText();
    expect(response.data).toBe('hello text');
  });

  it('reads binary responses when requested as arraybuffer', async () => {
    const response = await client.downloads.downloadBinary({ format: 'arraybuffer' });
    expect(Buffer.isBuffer(response.data)).toBe(true);
    expect([...response.data]).toEqual([0, 1, 2, 3, 250, 251, 252, 253]);
  });

  it('reads image responses when requested as arraybuffer', async () => {
    const response = await client.downloads.downloadImage({ format: 'arraybuffer' });
    expect([...response.data.subarray(0, 4)]).toEqual([0x89, 0x50, 0x4e, 0x47]);
  });
});

describe('request config', () => {
  it('`secure: true` runs the security worker for every route', async () => {
    client = create({
      baseURL: server.url,
      secure: true,
      securityWorker: () => ({ headers: { Authorization: 'Bearer all' } }),
    });
    await client.auth.getPublic();
    expect(server.last().headers.authorization).toBe('Bearer all');
  });

  it('`format` is used for routes without a response format', async () => {
    client = create({ baseURL: server.url, format: 'arraybuffer' });
    const response = await client.downloads.downloadBinary();
    expect(Buffer.isBuffer(response.data)).toBe(true);
  });

  it('aborts an in-flight request via AbortSignal', async () => {
    const controller = new AbortController();
    const promise = client.status.getSlow({ delay: 5000 }, { signal: controller.signal });
    await vi.waitFor(() => expect(server.requests).toHaveLength(1), { timeout: 2000 });

    controller.abort();

    const error = await promise.catch((e: unknown) => e);
    expect(axios.isCancel(error)).toBe(true);
    await vi.waitFor(() => expect(server.last().aborted).toBe(true), { timeout: 2000 });
  });

  it('repeats array fields in form data', async () => {
    await client.uploads.uploadMultipart({
      file: new Blob(['x']),
      meta: { a: 1 },
      list: ['a', 'b'],
    } as any);
    expect(server.last().body).toMatchObject({
      meta: { kind: 'field', value: '{"a":1}' },
      list: [
        { kind: 'field', value: 'a' },
        { kind: 'field', value: 'b' },
      ],
    });
  });

  it('keeps a FormData body as is', async () => {
    const form = new FormData();
    form.append('description', 'prebuilt');
    await client.uploads.uploadMultipart(form as any);
    expect(server.last().body).toEqual({ description: { kind: 'field', value: 'prebuilt' } });
  });
});
