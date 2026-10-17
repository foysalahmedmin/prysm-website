import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('style guide renders every section, is not indexable, and has no serious a11y violations', async ({
  page,
}) => {
  await page.goto('/design-system')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Design system')
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute('content', /noindex/)

  const sections = page.locator('[data-ds-section]')
  expect(await sections.count()).toBe(13)
  for (const section of await sections.all()) await expect(section).toBeVisible()

  const { violations } = await new AxeBuilder({ page }).analyze()
  const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
  expect(blocking.map((v) => v.id)).toEqual([])
})

test('dialog opens from the style guide and closes with Escape', async ({ page }) => {
  await page.goto('/design-system')
  await page.getByRole('button', { name: 'Open dialog' }).click()
  await expect(page.getByRole('dialog', { name: 'Example dialog' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()
})
