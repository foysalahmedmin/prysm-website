import { ShippingReturnsView } from '@/components/editorial/shipping-returns-view'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('shipping-returns')

export default function ShippingReturnsPage() {
  return <ShippingReturnsView />
}
