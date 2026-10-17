import { readFileSync } from 'node:fs'

/** Reads `--name: value;` declarations from every `@theme { … }` and `:root { … }` block of a CSS file. */
export function parseThemeTokens(css: string): Record<string, string> {
  const tokens: Record<string, string> = {}
  for (const block of css.matchAll(/(?:@theme(?:\s+inline)?|:root)\s*\{([^}]*)\}/g)) {
    for (const match of block[1]!.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      tokens[match[1]!] = match[2]!.trim()
    }
  }
  return tokens
}

export function loadTokens(path = 'src/styles/tokens.css'): Record<string, string> {
  return parseThemeTokens(readFileSync(path, 'utf8'))
}
