import type { ShippingMethod } from '@/domain'

export const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Tracked delivery',
    price: 800,
    freeOver: 15000,
    etaDays: { min: 3, max: 6 },
  },
  {
    id: 'express',
    name: 'Express',
    description: 'Priority tracked delivery',
    price: 1800,
    etaDays: { min: 1, max: 2 },
  },
]
