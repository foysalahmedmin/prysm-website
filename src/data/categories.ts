import type { Category } from '@/domain'

export const categories: Category[] = [
  {
    slug: 'clothing',
    name: 'Clothing',
    description: 'Shirts, knitwear, jackets, coats and trousers.',
    subcategories: [
      { slug: 'outerwear', name: 'Outerwear' },
      { slug: 'knitwear', name: 'Knitwear' },
      { slug: 'tops', name: 'Tops' },
      { slug: 'sweatshirts', name: 'Sweatshirts' },
      { slug: 'trousers', name: 'Trousers' },
    ],
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    description: 'Bags and scarves.',
    subcategories: [
      { slug: 'bags', name: 'Bags' },
      { slug: 'scarves', name: 'Scarves' },
    ],
  },
  {
    slug: 'jewelry',
    name: 'Jewelry',
    description: 'A small edit of necklaces and earrings.',
    subcategories: [
      { slug: 'necklaces', name: 'Necklaces' },
      { slug: 'earrings', name: 'Earrings' },
    ],
  },
]
