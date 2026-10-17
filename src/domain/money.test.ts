import { describe, expect, it } from 'vitest'
import { formatMoney, toMinor } from './money'

const usd = { currency: 'USD', locale: 'en-US' } as const

describe('formatMoney', () => {
  it('drops decimals for whole amounts', () => {
    expect(formatMoney(42000, usd)).toBe('$420')
  })

  it('keeps two decimals otherwise', () => {
    expect(formatMoney(4250, usd)).toBe('$42.50')
  })

  it('formats zero', () => {
    expect(formatMoney(0, usd)).toBe('$0')
  })
})

describe('toMinor', () => {
  it('rounds to the nearest cent', () => {
    expect(toMinor(19.99)).toBe(1999)
    expect(toMinor(0.1 + 0.2)).toBe(30)
  })
})
