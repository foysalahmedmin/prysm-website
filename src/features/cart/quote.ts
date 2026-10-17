import { z } from 'zod'
import { CartLineInputSchema, unitPrice } from '@/domain'
import type { CartTotals, Media, Product, ShippingMethod } from '@/domain'
import type { Services } from '@/services/types'
import { priceCart, type PricedLine } from './pricing'

export const QuoteInputSchema = z.object({
  lines: z.array(CartLineInputSchema),
  promoCode: z.string().optional(),
  shippingMethodId: z.string().optional(),
})
export type QuoteInput = z.infer<typeof QuoteInputSchema>

export type LineIssue = 'unavailable' | 'out-of-stock' | 'limited-stock'
export type PromoError = 'not-found' | 'min-subtotal'

export interface QuoteLine {
  productId: string
  variantId: string
  slug: string
  category: Product['category']
  subcategory: string
  name: string
  image: Media
  options: Record<string, string>
  quantity: number
  unitPrice: number
  lineTotal: number
  issue?: LineIssue
}

export interface Quote {
  lines: QuoteLine[]
  totals: CartTotals
  promo: { code: string; label: string } | null
  promoError: PromoError | null
  shippingMethod: ShippingMethod | null
  /** Minor units still needed for free shipping on the chosen method, or null if it has no threshold. */
  freeShippingRemaining: number | null
}

/**
 * Prices a cart from ids and quantities only. The browser never sends prices;
 * everything is re-read through the services, exactly as a real backend would do.
 */
export async function quoteCart(
  rawInput: unknown,
  services: Pick<Services, 'catalog' | 'commerce'>,
  taxRate: number,
): Promise<Quote> {
  const input = QuoteInputSchema.parse(rawInput)
  const products = await services.catalog.getProductsByIds(input.lines.map((l) => l.productId))
  const shippingMethods = await services.commerce.listShippingMethods()
  const shippingMethod =
    shippingMethods.find((m) => m.id === input.shippingMethodId) ?? shippingMethods[0] ?? null

  const quoteLines: QuoteLine[] = []
  const priced: PricedLine[] = []

  for (const line of input.lines) {
    const product = products.find((p) => p.id === line.productId)
    const variant = product?.variants.find((v) => v.id === line.variantId)
    if (!product || !variant) continue

    const quantity = Math.min(line.quantity, variant.stock)
    const issue: LineIssue | undefined =
      variant.stock === 0 ? 'out-of-stock' : quantity < line.quantity ? 'limited-stock' : undefined
    const price = unitPrice(product, variant.id)

    quoteLines.push({
      productId: product.id,
      variantId: variant.id,
      slug: product.slug,
      category: product.category,
      subcategory: product.subcategory,
      name: product.name,
      image: product.media[0]!,
      options: variant.options,
      quantity,
      unitPrice: price,
      lineTotal: price * quantity,
      issue,
    })
    if (quantity > 0) priced.push({ product, variantId: variant.id, quantity })
  }

  const subtotal = priced.reduce(
    (sum, l) => sum + unitPrice(l.product, l.variantId) * l.quantity,
    0,
  )
  const found = input.promoCode ? await services.commerce.findPromo(input.promoCode) : null
  const promoError: PromoError | null = !input.promoCode
    ? null
    : !found
      ? 'not-found'
      : subtotal < found.minSubtotal
        ? 'min-subtotal'
        : null
  const promo = found && !promoError ? found : null

  const totals = priceCart({ lines: priced, promo, shipping: shippingMethod, taxRate })
  const freeOver = shippingMethod?.freeOver
  const freeShippingRemaining =
    freeOver === undefined ? null : Math.max(0, freeOver - (totals.subtotal - totals.discount))

  return {
    lines: quoteLines,
    totals,
    promo: promo ? { code: promo.code, label: promo.label } : null,
    promoError,
    shippingMethod,
    freeShippingRemaining,
  }
}
