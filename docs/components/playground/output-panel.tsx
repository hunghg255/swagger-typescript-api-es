'use client';

import {
  AlertTriangle,
  Download,
  FileArchive,
  FileCode2,
  FileType2,
  Settings2,
  Sparkles,
  WrapText,
  X,
} from 'lucide-react';

import type { GeneratedFileDto } from '@/lib/api-types';
import { downloadFile } from '@/lib/client/download';
import { byteSize, formatBytes } from '@/lib/client/spec';

import { CopyButton } from '../copy-button';
import { Button } from '../ui/button';
import { CodeViewer } from './code-viewer';

function FileIcon({ name, className = '' }: { name: string; className?: string }) {
  if (name.endsWith('.d.ts')) return <FileType2 className={`text-sky-600 dark:text-sky-400 ${className}`} aria-hidden />;
  if (name.endsWith('.js')) return <FileCode2 className={`text-amber-600 dark:text-amber-400 ${className}`} aria-hidden />;
  return <FileCode2 className={`text-blue-600 dark:text-blue-400 ${className}`} aria-hidden />;
}

export interface OutputState {
  files: GeneratedFileDto[];
  durationMs: number | null;
  error: string | null;
  loading: boolean;
  /** true once a generation finished at least once */
  generated: boolean;
}

export function OutputPanel({
  state,
  activeName,
  openTabs,
  onSelect,
  onCloseTab,
  onDownloadZip,
  onShowConfig,
  onGenerate,
  wrap,
  onToggleWrap,
  zipName,
}: {
  state: OutputState;
  activeName: string | null;
  openTabs: string[];
  onSelect: (name: string) => void;
  onCloseTab: (name: string) => void;
  onDownloadZip: () => void;
  onShowConfig: () => void;
  onGenerate: () => void;
  wrap: boolean;
  onToggleWrap: () => void;
  zipName: string;
}) {
  const { files, loading, error, durationMs, generated } = state;
  const active = files.find((f) => f.name === activeName) ?? files[0] ?? null;
  const totalBytes = files.reduce((sum, f) => sum + byteSize(f.content), 0);
  const multiple = files.length > 1;

  return (
    <section aria-label="Generated files" className="relative flex h-full min-h-0 flex-col" data-testid="output-panel">
      {/* header */}
      <div className="flex min-h-11 shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-b border-border py-1.5 pr-2 pl-4">
        <h2 className="text-[13px] font-semibold text-fg">Output</h2>
        <p className="text-xs text-fg-subtle" aria-live="polite" data-testid="output-status">
          {loading
            ? 'Generating…'
            : files.length > 0
              ? `${files.length} ${files.length === 1 ? 'file' : 'files'} · ${formatBytes(totalBytes)}${
                  durationMs !== null ? ` · ${Math.round(durationMs)} ms` : ''
                }`
              : ''}
        </p>
        <div className="ml-auto flex items-center gap-0.5">
          <Button variant="ghost" size="sm" onClick={onShowConfig} data-testid="show-config">
            <Settings2 className="size-3.5" aria-hidden />
            <span className="max-sm:sr-only">Show config</span>
          </Button>
          {active && (
            <>
              <span className="mx-1 h-4 w-px bg-border" aria-hidden />
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onToggleWrap}
                aria-pressed={wrap}
                aria-label="Wrap long lines"
                title="Wrap long lines"
                className={wrap ? 'bg-muted text-fg' : ''}
              >
                <WrapText className="size-3.5" aria-hidden />
              </Button>
              <CopyButton text={active.content} label={`Copy ${active.name}`} className="size-8" />
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => downloadFile(active)}
                aria-label={`Download ${active.name}`}
                title={`Download ${active.name}`}
                data-testid="download-file"
              >
                <Download className="size-3.5" aria-hidden />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={onDownloadZip}
                className="ml-1"
                title={`Download all files as ${zipName}`}
                data-testid="download-zip"
              >
                <FileArchive className="size-3.5" aria-hidden />
                <span className="max-sm:sr-only">Download all</span>
                <span className="text-fg-subtle max-sm:hidden">.zip</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {loading && (
        <div className="absolute inset-x-0 top-11 z-10 h-0.5 overflow-hidden" aria-hidden>
          <div className="h-full w-1/3 animate-[progress_1.1s_ease-in-out_infinite] rounded-full bg-accent" />
        </div>
      )}

      {error && (
        <div
          role="alert"
          data-testid="generate-error"
          className="m-3 flex shrink-0 gap-3 rounded-xl border border-danger-border bg-danger-soft px-4 py-3 text-sm"
        >
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden />
          <div className="min-w-0">
            <p className="font-medium text-fg">Generation failed</p>
            <p className="mt-0.5 font-mono text-[12.5px] break-words whitespace-pre-wrap text-fg-muted">{error}</p>
          </div>
        </div>
      )}

      {files.length === 0 ? (
        !error && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-border bg-bg-subtle text-accent shadow-sm">
              <Sparkles className={`size-5 ${loading ? 'animate-pulse' : ''}`} aria-hidden />
            </span>
            <div>
              <p className="text-sm font-medium text-fg">{loading ? 'Generating your client…' : 'Nothing generated yet'}</p>
              <p className="mt-1 text-sm text-fg-muted">
                {loading ? 'This usually takes less than a second.' : 'Pick an example or paste a schema, then generate.'}
              </p>
            </div>
            {!loading && !generated && (
              <Button variant="primary" size="sm" onClick={onGenerate}>
                Generate
              </Button>
            )}
          </div>
        )
      ) : (
        <div className={`flex min-h-0 flex-1 transition-opacity ${loading ? 'opacity-60' : ''}`}>
          {/* file list (desktop) */}
          {multiple && (
            <nav
              aria-label="Files"
              className="scrollbar-thin hidden w-52 shrink-0 overflow-y-auto border-r border-border bg-bg-subtle py-2 md:block"
            >
              <p className="px-3 pt-1 pb-1.5 text-[11px] font-semibold tracking-wide text-fg-subtle uppercase">
                Files
              </p>
              <ul data-testid="file-list">
                {files.map((f) => {
                  const selected = f.name === active?.name;
                  return (
                    <li key={f.name}>
                      <button
                        type="button"
                        onClick={() => onSelect(f.name)}
                        aria-current={selected ? 'true' : undefined}
                        className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] transition-colors ${
                          selected ? 'bg-muted font-medium text-fg' : 'text-fg-muted hover:bg-muted/60 hover:text-fg'
                        }`}
                      >
                        <FileIcon name={f.name} className="size-3.5 shrink-0" />
                        <span className="min-w-0 flex-1 truncate">{f.name}</span>
                        <span className="shrink-0 text-[11px] text-fg-subtle tabular-nums">
                          {formatBytes(byteSize(f.content))}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          <div className="flex min-w-0 flex-1 flex-col">
            {/* tabs: open files on desktop, every file on mobile */}
            <div
              role="tablist"
              aria-label="Open files"
              className="scrollbar-thin flex h-10 shrink-0 items-end overflow-x-auto border-b border-border bg-bg-subtle"
              data-testid="file-tabs"
            >
              {(multiple ? files.map((f) => f.name) : [active?.name ?? '']).map((name) => {
                const isOpen = openTabs.includes(name) || !multiple;
                const selected = name === active?.name;
                return (
                  <div
                    key={name}
                    className={`group relative h-full shrink-0 items-center border-r border-border ${
                      isOpen ? 'flex' : 'flex md:hidden'
                    } ${selected ? 'bg-code text-fg' : 'text-fg-muted hover:text-fg'}`}
                  >
                    {selected && <span className="absolute inset-x-0 top-0 h-0.5 bg-accent" aria-hidden />}
                    <button
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => onSelect(name)}
                      className={`flex h-full items-center gap-2 pl-3 text-[13px] ${multiple ? 'pr-1.5' : 'pr-4'}`}
                      data-testid="file-tab"
                    >
                      <FileIcon name={name} className="size-3.5" />
                      {name}
                    </button>
                    {multiple && (
                      <button
                        type="button"
                        onClick={() => onCloseTab(name)}
                        aria-label={`Close ${name}`}
                        className={`mr-1.5 hidden size-5 items-center justify-center rounded text-fg-subtle hover:bg-muted hover:text-fg md:inline-flex ${
                          selected ? '' : 'opacity-0 group-hover:opacity-100 focus-visible:opacity-100'
                        } ${openTabs.length <= 1 ? 'md:hidden' : ''}`}
                      >
                        <X className="size-3" aria-hidden />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="min-h-0 flex-1 bg-code" role="tabpanel" aria-label={active?.name}>
              {active && <CodeViewer name={active.name} content={active.content} wrap={wrap} />}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
