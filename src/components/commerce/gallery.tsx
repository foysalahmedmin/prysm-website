'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { GalleryProps } from './contract'

export function Gallery({ media, labels }: GalleryProps) {
  const [index, setIndex] = useState(0)
  const current = media[index]!
  return (
    <section aria-label={labels.group}>
      <Image src={current.src} alt={current.alt} width={current.width} height={current.height} />
      <p aria-live="polite">{labels.position(index + 1, media.length)}</p>
      <button
        type="button"
        aria-label={labels.previous}
        disabled={index === 0}
        onClick={() => setIndex(index - 1)}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label={labels.next}
        disabled={index === media.length - 1}
        onClick={() => setIndex(index + 1)}
      >
        ›
      </button>
    </section>
  )
}
