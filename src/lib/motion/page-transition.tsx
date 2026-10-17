'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useReducedMotion } from './use-reduced-motion'

export interface PageTransitionProps {
  children: ReactNode
  className?: string
}

/**
 * PRYSM PageTransition.
 * Cross-fade with subtle blur entry (300ms).
 * Reduced motion removes blur-in and shortens transition duration (≤150ms).
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const reducedMotion = useReducedMotion()

  return (
    <div
      data-page-transition=""
      data-reduced-motion={reducedMotion ? 'true' : undefined}
      className={cn('prysm-page-transition', className)}
    >
      {children}
    </div>
  )
}
