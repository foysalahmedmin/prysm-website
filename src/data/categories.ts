import type { Category } from '@/domain'

export const categories: Category[] = [
  {
    slug: 'clothing',
    name: 'Clothing',
    description: 'Coats, dresses, shirts and trousers.',
    subcategories: [
      { slug: 'outerwear', name: 'Outerwear' },
      { slug: 'dresses', name: 'Dresses' },
      { slug: 'tops', name: 'Tops' },
      { slug: 'trousers', name: 'Trousers' },
    ],
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    description: 'Bags, scarves, hats and eyewear.',
    subcategories: [
      { slug: 'bags', name: 'Bags' },
      { slug: 'scarves', name: 'Scarves' },
      { slug: 'hats', name: 'Hats' },
      { slug: 'eyewear', name: 'Eyewear' },
    ],
  },
  {
    slug: 'jewelry',
    name: 'Jewelry',
    description: 'Necklaces, earrings, rings and bracelets.',
    subcategories: [
      { slug: 'necklaces', name: 'Necklaces' },
      { slug: 'earrings', name: 'Earrings' },
      { slug: 'rings', name: 'Rings' },
      { slug: 'bracelets', name: 'Bracelets' },
    ],
  },
]
