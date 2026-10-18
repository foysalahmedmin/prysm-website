import { LookbookView } from '@/components/editorial/lookbook-view'
import { pageMetadata } from '@/lib/metadata'
import { services } from '@/services'

export const generateMetadata = () => pageMetadata('lookbook')

export default async function LookbookPage() {
  const [lookbook, catalogResult] = await Promise.all([
    services.content.getLookbook(),
    services.catalog.listProducts({ pageSize: 200 }),
  ])

  return <LookbookView lookbook={lookbook} products={catalogResult.page.items} />
}
