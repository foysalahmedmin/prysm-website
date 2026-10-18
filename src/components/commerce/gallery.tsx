'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, ArrowRight } from '@/components/icons'
import { cn } from '@/lib/cn'
import type { GalleryProps } from './contract'

/** Thumbnails run down the side on wide screens and along the bottom on small ones. */
export function Gallery({ media, labels, className }: GalleryProps & { className?: string }) {
  const [index, setIndex] = useState(0)
  const current = media[index]!
  return (
    <section
      aria-label={labels.group}
      className={cn('relative flex flex-col gap-3 lg:flex-row-reverse', className)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-canvas lg:flex-1">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="prysm-fade h-full w-full object-cover"
        />

        <div className="glass glass-strong absolute bottom-3 left-3 z-10 rounded-sm px-3 py-1.5">
          <p aria-live="polite" className="text-xs text-ink tabular-nums">
            {labels.position(index + 1, media.length)}
          </p>
        </div>

        <div className="absolute right-3 bottom-3 z-10 flex gap-2">
          <button
            type="button"
            aria-label={labels.previous}
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
            className="glass flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label={labels.next}
            disabled={index === media.length - 1}
            onClick={() => setIndex(index + 1)}
            className="glass flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {media.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto lg:w-20 lg:flex-col lg:overflow-visible">
          {media.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={labels.position(i + 1, media.length)}
              aria-current={index === i}
              className={cn(
                'relative aspect-[3/4] w-16 shrink-0 overflow-hidden border transition-opacity lg:w-full',
                index === i ? 'border-ink' : 'border-transparent opacity-60 hover:opacity-100',
              )}
            >
              <Image
                src={item.src}
                alt=""
                width={item.width}
                height={item.height}
                sizes="80px"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  )
}
