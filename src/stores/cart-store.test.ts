import { beforeEach, describe, expect, it } from 'vitest'
import { MAX_LINE_QUANTITY, selectItemCount, useCartStore } from './cart-store'

const cart = () => useCartStore.getState()

beforeEach(() => {
  useCartStore.setState(useCartStore.getInitialState())
})

describe('cart store', () => {
  it('adds a new line', () => {
    cart().add({ productId: 'p-001', variantId: 'v1' })
    expect(cart().lines).toEqual([{ productId: 'p-001', variantId: 'v1', quantity: 1 }])
  })

  it('merges repeated adds for the same variant', () => {
    cart().add({ productId: 'p-001', variantId: 'v1', quantity: 2 })
    cart().add({ productId: 'p-001', variantId: 'v1' })
    expect(cart().lines).toEqual([{ productId: 'p-001', variantId: 'v1', quantity: 3 }])
  })

  it('keeps different variants of one product on separate lines', () => {
    cart().add({ productId: 'p-001', variantId: 'v1' })
    cart().add({ productId: 'p-001', variantId: 'v2' })
    expect(cart().lines).toHaveLength(2)
  })

  it('caps a line at the maximum quantity', () => {
    cart().add({ productId: 'p-001', variantId: 'v1', quantity: 8 })
    cart().add({ productId: 'p-001', variantId: 'v1', quantity: 8 })
    expect(cart().lines[0]?.quantity).toBe(MAX_LINE_QUANTITY)
  })

  it('sets a quantity and removes the line at zero', () => {
    cart().add({ productId: 'p-001', variantId: 'v1' })
    cart().setQuantity('v1', 4)
    expect(cart().lines[0]?.quantity).toBe(4)
    cart().setQuantity('v1', 0)
    expect(cart().lines).toEqual([])
  })

  it('removes a line and clears the cart', () => {
    cart().add({ productId: 'p-001', variantId: 'v1' })
    cart().add({ productId: 'p-002', variantId: 'v2' })
    cart().remove('v1')
    expect(cart().lines.map((l) => l.variantId)).toEqual(['v2'])
    cart().clear()
    expect(cart().lines).toEqual([])
  })

  it('counts items across lines', () => {
    cart().add({ productId: 'p-001', variantId: 'v1', quantity: 2 })
    cart().add({ productId: 'p-002', variantId: 'v2', quantity: 3 })
    expect(selectItemCount(cart())).toBe(5)
  })

  it('persists under a brand-prefixed key and restores on rehydrate', async () => {
    cart().add({ productId: 'p-001', variantId: 'v1', quantity: 2 })
    const raw = window.localStorage.getItem('prysm:cart') ?? ''
    expect(JSON.parse(raw).state.lines).toEqual([
      { productId: 'p-001', variantId: 'v1', quantity: 2 },
    ])

    // Simulate a fresh page load: in-memory state is empty, storage still has the saved cart.
    useCartStore.setState({ lines: [] })
    window.localStorage.setItem('prysm:cart', raw)
    await useCartStore.persist.rehydrate()

    expect(cart().lines).toEqual([{ productId: 'p-001', variantId: 'v1', quantity: 2 }])
  })
})
