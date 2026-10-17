import { DEFAULT_QUERY } from '@/domain'
import type { Facets, Product, ProductList, ProductQuery } from '@/domain'

export const isOnSale = (product: Product): boolean =>
  product.compareAtPrice !== undefined && product.compareAtPrice > product.price

function matchesText(product: Product, text: string): boolean {
  const haystack = [
    product.name,
    product.summary,
    product.category,
    product.subcategory,
    product.materials,
    ...product.tags,
  ]
    .join(' ')
    .toLowerCase()
  return text
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term))
}

/** Filters that define which products a page is "about"; facets are computed inside this scope. */
function inScope(product: Product, query: ProductQuery): boolean {
  if (query.category && product.category !== query.category) return false
  if (query.collection && !product.collectionSlugs.includes(query.collection)) return false
  if (query.q && !matchesText(product, query.q)) return false
  if (query.onSale && !isOnSale(product)) return false
  return true
}

function hasInStockOption(product: Product, key: string, wanted: string[]): boolean {
  return product.variants.some((v) => v.stock > 0 && wanted.includes(v.options[key] ?? ''))
}

/** Filters a shopper narrows with, applied after the scope. */
function passesFilters(product: Product, query: ProductQuery): boolean {
  if (query.subcategory && product.subcategory !== query.subcategory) return false
  if (query.sizes.length > 0 && !hasInStockOption(product, 'size', query.sizes)) return false
  if (query.colors.length > 0 && !hasInStockOption(product, 'color', query.colors)) return false
  if (query.minPrice !== undefined && product.price < query.minPrice) return false
  if (query.maxPrice !== undefined && product.price > query.maxPrice) return false
  if (query.tryOn && product.tryOn === null) return false
  return true
}

const byNewest = (a: Product, b: Product) => b.createdAt.localeCompare(a.createdAt)
const byRating = (a: Product, b: Product) =>
  b.rating.average - a.rating.average || b.rating.count - a.rating.count

const comparators: Record<ProductQuery['sort'], (a: Product, b: Product) => number> = {
  featured: (a, b) => Number(b.featured) - Number(a.featured) || byRating(a, b),
  newest: byNewest,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: byRating,
}

export function computeFacets(products: Product[]): Facets {
  const subcategories = new Map<string, number>()
  const sizes = new Set<string>()
  const colors = new Map<string, string | undefined>()

  for (const product of products) {
    subcategories.set(product.subcategory, (subcategories.get(product.subcategory) ?? 0) + 1)
    for (const group of product.optionGroups) {
      if (group.kind === 'size') group.values.forEach((v) => sizes.add(v.value))
      if (group.kind === 'color') group.values.forEach((v) => colors.set(v.value, v.swatch))
    }
  }

  const prices = products.map((p) => p.price)
  return {
    subcategories: [...subcategories].map(([slug, count]) => ({ slug, count })),
    sizes: [...sizes],
    colors: [...colors].map(([value, swatch]) => ({ value, swatch })),
    priceRange: {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 0,
    },
  }
}

export function listProducts(all: Product[], partial: Partial<ProductQuery> = {}): ProductList {
  const query: ProductQuery = { ...DEFAULT_QUERY, ...partial }
  const scoped = all.filter((product) => inScope(product, query))
  const matched = scoped
    .filter((product) => passesFilters(product, query))
    .sort(comparators[query.sort])

  const pageCount = Math.max(1, Math.ceil(matched.length / query.pageSize))
  const page = Math.min(query.page, pageCount)
  const start = (page - 1) * query.pageSize

  return {
    page: {
      items: matched.slice(start, start + query.pageSize),
      total: matched.length,
      page,
      pageSize: query.pageSize,
      pageCount,
    },
    facets: computeFacets(scoped),
  }
}
