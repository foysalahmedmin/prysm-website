import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('track-order')

export default function TrackOrderPage() {
  return <PageShell id="track-order" />
}
