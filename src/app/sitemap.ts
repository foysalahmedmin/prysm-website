import type { MetadataRoute } from 'next'
import { env } from '@/config/env'
import { routes, staticRoutes } from '@/config/routes'
import { services } from '@/services'

/** Pages that are not meant to be indexed: search, transactional and per-customer screens. */
const EXCLUDED = new Set<string>([
  routes.search,
  routes.trackOrder,
  routes.cart,
  routes.checkout,
  routes.checkoutSuccess,
  routes.wishlist,
  routes.login,
  routes.register,
  routes.forgotPassword,
  routes.account,
  routes.orders,
  routes.addresses,
  routes.profile,
])

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productSlugs, categories, collections, journal] = await Promise.all([
    services.catalog.listProductSlugs(),
    services.catalog.listCategories(),
    services.catalog.listCollections(),
    services.content.listJournal(),
  ])

  const paths = [
    ...staticRoutes.filter((path) => !EXCLUDED.has(path)),
    ...productSlugs.map(routes.product),
    ...categories.map((category) => routes.category(category.slug)),
    ...collections.map((collection) => routes.collection(collection.slug)),
    ...journal.map((post) => routes.journalPost(post.slug)),
  ]
  return paths.map((path) => ({ url: `${env.siteUrl}${path === '/' ? '' : path}` }))
}
