import { unitPrice } from '@/domain'
import type { CartTotals, Product, Promo, ShippingMethod } from '@/domain'

export interface PricedLine {
  product: Product
  variantId: string
  quantity: number
}

export interface PricingInput {
  lines: PricedLine[]
  promo: Promo | null
  shipping: ShippingMethod | null
  taxRate: number
}

export function promoDiscount(promo: Promo | null, subtotal: number): number {
  if (!promo || subtotal < promo.minSubtotal) return 0
  if (promo.kind === 'percent') return Math.round((subtotal * promo.value) / 100)
  if (promo.kind === 'fixed') return Math.min(promo.value, subtotal)
  return 0
}

export function shippingCost(
  shipping: ShippingMethod | null,
  promo: Promo | null,
  discountedSubtotal: number,
  subtotal: number,
): number {
  if (!shipping || subtotal === 0) return 0
  const promoWaives =
    promo?.kind === 'free-shipping' && subtotal >= promo.minSubtotal && shipping.id === 'standard'
  const thresholdWaives = shipping.freeOver !== undefined && discountedSubtotal >= shipping.freeOver
  return promoWaives || thresholdWaives ? 0 : shipping.price
}

export function priceCart({ lines, promo, shipping, taxRate }: PricingInput): CartTotals {
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0)
  const subtotal = lines.reduce(
    (sum, line) => sum + unitPrice(line.product, line.variantId) * line.quantity,
    0,
  )
  const discount = promoDiscount(promo, subtotal)
  const discounted = subtotal - discount
  const shippingTotal = shippingCost(shipping, promo, discounted, subtotal)
  const tax = Math.round(discounted * taxRate)

  return {
    itemCount,
    subtotal,
    discount,
    shipping: shippingTotal,
    tax,
    total: discounted + shippingTotal + tax,
  }
}
