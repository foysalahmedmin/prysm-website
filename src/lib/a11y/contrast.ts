/** WCAG 2.x contrast helpers. Used by the design-token contract test, never at runtime. */

export function parseHex(input: string): [number, number, number] {
  const hex = input.trim().replace(/^#/, '')
  const full = hex.length === 3 ? [...hex].map((c) => c + c).join('') : hex
  if (!/^[0-9a-fA-F]{6}$/.test(full)) throw new Error(`Expected a hex colour, got "${input}"`)
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as [number, number, number]
}

const channel = (value: number) => {
  const c = value / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

export function relativeLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex)
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

export function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground)
  const b = relativeLuminance(background)
  const [lighter, darker] = a >= b ? [a, b] : [b, a]
  return (lighter + 0.05) / (darker + 0.05)
}

/** The opaque colour you get from painting `foreground` at `alpha` over `background`. */
export function blend(foreground: string, background: string, alpha: number): string {
  const fg = parseHex(foreground)
  const bg = parseHex(background)
  const mixed = fg.map((value, i) => Math.round(value * alpha + bg[i]! * (1 - alpha)))
  return `#${mixed.map((value) => value.toString(16).padStart(2, '0')).join('')}`
}
