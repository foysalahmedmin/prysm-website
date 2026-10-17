import { describe, expect, it } from 'vitest'
import { searchProductsAction } from './actions'

describe('searchProductsAction', () => {
  it('returns empty array for empty or whitespace query', async () => {
    const res1 = await searchProductsAction('')
    const res2 = await searchProductsAction('   ')
    expect(res1).toEqual([])
    expect(res2).toEqual([])
  })

  it('returns matching products for valid search term', async () => {
    const res = await searchProductsAction('shirt')
    expect(Array.isArray(res)).toBe(true)
    for (const p of res) {
      expect(p).toHaveProperty('id')
      expect(p).toHaveProperty('name')
      expect(p).toHaveProperty('slug')
    }
  })
})
