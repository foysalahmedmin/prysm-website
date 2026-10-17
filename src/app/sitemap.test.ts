import { describe, expect, it } from 'vitest'
import sitemap from './sitemap'

describe('sitemap', () => {
  it('includes catalog pages and leaves out transactional ones', async () => {
    const urls = (await sitemap()).map((entry) => entry.url)
    expect(urls.some((url) => url.startsWith('http://localhost:3001/products/'))).toBe(true)
    expect(urls).toContain('http://localhost:3001/shop/jewelry')
    expect(urls).toContain('http://localhost:3001')
    expect(urls.some((url) => url.endsWith('/checkout'))).toBe(false)
    expect(urls.some((url) => url.includes('/account'))).toBe(false)
    expect(urls.some((url) => url.endsWith('/search'))).toBe(false)
    expect(urls.some((url) => url.endsWith('/track-order'))).toBe(false)
  })
})
