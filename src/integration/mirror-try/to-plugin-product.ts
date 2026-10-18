import type { Product } from '@/domain'
import type { MirrorTryProduct } from '@/plugins/mirror-try'

export type TryOnSource = Pick<Product, 'id' | 'name' | 'category' | 'subcategory' | 'media'> &
  Partial<Pick<Product, 'optionGroups'>>

/** Asks the store's image optimiser for a thumbnail, so the plugin never loads a full photo. */
function thumbnail(src: string): string {
  return src.startsWith('/') ? `/_next/image?url=${encodeURIComponent(src)}&w=96&q=75` : src
}

/** The only place that knows both the store's product shape and the plugin's. */
export function toMirrorTryProduct(product: TryOnSource): MirrorTryProduct {
  const image = product.media[0]
  const sizes = product.optionGroups
    ?.find((group) => group.kind === 'size')
    ?.values.map(({ value }) => value)

  return {
    id: product.id,
    name: product.name,
    category: product.category,
    subcategory: product.subcategory,
    image: image ? { src: thumbnail(image.src), alt: image.alt } : undefined,
    sizes: sizes && sizes.length > 0 ? sizes : undefined,
  }
}
