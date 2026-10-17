'use server'

import type { Product } from '@/domain'
import { services } from '@/services'

/**
 * Server action to search products with live autocomplete query.
 */
export async function searchProductsAction(query: string): Promise<Product[]> {
  const trimmed = query.trim()
  if (!trimmed) return []
  const result = await services.catalog.listProducts({ q: trimmed, pageSize: 6 })
  return result.page.items
}
