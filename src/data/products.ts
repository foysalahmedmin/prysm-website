import type { Badge, CategorySlug, OptionGroup, Product, TryOnSpec } from '@/domain'

// Neutral fixtures. Every store replaces this file with its own catalog in Phase 4;
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
  tryOn: TryOnSpec | null
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
const RING_SIZES = ['5', '6', '7', '8', '9']

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
    description: `${seed.summary} Designed to be worn often and tried on before you buy.`,
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
    tryOn: seed.tryOn,
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
    tryOn: { type: 'garment', anchor: 'torso', sizeAware: true },
    collections: ['new-season'],
    badges: ['new'],
    featured: true,
    createdAt: '2026-09-20T09:00:00.000Z',
    rating: { average: 4.8, count: 42 },
  }),
  buildProduct({
    id: 'p-002',
    slug: 'silk-slip-dress',
    name: 'Silk Slip Dress',
    category: 'clothing',
    subcategory: 'dresses',
    summary: 'A bias-cut slip dress in washed silk.',
    price: 26000,
    compareAtPrice: 32000,
    groups: [sizes(APPAREL_SIZES), colors([ink, sand])],
    tryOn: { type: 'garment', anchor: 'torso', sizeAware: true },
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
    tryOn: { type: 'garment', anchor: 'torso', sizeAware: true },
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
    tryOn: null,
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
    tryOn: { type: 'bag', anchor: 'shoulder', sizeAware: false },
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
    tryOn: { type: 'scarf', anchor: 'neck', sizeAware: false },
    collections: ['gifts'],
    createdAt: '2026-07-21T09:00:00.000Z',
    rating: { average: 4.7, count: 24 },
  }),
  buildProduct({
    id: 'p-007',
    slug: 'wide-brim-hat',
    name: 'Wide-Brim Hat',
    category: 'accessories',
    subcategory: 'hats',
    summary: 'A felted wool hat with a soft, wide brim.',
    price: 14500,
    groups: [sizes(['S/M', 'L/XL']), colors([ink, sand])],
    tryOn: { type: 'headwear', anchor: 'head', sizeAware: true },
    collections: ['new-season'],
    badges: ['limited'],
    createdAt: '2026-09-28T09:00:00.000Z',
    rating: { average: 4.3, count: 12 },
  }),
  buildProduct({
    id: 'p-008',
    slug: 'round-sunglasses',
    name: 'Round Sunglasses',
    category: 'accessories',
    subcategory: 'eyewear',
    summary: 'Round acetate frames with mineral lenses.',
    price: 16000,
    groups: [colors([ink, ['Tortoise', '#7c4a1f']])],
    tryOn: { type: 'eyewear', anchor: 'face', sizeAware: false },
    collections: ['gifts'],
    createdAt: '2026-04-30T09:00:00.000Z',
    rating: { average: 4.6, count: 37 },
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
    tryOn: { type: 'necklace', anchor: 'neck', sizeAware: false },
    collections: ['gifts', 'new-season'],
    badges: ['new'],
    featured: true,
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
    tryOn: { type: 'earring', anchor: 'ear', sizeAware: false },
    collections: ['essentials', 'gifts'],
    badges: ['bestseller'],
    createdAt: '2026-03-18T09:00:00.000Z',
    rating: { average: 4.8, count: 91 },
  }),
  buildProduct({
    id: 'p-011',
    slug: 'signet-ring',
    name: 'Signet Ring',
    category: 'jewelry',
    subcategory: 'rings',
    summary: 'A flat-top signet ring, hand-finished.',
    price: 14000,
    groups: [sizes(RING_SIZES), materials(['Silver', 'Gold vermeil'])],
    tryOn: { type: 'ring', anchor: 'hand', sizeAware: true },
    collections: ['essentials'],
    createdAt: '2026-05-25T09:00:00.000Z',
    rating: { average: 4.7, count: 45 },
  }),
  buildProduct({
    id: 'p-012',
    slug: 'chain-bracelet',
    name: 'Chain Bracelet',
    category: 'jewelry',
    subcategory: 'bracelets',
    summary: 'A weighty curb chain with a lobster clasp.',
    price: 11000,
    compareAtPrice: 13500,
    groups: [materials(['Silver', 'Gold vermeil'])],
    tryOn: { type: 'bracelet', anchor: 'wrist', sizeAware: false },
    collections: ['gifts'],
    badges: ['sale'],
    createdAt: '2026-02-11T09:00:00.000Z',
    rating: { average: 4.5, count: 28 },
  }),
]
