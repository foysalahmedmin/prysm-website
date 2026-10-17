import { VisuallyHidden } from 'radix-ui'
import { formatMoney, type MoneyFormat } from '@/domain/money'

export interface PriceProps extends MoneyFormat {
  amount: number
  compareAt?: number
  labels: { sale: string; original: string }
}

export function Price({ amount, compareAt, currency, locale, labels }: PriceProps) {
  const onSale = compareAt !== undefined && compareAt > amount
  return (
    <span data-on-sale={onSale || undefined}>
      {onSale ? <VisuallyHidden.Root>{labels.sale} </VisuallyHidden.Root> : null}
      <span>{formatMoney(amount, { currency, locale })}</span>
      {onSale ? ' ' : null}
      {onSale ? (
        <del>
          <VisuallyHidden.Root>{labels.original} </VisuallyHidden.Root>
          {formatMoney(compareAt, { currency, locale })}
        </del>
      ) : null}
    </span>
  )
}
