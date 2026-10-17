import { describe, expect, it } from 'vitest'
import { routes, staticRoutes } from './routes'

describe('routes', () => {
  it('lists every static route once, each starting with a slash', () => {
    expect(new Set(staticRoutes).size).toBe(staticRoutes.length)
    staticRoutes.forEach((path) => expect(path.startsWith('/')).toBe(true))
    expect(staticRoutes).toContain('/checkout/success')
  })

  it('builds dynamic routes', () => {
    expect(routes.product('silk-scarf')).toBe('/products/silk-scarf')
    expect(routes.category('jewelry')).toBe('/shop/jewelry')
    expect(routes.order('ord-1')).toBe('/account/orders/ord-1')
  })
})
