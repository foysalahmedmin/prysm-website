import { describe, expect, it, vi } from 'vitest'
import { MockMirrorTryAdapter } from './mock-adapter'
import type { MirrorTryProduct } from './types'

const product = (subcategory: string, id = 'p-001'): MirrorTryProduct => ({
  id,
  name: 'Test product',
  category: 'clothing',
  subcategory,
  images: [],
  variants: [],
})

const coat = product('outerwear')
const trousers = product('trousers', 'p-004')
const request = { productId: 'p-001', variantId: 'p-001-v1', source: 'pdp' } as const

const newAdapter = () => new MockMirrorTryAdapter({ readyDelayMs: 0 })

describe('MockMirrorTryAdapter', () => {
  it('reports support from the plugin capabilities, not from store data', () => {
    const adapter = newAdapter()
    expect(adapter.isSupported(coat)).toBe(true)
    expect(adapter.isSupported(trousers)).toBe(false)
  })

  it('opens a session: open event, then ready event, ending in the ready state', async () => {
    const adapter = newAdapter()
    const order: string[] = []
    adapter.on('tryon:open', () => order.push('open'))
    adapter.on('tryon:ready', () => order.push('ready'))

    const opening = adapter.open(request, coat)
    expect(adapter.getState().status).toBe('opening')
    await opening

    expect(order).toEqual(['open', 'ready'])
    expect(adapter.getState()).toMatchObject({ status: 'ready', request })
  })

  it('fails with an unsupported error for a product that cannot be tried on', async () => {
    const adapter = newAdapter()
    const onError = vi.fn()
    adapter.on('tryon:error', onError)

    await adapter.open({ ...request, productId: 'p-004' }, trousers)

    expect(adapter.getState()).toMatchObject({ status: 'error', error: { code: 'unsupported' } })
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'unsupported', productId: 'p-004' }),
    )
  })

  it('closes the session and emits close once', async () => {
    const adapter = newAdapter()
    const onClose = vi.fn()
    adapter.on('tryon:close', onClose)
    await adapter.open(request, coat)

    adapter.close()
    adapter.close()

    expect(adapter.getState().status).toBe('idle')
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledWith({ productId: 'p-001' })
  })

  it('does not report ready if it was closed while opening', async () => {
    const adapter = new MockMirrorTryAdapter({ readyDelayMs: 5 })
    const onReady = vi.fn()
    adapter.on('tryon:ready', onReady)

    const opening = adapter.open(request, coat)
    adapter.close()
    await opening

    expect(onReady).not.toHaveBeenCalled()
    expect(adapter.getState().status).toBe('idle')
  })

  it('tracks variant changes and forwards add-to-cart', async () => {
    const adapter = newAdapter()
    const onVariant = vi.fn()
    const onAdd = vi.fn()
    adapter.on('tryon:variant-change', onVariant)
    adapter.on('tryon:add-to-cart', onAdd)
    await adapter.open(request, coat)

    adapter.setVariant('p-001-v3')
    adapter.addToCart('p-001-v3')

    expect(adapter.getState().request?.variantId).toBe('p-001-v3')
    expect(onVariant).toHaveBeenCalledWith({ productId: 'p-001', variantId: 'p-001-v3' })
    expect(onAdd).toHaveBeenCalledWith({ productId: 'p-001', variantId: 'p-001-v3' })
  })

  it('notifies state subscribers and stops after unsubscribe', async () => {
    const adapter = newAdapter()
    const listener = vi.fn()
    const unsubscribe = adapter.subscribe(listener)

    await adapter.open(request, coat)
    const callsWhileSubscribed = listener.mock.calls.length
    expect(callsWhileSubscribed).toBeGreaterThan(0)

    unsubscribe()
    adapter.close()
    expect(listener).toHaveBeenCalledTimes(callsWhileSubscribed)
  })
})
