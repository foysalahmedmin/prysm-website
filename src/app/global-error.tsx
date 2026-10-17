'use client'

import { systemCopy } from '@/config/system-copy'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <main id="main" data-page="global-error">
          <h1>{systemCopy.error.title}</h1>
          <p>{systemCopy.error.body}</p>
          <button type="button" onClick={reset}>
            {systemCopy.error.retry}
          </button>
        </main>
      </body>
    </html>
  )
}
