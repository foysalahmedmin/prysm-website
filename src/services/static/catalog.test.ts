import { describe, expect, it } from 'vitest'
import { createStaticCatalogService } from './catalog'

const catalog = createStaticCatalogService()

describe('static catalog service', () => {
  it('finds a product by slug and returns null for an unknown slug', async () => {
    expect((await catalog.getProduct('silk-scarf'))?.id).toBe('p-006')
    expect(await catalog.getProduct('nope')).toBeNull()
  })

  it('lists every product slug', async () => {
    expect(await catalog.listProductSlugs()).toHaveLength(12)
  })

  it('returns products for the given ids', async () => {
    const found = await catalog.getProductsByIds(['p-001', 'p-009', 'missing'])
    expect(found.map((p) => p.id).sort()).toEqual(['p-001', 'p-009'])
  })

  it('returns related products without the product itself', async () => {
    const related = await catalog.getRelatedProducts('longline-coat', 3)
    expect(related).toHaveLength(3)
    expect(related.map((p) => p.slug)).not.toContain('longline-coat')
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
    expect((await catalog.getCollection('gifts'))?.name).toBe('Gifts')
    expect(await catalog.getCollection('nope')).toBeNull()
    expect(await catalog.listReviews('p-001')).toHaveLength(2)
  })
})
