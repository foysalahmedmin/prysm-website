import { AccountProfileView } from '@/components/commerce/account-views'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('profile')

export default function AccountProfilePage() {
  return <AccountProfileView />
}
