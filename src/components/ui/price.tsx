import { VisuallyHidden } from 'radix-ui'
import { formatMoney, type MoneyFormat } from '@/domain/money'
import { cn } from '@/lib/cn'

export interface PriceProps extends MoneyFormat {
  amount: number
  compareAt?: number
  labels: { sale: string; original: string }
  className?: string
}

export function Price({ amount, compareAt, currency, locale, labels, className }: PriceProps) {
  const onSale = compareAt !== undefined && compareAt > amount
  return (
    <span
      data-on-sale={onSale || undefined}
      className={cn('inline-flex items-baseline gap-2 font-mono text-ink', className)}
    >
      {onSale ? <VisuallyHidden.Root>{labels.sale} </VisuallyHidden.Root> : null}
      <span className={cn('font-semibold', onSale && 'text-danger')}>
        {formatMoney(amount, { currency, locale })}
      </span>
      {onSale ? ' ' : null}
      {onSale ? (
        <del className="text-sm text-ink-faint">
          <VisuallyHidden.Root>{labels.original} </VisuallyHidden.Root>
          {formatMoney(compareAt, { currency, locale })}
        </del>
      ) : null}
    </span>
  )
}
