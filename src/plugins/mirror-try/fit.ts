import type {
  BodyPart,
  FitPreference,
  MeasurementKey,
  Measurements,
  MirrorTryProduct,
} from './types'

/**
 * What the plugin can try on, and how it sizes it. This is the plugin's own knowledge, not store
 * data: a store never marks products as "try-on capable".
 */
const BODY_PARTS: Record<string, BodyPart> = {
  tops: 'upper',
  shirts: 'upper',
  't-shirts': 'upper',
  tees: 'upper',
  knitwear: 'upper',
  sweaters: 'upper',
  sweatshirts: 'upper',
  hoodies: 'upper',
  outerwear: 'upper',
  jackets: 'upper',
  coats: 'upper',
  blazers: 'upper',
  trousers: 'lower',
  pants: 'lower',
  jeans: 'lower',
  shorts: 'lower',
  skirts: 'lower',
  dresses: 'full',
  jumpsuits: 'full',
  suits: 'full',
}

export function bodyPartFor(product: Pick<MirrorTryProduct, 'category' | 'subcategory'>) {
  const keys = [product.subcategory, product.category].map((key) => key?.toLowerCase())
  for (const key of keys) {
    if (key && BODY_PARTS[key]) return BODY_PARTS[key]
  }
  return null
}

export function canTryOn(product: Pick<MirrorTryProduct, 'category' | 'subcategory'>): boolean {
  return bodyPartFor(product) !== null
}

export const BODY_PART_OPTIONS: { value: BodyPart; label: string }[] = [
  { value: 'upper', label: 'Upper Body' },
  { value: 'lower', label: 'Lower Body' },
  { value: 'full', label: 'Full Body' },
]

export const FIT_OPTIONS: { value: FitPreference; label: string }[] = [
  { value: 'slim', label: 'Slim' },
  { value: 'regular', label: 'Regular' },
  { value: 'relaxed', label: 'Relaxed' },
  { value: 'oversized', label: 'Oversized' },
]

export const DEFAULT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

/** The measurements asked for, in the order the form shows them. */
export const FIELDS: Record<BodyPart, MeasurementKey[]> = {
  upper: ['chest', 'shoulder', 'waist', 'torso', 'sleeve'],
  lower: ['waist', 'hip', 'inseam', 'thigh'],
  full: ['chest', 'shoulder', 'waist', 'hip', 'torso', 'sleeve', 'inseam'],
}

export function fieldLabel(key: MeasurementKey, bodyPart: BodyPart): string {
  switch (key) {
    case 'chest':
      return 'Chest circumference'
    case 'shoulder':
      return 'Shoulder'
    case 'waist':
      return bodyPart === 'upper' ? 'Waist / hem' : 'Waist'
    case 'hip':
      return 'Hip'
    case 'torso':
      return 'Torso Length'
    case 'sleeve':
      return 'Sleeve/Arm Length'
    case 'inseam':
      return 'Inseam'
    case 'thigh':
      return 'Thigh'
  }
}

/** Plausible adult ranges in centimetres. Anything outside is almost always a typo. */
export const RANGES: Record<MeasurementKey, [number, number]> = {
  chest: [60, 170],
  shoulder: [30, 65],
  waist: [50, 170],
  hip: [60, 180],
  torso: [40, 90],
  sleeve: [40, 95],
  inseam: [50, 105],
  thigh: [35, 95],
}

/** What the demo scan "measures". The hosted service reads these from the camera. */
export const SCAN_RESULT: Record<MeasurementKey, number> = {
  chest: 96,
  shoulder: 44,
  waist: 82,
  hip: 98,
  torso: 61,
  sleeve: 63,
  inseam: 79,
  thigh: 56,
}

const CHEST_LIMITS = [86, 94, 102, 110, 118]
const WAIST_LIMITS = [70, 78, 86, 94, 102]

/** Picks the size to try from the shopper's chest (or waist, for trousers and skirts). */
export function recommendSize(
  bodyPart: BodyPart,
  values: Measurements['values'],
  sizes: string[] = DEFAULT_SIZES,
): string {
  const available = sizes.length > 0 ? sizes : DEFAULT_SIZES
  const lower = bodyPart === 'lower'
  const reading = lower ? values.waist : values.chest
  const limits = lower ? WAIST_LIMITS : CHEST_LIMITS
  const below = reading === undefined ? -1 : limits.findIndex((limit) => reading < limit)
  const position = reading === undefined ? 2 : below === -1 ? limits.length : below
  const letter = DEFAULT_SIZES[position] ?? 'M'
  if (available.includes(letter)) return letter

  // The merchant uses its own size names: take the one at the same position in the run.
  const known = available.filter((size) => DEFAULT_SIZES.includes(size))
  if (known.length > 0) {
    const wanted = DEFAULT_SIZES.indexOf(letter)
    return known.reduce((best, size) =>
      Math.abs(DEFAULT_SIZES.indexOf(size) - wanted) <
      Math.abs(DEFAULT_SIZES.indexOf(best) - wanted)
        ? size
        : best,
    )
  }
  return available[Math.floor((available.length - 1) / 2)] ?? letter
}

/** The result of the camera scan for this product. */
export function scanFor(product: MirrorTryProduct | null): Measurements {
  const bodyPart = (product && bodyPartFor(product)) ?? 'upper'
  const values: Measurements['values'] = {}
  for (const key of FIELDS[bodyPart]) values[key] = SCAN_RESULT[key]
  return {
    bodyPart,
    size: recommendSize(bodyPart, values, product?.sizes),
    fit: 'regular',
    values,
    source: 'scan',
  }
}

/** Keeps a shopper's numbers when they move to another piece, re-picking the size for it. */
export function measurementsFor(
  product: MirrorTryProduct | null,
  current: Measurements,
): Measurements {
  const bodyPart = (product && bodyPartFor(product)) ?? current.bodyPart
  const values: Measurements['values'] = {}
  for (const key of FIELDS[bodyPart]) values[key] = current.values[key] ?? SCAN_RESULT[key]
  const sizes = product?.sizes
  const keepSize = current.source === 'custom' && (!sizes || sizes.includes(current.size))
  return {
    ...current,
    bodyPart,
    values,
    size: keepSize ? current.size : recommendSize(bodyPart, values, sizes),
  }
}

/** Returns an error message for a typed measurement, or null when it is usable. */
export function checkMeasurement(key: MeasurementKey, raw: string): string | null {
  const text = raw.trim().replace(',', '.')
  if (text === '') return 'Enter a number'
  const value = Number(text)
  if (!Number.isFinite(value)) return 'Enter a number'
  const [min, max] = RANGES[key]
  if (value < min || value > max) return `Enter ${min}–${max} cm`
  return null
}
