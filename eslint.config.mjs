import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

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
    // Architecture boundary: UI code reads data and content only through @/services.
    // Only the static service implementations (and tests) may touch the raw seed files.
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/services/static/**', 'src/**/*.test.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/data', '@/data/*', '@/content', '@/content/*'],
              message: 'Read data and content through @/services only (docs/01-architecture.md).',
            },
            {
              group: ['../../*'],
              message: 'Use the @/ alias instead of climbing more than one directory.',
            },
          ],
        },
      ],
    },
  },
])

export default eslintConfig
