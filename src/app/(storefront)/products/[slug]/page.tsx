import { notFound } from 'next/navigation'
import { PageShell } from '@/components/layout/page-shell'
import { services } from '@/services'

export async function generateStaticParams() {
  const slugs = await services.catalog.listProductSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps<'/products/[slug]'>) {
  const { slug } = await params
  const product = await services.catalog.getProduct(slug)
  return product ? { title: product.name, description: product.summary } : {}
}

export default async function ProductPage({ params }: PageProps<'/products/[slug]'>) {
  const { slug } = await params
  const product = await services.catalog.getProduct(slug)
  if (!product) notFound()
  return <PageShell id="product" title={product.name} description={product.summary} />
}
