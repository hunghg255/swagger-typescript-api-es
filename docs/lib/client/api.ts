import type { GenerateRequest, GenerateResponse } from '../api-types';

export const GENERATE_ENDPOINT = '/api/generate';

/**
 * Calls `POST /api/generate`. Never throws for HTTP / network errors: every
 * failure is turned into `{ ok: false, error }` with a user facing message.
 * Aborts are re-thrown so callers can ignore superseded requests.
 */
export async function generate(request: GenerateRequest, signal?: AbortSignal): Promise<GenerateResponse> {
  let response: Response;
  try {
    response = await fetch(GENERATE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal,
    });
  } catch (error) {
    if ((error as Error)?.name === 'AbortError') throw error;
    return { ok: false, error: 'Could not reach the generator. Check your connection and try again.' };
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch (error) {
    if ((error as Error)?.name === 'AbortError') throw error;
    return {
      ok: false,
      error:
        response.status === 413
          ? 'The schema is too large for the playground.'
          : `The generator returned an unexpected response (HTTP ${response.status}).`,
    };
  }

  if (data && typeof data === 'object' && 'ok' in data) {
    const result = data as GenerateResponse;
    if (result.ok && Array.isArray(result.files)) return result;
    if (!result.ok) return { ok: false, error: result.error || `Generation failed (HTTP ${response.status}).` };
  }
  return { ok: false, error: `The generator returned an unexpected response (HTTP ${response.status}).` };
}
