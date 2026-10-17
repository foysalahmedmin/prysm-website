import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('journal')

export default function JournalPage() {
  return <PageShell id="journal" />
}
