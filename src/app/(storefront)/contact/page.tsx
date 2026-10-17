import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('contact')

export default function ContactPage() {
  return <PageShell id="contact" />
}
