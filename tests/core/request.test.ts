import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import net, { type AddressInfo } from 'node:net';
import os from 'node:os';
import path from 'node:path';

import { Agent } from 'undici';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { generateApi } from '../../src';
import { Request } from '../../src/util/request';
import { petSpec } from './fixtures';

const hasOpenssl = (() => {
  try {
    execFileSync('openssl', ['version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
})();

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

/** minimal CONNECT proxy, records every tunnelled target in `tunnels` */
const createConnectProxy = async (tunnels: string[]) => {
  const proxy = http.createServer();
  proxy.on('connect', (req, clientSocket: any, head) => {
    tunnels.push(String(req.url));
    const [host, port] = String(req.url).split(':');
    const upstream = net.connect(Number(port), host, () => {
      clientSocket.write('HTTP/1.1 200 Connection Established\r\n\r\n');
      upstream.write(head);
      upstream.pipe(clientSocket);
      clientSocket.pipe(upstream);
    });
    upstream.on('error', () => clientSocket.destroy());
    clientSocket.on('error', () => upstream.destroy());
  });
  await new Promise<void>((r) => proxy.listen(0, '127.0.0.1', r));
  return { proxy, proxyUrl: `http://127.0.0.1:${(proxy.address() as AddressInfo).port}` };
};

describe('Request.download dispatcher (proxy / TLS)', () => {
  let proxy: http.Server;
  let proxyUrl: string;
  const tunnels: string[] = [];

  beforeAll(async () => {
    ({ proxy, proxyUrl } = await createConnectProxy(tunnels));
  });

  afterAll(async () => {
    proxy.closeAllConnections?.();
    await new Promise((r) => proxy.close(r));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    tunnels.length = 0;
  });

  const stubProxyEnv = () => {
    for (const name of ['HTTP_PROXY', 'http_proxy', 'HTTPS_PROXY', 'https_proxy']) {
      vi.stubEnv(name, proxyUrl);
    }
    vi.stubEnv('NO_PROXY', '');
    vi.stubEnv('no_proxy', '');
  };

  it('uses HTTP(S)_PROXY env variables by default', async () => {
    stubProxyEnv();
    const request = new Request({ requestOptions: null }, logger);
    const body = await request.download({ url: `${baseUrl}/spec.json` });
    expect(JSON.parse(body)).toEqual(petSpec);
    expect(tunnels).toEqual([baseUrl.replace('http://', '')]);
  });

  it('disableProxy connects directly even if proxy env variables are set', async () => {
    stubProxyEnv();
    const request = new Request({ requestOptions: null }, logger);
    const body = await request.download({ url: `${baseUrl}/spec.json`, disableProxy: true });
    expect(JSON.parse(body)).toEqual(petSpec);
    expect(tunnels).toEqual([]);
  });

  it('uses a custom undici dispatcher from requestOptions', async () => {
    stubProxyEnv();
    const dispatcher = new Agent();
    const dispatch = vi.spyOn(dispatcher, 'dispatch');
    const request = new Request({ requestOptions: { dispatcher } }, logger);
    const body = await request.download({ url: `${baseUrl}/spec.json` });
    expect(JSON.parse(body)).toEqual(petSpec);
    expect(dispatch).toHaveBeenCalled();
    // the custom dispatcher replaces the default (proxy) one
    expect(tunnels).toEqual([]);
    await dispatcher.close();
  });

  it('warns that node-fetch style "agent" is not supported', async () => {
    const warn = vi.fn();
    const request = new Request(
      { requestOptions: { agent: new http.Agent() } },
      { ...logger, warn }
    );
    const body = await request.download({ url: `${baseUrl}/spec.json` });
    expect(JSON.parse(body)).toEqual(petSpec);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('dispatcher'));
  });
});

describe.skipIf(!hasOpenssl)('Request.download over https with a self-signed certificate', () => {
  let server: https.Server;
  let httpsUrl: string;

  beforeAll(async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sta-tls-'));
    execFileSync(
      'openssl',
      [
        'req',
        '-x509',
        '-newkey',
        'rsa:2048',
        '-nodes',
        '-days',
        '1',
        '-subj',
        '/CN=localhost',
        '-keyout',
        path.join(dir, 'key.pem'),
        '-out',
        path.join(dir, 'cert.pem'),
      ],
      { stdio: 'ignore' }
    );
    server = https.createServer(
      {
        key: fs.readFileSync(path.join(dir, 'key.pem')),
        cert: fs.readFileSync(path.join(dir, 'cert.pem')),
      },
      (_req, res) => {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(petSpec));
      }
    );
    await new Promise<void>((r) => server.listen(0, '127.0.0.1', r));
    httpsUrl = `https://127.0.0.1:${(server.address() as AddressInfo).port}/spec.json`;
  });

  afterAll(async () => {
    server.closeAllConnections?.();
    await new Promise((r) => server.close(r));
  });

  it('rejects the certificate by default', async () => {
    const request = new Request({ requestOptions: null }, logger);
    await expect(request.download({ url: httpsUrl })).rejects.toThrow(/Failed to fetch/);
  });

  it('accepts it with disableStrictSSL', async () => {
    const request = new Request({ requestOptions: null }, logger);
    const body = await request.download({ url: httpsUrl, disableStrictSSL: true });
    expect(JSON.parse(body)).toEqual(petSpec);
  });

  it('accepts it with disableStrictSSL through a proxy', async () => {
    const tunnels: string[] = [];
    const { proxy, proxyUrl } = await createConnectProxy(tunnels);
    try {
      vi.stubEnv('HTTPS_PROXY', proxyUrl);
      vi.stubEnv('https_proxy', proxyUrl);
      vi.stubEnv('NO_PROXY', '');
      vi.stubEnv('no_proxy', '');
      const request = new Request({ requestOptions: null }, logger);
      const body = await request.download({ url: httpsUrl, disableStrictSSL: true });
      expect(JSON.parse(body)).toEqual(petSpec);
      expect(tunnels).toHaveLength(1);
    } finally {
      vi.unstubAllEnvs();
      proxy.closeAllConnections?.();
      await new Promise((r) => proxy.close(r));
    }
  });

  it('accepts it with disableStrictSSL + disableProxy', async () => {
    const request = new Request({ requestOptions: null }, logger);
    const body = await request.download({
      url: httpsUrl,
      disableStrictSSL: true,
      disableProxy: true,
    });
    expect(JSON.parse(body)).toEqual(petSpec);
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
