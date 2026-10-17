import { CheckoutView } from '@/components/commerce/checkout-view'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('checkout')

export default function CheckoutPage() {
  return <CheckoutView />
}
