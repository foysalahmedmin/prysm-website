'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart } from '@/components/icons'
import { Price } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { ProductCardProps } from './contract'

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
  return (
    <article
      className={cn(
        'glass edge group relative flex flex-col overflow-hidden rounded-[24px] p-3.5 transition-all duration-300 hover:-translate-y-1',
        className,
      )}
    >
      <Link href={href} className="group-hover:text-ink/80 focus-visible:outline-none">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[20px] bg-surface">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority={priority}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badges.length > 0 ? (
            <ul className="pointer-events-none absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
              {product.badges.map((badge) => (
                <li
                  key={badge}
                  className={cn(
                    'rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-wider uppercase',
                    badge === 'sale'
                      ? 'bg-danger text-on-danger'
                      : 'glass glass-strong text-ink shadow-sm',
                  )}
                >
                  {labels.badges[badge]}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="mt-3.5 px-1">
          <h3 className="line-clamp-1 font-text text-sm font-semibold text-ink">{product.name}</h3>
        </div>
      </Link>

      <button
        type="button"
        aria-pressed={saved}
        onClick={() => onToggleSaved(product.id)}
        className={cn(
          'glass absolute top-6 right-6 z-10 flex h-9 w-9 items-center justify-center rounded-full text-ink transition-transform duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-focus',
          saved && 'text-danger',
        )}
      >
        <Heart weight={saved ? 'fill' : 'light'} size={18} />
        <span className="sr-only">{labels.save}</span>
      </button>

      {tryOnSlot ? (
        <div className="absolute top-[calc(75%-2.5rem)] left-6 z-10">{tryOnSlot}</div>
      ) : null}

      <div className="mt-1.5 flex items-center justify-between px-1 pb-1">
        <Price
          amount={product.price}
          compareAt={product.compareAtPrice}
          currency={money.currency}
          locale={money.locale}
          labels={{ sale: labels.sale, original: labels.original }}
          className="text-sm font-semibold"
        />
      </div>
    </article>
  )
}
