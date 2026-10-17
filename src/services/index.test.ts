import { describe, expect, it } from 'vitest'
import { createServices } from './index'

describe('createServices', () => {
  it('builds the static services by default', async () => {
    const services = createServices('static')
    const product = await services.catalog.getProduct('longline-coat')
    expect(product?.name).toBe('Longline Coat')
  })

  it('fails loudly for a data source that has no implementation yet', () => {
    expect(() => createServices('api')).toThrow(/not implemented/)
  })
})
