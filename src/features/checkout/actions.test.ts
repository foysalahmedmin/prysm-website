import { describe, expect, it } from 'vitest'
import { placeOrderAction } from './actions'
import { generateOrderId, generateOrderNumber } from './order-generator'
import { CheckoutFormSchema } from './schemas'

describe('Order Generator', () => {
  it('generates deterministic order number with fixed clock and seed', () => {
    const fixedClock = () => 1700000000000
    const num = generateOrderNumber('store', fixedClock, 12345)
    expect(num.startsWith('STO-')).toBe(true)
    expect(num).toBe('STO-00345')
  })

  it('generates unique order ids starting with ord_', () => {
    const id1 = generateOrderId()
    const id2 = generateOrderId()
    expect(id1.startsWith('ord_')).toBe(true)
    expect(id1).not.toBe(id2)
  })
})

describe('Checkout Form Schema', () => {
  it('validates a correct checkout submission', () => {
    const valid = {
      contact: {
        email: 'customer@example.com',
        newsletterOptIn: true,
      },
      shippingAddress: {
        name: 'Elena Rostova',
        line1: '108 Spectral Way',
        city: 'Stockholm',
        region: 'Stockholm',
        postcode: '111 22',
        country: 'Sweden',
      },
      shippingMethodId: 'standard',
      payment: {
        cardholderName: 'Elena Rostova',
        cardNumber: '4242 4242 4242 4242',
        expDate: '12/28',
        cvv: '123',
      },
    }

    const parsed = CheckoutFormSchema.parse(valid)
    expect(parsed.contact.email).toBe('customer@example.com')
    expect(parsed.payment.cardNumber).toBe('4242424242424242')
  })

  it('rejects invalid email and invalid card number', () => {
    const invalid = {
      contact: { email: 'not-an-email' },
      shippingAddress: { name: 'A' },
      shippingMethodId: '',
      payment: {
        cardholderName: '',
        cardNumber: '123',
        expDate: '99/99',
        cvv: '1',
      },
    }
    expect(() => CheckoutFormSchema.parse(invalid)).toThrow()
  })
})

describe('placeOrderAction', () => {
  it('rejects an empty cart', async () => {
    const res = await placeOrderAction({
      checkout: {
        contact: { email: 'customer@example.com' },
        shippingAddress: {
          name: 'Elena Rostova',
          line1: '108 Spectral Way',
          city: 'Stockholm',
          region: 'Stockholm',
          postcode: '111 22',
          country: 'Sweden',
        },
        shippingMethodId: 'standard',
        payment: {
          cardholderName: 'Elena Rostova',
          cardNumber: '4242424242424242',
          expDate: '12/28',
          cvv: '123',
        },
      },
      lines: [],
    })

    expect(res.ok).toBe(false)
    expect(res.error).toBe('Your cart is empty.')
  })

  it('places a confirmed order for valid lines', async () => {
    const { services } = await import('@/services')
    const { page } = await services.catalog.listProducts({ pageSize: 1 })
    const testProd = page.items[0]!
    const testVar = testProd.variants[0]!

    const res = await placeOrderAction({
      checkout: {
        contact: { email: 'customer@example.com' },
        shippingAddress: {
          name: 'Elena Rostova',
          line1: '108 Spectral Way',
          city: 'Stockholm',
          region: 'Stockholm',
          postcode: '111 22',
          country: 'Sweden',
        },
        shippingMethodId: 'standard',
        payment: {
          cardholderName: 'Elena Rostova',
          cardNumber: '4242424242424242',
          expDate: '12/28',
          cvv: '123',
        },
      },
      lines: [{ productId: testProd.id, variantId: testVar.id, quantity: 1 }],
    })

    expect(res.ok).toBe(true)
    expect(res.order).toBeDefined()
    expect(res.order?.status).toBe('confirmed')
    expect(res.order?.customerEmail).toBe('customer@example.com')
    expect(res.order?.lines).toHaveLength(1)
    expect(res.order?.payment.last4).toBe('4242')
    expect(res.order?.number).toMatch(/^[A-Z]{3}-\d{5}$/)
  })
})
