import { RegisterView } from '@/components/commerce/auth-views'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('register')

export default function RegisterPage() {
  return <RegisterView />
}
