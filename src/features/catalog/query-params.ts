import { DEFAULT_QUERY, CategorySlugSchema, SortKeySchema } from '@/domain'
import type { ProductQuery } from '@/domain'

type RawParams = Record<string, string | string[] | undefined>

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value

const list = (value: string | string[] | undefined): string[] =>
  (Array.isArray(value) ? value : [value])
    .flatMap((item) => (item ?? '').split(','))
    .map((item) => item.trim())
    .filter(Boolean)

const positiveInt = (value: string | undefined): number | undefined => {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined
}

const priceToMinor = (value: string | undefined): number | undefined => {
  const parsed = Number(value)
  return value !== undefined && value !== '' && Number.isFinite(parsed) && parsed >= 0
    ? Math.round(parsed * 100)
    : undefined
}

/** URL params -> typed query. Unknown or invalid values fall back to defaults; this never throws. */
export function parseProductQuery(params: RawParams): ProductQuery {
  const category = CategorySlugSchema.safeParse(first(params.category))
  const sort = SortKeySchema.safeParse(first(params.sort))
  const pageSize = positiveInt(first(params.pageSize))

  return {
    ...DEFAULT_QUERY,
    category: category.success ? category.data : undefined,
    subcategory: first(params.subcategory) || undefined,
    collection: first(params.collection) || undefined,
    q: first(params.q)?.trim() || undefined,
    sizes: list(params.size),
    colors: list(params.color),
    minPrice: priceToMinor(first(params.min)),
    maxPrice: priceToMinor(first(params.max)),
    onSale: first(params.sale) === '1',
    sort: sort.success ? sort.data : DEFAULT_QUERY.sort,
    page: positiveInt(first(params.page)) ?? DEFAULT_QUERY.page,
    pageSize: pageSize && pageSize <= 48 ? pageSize : DEFAULT_QUERY.pageSize,
  }
}

/** Typed query -> URL search string, omitting anything that equals its default. */
export function serializeProductQuery(query: Partial<ProductQuery>): string {
  const params = new URLSearchParams()
  if (query.category) params.set('category', query.category)
  if (query.subcategory) params.set('subcategory', query.subcategory)
  if (query.collection) params.set('collection', query.collection)
  if (query.q) params.set('q', query.q)
  if (query.sizes?.length) params.set('size', query.sizes.join(','))
  if (query.colors?.length) params.set('color', query.colors.join(','))
  if (query.minPrice !== undefined) params.set('min', String(query.minPrice / 100))
  if (query.maxPrice !== undefined) params.set('max', String(query.maxPrice / 100))
  if (query.onSale) params.set('sale', '1')
  if (query.sort && query.sort !== DEFAULT_QUERY.sort) params.set('sort', query.sort)
  if (query.page && query.page !== DEFAULT_QUERY.page) params.set('page', String(query.page))
  if (query.pageSize && query.pageSize !== DEFAULT_QUERY.pageSize)
    params.set('pageSize', String(query.pageSize))
  return params.toString()
}
