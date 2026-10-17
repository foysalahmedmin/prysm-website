import { LoginView } from '@/components/commerce/auth-views'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('login')

export default function LoginPage() {
  return <LoginView />
}
