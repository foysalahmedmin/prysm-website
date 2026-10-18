// @vitest-environment node
import { ESLint } from 'eslint'
import { describe, expect, it, vi } from 'vitest'

/**
 * Proves the architecture fences fire. Each case lints a snippet as if it lived at `filePath`.
 * A rule that silently stops working would let the plugin and the core grow tangled again.
 */
// Linting through ESLint's API loads the full TypeScript-aware config, which is slow on a big codebase.
vi.setConfig({ testTimeout: 60_000 })

const eslint = new ESLint({ cwd: process.cwd() })

async function violations(code: string, filePath: string): Promise<string[]> {
  const [result] = await eslint.lintText(code, { filePath })
  return (result?.messages ?? [])
    .filter((message) => message.ruleId === 'no-restricted-imports')
    .map((message) => message.message)
}

const plugin =
  "import { MirrorTryTrigger } from '@/plugins/mirror-try'\nexport { MirrorTryTrigger }\n"
const integration =
  "import { MirrorTryHost } from '@/integration/mirror-try'\nexport { MirrorTryHost }\n"

describe('data and content fence', () => {
  it('stops UI code importing raw data', async () => {
    const found = await violations(
      "import { products } from '@/data/products'\nexport { products }\n",
      'src/components/x.tsx',
    )
    expect(found.join()).toMatch(/through @\/services/)
  })

  it('stops deep relative imports', async () => {
    const found = await violations(
      "import { x } from '../../lib/x'\nexport { x }\n",
      'src/components/ui/x.tsx',
    )
    expect(found.join()).toMatch(/@\/ alias/)
  })
})

describe('plugin boundary', () => {
  it('stops pages and components importing the plugin directly', async () => {
    expect((await violations(plugin, 'src/components/x.tsx')).join()).toMatch(/host bridge/)
    expect((await violations(plugin, 'src/app/x.tsx')).join()).toMatch(/host bridge/)
    expect((await violations(plugin, 'src/features/cart/x.ts')).join()).toMatch(/host bridge/)
  })

  it('lets the integration layer import the plugin', async () => {
    expect(await violations(plugin, 'src/integration/mirror-try/x.tsx')).toEqual([])
  })

  it('stops core code importing the plugin or the integration layer', async () => {
    for (const dir of ['domain', 'services', 'stores', 'config', 'lib']) {
      expect(
        (await violations(plugin, `src/${dir}/x.ts`)).length,
        `plugin from ${dir}`,
      ).toBeGreaterThan(0)
      expect(
        (await violations(integration, `src/${dir}/x.ts`)).length,
        `integration from ${dir}`,
      ).toBeGreaterThan(0)
    }
  })

  it('lets pages and components use the integration layer', async () => {
    expect(await violations(integration, 'src/app/x.tsx')).toEqual([])
    expect(await violations(integration, 'src/components/x.tsx')).toEqual([])
  })

  it('stops the plugin importing any store code', async () => {
    for (const spec of [
      '@/domain',
      '@/domain/catalog',
      '@/stores/cart-store',
      '@/services',
      '@/config/brand',
      '@/lib/cn',
      '@/integration/mirror-try',
    ]) {
      const found = await violations(
        `import x from '${spec}'\nexport { x }\n`,
        'src/plugins/mirror-try/x.ts',
      )
      expect(found.join(), spec).toMatch(/must not import store code/)
    }
  })

  it('lets the plugin import itself and external packages', async () => {
    const code =
      "import { useState } from 'react'\nimport { canTryOn } from '@/plugins/mirror-try/fit'\nimport type { X } from './types'\nexport { useState, canTryOn }\nexport type { X }\n"
    expect(await violations(code, 'src/plugins/mirror-try/x.tsx')).toEqual([])
  })
})
