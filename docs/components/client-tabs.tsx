'use client';

import { useId, useSyncExternalStore } from 'react';

import { Segmented } from './ui/segmented';

export type HttpClientKind = 'fetch' | 'axios';

const STORAGE_KEY = 'sta-es:http-client';
const listeners = new Set<() => void>();
let current: HttpClientKind | null = null;

function read(): HttpClientKind {
  if (current) return current;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    current = stored === 'axios' ? 'axios' : 'fetch';
  } catch {
    current = 'fetch';
  }
  return current;
}

function write(value: HttpClientKind) {
  current = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {}
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const ITEMS = [
  { value: 'fetch' as const, label: 'fetch' },
  { value: 'axios' as const, label: 'axios' },
];

/**
 * fetch / axios variants of a code example. The choice is shared by every block of the page
 * (and remembered), so switching once shows the axios version everywhere.
 */
export function ClientTabs({ fetch, axios }: { fetch: React.ReactNode; axios: React.ReactNode }) {
  const value = useSyncExternalStore(subscribe, read, () => 'fetch' as const);
  const id = useId();
  return (
    <div className="client-tabs" data-testid="client-tabs">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-fg-subtle" id={`${id}-label`}>
          HTTP client
        </span>
        <Segmented size="sm" label="HTTP client" items={ITEMS} value={value} onChange={write} />
      </div>
      <div aria-labelledby={`${id}-label`} role="group">
        <div hidden={value !== 'fetch'} data-client="fetch">
          {fetch}
        </div>
        <div hidden={value !== 'axios'} data-client="axios">
          {axios}
        </div>
      </div>
    </div>
  );
}
