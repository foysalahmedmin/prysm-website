import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('sale')

export default function SalePage() {
  return <PageShell id="sale" />
}
