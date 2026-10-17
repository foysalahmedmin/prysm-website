import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('register')

export default function RegisterPage() {
  return <PageShell id="register" />
}
