'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag } from '@/components/icons'
import { Dialog } from '@/components/ui'
import { cn } from '@/lib/cn'

export interface NavLink {
  href: string
  label: string
}

export interface GlassNavProps {
  brandName: string
  links: NavLink[]
  cartLabel: string
  cartCount: number
  onCartClick?: () => void
  className?: string
}

export function GlassNav({
  brandName,
  links,
  cartLabel,
  cartCount,
  onCartClick,
  className,
}: GlassNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-6 z-40 mx-auto w-full max-w-5xl px-4">
      <nav
        aria-label="Main"
        className={cn(
          'glass glass-strong flex h-16 items-center justify-between rounded-full px-6 shadow-xl',
          className,
        )}
      >
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-display text-xl font-black tracking-wider text-ink focus-visible:outline-2 focus-visible:outline-focus"
          >
            {brandName}
          </Link>

          <ul className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-text text-sm font-medium text-ink-soft transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCartClick}
            aria-label={`${cartLabel} (${cartCount})`}
            className="glass flex h-10 items-center gap-2 rounded-full px-4 font-mono text-xs font-semibold text-ink transition hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-focus"
          >
            <ShoppingBag size={16} />
            <span>
              {cartLabel} · {cartCount}
            </span>
          </button>

          <div className="md:hidden">
            <Dialog
              open={menuOpen}
              onOpenChange={setMenuOpen}
              trigger={
                <button
                  type="button"
                  aria-label="Open menu"
                  className="glass flex h-10 w-10 items-center justify-center rounded-full text-ink focus-visible:outline-2 focus-visible:outline-focus"
                >
                  ☰
                </button>
              }
              title="Menu"
              closeLabel="Close menu"
              side="center"
            >
              <ul className="flex flex-col gap-4 py-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-display text-lg font-bold text-ink hover:text-ink/80"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Dialog>
          </div>
        </div>
      </nav>
    </header>
  )
}
