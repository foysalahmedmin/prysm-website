'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CartLine } from '@/components/commerce/cart-line'
import { ShoppingBag, X } from '@/components/icons'
import { Button } from '@/components/ui'
import { brand } from '@/config/brand'
import { routes } from '@/config/routes'
import { quoteCartAction } from '@/features/cart/actions'
import type { Quote } from '@/features/cart/quote'
import { useCartStore } from '@/stores/cart-store'
import { useUiStore } from '@/stores/ui-store'

const MONEY = { currency: brand.currency, locale: brand.locale }

const LABELS = {
  quantity: { group: 'Quantity', decrease: 'Decrease quantity', increase: 'Increase quantity' },
  remove: 'Remove item',
  outOfStock: 'Out of stock',
  limitedStock: 'Limited stock',
}

export function GlassBagDrawer() {
  const open = useUiStore((s) => s.open === 'cart')
  const closePanel = useUiStore((s) => s.closePanel)
  const lines = useCartStore((s) => s.lines)
  const remove = useCartStore((s) => s.remove)
  const setQuantity = useCartStore((s) => s.setQuantity)

  const [quote, setQuote] = useState<Quote | null>(null)
  const [promoCode, setPromoCode] = useState('')

  // Recalculate quote when lines change or drawer opens
  useEffect(() => {
    if (!open) return
    let cancelled = false

    quoteCartAction({ lines, promoCode: promoCode || undefined })
      .then((q) => {
        if (!cancelled) setQuote(q)
      })
      .catch(() => {
        // Fallback gracefully
      })

    return () => {
      cancelled = true
    }
  }, [open, lines, promoCode])

  // Escape key closes
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, closePanel])

  if (!open) return null

  const itemCount = lines.reduce((acc, l) => acc + l.quantity, 0)
  const subtotal = quote?.totals.subtotal ?? 0
  const freeThreshold = 15000 // $150 in minor units
  const freeProgress = Math.min(100, Math.round((subtotal / freeThreshold) * 100))
  const freeRemaining = Math.max(0, freeThreshold - subtotal)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      className="animate-in fade-in fixed inset-0 z-50 flex justify-end bg-ink/25 backdrop-blur-md duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closePanel()
      }}
    >
      <div className="glass-strong animate-in slide-in-from-right relative m-0 flex h-full w-full flex-col overflow-hidden border border-white/80 duration-250 sm:m-4 sm:h-[calc(100vh-2rem)] sm:max-w-md sm:rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/40 px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-ink" aria-hidden="true" />
            <h2 className="font-display text-lg font-medium text-ink">Bag ({itemCount})</h2>
          </div>
          <button
            type="button"
            onClick={closePanel}
            aria-label="Close bag"
            className="glass rounded-md p-1.5 text-ink transition-colors hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-focus"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Spectral Progress */}
        <div className="border-b border-white/30 bg-white/30 px-6 py-3 text-xs">
          <div className="mb-1.5 flex items-center justify-between text-ink tabular-nums">
            {freeRemaining === 0 ? (
              <span className="font-medium text-success">Free express shipping unlocked</span>
            ) : (
              <span>Add ${(freeRemaining / 100).toFixed(2)} for free shipping</span>
            )}
            <span>{freeProgress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-md bg-ink/10">
            <div
              className="h-full bg-ink transition-all duration-300"
              style={{ width: `${freeProgress}%` }}
            />
          </div>
        </div>

        {/* Lines List */}
        <div className="flex-1 overflow-y-auto p-6">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="glass mb-4 flex h-16 w-16 items-center justify-center rounded-md text-ink-faint">
                <ShoppingBag size={28} />
              </div>
              <p className="font-display text-base font-medium text-ink">Your bag is empty</p>
              <p className="mt-1 mb-6 max-w-xs font-text text-sm text-ink-faint">
                Pieces you add will appear here.
              </p>
              <Button
                onClick={() => {
                  closePanel()
                }}
                asChild
              >
                <Link href={routes.shop}>Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {quote?.lines.map((line) => (
                <CartLine
                  key={line.variantId}
                  line={line}
                  href={routes.product(line.slug)}
                  money={MONEY}
                  onQuantityChange={(variantId, q) => setQuantity(variantId, q)}
                  onRemove={(variantId) => remove(variantId)}
                  labels={LABELS}
                />
              ))}
            </ul>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {lines.length > 0 && (
          <div className="border-t border-white/40 bg-white/40 p-6 backdrop-blur-md">
            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code (e.g. LIGHT10)"
                  aria-label="Promo code"
                  className="glass-strong flex-1 rounded-md border border-ink/10 px-4 py-1.5 text-xs text-ink placeholder:text-ink-faint focus:ring-1 focus:ring-focus focus:outline-none"
                />
              </div>
              {quote?.promo && (
                <p className="mt-1.5 text-xs text-success tabular-nums">
                  Applied: {quote.promo.code} ({quote.promo.label})
                </p>
              )}
              {quote?.promoError && (
                <p className="mt-1.5 text-xs text-danger tabular-nums">
                  {quote.promoError === 'min-subtotal'
                    ? 'Subtotal does not meet requirement'
                    : 'Invalid promo code'}
                </p>
              )}
            </div>

            <div className="mb-4 space-y-2 text-xs tabular-nums">
              <div className="flex justify-between text-ink-soft">
                <span>Subtotal</span>
                <span>${(subtotal / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span>Shipping</span>
                <span>
                  {quote?.totals.shipping === 0
                    ? 'Complimentary'
                    : `$${((quote?.totals.shipping ?? 0) / 100).toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-white/50 pt-2 text-sm font-medium text-ink">
                <span>Estimated Total</span>
                <span>${((quote?.totals.total ?? subtotal) / 100).toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full justify-center" asChild onClick={closePanel}>
                <Link href={routes.checkout}>Proceed to Checkout</Link>
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-center text-xs"
                asChild
                onClick={closePanel}
              >
                <Link href={routes.cart}>View Shopping Bag</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
