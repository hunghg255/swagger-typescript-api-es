import { expect, test } from '@playwright/test';

test('usage guide renders sections, TOC and highlighted code', async ({ page }) => {
  await page.goto('/usage');
  await expect(page).toHaveTitle(/Using the generated client/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Using the generated client');
  const content = page.getByTestId('usage-content');

  for (const name of [
    'Generate the client',
    'Create a client',
    'Call endpoints',
    'Headers and auth',
    'Share one HttpClient',
    'Modular output',
    'Responses and errors',
    'Cancel requests',
    'Upload and download files',
    'Custom fetch',
    'React Query and SWR',
    'Node.js',
    'Typing tips',
  ]) {
    await expect(content.getByRole('heading', { name, exact: true, level: 2 })).toBeVisible();
  }
  await expect(page.locator('h3#inject-headers a[href="#inject-headers"]')).toBeAttached();

  // examples use the real generated method names
  await expect(content).toContainText('api.pets.listPets');
  await expect(content).toContainText('setSecurityData');

  // shiki server-side highlighting
  await expect(content.locator('pre.shiki').first()).toBeVisible();
  expect(await content.locator('pre.shiki span[style*="--shiki-light"]').count()).toBeGreaterThan(50);

  const toc = page.getByTestId('docs-toc');
  await expect(toc.getByRole('link', { name: 'Tokens with securityWorker' })).toHaveAttribute('href', '#security-worker');
  await expect(page.getByRole('navigation', { name: 'Usage sections' })).toBeVisible();
});

test('fetch / axios tabs switch every example at once', async ({ page }) => {
  await page.goto('/usage');
  const tabs = page.getByTestId('client-tabs');
  const first = tabs.first();
  await expect(first.locator('[data-client="fetch"]')).toBeVisible();
  await expect(first.locator('[data-client="axios"]')).toBeHidden();

  await first.getByRole('radio', { name: 'axios' }).click();
  for (const block of await tabs.all()) {
    await expect(block.locator('[data-client="axios"]')).toBeVisible();
    await expect(block.locator('[data-client="fetch"]')).toBeHidden();
  }
  await expect(first.locator('[data-client="axios"]')).toContainText('timeout');
});

test('header and docs page link to the usage guide', async ({ page }) => {
  await page.goto('/docs');
  // the button of the page header (the README also has a section with that name)
  await page.locator('main header').getByRole('link', { name: 'Using the generated client' }).click();
  await expect(page).toHaveURL(/\/usage$/);
  const nav = page.getByRole('navigation', { name: 'Main' });
  await expect(nav.getByRole('link', { name: 'Usage' })).toHaveAttribute('aria-current', 'page');
  await expect(nav.getByRole('link')).toHaveText(['Docs', 'Usage', 'Playground', 'Benchmark', 'Skills']);
});

test('usage guide has no horizontal scroll on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/usage');
  await expect(page.getByTestId('docs-toc')).toBeHidden();
  const [scrollWidth, clientWidth] = await page.evaluate(() => [
    document.documentElement.scrollWidth,
    document.documentElement.clientWidth,
  ]);
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  await page.getByRole('button', { name: /Menu/ }).click();
  await page.locator('#docs-mobile-nav').getByRole('link', { name: 'Cancel requests' }).click();
  await expect(page).toHaveURL(/#cancellation$/);
});
