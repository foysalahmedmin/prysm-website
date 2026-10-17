import { describe, expect, it, vi } from 'vitest'
import { MockMirrorTryAdapter } from './mock-adapter'
import type { MirrorTryAdapter, MirrorTryProduct, TryOnRequest } from './types'

const supportedProduct: MirrorTryProduct = {
  id: 'prod-jacket-1',
  name: 'Prism Overcoat',
  category: 'clothing',
  subcategory: 'outerwear',
  images: [{ src: '/test.webp', alt: 'Test' }],
  variants: [
    { id: 'v-black', options: { color: 'Black', size: 'M' } },
    { id: 'v-silver', options: { color: 'Silver', size: 'L' } },
  ],
}

const unsupportedProduct: MirrorTryProduct = {
  id: 'prod-shoes-1',
  name: 'Prism Trainers',
  category: 'footwear',
  subcategory: 'shoes',
  images: [{ src: '/shoes.webp', alt: 'Shoes' }],
  variants: [{ id: 'v-1', options: { size: '42' } }],
}

const defaultRequest: TryOnRequest = {
  productId: 'prod-jacket-1',
  variantId: 'v-black',
  source: 'pdp',
}

/**
 * Reusable contract test suite for any Mirror Try adapter implementation.
 * Used for verifying both the demo MockMirrorTryAdapter and future production SDK adapters.
 */
export function describeAdapterContract(name: string, createAdapter: () => MirrorTryAdapter) {
  describe(`MirrorTryAdapter Contract: ${name}`, () => {
    it('implements isSupported according to plugin taxonomy rules', () => {
      const adapter = createAdapter()
      expect(adapter.isSupported(supportedProduct)).toBe(true)
      expect(adapter.isSupported(unsupportedProduct)).toBe(false)
    })

    it('manages open lifecycle: opening -> ready with corresponding events', async () => {
      const adapter = createAdapter()
      const events: string[] = []
      adapter.on('tryon:open', () => events.push('open'))
      adapter.on('tryon:ready', () => events.push('ready'))

      const openPromise = adapter.open(defaultRequest, supportedProduct)
      expect(adapter.getState().status).toBe('opening')

      await openPromise
      expect(events).toEqual(['open', 'ready'])
      expect(adapter.getState().status).toBe('ready')
      expect(adapter.getState().request?.productId).toBe('prod-jacket-1')
    })

    it('emits tryon:error when opening an unsupported product', async () => {
      const adapter = createAdapter()
      const onError = vi.fn()
      adapter.on('tryon:error', onError)

      await adapter.open({ ...defaultRequest, productId: 'prod-shoes-1' }, unsupportedProduct)

      expect(adapter.getState().status).toBe('error')
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: 'unsupported',
          productId: 'prod-shoes-1',
        }),
      )
    })

    it('emits tryon:close and returns to idle when closed', async () => {
      const adapter = createAdapter()
      const onClose = vi.fn()
      adapter.on('tryon:close', onClose)

      await adapter.open(defaultRequest, supportedProduct)
      adapter.close()

      expect(adapter.getState().status).toBe('idle')
      expect(onClose).toHaveBeenCalledWith({ productId: 'prod-jacket-1' })
    })

    it('emits tryon:variant-change when changing variant', async () => {
      const adapter = createAdapter()
      const onVariant = vi.fn()
      adapter.on('tryon:variant-change', onVariant)

      await adapter.open(defaultRequest, supportedProduct)
      adapter.setVariant('v-silver')

      expect(adapter.getState().request?.variantId).toBe('v-silver')
      expect(onVariant).toHaveBeenCalledWith({
        productId: 'prod-jacket-1',
        variantId: 'v-silver',
      })
    })

    it('emits tryon:add-to-cart when requested', async () => {
      const adapter = createAdapter()
      const onAdd = vi.fn()
      adapter.on('tryon:add-to-cart', onAdd)

      await adapter.open(defaultRequest, supportedProduct)
      adapter.addToCart('v-silver')

      expect(onAdd).toHaveBeenCalledWith({
        productId: 'prod-jacket-1',
        variantId: 'v-silver',
      })
    })

    it('emits tryon:capture when taking a snapshot', async () => {
      const adapter = createAdapter()
      const onCapture = vi.fn()
      adapter.on('tryon:capture', onCapture)

      await adapter.open(defaultRequest, supportedProduct)
      adapter.capture?.('data:image/svg+xml;base64,test')

      expect(onCapture).toHaveBeenCalledWith(
        expect.objectContaining({
          productId: 'prod-jacket-1',
        }),
      )
    })

    it('notifies subscribers on state mutations', async () => {
      const adapter = createAdapter()
      const listener = vi.fn()
      const unsubscribe = adapter.subscribe(listener)

      await adapter.open(defaultRequest, supportedProduct)
      expect(listener).toHaveBeenCalled()

      const count = listener.mock.calls.length
      unsubscribe()
      adapter.close()
      expect(listener).toHaveBeenCalledTimes(count)
    })
  })
}

// Run the contract suite against the mock adapter
describeAdapterContract('MockMirrorTryAdapter', () => new MockMirrorTryAdapter({ readyDelayMs: 0 }))
