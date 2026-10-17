import { notFound } from 'next/navigation'
import { PageShell } from '@/components/layout/page-shell'
import { services } from '@/services'

export async function generateStaticParams() {
  const categories = await services.catalog.listCategories()
  return categories.map((category) => ({ category: category.slug }))
}

export async function generateMetadata({ params }: PageProps<'/shop/[category]'>) {
  const { category } = await params
  const found = await services.catalog.getCategory(category)
  return found ? { title: found.name, description: found.description } : {}
}

export default async function CategoryPage({ params }: PageProps<'/shop/[category]'>) {
  const { category } = await params
  const found = await services.catalog.getCategory(category)
  if (!found) notFound()
  return <PageShell id="category" title={found.name} description={found.description} />
}
