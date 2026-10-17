import { describe, expect, it, vi } from 'vitest'
import type { Product, Promo, ShippingMethod } from '@/domain'
import type { Services } from '@/services/types'
import { quoteCart } from './quote'

const mockScarf: Product = {
  id: 'p-006',
  slug: 'silk-scarf',
  name: 'Silk Scarf',
  summary: 'Pure silk foulard',
  description: 'Pure silk foulard',
  details: ['Hand rolled edges'],
  category: 'accessories',
  subcategory: 'scarves',
  price: 9500,
  featured: false,
  media: [{ src: '/scarf.jpg', alt: 'Silk Scarf', width: 800, height: 1000 }],
  optionGroups: [],
  variants: [{ id: 'p-006-v1', sku: 'p-006-sku-1', price: 9500, stock: 8, options: {} }],
  materials: '100% Silk',
  care: ['Dry clean'],
  tags: ['scarf'],
  collectionSlugs: [],
  badges: [],
  rating: { average: 4.9, count: 8 },
  createdAt: '2026-01-15T00:00:00Z',
}

const mockCoat: Product = {
  id: 'p-001',
  slug: 'wool-coat',
  name: 'Wool Coat',
  summary: 'Tailored wool coat',
  description: 'Tailored wool coat',
  details: ['Tailored fit'],
  category: 'clothing',
  subcategory: 'outerwear',
  price: 42000,
  featured: true,
  media: [{ src: '/coat.jpg', alt: 'Wool Coat', width: 800, height: 1000 }],
  optionGroups: [],
  variants: [
    { id: 'p-001-v1', sku: 'p-001-sku-1', price: 42000, stock: 5, options: {} },
    { id: 'p-001-v7', sku: 'p-001-sku-7', price: 42000, stock: 0, options: {} },
  ],
  materials: '100% Wool',
  care: ['Dry clean'],
  tags: ['coat'],
  collectionSlugs: [],
  badges: [],
  rating: { average: 4.8, count: 10 },
  createdAt: '2026-02-01T00:00:00Z',
}

const mockShipping: ShippingMethod[] = [
  { id: 'standard', name: 'Standard Delivery', description: '3-5 business days', price: 800, freeOver: 15000, etaDays: { min: 3, max: 5 } },
  { id: 'express', name: 'Express Delivery', description: '1-2 business days', price: 1800, freeOver: undefined, etaDays: { min: 1, max: 2 } },
]

const mockPromos: Promo[] = [
  { code: 'WELCOME10', label: '10% off your first order', kind: 'percent', value: 10, minSubtotal: 0 },
  { code: 'SAVE20', label: '$20 off orders over $150', kind: 'fixed', value: 2000, minSubtotal: 15000 },
]

const services: Pick<Services, 'catalog' | 'commerce'> = {
  catalog: {
    getProduct: vi.fn(),
    listProductSlugs: vi.fn(),
    getProductsByIds: async (ids) => [mockCoat, mockScarf].filter((p) => ids.includes(p.id)),
    getRelatedProducts: vi.fn(),
    listCategories: vi.fn(),
    getCategory: vi.fn(),
    listCollections: vi.fn(),
    getCollection: vi.fn(),
    listReviews: vi.fn(),
    listProducts: vi.fn(),
  },
  commerce: {
    listShippingMethods: async () => mockShipping,
    findPromo: async (code: string) =>
      mockPromos.find((p) => p.code.toLowerCase() === code.toLowerCase()) ?? null,
  },
}

const quote = (input: unknown) => quoteCart(input, services, 0)

describe('quoteCart', () => {
  it('prices lines from ids and quantities only', async () => {
    const result = await quote({
      lines: [{ productId: 'p-006', variantId: 'p-006-v1', quantity: 2 }],
    })
    expect(result.lines).toHaveLength(1)
    expect(result.lines[0]).toMatchObject({ name: 'Silk Scarf', unitPrice: 9500, lineTotal: 19000 })
    expect(result.totals.subtotal).toBe(19000)
  })

  it('drops lines whose product or variant no longer exists', async () => {
    const result = await quote({
      lines: [
        { productId: 'missing', variantId: 'x', quantity: 1 },
        { productId: 'p-006', variantId: 'nope', quantity: 1 },
      ],
    })
    expect(result.lines).toEqual([])
    expect(result.totals.total).toBe(0)
  })

  it('flags out-of-stock variants and keeps them out of the totals', async () => {
    // Every 7th generated variant is out of stock: p-001 has 10 variants, the 7th is "-v7".
    const result = await quote({
      lines: [{ productId: 'p-001', variantId: 'p-001-v7', quantity: 1 }],
    })
    expect(result.lines[0]).toMatchObject({ issue: 'out-of-stock', quantity: 0 })
    expect(result.totals.subtotal).toBe(0)
  })

  it('reduces the quantity to the available stock', async () => {
    const result = await quote({
      lines: [{ productId: 'p-006', variantId: 'p-006-v1', quantity: 10 }],
    })
    expect(result.lines[0]).toMatchObject({ issue: 'limited-stock', quantity: 8 })
  })

  it('applies a valid promo and reports an unknown one', async () => {
    const lines = [{ productId: 'p-001', variantId: 'p-001-v1', quantity: 1 }]
    const ok = await quote({ lines, promoCode: 'welcome10' })
    expect(ok.promo?.code).toBe('WELCOME10')
    expect(ok.totals.discount).toBe(4200)

    const bad = await quote({ lines, promoCode: 'NOPE' })
    expect(bad.promo).toBeNull()
    expect(bad.promoError).toBe('not-found')
  })

  it('reports a promo whose minimum subtotal is not met', async () => {
    const result = await quote({
      lines: [{ productId: 'p-006', variantId: 'p-006-v1', quantity: 1 }],
      promoCode: 'SAVE20',
    })
    expect(result.promoError).toBe('min-subtotal')
    expect(result.totals.discount).toBe(0)
  })

  it('shows how much more is needed for free shipping', async () => {
    const result = await quote({
      lines: [{ productId: 'p-006', variantId: 'p-006-v1', quantity: 1 }],
    })
    expect(result.shippingMethod?.id).toBe('standard')
    expect(result.freeShippingRemaining).toBe(5500)
  })

  it('has no free-shipping threshold for express', async () => {
    const result = await quote({ lines: [], shippingMethodId: 'express' })
    expect(result.freeShippingRemaining).toBeNull()
  })

  it('rejects malformed input', async () => {
    await expect(
      quote({ lines: [{ productId: 'p-001', variantId: 'v', quantity: 0 }] }),
    ).rejects.toThrow()
  })
})
