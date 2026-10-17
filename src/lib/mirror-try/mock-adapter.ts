import type { TryOnSpec } from '@/domain'
import type {
  MirrorTryAdapter,
  MirrorTryState,
  TryOnEventMap,
  TryOnEventName,
  TryOnRequest,
} from './types'

const IDLE: MirrorTryState = { status: 'idle', request: null, error: null }

type Handler = (payload: never) => void

/** Stand-in for the real Mirror Try plugin. Same events and lifecycle, no camera or ML. */
export class MockMirrorTryAdapter implements MirrorTryAdapter {
  readonly id = 'mock'
  private state: MirrorTryState = IDLE
  private listeners = new Set<() => void>()
  private handlers = new Map<TryOnEventName, Set<Handler>>()

  constructor(private readonly options: { readyDelayMs?: number } = {}) {}

  isSupported(product: { tryOn: TryOnSpec | null }): boolean {
    return product.tryOn !== null
  }

  async open(request: TryOnRequest, product: { tryOn: TryOnSpec | null }): Promise<void> {
    if (!this.isSupported(product)) {
      this.fail(request.productId, {
        code: 'unsupported',
        message: 'This product cannot be tried on yet.',
      })
      return
    }
    this.setState({ status: 'opening', request, error: null })
    this.emit('tryon:open', request)
    await new Promise((resolve) => setTimeout(resolve, this.options.readyDelayMs ?? 600))
    if (this.state.request !== request) return // closed or replaced while opening
    this.setState({ status: 'ready', request, error: null })
    this.emit('tryon:ready', request)
  }

  close(): void {
    const request = this.state.request
    if (!request) return
    this.setState(IDLE)
    this.emit('tryon:close', { productId: request.productId })
  }

  setVariant(variantId: string): void {
    const request = this.state.request
    if (!request) return
    this.setState({ ...this.state, request: { ...request, variantId } })
    this.emit('tryon:variant-change', { productId: request.productId, variantId })
  }

  addToCart(variantId: string): void {
    const request = this.state.request
    if (!request) return
    this.emit('tryon:add-to-cart', { productId: request.productId, variantId })
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
    this.setState({ status: 'error', request: null, error })
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
