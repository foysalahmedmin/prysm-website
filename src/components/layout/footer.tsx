'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight } from '@/components/icons'
import { useToast } from '@/stores/toast-store'

export function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { showToast } = useToast()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      showToast({ message: 'Please enter a valid email address.', type: 'error' })
      return
    }
    setSubmitted(true)
    showToast({ message: 'Thank you for subscribing to PRYSM edits.', type: 'success' })
    setEmail('')
  }

  return (
    <footer aria-label="Site footer" className="mt-0 w-full border-t border-ink/10 bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="font-display text-2xl font-medium text-ink">
              PRYSM
            </Link>
            <p className="max-w-sm font-text text-sm text-ink-soft">
              Dress for the light. Prismatic optics, structural tailoring, and engineered modern
              luxury.
            </p>
            <div className="pt-4 text-xs text-ink-faint tabular-nums">
              Currency: USD ($) · Worldwide Express Available
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="mb-4 text-xs text-ink-faint tabular-nums">Shop</h3>
            <ul className="space-y-2.5 font-text text-sm">
              <li>
                <Link
                  href="/new-arrivals"
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/clothing"
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/accessories"
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/jewelry"
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  Jewelry
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="text-ink-soft transition-colors hover:text-ink">
                  Lookbook
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-danger transition-colors hover:text-danger/80">
                  Sale Edits
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h3 className="mb-4 text-xs text-ink-faint tabular-nums">Client Care</h3>
            <ul className="space-y-2.5 font-text text-sm">
              <li>
                <Link
                  href="/shipping-returns"
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-ink-soft transition-colors hover:text-ink">
                  Size & Fit Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-ink-soft transition-colors hover:text-ink">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ink-soft transition-colors hover:text-ink">
                  Contact Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="mb-4 text-xs text-ink-faint tabular-nums">Newsletter</h3>
            <p className="mb-3 font-text text-xs text-ink-soft">
              Receive private invitations and seasonal collection releases.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email for newsletter"
                  required
                  className="glass-strong w-full rounded-md border border-ink/10 px-4 py-2.5 pr-10 text-xs text-ink placeholder:text-ink-faint focus:ring-2 focus:ring-focus focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute top-1/2 right-1.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-on-brand transition-colors hover:bg-ink/80"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
              {submitted && (
                <p className="text-xs text-success tabular-nums">Subscribed to PRYSM updates.</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-8 text-xs text-ink-faint tabular-nums sm:flex-row">
          <div>© 2026 PRYSM Eyewear & Ready-to-Wear. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms of Service
            </Link>
            <Link href="/stores" className="transition-colors hover:text-ink">
              Boutiques
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
