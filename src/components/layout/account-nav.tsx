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
    <nav aria-label="Account navigation" className="mb-10 border-b border-ink/10">
      <ul className="flex gap-7 overflow-x-auto">
        {ACCOUNT_LINKS.map((link) => {
          const isActive = pathname === link.href
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  '-mb-px block border-b-2 py-3 text-sm whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-focus',
                  isActive
                    ? 'border-ink text-ink'
                    : 'border-transparent text-ink-soft hover:text-ink',
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
