/**
 * SSRF-safe download of a schema by URL.
 *
 * - only `http:` / `https:`, no credentials in the URL
 * - the host is resolved ONCE, every resolved address must be public, and the socket connects to
 *   that exact address (pinned `lookup`), so a DNS rebinding between check and connect is not
 *   possible (TLS still verifies the certificate against the original host name)
 * - redirects are followed manually (max `maxRedirects`), re-checking every hop
 * - overall timeout and a hard limit of the (decompressed) body size
 * - environment proxies are never used (`agent: false`)
 */

import { lookup as dnsLookup } from 'node:dns/promises';
import http from 'node:http';
import https from 'node:https';
import type { LookupFunction } from 'node:net';
import { isIP } from 'node:net';
import type { Readable } from 'node:stream';
import zlib from 'node:zlib';

import { MAX_SPEC_BYTES } from '../api-types';
import { HttpError, badRequest } from './errors';
import { isBlockedHostname, isPublicAddress } from './ip';

export interface ResolvedAddress {
  address: string;
  family: 4 | 6;
}

export interface FetchSpecOptions {
  /** overall timeout for all hops, ms (default 10s) */
  timeoutMs?: number;
  /** max body size in bytes (default `MAX_SPEC_BYTES`) */
  maxBytes?: number;
  /** max number of redirects to follow (default 3) */
  maxRedirects?: number;
  /** IP check, override in tests only (default `isPublicAddress`) */
  isAddressAllowed?: (address: string) => boolean;
  /** host name check, override in tests only (default: blocks `localhost`, `*.internal`, ...) */
  isHostnameAllowed?: (hostname: string) => boolean;
  /** DNS resolution, override in tests only */
  resolveHost?: (hostname: string) => Promise<ResolvedAddress[]>;
}

const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

const defaultResolveHost = async (hostname: string): Promise<ResolvedAddress[]> => {
  const results = await dnsLookup(hostname, { all: true, verbatim: true });
  return results.map(({ address, family }) => ({ address, family: family === 6 ? 6 : 4 }));
};

/** parses and statically checks the URL (scheme, credentials, blocked host names) */
export function parsePublicUrl(
  input: string,
  isHostnameAllowed: (hostname: string) => boolean = (h) => !isBlockedHostname(h)
): URL {
  let url: URL;
  try {
    url = new URL(input);
  } catch {
    throw badRequest('Invalid URL.');
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw badRequest('Only http:// and https:// URLs are supported.');
  }
  if (url.username || url.password) {
    throw badRequest('URLs with credentials are not allowed.');
  }
  // WHATWG URL already normalizes `2130706433`, `0x7f.1`, `0177.0.0.1` ... to dotted IPv4
  const host = url.hostname.replace(/^\[|\]$/g, '');
  if (!isIP(host) && !isHostnameAllowed(url.hostname)) {
    throw badRequest('This host is not allowed.');
  }
  return url;
}

/** resolves the host of the URL and returns the address to connect to (all must be allowed) */
export async function resolvePublicAddress(
  url: URL,
  {
    isAddressAllowed = isPublicAddress,
    resolveHost = defaultResolveHost,
  }: Pick<FetchSpecOptions, 'isAddressAllowed' | 'resolveHost'> = {}
): Promise<ResolvedAddress> {
  const host = url.hostname.replace(/^\[|\]$/g, '');
  const literal = isIP(host);
  let addresses: ResolvedAddress[];
  if (literal) {
    addresses = [{ address: host, family: literal === 6 ? 6 : 4 }];
  } else {
    try {
      addresses = await resolveHost(host);
    } catch {
      throw badRequest(`Could not resolve host "${host}".`);
    }
  }
  if (addresses.length === 0) throw badRequest(`Could not resolve host "${host}".`);
  // reject when ANY address is private: a host mixing public and private records is suspicious
  if (addresses.some(({ address }) => !isAddressAllowed(address))) {
    throw badRequest(
      'The URL points to a private or reserved network address, which is not allowed.'
    );
  }
  return addresses[0];
}

interface HopResult {
  status: number;
  location?: string;
  body?: string;
}

function requestOnce(
  url: URL,
  target: ResolvedAddress,
  maxBytes: number,
  signal: AbortSignal
): Promise<HopResult> {
  return new Promise((resolve, reject) => {
    const pinnedLookup: LookupFunction = (_hostname, options, callback) => {
      if (options?.all) {
        (callback as unknown as (e: null, a: ResolvedAddress[]) => void)(null, [target]);
      } else {
        callback(null, target.address, target.family);
      }
    };

    const client = url.protocol === 'https:' ? https : http;
    const req = client.request(
      {
        protocol: url.protocol,
        hostname: url.hostname.replace(/^\[|\]$/g, ''),
        port: url.port || undefined,
        path: `${url.pathname}${url.search}`,
        method: 'GET',
        agent: false,
        lookup: pinnedLookup,
        signal,
        headers: {
          accept: 'application/json, application/yaml, text/yaml, text/plain, */*;q=0.5',
          'accept-encoding': 'gzip, deflate, br',
          'user-agent': 'swagger-typescript-api-es-playground',
        },
      },
      (res) => {
        const status = res.statusCode ?? 0;
        if (REDIRECT_STATUSES.has(status)) {
          res.resume();
          resolve({ status, location: res.headers.location });
          return;
        }
        if (status < 200 || status >= 300) {
          res.resume();
          resolve({ status });
          return;
        }

        const declared = Number(res.headers['content-length']);
        const encoding = String(res.headers['content-encoding'] ?? '').toLowerCase();
        if (!encoding && Number.isFinite(declared) && declared > maxBytes) {
          res.destroy();
          reject(tooLarge(maxBytes));
          return;
        }

        let stream: Readable = res;
        if (encoding === 'gzip' || encoding === 'x-gzip') stream = res.pipe(zlib.createGunzip());
        else if (encoding === 'deflate') stream = res.pipe(zlib.createInflate());
        else if (encoding === 'br') stream = res.pipe(zlib.createBrotliDecompress());
        else if (encoding && encoding !== 'identity') {
          res.destroy();
          reject(new HttpError(422, `Unsupported content encoding "${encoding.slice(0, 20)}".`));
          return;
        }

        const chunks: Buffer[] = [];
        let size = 0;
        stream.on('data', (chunk: Buffer) => {
          size += chunk.length;
          if (size > maxBytes) {
            res.destroy();
            stream.destroy();
            reject(tooLarge(maxBytes));
            return;
          }
          chunks.push(chunk);
        });
        let ended = false;
        stream.on('end', () => {
          ended = true;
          resolve({ status, body: Buffer.concat(chunks).toString('utf8') });
        });
        stream.on('error', (error) => reject(error));
        res.on('error', (error) => reject(error));
        stream.on('close', () => {
          if (!ended) reject(new Error('connection closed before the end of the response'));
        });
      }
    );
    req.on('error', (error) => reject(error));
    req.end();
  });
}

const tooLarge = (maxBytes: number) =>
  new HttpError(413, `The schema is too large (max ${Math.round(maxBytes / 1024 / 1024)} MB).`);

/** downloads the schema text from a public URL */
export async function fetchSpecText(
  input: string,
  options: FetchSpecOptions = {}
): Promise<string> {
  const {
    timeoutMs = 10_000,
    maxBytes = MAX_SPEC_BYTES,
    maxRedirects = 3,
    isAddressAllowed,
    isHostnameAllowed,
    resolveHost,
  } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let url = parsePublicUrl(input, isHostnameAllowed);
    for (let hop = 0; ; hop++) {
      const target = await resolvePublicAddress(url, { isAddressAllowed, resolveHost });
      if (controller.signal.aborted) throw timeoutError(timeoutMs);

      let result: HopResult;
      try {
        result = await requestOnce(url, target, maxBytes, controller.signal);
      } catch (error) {
        if (error instanceof HttpError) throw error;
        if (controller.signal.aborted) throw timeoutError(timeoutMs);
        const code = (error as NodeJS.ErrnoException)?.code;
        throw new HttpError(
          422,
          `Failed to download the schema${code ? ` (${code})` : ''}: ${(error as Error)?.message ?? 'network error'}`.slice(
            0,
            300
          )
        );
      }

      if (result.location !== undefined || REDIRECT_STATUSES.has(result.status)) {
        if (!result.location) {
          throw new HttpError(
            422,
            `The server answered ${result.status} without a Location header.`
          );
        }
        if (hop >= maxRedirects) {
          throw new HttpError(422, `Too many redirects (max ${maxRedirects}).`);
        }
        let next: string;
        try {
          next = new URL(result.location, url).toString();
        } catch {
          throw new HttpError(422, 'The server redirected to an invalid URL.');
        }
        url = parsePublicUrl(next, isHostnameAllowed);
        continue;
      }

      if (result.status < 200 || result.status >= 300 || result.body === undefined) {
        throw new HttpError(
          422,
          `Failed to download the schema: the server answered ${result.status}.`
        );
      }
      return result.body;
    }
  } finally {
    clearTimeout(timer);
  }
}

const timeoutError = (timeoutMs: number) =>
  new HttpError(422, `Downloading the schema timed out after ${Math.round(timeoutMs / 1000)}s.`);
