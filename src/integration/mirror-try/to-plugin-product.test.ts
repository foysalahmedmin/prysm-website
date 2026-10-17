import { describe, expect, it } from 'vitest'
import { products } from '@/data/products'
import { toMirrorTryProduct } from './to-plugin-product'

describe('toMirrorTryProduct', () => {
  const coat = products.find((p) => p.slug === 'longline-coat')!

  it('describes a store product in the plugin shape, copying only what the plugin needs', () => {
    const mapped = toMirrorTryProduct(coat)
    expect(mapped).toMatchObject({
      id: 'p-001',
      name: 'Longline Coat',
      category: 'clothing',
      subcategory: 'outerwear',
    })
    expect(mapped.images[0]).toEqual({
      src: '/images/placeholder.svg',
      alt: 'Longline Coat, front',
    })
    expect(mapped.variants).toHaveLength(coat.variants.length)
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
