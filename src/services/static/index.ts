import type { Services } from '../types'
import { createStaticCatalogService } from './catalog'
import { createStaticCommerceService } from './commerce'
import { createStaticContentService } from './content'

export function createStaticServices(): Services {
  return {
    catalog: createStaticCatalogService(),
    content: createStaticContentService(),
    commerce: createStaticCommerceService(),
  }
}
