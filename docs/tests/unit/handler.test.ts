import { readFileSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import path from 'node:path';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { POST as routePOST, dynamic, maxDuration, runtime } from '@/app/api/generate/route';
import type { GenerateFailure, GenerateResponse, GenerateSuccess } from '@/lib/api-types';
import { MAX_SPEC_BYTES } from '@/lib/api-types';
import { createGenerateHandler, MAX_BODY_BYTES, rateLimitFromEnv } from '@/lib/server/handler';
import { isPublicAddress } from '@/lib/server/ip';
import { createRateLimiter } from '@/lib/server/rate-limit';

const fixtures = path.resolve(__dirname, '../../../tests/fixtures');
const petstore = readFileSync(path.join(fixtures, 'petstore.json'), 'utf8');
const swagger2Yaml = readFileSync(path.join(fixtures, 'swagger2.yaml'), 'utf8');

const handler = createGenerateHandler({ rateLimiter: createRateLimiter({ limit: 10_000 }) });

const request = (body: unknown, headers: Record<string, string> = {}) =>
  new Request('http://localhost/api/generate', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

async function call(body: unknown, h = handler, headers?: Record<string, string>) {
  const res = await h(request(body, headers));
  const json = (await res.json()) as GenerateResponse;
  return { status: res.status, json, res };
}

async function ok(body: unknown): Promise<GenerateSuccess> {
  const { status, json } = await call(body);
  if (!json.ok) throw new Error(`expected success, got ${status}: ${json.error}`);
  expect(status).toBe(200);
  return json;
}

const names = (r: GenerateSuccess) => r.files.map((f) => f.name).sort();
const file = (r: GenerateSuccess, name: string) => r.files.find((f) => f.name === name)!.content;

describe('route module', () => {
  it('exports the route segment config', () => {
    expect(runtime).toBe('nodejs');
    expect(dynamic).toBe('force-dynamic');
    expect(maxDuration).toBeGreaterThanOrEqual(20);
    expect(typeof routePOST).toBe('function');
  });
});

describe('POST /api/generate - happy path', () => {
  it('default (single file, fetch client)', async () => {
    const r = await ok({ spec: petstore });
    expect(names(r)).toEqual(['Api.ts']);
    expect(file(r, 'Api.ts')).toContain('export class Api');
    expect(file(r, 'Api.ts')).toContain('fetch');
    expect(r.durationMs).toBeGreaterThanOrEqual(0);
  });

  it('modular', async () => {
    const r = await ok({ spec: petstore, options: { modular: true } });
    expect(names(r)).toEqual(expect.arrayContaining(['data-contracts.ts', 'http-client.ts']));
    expect(r.files.length).toBeGreaterThan(2);
  });

  it('axios', async () => {
    const r = await ok({ spec: petstore, options: { httpClientType: 'axios' } });
    expect(file(r, 'Api.ts')).toContain('axios');
  });

  it('toJS returns .js and .d.ts', async () => {
    const r = await ok({ spec: petstore, options: { toJS: true, name: 'petstore.ts' } });
    expect(names(r)).toEqual(['petstore.d.ts', 'petstore.js']);
    expect(file(r, 'petstore.js')).not.toMatch(/:\s*string\b.*=>/);
  });

  it('custom name without extension, apiClassName and prefixes', async () => {
    const r = await ok({
      spec: petstore,
      options: { name: 'petstore', apiClassName: 'PetStoreApi', typePrefix: 'I' },
    });
    expect(names(r)).toEqual(['petstore.ts']);
    expect(file(r, 'petstore.ts')).toContain('class PetStoreApi');
    expect(file(r, 'petstore.ts')).toMatch(/interface I[A-Z]/);
  });

  it('Swagger 2 YAML', async () => {
    const r = await ok({ spec: swagger2Yaml });
    expect(names(r)).toEqual(['Api.ts']);
  });

  it('ignores dangerous / unknown options', async () => {
    const r = await ok({
      spec: petstore,
      options: {
        output: '/tmp/should-not-exist',
        templates: '/etc',
        input: '/etc/passwd',
        url: 'http://169.254.169.254/',
        hooks: { onInit: 'x' },
        cleanOutput: true,
        silent: false,
      },
    });
    expect(names(r)).toEqual(['Api.ts']);
  });

  it('sets no-store / json headers', async () => {
    const { res } = await call({ spec: petstore });
    expect(res.headers.get('content-type')).toMatch(/application\/json/);
    expect(res.headers.get('cache-control')).toBe('no-store');
  });
});

describe('POST /api/generate - by URL', () => {
  let server: Server;
  let base: string;
  beforeAll(async () => {
    server = createServer((req, res) => {
      if (req.url === '/petstore.json') {
        res.setHeader('content-type', 'application/json');
        res.end(petstore);
      } else if (req.url === '/to-metadata') {
        res.statusCode = 302;
        res.setHeader('location', 'http://169.254.169.254/latest/meta-data/');
        res.end();
      } else {
        res.statusCode = 404;
        res.end();
      }
    });
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  });
  afterAll(() => new Promise<void>((resolve) => server.close(() => resolve())));

  const localHandler = createGenerateHandler({
    rateLimiter: createRateLimiter({ limit: 10_000 }),
    fetchOptions: { isAddressAllowed: (ip) => ip === '127.0.0.1' || isPublicAddress(ip) },
  });

  it('generates from a URL', async () => {
    const { status, json } = await call({ url: `${base}/petstore.json` }, localHandler);
    expect(status).toBe(200);
    expect(json.ok && json.files.map((f) => f.name)).toEqual(['Api.ts']);
  });

  it('blocks redirects to private addresses', async () => {
    const { status, json } = await call({ url: `${base}/to-metadata` }, localHandler);
    expect(status).toBe(400);
    expect((json as GenerateFailure).error).toMatch(/private or reserved/);
  });

  it('blocks private URLs with the default policy', async () => {
    for (const url of [
      `${base}/petstore.json`,
      'http://[::1]/',
      'http://2130706433/',
      'http://0x7f.1/',
    ]) {
      const { status, json } = await call({ url });
      expect(status).toBe(400);
      expect(json.ok).toBe(false);
    }
  });

  it('reports upstream errors as 422', async () => {
    const { status } = await call({ url: `${base}/missing.json` }, localHandler);
    expect(status).toBe(422);
  });
});

describe('POST /api/generate - errors', () => {
  it('400 on invalid JSON body / fields', async () => {
    expect((await call('{nope')).status).toBe(400);
    expect((await call({})).status).toBe(400);
    expect((await call({ spec: petstore, options: { modular: 'yes' } })).status).toBe(400);
    expect((await call({ spec: petstore, options: { name: '../x.ts' } })).status).toBe(400);
    expect((await call({ spec: 'hello: world' })).status).toBe(400);
    const { json } = await call({ spec: '{"openapi": 3' });
    expect(json).toEqual({ ok: false, error: expect.stringMatching(/Invalid JSON/) });
  });

  it('415 without a JSON content type', async () => {
    const res = await handler(
      new Request('http://localhost/api/generate', {
        method: 'POST',
        headers: { 'content-type': 'text/plain' },
        body: JSON.stringify({ spec: petstore }),
      })
    );
    expect(res.status).toBe(415);
  });

  it('413 when the spec or body is too large', async () => {
    const big = JSON.stringify({ openapi: '3.0.0', paths: {}, x: 'a'.repeat(MAX_SPEC_BYTES) });
    const { status, json } = await call({ spec: big });
    expect(status).toBe(413);
    expect(json.ok).toBe(false);
    const huge = await call({ spec: 'x'.repeat(MAX_BODY_BYTES + 10) });
    expect(huge.status).toBe(413);
  });

  it('422 when the generator fails, without stack traces', async () => {
    const { status, json } = await call({
      spec: JSON.stringify({ swagger: '2.0', paths: 'nope' }),
    });
    expect(status).toBe(422);
    expect(json).toEqual({ ok: false, error: expect.stringMatching(/^Generation failed: /) });
    expect((json as GenerateFailure).error).not.toMatch(/\n\s+at /);
  });
});

describe('rate limit', () => {
  it('returns 429 after the limit, per client IP', async () => {
    const h = createGenerateHandler({
      rateLimiter: createRateLimiter({ limit: 2, windowMs: 60_000 }),
    });
    const ip = { 'x-forwarded-for': '203.0.113.1, 10.0.0.1' };
    expect((await call({}, h, ip)).status).toBe(400);
    expect((await call({}, h, ip)).status).toBe(400);
    const limited = await call({}, h, ip);
    expect(limited.status).toBe(429);
    expect(limited.res.headers.get('retry-after')).toMatch(/^\d+$/);
    expect(limited.json.ok).toBe(false);
    // another client is not affected
    expect((await call({}, h, { 'x-real-ip': '198.51.100.2' })).status).toBe(400);
  });

  it('reads the limit from GENERATE_RATE_LIMIT', () => {
    expect(rateLimitFromEnv(undefined)).toBe(30);
    expect(rateLimitFromEnv('')).toBe(30);
    expect(rateLimitFromEnv('abc')).toBe(30);
    expect(rateLimitFromEnv('-1')).toBe(30);
    expect(rateLimitFromEnv('100')).toBe(100);
    expect(rateLimitFromEnv('0')).toBe(0);
  });

  it('resets after the window', () => {
    let now = 0;
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000, now: () => now });
    expect(limiter.check('a').allowed).toBe(true);
    expect(limiter.check('a').allowed).toBe(false);
    now = 1001;
    expect(limiter.check('a').allowed).toBe(true);
  });

  it('bounds memory', () => {
    const limiter = createRateLimiter({ limit: 1, maxEntries: 100 });
    for (let i = 0; i < 1000; i++) limiter.check(`ip-${i}`);
    expect(limiter.check('ip-999').allowed).toBe(false);
  });
});

describe('parallel isolation', () => {
  it('concurrent requests with different options do not bleed into each other', async () => {
    const variants = [
      { options: {}, expectNames: ['Api.ts'], contains: 'fetch', notContains: 'axios' },
      {
        options: { httpClientType: 'axios' },
        expectNames: ['Api.ts'],
        contains: 'axios',
        notContains: null,
      },
      { options: { modular: true }, expectNames: null, contains: null, notContains: null },
      {
        options: { toJS: true },
        expectNames: ['Api.d.ts', 'Api.js'],
        contains: null,
        notContains: null,
      },
      {
        options: { apiClassName: 'Alpha', typePrefix: 'A' },
        expectNames: ['Api.ts'],
        contains: 'class Alpha',
        notContains: 'class Beta',
      },
      {
        options: { apiClassName: 'Beta', typePrefix: 'B' },
        expectNames: ['Api.ts'],
        contains: 'class Beta',
        notContains: 'class Alpha',
      },
    ] as const;

    const sequential: GenerateSuccess[] = [];
    for (const v of variants) sequential.push(await ok({ spec: petstore, options: v.options }));

    const parallel = await Promise.all(
      [...variants, ...variants].map((v) => ok({ spec: petstore, options: v.options }))
    );

    parallel.forEach((result, i) => {
      const v = variants[i % variants.length];
      const reference = sequential[i % variants.length];
      // identical output to the sequential run
      expect(result.files).toEqual(reference.files);
      if (v.expectNames) expect(names(result)).toEqual([...v.expectNames].sort());
      else expect(names(result)).toContain('http-client.ts');
      const all = result.files.map((f) => f.content).join('\n');
      if (v.contains) expect(all).toContain(v.contains);
      if (v.notContains) expect(all).not.toContain(v.notContains);
    });
  });
});
