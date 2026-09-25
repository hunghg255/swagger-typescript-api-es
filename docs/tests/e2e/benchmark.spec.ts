import fs from 'node:fs';

import { expect, test } from '@playwright/test';

const results = JSON.parse(
  fs.readFileSync(new URL('../../lib/benchmark/results.json', import.meta.url), 'utf8')
);

test('benchmark page shows the headline numbers, the chart and every result', async ({ page }) => {
  await page.goto('/benchmark');
  await expect(page).toHaveTitle(/Benchmark/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'swagger-typescript-api-es vs swagger-typescript-api'
  );

  // headline tiles
  const headline = page.getByRole('region', { name: 'Headline results' });
  await expect(headline).toContainText('faster');
  await expect(headline).toContainText('less');

  // legend names both libraries with their versions
  const legend = page.getByRole('list', { name: 'Legend' });
  await expect(legend).toContainText(`v${results.libraries.es.version}`);
  await expect(legend).toContainText(`v${results.libraries.original.version}`);

  // one figure per document, two bars per scenario
  await expect(page.getByRole('figure')).toHaveCount(Object.keys(results.documents).length);
  await expect(page.getByRole('img', { name: /^swagger-typescript-api-es: / })).toHaveCount(
    results.results.length
  );

  // every scenario is in the table
  const rows = page.getByRole('table').locator('tbody tr');
  await expect(rows).toHaveCount(results.results.length);

  // environment + reproduce command
  await expect(page.getByText(results.environment.node).first()).toBeVisible();
  await expect(page.getByText('npm run bench:compare').first()).toBeVisible();
});

test('the metric switch changes the chart', async ({ page }) => {
  await page.goto('/benchmark');
  const chartHeading = page.locator('#chart-heading');
  await expect(chartHeading).toContainText('Generation time');
  await page.getByRole('radio', { name: 'Cold run' }).click();
  await expect(chartHeading).toContainText('Cold run');
  await page.getByRole('radio', { name: 'Memory' }).click();
  await expect(chartHeading).toContainText('Peak memory');
  await expect(page.getByText('less memory').first()).toBeVisible();
});

test('bars have a tooltip on keyboard focus', async ({ page }) => {
  await page.goto('/benchmark');
  const bar = page.getByRole('img', { name: /^swagger-typescript-api-es: / }).first();
  await bar.focus();
  await expect(page.getByRole('tooltip').filter({ visible: true }).first()).toContainText(
    'swagger-typescript-api-es'
  );
});

test('benchmark is linked from the header', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Benchmark' }).click();
  await expect(page).toHaveURL(/\/benchmark$/);
});

test.describe('mobile', () => {
  test.use({ viewport: { width: 375, height: 740 }, hasTouch: true, isMobile: true });
  test('no horizontal scroll on /benchmark', async ({ page }) => {
    await page.goto('/benchmark');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
