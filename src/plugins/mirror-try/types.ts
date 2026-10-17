/**
 * The public contract of the Mirror Try plugin. The plugin owns these types and imports nothing
 * from the store; a store describes its products to the plugin in this shape (see src/integration).
 */

export interface MirrorTryImage {
  src: string
  alt: string
}

export interface MirrorTryVariant {
  id: string
  /** Option name to value, for example { size: 'M', color: 'Slate' }. */
  options: Record<string, string>
}

export interface MirrorTryProduct {
  id: string
  name: string
  /** The merchant's own taxonomy. The plugin decides what it can try on from `subcategory`. */
  category: string
  subcategory: string
  images: MirrorTryImage[]
  variants: MirrorTryVariant[]
}

export type TryOnSource = 'pdp' | 'plp' | 'cart' | 'wishlist' | 'other'

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

/** What every engine behind the plugin (the demo mock, the real SDK) must implement. */
export interface MirrorTryAdapter {
  readonly id: string
  isSupported(product: MirrorTryProduct): boolean
  open(request: TryOnRequest, product: MirrorTryProduct): Promise<void>
  close(): void
  setVariant(variantId: string): void
  addToCart(variantId: string): void
  getState(): MirrorTryState
  /** For React's useSyncExternalStore. Returns an unsubscribe function. */
  subscribe(listener: () => void): () => void
  /** Subscribe to a single plugin event. Returns an unsubscribe function. */
  on<E extends TryOnEventName>(event: E, handler: (payload: TryOnEventMap[E]) => void): () => void
}
