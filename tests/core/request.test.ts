import http from 'node:http';
import type { AddressInfo } from 'node:net';

import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { generateApi } from '../../src';
import { Request } from '../../src/util/request';
import { petSpec } from './fixtures';

const logger = { error: vi.fn(), warn: vi.fn(), log: vi.fn(), debug: vi.fn() };

let server: http.Server;
let baseUrl: string;
const sockets = new Set<any>();

beforeAll(async () => {
  server = http.createServer((req, res) => {
    if (req.url === '/spec.json') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(petSpec));
    } else if (req.url === '/auth') {
      res.writeHead(200);
      res.end(String(req.headers.authorization));
    } else if (req.url === '/slow') {
      // never respond
    } else {
      res.writeHead(404, 'Not Found');
      res.end('nope');
    }
  });
  server.on('connection', (s) => {
    sockets.add(s);
    s.on('close', () => sockets.delete(s));
  });
  await new Promise<void>((r) => server.listen(0, '127.0.0.1', r));
  baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterAll(async () => {
  for (const s of sockets) s.destroy();
  await new Promise((r) => server.close(r));
});

const closedPort = async () => {
  const s = http.createServer();
  await new Promise<void>((r) => s.listen(0, '127.0.0.1', r));
  const { port } = s.address() as AddressInfo;
  await new Promise((r) => s.close(r));
  return port;
};

describe('Request.download', () => {
  it('returns the body of a 200 response', async () => {
    const request = new Request({ requestOptions: null }, logger);
    const body = await request.download({ url: `${baseUrl}/spec.json` });
    expect(JSON.parse(body)).toEqual(petSpec);
  });

  it('sends the authorization token', async () => {
    const request = new Request({ requestOptions: null }, logger);
    expect(await request.download({ url: `${baseUrl}/auth`, authToken: 'Bearer x' })).toBe(
      'Bearer x'
    );
  });

  it('throws with status on non-2xx responses', async () => {
    const request = new Request({ requestOptions: null }, logger);
    await expect(request.download({ url: `${baseUrl}/missing` })).rejects.toThrow(/404 Not Found/);
  });

  it('throws on timeout (configurable via requestOptions.timeout)', async () => {
    const request = new Request({ requestOptions: { timeout: 200 } }, logger);
    const started = Date.now();
    await expect(request.download({ url: `${baseUrl}/slow` })).rejects.toThrow(
      /timed out after 200ms/
    );
    expect(Date.now() - started).toBeLessThan(5000);
  });

  it('throws on connection refused', async () => {
    const port = await closedPort();
    const request = new Request({ requestOptions: null }, logger);
    await expect(request.download({ url: `http://127.0.0.1:${port}/x` })).rejects.toThrow(
      /Failed to fetch .*127\.0\.0\.1/
    );
  });

  it('still works with disableStrictSSL on plain http', async () => {
    const request = new Request({ requestOptions: null }, logger);
    const body = await request.download({ url: `${baseUrl}/spec.json`, disableStrictSSL: true });
    expect(JSON.parse(body).openapi).toBe('3.0.0');
  });
});

describe('Request.download via node-fetch (custom agent / disableStrictSSL)', () => {
  const withAgent = (extra: any = {}) =>
    new Request({ requestOptions: { agent: new http.Agent(), ...extra } }, logger);

  it('returns the body', async () => {
    const body = await withAgent().download({ url: `${baseUrl}/spec.json` });
    expect(JSON.parse(body)).toEqual(petSpec);
  });

  it('throws with status on non-2xx responses', async () => {
    await expect(withAgent().download({ url: `${baseUrl}/missing` })).rejects.toThrow(/404/);
  });

  it('throws on timeout', async () => {
    await expect(withAgent({ timeout: 200 }).download({ url: `${baseUrl}/slow` })).rejects.toThrow(
      /timed out after 200ms/
    );
  });

  it('throws on connection refused', async () => {
    const port = await closedPort();
    await expect(withAgent().download({ url: `http://127.0.0.1:${port}/x` })).rejects.toThrow(
      /Failed to fetch .*ECONNREFUSED/
    );
  });
});

describe('generateApi with url', () => {
  it('generates from a URL', async () => {
    const result: any = await generateApi({
      url: `${baseUrl}/spec.json`,
      output: false,
      silent: true,
    } as any);
    expect(result.files[0].fileContent).toContain('export interface Pet');
  });

  it('fails with the HTTP error instead of "Invalid swagger schema"', async () => {
    await expect(
      generateApi({ url: `${baseUrl}/missing`, output: false, silent: true } as any)
    ).rejects.toThrow(/404/);
  });
});
