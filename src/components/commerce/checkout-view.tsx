'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowRight } from '@/components/icons'
import { Button } from '@/components/ui'
import { brand } from '@/config/brand'
import { routes } from '@/config/routes'
import { formatMoney } from '@/domain'
import { quoteCartAction } from '@/features/cart/actions'
import type { Quote } from '@/features/cart/quote'
import { placeOrderAction } from '@/features/checkout/actions'
import type { CheckoutFormData } from '@/features/checkout/schemas'
import { useCartStore } from '@/stores/cart-store'
import { useHydrated } from '@/stores/hydration'
import { useOrdersStore } from '@/stores/orders-store'
import { useSessionStore } from '@/stores/session-store'

const MONEY = { currency: brand.currency, locale: brand.locale }

export function CheckoutView() {
  const router = useRouter()
  const hydrated = useHydrated()
  const lines = useCartStore((s) => s.lines)
  const clearCart = useCartStore((s) => s.clear)
  const addOrder = useOrdersStore((s) => s.addOrder)
  const customer = useSessionStore((s) => s.customer)
  const addresses = useSessionStore((s) => s.addresses)

  const [quote, setQuote] = useState<Quote | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form State
  const defaultAddress = addresses.find((a) => a.isDefault) ?? addresses[0]
  const [email, setEmail] = useState('')
  const [newsletterOptIn, setNewsletterOptIn] = useState(false)
  const [name, setName] = useState('')
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [postcode, setPostcode] = useState('')
  const [country, setCountry] = useState('Sweden')
  const [phone, setPhone] = useState('')
  const [shippingMethodId, setShippingMethodId] = useState('standard')
  const [cardholderName, setCardholderName] = useState('')
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242')
  const [expDate, setExpDate] = useState('12/28')
  const [cvv, setCvv] = useState('123')

  // Pre-fill from session once hydrated
  useEffect(() => {
    if (!hydrated) return
    Promise.resolve().then(() => {
      if (customer) {
        setEmail(customer.email)
        setName(customer.name)
        setCardholderName(customer.name)
      }
      if (defaultAddress) {
        setName(defaultAddress.name)
        setLine1(defaultAddress.line1)
        setLine2(defaultAddress.line2 ?? '')
        setCity(defaultAddress.city)
        setRegion(defaultAddress.region)
        setPostcode(defaultAddress.postcode)
        setCountry(defaultAddress.country)
        setPhone(defaultAddress.phone ?? '')
      }
    })
  }, [hydrated, customer, defaultAddress])

  // Recalculate quote
  useEffect(() => {
    if (!hydrated || lines.length === 0) return
    let cancelled = false

    quoteCartAction({ lines, shippingMethodId })
      .then((q) => {
        if (!cancelled) setQuote(q)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [hydrated, lines, shippingMethodId])

  if (!hydrated) {
    return (
      <div className="mx-auto min-h-[50vh] max-w-4xl py-20 text-center">
        <div className="glass mx-auto max-w-sm rounded-3xl p-8">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-ink border-t-transparent" />
          <p className="mt-4 text-xs text-ink-soft tabular-nums">Loading Checkout...</p>
        </div>
      </div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto min-h-[50vh] max-w-2xl px-4 py-20 text-center">
        <div className="glass glass-strong rounded-3xl p-10">
          <h1 className="font-display text-2xl font-medium text-ink">Your bag is empty</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Add items to your bag before proceeding to checkout.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href={routes.shop}>Return to Shop</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const checkoutData: CheckoutFormData = {
      contact: {
        email,
        newsletterOptIn,
      },
      shippingAddress: {
        name,
        line1,
        line2: line2 || undefined,
        city,
        region,
        postcode,
        country,
        phone: phone || undefined,
      },
      shippingMethodId,
      payment: {
        cardholderName: cardholderName || name,
        cardNumber,
        expDate,
        cvv,
      },
    }

    try {
      const result = await placeOrderAction({
        checkout: checkoutData,
        lines,
      })

      if (!result.ok || !result.order) {
        setError(result.error ?? 'We could not place your order. Check your details and try again.')
        setSubmitting(false)
        return
      }

      addOrder(result.order)
      clearCart()
      router.push(`/checkout/success?orderId=${result.order.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
      setSubmitting(false)
    }
  }

  return (
    <div className="page-container py-10 md:py-14">
      <div className="mb-10 max-w-2xl md:mb-14">
        <h1 className="font-display text-3xl font-medium tracking-tight text-ink">Checkout</h1>
      </div>

      {error ? (
        <div className="mb-6 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 font-text text-sm text-rose-600">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Form Column */}
        <form onSubmit={handleSubmit} className="space-y-8 lg:col-span-7">
          {/* Section 1: Contact Information */}
          <section className="glass glass-strong rounded-3xl border border-ink/10 p-6">
            <div className="flex items-center gap-2 border-b border-ink/10 pb-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-xs font-semibold text-canvas">
                1
              </span>
              <h2 className="font-display text-lg font-medium text-ink">Contact details</h2>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="email" className="mb-1 block text-xs text-ink-soft tabular-nums">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-ink/25 bg-surface p-3 font-text text-sm text-ink placeholder:text-ink-faint hover:border-ink/50 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-2 font-text text-xs text-ink-soft">
                <input
                  type="checkbox"
                  checked={newsletterOptIn}
                  onChange={(e) => setNewsletterOptIn(e.target.checked)}
                  className="rounded accent-ink"
                />
                Email me about new arrivals and offers
              </label>
            </div>
          </section>

          {/* Section 2: Delivery Address */}
          <section className="glass glass-strong rounded-3xl border border-ink/10 p-6">
            <div className="flex items-center gap-2 border-b border-ink/10 pb-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-xs font-semibold text-canvas">
                2
              </span>
              <h2 className="font-display text-lg font-medium text-ink">Delivery address</h2>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="mb-1 block text-xs text-ink-soft tabular-nums">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full rounded-md border border-ink/25 bg-surface p-3 font-text text-sm text-ink placeholder:text-ink-faint hover:border-ink/50 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="line1" className="mb-1 block text-xs text-ink-soft tabular-nums">
                  Street Address *
                </label>
                <input
                  id="line1"
                  type="text"
                  required
                  value={line1}
                  onChange={(e) => setLine1(e.target.value)}
                  placeholder="108 Spectral Way"
                  className="w-full rounded-md border border-ink/25 bg-surface p-3 font-text text-sm text-ink placeholder:text-ink-faint hover:border-ink/50 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="line2" className="mb-1 block text-xs text-ink-soft tabular-nums">
                  Apartment, Suite, Unit (Optional)
                </label>
                <input
                  id="line2"
                  type="text"
                  value={line2}
                  onChange={(e) => setLine2(e.target.value)}
                  placeholder="Suite 4B"
                  className="w-full rounded-md border border-ink/25 bg-surface p-3 font-text text-sm text-ink placeholder:text-ink-faint hover:border-ink/50 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                />
              </div>

              <div>
                <label htmlFor="city" className="mb-1 block text-xs text-ink-soft tabular-nums">
                  City *
                </label>
                <input
                  id="city"
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Stockholm"
                  className="w-full rounded-md border border-ink/25 bg-surface p-3 font-text text-sm text-ink placeholder:text-ink-faint hover:border-ink/50 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                />
              </div>

              <div>
                <label htmlFor="region" className="mb-1 block text-xs text-ink-soft tabular-nums">
                  State / Region *
                </label>
                <input
                  id="region"
                  type="text"
                  required
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="Stockholm County"
                  className="w-full rounded-md border border-ink/25 bg-surface p-3 font-text text-sm text-ink placeholder:text-ink-faint hover:border-ink/50 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                />
              </div>

              <div>
                <label htmlFor="postcode" className="mb-1 block text-xs text-ink-soft tabular-nums">
                  Postal Code *
                </label>
                <input
                  id="postcode"
                  type="text"
                  required
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="111 22"
                  className="w-full rounded-md border border-ink/25 bg-surface p-3 font-text text-sm text-ink placeholder:text-ink-faint hover:border-ink/50 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                />
              </div>

              <div>
                <label htmlFor="country" className="mb-1 block text-xs text-ink-soft tabular-nums">
                  Country *
                </label>
                <input
                  id="country"
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Sweden"
                  className="w-full rounded-md border border-ink/25 bg-surface p-3 font-text text-sm text-ink placeholder:text-ink-faint hover:border-ink/50 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                />
              </div>
            </div>
          </section>

          {/* Section 3: Delivery Speed */}
          <section className="glass glass-strong rounded-3xl border border-ink/10 p-6">
            <div className="flex items-center gap-2 border-b border-ink/10 pb-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-xs font-semibold text-canvas">
                3
              </span>
              <h2 className="font-display text-lg font-medium text-ink">Delivery Method</h2>
            </div>

            <div className="mt-4 space-y-3">
              <label className="glass flex cursor-pointer items-center justify-between rounded-2xl border border-ink/10 p-4 transition-colors hover:bg-surface">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="checkout-shipping"
                    checked={shippingMethodId === 'standard'}
                    onChange={() => setShippingMethodId('standard')}
                    className="accent-ink"
                  />
                  <div>
                    <span className="block font-text text-sm font-semibold text-ink">
                      Standard Courier Delivery
                    </span>
                    <span className="text-xs text-ink-faint tabular-nums">3–5 business days</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-ink tabular-nums">
                  {quote?.totals.subtotal && quote.totals.subtotal >= 15000
                    ? 'Free'
                    : formatMoney(800, MONEY)}
                </span>
              </label>

              <label className="glass flex cursor-pointer items-center justify-between rounded-2xl border border-ink/10 p-4 transition-colors hover:bg-surface">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="checkout-shipping"
                    checked={shippingMethodId === 'express'}
                    onChange={() => setShippingMethodId('express')}
                    className="accent-ink"
                  />
                  <div>
                    <span className="block font-text text-sm font-semibold text-ink">
                      Priority Air Express
                    </span>
                    <span className="text-xs text-ink-faint tabular-nums">1–2 business days</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-ink tabular-nums">
                  {formatMoney(1800, MONEY)}
                </span>
              </label>
            </div>
          </section>

          {/* Section 4: Payment Details */}
          <section className="glass glass-strong rounded-3xl border border-ink/10 p-6">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-xs font-semibold text-canvas">
                  4
                </span>
                <h2 className="font-display text-lg font-medium text-ink">Payment Card</h2>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-ink-soft tabular-nums">
                <span>256-bit TLS Encrypted</span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-ink/10 bg-white/30 p-3 text-xs text-ink-soft tabular-nums">
              ✨ <strong>Demo Simulation:</strong> No payment is charged. Enter any 16-digit card
              number or use the default test numbers.
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="cardholder"
                  className="mb-1 block text-xs text-ink-soft tabular-nums"
                >
                  Cardholder Name *
                </label>
                <input
                  id="cardholder"
                  type="text"
                  required
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full rounded-md border border-ink/25 bg-surface p-3 font-text text-sm text-ink placeholder:text-ink-faint hover:border-ink/50 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                />
              </div>

              <div>
                <label
                  htmlFor="cardNumber"
                  className="mb-1 block text-xs text-ink-soft tabular-nums"
                >
                  Card Number (16 digits) *
                </label>
                <div className="relative">
                  <input
                    id="cardNumber"
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="w-full rounded-md border border-ink/25 bg-surface p-3 text-sm text-ink tabular-nums placeholder:text-ink-faint hover:border-ink/50 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="exp" className="mb-1 block text-xs text-ink-soft tabular-nums">
                    Expiry (MM/YY) *
                  </label>
                  <input
                    id="exp"
                    type="text"
                    required
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                    placeholder="12/28"
                    className="w-full rounded-md border border-ink/25 bg-surface p-3 text-sm text-ink tabular-nums placeholder:text-ink-faint hover:border-ink/50 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  />
                </div>

                <div>
                  <label htmlFor="cvv" className="mb-1 block text-xs text-ink-soft tabular-nums">
                    Security Code (CVV) *
                  </label>
                  <input
                    id="cvv"
                    type="text"
                    required
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    className="w-full rounded-md border border-ink/25 bg-surface p-3 text-sm text-ink tabular-nums placeholder:text-ink-faint hover:border-ink/50 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button type="submit" size="lg" disabled={submitting} className="w-full">
                {submitting ? 'Confirming Order...' : 'Place order'}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </section>
        </form>

        {/* Sidebar Column: Order Review */}
        <aside className="lg:col-span-5">
          <div className="glass glass-strong sticky top-24 rounded-3xl border border-ink/10 p-6">
            <h2 className="font-display text-xl font-medium text-ink">Order summary</h2>

            {/* Line items thumbnail previews */}
            <ul className="mt-6 max-h-80 divide-y divide-white/40 overflow-y-auto">
              {quote?.lines.map((line) => (
                <li key={line.variantId} className="flex items-center gap-4 py-3">
                  <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-xl bg-surface">
                    <Image
                      src={line.image.src}
                      alt={line.image.alt}
                      fill
                      sizes="64px"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-text text-sm font-medium text-ink">{line.name}</p>
                    <p className="text-xs text-ink-faint tabular-nums">
                      Qty {line.quantity} • {Object.values(line.options).join(' / ')}
                    </p>
                  </div>
                  <span className="text-sm text-ink tabular-nums">
                    {formatMoney(line.lineTotal, MONEY)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-2 border-t border-ink/10 pt-4 font-text text-sm">
              <div className="flex justify-between text-ink-soft">
                <dt>Subtotal</dt>
                <dd className="text-ink tabular-nums">
                  {formatMoney(quote?.totals.subtotal ?? 0, MONEY)}
                </dd>
              </div>
              <div className="flex justify-between text-ink-soft">
                <dt>Delivery</dt>
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
              <div className="flex justify-between border-t border-ink/10 pt-3 font-display text-lg font-medium text-ink">
                <dt>Total</dt>
                <dd className="tabular-nums">{formatMoney(quote?.totals.total ?? 0, MONEY)}</dd>
              </div>
            </dl>

            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-ink-faint tabular-nums">
              <span>Free returns within 30 days</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
