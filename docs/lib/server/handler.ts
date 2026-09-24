import { type GenerateFailure, type GenerateSuccess, MAX_SPEC_BYTES } from '../api-types';
import { HttpError, badRequest } from './errors';
import { type FetchSpecOptions, fetchSpecText } from './fetch-spec';
import { generateFiles } from './generate';
import { parseSpecText } from './parse-spec';
import { type RateLimiter, createRateLimiter, getClientIp } from './rate-limit';
import { validateRequest } from './validate';

/** raw request body limit: the schema text plus JSON escaping and the options */
export const MAX_BODY_BYTES = MAX_SPEC_BYTES + 1024 * 1024;
/** Vercel rejects function responses over 4.5 MB */
export const MAX_RESPONSE_BYTES = 4.4 * 1024 * 1024;

export interface GenerateHandlerDeps {
  rateLimiter?: RateLimiter;
  fetchOptions?: FetchSpecOptions;
  generationTimeoutMs?: number;
}

const json = (body: GenerateSuccess | GenerateFailure, status: number, headers?: HeadersInit) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      ...headers,
    },
  });

const failure = (status: number, error: string, headers?: HeadersInit) =>
  json({ ok: false, error }, status, headers);

async function readBody(request: Request): Promise<unknown> {
  const declared = Number(request.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    throw new HttpError(413, 'The request is too large.');
  }
  if (!request.body) throw badRequest('The request body must be a JSON object.');

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel().catch(() => {});
      throw new HttpError(413, 'The request is too large.');
    }
    chunks.push(value);
  }
  const text = Buffer.concat(chunks).toString('utf8');
  try {
    return JSON.parse(text);
  } catch {
    throw badRequest('The request body must be valid JSON.');
  }
}

/** requests per minute and per IP, `GENERATE_RATE_LIMIT` env (default 30, `0` disables it) */
export function rateLimitFromEnv(value = process.env.GENERATE_RATE_LIMIT): number {
  const parsed = Number(value);
  return value !== undefined && value !== '' && Number.isInteger(parsed) && parsed >= 0
    ? parsed
    : 30;
}

export function createGenerateHandler(deps: GenerateHandlerDeps = {}) {
  const limit = rateLimitFromEnv();
  const rateLimiter =
    deps.rateLimiter ??
    createRateLimiter({ limit: limit === 0 ? Number.POSITIVE_INFINITY : limit });

  return async function POST(request: Request): Promise<Response> {
    const started = performance.now();
    try {
      const limit = rateLimiter.check(getClientIp(request.headers));
      if (!limit.allowed) {
        return failure(429, 'Too many requests, please wait a minute and try again.', {
          'retry-after': String(limit.retryAfter),
        });
      }

      const contentType = request.headers.get('content-type') ?? '';
      if (!/^application\/json\b/i.test(contentType)) {
        throw new HttpError(415, 'Content-Type must be application/json.');
      }

      const input = validateRequest(await readBody(request));
      const specText =
        input.spec !== undefined ? input.spec : await fetchSpecText(input.url, deps.fetchOptions);
      const spec = parseSpecText(specText);
      const files = await generateFiles(spec, input.options, deps.generationTimeoutMs);

      const body: GenerateSuccess = {
        ok: true,
        files,
        durationMs: Math.round(performance.now() - started),
      };
      const payload = JSON.stringify(body);
      if (Buffer.byteLength(payload, 'utf8') > MAX_RESPONSE_BYTES) {
        return failure(
          413,
          'The generated code is too large to be returned by the playground. Try a smaller schema or run the CLI locally.'
        );
      }
      return new Response(payload, {
        status: 200,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store',
          'x-content-type-options': 'nosniff',
        },
      });
    } catch (error) {
      if (error instanceof HttpError) return failure(error.status, error.message);
      console.error('[api/generate] unexpected error', error);
      return failure(500, 'Unexpected server error.');
    }
  };
}
