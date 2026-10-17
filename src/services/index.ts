import { env } from '@/config/env'
import { createStaticServices } from './static'
import type { Services } from './types'

export type { Services } from './types'

export function createServices(source: 'static' | 'api' = env.dataSource): Services {
  if (source === 'static') return createStaticServices()
  throw new Error(
    `Data source "${source}" is not implemented. Add src/services/api/ and register it in src/services/index.ts.`,
  )
}

export const services: Services = createServices()
