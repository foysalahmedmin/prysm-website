import { Suspense } from 'react'
import { ProductListView } from '@/components/commerce/product-list-view'
import { parseProductQuery } from '@/features/catalog/query-params'
import { pageMetadata } from '@/lib/metadata'
import { services } from '@/services'

export const generateMetadata = () => pageMetadata('shop')

interface ShopPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const rawParams = await searchParams
  const query = parseProductQuery(rawParams)

  const result = await services.catalog.listProducts(query)

  return (
    <Suspense fallback={<div className="min-h-[400px] animate-pulse rounded-[32px] bg-surface" />}>
      <ProductListView
        products={result.page.items}
        total={result.page.total}
        facets={result.facets}
        query={query}
        title="All Pieces"
        description="The complete PRYSM archive: refractive tailoring, spectral lightwear, and precision jewelry."
        basePath="/shop"
      />
    </Suspense>
  )
}
