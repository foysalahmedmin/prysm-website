'use client'

import { useEffect, useSyncExternalStore, type ReactNode } from 'react'
import { brand } from '@/config/brand'
import { env } from '@/config/env'
import {
  MirrorTryDialog,
  MirrorTryEventInspector,
  MirrorTryProvider,
  useMirrorTry,
} from '@/plugins/mirror-try'
import { useCartStore } from '@/stores/cart-store'
import { useToastStore } from '@/stores/toast-store'

const INSPECTOR_KEY = 'mt-inspector'
const INSPECTOR_EVENT = 'mt-inspector-change'

function readInspectorFlag(): boolean {
  if (!env.demoMode || typeof window === 'undefined') return false
  try {
    const param = new URLSearchParams(window.location.search).get('inspector')
    if (param === '1') window.sessionStorage.setItem(INSPECTOR_KEY, '1')
    if (param === '0') window.sessionStorage.removeItem(INSPECTOR_KEY)
    return window.sessionStorage.getItem(INSPECTOR_KEY) === '1'
  } catch {
    return false
  }
}

function subscribeInspector(onChange: () => void): () => void {
  const onKey = (event: KeyboardEvent) => {
    // Alt+Shift+I toggles the demo-mode event inspector.
    if (!env.demoMode || !event.altKey || !event.shiftKey || event.code !== 'KeyI') return
    try {
      if (window.sessionStorage.getItem(INSPECTOR_KEY) === '1') {
        window.sessionStorage.removeItem(INSPECTOR_KEY)
      } else {
        window.sessionStorage.setItem(INSPECTOR_KEY, '1')
      }
    } catch {
      return
    }
    window.dispatchEvent(new Event(INSPECTOR_EVENT))
  }
  window.addEventListener('keydown', onKey)
  window.addEventListener(INSPECTOR_EVENT, onChange)
  return () => {
    window.removeEventListener('keydown', onKey)
    window.removeEventListener(INSPECTOR_EVENT, onChange)
  }
}

/**
 * The event inspector is a sales-demo tool, not part of the storefront. It stays hidden unless demo
 * mode is on AND it is asked for with `?inspector=1` (remembered for the session) or Alt+Shift+I.
 */
function useInspectorEnabled(): boolean {
  return useSyncExternalStore(subscribeInspector, readInspectorFlag, () => false)
}

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
  const inspectorEnabled = useInspectorEnabled()
  const cartNoun: string = (brand as { cartNoun?: string }).cartNoun ?? 'Bag'
  const actionLabel =
    cartNoun === 'Basket' ? 'Add to Basket' : cartNoun === 'Cart' ? 'Add to Cart' : 'Add to Bag'

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
      {inspectorEnabled ? <MirrorTryEventInspector /> : null}
      {children}
    </MirrorTryProvider>
  )
}
