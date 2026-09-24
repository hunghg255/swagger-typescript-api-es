'use client';

import { X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { buildCliCommand, buildConfigFile, type FullOptions } from '@/lib/client/options';

import { CopyButton } from '../copy-button';
import { Segmented } from '../ui/segmented';
import { CodeViewer } from './code-viewer';

type Tab = 'config' | 'cli';

export function ConfigDialog({
  open,
  onClose,
  options,
  url,
}: {
  open: boolean;
  onClose: () => void;
  options: FullOptions;
  url?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [tab, setTab] = useState<Tab>('config');

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const config = useMemo(() => buildConfigFile(options, { url }), [options, url]);
  const cli = useMemo(() => buildCliCommand(options, { url }), [options, url]);
  const text = tab === 'config' ? config : cli.command;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="config-dialog-title"
      className="m-auto w-[min(720px,calc(100vw-2rem))] rounded-2xl border border-border bg-surface p-0 text-fg shadow-lg backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      data-testid="config-dialog"
    >
      {open && (
        <div className="flex max-h-[85dvh] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-border px-5 pt-5 pb-4">
            <div>
              <h2 id="config-dialog-title" className="text-base font-semibold">
                Use these options in your project
              </h2>
              <p className="mt-1 text-sm text-fg-muted">
                Same output as the playground, generated locally with the CLI.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-fg-muted hover:bg-muted hover:text-fg"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
          <div className="flex items-center justify-between gap-3 px-5 pt-4">
            <Segmented<Tab>
              label="Snippet type"
              size="sm"
              value={tab}
              onChange={setTab}
              items={[
                { value: 'config', label: 'Config file' },
                { value: 'cli', label: 'CLI' },
              ]}
            />
            <CopyButton text={text} label="Copy snippet" showLabel />
          </div>
          <div className="px-5 pt-3 pb-5">
            <p className="mb-2 font-mono text-xs text-fg-subtle">
              {tab === 'config' ? 'swagger-typescript-api.config.ts' : 'terminal'}
            </p>
            <div className="scrollbar-thin max-h-[min(360px,50dvh)] overflow-auto rounded-xl border border-border bg-code">
              <CodeViewer name={tab === 'config' ? 'config.ts' : 'cmd.sh'} content={text} wrap={tab === 'cli'} />
            </div>
            {tab === 'config' ? (
              <p className="mt-3 text-xs text-fg-muted">
                Run <code className="rounded bg-muted px-1 py-0.5 font-mono text-fg">npx swagger-typescript-api-es</code>{' '}
                in the folder that contains this file.
              </p>
            ) : cli.configOnly.length > 0 ? (
              <p className="mt-3 text-xs text-fg-muted">
                No CLI flag for <span className="font-mono text-fg">{cli.configOnly.join(', ')}</span> — set{' '}
                {cli.configOnly.length > 1 ? 'them' : 'it'} in a config file.
              </p>
            ) : null}
          </div>
        </div>
      )}
    </dialog>
  );
}
