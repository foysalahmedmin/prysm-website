'use client'

import type { Product } from '@/domain'
import { MirrorTryButton, type TryOnSource } from '@/plugins/mirror-try'
import { toMirrorTryProduct } from './to-plugin-product'

interface TryOnTriggerProps {
  product: Pick<Product, 'id' | 'name' | 'category' | 'subcategory' | 'media' | 'variants'>
  variantId?: string
  source: TryOnSource
  label?: string
  className?: string
}

/** What store pages render. They pass a store product; the plugin gets its own shape. */
export function TryOnTrigger({ product, ...rest }: TryOnTriggerProps) {
  return <MirrorTryButton product={toMirrorTryProduct(product)} {...rest} />
}
