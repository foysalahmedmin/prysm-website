import { Suspense } from 'react'
import { ProductListView } from '@/components/commerce/product-list-view'
import { parseProductQuery } from '@/features/catalog/query-params'
import { pageMetadata } from '@/lib/metadata'
import { services } from '@/services'

export const generateMetadata = () => pageMetadata('sale')

interface SalePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function SalePage({ searchParams }: SalePageProps) {
  const rawParams = await searchParams
  const query = parseProductQuery({
    ...rawParams,
    sale: '1',
  })

  const result = await services.catalog.listProducts(query)

  return (
    <Suspense fallback={<div className="min-h-[400px] animate-pulse rounded-[32px] bg-surface" />}>
      <ProductListView
        products={result.page.items}
        total={result.page.total}
        facets={result.facets}
        query={query}
        title="Curated Archive Sale"
        description="Limited seasonal markdowns on select refractive outerwear, silk separates, and titanium forms."
        basePath="/sale"
      />
    </Suspense>
  )
}
