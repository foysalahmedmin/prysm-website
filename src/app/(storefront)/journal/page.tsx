import { JournalView } from '@/components/editorial/journal-view'
import { pageMetadata } from '@/lib/metadata'
import { services } from '@/services'

export const generateMetadata = () => pageMetadata('journal')

export default async function JournalPage() {
  const posts = await services.content.listJournal()
  return <JournalView posts={posts} />
}
