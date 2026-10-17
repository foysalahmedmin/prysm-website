import { beforeEach, describe, expect, it } from 'vitest'
import { selectIsSaved, useWishlistStore } from './wishlist-store'

const wishlist = () => useWishlistStore.getState()

beforeEach(() => {
  useWishlistStore.setState(useWishlistStore.getInitialState())
})

describe('wishlist store', () => {
  it('toggles a product on and off', () => {
    wishlist().toggle('p-001')
    expect(selectIsSaved('p-001')(wishlist())).toBe(true)
    wishlist().toggle('p-001')
    expect(selectIsSaved('p-001')(wishlist())).toBe(false)
  })

  it('keeps products in the order they were saved', () => {
    wishlist().toggle('p-003')
    wishlist().toggle('p-001')
    expect(wishlist().productIds).toEqual(['p-003', 'p-001'])
  })

  it('clears all saved products', () => {
    wishlist().toggle('p-001')
    wishlist().clear()
    expect(wishlist().productIds).toEqual([])
  })
})
