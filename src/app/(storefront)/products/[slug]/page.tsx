import { notFound } from 'next/navigation'
import { ProductDetailView } from '@/components/commerce/product-detail-view'
import { services } from '@/services'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await services.catalog.getProduct(slug)
  if (!product) return { title: 'Piece Not Found' }

  return {
    title: `${product.name} — PRYSM`,
    description: product.summary,
    openGraph: {
      title: `${product.name} — PRYSM`,
      description: product.summary,
      images: product.media[0]?.src ? [{ url: product.media[0].src }] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await services.catalog.getProduct(slug)
  if (!product) notFound()

  const [reviews, relatedProducts, allCatalogResult] = await Promise.all([
    services.catalog.listReviews(product.id),
    services.catalog.getRelatedProducts(product.slug, 4),
    services.catalog.listProducts({ pageSize: 48 }),
  ])

  return (
    <ProductDetailView
      product={product}
      reviews={reviews}
      relatedProducts={relatedProducts}
      allCatalogProducts={allCatalogResult.page.items}
    />
  )
}
