export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'BDT'

/** Integer minor units (cents). Never store floats for money. */
export type Money = number

export interface MoneyFormat {
  currency: CurrencyCode
  locale: string
}

export function formatMoney(amount: Money, { currency, locale }: MoneyFormat): string {
  const wholeUnits = amount % 100 === 0
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: wholeUnits ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount / 100)
}

export function toMinor(major: number): Money {
  return Math.round(major * 100)
}
