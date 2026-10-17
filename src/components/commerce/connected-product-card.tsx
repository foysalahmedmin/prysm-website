'use client'

import { useSyncExternalStore } from 'react'
import { ProductCard } from '@/components/commerce/product-card'
import type { ProductCardProps } from '@/components/commerce/contract'
import type { Product } from '@/domain'
import { TryOnTrigger } from '@/integration/mirror-try'
import { selectIsSaved, useWishlistStore } from '@/stores/wishlist-store'

const defaultLabels: ProductCardProps['labels'] = {
  sale: 'Sale price',
  original: 'Original price',
  save: 'Save to wishlist',
  badges: {
    new: 'New',
    bestseller: 'Bestseller',
    limited: 'Limited',
    sale: 'Sale',
  },
}

const defaultMoney = { currency: 'USD', locale: 'en-US' } as const

const emptySubscribe = () => () => {}

export function ConnectedProductCard({
  product,
  priority = false,
  className,
}: {
  product: Product
  priority?: boolean
  className?: string
}) {
  const saved = useWishlistStore(selectIsSaved(product.id))
  const toggle = useWishlistStore((state) => state.toggle)

  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  return (
    <ProductCard
      product={product}
      href={`/products/${product.slug}`}
      money={defaultMoney}
      saved={isHydrated ? saved : false}
      onToggleSaved={toggle}
      priority={priority}
      tryOnSlot={<TryOnTrigger product={product} source="plp" />}
      labels={defaultLabels}
      className={className}
    />
  )
}
