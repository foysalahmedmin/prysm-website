import { z } from 'zod'

export const ContactFormSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  newsletterOptIn: z.boolean().default(false),
})
export type ContactFormData = z.infer<typeof ContactFormSchema>

export const AddressFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  line1: z.string().trim().min(3, 'Address line 1 is required'),
  line2: z.string().trim().optional(),
  city: z.string().trim().min(2, 'City is required'),
  region: z.string().trim().min(2, 'State or Region is required'),
  postcode: z.string().trim().min(3, 'Postal code is required'),
  country: z.string().trim().min(2, 'Country is required'),
  phone: z.string().trim().optional(),
})
export type AddressFormData = z.infer<typeof AddressFormSchema>

export const ShippingMethodFormSchema = z.object({
  shippingMethodId: z.string().min(1, 'Please select a delivery method'),
})
export type ShippingMethodFormData = z.infer<typeof ShippingMethodFormSchema>

export const PaymentFormSchema = z.object({
  cardholderName: z.string().trim().min(2, 'Cardholder name is required'),
  cardNumber: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, ''))
    .refine((val) => /^\d{16}$/.test(val), {
      message: 'Card number must be 16 digits',
    }),
  expDate: z
    .string()
    .trim()
    .refine((val) => /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(val), {
      message: 'Expiration date must be in MM/YY format',
    }),
  cvv: z
    .string()
    .trim()
    .refine((val) => /^\d{3,4}$/.test(val), {
      message: 'CVV must be 3 or 4 digits',
    }),
})
export type PaymentFormData = z.infer<typeof PaymentFormSchema>

export const CheckoutFormSchema = z.object({
  contact: ContactFormSchema,
  shippingAddress: AddressFormSchema,
  shippingMethodId: z.string().min(1, 'Please select a delivery method'),
  payment: PaymentFormSchema,
})
export type CheckoutFormData = z.infer<typeof CheckoutFormSchema>
