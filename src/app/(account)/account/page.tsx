import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('account')

export default function AccountPage() {
  return <PageShell id="account" />
}
