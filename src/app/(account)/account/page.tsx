import { AccountDashboardView } from '@/components/commerce/account-views'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('account')

export default function AccountPage() {
  return <AccountDashboardView />
}
