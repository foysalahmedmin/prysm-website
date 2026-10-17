'use client'

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import { defaultLabels, type MirrorTryLabels } from './labels'
import { MockMirrorTryAdapter } from './mock-adapter'
import type { MirrorTryAdapter, MirrorTryProduct, MirrorTryState, TryOnRequest } from './types'

interface MirrorTryApi {
  adapter: MirrorTryAdapter
  labels: MirrorTryLabels
  state: MirrorTryState
  open: (request: TryOnRequest, product: MirrorTryProduct) => Promise<void>
  close: () => void
  setVariant: (variantId: string) => void
  addToCart: (variantId: string) => void
}

const MirrorTryContext = createContext<MirrorTryApi | null>(null)

export function MirrorTryProvider({
  adapter: provided,
  labels: overrides,
  children,
}: {
  adapter?: MirrorTryAdapter
  labels?: Partial<MirrorTryLabels>
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
      labels: { ...defaultLabels, ...overrides },
      state,
      open: (request, product) => adapter.open(request, product),
      close: () => adapter.close(),
      setVariant: (variantId) => adapter.setVariant(variantId),
      addToCart: (variantId) => adapter.addToCart(variantId),
    }),
    [adapter, overrides, state],
  )

  return <MirrorTryContext.Provider value={api}>{children}</MirrorTryContext.Provider>
}

export function useMirrorTry(): MirrorTryApi {
  const context = useContext(MirrorTryContext)
  if (!context) throw new Error('useMirrorTry must be used inside <MirrorTryProvider>.')
  return context
}
