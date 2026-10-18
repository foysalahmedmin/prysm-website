'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash } from '@/components/icons'
import { QuantityStepper } from '@/components/ui'
import { formatMoney } from '@/domain'
import { cn } from '@/lib/cn'
import type { CartLineProps } from './contract'

export function CartLine({
  line,
  href,
  money,
  onQuantityChange,
  onRemove,
  labels,
  extra,
  className,
}: CartLineProps & { className?: string }) {
  const unavailable = line.issue === 'out-of-stock'
  return (
    <li
      className={cn(
        'glass glass-strong flex flex-col gap-4 rounded-md p-4 transition-all duration-200 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-surface">
          <Image
            src={line.image.src}
            alt={line.image.alt}
            width={line.image.width}
            height={line.image.height}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Link
            href={href}
            className="font-text text-sm font-semibold text-ink transition-colors hover:text-ink/80 focus-visible:outline-2 focus-visible:outline-focus"
          >
            {line.name}
          </Link>
          <p className="text-xs text-ink-faint tabular-nums">
            {Object.values(line.options).join(' / ')}
          </p>
          {unavailable ? (
            <p className="font-text text-xs font-semibold text-danger">{labels.outOfStock}</p>
          ) : null}
          {line.issue === 'limited-stock' ? (
            <p className="font-text text-xs text-ink-soft">{labels.limitedStock}</p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between gap-6 sm:justify-end">
        {unavailable ? null : (
          <QuantityStepper
            value={line.quantity}
            onChange={(quantity) => onQuantityChange(line.variantId, quantity)}
            labels={labels.quantity}
          />
        )}
        <p className="min-w-20 text-right text-sm font-semibold text-ink tabular-nums">
          {formatMoney(line.lineTotal, money)}
        </p>
        <button
          type="button"
          aria-label={`${labels.remove}: ${line.name}`}
          onClick={() => onRemove(line.variantId)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition hover:bg-ink/10 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
        >
          <Trash size={18} />
          <span className="sr-only">{labels.remove}</span>
        </button>
      </div>
      {extra}
    </li>
  )
}
