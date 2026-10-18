'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart } from '@/components/icons'
import { Price } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { ProductCardProps } from './contract'

/**
 * A flat card: the picture runs edge to edge, the details sit below it with their own padding.
 * The second picture fades in on hover; glass is used only for the small controls on the photo.
 */
export function ProductCard({
  product,
  href,
  money,
  saved,
  onToggleSaved,
  priority,
  tryOnSlot,
  labels,
  className,
}: ProductCardProps & { className?: string }) {
  const image = product.media[0]!
  const hover = product.media[1]
  return (
    <article
      className={cn(
        'group @container relative flex flex-col overflow-hidden rounded-md border border-ink/10 bg-surface',
        className,
      )}
    >
      <Link href={href} className="flex flex-1 flex-col focus-visible:outline-offset-[-3px]">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-canvas">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority={priority}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {hover ? (
            <Image
              src={hover.src}
              alt=""
              width={hover.width}
              height={hover.height}
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          ) : null}
          {product.badges.length > 0 ? (
            <ul className="pointer-events-none absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
              {product.badges.map((badge) => (
                <li
                  key={badge}
                  className={cn(
                    'rounded-sm px-2 py-1 text-[11px] leading-none font-medium',
                    badge === 'sale' ? 'bg-danger text-on-danger' : 'bg-surface text-ink',
                  )}
                >
                  {labels.badges[badge]}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex items-start justify-between gap-3 px-3.5 pt-3 pb-4">
          <h3 className="line-clamp-2 text-sm leading-snug font-medium text-ink">{product.name}</h3>
          <Price
            amount={product.price}
            compareAt={product.compareAtPrice}
            currency={money.currency}
            locale={money.locale}
            labels={{ sale: labels.sale, original: labels.original }}
            className="shrink-0 flex-col items-end gap-0 text-sm leading-snug"
          />
        </div>
      </Link>

      <button
        type="button"
        aria-pressed={saved}
        onClick={() => onToggleSaved(product.id)}
        className={cn(
          'glass absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full text-ink transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-focus',
          saved && 'text-danger',
        )}
      >
        <Heart weight={saved ? 'fill' : 'light'} size={17} />
        <span className="sr-only">{labels.save}</span>
      </button>

      {tryOnSlot ? (
        <div className="absolute top-[calc(133.333cqw-3.25rem)] left-3 z-10 md:translate-y-2 md:opacity-0 md:transition-all md:duration-300 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          {tryOnSlot}
        </div>
      ) : null}
    </article>
  )
}
