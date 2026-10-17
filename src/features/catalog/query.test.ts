import { describe, expect, it } from 'vitest'
import type { Product } from '@/domain'
import { computeFacets, isOnSale, listProducts } from './query'

const testProducts: Product[] = [
  {
    id: 'p-001',
    slug: 'wool-coat',
    name: 'Wool Coat',
    summary: 'Tailored wool coat',
    description: 'Tailored wool coat',
    details: ['Tailored fit'],
    category: 'clothing',
    subcategory: 'outerwear',
    collectionSlugs: [],
    price: 42000,
    featured: true,
    badges: ['new'],
    rating: { average: 4.8, count: 12 },
    media: [{ src: '/coat.jpg', alt: 'Wool Coat', width: 800, height: 1000 }],
    optionGroups: [
      { key: 'size', label: 'Size', kind: 'size', values: [{ value: 'S' }, { value: 'XL' }] },
      {
        key: 'color',
        label: 'Colour',
        kind: 'color',
        values: [{ value: 'Slate', swatch: '#4b5563' }],
      },
    ],
    variants: [
      {
        id: 'p-001-v1',
        sku: 'p-001-sku-1',
        price: 42000,
        stock: 5,
        options: { size: 'S', color: 'Slate' },
      },
      {
        id: 'p-001-v2',
        sku: 'p-001-sku-2',
        price: 42000,
        stock: 3,
        options: { size: 'XL', color: 'Slate' },
      },
    ],
    materials: '100% Wool',
    care: ['Dry clean'],
    tags: ['coat', 'outerwear'],
    createdAt: '2026-02-01T00:00:00Z',
  },
  {
    id: 'p-002',
    slug: 'silk-scarf',
    name: 'Silk Scarf',
    summary: 'Pure silk foulard',
    description: 'Pure silk foulard',
    details: ['Hand rolled edges'],
    category: 'accessories',
    subcategory: 'scarves',
    collectionSlugs: ['gifts'],
    price: 9500,
    featured: true,
    badges: [],
    rating: { average: 4.9, count: 8 },
    media: [{ src: '/scarf.jpg', alt: 'Silk Scarf', width: 800, height: 1000 }],
    optionGroups: [
      {
        key: 'color',
        label: 'Colour',
        kind: 'color',
        values: [{ value: 'Sand', swatch: '#e5d3b3' }],
      },
    ],
    variants: [
      { id: 'p-002-v1', sku: 'p-002-sku-1', price: 9500, stock: 8, options: { color: 'Sand' } },
    ],
    materials: '100% Silk',
    care: ['Dry clean'],
    tags: ['silk', 'scarf', 'gifts'],
    createdAt: '2026-01-15T00:00:00Z',
  },
  {
    id: 'p-003',
    slug: 'merino-sweater',
    name: 'Merino Sweater',
    summary: 'Fine merino knit',
    description: 'Fine merino knit',
    details: ['Ribbed trim'],
    category: 'clothing',
    subcategory: 'knitwear',
    collectionSlugs: [],
    price: 12800,
    compareAtPrice: 15800,
    featured: false,
    badges: ['sale'],
    rating: { average: 4.5, count: 15 },
    media: [{ src: '/sweater.jpg', alt: 'Merino Sweater', width: 800, height: 1000 }],
    optionGroups: [
      { key: 'size', label: 'Size', kind: 'size', values: [{ value: 'XS' }, { value: 'XL' }] },
      {
        key: 'color',
        label: 'Colour',
        kind: 'color',
        values: [{ value: 'Slate', swatch: '#4b5563' }],
      },
    ],
    variants: [
      {
        id: 'p-003-v1',
        sku: 'p-003-sku-1',
        price: 12800,
        stock: 4,
        options: { size: 'XS', color: 'Slate' },
      },
      {
        id: 'p-003-v2',
        sku: 'p-003-sku-2',
        price: 12800,
        stock: 0,
        options: { size: 'XL', color: 'Slate' },
      },
    ],
    materials: '100% Merino Wool',
    care: ['Hand wash'],
    tags: ['knitwear', 'sale'],
    createdAt: '2026-01-10T00:00:00Z',
  },
  {
    id: 'p-004',
    slug: 'gold-signet-ring',
    name: 'Gold Signet Ring',
    summary: 'Solid gold signet ring',
    description: 'Solid gold signet ring',
    details: ['Solid 18k gold'],
    category: 'jewelry',
    subcategory: 'rings',
    collectionSlugs: [],
    price: 35000,
    featured: false,
    badges: [],
    rating: { average: 5.0, count: 4 },
    media: [{ src: '/ring.jpg', alt: 'Gold Signet Ring', width: 800, height: 1000 }],
    optionGroups: [],
    variants: [{ id: 'p-004-v1', sku: 'p-004-sku-1', price: 35000, stock: 2, options: {} }],
    materials: '18k Gold',
    care: ['Polish with cloth'],
    tags: ['ring', 'jewelry'],
    createdAt: '2026-01-05T00:00:00Z',
  },
  {
    id: 'p-005',
    slug: 'hoop-earrings',
    name: 'Hoop Earrings',
    summary: 'Classic gold hoops',
    description: 'Classic gold hoops',
    details: ['Snap closure'],
    category: 'jewelry',
    subcategory: 'earrings',
    collectionSlugs: [],
    price: 13500,
    compareAtPrice: 16000,
    featured: false,
    badges: ['sale'],
    rating: { average: 4.7, count: 9 },
    media: [{ src: '/earrings.jpg', alt: 'Hoop Earrings', width: 800, height: 1000 }],
    optionGroups: [],
    variants: [{ id: 'p-005-v1', sku: 'p-005-sku-1', price: 13500, stock: 6, options: {} }],
    materials: '18k Gold',
    care: ['Polish with cloth'],
    tags: ['earrings', 'jewelry'],
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'p-006',
    slug: 'linen-shirt',
    name: 'Linen Shirt',
    summary: 'Relaxed linen shirt',
    description: 'Relaxed linen shirt',
    details: ['Mother of pearl buttons'],
    category: 'clothing',
    subcategory: 'tops',
    collectionSlugs: [],
    price: 13000,
    featured: false,
    badges: [],
    rating: { average: 4.6, count: 6 },
    media: [{ src: '/shirt.jpg', alt: 'Linen Shirt', width: 800, height: 1000 }],
    optionGroups: [
      { key: 'size', label: 'Size', kind: 'size', values: [{ value: 'S' }, { value: 'M' }] },
    ],
    variants: [
      { id: 'p-006-v1', sku: 'p-006-sku-1', price: 13000, stock: 5, options: { size: 'S' } },
    ],
    materials: '100% Linen',
    care: ['Machine wash cold'],
    tags: ['shirt', 'tops'],
    createdAt: '2025-12-20T00:00:00Z',
  },
]

const names = (list: ReturnType<typeof listProducts>) => list.page.items.map((p) => p.name)

describe('listProducts', () => {
  it('returns every product on one page by default', () => {
    const result = listProducts(testProducts)
    expect(result.page.total).toBe(6)
    expect(result.page.items).toHaveLength(6)
    expect(result.page.pageCount).toBe(1)
  })

  it('filters by category', () => {
    const result = listProducts(testProducts, { category: 'jewelry' })
    expect(result.page.total).toBe(2)
    expect(result.page.items.every((p) => p.category === 'jewelry')).toBe(true)
  })

  it('filters by collection', () => {
    expect(names(listProducts(testProducts, { collection: 'gifts' }))).toContain('Silk Scarf')
  })

  it('searches every term across name, tags and materials', () => {
    expect(names(listProducts(testProducts, { q: 'silk' }))).toEqual(['Silk Scarf'])
    expect(listProducts(testProducts, { q: 'silk scarf' }).page.total).toBe(1)
    expect(listProducts(testProducts, { q: 'nonexistent' }).page.total).toBe(0)
  })

  it('narrows by size using in-stock variants only', () => {
    const result = listProducts(testProducts, { sizes: ['XL'] })
    expect(result.page.items.length).toBeGreaterThan(0)
    expect(result.page.items.every((p) => p.optionGroups.some((g) => g.key === 'size'))).toBe(true)
  })

  it('narrows by colour using in-stock variants only', () => {
    const result = listProducts(testProducts, { colors: ['Sand'] })
    expect(result.page.total).toBeGreaterThan(0)
    expect(
      result.page.items.every((p) =>
        p.variants.some((v) => v.stock > 0 && v.options.color === 'Sand'),
      ),
    ).toBe(true)
  })

  it('applies an inclusive price range', () => {
    const result = listProducts(testProducts, { minPrice: 12000, maxPrice: 14000 })
    expect(result.page.items.every((p) => p.price >= 12000 && p.price <= 14000)).toBe(true)
    expect(names(result)).toEqual(
      expect.arrayContaining(['Hoop Earrings', 'Linen Shirt', 'Merino Sweater']),
    )
  })

  it('keeps only sale products when onSale is set', () => {
    const result = listProducts(testProducts, { onSale: true })
    expect(result.page.items.every(isOnSale)).toBe(true)
    expect(result.page.total).toBe(2)
  })

  it('sorts by price in both directions', () => {
    const asc = listProducts(testProducts, { sort: 'price-asc' }).page.items.map((p) => p.price)
    const desc = listProducts(testProducts, { sort: 'price-desc' }).page.items.map((p) => p.price)
    expect(asc).toEqual([...asc].sort((a, b) => a - b))
    expect(desc).toEqual([...desc].sort((a, b) => b - a))
  })

  it('sorts newest first', () => {
    const dates = listProducts(testProducts, { sort: 'newest' }).page.items.map((p) => p.createdAt)
    expect(dates).toEqual([...dates].sort().reverse())
  })

  it('puts featured products first by default', () => {
    const items = listProducts(testProducts).page.items
    const firstNonFeatured = items.findIndex((p) => !p.featured)
    expect(items.slice(firstNonFeatured).some((p) => p.featured)).toBe(false)
  })

  it('paginates and clamps an out-of-range page', () => {
    const second = listProducts(testProducts, { pageSize: 2, page: 2 })
    expect(second.page.items).toHaveLength(2)
    expect(second.page.pageCount).toBe(3)

    const clamped = listProducts(testProducts, { pageSize: 2, page: 99 })
    expect(clamped.page.page).toBe(3)
    expect(clamped.page.items).toHaveLength(2)
  })

  it('reports one page for an empty result', () => {
    const result = listProducts(testProducts, { q: 'nonexistent' })
    expect(result.page).toMatchObject({ total: 0, page: 1, pageCount: 1, items: [] })
  })

  it('computes facets inside the scope, ignoring shopper filters', () => {
    const result = listProducts(testProducts, { category: 'clothing', sizes: ['XL'] })
    expect(result.facets.subcategories.map((s) => s.slug).sort()).toEqual([
      'knitwear',
      'outerwear',
      'tops',
    ])
  })
})

describe('computeFacets', () => {
  it('collects sizes, colours with swatches and the price range', () => {
    const facets = computeFacets(testProducts)
    expect(facets.sizes).toEqual(expect.arrayContaining(['XS', 'XL']))
    expect(facets.colors).toEqual(expect.arrayContaining([{ value: 'Slate', swatch: '#4b5563' }]))
    expect(facets.priceRange).toEqual({ min: 9500, max: 42000 })
  })

  it('returns a zero range for no products', () => {
    expect(computeFacets([]).priceRange).toEqual({ min: 0, max: 0 })
  })
})
