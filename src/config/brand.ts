import type { CurrencyCode } from '@/domain/money'

// The only brand-specific TypeScript file in the shared baseline.
export const brand = {
  id: 'prysm',
  name: 'PRYSM',
  tagline: 'Dress for the light.',
  description: 'Clothing, accessories and jewelry cut to catch the light.',
  locale: 'en-US',
  currency: 'USD' as CurrencyCode,
  taxRate: 0.08,
  contactEmail: 'hello@prysm.example',
} as const

export type Brand = typeof brand
