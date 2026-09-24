import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { gzipSync } from 'node:zlib';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { HttpError } from '@/lib/server/errors';
import { type FetchSpecOptions, fetchSpecText, parsePublicUrl } from '@/lib/server/fetch-spec';
import { isPublicAddress } from '@/lib/server/ip';

const SPEC = JSON.stringify({ openapi: '3.0.0', info: { title: 't', version: '1' }, paths: {} });

let server: Server;
let base: string;

/** allows the local test server (127.0.0.1) and public addresses, nothing else */
const allowLocal: FetchSpecOptions = {
  isAddressAllowed: (ip) => ip === '127.0.0.1' || isPublicAddress(ip),
};

beforeAll(async () => {
  server = createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://x');
    switch (url.pathname) {
      case '/spec.json':
        res.setHeader('content-type', 'application/json');
        res.end(SPEC);
        return;
      case '/spec.gz':
        res.setHeader('content-encoding', 'gzip');
        res.end(gzipSync(SPEC));
        return;
      case '/redirect': {
        const n = Number(url.searchParams.get('n') ?? 1);
        res.statusCode = 302;
        res.setHeader('location', n > 1 ? `/redirect?n=${n - 1}` : '/spec.json');
        res.end();
        return;
      }
      case '/redirect-to': {
        res.statusCode = 307;
        res.setHeader('location', url.searchParams.get('to') ?? '/');
        res.end();
        return;
      }
      case '/big':
        res.setHeader('content-length', String(2000));
        res.end('x'.repeat(2000));
        return;
      case '/big-chunked':
        // no content-length: streamed until the limit is reached
        for (let i = 0; i < 20; i++) res.write('y'.repeat(100));
        res.end();
        return;
      case '/gzip-bomb':
        res.setHeader('content-encoding', 'gzip');
        res.end(gzipSync(Buffer.alloc(100_000, 'a')));
        return;
      case '/slow':
        res.write('{');
        setTimeout(() => res.end('}'), 2000);
        return;
      case '/404':
        res.statusCode = 404;
        res.end('not found');
        return;
      default:
        res.statusCode = 500;
        res.end();
    }
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterAll(() => new Promise<void>((resolve) => server.close(() => resolve())));

const expectHttpError = async (promise: Promise<unknown>, status: number, message?: RegExp) => {
  const error = await promise.then(
    () => {
      throw new Error('expected an error');
    },
    (e: unknown) => e
  );
  expect(error).toBeInstanceOf(HttpError);
  expect((error as HttpError).status).toBe(status);
  if (message) expect((error as HttpError).message).toMatch(message);
};

describe('parsePublicUrl', () => {
  it.each([
    'ftp://example.com/a',
    'file:///etc/passwd',
    'javascript:alert(1)',
    'gopher://x',
    'not a url',
    '//example.com',
  ])('rejects %s', (url) => expect(() => parsePublicUrl(url)).toThrow(HttpError));
  it('rejects credentials', () => {
    expect(() => parsePublicUrl('https://user:pass@example.com/')).toThrow(/credentials/);
    expect(() => parsePublicUrl('https://user@example.com/')).toThrow(/credentials/);
  });
  it('rejects blocked host names', () => {
    expect(() => parsePublicUrl('http://localhost:3000/')).toThrow(/not allowed/);
    expect(() => parsePublicUrl('http://LOCALHOST./')).toThrow(/not allowed/);
    expect(() => parsePublicUrl('http://metadata.google.internal/')).toThrow(/not allowed/);
  });
  it('normalizes numeric IPv4 host names', () => {
    expect(parsePublicUrl('http://2130706433/').hostname).toBe('127.0.0.1');
    expect(parsePublicUrl('http://0x7f.1/').hostname).toBe('127.0.0.1');
    expect(parsePublicUrl('http://0177.0.0.1/').hostname).toBe('127.0.0.1');
    expect(parsePublicUrl('http://127.1/').hostname).toBe('127.0.0.1');
    expect(parsePublicUrl('http://[::ffff:127.0.0.1]/').hostname).toBe('[::ffff:7f00:1]');
  });
});

describe('fetchSpecText (default IP policy)', () => {
  it.each([
    'http://127.0.0.1/',
    'http://2130706433/',
    'http://0x7f.1/',
    'http://0177.0.0.1:8080/',
    'http://127.1/',
    'http://0.0.0.0/',
    'http://0/',
    'http://[::1]/',
    'http://[::]/',
    'http://[::ffff:127.0.0.1]/',
    'http://[::ffff:7f00:1]/',
    'http://[fe80::1]/',
    'http://[fd00:ec2::254]/latest/meta-data/',
    'http://169.254.169.254/latest/meta-data/',
    'http://100.100.100.200/',
    'http://10.0.0.1/',
    'http://192.168.0.1:9999/',
    'http://224.0.0.1/',
  ])('blocks %s before connecting', async (url) => {
    await expectHttpError(fetchSpecText(url), 400, /private or reserved/);
  });

  it('blocks localhost by name', async () => {
    await expectHttpError(fetchSpecText('http://localhost/'), 400, /not allowed/);
  });

  it('blocks host names resolving to private addresses (any record)', async () => {
    const resolveHost = async () => [
      { address: '93.184.216.34', family: 4 as const },
      { address: '10.0.0.5', family: 4 as const },
    ];
    await expectHttpError(fetchSpecText('http://evil.example/', { resolveHost }), 400, /private/);
    const resolveV6 = async () => [{ address: '::ffff:169.254.169.254', family: 6 as const }];
    await expectHttpError(
      fetchSpecText('http://evil.example/', { resolveHost: resolveV6 }),
      400,
      /private/
    );
  });

  it('connects to the address that was checked (DNS pinning)', async () => {
    // "evil.example" resolves (once) to the local server, allowed by the test policy
    const port = new URL(base).port;
    let calls = 0;
    const text = await fetchSpecText(`http://evil.example:${port}/spec.json`, {
      ...allowLocal,
      resolveHost: async () => {
        calls++;
        return [{ address: '127.0.0.1', family: 4 }];
      },
    });
    expect(text).toBe(SPEC);
    expect(calls).toBe(1);
  });

  it('reports unresolvable hosts', async () => {
    await expectHttpError(
      fetchSpecText('http://nope.invalid/', {
        resolveHost: async () => {
          throw new Error('ENOTFOUND');
        },
      }),
      400,
      /Could not resolve/
    );
  });
});

describe('fetchSpecText (local server allowed)', () => {
  it('downloads a schema', async () => {
    expect(await fetchSpecText(`${base}/spec.json`, allowLocal)).toBe(SPEC);
  });

  it('decompresses gzip', async () => {
    expect(await fetchSpecText(`${base}/spec.gz`, allowLocal)).toBe(SPEC);
  });

  it('follows up to 3 redirects', async () => {
    expect(await fetchSpecText(`${base}/redirect?n=3`, allowLocal)).toBe(SPEC);
    await expectHttpError(
      fetchSpecText(`${base}/redirect?n=4`, allowLocal),
      422,
      /Too many redirects/
    );
  });

  it('re-checks every redirect hop', async () => {
    for (const to of [
      'http://169.254.169.254/latest/meta-data/',
      'http://10.0.0.1/',
      'http://[::1]/',
      'http://[::ffff:127.0.0.2]/',
      'http://2130706434/',
    ]) {
      await expectHttpError(
        fetchSpecText(`${base}/redirect-to?to=${encodeURIComponent(to)}`, allowLocal),
        400,
        /private or reserved/
      );
    }
    await expectHttpError(
      fetchSpecText(
        `${base}/redirect-to?to=${encodeURIComponent('http://localhost/')}`,
        allowLocal
      ),
      400,
      /not allowed/
    );
    await expectHttpError(
      fetchSpecText(
        `${base}/redirect-to?to=${encodeURIComponent('file:///etc/passwd')}`,
        allowLocal
      ),
      400,
      /Only http/
    );
  });

  it('enforces the size limit (content-length, streamed and decompressed)', async () => {
    const opts = { ...allowLocal, maxBytes: 1000 };
    await expectHttpError(fetchSpecText(`${base}/big`, opts), 413, /too large/);
    await expectHttpError(fetchSpecText(`${base}/big-chunked`, opts), 413, /too large/);
    await expectHttpError(fetchSpecText(`${base}/gzip-bomb`, opts), 413, /too large/);
  });

  it('times out', async () => {
    await expectHttpError(
      fetchSpecText(`${base}/slow`, { ...allowLocal, timeoutMs: 300 }),
      422,
      /timed out/
    );
  });

  it('reports HTTP errors', async () => {
    await expectHttpError(fetchSpecText(`${base}/404`, allowLocal), 422, /404/);
  });

  it('reports connection errors', async () => {
    await expectHttpError(fetchSpecText('http://127.0.0.1:1/', allowLocal), 422, /ECONNREFUSED/);
  });
});
