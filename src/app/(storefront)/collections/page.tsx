import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('collections')

export default function CollectionsPage() {
  return <PageShell id="collections" />
}
