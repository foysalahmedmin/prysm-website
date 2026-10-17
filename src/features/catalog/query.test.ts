import { describe, expect, it } from 'vitest'
import { products } from '@/data/products'
import { computeFacets, isOnSale, listProducts } from './query'

const names = (list: ReturnType<typeof listProducts>) => list.page.items.map((p) => p.name)

describe('listProducts', () => {
  it('returns every product on one page by default', () => {
    const result = listProducts(products)
    expect(result.page.total).toBe(12)
    expect(result.page.items).toHaveLength(12)
    expect(result.page.pageCount).toBe(1)
  })

  it('filters by category', () => {
    const result = listProducts(products, { category: 'jewelry' })
    expect(result.page.total).toBe(2)
    expect(result.page.items.every((p) => p.category === 'jewelry')).toBe(true)
  })

  it('filters by collection', () => {
    expect(names(listProducts(products, { collection: 'gifts' }))).toContain('Silk Scarf')
  })

  it('searches every term across name, tags and materials', () => {
    expect(names(listProducts(products, { q: 'silk' }))).toEqual(['Silk Scarf'])
    expect(listProducts(products, { q: 'silk scarf' }).page.total).toBe(1)
    expect(listProducts(products, { q: 'nonexistent' }).page.total).toBe(0)
  })

  it('narrows by size using in-stock variants only', () => {
    const result = listProducts(products, { sizes: ['XL'] })
    expect(result.page.items.length).toBeGreaterThan(0)
    expect(result.page.items.every((p) => p.optionGroups.some((g) => g.key === 'size'))).toBe(true)
  })

  it('narrows by colour using in-stock variants only', () => {
    const result = listProducts(products, { colors: ['Sand'] })
    expect(result.page.total).toBeGreaterThan(0)
    expect(
      result.page.items.every((p) =>
        p.variants.some((v) => v.stock > 0 && v.options.color === 'Sand'),
      ),
    ).toBe(true)
  })

  it('applies an inclusive price range', () => {
    const result = listProducts(products, { minPrice: 12000, maxPrice: 14000 })
    expect(result.page.items.every((p) => p.price >= 12000 && p.price <= 14000)).toBe(true)
    expect(names(result)).toEqual(
      expect.arrayContaining(['Hoop Earrings', 'Linen Shirt', 'Merino Sweater']),
    )
  })

  it('keeps only sale products when onSale is set', () => {
    const result = listProducts(products, { onSale: true })
    expect(result.page.items.every(isOnSale)).toBe(true)
    expect(result.page.total).toBe(2)
  })

  it('sorts by price in both directions', () => {
    const asc = listProducts(products, { sort: 'price-asc' }).page.items.map((p) => p.price)
    const desc = listProducts(products, { sort: 'price-desc' }).page.items.map((p) => p.price)
    expect(asc).toEqual([...asc].sort((a, b) => a - b))
    expect(desc).toEqual([...desc].sort((a, b) => b - a))
  })

  it('sorts newest first', () => {
    const dates = listProducts(products, { sort: 'newest' }).page.items.map((p) => p.createdAt)
    expect(dates).toEqual([...dates].sort().reverse())
  })

  it('puts featured products first by default', () => {
    const items = listProducts(products).page.items
    const firstNonFeatured = items.findIndex((p) => !p.featured)
    expect(items.slice(firstNonFeatured).some((p) => p.featured)).toBe(false)
  })

  it('paginates and clamps an out-of-range page', () => {
    const second = listProducts(products, { pageSize: 5, page: 2 })
    expect(second.page.items).toHaveLength(5)
    expect(second.page.pageCount).toBe(3)

    const clamped = listProducts(products, { pageSize: 5, page: 99 })
    expect(clamped.page.page).toBe(3)
    expect(clamped.page.items).toHaveLength(2)
  })

  it('reports one page for an empty result', () => {
    const result = listProducts(products, { q: 'nonexistent' })
    expect(result.page).toMatchObject({ total: 0, page: 1, pageCount: 1, items: [] })
  })

  it('computes facets inside the scope, ignoring shopper filters', () => {
    const result = listProducts(products, { category: 'clothing', sizes: ['XL'] })
    expect(result.facets.subcategories.map((s) => s.slug).sort()).toEqual([
      'knitwear',
      'outerwear',
      'sweatshirts',
      'tops',
      'trousers',
    ])
  })
})

describe('computeFacets', () => {
  it('collects sizes, colours with swatches and the price range', () => {
    const facets = computeFacets(products)
    expect(facets.sizes).toEqual(expect.arrayContaining(['XS', 'XL']))
    expect(facets.colors).toEqual(expect.arrayContaining([{ value: 'Slate', swatch: '#4b5563' }]))
    expect(facets.priceRange).toEqual({ min: 4800, max: 42000 })
  })

  it('returns a zero range for no products', () => {
    expect(computeFacets([]).priceRange).toEqual({ min: 0, max: 0 })
  })
})
