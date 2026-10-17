import { AccountOrdersView } from '@/components/commerce/account-views'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('orders')

export default function AccountOrdersPage() {
  return <AccountOrdersView />
}
