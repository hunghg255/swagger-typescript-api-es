import { ArrowRight, FlaskConical } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MarkdownAsync } from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { DocsMobileNav, DocsSidebar, DocsToc } from '@/components/docs/docs-nav';
import { site } from '@/components/site-config';
import { SiteFooter } from '@/components/site-footer';

import { markdownComponents } from './_lib/markdown-components';
import { loadReadme } from './_lib/readme';
import { type DocHeading, rehypeCollectHeadings, rehypeShiki } from './_lib/rehype';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Documentation',
  description: `Install, configure and use ${site.name}: CLI flags, every option, hooks, templates and the generated client.`,
  openGraph: { title: `Documentation · ${site.name}` },
};

export default async function DocsPage() {
  const { intro, body } = loadReadme();
  const headings: DocHeading[] = [];
  const content = await MarkdownAsync({
    children: body,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeCollectHeadings, { headings }], rehypeShiki],
    components: markdownComponents,
  });
  const introContent = await MarkdownAsync({ children: intro, components: markdownComponents });

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1440px] px-4 sm:px-6">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-64 shrink-0 border-r border-border lg:block">
          <DocsSidebar headings={headings} />
        </aside>

        <main id="main" className="min-w-0 flex-1 lg:px-10 xl:px-14">
          <DocsMobileNav headings={headings} />
          <div className="mx-auto max-w-3xl pt-10 pb-24 lg:pt-12">
            <header className="mb-12 border-b border-border pb-10">
              <p className="text-sm font-semibold text-accent">Documentation</p>
              <h1 className="mt-2 text-[1.7rem] font-semibold tracking-tight break-words text-fg sm:text-4xl">{site.name}</h1>
              <div className="prose-docs mt-4 text-[17px]">{introContent}</div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/playground"
                  className="inline-flex h-9 items-center gap-2 rounded-lg bg-fg px-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
                >
                  <FlaskConical className="size-4" aria-hidden /> Try it in the playground
                </Link>
                <a
                  href={site.npm}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3.5 text-sm font-medium text-fg transition-colors hover:bg-muted"
                >
                  View on npm <ArrowRight className="size-3.5" aria-hidden />
                </a>
              </div>
            </header>
            <article className="prose-docs" data-testid="docs-content">
              {content}
            </article>
          </div>
        </main>

        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-56 shrink-0 xl:block">
          <DocsToc headings={headings} />
        </aside>
      </div>
      <SiteFooter />
    </>
  );
}
