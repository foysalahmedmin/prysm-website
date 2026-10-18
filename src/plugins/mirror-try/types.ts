/**
 * The public contract of the Mirror Try plugin. The plugin owns these types and imports nothing
 * from the store; a store describes itself and its products in this shape (see src/integration).
 */

export interface MirrorTryProduct {
  id: string
  name: string
  /** The merchant's own taxonomy. The plugin works out which body part a piece covers from it. */
  category: string
  subcategory?: string
  /** A small image of the piece. The plugin shows it while the piece is being tried on. */
  image?: { src: string; alt: string }
  /** The sizes the merchant sells this piece in, smallest first. */
  sizes?: string[]
}

export interface MirrorTryConfig {
  /** The merchant's key. The hosted service scopes accounts and trial history by it. */
  storeId: string
  /** Shown next to each saved trial, so a shopper knows where they tried a piece. */
  storeName: string
  /** Where the store serves the plugin's static files. Defaults to `/mirror-try`. */
  assetBase?: string
  /** `system` follows the device's light or dark setting. */
  theme?: 'system' | 'light' | 'dark'
  launcher?: {
    /** Set to false to open the plugin from product triggers only. */
    enabled?: boolean
    /** The corner the floating card starts in. Shoppers can drag it anywhere. */
    corner?: 'bottom-left' | 'bottom-right'
  }
}

export type BodyPart = 'upper' | 'lower' | 'full'
export type FitPreference = 'slim' | 'regular' | 'relaxed' | 'oversized'
export type MeasurementKey =
  'chest' | 'shoulder' | 'waist' | 'hip' | 'torso' | 'sleeve' | 'inseam' | 'thigh'

export interface Measurements {
  bodyPart: BodyPart
  size: string
  fit: FitPreference
  /** Centimetres. */
  values: Partial<Record<MeasurementKey, number>>
  /** `scan` when the camera measured the shopper, `custom` when they typed the numbers in. */
  source: 'scan' | 'custom'
}

export interface Account {
  id: string
  name: string
  email: string
  phone?: string
  provider: 'password' | 'google'
}

export interface TrialRecord {
  id: string
  productId: string | null
  productName: string
  size: string | null
  storeName: string
  /** A small JPEG of the camera frame, as a data URL. */
  thumbnail: string | null
  durationSec: number
  createdAt: number
}
