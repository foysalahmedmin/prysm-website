import { FaqView } from '@/components/editorial/faq-view'
import { pageMetadata } from '@/lib/metadata'
import { services } from '@/services'

export const generateMetadata = () => pageMetadata('faq')

export default async function FaqPage() {
  const items = await services.content.listFaq()
  return <FaqView items={items} />
}
