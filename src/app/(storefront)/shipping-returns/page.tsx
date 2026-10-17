import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('shipping-returns')

export default function ShippingReturnsPage() {
  return <PageShell id="shipping-returns" />
}
