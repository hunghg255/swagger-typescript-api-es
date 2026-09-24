'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { GithubIcon, LogoMark } from './icons';
import { site } from './site-config';
import { ThemeToggle } from './theme';

const NAV = [
  { href: '/docs', label: 'Docs' },
  { href: '/playground', label: 'Playground' },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-2 px-4 sm:px-6">
        <Link
          href="/"
          className="mr-2 flex items-center gap-2.5 rounded-md font-semibold tracking-tight text-fg"
          aria-label={`${site.name} home`}
        >
          <LogoMark className="size-7 text-fg [--logo-fg:var(--bg)]" />
          <span className="hidden text-[15px] sm:inline">{site.name}</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${
                  active ? 'bg-muted text-fg' : 'text-fg-muted hover:text-fg'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <a
            href={site.npm}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-md px-2.5 py-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg md:inline"
          >
            npm
          </a>
          <a
            href={site.repo}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            title="GitHub repository"
            className="inline-flex size-9 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-muted hover:text-fg"
          >
            <GithubIcon className="size-[18px]" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
