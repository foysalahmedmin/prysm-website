'use client'

import type { Product } from '@/domain'
import { useMirrorTry } from './provider'
import type { TryOnSource } from './types'

interface TryOnButtonProps {
  product: Pick<Product, 'id' | 'name' | 'tryOn'>
  variantId?: string
  source: TryOnSource
  /** Comes from content (site.tryOn.cta), never hardcoded here. */
  label: string
  className?: string
}

/** Unstyled in Phase 1. Each store skins it in its design system. Renders nothing for products that cannot be tried on. */
export function TryOnButton({ product, variantId, source, label, className }: TryOnButtonProps) {
  const { adapter, open } = useMirrorTry()
  if (!adapter.isSupported(product)) return null

  return (
    <button
      type="button"
      className={className}
      data-tryon-trigger={product.id}
      aria-label={`${label}: ${product.name}`}
      onClick={() => void open({ productId: product.id, variantId, source }, product)}
    >
      {label}
    </button>
  )
}
