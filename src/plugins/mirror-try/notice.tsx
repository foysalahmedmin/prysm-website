'use client'

import { useMirrorTryState } from './hooks'
import { CheckCircleIcon } from './icons'

/** The visible half of a notice; the panel's live region reads it out. */
export function Notice({ variant }: { variant: 'pill' | 'banner' }) {
  const { notice } = useMirrorTryState()
  if (!notice) return null
  return (
    <p key={notice.id} className={variant === 'pill' ? 'pill notice' : 'banner'} aria-hidden="true">
      <CheckCircleIcon size={16} />
      {notice.text}
    </p>
  )
}
