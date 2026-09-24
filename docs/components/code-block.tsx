import { highlightToHtml } from '@/lib/client/shiki';

import { CopyButton } from './copy-button';

/** Server component: shiki-highlighted code with dual light/dark themes. */
export async function CodeBlock({
  code,
  lang,
  title,
  className = '',
}: {
  code: string;
  lang?: string;
  title?: string;
  className?: string;
}) {
  const trimmed = code.replace(/\n$/, '');
  const html = await highlightToHtml(trimmed, lang);
  return (
    <div className={`group relative overflow-hidden rounded-xl border border-border bg-code ${className}`}>
      {title ? (
        <div className="flex h-10 items-center justify-between border-b border-border bg-bg-subtle pr-1.5 pl-4">
          <span className="truncate font-mono text-xs text-fg-muted">{title}</span>
          <CopyButton text={trimmed} />
        </div>
      ) : (
        <CopyButton
          text={trimmed}
          className="absolute top-2 right-2 z-10 bg-code opacity-0 group-hover:opacity-100 focus-visible:opacity-100 max-md:opacity-100"
        />
      )}
      <div className="code-surface scrollbar-thin" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
