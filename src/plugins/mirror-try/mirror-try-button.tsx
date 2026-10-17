'use client'

import { useMirrorTry } from './provider'
import type { MirrorTryProduct, TryOnSource } from './types'

interface MirrorTryButtonProps {
  product: MirrorTryProduct
  variantId?: string
  source: TryOnSource
  /** Overrides the plugin's default label. */
  label?: string
  className?: string
}

/**
 * The plugin's entry point on a store page. Unstyled: a store themes it through `className` and the
 * `data-mt-part` hook. Renders nothing for products the plugin cannot try on.
 */
export function MirrorTryButton({
  product,
  variantId,
  source,
  label,
  className,
}: MirrorTryButtonProps) {
  const { adapter, labels, open } = useMirrorTry()
  if (!adapter.isSupported(product)) return null
  const text = label ?? labels.tryOn

  return (
    <button
      type="button"
      className={className}
      data-mt-part="trigger"
      data-mt-product={product.id}
      aria-label={`${text}: ${product.name}`}
      onClick={() => void open({ productId: product.id, variantId, source }, product)}
    >
      {text}
    </button>
  )
}
