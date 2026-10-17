import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('terms')

export default function TermsPage() {
  return <PageShell id="terms" />
}
