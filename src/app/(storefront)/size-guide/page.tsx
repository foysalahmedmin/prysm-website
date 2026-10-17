import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('size-guide')

export default function SizeGuidePage() {
  return <PageShell id="size-guide" />
}
