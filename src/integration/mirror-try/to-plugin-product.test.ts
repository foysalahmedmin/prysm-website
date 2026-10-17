import { describe, expect, it } from 'vitest'
import { products } from '@/data/products'
import { toMirrorTryProduct } from './to-plugin-product'

describe('toMirrorTryProduct', () => {
  const sample = products[0]!

  it('describes a store product in the plugin shape, copying only what the plugin needs', () => {
    const mapped = toMirrorTryProduct(sample)
    expect(mapped).toMatchObject({
      id: sample.id,
      name: sample.name,
      category: sample.category,
      subcategory: sample.subcategory,
    })
    expect(mapped.images[0]).toEqual({
      src: sample.media[0]!.src,
      alt: sample.media[0]!.alt,
    })
    expect(mapped.variants).toHaveLength(sample.variants.length)
    expect(Object.keys(mapped).sort()).toEqual([
      'category',
      'id',
      'images',
      'name',
      'subcategory',
      'variants',
    ])
    expect(Object.keys(mapped.variants[0]!).sort()).toEqual(['id', 'options'])
  })
})
