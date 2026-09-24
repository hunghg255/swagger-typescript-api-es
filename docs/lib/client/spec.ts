export type SpecFormat = 'json' | 'yaml';

/** JSON when the first non-blank character opens an object/array, YAML otherwise */
export function detectFormat(text: string): SpecFormat {
  const first = text.trimStart()[0];
  return first === '{' || first === '[' ? 'json' : 'yaml';
}

export function byteSize(text: string): number {
  return new TextEncoder().encode(text).length;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/** best-effort `info.title` (used to name the zip), without a full YAML parse */
export function extractTitle(text: string): string | null {
  try {
    if (detectFormat(text) === 'json') {
      const parsed = JSON.parse(text) as { info?: { title?: unknown } };
      return typeof parsed?.info?.title === 'string' ? parsed.info.title : null;
    }
    const match = /^info:\s*\n(?:[ \t]+.*\n)*?[ \t]+title:[ \t]*(.+)$/m.exec(text);
    if (!match) return null;
    return match[1].trim().replace(/^['"]|['"]$/g, '') || null;
  } catch {
    return null;
  }
}

export function slugify(value: string, fallback = 'api'): string {
  const slug = value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return slug || fallback;
}

/** JSON syntax check for the editor status bar (YAML is validated by the server) */
export function jsonError(text: string): string | null {
  try {
    JSON.parse(text);
    return null;
  } catch (error) {
    return (error as Error).message;
  }
}
