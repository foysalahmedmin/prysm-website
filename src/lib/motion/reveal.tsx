'use client'

import { useRef, type CSSProperties, type ReactNode } from 'react'
import { useReveal } from './use-reveal'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Milliseconds to wait once the element is in view: use it to stagger siblings. */
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'header'
}

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { style } = useReveal(ref, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
  const timed: CSSProperties = delay ? { ...style, transitionDelay: `${delay}ms` } : style
  const Component = Tag as 'div'
  return (
    <Component ref={ref} className={className} style={timed}>
      {children}
    </Component>
  )
}
