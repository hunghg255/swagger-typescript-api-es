import { describe, expect, it, vi } from 'vitest';

import { TEMPLATES_DIR } from '../../src/constants';
import { TemplatesWorker } from '../../src/templates-worker';

const createWorker = (pathIsExist: (path: string) => boolean) =>
  new TemplatesWorker({
    config: { modular: false, templates: '' } as any,
    logger: { log: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() } as any,
    fileSystem: { pathIsExist, getFileContent: () => '' } as any,
    getRenderTemplateData: () => ({}) as any,
  });

describe('TemplatesWorker built-in templates directory', () => {
  it('resolves the built-in templates', () => {
    const paths = createWorker(() => true).getTemplatePaths({ modular: false, templates: '' });
    expect(paths.base).toContain(TEMPLATES_DIR);
  });

  it('throws a clear error instead of generating empty files when they are missing', () => {
    expect(() =>
      createWorker(() => false).getTemplatePaths({ modular: false, templates: '' })
    ).toThrow(/Built-in templates were not found/);
  });
});
