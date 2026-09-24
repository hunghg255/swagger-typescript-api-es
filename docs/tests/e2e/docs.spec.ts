import { expect, test } from '@playwright/test';

test('docs renders the README with headings, TOC and highlighted code', async ({ page }) => {
  await page.goto('/docs');
  await expect(page).toHaveTitle(/Documentation/);
  const content = page.getByTestId('docs-content');

  // README sections (the badges / table of contents are skipped)
  for (const name of ['Install', 'Config file', 'CLI', 'Options reference', 'Hooks']) {
    await expect(content.getByRole('heading', { name, exact: true, level: 2 })).toBeVisible();
  }
  await expect(content.getByRole('heading', { name: 'Table of contents' })).toHaveCount(0);
  await expect(page.locator('img[alt="NPM Version"]')).toHaveCount(0);

  // anchors from rehype-slug
  await expect(page.locator('h2#options-reference a[href="#options-reference"]')).toBeAttached();

  // right TOC + left sidebar
  const toc = page.getByTestId('docs-toc');
  await expect(toc).toBeVisible();
  await expect(toc.getByRole('link', { name: 'Programmatic API' })).toHaveAttribute('href', '#programmatic-api');
  await expect(page.getByRole('navigation', { name: 'Documentation sections' })).toBeVisible();

  // shiki server-side highlighting with dual themes
  const code = content.locator('pre.shiki').first();
  await expect(code).toBeVisible();
  expect(await content.locator('pre.shiki span[style*="--shiki-light"]').count()).toBeGreaterThan(20);

  // tables are wrapped in a scroll container
  await expect(content.locator('[role="region"] > table').first()).toBeVisible();
});

test('scrollspy marks the current section in the TOC', async ({ page }) => {
  await page.goto('/docs#hooks');
  const toc = page.getByTestId('docs-toc');
  await expect(toc.locator('a[aria-current="location"]')).toHaveText('Hooks');
});

test('docs link to the playground', async ({ page }) => {
  await page.goto('/docs');
  await page.getByRole('link', { name: 'Try it in the playground' }).click();
  await expect(page).toHaveURL(/\/playground/);
});

test('mobile docs navigation opens and jumps to a section', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/docs');
  await expect(page.getByTestId('docs-toc')).toBeHidden();
  await page.getByRole('button', { name: /Menu/ }).click();
  const menu = page.locator('#docs-mobile-nav');
  await expect(menu).toBeVisible();
  await menu.getByRole('link', { name: 'Formatting' }).click();
  await expect(page).toHaveURL(/#formatting$/);
  await expect(menu).toBeHidden();
});
