'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CartLine } from '@/components/commerce/cart-line'
import { ArrowRight } from '@/components/icons'
import { Button } from '@/components/ui'
import { brand } from '@/config/brand'
import { routes } from '@/config/routes'
import { formatMoney } from '@/domain'
import { quoteCartAction } from '@/features/cart/actions'
import type { Quote } from '@/features/cart/quote'
import { TryOnTrigger } from '@/integration/mirror-try'
import { useCartStore } from '@/stores/cart-store'
import { useHydrated } from '@/stores/hydration'

const MONEY = { currency: brand.currency, locale: brand.locale }

const LABELS = {
  quantity: { group: 'Quantity', decrease: 'Decrease quantity', increase: 'Increase quantity' },
  remove: 'Remove item',
  outOfStock: 'Out of stock',
  limitedStock: 'Limited stock',
}

export function CartView() {
  const hydrated = useHydrated()
  const lines = useCartStore((s) => s.lines)
  const setQuantity = useCartStore((s) => s.setQuantity)
  const remove = useCartStore((s) => s.remove)

  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(false)
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<string | undefined>()
  const [shippingMethodId, setShippingMethodId] = useState('standard')

  useEffect(() => {
    if (!hydrated) return
    let cancelled = false

    Promise.resolve().then(() => {
      if (cancelled) return
      setLoading(true)

      quoteCartAction({
        lines,
        promoCode: appliedPromo,
        shippingMethodId,
      })
        .then((q) => {
          if (!cancelled) {
            setQuote(q)
            setLoading(false)
          }
        })
        .catch(() => {
          if (!cancelled) setLoading(false)
        })
    })

    return () => {
      cancelled = true
    }
  }, [hydrated, lines, appliedPromo, shippingMethodId])

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = promoInput.trim().toUpperCase()
    if (!clean) return

    setAppliedPromo(clean)
  }

  const handleRemovePromo = () => {
    setAppliedPromo(undefined)
    setPromoInput('')
  }

  if (!hydrated) {
    return (
      <div className="mx-auto min-h-[60vh] max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="glass mx-auto max-w-md rounded-3xl p-12">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-ink border-t-transparent" />
          <p className="mt-4 text-xs text-ink-soft tabular-nums">Loading Bag...</p>
        </div>
      </div>
    )
  }

  const itemCount = lines.reduce((acc, l) => acc + l.quantity, 0)
  const hasItems = lines.length > 0
  const subtotal = quote?.totals.subtotal ?? 0
  const freeThreshold = 15000 // $150
  const freeProgress = Math.min(100, Math.round((subtotal / freeThreshold) * 100))
  const freeRemaining = Math.max(0, freeThreshold - subtotal)

  if (!hasItems) {
    return (
      <div className="mx-auto min-h-[60vh] max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="glass glass-strong mx-auto max-w-xl rounded-3xl p-12">
          <h1 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Your bag is empty
          </h1>
          <p className="mt-4 font-text text-sm leading-relaxed text-ink-soft sm:text-base">
            Pieces you add will appear here.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href={routes.shop}>
                Continue shopping
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={routes.wishlist}>View Saved Items</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container py-10 md:py-14">
      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-4 border-b border-ink/10 pb-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Shopping Bag ({itemCount})
          </h1>
        </div>
        <Link
          href={routes.shop}
          className="inline-flex items-center text-xs text-ink tabular-nums transition-colors hover:text-ink-soft"
        >
          Continue Shopping &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Lines Column */}
        <div className="space-y-6 lg:col-span-7 xl:col-span-8">
          {/* Free Shipping Spectral Meter */}
          <div className="glass glass-strong overflow-hidden rounded-2xl border border-ink/10 p-5">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-medium text-ink tabular-nums">
                {freeRemaining === 0 ? (
                  <span className="font-semibold text-ink">Free shipping unlocked</span>
                ) : (
                  <>Add {formatMoney(freeRemaining, MONEY)} more for free shipping</>
                )}
              </span>
              <span className="text-ink-faint tabular-nums">{freeProgress}%</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-md bg-ink/10">
              <div
                className="h-full rounded-sm bg-ink transition-all duration-500 ease-out"
                style={{ width: `${freeProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Lines */}
          <ul className="space-y-4" aria-busy={loading}>
            {quote?.lines.map((line) => {
              const tryOnProduct = {
                id: line.productId,
                slug: line.slug,
                name: line.name,
                category: line.category,
                subcategory: line.subcategory,
                media: [line.image],
                variants: [
                  {
                    id: line.variantId,
                    sku: line.variantId,
                    options: line.options,
                    stock: line.quantity,
                  },
                ],
              }

              return (
                <CartLine
                  key={line.variantId}
                  line={line}
                  href={routes.product(line.slug)}
                  money={MONEY}
                  onQuantityChange={setQuantity}
                  onRemove={remove}
                  labels={LABELS}
                  extra={
                    <div className="mt-2 flex items-center justify-end sm:mt-0">
                      <TryOnTrigger
                        product={tryOnProduct}
                        variantId={line.variantId}
                        source="cart"
                        label="Mirror Try"
                        className="text-xs"
                      />
                    </div>
                  }
                />
              )
            })}
          </ul>
        </div>

        {/* Summary Sidebar Column */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="glass glass-strong sticky top-28 rounded-3xl border border-ink/10 p-6">
            <h2 className="font-display text-xl font-medium text-ink">Order summary</h2>

            {/* Promo code drawer */}
            <form onSubmit={handleApplyPromo} className="mt-6 border-b border-ink/10 pb-6">
              <label htmlFor="promo" className="mb-2 block text-xs text-ink-soft tabular-nums">
                Promo code
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    id="promo"
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="e.g. WELCOME10"
                    disabled={Boolean(appliedPromo)}
                    className="glass w-full rounded-xl border border-ink/10 px-3 py-2 text-xs text-ink tabular-nums placeholder:text-ink-faint focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  />
                </div>
                {appliedPromo ? (
                  <Button type="button" variant="secondary" size="sm" onClick={handleRemovePromo}>
                    Remove
                  </Button>
                ) : (
                  <Button type="submit" size="sm" disabled={!promoInput.trim()}>
                    Apply
                  </Button>
                )}
              </div>
              {appliedPromo && quote?.promo ? (
                <div className="mt-2 flex items-center justify-between text-xs text-emerald-600">
                  <span>
                    Code {appliedPromo} applied: {quote.promo.label}
                  </span>
                </div>
              ) : null}
              {appliedPromo && quote?.promoError ? (
                <div className="mt-2 text-xs text-ink">
                  {quote.promoError === 'min-subtotal'
                    ? 'Cart subtotal does not meet minimum for this code'
                    : 'Invalid promotional code'}
                </div>
              ) : null}
            </form>

            {/* Shipping selection */}
            <div className="mt-6 border-b border-ink/10 pb-6">
              <label className="mb-2 block text-xs text-ink-soft tabular-nums">
                Delivery Option
              </label>
              <div className="space-y-2">
                <label className="glass flex cursor-pointer items-center justify-between rounded-xl border border-ink/10 p-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethodId === 'standard'}
                      onChange={() => setShippingMethodId('standard')}
                      className="accent-ink"
                    />
                    <span className="font-text text-sm font-medium text-ink">
                      Standard (3–5 days)
                    </span>
                  </div>
                  <span className="text-xs text-ink tabular-nums">
                    {freeRemaining === 0 ? 'FREE' : formatMoney(800, MONEY)}
                  </span>
                </label>
                <label className="glass flex cursor-pointer items-center justify-between rounded-xl border border-ink/10 p-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethodId === 'express'}
                      onChange={() => setShippingMethodId('express')}
                      className="accent-ink"
                    />
                    <span className="font-text text-sm font-medium text-ink">
                      Express (1–2 days)
                    </span>
                  </div>
                  <span className="text-xs text-ink tabular-nums">{formatMoney(1800, MONEY)}</span>
                </label>
              </div>
            </div>

            {/* Totals Breakdown */}
            <dl className="mt-6 space-y-3 font-text text-sm">
              <div className="flex justify-between text-ink-soft">
                <dt>Subtotal</dt>
                <dd className="text-ink tabular-nums">{formatMoney(subtotal, MONEY)}</dd>
              </div>
              {quote && quote.totals.discount > 0 ? (
                <div className="flex justify-between text-emerald-600">
                  <dt>Promotional Savings</dt>
                  <dd className="tabular-nums">-{formatMoney(quote.totals.discount, MONEY)}</dd>
                </div>
              ) : null}
              <div className="flex justify-between text-ink-soft">
                <dt>Estimated Shipping</dt>
                <dd className="text-ink tabular-nums">
                  {quote?.totals.shipping === 0
                    ? 'Free'
                    : formatMoney(quote?.totals.shipping ?? 0, MONEY)}
                </dd>
              </div>
              <div className="flex justify-between text-ink-soft">
                <dt>Estimated Tax (8%)</dt>
                <dd className="text-ink tabular-nums">
                  {formatMoney(quote?.totals.tax ?? 0, MONEY)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-ink/10 pt-4 font-display text-lg font-medium text-ink">
                <dt>Total</dt>
                <dd className="tabular-nums">
                  {formatMoney(quote?.totals.total ?? subtotal, MONEY)}
                </dd>
              </div>
            </dl>

            {/* Checkout Action */}
            <div className="mt-8">
              <Button asChild size="lg" className="w-full">
                <Link href={routes.checkout}>
                  Proceed to Checkout
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>

            {/* Trust badge */}
            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-ink-faint tabular-nums">
              <span>Free returns within 30 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
