import type { HighlighterCore } from 'shiki/core';

/** Shared shiki setup, used on the server (docs, landing) and lazily in the playground. */
export const SHIKI_THEMES = { light: 'github-light-default', dark: 'github-dark-default' } as const;

const LANG_ALIASES: Record<string, string> = {
  ts: 'typescript',
  typescript: 'typescript',
  mts: 'typescript',
  cts: 'typescript',
  tsx: 'tsx',
  js: 'javascript',
  mjs: 'javascript',
  cjs: 'javascript',
  javascript: 'javascript',
  jsx: 'tsx',
  json: 'json',
  json5: 'json',
  jsonc: 'json',
  yaml: 'yaml',
  yml: 'yaml',
  bash: 'bash',
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  console: 'bash',
  diff: 'diff',
};

export type ShikiLang = 'typescript' | 'tsx' | 'javascript' | 'json' | 'yaml' | 'bash' | 'diff' | 'text';

export function normalizeLang(lang?: string | null): ShikiLang {
  if (!lang) return 'text';
  return (LANG_ALIASES[lang.toLowerCase()] as ShikiLang | undefined) ?? 'text';
}

/** language for a generated file name */
export function langFromFileName(name: string): ShikiLang {
  if (name.endsWith('.d.ts')) return 'typescript';
  const ext = name.split('.').pop() ?? '';
  return normalizeLang(ext);
}

let highlighterPromise: Promise<HighlighterCore> | undefined;

export function getHighlighter(): Promise<HighlighterCore> {
  highlighterPromise ??= (async () => {
    const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] = await Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
    ]);
    return createHighlighterCore({
      themes: [import('shiki/themes/github-light-default.mjs'), import('shiki/themes/github-dark-default.mjs')],
      langs: [
        import('shiki/langs/typescript.mjs'),
        import('shiki/langs/tsx.mjs'),
        import('shiki/langs/javascript.mjs'),
        import('shiki/langs/json.mjs'),
        import('shiki/langs/yaml.mjs'),
        import('shiki/langs/bash.mjs'),
        import('shiki/langs/diff.mjs'),
      ],
      engine: createJavaScriptRegexEngine({ forgiving: true }),
    });
  })();
  return highlighterPromise;
}

export async function highlightToHtml(code: string, lang?: string | null): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang: normalizeLang(lang),
    themes: SHIKI_THEMES,
    defaultColor: false,
  });
}
