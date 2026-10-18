'use client'

import { open } from './controller'
import { canTryOn } from './fit'
import { Logo } from './icons'
import { Shadow } from './shadow'
import type { MirrorTryProduct } from './types'

const HEIGHT = { sm: 34, md: 56 } as const

interface MirrorTryTriggerProps {
  product: MirrorTryProduct
  /** `sm` sits on product cards and in lists, `md` next to a product page's main button. */
  size?: keyof typeof HEIGHT
  label?: string
}

/**
 * The plugin's own "Try on" button. It looks the same on every store and opens the Virtual Trial
 * window with this product. Renders nothing for pieces the plugin cannot try on.
 */
export function MirrorTryTrigger({
  product,
  size = 'sm',
  label = 'Try on',
}: MirrorTryTriggerProps) {
  if (!canTryOn(product)) return null

  return (
    <Shadow
      as="span"
      data={{ 'data-mirror-try-trigger': size }}
      // Holds the button's height before the shadow root mounts, so nothing jumps.
      style={{ display: 'inline-flex', verticalAlign: 'middle', minHeight: HEIGHT[size] }}
    >
      <span className="root">
        <button
          type="button"
          className="smoke trigger"
          data-size={size}
          aria-label={`${label}: ${product.name}`}
          onClick={(event) => {
            // Cards are often links; the trigger must not follow them.
            event.preventDefault()
            event.stopPropagation()
            open(product)
          }}
        >
          <Logo />
          <span>{label}</span>
        </button>
      </span>
    </Shadow>
  )
}
