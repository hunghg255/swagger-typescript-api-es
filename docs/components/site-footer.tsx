import Link from 'next/link';

import { GithubIcon, LogoMark, NpmIcon } from './icons';
import { site } from './site-config';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-bg-subtle">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <LogoMark className="size-6 text-fg [--logo-fg:var(--bg)]" />
          <p className="text-sm text-fg-muted">
            <span className="font-medium text-fg">{site.name}</span> · MIT License
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-muted">
          <Link href="/docs" className="hover:text-fg">
            Docs
          </Link>
          <Link href="/usage" className="hover:text-fg">
            Usage
          </Link>
          <Link href="/playground" className="hover:text-fg">
            Playground
          </Link>
          <Link href="/benchmark" className="hover:text-fg">
            Benchmark
          </Link>
          <Link href="/skills" className="hover:text-fg">
            Skills
          </Link>
          <a href={site.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-fg">
            <GithubIcon className="size-4" /> GitHub
          </a>
          <a href={site.npm} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-fg">
            <NpmIcon className="size-4" /> npm
          </a>
          <a href={`${site.repo}/blob/main/LICENSE`} target="_blank" rel="noreferrer" className="hover:text-fg">
            License
          </a>
        </nav>
      </div>
    </footer>
  );
}
