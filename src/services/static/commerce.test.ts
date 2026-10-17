import { describe, expect, it } from 'vitest'
import { createStaticCommerceService } from './commerce'

const commerce = createStaticCommerceService()

describe('static commerce service', () => {
  it('finds promo codes regardless of case and surrounding spaces', async () => {
    expect((await commerce.findPromo('  welcome10 '))?.code).toBe('WELCOME10')
  })

  it('returns null for an unknown promo code', async () => {
    expect(await commerce.findPromo('NOPE')).toBeNull()
  })

  it('lists shipping methods', async () => {
    expect((await commerce.listShippingMethods()).map((m) => m.id)).toEqual(['standard', 'express'])
  })
})
