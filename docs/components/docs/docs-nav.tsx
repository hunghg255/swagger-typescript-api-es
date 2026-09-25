'use client';

import { ChevronDown, FlaskConical, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import { GithubIcon } from '../icons';
import { site } from '../site-config';
import { useActiveHeading } from './use-active-heading';

export interface NavHeading {
  id: string;
  text: string;
  depth: 2 | 3;
}

interface Group {
  heading: NavHeading;
  children: NavHeading[];
}

function groupHeadings(headings: NavHeading[]): Group[] {
  const groups: Group[] = [];
  for (const h of headings) {
    if (h.depth === 2 || groups.length === 0) groups.push({ heading: h, children: [] });
    else groups[groups.length - 1].children.push(h);
  }
  return groups;
}

function SectionList({
  groups,
  active,
  onNavigate,
}: {
  groups: Group[];
  active: string | null;
  onNavigate?: () => void;
}) {
  return (
    <ul className="space-y-0.5">
      {groups.map(({ heading, children }) => {
        const inGroup = heading.id === active || children.some((c) => c.id === active);
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={onNavigate}
              aria-current={inGroup ? 'location' : undefined}
              className={`flex items-center justify-between rounded-md px-2.5 py-1.5 text-[13.5px] transition-colors ${
                inGroup ? 'bg-muted font-medium text-fg' : 'text-fg-muted hover:bg-muted/60 hover:text-fg'
              }`}
            >
              {heading.text}
              {children.length > 0 && (
                <ChevronDown
                  className={`size-3.5 shrink-0 text-fg-subtle transition-transform ${inGroup ? '' : '-rotate-90'}`}
                  aria-hidden
                />
              )}
            </a>
            {children.length > 0 && inGroup && (
              <ul className="mt-0.5 mb-1.5 ml-3 space-y-px border-l border-border pl-2">
                {children.map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      onClick={onNavigate}
                      aria-current={c.id === active ? 'location' : undefined}
                      className={`block truncate rounded-md px-2 py-1 text-[13px] transition-colors ${
                        c.id === active ? 'font-medium text-accent' : 'text-fg-muted hover:text-fg'
                      }`}
                    >
                      {c.text}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function DocsSidebar({
  headings,
  title = 'Guide',
  label = 'Documentation sections',
}: {
  headings: NavHeading[];
  /** small caps title above the list */
  title?: string;
  /** accessible name of the navigation landmark */
  label?: string;
}) {
  const ids = useMemo(() => headings.map((h) => h.id), [headings]);
  const groups = useMemo(() => groupHeadings(headings), [headings]);
  const active = useActiveHeading(ids);
  return (
    <nav aria-label={label} className="scrollbar-thin h-full overflow-y-auto py-8 pr-3">
      <p className="mb-2 px-2.5 text-xs font-semibold tracking-wide text-fg-subtle uppercase">{title}</p>
      <SectionList groups={groups} active={active} />
      <div className="mt-6 border-t border-border pt-5">
        <Link
          href="/playground"
          className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[13.5px] text-fg-muted transition-colors hover:bg-muted/60 hover:text-fg"
        >
          <FlaskConical className="size-4" aria-hidden /> Playground
        </Link>
        <a
          href={site.repo}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[13.5px] text-fg-muted transition-colors hover:bg-muted/60 hover:text-fg"
        >
          <GithubIcon className="size-4" /> GitHub
        </a>
      </div>
    </nav>
  );
}

export function DocsMobileNav({ headings }: { headings: NavHeading[] }) {
  const [open, setOpen] = useState(false);
  const ids = useMemo(() => headings.map((h) => h.id), [headings]);
  const groups = useMemo(() => groupHeadings(headings), [headings]);
  const active = useActiveHeading(ids);
  const panelRef = useRef<HTMLDivElement>(null);
  const activeText = headings.find((h) => h.id === active)?.text ?? 'Sections';

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="sticky top-14 z-30 -mx-4 border-b border-border bg-bg/95 px-4 backdrop-blur-lg sm:-mx-6 sm:px-6 lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="docs-mobile-nav"
        className="flex h-11 w-full items-center gap-2 text-sm text-fg-muted"
      >
        {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
        <span className="font-medium text-fg">Menu</span>
        <span className="text-fg-subtle" aria-hidden>
          /
        </span>
        <span className="truncate">{activeText}</span>
      </button>
      {open && (
        <div
          id="docs-mobile-nav"
          ref={panelRef}
          className="scrollbar-thin max-h-[65dvh] overflow-y-auto border-t border-border py-3"
        >
          <SectionList groups={groups} active={active} onNavigate={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}

export function DocsToc({
  headings,
  editHref = `${site.repo}/edit/main/README.md`,
}: {
  headings: NavHeading[];
  /** "Edit this page on GitHub" target */
  editHref?: string;
}) {
  const ids = useMemo(() => headings.map((h) => h.id), [headings]);
  const active = useActiveHeading(ids);
  const listRef = useRef<HTMLUListElement>(null);

  // keep the active entry visible inside the (scrollable) TOC
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>('[aria-current="location"]');
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  return (
    <nav aria-label="On this page" className="flex h-full flex-col py-8" data-testid="docs-toc">
      <p className="mb-3 text-xs font-semibold tracking-wide text-fg-subtle uppercase">On this page</p>
      <ul ref={listRef} className="scrollbar-thin min-h-0 flex-1 space-y-px overflow-y-auto border-l border-border">
        {headings.map((h) => {
          const isActive = h.id === active;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`-ml-px block border-l py-1 text-[13px] leading-snug transition-colors ${
                  h.depth === 3 ? 'pl-6' : 'pl-3'
                } ${
                  isActive
                    ? 'border-accent font-medium text-fg'
                    : 'border-transparent text-fg-muted hover:border-border-strong hover:text-fg'
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="mt-5 space-y-2 border-t border-border pt-5 text-[13px]">
        <a
          href={editHref}
          target="_blank"
          rel="noreferrer"
          className="block text-fg-muted hover:text-fg"
        >
          Edit this page on GitHub
        </a>
        <a href="#main" className="block text-fg-muted hover:text-fg">
          Back to top
        </a>
      </div>
    </nav>
  );
}
