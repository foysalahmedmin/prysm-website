import { describe, expect, it } from 'vitest'
import { DEFAULT_OVERLAY, GARMENT_WIDTH, placeOverlay, resolveOverlay } from './overlay'

describe('resolveOverlay', () => {
  it('uses the generic cut-out when the product brings none', () => {
    expect(resolveOverlay(null)).toEqual(DEFAULT_OVERLAY)
    expect(resolveOverlay({ overlay: undefined })).toEqual(DEFAULT_OVERLAY)
  })

  it("uses the product's cut-out and keeps the default neckline when none is given", () => {
    expect(resolveOverlay({ overlay: { src: '/a.webp' } })).toEqual({
      src: '/a.webp',
      neck: DEFAULT_OVERLAY.neck,
    })
    expect(resolveOverlay({ overlay: { src: '/a.webp', neck: 0.2 } }).neck).toBe(0.2)
  })
})

describe('placeOverlay', () => {
  it('lands the neckline of the cut-out on the anchor point', () => {
    const style = placeOverlay({ x: 0.5, y: 0.34, neck: 0.05 })
    expect(style.left).toBe('50%')
    expect(style.top).toBe('34%')
    expect(style.transform).toBe('translate(-50%, -5%) scale(1) rotate(0deg)')
    expect(style.transformOrigin).toBe('50% 5%')
  })

  it('scales the garment width from the standard width and moves it by pixel offsets', () => {
    const style = placeOverlay({
      x: 0.5,
      y: 0.34,
      neck: 0.05,
      scale: 1.1,
      offset: { x: 12, y: -8 },
    })
    expect(style.width).toBe(`${GARMENT_WIDTH * 100}%`)
    expect(style.left).toBe('calc(50% + 12px)')
    expect(style.top).toBe('calc(34% + -8px)')
    expect(style.transform).toContain('scale(1.1)')
  })
})
