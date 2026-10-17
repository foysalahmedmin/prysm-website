import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('home')

export default function HomePage() {
  return <PageShell id="home" />
}
