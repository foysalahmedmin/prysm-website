import { expect, test } from '@playwright/test'

// Needs, in the style guide's Surfaces section:
//   <div className="light-field" data-ds-surface="light-field" aria-hidden="true"><i /><i /><i /><i /></div>
//   <div className="glass glass-strong" data-ds-surface="glass">…</div>

test('the light field drifts by default and stops under reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/design-system')
  const field = page.locator('[data-ds-surface="light-field"] i').first()
  expect(await field.evaluate((el) => getComputedStyle(el).animationName)).toBe('light-drift')

  await page.emulateMedia({ reducedMotion: 'reduce' })
  expect(await field.evaluate((el) => getComputedStyle(el).animationName)).toBe('none')
})

test('glass keeps a real border in forced-colors mode', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await page.goto('/design-system')
  const glass = page.locator('[data-ds-surface="glass"]').first()
  expect(await glass.evaluate((el) => getComputedStyle(el).borderTopWidth)).toBe('1px')
})
