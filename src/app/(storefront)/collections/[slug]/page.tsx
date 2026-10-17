import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ProductListView } from '@/components/commerce/product-list-view'
import { parseProductQuery } from '@/features/catalog/query-params'
import { services } from '@/services'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const { slug } = await params
  const coll = await services.catalog.getCollection(slug)
  if (!coll) return { title: 'Collection' }
  return {
    title: `${coll.name} — PRYSM`,
    description: coll.description,
  }
}

export default async function CollectionDetailPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const { slug } = await params
  const coll = await services.catalog.getCollection(slug)
  if (!coll) notFound()

  const rawParams = await searchParams
  const query = parseProductQuery({
    ...rawParams,
    collection: slug,
  })

  const result = await services.catalog.listProducts(query)

  return (
    <Suspense fallback={<div className="min-h-[400px] animate-pulse rounded-[32px] bg-surface" />}>
      <ProductListView
        products={result.page.items}
        total={result.page.total}
        facets={result.facets}
        query={query}
        title={coll.name}
        description={coll.description}
        basePath={`/collections/${slug}`}
      />
    </Suspense>
  )
}
