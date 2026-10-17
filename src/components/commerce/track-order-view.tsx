'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Check, MagnifyingGlass } from '@/components/icons'
import { Button } from '@/components/ui'
import { brand } from '@/config/brand'
import { routes } from '@/config/routes'
import { formatMoney } from '@/domain'
import type { Order } from '@/domain'
import { useHydrated } from '@/stores/hydration'
import { useOrdersStore } from '@/stores/orders-store'

const MONEY = { currency: brand.currency, locale: brand.locale }

const STEPS = [
  { id: 'confirmed', label: 'Acquisition Confirmed', desc: 'Order verified & allocated' },
  { id: 'processing', label: 'Chamber Preparation', desc: 'Inspection & white-glove packaging' },
  { id: 'shipped', label: 'In Transit', desc: 'Secure temperature-controlled courier' },
  { id: 'delivered', label: 'Delivered', desc: 'Signed receipt at destination' },
]

export function TrackOrderView() {
  const hydrated = useHydrated()
  const orders = useOrdersStore((s) => s.orders)

  const [orderNumberInput, setOrderNumberInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null)
  const [searchAttempted, setSearchAttempted] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchAttempted(true)

    const cleanNum = orderNumberInput.trim().toLowerCase()
    const cleanEmail = emailInput.trim().toLowerCase()

    const found = orders.find((o) => {
      const matchNum = o.number.toLowerCase() === cleanNum || o.id.toLowerCase() === cleanNum
      if (!matchNum) return false
      if (cleanEmail) {
        return o.customerEmail.toLowerCase() === cleanEmail
      }
      return true
    })

    setSearchedOrder(found ?? null)
  }

  const handleSelectRecent = (order: Order) => {
    setOrderNumberInput(order.number)
    setEmailInput(order.customerEmail)
    setSearchedOrder(order)
    setSearchAttempted(true)
  }

  const currentStepIdx = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 0
      case 'processing':
        return 1
      case 'shipped':
        return 2
      case 'delivered':
        return 3
      default:
        return 0
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">PRYSM COURIER RADAR</span>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Track Your Acquisition
        </h1>
        <p className="mt-3 font-text text-sm text-ink-soft sm:text-base">
          Monitor real-time transit velocity and white-glove courier status for your PRYSM garments.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="glass glass-strong mx-auto mt-8 max-w-2xl rounded-3xl border border-white/80 p-6 shadow-xl sm:p-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="orderNum" className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-soft">
                Order Number *
              </label>
              <input
                id="orderNum"
                type="text"
                required
                value={orderNumberInput}
                onChange={(e) => setOrderNumberInput(e.target.value)}
                placeholder="e.g. PRY-10842"
                className="glass w-full rounded-xl border border-white/80 p-3 font-mono text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="orderEmail" className="mb-1 block font-mono text-xs uppercase tracking-wider text-ink-soft">
                Billing Email Address
              </label>
              <input
                id="orderEmail"
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="collector@example.com"
                className="glass w-full rounded-xl border border-white/80 p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" size="md" className="w-full">
              <MagnifyingGlass size={16} className="mr-2" />
              Locate Dispatch
            </Button>
          </div>
        </form>

        {/* Quick select if recent orders exist */}
        {hydrated && orders.length > 0 ? (
          <div className="mt-6 border-t border-white/40 pt-4">
            <span className="font-mono text-xs uppercase text-ink-faint">Or choose a recent acquisition:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {orders.slice(0, 3).map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => handleSelectRecent(o)}
                  className="glass rounded-xl border border-white/60 px-3 py-1.5 font-mono text-xs text-ink transition-colors hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-focus"
                >
                  {o.number} ({formatMoney(o.totals.total, MONEY)})
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Search Result */}
      {searchedOrder ? (
        <div className="glass glass-strong mx-auto mt-10 max-w-3xl rounded-3xl border border-white/80 p-8 shadow-2xl sm:p-10">
          <div className="flex flex-col justify-between gap-4 border-b border-white/40 pb-6 sm:flex-row sm:items-center">
            <div>
              <span className="font-mono text-xs uppercase text-ink-faint">Tracking Dispatch</span>
              <p className="font-mono text-2xl font-bold tracking-wider text-ink">{searchedOrder.number}</p>
            </div>
            <div className="sm:text-right">
              <span className="font-mono text-xs uppercase text-ink-faint">Estimated Delivery</span>
              <p className="font-mono text-sm font-semibold text-ink">
                {searchedOrder.shippingMethod.etaDays.min}–{searchedOrder.shippingMethod.etaDays.max} Business Days
              </p>
            </div>
          </div>

          {/* Stepper */}
          <div className="mt-8">
            <h2 className="font-mono text-xs uppercase tracking-wider text-ink-soft">Courier Velocity</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-4">
              {STEPS.map((step, idx) => {
                const activeIdx = currentStepIdx(searchedOrder.status)
                const isPassed = idx <= activeIdx
                const isCurrent = idx === activeIdx

                return (
                  <div key={step.id} className="relative flex flex-col items-start sm:items-center sm:text-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
                        isPassed
                          ? 'border-white bg-ink text-canvas shadow-lg'
                          : 'border-white/60 bg-white/40 text-ink-faint'
                      }`}
                    >
                      {isPassed ? <Check size={18} /> : <span className="font-mono text-xs">{idx + 1}</span>}
                    </div>
                    <p className={`mt-3 font-display text-sm font-bold ${isCurrent ? 'text-ink' : 'text-ink-soft'}`}>
                      {step.label}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-ink-faint">{step.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Package details */}
          <div className="mt-10 border-t border-white/40 pt-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-ink-soft">Package Contents</h3>
            <ul className="mt-4 divide-y divide-white/40">
              {searchedOrder.lines.map((l) => (
                <li key={l.variantId} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    {l.image ? (
                      <div className="h-12 w-10 shrink-0 overflow-hidden rounded-lg bg-surface">
                        <img src={l.image} alt={l.title} className="h-full w-full object-cover" />
                      </div>
                    ) : null}
                    <div>
                      <p className="font-text text-sm font-semibold text-ink">{l.title}</p>
                      <p className="font-mono text-xs text-ink-faint">Qty {l.quantity}</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm text-ink">
                    {formatMoney(l.unitPrice * l.quantity, MONEY)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : searchAttempted ? (
        <div className="glass mx-auto mt-8 max-w-xl rounded-3xl p-8 text-center">
          <p className="font-display text-lg font-bold text-ink">Dispatch Not Located</p>
          <p className="mt-2 text-sm text-ink-soft">
            No matching order was found for <strong>{orderNumberInput}</strong>. Please check your order confirmation
            email or view all orders in your Account.
          </p>
          <div className="mt-4">
            <Button asChild variant="secondary" size="sm">
              <Link href={routes.orders}>View Account Orders</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
