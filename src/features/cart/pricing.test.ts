import { describe, expect, it } from 'vitest'
import type { Product } from '@/domain'
import { promos } from '@/data/promos'
import { shippingMethods } from '@/data/shipping'
import { priceCart, promoDiscount, shippingCost } from './pricing'

const coat: Product = {
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
  variants: [{ id: 'p-001-v1', sku: 'p-001-sku-1', price: 42000, stock: 5, options: {} }],
  materials: '100% Wool',
  care: ['Dry clean'],
  tags: ['coat'],
  collectionSlugs: [],
  badges: [],
  rating: { average: 4.8, count: 10 },
  createdAt: '2026-02-01T00:00:00Z',
}

const scarf: Product = {
  id: 'p-002',
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
  variants: [{ id: 'p-002-v1', sku: 'p-002-sku-1', price: 9500, stock: 8, options: {} }],
  materials: '100% Silk',
  care: ['Dry clean'],
  tags: ['scarf'],
  collectionSlugs: [],
  badges: [],
  rating: { average: 4.9, count: 8 },
  createdAt: '2026-01-15T00:00:00Z',
}

const promo = (code: string) => promos.find((p) => p.code === code)!
const standard = shippingMethods.find((m) => m.id === 'standard')! // $8, free over $150
const express = shippingMethods.find((m) => m.id === 'express')! // $18

const line = (product: typeof coat, quantity = 1) => ({
  product,
  variantId: product.variants[0]!.id,
  quantity,
})

describe('priceCart', () => {
  it('returns zeros for an empty cart', () => {
    expect(priceCart({ lines: [], promo: null, shipping: standard, taxRate: 0.08 })).toEqual({
      itemCount: 0,
      subtotal: 0,
      discount: 0,
      shipping: 0,
      tax: 0,
      total: 0,
    })
  })

  it('sums line totals and charges shipping under the free threshold', () => {
    const totals = priceCart({
      lines: [line(scarf, 1)],
      promo: null,
      shipping: standard,
      taxRate: 0,
    })
    expect(totals).toMatchObject({ itemCount: 1, subtotal: 9500, shipping: 800, total: 10300 })
  })

  it('waives standard shipping at the free threshold', () => {
    const totals = priceCart({ lines: [line(coat)], promo: null, shipping: standard, taxRate: 0 })
    expect(totals.shipping).toBe(0)
  })

  it('never waives express shipping on the threshold', () => {
    const totals = priceCart({ lines: [line(coat)], promo: null, shipping: express, taxRate: 0 })
    expect(totals.shipping).toBe(1800)
  })

  it('uses a variant price override when present', () => {
    const override = { ...scarf, variants: [{ ...scarf.variants[0]!, price: 7000 }] }
    const totals = priceCart({
      lines: [line(override, 2)],
      promo: null,
      shipping: null,
      taxRate: 0,
    })
    expect(totals.subtotal).toBe(14000)
  })

  it('applies tax to the discounted subtotal', () => {
    const totals = priceCart({
      lines: [line(coat)],
      promo: promo('WELCOME10'),
      shipping: null,
      taxRate: 0.1,
    })
    expect(totals).toMatchObject({ subtotal: 42000, discount: 4200, tax: 3780, total: 41580 })
  })
})

describe('promoDiscount', () => {
  it('ignores a promo when the minimum subtotal is not met', () => {
    expect(promoDiscount(promo('SAVE20'), 9999)).toBe(0)
  })

  it('caps a fixed discount at the subtotal', () => {
    const tiny = { ...promo('SAVE20'), minSubtotal: 0 }
    expect(promoDiscount(tiny, 1500)).toBe(1500)
  })

  it('gives no money off for free-shipping promos and for no promo', () => {
    expect(promoDiscount(promo('FREESHIP'), 20000)).toBe(0)
    expect(promoDiscount(null, 20000)).toBe(0)
  })
})

describe('shippingCost', () => {
  it('is free with the free-shipping promo on standard only', () => {
    expect(shippingCost(standard, promo('FREESHIP'), 5000, 5000)).toBe(0)
    expect(shippingCost(express, promo('FREESHIP'), 5000, 5000)).toBe(1800)
  })

  it('costs nothing for an empty cart or when no method is chosen', () => {
    expect(shippingCost(standard, null, 0, 0)).toBe(0)
    expect(shippingCost(null, null, 5000, 5000)).toBe(0)
  })
})
