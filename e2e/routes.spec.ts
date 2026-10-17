import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { routes, staticRoutes } from '../src/config/routes'
import { createStaticServices } from '../src/services/static'

const services = createStaticServices()

async function allRoutes(): Promise<string[]> {
  const [slugs, categories, collections, journal] = await Promise.all([
    services.catalog.listProductSlugs(),
    services.catalog.listCategories(),
    services.catalog.listCollections(),
    services.content.listJournal(),
  ])
  return [
    ...staticRoutes,
    routes.product(slugs[0]!),
    routes.category(categories[0]!.slug),
    routes.collection(collections[0]!.slug),
    routes.journalPost(journal[0]!.slug),
    routes.order('demo-order'),
  ]
}

test.describe('every route renders', () => {
  test('renders one h1 and one main landmark without runtime errors or serious a11y violations', async ({
    page,
  }) => {
    const paths = await allRoutes()
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))

    for (const path of paths) {
      const response = await page.goto(path)
      expect(response?.status(), path).toBe(200)
      await expect(page.getByRole('heading', { level: 1 }), path).toHaveCount(1)
      await expect(page.getByRole('main'), path).toHaveCount(1)

      const { violations } = await new AxeBuilder({ page }).analyze()
      const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
      expect(blocking.map((v) => `${path}: ${v.id}`)).toEqual([])
    }
    expect(errors).toEqual([])
  })
})

test.describe('unknown URLs', () => {
  // With Cache Components the static shell streams first, so unknown dynamic params respond 200.
  // Assert on the visible page and the noindex tag instead of the status code.
  for (const path of ['/products/does-not-exist', '/shop/shoes', '/no-such-page']) {
    test(`${path} shows the not-found page and is not indexable`, async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found')
      await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute(
        'content',
        /noindex/,
      )
    })
  }
})

test('robots.txt blocks crawlers while demo mode is on', async ({ request }) => {
  const body = await (await request.get('/robots.txt')).text()
  expect(body).toContain('Disallow: /')
})

test('sitemap lists product pages', async ({ request }) => {
  const body = await (await request.get('/sitemap.xml')).text()
  expect(body).toContain('/products/longline-coat')
})
