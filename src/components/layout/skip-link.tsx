import type { ReactNode } from 'react'

export interface SkipLinkProps {
  href?: string
  children?: ReactNode
  className?: string
}

/**
 * An accessible skip link that remains visually hidden until focused via keyboard navigation.
 */
export function SkipLink({
  href = '#main-content',
  children = 'Skip to content',
  className = '',
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className={`sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-on-brand focus:ring-2 focus:ring-focus focus:outline-none ${className}`}
    >
      {children}
    </a>
  )
}
