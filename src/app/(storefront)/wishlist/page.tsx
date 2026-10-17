import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('wishlist')

export default function WishlistPage() {
  return <PageShell id="wishlist" />
}
