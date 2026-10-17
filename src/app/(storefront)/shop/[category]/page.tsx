import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ProductListView } from '@/components/commerce/product-list-view'
import type { CategorySlug } from '@/domain'
import { parseProductQuery } from '@/features/catalog/query-params'
import { services } from '@/services'

interface CategoryPageProps {
  params: Promise<{ category: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: slug } = await params
  const cat = await services.catalog.getCategory(slug)
  if (!cat) return { title: 'Category' }
  return {
    title: `${cat.name} — PRYSM`,
    description: cat.description,
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category: slug } = await params
  const cat = await services.catalog.getCategory(slug)
  if (!cat) notFound()

  const rawParams = await searchParams
  const query = parseProductQuery({
    ...rawParams,
    category: slug as CategorySlug,
  })

  const result = await services.catalog.listProducts(query)

  return (
    <Suspense fallback={<div className="min-h-[400px] animate-pulse rounded-[32px] bg-surface" />}>
      <ProductListView
        products={result.page.items}
        total={result.page.total}
        facets={result.facets}
        query={query}
        title={cat.name}
        description={cat.description}
        basePath={`/shop/${slug}`}
      />
    </Suspense>
  )
}
