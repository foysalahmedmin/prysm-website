import { ForgotPasswordView } from '@/components/commerce/auth-views'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('forgot-password')

export default function ForgotPasswordPage() {
  return <ForgotPasswordView />
}
