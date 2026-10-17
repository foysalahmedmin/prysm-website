'use client'

import { systemCopy } from '@/config/system-copy'

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main id="main" data-page="error">
      <h1>{systemCopy.error.title}</h1>
      <p>{systemCopy.error.body}</p>
      <button type="button" onClick={reset}>
        {systemCopy.error.retry}
      </button>
    </main>
  )
}
