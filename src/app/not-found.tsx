import Link from 'next/link'
import { GlassNav } from '@/components/layout/glass-nav'
import { Footer } from '@/components/layout/footer'
import { routes } from '@/config/routes'
import { systemCopy } from '@/config/system-copy'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <GlassNav />
      <main
        id="main-content"
        data-page="not-found"
        tabIndex={-1}
        className="flex flex-1 flex-col items-center justify-center p-6 text-center focus:outline-none"
      >
        <div className="glass-strong w-full max-w-md rounded-3xl border border-white/80 p-10">
          <span className="text-xs font-semibold text-focus tabular-nums">
            404 — Refraction Lost
          </span>
          <h1 className="mt-3 mb-2 font-display text-3xl font-medium text-ink">
            {systemCopy.notFound.title}
          </h1>
          <p className="mb-8 font-text text-sm text-ink-soft">{systemCopy.notFound.body}</p>
          <Link
            href={routes.home}
            className="inline-flex items-center justify-center rounded-md bg-ink px-6 py-3 font-text text-sm font-medium text-on-brand transition-colors hover:bg-ink/80 focus-visible:outline-2 focus-visible:outline-focus"
          >
            {systemCopy.notFound.cta}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
