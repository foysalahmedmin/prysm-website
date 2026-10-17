/**
 * The public contract of the Mirror Try plugin. The plugin owns these types and imports nothing
 * from the store; a store describes its products to the plugin in this shape (see src/integration).
 */

export interface MirrorTryImage {
  src: string
  alt: string
}

/** A cut-out of the garment on a transparent background: front view, worn, centred. */
export interface MirrorTryOverlay {
  src: string
  /** Where the neckline sits, from the top of the image, as a fraction of its height. */
  neck?: number
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
  /** The garment cut-out shown on the model. The plugin falls back to a generic one without it. */
  overlay?: MirrorTryOverlay
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

export type FidelityMode = 'models' | 'upload' | 'camera'

export interface UserAdjustment {
  x: number
  y: number
  scale: number
  rotation: number
}

export interface CapturedLook {
  id: string
  productId: string
  variantId?: string
  imageDataUrl: string
  timestamp: number
}

export interface MirrorTryState {
  status: 'idle' | 'opening' | 'ready' | 'error'
  request: TryOnRequest | null
  error: TryOnError | null
  product?: MirrorTryProduct | null
  mode?: FidelityMode
  selectedModelId?: string
  userPhotoUrl?: string | null
  userAdjustment?: UserAdjustment
  cameraActive?: boolean
  looks?: CapturedLook[]
}

/** What every engine behind the plugin (the demo mock, the real SDK) must implement. */
export interface MirrorTryAdapter {
  readonly id: string
  isSupported(product: MirrorTryProduct): boolean
  open(request: TryOnRequest, product: MirrorTryProduct): Promise<void>
  close(): void
  setVariant(variantId: string): void
  addToCart(variantId: string): void
  setMode?(mode: FidelityMode): void
  setModel?(modelId: string): void
  setUserPhoto?(dataUrl: string | null): void
  setAdjustment?(adj: Partial<UserAdjustment>): void
  setCameraActive?(active: boolean): void
  capture?(imageDataUrl?: string): void
  getState(): MirrorTryState
  /** For React's useSyncExternalStore. Returns an unsubscribe function. */
  subscribe(listener: () => void): () => void
  /** Subscribe to a single plugin event. Returns an unsubscribe function. */
  on<E extends TryOnEventName>(event: E, handler: (payload: TryOnEventMap[E]) => void): () => void
}
