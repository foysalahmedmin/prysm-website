import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('search')

export default function SearchPage() {
  return <PageShell id="search" />
}
