'use client'

import Image from 'next/image'
import Link from 'next/link'
import { QuantityStepper } from '@/components/ui'
import { formatMoney } from '@/domain'
import type { CartLineProps } from './contract'

export function CartLine({
  line,
  href,
  money,
  onQuantityChange,
  onRemove,
  labels,
  extra,
}: CartLineProps) {
  const unavailable = line.issue === 'out-of-stock'
  return (
    <li>
      <Image
        src={line.image.src}
        alt={line.image.alt}
        width={line.image.width}
        height={line.image.height}
      />
      <Link href={href}>{line.name}</Link>
      <p>{Object.values(line.options).join(' / ')}</p>
      {unavailable ? <p>{labels.outOfStock}</p> : null}
      {line.issue === 'limited-stock' ? <p>{labels.limitedStock}</p> : null}
      {unavailable ? null : (
        <QuantityStepper
          value={line.quantity}
          onChange={(quantity) => onQuantityChange(line.variantId, quantity)}
          labels={labels.quantity}
        />
      )}
      <p>{formatMoney(line.lineTotal, money)}</p>
      <button
        type="button"
        aria-label={`${labels.remove}: ${line.name}`}
        onClick={() => onRemove(line.variantId)}
      >
        {labels.remove}
      </button>
      {extra}
    </li>
  )
}
