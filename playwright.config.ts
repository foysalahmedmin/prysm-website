import { defineConfig, devices } from '@playwright/test'

// Each store uses its own e2e port so the three projects can be tested at the same time.
const PORT = Number(process.env.E2E_PORT ?? 3101)
const command = process.env.E2E_DEV
  ? `pnpm exec next dev -p ${PORT}`
  : `pnpm build && pnpm exec next start -p ${PORT}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  // Visual snapshot tests are tagged @visual and only run through `pnpm e2e:visual`.
  grepInvert: process.env.E2E_VISUAL ? undefined : /@visual/,
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled' } },
  // Reduced motion keeps scans deterministic: nothing is mid-fade when axe measures contrast.
  use: { baseURL: `http://localhost:${PORT}`, trace: 'on-first-retry', reducedMotion: 'reduce' },
  webServer: {
    command,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
})
