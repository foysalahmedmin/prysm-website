import { capabilityFor } from './capabilities'
import { sampleModels, type SampleModel } from './models'
import type {
  CapturedLook,
  FidelityMode,
  MirrorTryAdapter,
  MirrorTryProduct,
  MirrorTryState,
  TryOnEventMap,
  TryOnEventName,
  TryOnRequest,
  UserAdjustment,
} from './types'

const DEFAULT_ADJUSTMENT: UserAdjustment = {
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
}

const IDLE: MirrorTryState = {
  status: 'idle',
  request: null,
  error: null,
  product: null,
  mode: 'models',
  selectedModelId: sampleModels[0].id,
  userPhotoUrl: null,
  userAdjustment: DEFAULT_ADJUSTMENT,
  cameraActive: false,
  looks: [],
}

type Handler = (payload: never) => void

/**
 * Stand-in composition engine for the demo Mirror Try plugin.
 * Implements the full lifecycle and event contract across the fidelity ladder:
 * - L1: Preset sample models + garment overlay positioned at torso anchor presets
 * - L2: User photo upload with interactive drag, scale, and rotate adjustments
 * - L3: Camera flow preview & snapshot capture without ML body tracking
 */
export class MockMirrorTryAdapter implements MirrorTryAdapter {
  readonly id = 'mock'
  private state: MirrorTryState = { ...IDLE }
  private listeners = new Set<() => void>()
  private handlers = new Map<TryOnEventName, Set<Handler>>()

  constructor(private readonly options: { readyDelayMs?: number } = {}) {}

  isSupported(product: MirrorTryProduct): boolean {
    return capabilityFor(product) !== null
  }

  async open(request: TryOnRequest, product: MirrorTryProduct): Promise<void> {
    if (!this.isSupported(product)) {
      this.fail(request.productId, {
        code: 'unsupported',
        message: 'This product cannot be tried on yet.',
      })
      return
    }

    const defaultVariant = request.variantId ?? product.variants[0]?.id
    const effectiveRequest: TryOnRequest = {
      ...request,
      variantId: defaultVariant,
    }

    this.setState({
      ...this.state,
      status: 'opening',
      request: effectiveRequest,
      product,
      error: null,
      mode: 'models',
      selectedModelId: this.state.selectedModelId || sampleModels[0].id,
    })
    this.emit('tryon:open', effectiveRequest)

    await new Promise((resolve) => setTimeout(resolve, this.options.readyDelayMs ?? 600))
    if (this.state.request !== effectiveRequest) return // closed or superseded while opening

    this.setState({
      ...this.state,
      status: 'ready',
      request: effectiveRequest,
      product,
      error: null,
    })
    this.emit('tryon:ready', effectiveRequest)
  }

  close(): void {
    const request = this.state.request
    if (!request) return

    // Stop any active camera stream / session
    this.setState({
      ...IDLE,
      looks: this.state.looks, // retain looks captured during the session
    })
    this.emit('tryon:close', { productId: request.productId })
  }

  setVariant(variantId: string): void {
    const request = this.state.request
    if (!request) return
    const nextRequest = { ...request, variantId }
    this.setState({ ...this.state, request: nextRequest })
    this.emit('tryon:variant-change', { productId: request.productId, variantId })
  }

  addToCart(variantId: string): void {
    const request = this.state.request
    if (!request) return
    this.emit('tryon:add-to-cart', { productId: request.productId, variantId })
  }

  setMode(mode: FidelityMode): void {
    this.setState({
      ...this.state,
      mode,
      cameraActive: mode === 'camera',
    })
  }

  setModel(modelId: string): void {
    this.setState({
      ...this.state,
      selectedModelId: modelId,
    })
  }

  setUserPhoto(dataUrl: string | null): void {
    this.setState({
      ...this.state,
      userPhotoUrl: dataUrl,
      mode: dataUrl ? 'upload' : this.state.mode,
    })
  }

  setAdjustment(adj: Partial<UserAdjustment>): void {
    const current = this.state.userAdjustment ?? DEFAULT_ADJUSTMENT
    this.setState({
      ...this.state,
      userAdjustment: {
        ...current,
        ...adj,
      },
    })
  }

  setCameraActive(active: boolean): void {
    this.setState({
      ...this.state,
      cameraActive: active,
    })
  }

  capture(imageDataUrl?: string): void {
    const request = this.state.request
    if (!request) return

    const snapshot =
      imageDataUrl ||
      `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23fff" font-family="sans-serif">Snapshot ${Date.now()}</text></svg>`

    const look: CapturedLook = {
      id: `look-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      productId: request.productId,
      variantId: request.variantId,
      imageDataUrl: snapshot,
      timestamp: Date.now(),
    }

    this.setState({
      ...this.state,
      looks: [look, ...(this.state.looks ?? [])],
    })

    this.emit('tryon:capture', {
      productId: request.productId,
      imageDataUrl: snapshot,
    })
  }

  getActiveModel(): SampleModel {
    return sampleModels.find((m) => m.id === this.state.selectedModelId) ?? sampleModels[0]
  }

  getState(): MirrorTryState {
    return this.state
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  on<E extends TryOnEventName>(event: E, handler: (payload: TryOnEventMap[E]) => void): () => void {
    const set = this.handlers.get(event) ?? new Set<Handler>()
    set.add(handler as Handler)
    this.handlers.set(event, set)
    return () => set.delete(handler as Handler)
  }

  private fail(productId: string, error: { code: 'unsupported'; message: string }) {
    this.setState({ ...IDLE, status: 'error', error })
    this.emit('tryon:error', { ...error, productId })
  }

  private setState(next: MirrorTryState) {
    this.state = next
    this.listeners.forEach((listener) => listener())
  }

  private emit<E extends TryOnEventName>(event: E, payload: TryOnEventMap[E]) {
    this.handlers
      .get(event)
      ?.forEach((handler) => (handler as (p: TryOnEventMap[E]) => void)(payload))
  }
}
