import { describe, expect, it } from 'vitest'
import {
  CategorySchema,
  CollectionSchema,
  ProductSchema,
  PromoSchema,
  ReviewSchema,
  ShippingMethodSchema,
} from '@/domain'
import { categories } from './categories'
import { collections } from './collections'
import { products } from './products'
import { promos } from './promos'
import { reviews } from './reviews'
import { shippingMethods } from './shipping'

const unique = (values: string[]) => new Set(values).size === values.length

describe('seed data contract', () => {
  it('parses every record with its schema', () => {
    products.forEach((item) => ProductSchema.parse(item))
    categories.forEach((item) => CategorySchema.parse(item))
    collections.forEach((item) => CollectionSchema.parse(item))
    reviews.forEach((item) => ReviewSchema.parse(item))
    shippingMethods.forEach((item) => ShippingMethodSchema.parse(item))
    promos.forEach((item) => PromoSchema.parse(item))
  })

  it('uses unique ids and slugs', () => {
    expect(unique(products.map((p) => p.id))).toBe(true)
    expect(unique(products.map((p) => p.slug))).toBe(true)
    expect(unique(products.flatMap((p) => p.variants.map((v) => v.id)))).toBe(true)
    expect(unique(products.flatMap((p) => p.variants.map((v) => v.sku)))).toBe(true)
    expect(unique(collections.map((c) => c.slug))).toBe(true)
    expect(unique(promos.map((p) => p.code))).toBe(true)
  })

  it('references only collections that exist', () => {
    const known = new Set(collections.map((c) => c.slug))
    products.forEach((p) => p.collectionSlugs.forEach((slug) => expect(known.has(slug)).toBe(true)))
  })

  it('places each product in a subcategory of its category', () => {
    products.forEach((p) => {
      const category = categories.find((c) => c.slug === p.category)
      expect(category?.subcategories.map((s) => s.slug)).toContain(p.subcategory)
    })
  })

  it('gives every variant a value for each option group, from the declared values', () => {
    products.forEach((p) =>
      p.variants.forEach((variant) =>
        p.optionGroups.forEach((group) =>
          expect(group.values.map((v) => v.value)).toContain(variant.options[group.key]),
        ),
      ),
    )
  })

  it('attaches reviews only to existing products', () => {
    const ids = new Set(products.map((p) => p.id))
    reviews.forEach((r) => expect(ids.has(r.productId)).toBe(true))
  })

  it('covers every category and keeps compare-at prices above the price', () => {
    categories.forEach((c) => expect(products.some((p) => p.category === c.slug)).toBe(true))
    products.forEach((p) => {
      if (p.compareAtPrice !== undefined) expect(p.compareAtPrice).toBeGreaterThan(p.price)
    })
  })
})
