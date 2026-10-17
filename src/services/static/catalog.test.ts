import { describe, expect, it } from 'vitest'
import { createStaticCatalogService } from './catalog'

const catalog = createStaticCatalogService()

describe('static catalog service', () => {
  it('finds a product by slug and returns null for an unknown slug', async () => {
    const slugs = await catalog.listProductSlugs()
    const first = await catalog.getProduct(slugs[0]!)
    expect(first?.slug).toBe(slugs[0])
    expect(await catalog.getProduct('nope')).toBeNull()
  })

  it('lists every product slug', async () => {
    expect((await catalog.listProductSlugs()).length).toBeGreaterThanOrEqual(12)
  })

  it('returns products for the given ids', async () => {
    const slugs = await catalog.listProductSlugs()
    const p1 = (await catalog.getProduct(slugs[0]!))!
    const p2 = (await catalog.getProduct(slugs[1]!))!
    const found = await catalog.getProductsByIds([p1.id, p2.id, 'missing'])
    expect(found.map((p) => p.id).sort()).toEqual([p1.id, p2.id].sort())
  })

  it('returns related products without the product itself', async () => {
    const slugs = await catalog.listProductSlugs()
    const related = await catalog.getRelatedProducts(slugs[0]!, 3)
    expect(related.length).toBeGreaterThanOrEqual(1)
    expect(related.map((p) => p.slug)).not.toContain(slugs[0])
  })

  it('returns no related products for an unknown slug', async () => {
    expect(await catalog.getRelatedProducts('nope')).toEqual([])
  })

  it('reads categories, collections and reviews', async () => {
    expect((await catalog.listCategories()).map((c) => c.slug)).toEqual([
      'clothing',
      'accessories',
      'jewelry',
    ])
    const collections = await catalog.listCollections()
    expect(collections.length).toBeGreaterThanOrEqual(1)
    expect((await catalog.getCollection(collections[0]!.slug))?.name).toBe(collections[0]!.name)
    expect(await catalog.getCollection('nope')).toBeNull()
    expect(Array.isArray(await catalog.listReviews('p-001'))).toBe(true)
  })
})
