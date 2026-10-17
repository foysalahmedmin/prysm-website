/**
 * Generates unique, brand-prefixed order numbers and unique order IDs.
 * Accepts an injectable clock function for deterministic testing.
 */

export function generateOrderId(): string {
  const rand = Math.random().toString(36).substring(2, 10)
  return `ord_${rand}`
}

export function generateOrderNumber(
  brandPrefix: string,
  clock: () => number = () => Date.now(),
  randomSeed?: number,
): string {
  const prefix = brandPrefix.toUpperCase().slice(0, 3)
  const time = clock()
  const randNum =
    randomSeed !== undefined
      ? randomSeed
      : Math.floor(10000 + Math.random() * 90000)
  const timeSuffix = (time % 100000).toString().padStart(5, '0')
  return `${prefix}-${timeSuffix.slice(0, 2)}${randNum.toString().slice(-3)}`
}
