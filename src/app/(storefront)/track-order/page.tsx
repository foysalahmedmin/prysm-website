import { TrackOrderView } from '@/components/commerce/track-order-view'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('track-order')

export default function TrackOrderPage() {
  return <TrackOrderView />
}
