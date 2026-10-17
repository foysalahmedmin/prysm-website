/**
 * What every storefront's tokens.css must provide, whatever its visual style.
 * Names are semantic (what a colour is for), never literal (what it looks like).
 */
export const REQUIRED_COLOR_TOKENS = [
  '--color-canvas',
  '--color-surface',
  '--color-ink',
  '--color-ink-soft',
  '--color-ink-faint',
  '--color-brand',
  '--color-on-brand',
  '--color-accent',
  '--color-border-strong',
  '--color-focus',
  '--color-danger',
  '--color-on-danger',
  '--color-success',
] as const

export const REQUIRED_FONT_TOKENS = ['--font-display', '--font-text', '--font-mono'] as const

export interface ContrastRule {
  foreground: string
  background: string
  /** WCAG minimum: 4.5 for text, 3 for UI boundaries and focus indicators. */
  min: number
  reason: string
}

export const CONTRAST_RULES: ContrastRule[] = [
  {
    foreground: '--color-ink',
    background: '--color-canvas',
    min: 4.5,
    reason: 'body text on page',
  },
  {
    foreground: '--color-ink',
    background: '--color-surface',
    min: 4.5,
    reason: 'body text on cards',
  },
  {
    foreground: '--color-ink-soft',
    background: '--color-canvas',
    min: 4.5,
    reason: 'secondary text',
  },
  {
    foreground: '--color-ink-faint',
    background: '--color-canvas',
    min: 4.5,
    reason: 'tertiary text is still text',
  },
  {
    foreground: '--color-on-brand',
    background: '--color-brand',
    min: 4.5,
    reason: 'primary button label',
  },
  {
    foreground: '--color-on-danger',
    background: '--color-danger',
    min: 4.5,
    reason: 'destructive button label',
  },
  { foreground: '--color-danger', background: '--color-canvas', min: 4.5, reason: 'error text' },
  {
    foreground: '--color-success',
    background: '--color-canvas',
    min: 4.5,
    reason: 'in-stock and success text',
  },
  {
    foreground: '--color-border-strong',
    background: '--color-surface',
    min: 3,
    reason: 'input boundary (WCAG 1.4.11)',
  },
  {
    foreground: '--color-border-strong',
    background: '--color-canvas',
    min: 3,
    reason: 'input boundary on page',
  },
  {
    foreground: '--color-focus',
    background: '--color-canvas',
    min: 3,
    reason: 'focus ring on page',
  },
  {
    foreground: '--color-focus',
    background: '--color-surface',
    min: 3,
    reason: 'focus ring on cards',
  },
]
