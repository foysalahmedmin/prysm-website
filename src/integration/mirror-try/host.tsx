'use client'

import { useEffect, type ReactNode } from 'react'
import { brand } from '@/config/brand'
import {
  MirrorTryDialog,
  MirrorTryEventInspector,
  MirrorTryProvider,
  useMirrorTry,
} from '@/plugins/mirror-try'
import { useCartStore } from '@/stores/cart-store'
import { useToastStore } from '@/stores/toast-store'

/**
 * Connects try-on plugin lifecycle events to the storefront.
 * Specifically listens for `tryon:add-to-cart` to add items to the cart
 * and alerts the shopper using the brand-specific cart noun.
 */
function CartBridge() {
  const { adapter } = useMirrorTry()
  const cartNoun: string = (brand as { cartNoun?: string }).cartNoun ?? 'Bag'

  useEffect(
    () =>
      adapter.on('tryon:add-to-cart', ({ productId, variantId }) => {
        useCartStore.getState().add({ productId, variantId })
        useToastStore.getState().showToast({
          message: `Added to ${cartNoun} from Mirror Try`,
          type: 'success',
        })
      }),
    [adapter, cartNoun],
  )

  return null
}

/**
 * Mounts the Mirror Try plugin once in the root layout.
 * Hosts the provider, dialog, event inspector, and cart bridge.
 * Configured with brand-specific cart nouns:
 * - "Add to Bag"
 * - "Add to Cart"
 * - "Add to Basket"
 */
export function MirrorTryHost({ children }: { children: ReactNode }) {
  const cartNoun: string = (brand as { cartNoun?: string }).cartNoun ?? 'Bag'
  const actionLabel =
    cartNoun === 'Basket'
      ? 'Add to Basket'
      : cartNoun === 'Cart'
        ? 'Add to Cart'
        : 'Add to Bag'

  return (
    <MirrorTryProvider
      labels={{
        addToCartAction: actionLabel,
        addToBag: 'Add to Bag',
        addToCart: 'Add to Cart',
        addToBasket: 'Add to Basket',
      }}
    >
      <CartBridge />
      <MirrorTryDialog />
      <MirrorTryEventInspector />
      {children}
    </MirrorTryProvider>
  )
}
