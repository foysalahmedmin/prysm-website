import { StoresView } from '@/components/editorial/stores-view'
import { pageMetadata } from '@/lib/metadata'
import { services } from '@/services'

export const generateMetadata = () => pageMetadata('stores')

export default async function StoresPage() {
  const stores = await services.content.listStores()
  return <StoresView stores={stores} />
}
