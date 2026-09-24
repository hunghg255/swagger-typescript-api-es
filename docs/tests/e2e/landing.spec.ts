import { expect, test } from '@playwright/test';

test('landing page renders hero, install command, features and code', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/swagger-typescript-api-es/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Typed API clients');
  await expect(page.getByTestId('install-command')).toHaveText('npm i -D swagger-typescript-api-es');
  await expect(page.getByRole('heading', { name: 'Everything a real-world API needs' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Modular output', level: 3 })).toBeVisible();
  // shiki highlighted example
  await expect(page.locator('.shiki').first()).toBeVisible();
  await expect(page.locator('.shiki span[style*="--shiki-dark"]').first()).toBeAttached();
  // footer links
  const footer = page.getByRole('contentinfo');
  await expect(footer.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/hunghg255/swagger-typescript-api-es'
  );
  await expect(footer).toContainText('MIT');
});

test('landing CTAs navigate to docs and playground', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Read the docs' }).click();
  await expect(page).toHaveURL(/\/docs$/);
  await page.goto('/');
  await page.getByRole('link', { name: 'Open playground' }).click();
  await expect(page).toHaveURL(/\/playground/);
});

test('unknown routes render the 404 page', async ({ page }) => {
  const response = await page.goto('/does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('not in the spec');
});
