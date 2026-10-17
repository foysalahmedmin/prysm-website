import type { TryOnSpec } from '@/domain'

/**
 * The seam between a store and Mirror Try. The stores only ever talk to this interface, so the
 * mock used in the demos can be replaced by the real plugin without touching any page.
 */
export type TryOnSource = 'pdp' | 'plp' | 'studio' | 'cart'

export interface TryOnRequest {
  productId: string
  variantId?: string
  source: TryOnSource
}

export type TryOnErrorCode = 'unsupported' | 'camera-denied' | 'unknown'

export interface TryOnError {
  code: TryOnErrorCode
  message: string
}

export interface TryOnEventMap {
  'tryon:open': TryOnRequest
  'tryon:ready': TryOnRequest
  'tryon:variant-change': { productId: string; variantId: string }
  'tryon:capture': { productId: string; imageDataUrl: string }
  'tryon:add-to-cart': { productId: string; variantId: string }
  'tryon:close': { productId: string }
  'tryon:error': TryOnError & { productId: string }
}

export type TryOnEventName = keyof TryOnEventMap

export interface MirrorTryState {
  status: 'idle' | 'opening' | 'ready' | 'error'
  request: TryOnRequest | null
  error: TryOnError | null
}

export interface MirrorTryAdapter {
  readonly id: string
  isSupported(product: { tryOn: TryOnSpec | null }): boolean
  open(request: TryOnRequest, product: { tryOn: TryOnSpec | null }): Promise<void>
  close(): void
  setVariant(variantId: string): void
  addToCart(variantId: string): void
  getState(): MirrorTryState
  /** For React's useSyncExternalStore. Returns an unsubscribe function. */
  subscribe(listener: () => void): () => void
  /** Subscribe to a single plugin event. Returns an unsubscribe function. */
  on<E extends TryOnEventName>(event: E, handler: (payload: TryOnEventMap[E]) => void): () => void
}
