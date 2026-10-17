'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, ArrowRight } from '@/components/icons'
import { cn } from '@/lib/cn'
import type { GalleryProps } from './contract'

export function Gallery({ media, labels, className }: GalleryProps & { className?: string }) {
  const [index, setIndex] = useState(0)
  const current = media[index]!
  return (
    <section aria-label={labels.group} className={cn('relative flex flex-col gap-4', className)}>
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[28px] bg-surface">
        <Image
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          priority
          className="h-full w-full object-cover transition-opacity duration-300"
        />

        <div className="glass glass-strong absolute bottom-4 left-4 z-10 rounded-full px-3.5 py-1">
          <p aria-live="polite" className="font-mono text-xs font-semibold text-ink">
            {labels.position(index + 1, media.length)}
          </p>
        </div>

        <div className="absolute right-4 bottom-4 z-10 flex gap-2">
          <button
            type="button"
            aria-label={labels.previous}
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
            className="glass flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label={labels.next}
            disabled={index === media.length - 1}
            onClick={() => setIndex(index + 1)}
            className="glass flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {media.length > 1 ? (
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {media.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={labels.position(i + 1, media.length)}
              aria-current={index === i}
              className={cn(
                'relative h-20 w-16 shrink-0 overflow-hidden rounded-[14px] border-2 transition-all',
                index === i
                  ? 'border-brand shadow-sm'
                  : 'border-transparent opacity-60 hover:opacity-100',
              )}
            >
              <Image
                src={item.src}
                alt=""
                width={item.width}
                height={item.height}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  )
}
