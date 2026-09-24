import { existsSync } from 'node:fs';

import { defineConfig, devices } from '@playwright/test';

/**
 * E2E tests run against a production build (`next build` + `next start`).
 * - `E2E_BASE_URL` targets an already running server instead (no webServer).
 * - `E2E_SKIP_BUILD=1` skips `next build` (e.g. CI after a separate build step).
 * - `E2E_DEV=1` uses `next dev` instead.
 * The root library must be built first (`npm run build` in the repo root).
 */
const PORT = Number(process.env.E2E_PORT ?? 4317);
const baseURL = process.env.E2E_BASE_URL ?? `http://127.0.0.1:${PORT}`;

// sandboxes ship a pre-installed Chromium that may not match this Playwright version
const LOCAL_CHROMIUM = '/opt/pw-browsers/chromium';
const executablePath =
  process.env.PLAYWRIGHT_CHROMIUM_PATH ?? (existsSync(LOCAL_CHROMIUM) ? LOCAL_CHROMIUM : undefined);

const serverCommand = process.env.E2E_DEV
  ? `npx next dev -p ${PORT}`
  : `${process.env.E2E_SKIP_BUILD ? '' : 'npx next build && '}npx next start -p ${PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  timeout: 45_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL,
    trace: 'retain-on-failure',
    launchOptions: executablePath ? { executablePath } : {},
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } }],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: serverCommand,
        url: baseURL,
        timeout: 240_000,
        reuseExistingServer: !process.env.CI,
        stdout: 'ignore',
        stderr: 'pipe',
      },
});
