'use client'

import { useEffect, type KeyboardEvent } from 'react'
import { init } from './controller'
import { useMirrorTryState } from './hooks'
import { Launcher } from './launcher'
import { Panel } from './panel'
import { ensureFont, Shadow } from './shadow'
import type { MirrorTryConfig } from './types'

// Keys typed in the plugin stay in the plugin, so a store's shortcuts never fire from its fields.
const keepKeys = (event: KeyboardEvent) => event.stopPropagation()

/**
 * Mount once per page, in the root layout. Renders the floating card and, once opened, the
 * Virtual Trial window. Product pages open it through `openMirrorTry` or `MirrorTryTrigger`.
 */
export function MirrorTry({ config }: { config: MirrorTryConfig }) {
  const state = useMirrorTryState()
  const theme = config.theme ?? 'system'
  const launcher = config.launcher ?? {}

  useEffect(() => {
    ensureFont(config.assetBase ?? '/mirror-try')
    init(config)
  }, [config])

  return (
    <Shadow data={{ 'data-mirror-try': '' }}>
      <div className="root" data-theme={theme} onKeyDown={keepKeys}>
        {launcher.enabled !== false && !state.open ? (
          <Launcher corner={launcher.corner ?? 'bottom-left'} />
        ) : null}
        {state.mounted ? <Panel /> : null}
      </div>
    </Shadow>
  )
}
