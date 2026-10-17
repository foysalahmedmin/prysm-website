import { describe, expect, it } from 'vitest'
import { createServices } from './index'

describe('createServices', () => {
  it('builds the static services by default', async () => {
    const services = createServices('static')
    const slugs = await services.catalog.listProductSlugs()
    expect(slugs.length).toBeGreaterThan(0)
    const product = await services.catalog.getProduct(slugs[0]!)
    expect(product).not.toBeNull()
  })

  it('fails loudly for a data source that has no implementation yet', () => {
    expect(() => createServices('api')).toThrow(/not implemented/)
  })
})
