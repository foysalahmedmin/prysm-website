'use client'

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
  const order = orderId
    ? orders.find((o) => o.id === orderId) ?? orders[0]
    : orders[0]

  if (!hydrated) {
    return (
      <div className="mx-auto min-h-[50vh] max-w-4xl py-20 text-center">
        <div className="glass mx-auto max-w-sm rounded-3xl p-8">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-ink border-t-transparent" />
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-soft">Loading Receipt...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="mx-auto min-h-[50vh] max-w-xl px-4 py-20 text-center">
        <div className="glass glass-strong rounded-3xl p-10 shadow-2xl">
          <h1 className="font-display text-2xl font-bold text-ink">Order Not Found</h1>
          <p className="mt-2 text-sm text-ink-soft">We could not locate this order. Return to your shopping gallery.</p>
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
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/80 bg-white/60 shadow-lg">
          <Check size={32} className="text-emerald-500" />
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">ACQUISITION CONFIRMED</span>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Thank you for your order
        </h1>
        <p className="mt-3 font-text text-sm text-ink-soft sm:text-base">
          A confirmation dispatch has been sent to{' '}
          <strong className="text-ink">{order.customerEmail}</strong>.
        </p>
      </div>

      {/* Main Glass Receipt Card */}
      <div className="glass glass-strong mt-10 rounded-3xl border border-white/80 p-8 shadow-2xl sm:p-10">
        {/* Receipt Header Bar */}
        <div className="flex flex-col justify-between gap-4 border-b border-white/40 pb-6 sm:flex-row sm:items-center">
          <div>
            <span className="font-mono text-xs uppercase text-ink-faint">Order Number</span>
            <p className="font-mono text-xl font-bold tracking-wider text-ink">{order.number}</p>
          </div>
          <div className="sm:text-right">
            <span className="font-mono text-xs uppercase text-ink-faint">Date & Time</span>
            <p className="font-mono text-sm text-ink">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Itemized Lines */}
        <div className="mt-8">
          <h2 className="font-mono text-xs uppercase tracking-wider text-ink-soft">Acquired Artifacts</h2>
          <ul className="mt-4 divide-y divide-white/40">
            {order.lines.map((line) => (
              <li key={line.variantId} className="flex items-center gap-4 py-4">
                {line.image ? (
                  <div className="h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-surface">
                    <img src={line.image} alt={line.title} className="h-full w-full object-cover" />
                  </div>
                ) : null}
                <div className="flex-1 min-w-0">
                  <p className="font-text text-sm font-semibold text-ink">{line.title}</p>
                  <p className="font-mono text-xs text-ink-faint">
                    Qty {line.quantity} • {Object.values(line.options).join(' / ')}
                  </p>
                </div>
                <span className="font-mono text-sm font-semibold text-ink">
                  {formatMoney(line.unitPrice * line.quantity, MONEY)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Shipping & Payment Meta */}
        <div className="mt-8 grid grid-cols-1 gap-6 border-t border-white/40 pt-6 sm:grid-cols-2">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-ink-soft">Delivery Destination</h3>
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
            <h3 className="font-mono text-xs uppercase tracking-wider text-ink-soft">Payment Method</h3>
            <div className="mt-2 font-text text-sm text-ink">
              <p className="font-semibold">{order.payment.brand} ending in •••• {order.payment.last4}</p>
              <p className="font-mono text-xs text-ink-faint">
                Expires {order.payment.expMonth.toString().padStart(2, '0')}/{order.payment.expYear.toString().slice(-2)}
              </p>
              <p className="mt-3 font-mono text-xs text-ink-soft">
                Method: {order.shippingMethod.name} ({order.shippingMethod.etaDays.min}–{order.shippingMethod.etaDays.max} days)
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="mt-8 border-t border-white/40 pt-6">
          <dl className="space-y-2 font-text text-sm">
            <div className="flex justify-between text-ink-soft">
              <dt>Subtotal</dt>
              <dd className="font-mono text-ink">{formatMoney(order.totals.subtotal, MONEY)}</dd>
            </div>
            {order.totals.discount > 0 ? (
              <div className="flex justify-between text-emerald-600">
                <dt>Promotional Savings</dt>
                <dd className="font-mono">-{formatMoney(order.totals.discount, MONEY)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between text-ink-soft">
              <dt>Delivery</dt>
              <dd className="font-mono text-ink">
                {order.totals.shipping === 0 ? 'Complimentary' : formatMoney(order.totals.shipping, MONEY)}
              </dd>
            </div>
            <div className="flex justify-between text-ink-soft">
              <dt>Estimated Tax (8%)</dt>
              <dd className="font-mono text-ink">{formatMoney(order.totals.tax, MONEY)}</dd>
            </div>
            <div className="flex justify-between border-t border-white/60 pt-3 font-display text-lg font-bold text-ink">
              <dt>Total Billed</dt>
              <dd className="font-mono">{formatMoney(order.totals.total, MONEY)}</dd>
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
            className="font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:text-ink-soft"
          >
            Continue Exploring &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
