import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/** Next.js refuses to load a "use server" module that exports anything but async functions. */
function serverActionFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) return serverActionFiles(full)
    if (!/\.tsx?$/.test(entry.name) || /\.test\./.test(entry.name)) return []
    return /^\s*['"]use server['"]/.test(readFileSync(full, 'utf8')) ? [full] : []
  })
}

describe('server action modules', () => {
  const files = serverActionFiles(join(process.cwd(), 'src'))

  it('finds the cart and checkout actions', () => {
    expect(files.length).toBeGreaterThanOrEqual(2)
  })

  it.each(files.map((file) => [file.replace(process.cwd() + '/', ''), file]))(
    '%s exports only functions',
    async (_name, file) => {
      const mod = await import(/* @vite-ignore */ file)
      for (const [name, value] of Object.entries(mod)) {
        expect(typeof value, `${name} must be an async function`).toBe('function')
      }
    },
  )
})
