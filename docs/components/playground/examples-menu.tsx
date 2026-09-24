'use client';

import { BookOpen, Check, ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

import { EXAMPLES, type ExampleSpec } from '@/lib/client/examples';

export function ExamplesMenu({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (example: ExampleSpec) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    // focus the active (or first) item when opening
    const items = rootRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]');
    const index = Math.max(0, EXAMPLES.findIndex((e) => e.id === activeId));
    items?.[index]?.focus();
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open, activeId]);

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    const items = Array.from(rootRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ?? []);
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[(index + 1) % items.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[(index - 1 + items.length) % items.length]?.focus();
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      if (e.key === 'Escape') e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    }
  };

  const active = EXAMPLES.find((e) => e.id === activeId);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        data-testid="examples-button"
        className="inline-flex h-8 items-center gap-2 rounded-lg border border-border bg-surface px-2.5 text-[13px] font-medium text-fg shadow-sm transition-colors hover:border-border-strong hover:bg-muted"
      >
        <BookOpen className="size-3.5 text-fg-muted" aria-hidden />
        <span className="max-sm:sr-only">Examples</span>
        {active && <span className="hidden font-normal text-fg-subtle md:inline">· {active.label}</span>}
        <ChevronDown className={`size-3.5 text-fg-subtle transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="Example schemas"
          onKeyDown={onMenuKeyDown}
          className="absolute top-full left-0 z-50 mt-1.5 w-72 overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-lg"
        >
          {EXAMPLES.map((example) => {
            const selected = example.id === activeId;
            return (
              <button
                key={example.id}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                data-testid={`example-${example.id}`}
                onClick={() => {
                  onSelect(example);
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                className="flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-muted focus:bg-muted focus-visible:outline-none"
              >
                <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center">
                  {selected && <Check className="size-3.5 text-accent" aria-hidden />}
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-medium text-fg">{example.label}</span>
                  <span className="block text-xs text-fg-subtle">{example.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
