import { beforeEach, describe, expect, it } from 'vitest'
import type { Order } from '@/domain'
import { useOrdersStore } from './orders-store'

const mockOrder: Order = {
  id: 'ord_test_1',
  number: 'TEST-12345',
  createdAt: '2026-10-17T12:00:00Z',
  customerEmail: 'tester@example.com',
  lines: [
    {
      productId: 'p-001',
      variantId: 'p-001-v1',
      title: 'Silk Shirt',
      options: { size: 'M' },
      unitPrice: 42000,
      quantity: 1,
    },
  ],
  address: {
    name: 'Tester',
    line1: '123 Test St',
    city: 'Stockholm',
    region: 'Stockholm',
    postcode: '111 22',
    country: 'Sweden',
  },
  shippingMethod: {
    id: 'std',
    name: 'Standard',
    description: '3-5 days',
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

describe('useOrdersStore', () => {
  beforeEach(() => {
    useOrdersStore.getState().clearOrders()
  })

  it('starts with an empty orders list', () => {
    expect(useOrdersStore.getState().orders).toHaveLength(0)
  })

  it('adds an order and looks it up by id or number', () => {
    useOrdersStore.getState().addOrder(mockOrder)
    expect(useOrdersStore.getState().orders).toHaveLength(1)

    const foundById = useOrdersStore.getState().getOrder('ord_test_1')
    expect(foundById?.number).toBe('TEST-12345')

    const foundByNum = useOrdersStore.getState().getOrderByNumber('test-12345')
    expect(foundByNum?.id).toBe('ord_test_1')
  })

  it('deduplicates order if added again with same id', () => {
    useOrdersStore.getState().addOrder(mockOrder)
    useOrdersStore.getState().addOrder({ ...mockOrder, status: 'shipped' })
    expect(useOrdersStore.getState().orders).toHaveLength(1)
    expect(useOrdersStore.getState().orders[0]?.status).toBe('shipped')
  })
})
