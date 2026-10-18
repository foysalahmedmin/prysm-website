import { describe, expect, it } from 'vitest'
import { products } from '@/data/products'
import { toMirrorTryProduct } from './to-plugin-product'

describe('toMirrorTryProduct', () => {
  it('gives the plugin the piece, its sizes and a thumbnail it can afford to load', () => {
    const product = products.find((candidate) => candidate.category === 'clothing')!
    const plugin = toMirrorTryProduct(product)

    expect(plugin).toMatchObject({
      id: product.id,
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
    })
    expect(plugin.sizes).toEqual(
      product.optionGroups.find((group) => group.kind === 'size')?.values.map((v) => v.value),
    )
    expect(plugin.image?.src).toBe(
      `/_next/image?url=${encodeURIComponent(product.media[0]!.src)}&w=96&q=75`,
    )
  })

  it('works with the little a cart line knows', () => {
    const product = products[0]!
    const plugin = toMirrorTryProduct({
      id: product.id,
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      media: product.media,
    })
    expect(plugin.sizes).toBeUndefined()
  })
})
