import { WishlistView } from '@/components/commerce/wishlist-view'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('wishlist')

export default function WishlistPage() {
  return <WishlistView />
}
