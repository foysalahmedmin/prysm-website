import { z } from 'zod'

const EnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default('http://localhost:3001'),
  NEXT_PUBLIC_DATA_SOURCE: z.enum(['static', 'api']).default('static'),
  NEXT_PUBLIC_DEMO_MODE: z
    .enum(['true', 'false'])
    .default('true')
    .transform((value) => value === 'true'),
})

export type Env = {
  siteUrl: string
  dataSource: 'static' | 'api'
  demoMode: boolean
}

export function parseEnv(raw: Record<string, string | undefined>): Env {
  const parsed = EnvSchema.parse(raw)
  return {
    siteUrl: parsed.NEXT_PUBLIC_SITE_URL,
    dataSource: parsed.NEXT_PUBLIC_DATA_SOURCE,
    demoMode: parsed.NEXT_PUBLIC_DEMO_MODE,
  }
}

// Next.js only inlines NEXT_PUBLIC_* when each variable is read by its full name.
export const env: Env = parseEnv({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_DATA_SOURCE: process.env.NEXT_PUBLIC_DATA_SOURCE,
  NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE,
})
