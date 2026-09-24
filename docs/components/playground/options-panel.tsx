'use client';

import { ChevronDown, RotateCcw } from 'lucide-react';
import { useState } from 'react';

import { STRING_OPTIONS, type StringOption } from '@/lib/api-types';
import { changedKeys, type FullOptions, OPTION_GROUPS, OPTION_META } from '@/lib/client/options';

import { InfoTip } from '../ui/info-tip';
import { Segmented } from '../ui/segmented';
import { Switch } from '../ui/switch';

function Section({
  title,
  count,
  children,
  defaultOpen = true,
}: {
  title: string;
  count?: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = `opt-section-${title.toLowerCase().replace(/\W+/g, '-')}`;
  return (
    <section className="border-b border-border last:border-b-0">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center gap-2 px-4 py-3 text-left text-xs font-semibold tracking-wide text-fg-subtle uppercase hover:text-fg"
        >
          {title}
          {!!count && (
            <span className="rounded-full bg-accent-soft px-1.5 py-px text-[10px] font-semibold text-accent normal-case">
              {count}
            </span>
          )}
          <ChevronDown className={`ml-auto size-3.5 transition-transform ${open ? '' : '-rotate-90'}`} aria-hidden />
        </button>
      </h3>
      <div id={id} hidden={!open} className="px-4 pb-4">
        {children}
      </div>
    </section>
  );
}

export function OptionsPanel({
  options,
  onChange,
  onReset,
}: {
  options: FullOptions;
  onChange: (patch: Partial<FullOptions>) => void;
  onReset: () => void;
}) {
  const changed = new Set(changedKeys(options));
  const stringKeys: (StringOption | 'moduleNameIndex')[] = [...STRING_OPTIONS, 'moduleNameIndex'];

  return (
    <div className="flex h-full min-h-0 flex-col" data-testid="options-panel">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-border pr-2 pl-4">
        <h2 className="text-[13px] font-semibold text-fg">
          Options
          {changed.size > 0 && <span className="ml-1.5 font-normal text-fg-subtle">· {changed.size} changed</span>}
        </h2>
        <button
          type="button"
          onClick={onReset}
          disabled={changed.size === 0}
          className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-fg-muted transition-colors hover:bg-muted hover:text-fg disabled:pointer-events-none disabled:opacity-40"
        >
          <RotateCcw className="size-3" aria-hidden /> Reset
        </button>
      </div>
      <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto">
        <Section title="Client">
          <div className="flex items-center gap-1.5 pb-2 text-[13px] text-fg">
            <span id="opt-httpClientType-label">{OPTION_META.httpClientType.label}</span>
            <InfoTip text={OPTION_META.httpClientType.description} />
          </div>
          <Segmented
            label="HTTP client"
            className="w-full"
            value={options.httpClientType}
            onChange={(v) => onChange({ httpClientType: v })}
            testIdPrefix="http-client"
            items={[
              { value: 'fetch', label: 'fetch' },
              { value: 'axios', label: 'axios' },
            ]}
          />
        </Section>

        {OPTION_GROUPS.map((group) => (
          <Section
            key={group.id}
            title={group.title}
            count={group.options.filter((k) => changed.has(k)).length}
          >
            <ul className="space-y-0.5">
              {group.options.map((key) => {
                const meta = OPTION_META[key];
                const id = `opt-${key}`;
                return (
                  <li key={key} className="-mx-2 flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted/60">
                    <label htmlFor={id} className="flex min-w-0 flex-1 cursor-pointer items-center gap-1.5 text-[13px] text-fg">
                      <span className="truncate">{meta.label}</span>
                      {changed.has(key) && <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />}
                    </label>
                    <InfoTip text={meta.description} />
                    <Switch
                      id={id}
                      checked={options[key]}
                      onChange={(v) => onChange({ [key]: v })}
                      testId={id}
                    />
                  </li>
                );
              })}
            </ul>
          </Section>
        ))}

        <Section title="Naming">
          <div className="space-y-3">
            {stringKeys.map((key) => {
              const meta = OPTION_META[key];
              const id = `opt-${key}`;
              const isNumber = key === 'moduleNameIndex';
              return (
                <div key={key}>
                  <div className="mb-1 flex items-center gap-1.5">
                    <label htmlFor={id} className="text-[13px] text-fg">
                      {meta.label}
                    </label>
                    <InfoTip text={meta.description} />
                    {changed.has(key) && <span className="size-1.5 rounded-full bg-accent" aria-hidden />}
                  </div>
                  <input
                    id={id}
                    data-testid={id}
                    type={isNumber ? 'number' : 'text'}
                    inputMode={isNumber ? 'numeric' : undefined}
                    min={isNumber ? 0 : undefined}
                    max={isNumber ? 20 : undefined}
                    spellCheck={false}
                    autoComplete="off"
                    placeholder={meta.placeholder}
                    value={isNumber ? String(options.moduleNameIndex) : options[key as StringOption]}
                    onChange={(e) => {
                      if (isNumber) {
                        const n = Math.max(0, Math.min(20, Math.trunc(Number(e.target.value) || 0)));
                        onChange({ moduleNameIndex: n });
                      } else {
                        onChange({ [key]: e.target.value.slice(0, 100) });
                      }
                    }}
                    className="h-8 w-full rounded-md border border-border bg-bg px-2.5 font-mono text-[12.5px] text-fg transition-colors placeholder:text-fg-subtle/70 hover:border-border-strong focus:border-ring focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25"
                  />
                </div>
              );
            })}
          </div>
        </Section>
      </div>
    </div>
  );
}
