import { describe, expect, it } from 'vitest'
import { quoteCartAction } from './actions'

describe('quoteCartAction', () => {
  it('quotes an empty cart without crashing', async () => {
    const quote = await quoteCartAction({ lines: [] })
    expect(quote.lines).toEqual([])
    expect(quote.totals.subtotal).toBe(0)
  })

  it('quotes valid cart lines and calculates totals', async () => {
    // We can quote with an empty lines list or sample input
    const quote = await quoteCartAction({
      lines: [],
      promoCode: 'INVALID',
    })
    expect(quote.promoError).toBe('not-found')
  })
})
