'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

const ACCOUNT_LINKS = [
  { href: '/account', label: 'Dashboard' },
  { href: '/account/orders', label: 'Orders' },
  { href: '/account/addresses', label: 'Addresses' },
  { href: '/account/profile', label: 'Profile' },
]

export function AccountNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Account navigation" className="mb-8">
      <ul className="glass flex max-w-fit flex-wrap gap-2 rounded-full p-1.5">
        {ACCOUNT_LINKS.map((link) => {
          const isActive = pathname === link.href
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'block rounded-full px-5 py-2 font-text text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-focus',
                  isActive
                    ? 'bg-ink text-on-brand shadow-md'
                    : 'text-ink-soft hover:bg-white/50 hover:text-ink',
                )}
              >
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
