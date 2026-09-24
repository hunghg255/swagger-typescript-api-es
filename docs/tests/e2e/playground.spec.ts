import { readFile } from 'node:fs/promises';

import { expect, type Page, test } from '@playwright/test';
import JSZip from 'jszip';

// the API rate-limits per client IP (`x-real-ip`); give every test its own "client"
test.beforeEach(async ({ context }, testInfo) => {
  await context.setExtraHTTPHeaders({ 'x-real-ip': `e2e-${testInfo.testId}-${testInfo.retry}` });
});

async function openPlayground(page: Page, query = '') {
  await page.goto(`/playground${query}`);
  // the default example is generated on first load
  await expect(page.getByTestId('output-status')).toContainText(/\d+ files? ·/);
}

async function selectExample(page: Page, id: string) {
  await page.getByTestId('examples-button').click();
  await page.getByTestId(`example-${id}`).click();
}

async function generateAndWait(page: Page) {
  const response = page.waitForResponse((r) => r.url().endsWith('/api/generate') && r.request().method() === 'POST');
  await page.getByTestId('generate').click();
  await response;
  await expect(page.getByTestId('generate')).toBeEnabled();
}

async function setEditorText(page: Page, text: string) {
  const content = page.locator('.cm-content');
  await content.click();
  await page.keyboard.press('ControlOrMeta+A');
  await page.keyboard.press('Delete');
  await page.keyboard.insertText(text);
}

test.describe('playground', () => {
  test('generates, previews, copies and downloads the Petstore client', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await openPlayground(page);

    await selectExample(page, 'petstore');
    await expect(page.getByTestId('examples-button')).toContainText('Petstore');
    await generateAndWait(page);

    // single file output
    await expect(page.getByTestId('file-tab')).toHaveText(['Api.ts']);
    const viewer = page.getByTestId('code-viewer');
    await expect(viewer).toContainText('export class Api');
    await expect(viewer.locator('pre.shiki span[style*="--shiki-light"]').first()).toBeAttached();
    await expect(page.getByTestId('output-status')).toContainText(/1 file · .* · \d+ ms/);

    // copy
    await page.getByRole('button', { name: 'Copy Api.ts' }).click();
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toContain('export class Api');

    // download the current file
    const [download] = await Promise.all([page.waitForEvent('download'), page.getByTestId('download-file').click()]);
    expect(download.suggestedFilename()).toBe('Api.ts');
    const path = await download.path();
    expect(await readFile(path, 'utf8')).toContain('export class Api');
  });

  test('modular output lists several files and downloads them as a zip', async ({ page }) => {
    await openPlayground(page, '?example=petstore');

    await page.getByTestId('opt-modular').click();
    await expect(page.getByTestId('opt-modular')).toHaveAttribute('aria-checked', 'true');
    await generateAndWait(page);

    const list = page.getByTestId('file-list');
    await expect(list).toContainText('data-contracts.ts');
    await expect(list).toContainText('http-client.ts');
    const count = await list.getByRole('button').count();
    expect(count).toBeGreaterThan(2);

    // open another file from the list: it becomes the active tab
    await list.getByRole('button', { name: /data-contracts\.ts/ }).click();
    await expect(page.getByRole('tab', { selected: true })).toHaveText('data-contracts.ts');
    await expect(page.getByTestId('code-viewer')).toContainText('export interface Pet');

    const [download] = await Promise.all([page.waitForEvent('download'), page.getByTestId('download-zip').click()]);
    expect(download.suggestedFilename()).toBe('petstore.zip');
    const zip = await JSZip.loadAsync(await readFile(await download.path()));
    const names = Object.keys(zip.files);
    expect(names).toContain('data-contracts.ts');
    expect(names).toContain('http-client.ts');
    expect(names.length).toBe(count);
    expect(await zip.file('http-client.ts')!.async('string')).toContain('class HttpClient');

    // the options are shareable through the URL
    await expect(page).toHaveURL(/modular=1/);
    await expect(page).toHaveURL(/example=petstore/);
  });

  test('options from the URL are applied and shown in the config snippet', async ({ page }) => {
    await openPlayground(page, '?example=minimal&httpClientType=axios&extractEnums=1');
    await expect(page.getByTestId('http-client-axios')).toHaveAttribute('aria-checked', 'true');
    await expect(page.getByTestId('code-viewer')).toContainText('axios');

    await page.getByTestId('show-config').click();
    const dialog = page.getByTestId('config-dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("httpClientType: 'axios'");
    await expect(dialog).toContainText('extractEnums: true');
    await dialog.getByRole('radio', { name: 'CLI' }).click();
    await expect(dialog).toContainText('--httpClientType axios');
    await expect(dialog).toContainText('--extract-enums');
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test('Swagger 2 example is converted and generated', async ({ page }) => {
    await openPlayground(page);
    await selectExample(page, 'swagger2');
    await expect(page.getByTestId('spec-format')).toHaveText('yaml');
    await generateAndWait(page);
    await expect(page.getByTestId('code-viewer')).toContainText('export class Api');
  });

  test('invalid spec shows a friendly error', async ({ page }) => {
    await openPlayground(page);
    await setEditorText(page, '{ "openapi": "3.0.0", "info": ');
    await generateAndWait(page);
    const error = page.getByTestId('generate-error');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Generation failed');
  });

  test('Ctrl/Cmd+Enter generates from the editor', async ({ page }) => {
    await openPlayground(page);
    await setEditorText(
      page,
      'openapi: 3.0.0\ninfo:\n  title: Shortcut API\n  version: "1"\npaths:\n  /ping:\n    get:\n      operationId: ping\n      responses:\n        "200":\n          description: ok\n'
    );
    const response = page.waitForResponse((r) => r.url().endsWith('/api/generate'));
    await page.keyboard.press('ControlOrMeta+Enter');
    await response;
    await expect(page.getByTestId('code-viewer')).toContainText('ping');
    await expect(page.getByTestId('examples-button')).not.toContainText('Petstore');
  });

  test('uploading an oversized file is rejected client-side', async ({ page }) => {
    await openPlayground(page);
    await page.getByTestId('source-upload').click();
    await page.getByTestId('file-input').setInputFiles({
      name: 'huge.json',
      mimeType: 'application/json',
      buffer: Buffer.alloc(3 * 1024 * 1024 + 10, 32),
    });
    await expect(page.getByTestId('generate-error')).toContainText('accepts up to');
  });

  test('uploading a schema loads it into the editor and generates', async ({ page }) => {
    await openPlayground(page);
    await page.getByTestId('source-upload').click();
    const spec = await readFile(new URL('../../public/examples/minimal.yaml', import.meta.url), 'utf8');
    await page.getByTestId('file-input').setInputFiles({
      name: 'todo.yaml',
      mimeType: 'application/yaml',
      buffer: Buffer.from(spec),
    });
    await expect(page.getByTestId('toast')).toContainText('Loaded todo.yaml');
    await expect(page.locator('.cm-content')).toContainText('Todo API');
    await expect(page.getByTestId('code-viewer')).toContainText('listTodos');
  });

  test('persists the schema and options across reloads', async ({ page }) => {
    await openPlayground(page, '?example=minimal');
    await page.getByTestId('opt-sortTypes').click();
    await page.waitForTimeout(700); // debounced persistence
    await page.goto('/playground');
    await expect(page.getByTestId('opt-sortTypes')).toHaveAttribute('aria-checked', 'true');
    await expect(page.locator('.cm-content')).toContainText('Todo API');
  });
});

test('theme toggle switches and persists the theme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/playground');
  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-theme', 'light');
  await page.getByTestId('theme-toggle').click();
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await page.getByTestId('theme-toggle').click();
  await expect(html).toHaveAttribute('data-theme', 'light');
});

test('follows the system color scheme by default', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test.describe('mobile', () => {
  test.use({ viewport: { width: 375, height: 740 }, hasTouch: true, isMobile: true });

  for (const path of ['/', '/docs', '/playground']) {
    test(`no horizontal scroll on ${path}`, async ({ page }) => {
      await page.goto(path);
      if (path === '/playground') {
        await expect(page.getByTestId('output-status')).toContainText(/files? ·/);
      }
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test('options open in a drawer on mobile', async ({ page }) => {
    await page.goto('/playground');
    await page.getByTestId('options-toggle').click();
    const drawer = page.getByRole('dialog', { name: 'Generator options' });
    await expect(drawer).toBeVisible();
    await drawer.getByTestId('opt-modular').click();
    await drawer.getByRole('button', { name: 'Generate' }).click();
    await expect(drawer).toBeHidden();
    await expect(page.getByTestId('output-status')).toContainText(/\d+ files ·/);
  });
});
