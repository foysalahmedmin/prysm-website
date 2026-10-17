import { z } from 'zod'

export const ShippingMethodSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().int().nonnegative(),
  freeOver: z.number().int().positive().optional(),
  etaDays: z.object({ min: z.number().int().positive(), max: z.number().int().positive() }),
})
export type ShippingMethod = z.infer<typeof ShippingMethodSchema>

export const PromoSchema = z.discriminatedUnion('kind', [
  z.object({
    code: z.string().min(1),
    kind: z.literal('percent'),
    value: z.number().int().min(1).max(100),
    minSubtotal: z.number().int().nonnegative(),
    label: z.string().min(1),
  }),
  z.object({
    code: z.string().min(1),
    kind: z.literal('fixed'),
    value: z.number().int().positive(),
    minSubtotal: z.number().int().nonnegative(),
    label: z.string().min(1),
  }),
  z.object({
    code: z.string().min(1),
    kind: z.literal('free-shipping'),
    minSubtotal: z.number().int().nonnegative(),
    label: z.string().min(1),
  }),
])
export type Promo = z.infer<typeof PromoSchema>

export const CartLineInputSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
  quantity: z.number().int().min(1).max(10),
})
export type CartLineInput = z.infer<typeof CartLineInputSchema>

export const CartTotalsSchema = z.object({
  itemCount: z.number().int().nonnegative(),
  subtotal: z.number().int().nonnegative(),
  discount: z.number().int().nonnegative(),
  shipping: z.number().int().nonnegative(),
  tax: z.number().int().nonnegative(),
  total: z.number().int().nonnegative(),
})
export type CartTotals = z.infer<typeof CartTotalsSchema>
