import { ClientTabs } from '@/components/client-tabs';
import { CodeBlock } from '@/components/code-block';
import type { NavHeading } from '@/components/docs/docs-nav';

import { SNIPPETS, type SnippetId } from './snippets';

const LANG_LABEL = { ts: 'TypeScript', tsx: 'TSX', bash: 'Terminal' } as const;

/** a verified code example of `snippets.ts` */
export function Snippet({ id }: { id: SnippetId }) {
  const snippet = SNIPPETS[id];
  return (
    <CodeBlock
      code={snippet.code}
      lang={snippet.lang}
      title={'title' in snippet && snippet.title ? snippet.title : LANG_LABEL[snippet.lang]}
    />
  );
}

/** fetch / axios variants of an example */
export function SnippetTabs({ fetch, axios }: { fetch: SnippetId; axios: SnippetId }) {
  return <ClientTabs fetch={<Snippet id={fetch} />} axios={<Snippet id={axios} />} />;
}

export function createHeadings<const T extends Record<string, { text: string; depth: 2 | 3 }>>(map: T) {
  const list: NavHeading[] = Object.entries(map).map(([id, { text, depth }]) => ({ id, text, depth }));

  function Heading({ id, children }: { id: keyof T & string; children?: React.ReactNode }) {
    const { text, depth } = map[id];
    const Tag = depth === 2 ? 'h2' : 'h3';
    return (
      <Tag id={id}>
        <a href={`#${id}`} className="heading-anchor">
          {children ?? text}
          <span className="anchor-hash" aria-hidden>
            #
          </span>
        </a>
      </Tag>
    );
  }

  return { list, Heading };
}

/** highlighted aside (uses the docs blockquote style) */
export function Note({ title = 'Note', children }: { title?: string; children: React.ReactNode }) {
  return (
    <blockquote>
      <p>
        <strong>{title}.</strong> {children}
      </p>
    </blockquote>
  );
}
