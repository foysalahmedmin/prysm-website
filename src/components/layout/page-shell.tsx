import type { ReactNode } from 'react'
import type { PageId } from '@/domain'
import { services } from '@/services'

interface PageShellProps {
  id: PageId
  /** Overrides the content title, for pages named after an entity (a product, a collection). */
  title?: string
  description?: string
  children?: ReactNode
}

/**
 * Phase 1 placeholder for every page. Route-group layouts own <main>, so this renders a div.
 * It is replaced page by page as each store builds its own layout.
 */
export async function PageShell({ id, title, description, children }: PageShellProps) {
  const page = await services.content.getPage(id)
  return (
    <div data-page={id}>
      <h1>{title ?? page.title}</h1>
      <p>{description ?? page.description}</p>
      {children}
    </div>
  )
}
