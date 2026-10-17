import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('profile')

export default function ProfilePage() {
  return <PageShell id="profile" />
}
