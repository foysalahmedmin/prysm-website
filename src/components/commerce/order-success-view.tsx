'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, Check } from '@/components/icons'
import { Button } from '@/components/ui'
import { brand } from '@/config/brand'
import { routes } from '@/config/routes'
import { formatMoney } from '@/domain'
import { useHydrated } from '@/stores/hydration'
import { useOrdersStore } from '@/stores/orders-store'

const MONEY = { currency: brand.currency, locale: brand.locale }

export function OrderConfirmationView() {
  const searchParams = useSearchParams()
  const hydrated = useHydrated()
  const orderId = searchParams.get('orderId')

  const orders = useOrdersStore((s) => s.orders)
  const order = orderId ? (orders.find((o) => o.id === orderId) ?? orders[0]) : orders[0]

  if (!hydrated) {
    return (
      <div className="mx-auto min-h-[50vh] max-w-4xl py-20 text-center">
        <div className="glass mx-auto max-w-sm rounded-3xl p-8">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-ink border-t-transparent" />
          <p className="mt-4 text-xs text-ink-soft tabular-nums">Loading Receipt...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="mx-auto min-h-[50vh] max-w-xl px-4 py-20 text-center">
        <div className="glass glass-strong rounded-3xl p-10">
          <h1 className="font-display text-2xl font-medium text-ink">Order Not Found</h1>
          <p className="mt-2 text-sm text-ink-soft">
            We could not locate this order. Return to your shopping gallery.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href={routes.shop}>Explore Collection</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Badge */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-md border border-white/80 bg-white/60">
          <Check size={32} className="text-emerald-500" />
        </div>
        <span className="text-xs text-ink-faint tabular-nums">Acquisition confirmed</span>
        <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          Thank you for your order
        </h1>
        <p className="mt-3 font-text text-sm text-ink-soft sm:text-base">
          A confirmation dispatch has been sent to{' '}
          <strong className="text-ink">{order.customerEmail}</strong>.
        </p>
      </div>

      {/* Main Glass Receipt Card */}
      <div className="glass glass-strong mt-10 rounded-3xl border border-white/80 p-8 sm:p-10">
        {/* Receipt Header Bar */}
        <div className="flex flex-col justify-between gap-4 border-b border-white/40 pb-6 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs text-ink-faint tabular-nums">Order Number</span>
            <p className="text-xl font-semibold text-ink tabular-nums">{order.number}</p>
          </div>
          <div className="sm:text-right">
            <span className="text-xs text-ink-faint tabular-nums">Date & Time</span>
            <p className="text-sm text-ink tabular-nums">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Itemized Lines */}
        <div className="mt-8">
          <h2 className="text-xs text-ink-soft tabular-nums">Acquired Artifacts</h2>
          <ul className="mt-4 divide-y divide-white/40">
            {order.lines.map((line) => (
              <li key={line.variantId} className="flex items-center gap-4 py-4">
                {line.image ? (
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-surface">
                    <Image
                      src={line.image}
                      alt={line.title}
                      fill
                      sizes="64px"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}
                <div className="min-w-0 flex-1">
                  <p className="font-text text-sm font-semibold text-ink">{line.title}</p>
                  <p className="text-xs text-ink-faint tabular-nums">
                    Qty {line.quantity} • {Object.values(line.options).join(' / ')}
                  </p>
                </div>
                <span className="text-sm font-semibold text-ink tabular-nums">
                  {formatMoney(line.unitPrice * line.quantity, MONEY)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Shipping & Payment Meta */}
        <div className="mt-8 grid grid-cols-1 gap-6 border-t border-white/40 pt-6 sm:grid-cols-2">
          <div>
            <h3 className="text-xs text-ink-soft tabular-nums">Delivery Destination</h3>
            <div className="mt-2 font-text text-sm text-ink">
              <p className="font-semibold">{order.address.name}</p>
              <p>{order.address.line1}</p>
              {order.address.line2 ? <p>{order.address.line2}</p> : null}
              <p>
                {order.address.city}, {order.address.region} {order.address.postcode}
              </p>
              <p>{order.address.country}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs text-ink-soft tabular-nums">Payment Method</h3>
            <div className="mt-2 font-text text-sm text-ink">
              <p className="font-semibold">
                {order.payment.brand} ending in •••• {order.payment.last4}
              </p>
              <p className="text-xs text-ink-faint tabular-nums">
                Expires {order.payment.expMonth.toString().padStart(2, '0')}/
                {order.payment.expYear.toString().slice(-2)}
              </p>
              <p className="mt-3 text-xs text-ink-soft tabular-nums">
                Method: {order.shippingMethod.name} ({order.shippingMethod.etaDays.min}–
                {order.shippingMethod.etaDays.max} days)
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="mt-8 border-t border-white/40 pt-6">
          <dl className="space-y-2 font-text text-sm">
            <div className="flex justify-between text-ink-soft">
              <dt>Subtotal</dt>
              <dd className="text-ink tabular-nums">{formatMoney(order.totals.subtotal, MONEY)}</dd>
            </div>
            {order.totals.discount > 0 ? (
              <div className="flex justify-between text-emerald-600">
                <dt>Promotional Savings</dt>
                <dd className="tabular-nums">-{formatMoney(order.totals.discount, MONEY)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between text-ink-soft">
              <dt>Delivery</dt>
              <dd className="text-ink tabular-nums">
                {order.totals.shipping === 0
                  ? 'Complimentary'
                  : formatMoney(order.totals.shipping, MONEY)}
              </dd>
            </div>
            <div className="flex justify-between text-ink-soft">
              <dt>Estimated Tax (8%)</dt>
              <dd className="text-ink tabular-nums">{formatMoney(order.totals.tax, MONEY)}</dd>
            </div>
            <div className="flex justify-between border-t border-white/60 pt-3 font-display text-lg font-medium text-ink">
              <dt>Total Billed</dt>
              <dd className="tabular-nums">{formatMoney(order.totals.total, MONEY)}</dd>
            </div>
          </dl>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/40 pt-6 sm:flex-row">
          <div className="flex gap-3">
            <Button asChild size="md">
              <Link href={routes.trackOrder}>
                Track Acquisition
                <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="md">
              <Link href={routes.orders}>View in Account</Link>
            </Button>
          </div>
          <Link
            href={routes.shop}
            className="text-xs text-ink tabular-nums transition-colors hover:text-ink-soft"
          >
            Continue Exploring &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
