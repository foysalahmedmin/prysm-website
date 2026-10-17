import { expect, test } from '@playwright/test'

// Guards against unintended visual change in the style guide. Run with `pnpm e2e:visual`.
// Snapshots are per operating system; update them with `pnpm e2e:visual --update-snapshots`
// only when a design change is intended.
test.use({ reducedMotion: 'reduce' })

test('style guide looks as intended @visual', async ({ page }) => {
  await page.goto('/design-system')
  await page.evaluate(() => document.fonts.ready)
  await expect(page).toHaveScreenshot('design-system.png', { fullPage: true })
})
