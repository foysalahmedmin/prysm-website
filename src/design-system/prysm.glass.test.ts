import { describe, expect, it } from 'vitest'
import { blend, contrastRatio } from '@/lib/a11y/contrast'
import { loadTokens } from './tokens'

const tokens = loadTokens()
const fill = tokens['--color-glass-fill']!
const strong = Number(tokens['--alpha-glass-strong'])

// Light-field colours behind glass, plus a mid and a dark tone standing in for photography.
const lightField = ['--light-rose', '--light-ice', '--light-citrine', '--light-lavender'].map(
  (name) => [name, tokens[name]!] as const,
)
const photography = [
  ['photo-mid', '#8aa0d8'],
  ['photo-dark', '#4d5a9b'],
] as const

describe('PRYSM glass contrast', () => {
  it.each([...lightField, ...photography])(
    'ink and ink-soft stay readable on strong glass over %s',
    (_, backdrop) => {
      const glass = blend(fill, backdrop, strong)
      expect(contrastRatio(tokens['--color-ink']!, glass)).toBeGreaterThanOrEqual(4.5)
      expect(contrastRatio(tokens['--color-ink-soft']!, glass)).toBeGreaterThanOrEqual(4.5)
    },
  )

  it.each(lightField)(
    'ink-faint is readable on strong glass over the light field (%s)',
    (_, backdrop) => {
      const glass = blend(fill, backdrop, strong)
      expect(contrastRatio(tokens['--color-ink-faint']!, glass)).toBeGreaterThanOrEqual(4.5)
    },
  )

  it('keeps the strong fill more opaque than the decorative fill', () => {
    expect(strong).toBeGreaterThan(Number(tokens['--alpha-glass']))
    expect(strong).toBeGreaterThanOrEqual(0.72)
  })
})
