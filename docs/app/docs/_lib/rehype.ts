import type { Element, ElementContent, Root, RootContent, Text } from 'hast';

import { getHighlighter, normalizeLang, SHIKI_THEMES } from '@/lib/client/shiki';

export interface DocHeading {
  id: string;
  text: string;
  depth: 2 | 3;
}

function toText(node: Root | RootContent | ElementContent): string {
  if (node.type === 'text') return (node as Text).value;
  if ('children' in node) return (node.children as ElementContent[]).map(toText).join('');
  return '';
}

function walk(node: Root | Element, fn: (el: Element, parent: Root | Element, index: number) => void) {
  node.children.forEach((child, index) => {
    if (child.type === 'element') {
      fn(child, node, index);
      walk(child, fn);
    }
  });
}

/** collects h2/h3 (after rehype-slug assigned ids) for the sidebar and TOC */
export function rehypeCollectHeadings(options: { headings: DocHeading[] }) {
  return (tree: Root) => {
    walk(tree, (el) => {
      if ((el.tagName === 'h2' || el.tagName === 'h3') && typeof el.properties.id === 'string') {
        options.headings.push({
          id: el.properties.id,
          text: toText(el).trim(),
          depth: el.tagName === 'h2' ? 2 : 3,
        });
      }
    });
  };
}

/** replaces `<pre><code class="language-x">` with shiki's dual-theme output */
export function rehypeShiki() {
  return async (tree: Root) => {
    const highlighter = await getHighlighter();
    const targets: { parent: Root | Element; index: number; code: string; lang: string }[] = [];
    walk(tree, (el, parent, index) => {
      if (el.tagName !== 'pre') return;
      const code = el.children.find((c): c is Element => c.type === 'element' && c.tagName === 'code');
      if (!code) return;
      const classes = (code.properties.className as string[] | undefined) ?? [];
      const langClass = classes.find((c) => String(c).startsWith('language-'));
      targets.push({
        parent,
        index,
        code: toText(code).replace(/\n$/, ''),
        lang: langClass ? String(langClass).slice('language-'.length) : '',
      });
    });
    for (const { parent, index, code, lang } of targets) {
      const hast = highlighter.codeToHast(code, {
        lang: normalizeLang(lang),
        themes: SHIKI_THEMES,
        defaultColor: false,
      });
      const pre = hast.children.find((c): c is Element => c.type === 'element' && c.tagName === 'pre');
      if (!pre) continue;
      pre.properties.dataCode = code;
      pre.properties.dataLang = lang || 'text';
      parent.children[index] = pre;
    }
  };
}
