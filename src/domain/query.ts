import { z } from 'zod'
import { CategorySlugSchema, type Product } from './catalog'

export const SortKeySchema = z.enum(['featured', 'newest', 'price-asc', 'price-desc', 'rating'])
export type SortKey = z.infer<typeof SortKeySchema>

export const ProductQuerySchema = z.object({
  category: CategorySlugSchema.optional(),
  subcategory: z.string().optional(),
  collection: z.string().optional(),
  q: z.string().optional(),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  minPrice: z.number().int().nonnegative().optional(),
  maxPrice: z.number().int().nonnegative().optional(),
  onSale: z.boolean(),
  tryOn: z.boolean(),
  sort: SortKeySchema,
  page: z.number().int().positive(),
  pageSize: z.number().int().positive().max(48),
})
export type ProductQuery = z.infer<typeof ProductQuerySchema>

export const DEFAULT_QUERY: ProductQuery = {
  sizes: [],
  colors: [],
  onSale: false,
  tryOn: false,
  sort: 'featured',
  page: 1,
  pageSize: 12,
}

export interface Page<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  pageCount: number
}

export interface Facets {
  subcategories: { slug: string; count: number }[]
  sizes: string[]
  colors: { value: string; swatch?: string }[]
  priceRange: { min: number; max: number }
}

export interface ProductList {
  page: Page<Product>
  facets: Facets
}
