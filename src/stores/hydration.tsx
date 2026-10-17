'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { useCartStore } from './cart-store'
import { useOrdersStore } from './orders-store'
import { useSessionStore } from './session-store'
import { useUiStore } from './ui-store'
import { useWishlistStore } from './wishlist-store'

const subscribe = () => () => {}

/** False during server render and the first client render, true afterwards. Use it before reading persisted state. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}

/** Restores persisted stores after mount. Render it once in the root layout. */
export function StoreHydrator() {
  useEffect(() => {
    void useCartStore.persist.rehydrate()
    void useWishlistStore.persist.rehydrate()
    void useUiStore.persist.rehydrate()
    void useOrdersStore.persist.rehydrate()
    void useSessionStore.persist.rehydrate()
  }, [])
  return null
}
