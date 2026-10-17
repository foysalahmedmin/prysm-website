'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Price } from '@/components/ui'
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
}: ProductCardProps) {
  const image = product.media[0]!
  return (
    <article>
      <Link href={href}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority={priority}
          sizes="(min-width: 1024px) 25vw, 50vw"
        />
        <h3>{product.name}</h3>
      </Link>
      {product.badges.length > 0 ? (
        <ul>
          {product.badges.map((badge) => (
            <li key={badge}>{labels.badges[badge]}</li>
          ))}
        </ul>
      ) : null}
      <Price
        amount={product.price}
        compareAt={product.compareAtPrice}
        currency={money.currency}
        locale={money.locale}
        labels={{ sale: labels.sale, original: labels.original }}
      />
      <button type="button" aria-pressed={saved} onClick={() => onToggleSaved(product.id)}>
        {labels.save}
      </button>
      {tryOnSlot}
    </article>
  )
}
