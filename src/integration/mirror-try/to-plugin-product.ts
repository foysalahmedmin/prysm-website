import type { Product } from '@/domain'
import type { MirrorTryProduct } from '@/plugins/mirror-try'

/** The only place that knows both the store's product shape and the plugin's. */
export function toMirrorTryProduct(
  product: Pick<
    Product,
    'id' | 'slug' | 'name' | 'category' | 'subcategory' | 'media' | 'variants'
  >,
): MirrorTryProduct {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    subcategory: product.subcategory,
    images: product.media.map(({ src, alt }) => ({ src, alt })),
    // The demo publishes one cut-out per upper-body product; a real store would point at its own.
    overlay: { src: `/mirror-try/overlays/${product.slug}.webp` },
    variants: product.variants.map(({ id, options }) => ({ id, options })),
  }
}
