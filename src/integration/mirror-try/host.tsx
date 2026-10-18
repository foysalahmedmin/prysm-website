'use client'

import { brand } from '@/config/brand'
import { MirrorTry, type MirrorTryConfig } from '@/plugins/mirror-try'

const config: MirrorTryConfig = {
  storeId: brand.id,
  storeName: brand.name,
  assetBase: '/mirror-try',
  theme: 'system',
  launcher: { corner: 'bottom-left' },
}

/**
 * Mounts Mirror Try once, in the root layout. The plugin draws its own UI in a shadow root; the
 * store only chooses where the floating card starts (placement.css).
 */
export function MirrorTryHost() {
  return <MirrorTry config={config} />
}
