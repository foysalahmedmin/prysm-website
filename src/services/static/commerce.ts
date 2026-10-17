import { promos } from '@/data/promos'
import { shippingMethods } from '@/data/shipping'
import type { CommerceService } from '../types'

export function createStaticCommerceService(): CommerceService {
  return {
    async listShippingMethods() {
      return shippingMethods
    },
    async findPromo(code) {
      const wanted = code.trim().toUpperCase()
      return promos.find((promo) => promo.code === wanted) ?? null
    },
  }
}
