'use client'

import { useState } from 'react'

export interface AnnouncementBarProps {
  message?: string
  actionLabel?: string
  actionHref?: string
}

export function AnnouncementBar({
  message = 'Free express delivery on orders over $150 · 30-day returns',
}: AnnouncementBarProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <aside
      aria-label="Announcement"
      className="w-full bg-ink px-4 py-2 text-xs text-on-brand tabular-nums transition-all"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div className="flex-1 text-center font-medium">
          <span>{message}</span>
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Dismiss announcement"
          className="-mr-1 rounded p-1 text-on-brand/60 transition-colors hover:text-on-brand focus-visible:outline-2 focus-visible:outline-focus"
        >
          ✕
        </button>
      </div>
    </aside>
  )
}
