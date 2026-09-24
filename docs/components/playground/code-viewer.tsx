'use client';

import { useEffect, useMemo, useState } from 'react';

import { langFromFileName, SHIKI_THEMES } from '@/lib/client/shiki';

/** above these limits the file is shown as plain text (still with line numbers) */
export const HIGHLIGHT_MAX_BYTES = 400_000;
export const HIGHLIGHT_MAX_LINES = 8_000;

const htmlCache = new Map<string, string>();

function cacheKey(name: string, content: string) {
  // cheap content fingerprint: length + a sampled hash
  let hash = 0;
  const step = Math.max(1, Math.floor(content.length / 2000));
  for (let i = 0; i < content.length; i += step) hash = (hash * 31 + content.charCodeAt(i)) | 0;
  return `${name}:${content.length}:${hash}`;
}

function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function plainHtml(content: string) {
  const lines = content.split('\n');
  return `<pre class="shiki plain"><code>${lines
    .map((line) => `<span class="line">${escapeHtml(line)}</span>`)
    .join('\n')}</code></pre>`;
}

export function CodeViewer({ name, content, wrap }: { name: string; content: string; wrap: boolean }) {
  const key = useMemo(() => cacheKey(name, content), [name, content]);
  const lineCount = useMemo(() => {
    let n = 1;
    for (let i = 0; i < content.length; i++) if (content.charCodeAt(i) === 10) n++;
    return n;
  }, [content]);
  const tooBig = content.length > HIGHLIGHT_MAX_BYTES || lineCount > HIGHLIGHT_MAX_LINES;
  const [highlighted, setHighlighted] = useState<{ key: string; html: string } | null>(() => {
    const cached = htmlCache.get(key);
    return cached ? { key, html: cached } : null;
  });

  useEffect(() => {
    if (tooBig) return;
    const cached = htmlCache.get(key);
    if (cached) {
      setHighlighted({ key, html: cached });
      return;
    }
    let cancelled = false;
    (async () => {
      const { getHighlighter } = await import('@/lib/client/shiki');
      const highlighter = await getHighlighter();
      if (cancelled) return;
      const html = highlighter.codeToHtml(content.replace(/\n$/, ''), {
        lang: langFromFileName(name),
        themes: SHIKI_THEMES,
        defaultColor: false,
      });
      htmlCache.set(key, html);
      if (htmlCache.size > 60) htmlCache.delete(htmlCache.keys().next().value as string);
      if (!cancelled) setHighlighted({ key, html });
    })().catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [key, content, name, tooBig]);

  const plain = useMemo(
    () => (tooBig || highlighted?.key !== key ? plainHtml(content.replace(/\n$/, '')) : ''),
    [tooBig, highlighted, key, content]
  );
  const html = !tooBig && highlighted?.key === key ? highlighted.html : plain;

  return (
    <div className="flex h-full min-h-0 flex-col">
      {tooBig && (
        <p className="shrink-0 border-b border-border bg-bg-subtle px-4 py-1.5 text-xs text-fg-muted">
          Large file ({lineCount.toLocaleString()} lines) — syntax highlighting is off to keep things fast.
        </p>
      )}
      <div
        className={`code-lines scrollbar-thin min-h-0 flex-1 overflow-auto ${wrap ? 'wrap' : ''}`}
        style={{ ['--gutter' as string]: `${String(lineCount).length}ch` }}
        data-testid="code-viewer"
        tabIndex={0}
        role="region"
        aria-label={`Contents of ${name}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
