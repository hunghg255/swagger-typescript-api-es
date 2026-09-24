'use client';

import { useRef } from 'react';

export interface SegmentedItem<T extends string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

/** radio-group style segmented control with roving arrow-key focus */
export function Segmented<T extends string>({
  items,
  value,
  onChange,
  label,
  className = '',
  size = 'md',
  testIdPrefix,
}: {
  items: SegmentedItem<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
  size?: 'sm' | 'md';
  testIdPrefix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const index = items.findIndex((i) => i.value === value);
    let next = index;
    if (e.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length;
    if (e.key === 'ArrowRight') next = (index + 1) % items.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = items.length - 1;
    onChange(items[next].value);
    ref.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]')[next]?.focus();
  };
  const h = size === 'sm' ? 'h-7 text-xs px-2.5' : 'h-8 text-[13px] px-3';
  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={`inline-flex items-center gap-0.5 rounded-lg border border-border bg-muted p-0.5 ${className}`}
    >
      {items.map((item) => {
        const selected = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.value)}
            data-testid={testIdPrefix ? `${testIdPrefix}-${item.value}` : undefined}
            className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap transition-all ${h} ${
              selected ? 'bg-surface text-fg shadow-sm ring-1 ring-border' : 'text-fg-muted hover:text-fg'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
