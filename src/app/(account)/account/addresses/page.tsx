import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('addresses')

export default function AddressesPage() {
  return <PageShell id="addresses" />
}
