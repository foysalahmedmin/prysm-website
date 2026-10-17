import { describe, expect, it } from 'vitest'
import { blend, contrastRatio, parseHex, relativeLuminance } from './contrast'

describe('parseHex', () => {
  it('parses 6-digit and 3-digit hex, with or without #', () => {
    expect(parseHex('#0F1424')).toEqual([15, 20, 36])
    expect(parseHex('fff')).toEqual([255, 255, 255])
  })

  it('rejects anything that is not hex', () => {
    expect(() => parseHex('rgba(0,0,0,.5)')).toThrow(/hex/i)
  })
})

describe('relativeLuminance', () => {
  it('is 0 for black and 1 for white', () => {
    expect(relativeLuminance('#000000')).toBe(0)
    expect(relativeLuminance('#ffffff')).toBe(1)
  })
})

describe('contrastRatio', () => {
  it('is 21 for black on white, in either order', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5)
    expect(contrastRatio('#ffffff', '#000000')).toBeCloseTo(21, 5)
  })

  it('matches a known mid-grey value', () => {
    expect(contrastRatio('#777777', '#ffffff')).toBeCloseTo(4.48, 2)
  })

  it('is 1 for identical colours', () => {
    expect(contrastRatio('#336699', '#336699')).toBeCloseTo(1, 5)
  })
})

describe('blend', () => {
  it('returns the background at alpha 0 and the foreground at alpha 1', () => {
    expect(blend('#ffffff', '#000000', 0)).toBe('#000000')
    expect(blend('#ffffff', '#000000', 1)).toBe('#ffffff')
  })

  it('mixes channels proportionally', () => {
    expect(blend('#ffffff', '#000000', 0.5)).toBe('#808080')
  })
})
