import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('login')

export default function LoginPage() {
  return <PageShell id="login" />
}
