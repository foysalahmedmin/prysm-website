'use server'

import { z } from 'zod'
import { brand } from '@/config/brand'
import type { Order, OrderLine, OrderPayment } from '@/domain'
import { quoteCart } from '@/features/cart/quote'
import { services } from '@/services'
import { generateOrderId, generateOrderNumber } from './order-generator'
import { CheckoutFormSchema } from './schemas'

const PlaceOrderInputSchema = z.object({
  checkout: CheckoutFormSchema,
  lines: z.array(
    z.object({
      productId: z.string().min(1),
      variantId: z.string().min(1),
      quantity: z.number().int().min(1).max(10),
    }),
  ),
  promoCode: z.string().optional(),
})
export type PlaceOrderInput = z.infer<typeof PlaceOrderInputSchema>

export interface PlaceOrderResult {
  ok: boolean
  order?: Order
  error?: string
}

/**
 * Server action to validate checkout submission, calculate authoritative pricing,
 * create a confirmed Order record with item snapshots, and return it.
 */
export async function placeOrderAction(input: unknown): Promise<PlaceOrderResult> {
  try {
    const parsed = PlaceOrderInputSchema.parse(input)
    if (parsed.lines.length === 0) {
      return { ok: false, error: 'Your cart is empty.' }
    }

    const quote = await quoteCart(
      {
        lines: parsed.lines,
        promoCode: parsed.promoCode,
        shippingMethodId: parsed.checkout.shippingMethodId,
      },
      services,
      brand.taxRate,
    )

    if (!quote.shippingMethod) {
      return { ok: false, error: 'Please select a valid delivery method.' }
    }

    const orderLines: OrderLine[] = quote.lines.map((l) => ({
      productId: l.productId,
      variantId: l.variantId,
      title: l.name,
      options: l.options,
      unitPrice: l.unitPrice,
      quantity: l.quantity,
      image: l.image.src,
    }))

    const last4 = parsed.checkout.payment.cardNumber.slice(-4)
    const expParts = parsed.checkout.payment.expDate.split('/')
    const expMonth = parseInt(expParts[0] ?? '12', 10)
    const expYear = 2000 + parseInt(expParts[1] ?? '28', 10)

    const payment: OrderPayment = {
      brand: 'Visa',
      last4,
      expMonth,
      expYear,
    }

    const id = generateOrderId()
    const number = generateOrderNumber(brand.id)

    const order: Order = {
      id,
      number,
      createdAt: new Date().toISOString(),
      customerEmail: parsed.checkout.contact.email,
      lines: orderLines,
      address: {
        name: parsed.checkout.shippingAddress.name,
        line1: parsed.checkout.shippingAddress.line1,
        line2: parsed.checkout.shippingAddress.line2,
        city: parsed.checkout.shippingAddress.city,
        region: parsed.checkout.shippingAddress.region,
        postcode: parsed.checkout.shippingAddress.postcode,
        country: parsed.checkout.shippingAddress.country,
        phone: parsed.checkout.shippingAddress.phone,
      },
      shippingMethod: quote.shippingMethod,
      payment,
      totals: quote.totals,
      status: 'confirmed',
    }

    return { ok: true, order }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Order placement failed.'
    return { ok: false, error: msg }
  }
}
