import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('checkout')

export default function CheckoutPage() {
  return <PageShell id="checkout" />
}
