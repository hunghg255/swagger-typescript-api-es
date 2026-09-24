import http from 'node:http';
import type { AddressInfo } from 'node:net';

export interface RecordedRequest {
  method: string;
  /** raw request url (path + query string) exactly as received */
  url: string;
  path: string;
  /** query params; repeated keys are collected into arrays */
  query: Record<string, string | string[]>;
  rawQuery: string;
  headers: http.IncomingHttpHeaders;
  contentType: string | undefined;
  rawBody: Buffer;
  /** body parsed according to its content type (json / urlencoded / multipart / text) */
  body: unknown;
  /** set when the client aborted the request before the response was sent */
  aborted: boolean;
}

export interface MultipartField {
  kind: 'field' | 'file';
  value: string;
  name?: string;
  type?: string;
}

const collect = (entries: Iterable<[string, string]>) => {
  const result: Record<string, string | string[]> = {};
  for (const [key, value] of entries) {
    const existing = result[key];
    if (existing === undefined) result[key] = value;
    else result[key] = Array.isArray(existing) ? [...existing, value] : [existing, value];
  }
  return result;
};

const parseBody = async (raw: Buffer, contentType = ''): Promise<unknown> => {
  if (!raw.length) return undefined;
  if (contentType.includes('json')) return JSON.parse(raw.toString('utf8'));
  if (contentType.includes('application/x-www-form-urlencoded')) {
    return collect(new URLSearchParams(raw.toString('utf8')));
  }
  if (contentType.includes('multipart/form-data')) {
    const form = await new Response(new Uint8Array(raw), {
      headers: { 'content-type': contentType },
    }).formData();
    const result: Record<string, MultipartField | MultipartField[]> = {};
    for (const [key, value] of form) {
      const field: MultipartField =
        typeof value === 'string'
          ? { kind: 'field', value }
          : { kind: 'file', value: await value.text(), name: value.name, type: value.type };
      const existing = result[key];
      if (existing === undefined) result[key] = field;
      else result[key] = Array.isArray(existing) ? [...existing, field] : [existing, field];
    }
    return result;
  }
  return raw.toString('utf8');
};

const sendJson = (res: http.ServerResponse, status: number, payload: unknown) => {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify(payload));
};

/**
 * Local HTTP server used by the runtime client tests. It records every request
 * and answers with a JSON echo of it, except for a few special routes:
 *
 * - `DELETE /pets/*`            -> 204 without body
 * - `GET /status/slow?delay=ms` -> JSON echo after `delay` ms (default 2000)
 * - `GET /status/{code}`        -> responds with `code` (204 = empty, >= 400 = `{ code, message }`)
 * - `GET /downloads/image`      -> image/png bytes
 * - `GET /downloads/binary`     -> application/octet-stream bytes
 * - `GET /downloads/text`       -> text/plain
 * - `POST /pets`                -> 201 JSON echo
 */
export const startServer = async () => {
  const requests: RecordedRequest[] = [];

  const server = http.createServer(async (req, res) => {
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(chunk as Buffer);
    const rawBody = Buffer.concat(chunks);
    const url = new URL(req.url ?? '/', 'http://localhost');
    const contentType = req.headers['content-type'];

    const record: RecordedRequest = {
      method: req.method ?? 'GET',
      url: req.url ?? '/',
      path: url.pathname,
      query: collect(url.searchParams),
      rawQuery: url.search.replace(/^\?/, ''),
      headers: req.headers,
      contentType,
      rawBody,
      body: await parseBody(rawBody, contentType),
      aborted: false,
    };
    requests.push(record);

    const echo = {
      method: record.method,
      path: record.path,
      query: record.query,
      body: record.body,
    };

    const { pathname } = url;

    if (pathname === '/status/slow') {
      const delay = Number(url.searchParams.get('delay') ?? 2000);
      const timer = setTimeout(() => sendJson(res, 200, echo), delay);
      res.on('close', () => {
        if (!res.writableFinished) {
          record.aborted = true;
          clearTimeout(timer);
        }
      });
      return;
    }

    const statusMatch = /^\/status\/(\d+)$/.exec(pathname);
    if (statusMatch) {
      const code = Number(statusMatch[1]);
      if (code === 204 || code === 304) {
        res.writeHead(code);
        res.end();
        return;
      }
      if (code >= 400) {
        sendJson(res, code, { code, message: `status ${code}` });
        return;
      }
      sendJson(res, code, echo);
      return;
    }

    if (record.method === 'DELETE' && pathname.startsWith('/pets/')) {
      res.writeHead(204);
      res.end();
      return;
    }

    if (pathname === '/downloads/image') {
      res.writeHead(200, { 'content-type': 'image/png' });
      res.end(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
      return;
    }
    if (pathname === '/downloads/binary') {
      res.writeHead(200, { 'content-type': 'application/octet-stream' });
      res.end(Buffer.from([0, 1, 2, 3, 250, 251, 252, 253]));
      return;
    }
    if (pathname === '/downloads/text') {
      res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('hello text');
      return;
    }

    sendJson(res, record.method === 'POST' && pathname === '/pets' ? 201 : 200, echo);
  });

  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address() as AddressInfo;

  return {
    url: `http://127.0.0.1:${port}`,
    requests,
    last: () => {
      const request = requests.at(-1);
      if (!request) throw new Error('no request recorded');
      return request;
    },
    reset: () => {
      requests.length = 0;
    },
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.closeAllConnections();
        server.close((error) => (error ? reject(error) : resolve()));
      }),
  };
};

export type TestServer = Awaited<ReturnType<typeof startServer>>;
