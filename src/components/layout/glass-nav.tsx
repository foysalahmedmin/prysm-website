'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Heart, MagnifyingGlass, ShoppingBag, User } from '@/components/icons'
import { Dialog } from '@/components/ui'
import { cn } from '@/lib/cn'
import { useHydrated } from '@/stores/hydration'
import { useUiStore } from '@/stores/ui-store'

export interface NavLink {
  href: string
  label: string
}

export interface GlassNavProps {
  brandName?: string
  links?: NavLink[]
  cartLabel?: string
  cartCount?: number
  onCartClick?: () => void
  onSearchClick?: () => void
  className?: string
}

const DEFAULT_LINKS: NavLink[] = [
  { href: '/new-arrivals', label: 'New in' },
  { href: '/shop/clothing', label: 'Clothing' },
  { href: '/shop/accessories', label: 'Accessories' },
  { href: '/shop/jewelry', label: 'Jewelry' },
  { href: '/lookbook', label: 'Lookbook' },
  { href: '/journal', label: 'Journal' },
]

export function GlassNav({
  brandName = 'PRYSM',
  links = DEFAULT_LINKS,
  cartLabel = 'Bag',
  cartCount = 0,
  onCartClick,
  onSearchClick,
  className,
}: GlassNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isHydrated = useHydrated()
  const openPanel = useUiStore((s) => s.openPanel)

  const handleCartClick = onCartClick ?? (() => openPanel('cart'))
  const handleSearchClick = onSearchClick ?? (() => openPanel('search'))

  // Use count prop if passed, otherwise default
  const displayCount = isHydrated ? cartCount : 0

  return (
    <header className="sticky top-0 z-40 w-full border-b border-ink/10 bg-white/75 backdrop-blur-xl">
      <nav
        aria-label="Main"
        className={cn(
          'mx-auto flex h-16 w-full max-w-[1360px] items-center justify-between px-4 sm:px-6 lg:px-10',
          className,
        )}
      >
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-[0.2em] text-ink focus-visible:outline-2 focus-visible:outline-focus"
          >
            {brandName}
          </Link>

          <ul className="hidden items-center gap-6 lg:flex">
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

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button
            type="button"
            onClick={handleSearchClick}
            aria-label="Search catalog"
            className="flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-focus"
          >
            <MagnifyingGlass size={18} aria-hidden="true" />
          </button>

          {/* Wishlist Link */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="hidden h-10 w-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-focus sm:flex"
          >
            <Heart size={18} aria-hidden="true" />
          </Link>

          {/* Account Link */}
          <Link
            href="/account"
            aria-label="Account"
            className="hidden h-10 w-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-focus sm:flex"
          >
            <User size={18} aria-hidden="true" />
          </Link>

          {/* Cart Trigger */}
          <button
            type="button"
            onClick={handleCartClick}
            aria-label={`${cartLabel} (${displayCount})`}
            className="flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-ink transition hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-focus"
          >
            <ShoppingBag size={16} aria-hidden="true" />
            <span>
              {cartLabel} ({displayCount})
            </span>
          </button>

          {/* Mobile Menu Trigger & Dialog */}
          <div className="lg:hidden">
            <Dialog
              open={menuOpen}
              onOpenChange={setMenuOpen}
              trigger={
                <button
                  type="button"
                  aria-label="Open menu"
                  className="flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-focus"
                >
                  ☰
                </button>
              }
              title="Menu"
              closeLabel="Close menu"
              side="center"
            >
              <div className="flex flex-col gap-6 py-4">
                <ul className="flex flex-col gap-4">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="font-display text-xl font-medium text-ink transition-colors hover:text-ink/80"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3 border-t border-white/40 pt-6 text-xs tabular-nums">
                  <Link
                    href="/wishlist"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-ink-soft hover:text-ink"
                  >
                    <Heart size={16} /> Wishlist
                  </Link>
                  <Link
                    href="/account"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-ink-soft hover:text-ink"
                  >
                    <User size={16} /> Account
                  </Link>
                  <Link
                    href="/stores"
                    onClick={() => setMenuOpen(false)}
                    className="text-ink-faint hover:text-ink"
                  >
                    Boutiques & Studios
                  </Link>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </nav>
    </header>
  )
}
