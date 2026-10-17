'use client'

import { useEffect, type ReactNode } from 'react'
import { MirrorTryProvider, useMirrorTry } from '@/plugins/mirror-try'
import { useCartStore } from '@/stores/cart-store'

/** Plugin events the store reacts to. Today that is one: adding to the bag from inside a try-on. */
function CartBridge() {
  const { adapter } = useMirrorTry()
  useEffect(
    () =>
      adapter.on('tryon:add-to-cart', ({ productId, variantId }) => {
        useCartStore.getState().add({ productId, variantId })
      }),
    [adapter],
  )
  return null
}

/** Mounts the plugin once, in the root layout, and connects its events to the store. */
export function MirrorTryHost({ children }: { children: ReactNode }) {
  return (
    <MirrorTryProvider>
      <CartBridge />
      {children}
    </MirrorTryProvider>
  )
}
