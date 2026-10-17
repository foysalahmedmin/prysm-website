'use client'

import { type RefObject, useEffect } from 'react'
import { useReducedMotion } from './use-reduced-motion'

/**
 * Hook that sets `--angle` CSS variable on the referenced element
 * corresponding to the angle from the element's centre to the cursor.
 * When prefers-reduced-motion is true, fixes --angle to 0deg and does not track pointer.
 */
export function usePointerAngle<T extends HTMLElement = HTMLElement>(
  targetRef: RefObject<T | null>,
): void {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const element = targetRef.current
    if (!element) return

    if (reducedMotion) {
      element.style.setProperty('--angle', '0deg')
      return
    }

    const handlePointerMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const dx = e.clientX - centerX
      const dy = e.clientY - centerY

      // Calculate angle in degrees
      const rad = Math.atan2(dy, dx)
      const deg = Math.round((rad * 180) / Math.PI)
      // Normalize to 0-360 deg
      const normalizedDeg = (deg + 360) % 360

      element.style.setProperty('--angle', `${normalizedDeg}deg`)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [targetRef, reducedMotion])
}
