import { AccountAddressesView } from '@/components/commerce/account-views'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('addresses')

export default function AccountAddressesPage() {
  return <AccountAddressesView />
}
