'use client';

import { Code2, FileUp, Link2, Loader2, Play, Share2, SlidersHorizontal, UploadCloud, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { type GenerateRequest, MAX_SPEC_BYTES } from '@/lib/api-types';
import { generate } from '@/lib/client/api';
import { downloadZip } from '@/lib/client/download';
import { DEFAULT_EXAMPLE_ID, type ExampleSpec, findExample, loadExample } from '@/lib/client/examples';
import {
  changedKeys,
  DEFAULT_OPTIONS,
  type FullOptions,
  optionsFromQuery,
  optionsToQuery,
  sanitizeOptions,
  toRequestOptions,
} from '@/lib/client/options';
import { byteSize, detectFormat, extractTitle, formatBytes, jsonError, slugify } from '@/lib/client/spec';
import { readStorage, writeStorage } from '@/lib/client/storage';

import { copyText } from '../copy-button';
import { useTheme } from '../theme';
import { Button, Kbd } from '../ui/button';
import { Segmented } from '../ui/segmented';
import { Switch } from '../ui/switch';
import { ConfigDialog } from './config-dialog';
import { ExamplesMenu } from './examples-menu';
import { OptionsPanel } from './options-panel';
import { type OutputState, OutputPanel } from './output-panel';

const SpecEditor = dynamic(() => import('./spec-editor'), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});

type Mode = 'editor' | 'url' | 'upload';

interface Persisted {
  spec?: string;
  url?: string;
  mode?: Mode;
  exampleId?: string | null;
  options?: Partial<FullOptions>;
  auto?: boolean;
  split?: number;
  showOptions?: boolean;
  wrap?: boolean;
}

const STORAGE_KEY = 'sta-playground-v1';
/** don't try to persist huge schemas in localStorage */
const MAX_PERSIST_BYTES = 1_000_000;
const AUTO_DELAY = 700;

function EditorSkeleton() {
  return (
    <div className="space-y-2 p-4" aria-hidden>
      {[72, 48, 64, 36, 80, 52, 40, 68].map((w, i) => (
        <div key={i} className="h-3 animate-pulse rounded bg-muted" style={{ width: `${w}%` }} />
      ))}
    </div>
  );
}

function isHttpUrl(value: string) {
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export function Playground() {
  const { theme } = useTheme();
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<Mode>('editor');
  const [spec, setSpec] = useState('');
  const [url, setUrl] = useState('');
  const [exampleId, setExampleId] = useState<string | null>(null);
  const [options, setOptions] = useState<FullOptions>(DEFAULT_OPTIONS);
  const [auto, setAuto] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [mobileOptions, setMobileOptions] = useState(false);
  const [split, setSplit] = useState(42);
  const [wrap, setWrap] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [isMac, setIsMac] = useState(false);
  const [output, setOutput] = useState<OutputState>({
    files: [],
    durationMs: null,
    error: null,
    loading: false,
    generated: false,
  });
  const [activeName, setActiveName] = useState<string | null>(null);
  const [openTabs, setOpenTabs] = useState<string[]>([]);

  const abortRef = useRef<AbortController | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const exampleSpecRef = useRef<string | null>(null);

  const notify = useCallback((message: string) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const format = useMemo(() => detectFormat(spec), [spec]);
  const specBytes = useMemo(() => byteSize(spec), [spec]);
  const syntaxError = useMemo(() => (format === 'json' && spec.trim() ? jsonError(spec) : null), [format, spec]);
  const title = useMemo(() => {
    if (mode === 'url') {
      try {
        return new URL(url).hostname;
      } catch {
        return null;
      }
    }
    return extractTitle(spec);
  }, [mode, url, spec]);
  const zipName = `${slugify(title ?? 'api')}.zip`;

  /* ---------------------------------------------------------- generation */

  const runGenerate = useCallback(
    async (override?: { spec?: string; url?: string; mode?: Mode; options?: FullOptions }) => {
      const currentMode = override?.mode ?? mode;
      const currentSpec = override?.spec ?? spec;
      const currentUrl = (override?.url ?? url).trim();
      const currentOptions = override?.options ?? options;

      let request: GenerateRequest;
      if (currentMode === 'url') {
        if (!isHttpUrl(currentUrl)) {
          setOutput((o) => ({ ...o, error: 'Enter a valid http(s) URL of an OpenAPI / Swagger schema.' }));
          return;
        }
        request = { url: currentUrl, options: toRequestOptions(currentOptions) };
      } else {
        if (!currentSpec.trim()) {
          setOutput((o) => ({ ...o, error: 'The schema is empty. Paste a spec, upload a file or pick an example.' }));
          return;
        }
        if (byteSize(currentSpec) > MAX_SPEC_BYTES) {
          setOutput((o) => ({
            ...o,
            error: `The schema is ${formatBytes(byteSize(currentSpec))}; the playground accepts up to ${formatBytes(MAX_SPEC_BYTES)}.`,
          }));
          return;
        }
        request = { spec: currentSpec, options: toRequestOptions(currentOptions) };
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setOutput((o) => ({ ...o, loading: true }));

      try {
        const result = await generate(request, controller.signal);
        if (controller.signal.aborted) return;
        if (result.ok) {
          setOutput({ files: result.files, durationMs: result.durationMs, error: null, loading: false, generated: true });
          const names = result.files.map((f) => f.name);
          setActiveName((prev) => (prev && names.includes(prev) ? prev : (names[0] ?? null)));
          setOpenTabs((prev) => {
            const kept = prev.filter((n) => names.includes(n));
            return kept.length ? kept : names.slice(0, 1);
          });
        } else {
          setOutput((o) => ({ ...o, error: result.error, loading: false, generated: true }));
        }
      } catch (error) {
        if ((error as Error)?.name === 'AbortError') return;
        setOutput((o) => ({ ...o, error: (error as Error).message || 'Unexpected error.', loading: false }));
      } finally {
        if (abortRef.current === controller) abortRef.current = null;
      }
    },
    [mode, spec, url, options]
  );

  const runGenerateRef = useRef(runGenerate);
  useEffect(() => {
    runGenerateRef.current = runGenerate;
  }, [runGenerate]);
  const submit = useCallback(() => runGenerateRef.current(), []);

  /* -------------------------------------------------------------- init */

  const applyExample = useCallback(
    async (example: ExampleSpec, opts?: { generate?: boolean; options?: FullOptions }) => {
      try {
        const text = await loadExample(example);
        exampleSpecRef.current = text;
        setSpec(text);
        setExampleId(example.id);
        setMode('editor');
        if (opts?.generate !== false) runGenerateRef.current({ spec: text, mode: 'editor', options: opts?.options });
      } catch (error) {
        notify((error as Error).message);
      }
    },
    [notify]
  );

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  useEffect(() => {
    const stored = readStorage<Persisted>(STORAGE_KEY) ?? {};
    const params = new URLSearchParams(window.location.search);
    const queryOptions = optionsFromQuery(params);
    const initialOptions = queryOptions ?? sanitizeOptions(stored.options);
    setOptions(initialOptions);
    if (typeof stored.auto === 'boolean') setAuto(stored.auto);
    if (typeof stored.split === 'number' && stored.split >= 20 && stored.split <= 80) setSplit(stored.split);
    if (typeof stored.showOptions === 'boolean') setShowOptions(stored.showOptions);
    if (typeof stored.wrap === 'boolean') setWrap(stored.wrap);

    const queryExample = findExample(params.get('example'));
    const queryUrl = params.get('url');

    (async () => {
      if (queryExample) {
        await applyExample(queryExample, { options: initialOptions });
      } else if (queryUrl && isHttpUrl(queryUrl)) {
        setUrl(queryUrl);
        setMode('url');
        if (stored.spec) setSpec(stored.spec);
        runGenerateRef.current({ url: queryUrl, mode: 'url', options: initialOptions });
      } else if (stored.spec || stored.url) {
        setSpec(stored.spec ?? '');
        setUrl(stored.url ?? '');
        const storedMode = stored.mode === 'url' ? 'url' : 'editor';
        setMode(storedMode);
        const storedExample = findExample(stored.exampleId);
        if (storedExample) {
          setExampleId(storedExample.id);
          loadExample(storedExample)
            .then((text) => {
              if (text === stored.spec) exampleSpecRef.current = text;
              else setExampleId(null);
            })
            .catch(() => setExampleId(null));
        }
        runGenerateRef.current({
          spec: stored.spec ?? '',
          url: stored.url ?? '',
          mode: storedMode,
          options: initialOptions,
        });
      } else {
        await applyExample(findExample(DEFAULT_EXAMPLE_ID)!, { options: initialOptions });
      }
      setReady(true);
    })();
  }, [applyExample]);

  /* ------------------------------------------------ persistence & URL sync */

  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => {
      writeStorage(STORAGE_KEY, {
        spec: specBytes <= MAX_PERSIST_BYTES ? spec : undefined,
        url,
        mode: mode === 'upload' ? 'editor' : mode,
        exampleId,
        options,
        auto,
        split,
        showOptions,
        wrap,
      } satisfies Persisted);
    }, 400);
    return () => clearTimeout(id);
  }, [ready, spec, specBytes, url, mode, exampleId, options, auto, split, showOptions, wrap]);

  const shareUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (mode === 'url' && url.trim()) params.set('url', url.trim());
    else if (exampleId) params.set('example', exampleId);
    optionsToQuery(options, params);
    const query = params.toString();
    return query ? `?${query}` : '';
  }, [mode, url, exampleId, options]);

  useEffect(() => {
    if (!ready) return;
    const next = `${window.location.pathname}${shareUrl}`;
    if (next !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(window.history.state, '', next);
    }
  }, [ready, shareUrl]);

  /* ------------------------------------------------------ auto generate */

  const firstAutoRun = useRef(true);
  useEffect(() => {
    if (!ready || !auto) return;
    if (firstAutoRun.current) {
      firstAutoRun.current = false;
      return;
    }
    if (mode === 'upload') return;
    const id = setTimeout(() => runGenerateRef.current(), AUTO_DELAY);
    return () => clearTimeout(id);
  }, [ready, auto, spec, url, mode, options]);

  /* --------------------------------------------------- keyboard shortcut */

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        runGenerateRef.current();
      }
      if (e.key === 'Escape') setMobileOptions(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* --------------------------------------------------------- handlers */

  const onSpecChange = useCallback((value: string) => {
    setSpec(value);
    if (exampleSpecRef.current !== null && value !== exampleSpecRef.current) {
      setExampleId(null);
      exampleSpecRef.current = null;
    }
  }, []);

  const onOptionsChange = useCallback((patch: Partial<FullOptions>) => {
    setOptions((prev) => ({ ...prev, ...patch }));
  }, []);

  const onFile = useCallback(
    async (file: File) => {
      if (!/\.(json|ya?ml)$/i.test(file.name)) {
        setOutput((o) => ({ ...o, error: `"${file.name}" is not a .json, .yaml or .yml file.` }));
        return;
      }
      if (file.size > MAX_SPEC_BYTES) {
        setOutput((o) => ({
          ...o,
          error: `"${file.name}" is ${formatBytes(file.size)}; the playground accepts up to ${formatBytes(MAX_SPEC_BYTES)}.`,
        }));
        return;
      }
      const text = await file.text();
      setSpec(text);
      setExampleId(null);
      exampleSpecRef.current = null;
      setMode('editor');
      notify(`Loaded ${file.name} (${formatBytes(file.size)})`);
      runGenerateRef.current({ spec: text, mode: 'editor' });
    },
    [notify]
  );

  const onShare = useCallback(async () => {
    const link = `${window.location.origin}${window.location.pathname}${shareUrl}`;
    const ok = await copyText(link);
    const custom = mode !== 'url' && !exampleId;
    notify(ok ? (custom ? 'Link copied — options only, custom schemas are not shared' : 'Link copied') : 'Could not copy the link');
  }, [shareUrl, mode, exampleId, notify]);

  const onDownloadZip = useCallback(async () => {
    try {
      await downloadZip(output.files, zipName);
    } catch {
      notify('Could not create the zip file');
    }
  }, [output.files, zipName, notify]);

  const onSelectFile = useCallback((name: string) => {
    setActiveName(name);
    setOpenTabs((tabs) => (tabs.includes(name) ? tabs : [...tabs, name]));
  }, []);

  const onCloseTab = useCallback(
    (name: string) => {
      setOpenTabs((tabs) => {
        if (tabs.length <= 1) return tabs;
        const index = tabs.indexOf(name);
        const next = tabs.filter((t) => t !== name);
        if (name === activeName) setActiveName(next[Math.min(index, next.length - 1)] ?? null);
        return next;
      });
    },
    [activeName]
  );

  /* ---------------------------------------------------------- split drag */

  const splitRef = useRef<HTMLDivElement>(null);
  const onHandlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const container = splitRef.current;
    if (!container) return;
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    const rect = container.getBoundingClientRect();
    const move = (ev: PointerEvent) => {
      const pct = ((ev.clientX - rect.left) / rect.width) * 100;
      setSplit(Math.min(75, Math.max(25, pct)));
    };
    const up = () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      target.removeEventListener('pointermove', move);
      target.removeEventListener('pointerup', up);
      target.removeEventListener('pointercancel', up);
    };
    target.addEventListener('pointermove', move);
    target.addEventListener('pointerup', up);
    target.addEventListener('pointercancel', up);
  };
  const onHandleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setSplit((s) => Math.max(25, s - 3));
    else if (e.key === 'ArrowRight') setSplit((s) => Math.min(75, s + 3));
    else return;
    e.preventDefault();
  };

  const changedCount = changedKeys(options).length;

  /* ------------------------------------------------------------- render */

  const optionsPanel = (
    <OptionsPanel options={options} onChange={onOptionsChange} onReset={() => setOptions(DEFAULT_OPTIONS)} />
  );

  return (
    <div className="flex flex-col lg:h-[calc(100dvh-3.5rem)]">
      {/* toolbar */}
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-border bg-bg px-3 py-2 sm:px-4">
        <h1 className="mr-1 text-sm font-semibold text-fg max-sm:sr-only">Playground</h1>
        <ExamplesMenu activeId={exampleId} onSelect={(ex) => applyExample(ex)} />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (window.matchMedia('(min-width: 1024px)').matches) setShowOptions((s) => !s);
            else setMobileOptions(true);
          }}
          aria-pressed={showOptions}
          aria-label="Toggle options"
          data-testid="options-toggle"
          className="lg:aria-pressed:bg-muted lg:aria-pressed:text-fg"
        >
          <SlidersHorizontal className="size-3.5" aria-hidden />
          <span className="max-sm:sr-only">Options</span>
          {changedCount > 0 && (
            <span className="rounded-full bg-accent-soft px-1.5 text-[11px] font-semibold text-accent">{changedCount}</span>
          )}
        </Button>

        <div className="ml-auto flex items-center gap-2">
          <label className="flex items-center gap-2 rounded-lg px-1.5 text-[13px] text-fg-muted" title="Regenerate as you type">
            <Switch checked={auto} onChange={setAuto} size="sm" testId="auto-generate" label="Auto-generate" />
            <span>Auto</span>
          </label>
          <Button variant="ghost" size="sm" onClick={onShare} aria-label="Copy share link" title="Copy share link">
            <Share2 className="size-3.5" aria-hidden />
            <span className="max-md:sr-only">Share</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={submit}
            disabled={output.loading}
            data-testid="generate"
            aria-keyshortcuts="Control+Enter Meta+Enter"
            className="min-w-[7.5rem] px-3"
          >
            {output.loading ? <Loader2 className="size-3.5 animate-spin" aria-hidden /> : <Play className="size-3.5 fill-current" aria-hidden />}
            Generate
            <Kbd className="ml-0.5 max-sm:hidden">{isMac ? '⌘↵' : 'Ctrl ↵'}</Kbd>
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* options sidebar (desktop) */}
        {showOptions && (
          <aside className="hidden w-72 shrink-0 border-r border-border bg-bg lg:block" aria-label="Generator options">
            {optionsPanel}
          </aside>
        )}

        {/* input + output */}
        <div ref={splitRef} className="flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row" style={{ ['--split' as string]: `${split}%` }}>
          <section
            aria-label="Schema input"
            className="flex h-[58dvh] min-h-[340px] min-w-0 shrink-0 flex-col border-b border-border bg-bg lg:h-auto lg:min-h-0 lg:w-[var(--split)] lg:border-b-0"
          >
            <div className="flex h-11 shrink-0 items-center gap-2 border-b border-border px-2 sm:px-3">
              <Segmented<Mode>
                label="Schema source"
                size="sm"
                value={mode}
                onChange={setMode}
                testIdPrefix="source"
                items={[
                  { value: 'editor', label: 'Editor', icon: <Code2 className="size-3.5" aria-hidden /> },
                  { value: 'url', label: 'URL', icon: <Link2 className="size-3.5" aria-hidden /> },
                  { value: 'upload', label: 'Upload', icon: <FileUp className="size-3.5" aria-hidden /> },
                ]}
              />
              {mode === 'editor' && spec && (
                <div className="ml-auto flex min-w-0 items-center gap-2 text-[11px] text-fg-subtle">
                  {syntaxError ? (
                    <span className="truncate text-danger" title={syntaxError}>
                      Invalid JSON
                    </span>
                  ) : null}
                  <span className="rounded border border-border px-1.5 py-px font-mono font-medium uppercase" data-testid="spec-format">
                    {format}
                  </span>
                  <span className="tabular-nums max-sm:hidden">{formatBytes(specBytes)}</span>
                </div>
              )}
            </div>

            <div className="relative min-h-0 flex-1">
              {mode === 'editor' && (
                <div className="absolute inset-0">
                  {ready ? (
                    <SpecEditor value={spec} onChange={onSpecChange} format={format} dark={theme === 'dark'} onSubmit={submit} />
                  ) : (
                    <EditorSkeleton />
                  )}
                </div>
              )}
              {mode === 'url' && <UrlSource url={url} onChange={setUrl} onSubmit={submit} loading={output.loading} />}
              {mode === 'upload' && <UploadSource onFile={onFile} />}
            </div>
          </section>

          {/* resize handle */}
          <div
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize panels"
            aria-valuenow={Math.round(split)}
            aria-valuemin={25}
            aria-valuemax={75}
            tabIndex={0}
            onPointerDown={onHandlePointerDown}
            onKeyDown={onHandleKeyDown}
            onDoubleClick={() => setSplit(42)}
            className="group relative z-10 hidden w-px shrink-0 cursor-col-resize bg-border lg:block"
          >
            <span className="absolute inset-y-0 -left-1.5 -right-1.5" aria-hidden />
            <span className="absolute inset-y-0 -left-px w-[3px] bg-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden />
          </div>

          <div className="flex h-[75dvh] min-h-[420px] min-w-0 flex-1 flex-col lg:h-auto lg:min-h-0">
            <OutputPanel
              state={output}
              activeName={activeName}
              openTabs={openTabs}
              onSelect={onSelectFile}
              onCloseTab={onCloseTab}
              onDownloadZip={onDownloadZip}
              onShowConfig={() => setConfigOpen(true)}
              onGenerate={submit}
              wrap={wrap}
              onToggleWrap={() => setWrap((w) => !w)}
              zipName={zipName}
            />
          </div>
        </div>
      </div>

      {/* options drawer (mobile) */}
      {mobileOptions && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Generator options">
          <button
            type="button"
            aria-label="Close options"
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setMobileOptions(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(20rem,88vw)] flex-col border-r border-border bg-bg shadow-lg">
            <div className="min-h-0 flex-1">{optionsPanel}</div>
            <div className="flex shrink-0 gap-2 border-t border-border p-3">
              <Button variant="secondary" size="md" className="flex-1" onClick={() => setMobileOptions(false)}>
                <X className="size-4" aria-hidden /> Close
              </Button>
              <Button
                variant="primary"
                size="md"
                className="flex-1"
                onClick={() => {
                  setMobileOptions(false);
                  submit();
                }}
              >
                <Play className="size-3.5 fill-current" aria-hidden /> Generate
              </Button>
            </div>
          </div>
        </div>
      )}

      <ConfigDialog
        open={configOpen}
        onClose={() => setConfigOpen(false)}
        options={options}
        url={mode === 'url' && url.trim() ? url.trim() : undefined}
      />

      <div
        aria-live="polite"
        className={`pointer-events-none fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 transition-all duration-200 ${
          toast ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
      >
        {toast && (
          <div className="rounded-full border border-border bg-fg px-4 py-2 text-[13px] font-medium whitespace-nowrap text-bg shadow-lg" data-testid="toast">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}

function UrlSource({
  url,
  onChange,
  onSubmit,
  loading,
}: {
  url: string;
  onChange: (url: string) => void;
  onSubmit: () => void;
  loading: boolean;
}) {
  return (
    <form
      className="mx-auto flex max-w-lg flex-col gap-4 px-5 py-10 sm:py-14"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-bg-subtle text-accent">
        <Link2 className="size-5" aria-hidden />
      </div>
      <div>
        <label htmlFor="spec-url" className="text-sm font-medium text-fg">
          Schema URL
        </label>
        <p className="mt-1 text-[13px] text-fg-muted">
          A public http(s) URL of an OpenAPI 3 or Swagger 2 document (JSON or YAML). It is downloaded by the server.
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="spec-url"
          type="url"
          inputMode="url"
          spellCheck={false}
          autoComplete="url"
          placeholder="https://petstore3.swagger.io/api/v3/openapi.json"
          value={url}
          onChange={(e) => onChange(e.target.value)}
          data-testid="spec-url"
          className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-bg px-3 font-mono text-[13px] text-fg shadow-sm placeholder:text-fg-subtle/70 hover:border-border-strong focus:border-ring focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25"
        />
        <Button type="submit" variant="primary" size="md" disabled={loading || !url.trim()}>
          {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Play className="size-3.5 fill-current" aria-hidden />}
          Fetch & generate
        </Button>
      </div>
      <button
        type="button"
        onClick={() => onChange('https://petstore3.swagger.io/api/v3/openapi.json')}
        className="self-start text-[13px] text-fg-muted underline decoration-border-strong underline-offset-4 hover:text-fg"
      >
        Try the Swagger Petstore v3 URL
      </button>
    </form>
  );
}

function UploadSource({ onFile }: { onFile: (file: File) => void }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="absolute inset-0 p-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) onFile(file);
        }}
        data-testid="dropzone"
        className={`flex h-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 text-center transition-colors ${
          dragging ? 'border-accent bg-accent-soft' : 'border-border bg-bg-subtle'
        }`}
      >
        <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-border bg-surface text-accent shadow-sm">
          <UploadCloud className="size-5" aria-hidden />
        </span>
        <div>
          <p className="text-sm font-medium text-fg">Drop a schema file here</p>
          <p className="mt-1 text-[13px] text-fg-muted">
            .json, .yaml or .yml · up to {formatBytes(MAX_SPEC_BYTES)}
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => inputRef.current?.click()}>
          Browse files
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept=".json,.yaml,.yml,application/json,application/yaml,text/yaml"
          className="sr-only"
          tabIndex={-1}
          aria-label="Upload schema file"
          data-testid="file-input"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFile(file);
            e.target.value = '';
          }}
        />
      </div>
    </div>
  );
}
