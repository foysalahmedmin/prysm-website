'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { useReducedMotion } from './use-reduced-motion'

export interface LightFieldProps {
  className?: string
}

/**
 * PRYSM LightField.
 * Four large blurred colour blobs (rose, ice, citrine, lavender),
 * position: fixed, drifting with `transform` only on a 26s loop.
 * Pauses when tab is hidden or when prefers-reduced-motion is active.
 */
export function LightField({ className }: LightFieldProps) {
  const reducedMotion = useReducedMotion()
  const [isTabHidden, setIsTabHidden] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false
    return document.hidden
  })

  useEffect(() => {
    if (typeof document === 'undefined') return

    const handleVisibility = () => {
      setIsTabHidden(document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  const isPaused = isTabHidden || reducedMotion

  return (
    <div
      data-light-field=""
      data-reduced-motion={reducedMotion ? 'true' : undefined}
      data-paused={isPaused ? 'true' : undefined}
      aria-hidden="true"
      className={cn(
        'prysm-light-field pointer-events-none fixed inset-0 -z-10 overflow-hidden',
        className,
      )}
    >
      <div data-blob="rose" className="prysm-blob prysm-blob-rose" />
      <div data-blob="ice" className="prysm-blob prysm-blob-ice" />
      <div data-blob="citrine" className="prysm-blob prysm-blob-citrine" />
      <div data-blob="lavender" className="prysm-blob prysm-blob-lavender" />
    </div>
  )
}
