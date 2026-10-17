import type { Product } from '@/domain'
import type { MirrorTryProduct } from '@/plugins/mirror-try'

/** The only place that knows both the store's product shape and the plugin's. */
export function toMirrorTryProduct(
  product: Pick<Product, 'id' | 'name' | 'category' | 'subcategory' | 'media' | 'variants'>,
): MirrorTryProduct {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    subcategory: product.subcategory,
    images: product.media.map(({ src, alt }) => ({ src, alt })),
    variants: product.variants.map(({ id, options }) => ({ id, options })),
  }
}
