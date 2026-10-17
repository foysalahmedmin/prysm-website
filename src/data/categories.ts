import type { Category } from '@/domain'

export const categories: Category[] = [
  {
    slug: 'clothing',
    name: 'Clothing',
    description: 'Refractive tailoring, spectral lightwear, knitwear, and architectural drapery.',
    subcategories: [
      { slug: 'outerwear', name: 'Outerwear' },
      { slug: 'knitwear', name: 'Knitwear' },
      { slug: 'tops', name: 'Tops & Shirts' },
      { slug: 'sweatshirts', name: 'Sweatshirts & Hoodies' },
      { slug: 'trousers', name: 'Trousers' },
      { slug: 'skirts', name: 'Skirts' },
    ],
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    description: 'Prismatic leather, technical optical nylon, and spectral silks.',
    subcategories: [
      { slug: 'bags', name: 'Bags' },
      { slug: 'scarves', name: 'Scarves' },
      { slug: 'belts', name: 'Belts' },
      { slug: 'leather-goods', name: 'Leather Goods' },
    ],
  },
  {
    slug: 'jewelry',
    name: 'Jewelry',
    description: 'Precision-milled titanium and light-refracting crystal forms.',
    subcategories: [
      { slug: 'rings', name: 'Rings' },
      { slug: 'necklaces', name: 'Necklaces' },
      { slug: 'earrings', name: 'Earrings' },
      { slug: 'bracelets', name: 'Bracelets & Cuffs' },
    ],
  },
]
