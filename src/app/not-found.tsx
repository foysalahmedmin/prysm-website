import Link from 'next/link'
import { routes } from '@/config/routes'
import { systemCopy } from '@/config/system-copy'

export default function NotFound() {
  return (
    <main id="main" data-page="not-found">
      <h1>{systemCopy.notFound.title}</h1>
      <p>{systemCopy.notFound.body}</p>
      <Link href={routes.home}>{systemCopy.notFound.cta}</Link>
    </main>
  )
}
