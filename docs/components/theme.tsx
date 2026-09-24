'use client';

import { Moon, Sun } from 'lucide-react';
import { useCallback, useEffect, useSyncExternalStore } from 'react';

import { THEME_STORAGE_KEY, type Theme } from './theme-script';

export type { Theme };

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function getServerSnapshot(): Theme | null {
  return null;
}

/** current resolved theme (`null` during SSR / before hydration) */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // follow the OS setting while the user has not picked a theme explicitly
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(THEME_STORAGE_KEY);
      } catch {}
      if (stored !== 'light' && stored !== 'dark') {
        document.documentElement.dataset.theme = media.matches ? 'dark' : 'light';
      }
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    const root = document.documentElement;
    root.classList.add('no-transitions');
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
    requestAnimationFrame(() => root.classList.remove('no-transitions'));
  }, []);

  return { theme, setTheme };
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const next: Theme = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={theme ? `Switch to ${next} theme` : 'Toggle theme'}
      title={theme ? `Switch to ${next} theme` : 'Toggle theme'}
      data-testid="theme-toggle"
      className={`inline-flex size-9 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-muted hover:text-fg ${className}`}
    >
      <Sun className="size-[18px] dark:hidden" aria-hidden />
      <Moon className="hidden size-[18px] dark:block" aria-hidden />
    </button>
  );
}
