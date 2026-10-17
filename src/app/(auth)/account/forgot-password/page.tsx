import { PageShell } from '@/components/layout/page-shell'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('forgot-password')

export default function ForgotPasswordPage() {
  return <PageShell id="forgot-password" />
}
