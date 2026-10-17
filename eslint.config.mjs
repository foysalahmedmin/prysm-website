import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

// Architecture fences (docs/01-architecture.md, docs/05-mirror-try-integration.md).
const dataFence = {
  group: ['@/data', '@/data/*', '@/content', '@/content/*'],
  message: 'Read data and content through @/services only (docs/01-architecture.md).',
}
const deepRelative = {
  group: ['../../*'],
  message: 'Use the @/ alias instead of climbing more than one directory.',
}
const pluginFence = {
  group: ['@/plugins', '@/plugins/*'],
  message:
    'Use the host bridge in @/integration; only it may import a plugin (docs/05-mirror-try-integration.md).',
}
const integrationFence = {
  group: ['@/integration', '@/integration/*'],
  message:
    'Core code must not know about plugins. The integration layer depends on core, never the reverse.',
}
// A plugin may import itself and nothing from the store. Listed explicitly because gitignore-style
// negation cannot re-include a path whose parent directory was excluded.
const STORE_AREAS = [
  'app',
  'components',
  'config',
  'content',
  'data',
  'design-system',
  'domain',
  'features',
  'integration',
  'lib',
  'services',
  'stores',
  'styles',
]
const pluginIsolation = {
  group: STORE_AREAS.flatMap((area) => [`@/${area}`, `@/${area}/**`]),
  message:
    'A plugin must not import store code. It may import only itself and its own dependencies.',
}

const restrict = (...patterns) => ({ 'no-restricted-imports': ['error', { patterns }] })

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'playwright-report/**',
    'next-env.d.ts',
  ]),
  {
    // Core: knows nothing about plugins or the integration layer.
    files: [
      'src/domain/**/*.{ts,tsx}',
      'src/services/**/*.{ts,tsx}',
      'src/config/**/*.{ts,tsx}',
      'src/stores/**/*.{ts,tsx}',
      'src/lib/**/*.{ts,tsx}',
      'src/data/**/*.{ts,tsx}',
      'src/content/**/*.{ts,tsx}',
    ],
    ignores: ['src/services/static/**', 'src/**/*.test.{ts,tsx}'],
    rules: restrict(dataFence, deepRelative, pluginFence, integrationFence),
  },
  {
    // UI, routes and features: may use the integration layer, never a plugin directly.
    files: ['src/app/**/*.{ts,tsx}', 'src/components/**/*.{ts,tsx}', 'src/features/**/*.{ts,tsx}'],
    ignores: ['src/**/*.test.{ts,tsx}'],
    rules: restrict(dataFence, deepRelative, pluginFence),
  },
  {
    // The bridge: the only code that may import a plugin.
    files: ['src/integration/**/*.{ts,tsx}'],
    ignores: ['src/**/*.test.{ts,tsx}'],
    rules: restrict(dataFence, deepRelative),
  },
  {
    // The plugin itself, tests included.
    files: ['src/plugins/**/*.{ts,tsx}'],
    rules: restrict(pluginIsolation),
  },
])

export default eslintConfig
