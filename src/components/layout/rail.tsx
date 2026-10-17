'use client'

import { useRef, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight } from '@/components/icons'
import { cn } from '@/lib/cn'

export interface RailProps {
  label: string
  previousLabel: string
  nextLabel: string
  children: ReactNode
  className?: string
}

export function Rail({ label, previousLabel, nextLabel, children, className }: RailProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const offset = scrollRef.current.clientWidth * 0.75
    if (typeof scrollRef.current.scrollBy === 'function') {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -offset : offset,
        behavior: 'smooth',
      })
    } else {
      scrollRef.current.scrollLeft += direction === 'left' ? -offset : offset
    }
  }

  return (
    <section aria-label={label} className={cn('relative flex flex-col gap-4', className)}>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-ink">{label}</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={previousLabel}
            onClick={() => scroll('left')}
            className="glass flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-focus"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={() => scroll('right')}
            className="glass flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-focus"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        tabIndex={0}
        role="region"
        aria-label={`${label} items`}
        className="flex snap-x scrollbar-none gap-5 overflow-x-auto pt-1 pb-4 focus-visible:outline-2 focus-visible:outline-focus"
      >
        {children}
      </div>
    </section>
  )
}
