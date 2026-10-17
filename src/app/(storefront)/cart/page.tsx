import { CartView } from '@/components/commerce/cart-view'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('cart')

export default function CartPage() {
  return <CartView />
}
