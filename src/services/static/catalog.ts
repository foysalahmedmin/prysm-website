import { categories } from '@/data/categories'
import { collections } from '@/data/collections'
import { products } from '@/data/products'
import { reviews } from '@/data/reviews'
import { listProducts } from '@/features/catalog/query'
import type { CatalogService } from '../types'

export function createStaticCatalogService(): CatalogService {
  return {
    async listProducts(query) {
      return listProducts(products, query)
    },

    async listProductSlugs() {
      return products.map((product) => product.slug)
    },

    async getProduct(slug) {
      return products.find((product) => product.slug === slug) ?? null
    },

    async getProductsByIds(ids) {
      return products.filter((product) => ids.includes(product.id))
    },

    async getRelatedProducts(slug, limit = 4) {
      const current = products.find((product) => product.slug === slug)
      if (!current) return []
      const overlap = (other: (typeof products)[number]) =>
        other.collectionSlugs.filter((c) => current.collectionSlugs.includes(c)).length +
        (other.category === current.category ? 2 : 0)
      return products
        .filter((other) => other.id !== current.id && overlap(other) > 0)
        .sort((a, b) => overlap(b) - overlap(a) || b.rating.average - a.rating.average)
        .slice(0, limit)
    },

    async listCategories() {
      return categories
    },

    async getCategory(slug) {
      return categories.find((category) => category.slug === slug) ?? null
    },

    async listCollections() {
      return collections
    },

    async getCollection(slug) {
      return collections.find((collection) => collection.slug === slug) ?? null
    },

    async listReviews(productId) {
      return reviews.filter((review) => review.productId === productId)
    },
  }
}
