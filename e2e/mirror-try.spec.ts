import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

// Chromium's built-in fake camera, so the trial runs without a real one or a permission prompt.
test.use({
  launchOptions: {
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  },
  permissions: ['camera'],
})

const blocking = async (page: import('@playwright/test').Page) => {
  const { violations } = await new AxeBuilder({ page }).analyze()
  return violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
}

test('the floating card opens Mirror Try without a product', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /^Virtual Trial/ }).click()

  const panel = page.getByRole('dialog', { name: 'Virtual Trial' })
  await expect(panel).toBeVisible()
  await expect(panel.getByRole('button', { name: 'Enable Camera' })).toBeVisible()
  expect(await blocking(page)).toEqual([])

  await panel.getByRole('button', { name: 'Minimize' }).click()
  await expect(panel).toBeHidden()
  await expect(page.getByRole('button', { name: /^Virtual Trial/ })).toBeVisible()
})

test('a product page trigger opens the trial for that piece and measures', async ({ page }) => {
  await page.goto('/shop')
  const href = await page.locator('a[href^="/products/"]').first().getAttribute('href')
  await page.goto(href!)

  const name = (await page.getByRole('heading', { level: 1 }).textContent())!.trim()
  await page
    .getByRole('button', { name: `Try on: ${name}` })
    .first()
    .click()

  const panel = page.getByRole('dialog', { name: 'Virtual Trial' })
  await expect(panel).toContainText(name)
  await panel.getByRole('button', { name: 'Enable Camera' }).click()
  await expect(panel.getByText(/Measuring Size \d+%/)).toBeVisible()
  await expect(panel.getByRole('button', { name: 'Add Custom Info' })).toBeVisible()
})

test('the plugin has its own account, and the demo login works', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /^Virtual Trial/ }).click()
  const panel = page.getByRole('dialog', { name: 'Virtual Trial' })

  await panel.getByRole('button', { name: 'Log in or sign up' }).click()
  await expect(panel.getByRole('button', { name: 'Continue with Google' })).toBeVisible()
  expect(await blocking(page)).toEqual([])

  await panel.getByLabel('Email/Phone Number').fill('john@gmail.com')
  await panel.getByLabel('Password', { exact: true }).fill('John123!')
  await panel.getByRole('button', { name: 'Login', exact: true }).click()

  await expect(panel.getByRole('heading', { name: 'John Doe' })).toBeVisible()
  await expect(panel.getByText('Your Trial History')).toBeVisible()
})
