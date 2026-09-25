import { expect, test } from '@playwright/test';

test('skills page explains, installs and lists the skill', async ({ page }) => {
  await page.goto('/skills');
  await expect(page).toHaveTitle(/AI agent skill/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Teach your coding agent');
  for (const name of ['What is an agent skill?', 'What it covers', 'Install', 'Example prompts', "What's inside"]) {
    await expect(page.getByRole('heading', { name, exact: true, level: 2 })).toBeVisible();
  }

  // the README command
  await expect(page.getByTestId('skill-install-command')).toHaveText('npx skills add hunghg255/swagger-typescript-api-es');

  // highlighted install commands
  await expect(page.locator('pre.shiki').first()).toBeVisible();
  await expect(page.locator('pre.shiki span[style*="--shiki-dark"]').first()).toBeAttached();

  // links to GitHub
  await expect(page.getByRole('link', { name: 'Browse the skill on GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/hunghg255/swagger-typescript-api-es/tree/main/skills/swagger-typescript-api-es'
  );
  await expect(page.getByRole('link', { name: 'Read SKILL.md' })).toHaveAttribute('href', /skills\/swagger-typescript-api-es\/SKILL\.md$/);

  // file list read from the repository at build time
  const files = page.getByTestId('skill-files');
  await expect(files.getByRole('link', { name: /SKILL\.md/ })).toBeVisible();
  await expect(files.getByRole('link', { name: /references\// }).first()).toBeVisible();

  // collapsible SKILL.md preview
  const preview = page.getByTestId('skill-preview');
  await expect(preview.locator('.prose-docs')).toBeHidden();
  await preview.getByText('Preview SKILL.md').click();
  await expect(preview.locator('.prose-docs')).toBeVisible();
  await expect(preview.locator('.prose-docs')).toContainText('swagger-typescript-api-es');

  expect(await page.getByTestId('skill-prompts').getByRole('listitem').count()).toBeGreaterThanOrEqual(4);
});

test('skills page is reachable from the header and footer', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Skills' }).click();
  await expect(page).toHaveURL(/\/skills$/);
  await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Skills' })).toHaveAttribute(
    'aria-current',
    'page'
  );
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Usage' })).toHaveAttribute('href', '/usage');
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '/skills');
});

test('skills page has no horizontal scroll on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/skills');
  await expect(page.getByTestId('skill-install-command')).toBeVisible();
  const [scrollWidth, clientWidth] = await page.evaluate(() => [
    document.documentElement.scrollWidth,
    document.documentElement.clientWidth,
  ]);
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  // the current page link is scrolled into view in the compact header nav
  await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Skills' })).toBeInViewport();
});
