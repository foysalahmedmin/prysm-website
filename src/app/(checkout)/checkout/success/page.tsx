import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('checkout-success')

export default function CheckoutSuccessPage() {
  return <PageShell id="checkout-success" />
}
