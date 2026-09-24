import 'server-only';

import { readRepoFile } from '@/components/repo-files';

export interface ReadmeContent {
  /** intro paragraph (markdown) shown in the page header */
  intro: string;
  /** body markdown, starting at the first `##` section */
  body: string;
}

const FALLBACK: ReadmeContent = {
  intro: 'Generate a fully typed TypeScript API client from an OpenAPI 3 or Swagger 2 schema.',
  body: '## Documentation unavailable\n\nThe repository README could not be found at build time. See the [README on GitHub](https://github.com/hunghg255/swagger-typescript-api-es#readme).',
};

/** Reads the repository README and strips the parts that do not fit a website. */
export function loadReadme(): ReadmeContent {
  const raw = readRepoFile('README.md', '## Options reference');
  if (!raw) return FALLBACK;
  const text = raw.replace(/\r\n/g, '\n');

  const firstSection = text.search(/^## /m);
  if (firstSection === -1) return { intro: '', body: text };

  // the header is a logo + badges HTML block followed by a short intro paragraph
  const header = text.slice(0, firstSection);
  const intro = header
    .replace(/<p[\s\S]*?<\/p>/g, '')
    .replace(/<[^>]+>/g, '')
    .trim();

  let body = text.slice(firstSection);
  // the site renders its own navigation, so drop the "Table of contents" section
  body = body.replace(/^## Table of contents\n[\s\S]*?(?=^## )/m, '');

  return { intro, body };
}
