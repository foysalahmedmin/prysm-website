import type { CSSProperties } from 'react'
import type { MirrorTryOverlay, MirrorTryProduct } from './types'

/**
 * Garment cut-outs are transparent images of the garment worn (arms at the sides), centred, with
 * the neckline `neck` of the way down the image. The plugin lands that neckline on the model's neck,
 * so any cut-out that follows this contract lines up without per-product tuning.
 */

/** The cut-out used when a product brings none: a plain tee in neutral grey. */
export const DEFAULT_OVERLAY: Required<MirrorTryOverlay> = {
  src: '/mirror-try/overlays/default.webp',
  neck: 100 / 1800,
}

/** How much of the figure's width a garment at scale 1 spans. */
export const GARMENT_WIDTH = 0.8

export function resolveOverlay(
  product?: Pick<MirrorTryProduct, 'overlay'> | null,
): Required<MirrorTryOverlay> {
  const own = product?.overlay
  return own ? { src: own.src, neck: own.neck ?? DEFAULT_OVERLAY.neck } : DEFAULT_OVERLAY
}

interface Placement {
  /** Where the neckline lands, as fractions of the container. */
  x: number
  y: number
  /** Where the neckline sits in the cut-out, from the top, as a fraction of its height. */
  neck: number
  scale?: number
  rotation?: number
  /** Extra movement in pixels, for the user's own adjustments. */
  offset?: { x: number; y: number }
}

export function placeOverlay({
  x,
  y,
  neck,
  scale = 1,
  rotation = 0,
  offset,
}: Placement): CSSProperties {
  const left = offset ? `calc(${x * 100}% + ${offset.x}px)` : `${x * 100}%`
  const top = offset ? `calc(${y * 100}% + ${offset.y}px)` : `${y * 100}%`
  return {
    position: 'absolute',
    left,
    top,
    width: `${GARMENT_WIDTH * 100}%`,
    transform: `translate(-50%, -${neck * 100}%) scale(${scale}) rotate(${rotation}deg)`,
    transformOrigin: `50% ${neck * 100}%`,
  }
}
