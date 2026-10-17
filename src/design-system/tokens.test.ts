import { describe, expect, it } from 'vitest'
import { contrastRatio } from '@/lib/a11y/contrast'
import { CONTRAST_RULES, REQUIRED_COLOR_TOKENS, REQUIRED_FONT_TOKENS } from './contract'
import { filesContaining } from './source-scan'
import { loadTokens, parseThemeTokens } from './tokens'

describe('parseThemeTokens', () => {
  it('reads every @theme and :root block and ignores other rules', () => {
    const css = [
      `@theme { --color-ink: #111111; --font-text: 'Test', sans-serif; }`,
      `.x { --color-ink: #ffffff; }`,
      `@theme { --color-extra: #222222; }`,
      `:root { --raise: 1px 1px 2px #000; }`,
    ].join('\n')
    expect(parseThemeTokens(css)).toEqual({
      '--color-ink': '#111111',
      '--font-text': "'Test', sans-serif",
      '--color-extra': '#222222',
      '--raise': '1px 1px 2px #000',
    })
  })
})

describe('design tokens contract', () => {
  const tokens = loadTokens()

  it.each([...REQUIRED_COLOR_TOKENS, ...REQUIRED_FONT_TOKENS])('defines %s', (name) => {
    expect(tokens[name], `${name} is missing from src/styles/tokens.css`).toBeDefined()
  })

  it.each(REQUIRED_COLOR_TOKENS)('%s is an opaque hex colour', (name) => {
    expect(tokens[name]).toMatch(/^#[0-9a-fA-F]{6}$/)
  })

  it.each(CONTRAST_RULES)('$foreground on $background reaches $min:1 ($reason)', (rule) => {
    const ratio = contrastRatio(tokens[rule.foreground]!, tokens[rule.background]!)
    expect(ratio).toBeGreaterThanOrEqual(rule.min)
  })

  it('never uses the accent colour for text', () => {
    expect(filesContaining('text-accent')).toEqual([])
  })
})
