'use client'

import type { ComponentProps } from 'react'
import { openMirrorTry } from '@/plugins/mirror-try'

/**
 * A store-styled button that opens Mirror Try without a product, for copy that talks about the
 * fitting itself. Works with `<Button asChild>`.
 */
export function OpenMirrorTry({ onClick, type = 'button', ...props }: ComponentProps<'button'>) {
  return (
    <button
      type={type}
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) openMirrorTry()
      }}
    />
  )
}
