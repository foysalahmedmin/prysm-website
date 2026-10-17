import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('lookbook')

export default function LookbookPage() {
  return <PageShell id="lookbook" />
}
