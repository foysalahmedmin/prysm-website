import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('privacy')

export default function PrivacyPage() {
  return <PageShell id="privacy" />
}
