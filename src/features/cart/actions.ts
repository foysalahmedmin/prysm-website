'use server'

import { brand } from '@/config/brand'
import { quoteCart, type Quote } from '@/features/cart/quote'
import { services } from '@/services'

/**
 * Server action to price a cart server-side from product ids, variants, and quantities.
 */
export async function quoteCartAction(input: unknown): Promise<Quote> {
  return quoteCart(input, services, brand.taxRate)
}
