import type { MirrorTryProduct } from './types'

/**
 * What the plugin can try on. This is the plugin's own knowledge, not store data: a store never
 * marks products as "try-on capable". Version 1 focuses on clothing worn on the upper body, with a
 * few neck, ear and head accessories as a secondary scope.
 */
export type TryOnKind = 'upper-body' | 'neckwear' | 'earwear' | 'headwear'
export type TryOnAnchor = 'torso' | 'neck' | 'ear' | 'head'

export interface TryOnCapability {
  kind: TryOnKind
  anchor: TryOnAnchor
  /** Whether the plugin offers a size hint for this kind of product. */
  sizeAware: boolean
}

const UPPER_BODY: TryOnCapability = { kind: 'upper-body', anchor: 'torso', sizeAware: true }
const NECK: TryOnCapability = { kind: 'neckwear', anchor: 'neck', sizeAware: false }

const BY_SUBCATEGORY: Record<string, TryOnCapability> = {
  tops: UPPER_BODY,
  shirts: UPPER_BODY,
  't-shirts': UPPER_BODY,
  knitwear: UPPER_BODY,
  sweatshirts: UPPER_BODY,
  hoodies: UPPER_BODY,
  outerwear: UPPER_BODY,
  jackets: UPPER_BODY,
  coats: UPPER_BODY,
  blazers: UPPER_BODY,
  scarves: NECK,
  necklaces: NECK,
  earrings: { kind: 'earwear', anchor: 'ear', sizeAware: false },
  hats: { kind: 'headwear', anchor: 'head', sizeAware: true },
}

export function capabilityFor(
  product: Pick<MirrorTryProduct, 'subcategory'>,
): TryOnCapability | null {
  return BY_SUBCATEGORY[product.subcategory] ?? null
}
