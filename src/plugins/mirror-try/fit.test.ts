import { describe, expect, it } from 'vitest'
import {
  bodyPartFor,
  canTryOn,
  checkMeasurement,
  measurementsFor,
  recommendSize,
  scanFor,
} from './fit'
import type { MirrorTryProduct } from './types'

const piece = (subcategory: string, sizes?: string[]): MirrorTryProduct => ({
  id: subcategory,
  name: subcategory,
  category: 'clothing',
  subcategory,
  sizes,
})

describe('what the plugin can try on', () => {
  it('maps clothing to the body part it covers', () => {
    expect(bodyPartFor(piece('outerwear'))).toBe('upper')
    expect(bodyPartFor(piece('knitwear'))).toBe('upper')
    expect(bodyPartFor(piece('trousers'))).toBe('lower')
    expect(bodyPartFor(piece('skirts'))).toBe('lower')
    expect(bodyPartFor(piece('dresses'))).toBe('full')
  })

  it('falls back to the top-level category and ignores case', () => {
    expect(bodyPartFor({ category: 'Tops' })).toBe('upper')
  })

  it('leaves accessories alone', () => {
    expect(canTryOn({ category: 'accessories', subcategory: 'bags' })).toBe(false)
    expect(canTryOn({ category: 'jewelry', subcategory: 'rings' })).toBe(false)
  })
})

describe('size recommendation', () => {
  it('reads the chest for tops and the waist for trousers', () => {
    expect(recommendSize('upper', { chest: 80 })).toBe('XS')
    expect(recommendSize('upper', { chest: 96 })).toBe('M')
    expect(recommendSize('upper', { chest: 125 })).toBe('XXL')
    expect(recommendSize('lower', { waist: 75 })).toBe('S')
  })

  it('picks the nearest size the merchant actually sells', () => {
    expect(recommendSize('upper', { chest: 125 }, ['S', 'M', 'L', 'XL'])).toBe('XL')
    expect(recommendSize('upper', { chest: 80 }, ['M', 'L'])).toBe('M')
  })

  it('takes the middle of a run it does not recognise', () => {
    expect(recommendSize('lower', { waist: 82 }, ['28', '30', '32', '34'])).toBe('30')
  })
})

describe('measurements', () => {
  it('scans the fields that matter for the piece', () => {
    const scan = scanFor(piece('trousers', ['S', 'M', 'L']))
    expect(scan.bodyPart).toBe('lower')
    expect(Object.keys(scan.values).sort()).toEqual(['hip', 'inseam', 'thigh', 'waist'])
    expect(scan.source).toBe('scan')
  })

  it('keeps a size the shopper chose when the next piece comes in it', () => {
    const custom = { ...scanFor(piece('tops')), size: 'L', source: 'custom' as const }
    expect(measurementsFor(piece('knitwear', ['S', 'M', 'L']), custom).size).toBe('L')
    expect(measurementsFor(piece('knitwear', ['XS', 'S']), custom).size).toBe('S')
  })

  it('explains what is wrong with a typed value', () => {
    expect(checkMeasurement('chest', '')).toBe('Enter a number')
    expect(checkMeasurement('chest', 'abc')).toBe('Enter a number')
    expect(checkMeasurement('chest', '500')).toBe('Enter 60–170 cm')
    expect(checkMeasurement('chest', '96,5')).toBeNull()
  })
})
