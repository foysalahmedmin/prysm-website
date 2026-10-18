import { Suspense } from 'react'
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

export default function ProductPage(props: ProductPageProps) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] animate-pulse" aria-busy="true" />}>
      <ProductContent {...props} />
    </Suspense>
  )
}

async function ProductContent({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await services.catalog.getProduct(slug)
  if (!product) notFound()

  const [reviews, relatedProducts, allCatalogResult] = await Promise.all([
    services.catalog.listReviews(product.id),
    services.catalog.getRelatedProducts(product.slug, 4),
    services.catalog.listProducts({ pageSize: 48 }),
  ])

  const inStock = product.variants.some((v) => v.stock > 0)
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.summary,
    image: product.media.map((m) => m.src),
    category: product.category,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: (product.price / 100).toFixed(2),
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    ...(product.rating.count > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating.average.toFixed(1),
            reviewCount: product.rating.count,
          },
        }
      : {}),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: '/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: product.category.charAt(0).toUpperCase() + product.category.slice(1),
        item: `/category/${product.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailView
        product={product}
        reviews={reviews}
        relatedProducts={relatedProducts}
        allCatalogProducts={allCatalogResult.page.items}
      />
    </>
  )
}
