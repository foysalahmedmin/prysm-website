import { z } from 'zod'

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be kebab-case')
const minor = z.number().int().nonnegative()

export const CategorySlugSchema = z.enum(['clothing', 'accessories', 'jewelry'])
export type CategorySlug = z.infer<typeof CategorySlugSchema>

export const MediaSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
})
export type Media = z.infer<typeof MediaSchema>

export const TryOnTypeSchema = z.enum([
  'garment',
  'eyewear',
  'headwear',
  'bag',
  'scarf',
  'necklace',
  'earring',
  'ring',
  'bracelet',
  'watch',
])
export const TryOnAnchorSchema = z.enum([
  'torso',
  'shoulder',
  'face',
  'head',
  'neck',
  'ear',
  'hand',
  'wrist',
])

/** Tells Mirror Try how a product is worn. `null` on a product means "not try-on capable". */
export const TryOnSpecSchema = z.object({
  type: TryOnTypeSchema,
  anchor: TryOnAnchorSchema,
  overlay: z.string().min(1).optional(),
  sizeAware: z.boolean(),
})
export type TryOnSpec = z.infer<typeof TryOnSpecSchema>

export const OptionGroupSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  kind: z.enum(['size', 'color', 'material']),
  values: z.array(z.object({ value: z.string().min(1), swatch: z.string().optional() })).min(1),
})
export type OptionGroup = z.infer<typeof OptionGroupSchema>

export const VariantSchema = z.object({
  id: z.string().min(1),
  sku: z.string().min(1),
  options: z.record(z.string(), z.string()),
  stock: z.number().int().nonnegative(),
  price: minor.optional(),
})
export type Variant = z.infer<typeof VariantSchema>

export const BadgeSchema = z.enum(['new', 'bestseller', 'limited', 'sale'])
export type Badge = z.infer<typeof BadgeSchema>

export const ProductSchema = z.object({
  id: z.string().min(1),
  slug,
  name: z.string().min(1),
  category: CategorySlugSchema,
  subcategory: slug,
  summary: z.string().min(1),
  description: z.string().min(1),
  details: z.array(z.string().min(1)),
  materials: z.string().min(1),
  care: z.array(z.string().min(1)),
  price: minor.refine((value) => value > 0, 'price must be positive'),
  compareAtPrice: minor.optional(),
  media: z.array(MediaSchema).min(1),
  optionGroups: z.array(OptionGroupSchema),
  variants: z.array(VariantSchema).min(1),
  tags: z.array(z.string()),
  collectionSlugs: z.array(slug),
  badges: z.array(BadgeSchema),
  rating: z.object({ average: z.number().min(0).max(5), count: z.number().int().nonnegative() }),
  tryOn: TryOnSpecSchema.nullable(),
  featured: z.boolean(),
  createdAt: z.iso.datetime(),
})
export type Product = z.infer<typeof ProductSchema>

export const CategorySchema = z.object({
  slug: CategorySlugSchema,
  name: z.string().min(1),
  description: z.string().min(1),
  subcategories: z.array(z.object({ slug, name: z.string().min(1) })),
})
export type Category = z.infer<typeof CategorySchema>

export const CollectionSchema = z.object({
  slug,
  name: z.string().min(1),
  description: z.string().min(1),
})
export type Collection = z.infer<typeof CollectionSchema>

export const ReviewSchema = z.object({
  id: z.string().min(1),
  productId: z.string().min(1),
  author: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(1),
  body: z.string().min(1),
  createdAt: z.iso.datetime(),
  verified: z.boolean(),
})
export type Review = z.infer<typeof ReviewSchema>

export function unitPrice(product: Product, variantId: string): number {
  const variant = product.variants.find((candidate) => candidate.id === variantId)
  return variant?.price ?? product.price
}
