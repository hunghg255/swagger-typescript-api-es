export type Theme = 'light' | 'dark';
export const THEME_STORAGE_KEY = 'sta-theme';

/**
 * Runs before first paint (inlined in <head>) so the page never flashes the
 * wrong theme. Stored preference wins, otherwise the OS setting is used.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var d=s==='dark'||(s!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}})();`;

