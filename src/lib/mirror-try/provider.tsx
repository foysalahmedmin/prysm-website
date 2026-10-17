'use client'

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import type { TryOnSpec } from '@/domain'
import { MockMirrorTryAdapter } from './mock-adapter'
import type { MirrorTryAdapter, MirrorTryState, TryOnRequest } from './types'

interface MirrorTryApi {
  adapter: MirrorTryAdapter
  state: MirrorTryState
  open: (request: TryOnRequest, product: { tryOn: TryOnSpec | null }) => Promise<void>
  close: () => void
  setVariant: (variantId: string) => void
  addToCart: (variantId: string) => void
}

const MirrorTryContext = createContext<MirrorTryApi | null>(null)

export function MirrorTryProvider({
  adapter: provided,
  children,
}: {
  adapter?: MirrorTryAdapter
  children: ReactNode
}) {
  const [fallback] = useState(() => new MockMirrorTryAdapter())
  const adapter = provided ?? fallback
  const state = useSyncExternalStore(
    adapter.subscribe.bind(adapter),
    () => adapter.getState(),
    () => adapter.getState(),
  )

  const api = useMemo<MirrorTryApi>(
    () => ({
      adapter,
      state,
      open: (request, product) => adapter.open(request, product),
      close: () => adapter.close(),
      setVariant: (variantId) => adapter.setVariant(variantId),
      addToCart: (variantId) => adapter.addToCart(variantId),
    }),
    [adapter, state],
  )

  return <MirrorTryContext.Provider value={api}>{children}</MirrorTryContext.Provider>
}

export function useMirrorTry(): MirrorTryApi {
  const context = useContext(MirrorTryContext)
  if (!context) throw new Error('useMirrorTry must be used inside <MirrorTryProvider>.')
  return context
}
