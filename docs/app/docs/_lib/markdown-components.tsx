import type { Components } from 'react-markdown';

import { CopyButton } from '@/components/copy-button';
import { site } from '@/components/site-config';

const LANG_LABEL: Record<string, string> = {
  ts: 'TypeScript',
  typescript: 'TypeScript',
  js: 'JavaScript',
  javascript: 'JavaScript',
  json: 'JSON',
  yaml: 'YAML',
  yml: 'YAML',
  bash: 'Terminal',
  sh: 'Terminal',
  diff: 'Diff',
  text: 'Text',
};

function resolveHref(href: string | undefined): { href?: string; external: boolean } {
  if (!href) return { href, external: false };
  if (href.startsWith('#') || href.startsWith('/')) return { href, external: false };
  if (/^[a-z]+:/i.test(href)) return { href, external: /^https?:/i.test(href) };
  // relative repository link (e.g. `./skills`, `LICENSE`)
  return { href: `${site.repo}/blob/main/${href.replace(/^\.\//, '')}`, external: true };
}

function Heading({ as: Tag, id, children }: { as: 'h2' | 'h3' | 'h4'; id?: string; children?: React.ReactNode }) {
  return (
    <Tag id={id}>
      {id ? (
        <a href={`#${id}`} className="heading-anchor">
          {children}
          <span className="anchor-hash" aria-hidden>
            #
          </span>
        </a>
      ) : (
        children
      )}
    </Tag>
  );
}

export const markdownComponents: Components = {
  h1: ({ id, children }) => <Heading as="h2" id={id}>{children}</Heading>,
  h2: ({ id, children }) => <Heading as="h2" id={id}>{children}</Heading>,
  h3: ({ id, children }) => <Heading as="h3" id={id}>{children}</Heading>,
  h4: ({ id, children }) => <Heading as="h4" id={id}>{children}</Heading>,
  a: ({ href, children, node: _node, ...rest }) => {
    const resolved = resolveHref(href);
    return (
      <a
        {...rest}
        href={resolved.href}
        {...(resolved.external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </a>
    );
  },
  table: ({ children, node: _node, ...rest }) => (
    <div className="scrollbar-thin my-6 overflow-x-auto rounded-xl border border-border" role="region" aria-label="Table" tabIndex={0}>
      <table {...rest}>{children}</table>
    </div>
  ),
  pre: ({ children, node: _node, className, style: _style, tabIndex: _tabIndex, ...rest }) => {
    const props = rest as Record<string, unknown>;
    const code = typeof props['data-code'] === 'string' ? (props['data-code'] as string) : '';
    const lang = typeof props['data-lang'] === 'string' ? (props['data-lang'] as string) : 'text';
    return (
      <div className="group relative my-5 overflow-hidden rounded-xl border border-border bg-code">
        <div className="flex h-9 items-center justify-between border-b border-border bg-bg-subtle pr-1 pl-4">
          <span className="text-xs font-medium text-fg-subtle">{LANG_LABEL[lang] ?? lang}</span>
          <CopyButton text={code} />
        </div>
        <div className="code-surface scrollbar-thin">
          <pre className={className}>{children}</pre>
        </div>
      </div>
    );
  },
};
