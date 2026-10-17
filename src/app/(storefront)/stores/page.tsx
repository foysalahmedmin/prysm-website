import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('stores')

export default function StoresPage() {
  return <PageShell id="stores" />
}
