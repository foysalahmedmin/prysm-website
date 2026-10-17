import type { Promo } from '@/domain'

export const promos: Promo[] = [
  {
    code: 'WELCOME10',
    kind: 'percent',
    value: 10,
    minSubtotal: 5000,
    label: '10% off your first order',
  },
  {
    code: 'SAVE20',
    kind: 'fixed',
    value: 2000,
    minSubtotal: 10000,
    label: '$20 off orders over $100',
  },
  { code: 'FREESHIP', kind: 'free-shipping', minSubtotal: 0, label: 'Free standard shipping' },
]
