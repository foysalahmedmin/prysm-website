import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('cart')

export default function CartPage() {
  return <PageShell id="cart" />
}
