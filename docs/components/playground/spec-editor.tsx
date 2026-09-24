'use client';

import { json } from '@codemirror/lang-json';
import { yaml } from '@codemirror/lang-yaml';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { Prec } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { tags as t } from '@lezer/highlight';
import CodeMirror from '@uiw/react-codemirror';
import { useMemo, useRef } from 'react';

import type { SpecFormat } from '@/lib/client/spec';

// colours follow shiki's github-light-default / github-dark-default
const lightHighlight = HighlightStyle.define([
  { tag: [t.propertyName, t.definition(t.propertyName)], color: '#0550ae' },
  { tag: [t.string, t.special(t.string)], color: '#0a3069' },
  { tag: [t.number, t.bool, t.null, t.atom], color: '#0550ae' },
  { tag: [t.keyword, t.operator], color: '#cf222e' },
  { tag: [t.comment], color: '#6e7781', fontStyle: 'italic' },
  { tag: [t.meta, t.labelName, t.typeName], color: '#8250df' },
  { tag: [t.punctuation, t.separator, t.bracket], color: '#57606a' },
]);

const darkHighlight = HighlightStyle.define([
  { tag: [t.propertyName, t.definition(t.propertyName)], color: '#79c0ff' },
  { tag: [t.string, t.special(t.string)], color: '#a5d6ff' },
  { tag: [t.number, t.bool, t.null, t.atom], color: '#79c0ff' },
  { tag: [t.keyword, t.operator], color: '#ff7b72' },
  { tag: [t.comment], color: '#8b949e', fontStyle: 'italic' },
  { tag: [t.meta, t.labelName, t.typeName], color: '#d2a8ff' },
  { tag: [t.punctuation, t.separator, t.bracket], color: '#8b949e' },
]);

const baseTheme = (dark: boolean) =>
  EditorView.theme(
    {
      '&': { color: 'var(--fg)', backgroundColor: 'transparent' },
      '.cm-content': { caretColor: 'var(--fg)', padding: '10px 0' },
      '.cm-cursor, .cm-dropCursor': { borderLeftColor: 'var(--fg)' },
      '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
        backgroundColor: dark ? 'rgb(52 211 153 / 0.22) !important' : 'rgb(16 185 129 / 0.2) !important',
      },
      '.cm-gutters': { backgroundColor: 'transparent', color: 'var(--fg-subtle)', border: 'none' },
      '.cm-lineNumbers .cm-gutterElement': { padding: '0 12px 0 14px', minWidth: '3.2em' },
      '.cm-foldGutter .cm-gutterElement': { padding: '0 4px 0 0' },
      '.cm-matchingBracket': { backgroundColor: 'var(--muted)', outline: '1px solid var(--border-strong)' },
      '.cm-searchMatch': { backgroundColor: 'rgb(250 204 21 / 0.3)' },
      '.cm-panels': { backgroundColor: 'var(--surface)', color: 'var(--fg)', borderColor: 'var(--border)' },
      '.cm-tooltip': { backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--fg)' },
    },
    { dark }
  );

export default function SpecEditor({
  value,
  onChange,
  format,
  dark,
  onSubmit,
}: {
  value: string;
  onChange: (value: string) => void;
  format: SpecFormat;
  dark: boolean;
  onSubmit: () => void;
}) {
  const submitRef = useRef(onSubmit);
  submitRef.current = onSubmit;

  const extensions = useMemo(
    () => [
      format === 'json' ? json() : yaml(),
      baseTheme(dark),
      syntaxHighlighting(dark ? darkHighlight : lightHighlight),
      EditorView.contentAttributes.of({ 'aria-label': 'OpenAPI / Swagger schema editor' }),
      // Mod-Enter would insert a blank line; it generates instead
      Prec.highest(
        keymap.of([
          {
            key: 'Mod-Enter',
            run: () => {
              submitRef.current();
              return true;
            },
          },
        ])
      ),
    ],
    [format, dark]
  );

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={extensions}
      theme="none"
      height="100%"
      className="cm-host h-full"
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        highlightActiveLine: true,
        highlightActiveLineGutter: true,
        autocompletion: false,
        bracketMatching: true,
        closeBrackets: true,
        indentOnInput: true,
        searchKeymap: true,
      }}
      data-testid="spec-editor"
    />
  );
}
