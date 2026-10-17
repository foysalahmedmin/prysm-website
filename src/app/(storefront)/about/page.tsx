import { AboutView } from '@/components/editorial/about-view'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('about')

export default function AboutPage() {
  return <AboutView />
}
