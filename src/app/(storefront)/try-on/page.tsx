import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('try-on')

export default function TryOnPage() {
  return <PageShell id="try-on" />
}
