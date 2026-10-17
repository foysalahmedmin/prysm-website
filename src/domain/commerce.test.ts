import { describe, expect, it } from 'vitest'
import { AddressSchema, CustomerSchema, OrderSchema, OrderStatusSchema } from './commerce'

describe('Commerce Domain Schemas', () => {
  it('validates a correct Address', () => {
    const valid = {
      name: 'Elena Rostova',
      line1: '108 Spectral Way',
      line2: 'Apt 4B',
      city: 'Stockholm',
      region: 'Stockholm County',
      postcode: '111 22',
      country: 'Sweden',
      phone: '+46 8 123 4567',
    }
    const parsed = AddressSchema.parse(valid)
    expect(parsed.name).toBe('Elena Rostova')
    expect(parsed.city).toBe('Stockholm')
  })

  it('rejects an Address missing required fields', () => {
    const invalid = {
      name: 'Elena Rostova',
      // missing line1, city, postcode, country
    }
    expect(() => AddressSchema.parse(invalid)).toThrow()
  })

  it('validates a Customer', () => {
    const valid = {
      id: 'cust_01',
      name: 'Jane Doe',
      email: 'jane@example.com',
    }
    const parsed = CustomerSchema.parse(valid)
    expect(parsed.email).toBe('jane@example.com')
  })

  it('validates an Order with lines, totals, and payment snapshot', () => {
    const order = {
      id: 'ord_123',
      number: 'PRY-10842',
      createdAt: '2026-10-17T12:00:00Z',
      customerEmail: 'customer@example.com',
      lines: [
        {
          productId: 'p1',
          variantId: 'v1',
          title: 'Prism Silk Blazer',
          options: { Size: 'M', Color: 'Spectral Black' },
          unitPrice: 42000,
          quantity: 1,
        },
      ],
      address: {
        name: 'Jane Doe',
        line1: '123 Fashion Blvd',
        city: 'New York',
        region: 'NY',
        postcode: '10001',
        country: 'United States',
      },
      shippingMethod: {
        id: 'std',
        name: 'Standard Delivery',
        description: '3-5 business days',
        price: 800,
        etaDays: { min: 3, max: 5 },
      },
      payment: {
        brand: 'Visa',
        last4: '4242',
        expMonth: 12,
        expYear: 2028,
      },
      totals: {
        itemCount: 1,
        subtotal: 42000,
        discount: 0,
        shipping: 800,
        tax: 3360,
        total: 46160,
      },
      status: 'confirmed',
    }

    const parsed = OrderSchema.parse(order)
    expect(parsed.number).toBe('PRY-10842')
    expect(parsed.status).toBe('confirmed')
    expect(parsed.lines).toHaveLength(1)
  })

  it('validates order status transitions and values', () => {
    expect(OrderStatusSchema.parse('confirmed')).toBe('confirmed')
    expect(OrderStatusSchema.parse('processing')).toBe('processing')
    expect(OrderStatusSchema.parse('shipped')).toBe('shipped')
    expect(OrderStatusSchema.parse('delivered')).toBe('delivered')
    expect(() => OrderStatusSchema.parse('cancelled')).toThrow()
  })
})
