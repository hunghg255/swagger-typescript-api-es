/**
 * Minimal fixed-window in-memory rate limiter.
 *
 * On Vercel every function instance has its own memory (and instances come and go), so this only
 * slows down a single noisy client hitting a warm instance. The real protection is the Vercel
 * Firewall (rate limiting rules / attack challenge mode) configured on the project.
 */

export interface RateLimiterOptions {
  /** max requests per window (default 30) */
  limit?: number;
  /** window size in ms (default 60s) */
  windowMs?: number;
  /** max tracked clients, the map is pruned beyond that (default 10 000) */
  maxEntries?: number;
  now?: () => number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  /** seconds until the window resets */
  retryAfter: number;
}

export function createRateLimiter({
  limit = 30,
  windowMs = 60_000,
  maxEntries = 10_000,
  now = Date.now,
}: RateLimiterOptions = {}) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  const prune = (time: number) => {
    for (const [key, entry] of hits) {
      if (entry.resetAt <= time) hits.delete(key);
    }
    // still too many (a flood of distinct keys): drop the oldest entries
    while (hits.size >= maxEntries) {
      const oldest = hits.keys().next().value;
      if (oldest === undefined) break;
      hits.delete(oldest);
    }
  };

  return {
    check(key: string): RateLimitResult {
      const time = now();
      let entry = hits.get(key);
      if (!entry || entry.resetAt <= time) {
        if (!entry && hits.size >= maxEntries) prune(time);
        entry = { count: 0, resetAt: time + windowMs };
        hits.delete(key);
        hits.set(key, entry);
      }
      entry.count++;
      return {
        allowed: entry.count <= limit,
        remaining: Math.max(0, limit - entry.count),
        retryAfter: Math.max(1, Math.ceil((entry.resetAt - time) / 1000)),
      };
    },
    reset() {
      hits.clear();
    },
  };
}

export type RateLimiter = ReturnType<typeof createRateLimiter>;

/** client IP as seen by Vercel (`x-real-ip`, then the first `x-forwarded-for` entry) */
export function getClientIp(headers: Headers): string {
  const realIp = headers.get('x-real-ip')?.trim();
  if (realIp) return realIp.slice(0, 64);
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (forwarded) return forwarded.slice(0, 64);
  return 'unknown';
}
