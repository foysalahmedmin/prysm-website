import { describe, expect, it } from 'vitest'
import { createStaticServices } from '@/services/static'
import { quoteCart } from './quote'

const services = createStaticServices()
const quote = (input: unknown) => quoteCart(input, services, 0)

describe('quoteCart', () => {
  it('prices lines from ids and quantities only', async () => {
    const result = await quote({
      lines: [{ productId: 'p-006', variantId: 'p-006-v1', quantity: 2 }],
    })
    expect(result.lines).toHaveLength(1)
    expect(result.lines[0]).toMatchObject({ name: 'Silk Scarf', unitPrice: 9500, lineTotal: 19000 })
    expect(result.totals.subtotal).toBe(19000)
  })

  it('drops lines whose product or variant no longer exists', async () => {
    const result = await quote({
      lines: [
        { productId: 'missing', variantId: 'x', quantity: 1 },
        { productId: 'p-006', variantId: 'nope', quantity: 1 },
      ],
    })
    expect(result.lines).toEqual([])
    expect(result.totals.total).toBe(0)
  })

  it('flags out-of-stock variants and keeps them out of the totals', async () => {
    // Every 7th generated variant is out of stock: p-001 has 10 variants, the 7th is "-v7".
    const result = await quote({
      lines: [{ productId: 'p-001', variantId: 'p-001-v7', quantity: 1 }],
    })
    expect(result.lines[0]).toMatchObject({ issue: 'out-of-stock', quantity: 0 })
    expect(result.totals.subtotal).toBe(0)
  })

  it('reduces the quantity to the available stock', async () => {
    const result = await quote({
      lines: [{ productId: 'p-006', variantId: 'p-006-v1', quantity: 10 }],
    })
    expect(result.lines[0]).toMatchObject({ issue: 'limited-stock', quantity: 8 })
  })

  it('applies a valid promo and reports an unknown one', async () => {
    const lines = [{ productId: 'p-001', variantId: 'p-001-v1', quantity: 1 }]
    const ok = await quote({ lines, promoCode: 'welcome10' })
    expect(ok.promo?.code).toBe('WELCOME10')
    expect(ok.totals.discount).toBe(4200)

    const bad = await quote({ lines, promoCode: 'NOPE' })
    expect(bad.promo).toBeNull()
    expect(bad.promoError).toBe('not-found')
  })

  it('reports a promo whose minimum subtotal is not met', async () => {
    const result = await quote({
      lines: [{ productId: 'p-006', variantId: 'p-006-v1', quantity: 1 }],
      promoCode: 'SAVE20',
    })
    expect(result.promoError).toBe('min-subtotal')
    expect(result.totals.discount).toBe(0)
  })

  it('shows how much more is needed for free shipping', async () => {
    const result = await quote({
      lines: [{ productId: 'p-006', variantId: 'p-006-v1', quantity: 1 }],
    })
    expect(result.shippingMethod?.id).toBe('standard')
    expect(result.freeShippingRemaining).toBe(5500)
  })

  it('has no free-shipping threshold for express', async () => {
    const result = await quote({ lines: [], shippingMethodId: 'express' })
    expect(result.freeShippingRemaining).toBeNull()
  })

  it('rejects malformed input', async () => {
    await expect(
      quote({ lines: [{ productId: 'p-001', variantId: 'v', quantity: 0 }] }),
    ).rejects.toThrow()
  })
})
