import { Suspense } from 'react'
import { ProductListView } from '@/components/commerce/product-list-view'
import { parseProductQuery } from '@/features/catalog/query-params'
import { pageMetadata } from '@/lib/metadata'
import { services } from '@/services'

export const generateMetadata = () => pageMetadata('search')

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default function SearchPage(props: SearchPageProps) {
  return (
    <Suspense fallback={<div className="min-h-[400px] animate-pulse rounded-md bg-surface" />}>
      <SearchContent {...props} />
    </Suspense>
  )
}

async function SearchContent({ searchParams }: SearchPageProps) {
  const rawParams = await searchParams
  const query = parseProductQuery(rawParams)
  const searchQuery = query.q || ''

  const result = await services.catalog.listProducts(query)

  const title = searchQuery ? `Search: "${searchQuery}"` : 'Search'
  const description = searchQuery
    ? `Showing results for query "${searchQuery}". Use the filters below to refine your selection.`
    : 'Enter keywords or apply filters to locate refractive pieces across the PRYSM catalog.'

  return (
    <Suspense fallback={<div className="min-h-[400px] animate-pulse rounded-md bg-surface" />}>
      <ProductListView
        products={result.page.items}
        total={result.page.total}
        facets={result.facets}
        query={query}
        title={title}
        description={description}
        basePath="/search"
      />
    </Suspense>
  )
}
