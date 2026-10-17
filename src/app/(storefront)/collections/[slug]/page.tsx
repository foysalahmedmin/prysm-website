import { notFound } from 'next/navigation'
import { PageShell } from '@/components/layout/page-shell'
import { services } from '@/services'

export async function generateStaticParams() {
  const collections = await services.catalog.listCollections()
  return collections.map((collection) => ({ slug: collection.slug }))
}

export async function generateMetadata({ params }: PageProps<'/collections/[slug]'>) {
  const { slug } = await params
  const found = await services.catalog.getCollection(slug)
  return found ? { title: found.name, description: found.description } : {}
}

export default async function CollectionPage({ params }: PageProps<'/collections/[slug]'>) {
  const { slug } = await params
  const found = await services.catalog.getCollection(slug)
  if (!found) notFound()
  return <PageShell id="collection" title={found.name} description={found.description} />
}
