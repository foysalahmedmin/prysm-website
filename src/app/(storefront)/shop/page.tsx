import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('shop')

export default function ShopPage() {
  return <PageShell id="shop" />
}
