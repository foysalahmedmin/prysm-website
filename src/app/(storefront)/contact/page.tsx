import { ContactView } from '@/components/editorial/contact-view'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('contact')

export default function ContactPage() {
  return <ContactView />
}
