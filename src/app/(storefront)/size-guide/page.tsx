import { SizeGuideView } from '@/components/editorial/size-guide-view'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('size-guide')

export default function SizeGuidePage() {
  return <SizeGuideView />
}
