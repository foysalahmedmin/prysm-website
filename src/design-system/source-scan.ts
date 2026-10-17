import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

/** Source files a design rule should be checked against: app code, not tests. */
export function sourceFiles(root = 'src'): string[] {
  return (readdirSync(root, { recursive: true }) as string[])
    .filter((file) => /\.(tsx?|css)$/.test(file) && !/\.test\.tsx?$/.test(file))
    .map((file) => join(root, file))
}

/** Files that contain the given text, for "never use X" rules. */
export function filesContaining(text: string | RegExp, root = 'src'): string[] {
  return sourceFiles(root).filter((file) => {
    const source = readFileSync(file, 'utf8')
    return typeof text === 'string' ? source.includes(text) : text.test(source)
  })
}
