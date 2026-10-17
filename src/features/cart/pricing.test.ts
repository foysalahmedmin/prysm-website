import { describe, expect, it } from 'vitest'
import { products } from '@/data/products'
import { promos } from '@/data/promos'
import { shippingMethods } from '@/data/shipping'
import { priceCart, promoDiscount, shippingCost } from './pricing'

const coat = products.find((p) => p.slug === 'longline-coat')! // $420
const scarf = products.find((p) => p.slug === 'silk-scarf')! // $95
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
