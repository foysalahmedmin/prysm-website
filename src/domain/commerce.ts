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

export const AddressSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().min(1),
  region: z.string().min(1),
  postcode: z.string().min(1),
  country: z.string().min(1),
  phone: z.string().optional(),
  isDefault: z.boolean().optional(),
})
export type Address = z.infer<typeof AddressSchema>

export const CustomerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
})
export type Customer = z.infer<typeof CustomerSchema>

export const OrderPaymentSchema = z.object({
  brand: z.string().min(1),
  last4: z.string().min(4).max(4),
  expMonth: z.number().int().min(1).max(12),
  expYear: z.number().int().min(2024),
})
export type OrderPayment = z.infer<typeof OrderPaymentSchema>

export const OrderLineSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
  title: z.string().min(1),
  options: z.record(z.string(), z.string()).default({}),
  unitPrice: z.number().int().nonnegative(),
  quantity: z.number().int().min(1),
  image: z.string().optional(),
})
export type OrderLine = z.infer<typeof OrderLineSchema>

export const OrderStatusSchema = z.enum(['confirmed', 'processing', 'shipped', 'delivered'])
export type OrderStatus = z.infer<typeof OrderStatusSchema>

export const OrderSchema = z.object({
  id: z.string().min(1),
  number: z.string().min(1),
  createdAt: z.string().min(1),
  customerEmail: z.string().email(),
  lines: z.array(OrderLineSchema),
  address: AddressSchema,
  shippingMethod: ShippingMethodSchema,
  payment: OrderPaymentSchema,
  totals: CartTotalsSchema,
  status: OrderStatusSchema,
})
export type Order = z.infer<typeof OrderSchema>

