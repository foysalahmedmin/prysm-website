import type { SiteContent } from '@/domain'

export const site: SiteContent = {
  announcement: 'Free standard shipping on orders over $150.',
  nav: [
    { label: 'New in', href: '/new-arrivals' },
    { label: 'Clothing', href: '/shop/clothing' },
    { label: 'Accessories', href: '/shop/accessories' },
    { label: 'Jewelry', href: '/shop/jewelry' },
    { label: 'Lookbook', href: '/lookbook' },
    { label: 'Journal', href: '/journal' },
  ],
  footer: {
    groups: [
      {
        title: 'Shop',
        links: [
          { label: 'All products', href: '/shop' },
          { label: 'Collections', href: '/collections' },
          { label: 'Sale', href: '/sale' },
        ],
      },
      {
        title: 'Help',
        links: [
          { label: 'Shipping & returns', href: '/shipping-returns' },
          { label: 'Size guide', href: '/size-guide' },
          { label: 'Track an order', href: '/track-order' },
          { label: 'FAQ', href: '/faq' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Stores', href: '/stores' },
          { label: 'Privacy', href: '/privacy' },
          { label: 'Terms', href: '/terms' },
        ],
      },
    ],
    legal: 'Demo store built to showcase Mirror Try. No real orders are taken.',
  },
  newsletter: {
    title: 'Join the list',
    description: 'New pieces and early access, once a month.',
    cta: 'Subscribe',
  },
}
