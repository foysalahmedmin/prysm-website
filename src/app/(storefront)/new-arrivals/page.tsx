import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('new-arrivals')

export default function NewArrivalsPage() {
  return <PageShell id="new-arrivals" />
}
