import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('about')

export default function AboutPage() {
  return <PageShell id="about" />
}
