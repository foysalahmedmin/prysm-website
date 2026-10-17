import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('orders')

export default function OrdersPage() {
  return <PageShell id="orders" />
}
