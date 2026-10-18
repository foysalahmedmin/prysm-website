'use client'

import { MirrorTryTrigger } from '@/plugins/mirror-try'
import { toMirrorTryProduct, type TryOnSource } from './to-plugin-product'

interface TryOnTriggerProps {
  product: TryOnSource
  /** `sm` for cards and lists, `md` beside the product page's main button. */
  size?: 'sm' | 'md'
}

/** What store pages render. They pass a store product; the plugin gets its own shape. */
export function TryOnTrigger({ product, size }: TryOnTriggerProps) {
  return <MirrorTryTrigger product={toMirrorTryProduct(product)} size={size} />
}
