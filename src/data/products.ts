import type { Badge, CategorySlug, OptionGroup, Product } from '@/domain'

// Neutral fixtures, weighted like the real catalogs: mostly clothing, mostly worn on the upper body,
// with a few accessories and jewelry. Every store replaces this file with its own catalog in Phase 4;
// src/data/seed.test.ts keeps the replacement valid.

interface ProductSeed {
  id: string
  slug: string
  name: string
  category: CategorySlug
  subcategory: string
  summary: string
  price: number
  compareAtPrice?: number
  groups: OptionGroup[]
  collections: string[]
  badges?: Badge[]
  featured?: boolean
  createdAt: string
  rating: { average: number; count: number }
}

const sizes = (values: string[]): OptionGroup => ({
  key: 'size',
  label: 'Size',
  kind: 'size',
  values: values.map((value) => ({ value })),
})

const colors = (values: [name: string, swatch: string][]): OptionGroup => ({
  key: 'color',
  label: 'Colour',
  kind: 'color',
  values: values.map(([value, swatch]) => ({ value, swatch })),
})

const materials = (values: string[]): OptionGroup => ({
  key: 'material',
  label: 'Material',
  kind: 'material',
  values: values.map((value) => ({ value })),
})

const APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL']

function combinations(groups: OptionGroup[]): Record<string, string>[] {
  return groups.reduce<Record<string, string>[]>(
    (acc, group) =>
      acc.flatMap((partial) =>
        group.values.map((option) => ({ ...partial, [group.key]: option.value })),
      ),
    [{}],
  )
}

function buildProduct(seed: ProductSeed): Product {
  const variants = combinations(seed.groups).map((options, index) => ({
    id: `${seed.id}-v${index + 1}`,
    sku: `${seed.id}-${Object.values(options).join('-').toLowerCase().replace(/\s+/g, '')}`,
    options,
    stock: index % 7 === 6 ? 0 : 8,
  }))

  return {
    id: seed.id,
    slug: seed.slug,
    name: seed.name,
    category: seed.category,
    subcategory: seed.subcategory,
    summary: seed.summary,
    description: `${seed.summary} Designed to be worn often.`,
    details: ['Considered fit', 'Made in small batches', 'Ships in 2 business days'],
    materials: seed.category === 'jewelry' ? 'Recycled sterling silver' : 'Natural fibres',
    care: ['See the care label before cleaning', 'Store flat or hung'],
    price: seed.price,
    compareAtPrice: seed.compareAtPrice,
    media: [
      { src: '/images/placeholder.svg', alt: `${seed.name}, front`, width: 1200, height: 1500 },
      { src: '/images/placeholder.svg', alt: `${seed.name}, detail`, width: 1200, height: 1500 },
    ],
    optionGroups: seed.groups,
    variants,
    tags: [seed.category, seed.subcategory],
    collectionSlugs: seed.collections,
    badges: seed.badges ?? [],
    rating: seed.rating,
    featured: seed.featured ?? false,
    createdAt: seed.createdAt,
  }
}

const slate: [string, string] = ['Slate', '#4b5563']
const sand: [string, string] = ['Sand', '#cbb8a0']
const ink: [string, string] = ['Ink', '#111827']

export const products: Product[] = [
  buildProduct({
    id: 'p-001',
    slug: 'longline-coat',
    name: 'Longline Coat',
    category: 'clothing',
    subcategory: 'outerwear',
    summary: 'A long, structured coat with a clean shoulder.',
    price: 42000,
    groups: [sizes(APPAREL_SIZES), colors([slate, sand])],
    collections: ['new-season'],
    badges: ['new'],
    featured: true,
    createdAt: '2026-09-20T09:00:00.000Z',
    rating: { average: 4.8, count: 42 },
  }),
  buildProduct({
    id: 'p-002',
    slug: 'merino-sweater',
    name: 'Merino Sweater',
    category: 'clothing',
    subcategory: 'knitwear',
    summary: 'A soft merino sweater with a relaxed crew neck.',
    price: 12800,
    compareAtPrice: 15800,
    groups: [sizes(APPAREL_SIZES), colors([slate, sand])],
    collections: ['essentials'],
    badges: ['sale'],
    featured: true,
    createdAt: '2026-08-02T09:00:00.000Z',
    rating: { average: 4.6, count: 31 },
  }),
  buildProduct({
    id: 'p-003',
    slug: 'linen-shirt',
    name: 'Linen Shirt',
    category: 'clothing',
    subcategory: 'tops',
    summary: 'An easy linen shirt with a relaxed collar.',
    price: 12800,
    groups: [sizes(APPAREL_SIZES), colors([sand, slate])],
    collections: ['essentials'],
    createdAt: '2026-06-14T09:00:00.000Z',
    rating: { average: 4.5, count: 58 },
  }),
  buildProduct({
    id: 'p-004',
    slug: 'wool-trousers',
    name: 'Wool Trousers',
    category: 'clothing',
    subcategory: 'trousers',
    summary: 'Straight-leg trousers in a fine wool blend.',
    price: 18800,
    groups: [sizes(APPAREL_SIZES), colors([ink, slate])],
    collections: ['new-season'],
    createdAt: '2026-09-02T09:00:00.000Z',
    rating: { average: 4.4, count: 19 },
  }),
  buildProduct({
    id: 'p-005',
    slug: 'leather-tote',
    name: 'Leather Tote',
    category: 'accessories',
    subcategory: 'bags',
    summary: 'A structured tote that holds a laptop and a lunch.',
    price: 31000,
    groups: [colors([ink, sand])],
    collections: ['essentials'],
    badges: ['bestseller'],
    featured: true,
    createdAt: '2026-05-10T09:00:00.000Z',
    rating: { average: 4.9, count: 76 },
  }),
  buildProduct({
    id: 'p-006',
    slug: 'silk-scarf',
    name: 'Silk Scarf',
    category: 'accessories',
    subcategory: 'scarves',
    summary: 'A square silk scarf printed in two tones.',
    price: 9500,
    groups: [colors([slate, sand])],
    collections: ['gifts'],
    createdAt: '2026-07-21T09:00:00.000Z',
    rating: { average: 4.7, count: 24 },
  }),
  buildProduct({
    id: 'p-007',
    slug: 'cotton-tee',
    name: 'Cotton Tee',
    category: 'clothing',
    subcategory: 'tops',
    summary: 'A heavy cotton tee with a clean neckline.',
    price: 4800,
    groups: [sizes(APPAREL_SIZES), colors([ink, sand])],
    collections: ['essentials'],
    createdAt: '2026-07-10T09:00:00.000Z',
    rating: { average: 4.5, count: 88 },
  }),
  buildProduct({
    id: 'p-008',
    slug: 'zip-hoodie',
    name: 'Zip Hoodie',
    category: 'clothing',
    subcategory: 'sweatshirts',
    summary: 'A brushed-back zip hoodie with a roomy hood.',
    price: 9800,
    groups: [sizes(APPAREL_SIZES), colors([slate, ink])],
    collections: ['new-season'],
    badges: ['new'],
    createdAt: '2026-09-12T09:00:00.000Z',
    rating: { average: 4.4, count: 27 },
  }),
  buildProduct({
    id: 'p-009',
    slug: 'pendant-necklace',
    name: 'Pendant Necklace',
    category: 'jewelry',
    subcategory: 'necklaces',
    summary: 'A polished pendant on a fine chain.',
    price: 18000,
    groups: [materials(['Silver', 'Gold vermeil'])],
    collections: ['gifts', 'new-season'],
    badges: ['new'],
    createdAt: '2026-10-01T09:00:00.000Z',
    rating: { average: 4.9, count: 63 },
  }),
  buildProduct({
    id: 'p-010',
    slug: 'hoop-earrings',
    name: 'Hoop Earrings',
    category: 'jewelry',
    subcategory: 'earrings',
    summary: 'Medium hoops with a tapered, high-polish finish.',
    price: 12000,
    groups: [materials(['Silver', 'Gold vermeil'])],
    collections: ['essentials', 'gifts'],
    badges: ['bestseller'],
    createdAt: '2026-03-18T09:00:00.000Z',
    rating: { average: 4.8, count: 91 },
  }),
  buildProduct({
    id: 'p-011',
    slug: 'bomber-jacket',
    name: 'Bomber Jacket',
    category: 'clothing',
    subcategory: 'outerwear',
    summary: 'A lightweight bomber with ribbed cuffs and hem.',
    price: 21000,
    groups: [sizes(APPAREL_SIZES), colors([ink, slate])],
    collections: ['new-season', 'gifts'],
    badges: ['limited'],
    createdAt: '2026-09-28T09:00:00.000Z',
    rating: { average: 4.7, count: 19 },
  }),
  buildProduct({
    id: 'p-012',
    slug: 'tailored-blazer',
    name: 'Tailored Blazer',
    category: 'clothing',
    subcategory: 'outerwear',
    summary: 'A single-breasted blazer cut close through the shoulder.',
    price: 24000,
    compareAtPrice: 29000,
    groups: [sizes(APPAREL_SIZES), colors([ink, slate])],
    collections: ['essentials'],
    badges: ['sale'],
    createdAt: '2026-04-05T09:00:00.000Z',
    rating: { average: 4.6, count: 22 },
  }),
]
