import { readFileSync } from 'node:fs'

/**
 * The same tokens.css the app is built from, read once when the style guide renders.
 * Reads `--name: value;` from every @theme and :root block.
 */
function parse(css: string): Record<string, string> {
  const tokens: Record<string, string> = {}
  for (const block of css.matchAll(/(?:@theme(?:\s+inline)?|:root)\s*\{([^}]*)\}/g)) {
    for (const match of block[1]!.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      tokens[match[1]!] = match[2]!.trim()
    }
  }
  return tokens
}

export const tokens = parse(readFileSync('src/styles/tokens.css', 'utf8'))
