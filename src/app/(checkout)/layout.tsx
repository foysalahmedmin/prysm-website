import Link from 'next/link'

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <header className="border-b border-ink/5 bg-surface/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="font-display text-xl font-medium text-ink focus-visible:outline-2 focus-visible:outline-focus"
          >
            PRYSM
          </Link>
          <div className="flex items-center gap-4 text-xs text-ink-faint tabular-nums">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
              Secure Checkout
            </span>
            <span className="hidden sm:inline">·</span>
            <Link href="/contact" className="hidden transition-colors hover:text-ink sm:inline">
              Need Help?
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="flex-1 px-4 py-8 focus:outline-none">
        {children}
      </main>

      <footer className="border-t border-ink/5 py-6 text-center text-xs text-ink-faint tabular-nums">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 sm:flex-row">
          <span>© 2026 PRYSM. Secure checkout.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink">
              Terms
            </Link>
            <Link href="/shipping-returns" className="hover:text-ink">
              Shipping & Returns
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
