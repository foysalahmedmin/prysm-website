import { describe, expect, it } from 'vitest'
import { capabilityFor } from './capabilities'

describe('capabilityFor', () => {
  it.each(['tops', 'knitwear', 'sweatshirts', 'outerwear', 'blazers', 'hoodies'])(
    'tries on %s as an upper-body garment with a size hint',
    (subcategory) => {
      expect(capabilityFor({ subcategory })).toEqual({
        kind: 'upper-body',
        anchor: 'torso',
        sizeAware: true,
      })
    },
  )

  it('supports neck and ear accessories as a secondary scope', () => {
    expect(capabilityFor({ subcategory: 'scarves' })?.anchor).toBe('neck')
    expect(capabilityFor({ subcategory: 'necklaces' })?.anchor).toBe('neck')
    expect(capabilityFor({ subcategory: 'earrings' })?.anchor).toBe('ear')
  })

  it.each(['trousers', 'bags', 'rings', 'shoes', ''])(
    'does not try on %s in version 1',
    (subcategory) => {
      expect(capabilityFor({ subcategory })).toBeNull()
    },
  )
})
