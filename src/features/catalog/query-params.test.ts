import { describe, expect, it } from 'vitest'
import { DEFAULT_QUERY } from '@/domain'
import { parseProductQuery, serializeProductQuery } from './query-params'

describe('parseProductQuery', () => {
  it('returns the defaults for empty params', () => {
    expect(parseProductQuery({})).toEqual({
      ...DEFAULT_QUERY,
      category: undefined,
      subcategory: undefined,
      collection: undefined,
      q: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    })
  })

  it('parses a full set of params', () => {
    const query = parseProductQuery({
      category: 'jewelry',
      q: '  ring ',
      size: 'S,M',
      color: ['Ink', 'Sand'],
      min: '50',
      max: '200.5',
      sale: '1',
      tryon: '1',
      sort: 'price-desc',
      page: '3',
    })
    expect(query).toMatchObject({
      category: 'jewelry',
      q: 'ring',
      sizes: ['S', 'M'],
      colors: ['Ink', 'Sand'],
      minPrice: 5000,
      maxPrice: 20050,
      onSale: true,
      tryOn: true,
      sort: 'price-desc',
      page: 3,
    })
  })

  it('ignores invalid values instead of throwing', () => {
    const query = parseProductQuery({
      category: 'shoes',
      sort: 'cheapest',
      page: '-2',
      min: 'abc',
      pageSize: '500',
    })
    expect(query.category).toBeUndefined()
    expect(query.sort).toBe('featured')
    expect(query.page).toBe(1)
    expect(query.minPrice).toBeUndefined()
    expect(query.pageSize).toBe(12)
  })
})

describe('serializeProductQuery', () => {
  it('omits defaults', () => {
    expect(serializeProductQuery(DEFAULT_QUERY)).toBe('')
  })

  it('round-trips through parseProductQuery', () => {
    const original = parseProductQuery({
      category: 'clothing',
      size: 'M',
      min: '100',
      sort: 'newest',
      page: '2',
    })
    const roundTripped = parseProductQuery(
      Object.fromEntries(new URLSearchParams(serializeProductQuery(original))),
    )
    expect(roundTripped).toEqual(original)
  })
})
