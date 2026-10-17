import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between p-6">
        <Link
          href="/"
          className="font-display text-xl font-black tracking-widest text-ink focus-visible:outline-2 focus-visible:outline-focus"
        >
          PRYSM
        </Link>
        <Link
          href="/"
          className="font-mono text-xs text-ink-faint transition-colors hover:text-ink"
        >
          Return to Boutique ↗
        </Link>
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 items-center justify-center p-6 focus:outline-none"
      >
        <div className="w-full max-w-md">{children}</div>
      </main>

      <footer className="p-6 text-center font-mono text-xs text-ink-faint">
        © 2026 PRYSM. Secure client authentication.
      </footer>
    </div>
  )
}
