'use client'

import Link from 'next/link'
import { ArrowRight, Check } from '@/components/icons'
import { Button } from '@/components/ui'
import { routes } from '@/config/routes'

export function ShippingReturnsView() {
  return (
    <div className="page-container py-10 md:py-14">
      {/* Header */}
      <div className="mb-10 max-w-2xl md:mb-14">
        <h1 className="font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
          Shipping & Returns
        </h1>
        <p className="mt-4 font-text text-base text-ink-soft md:text-lg">
          We ensure every garment is handled with archival care from our atelier to your door. Enjoy
          complimentary domestic delivery over $150 and hassle-free returns.
        </p>
      </div>

      {/* Shipping Rates & Timelines Grid */}
      <section className="mb-16">
        <h2 className="mb-6 font-display text-2xl font-medium text-ink">
          Delivery Options & Timelines
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-ink/10 bg-surface p-6">
            <span className="text-xs font-semibold text-brand tabular-nums">Standard Ground</span>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-medium text-ink">$8</span>
              <span className="font-text text-xs text-ink-soft">or Free over $150</span>
            </div>
            <p className="font-text text-sm text-ink-soft">
              Delivered within 3 to 6 business days via carbon-neutral ground courier.
            </p>
            <ul className="mt-4 space-y-2 border-t border-ink/10 pt-4 font-text text-xs text-ink-soft">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-ink" />
                Live tracking
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-ink" />
                Signature upon delivery
              </li>
            </ul>
          </div>

          <div className="relative rounded-3xl border-2 border-brand/40 bg-surface p-6">
            <span className="absolute -top-3 right-6 rounded-md bg-brand px-3 py-0.5 text-[10px] font-semibold text-on-brand tabular-nums">
              Recommended
            </span>
            <span className="text-xs font-semibold text-brand tabular-nums">
              Express Air Delivery
            </span>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-medium text-ink">$18</span>
              <span className="font-text text-xs text-ink-soft">Flat rate</span>
            </div>
            <p className="font-text text-sm text-ink-soft">
              Guaranteed delivery within 1 to 2 business days via priority air courier.
            </p>
            <ul className="mt-4 space-y-2 border-t border-ink/10 pt-4 font-text text-xs text-ink-soft">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-ink" />
                Ships the same day if ordered before 14:00
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-ink" />
                Priority customs clearance
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-ink/10 bg-surface p-6">
            <span className="text-xs font-semibold text-brand tabular-nums">
              International Express
            </span>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-medium text-ink">$28</span>
              <span className="font-text text-xs text-ink-soft">Duties pre-paid</span>
            </div>
            <p className="font-text text-sm text-ink-soft">
              Worldwide delivery to 60+ countries in 2 to 4 business days via DHL Express.
            </p>
            <ul className="mt-4 space-y-2 border-t border-ink/10 pt-4 font-text text-xs text-ink-soft">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-ink" />
                All duties & taxes included
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-ink" />
                No customs fees on delivery
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Returns Policy & Process */}
      <section className="mb-16 rounded-3xl border border-ink/10 bg-surface p-8 md:p-12">
        <div className="max-w-3xl">
          <h2 className="mt-2 font-display text-2xl font-medium text-ink md:text-3xl">
            Atelier Returns & Exchanges
          </h2>
          <p className="mt-3 font-text text-base leading-relaxed text-ink-soft">
            We want you to feel complete confidence in the drape, fit, and optical behavior of your
            pieces. If a garment does not meet your expectations, we accept returns within 30 days
            of receipt.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="border-l-2 border-brand pl-4">
              <span className="text-xs font-semibold text-ink tabular-nums">Step 01</span>
              <h3 className="mt-1 font-display text-sm font-medium text-ink">Request Online</h3>
              <p className="mt-1 font-text text-xs text-ink-soft">
                Log into your Account or track order portal to generate your prepaid DHL / courier
                shipping label.
              </p>
            </div>

            <div className="border-l-2 border-brand pl-4">
              <span className="text-xs font-semibold text-ink tabular-nums">Step 02</span>
              <h3 className="mt-1 font-display text-sm font-medium text-ink">Package Garment</h3>
              <p className="mt-1 font-text text-xs text-ink-soft">
                Place unworn pieces inside their original garment shroud and rigid presentation
                slide box with security tags attached.
              </p>
            </div>

            <div className="border-l-2 border-brand pl-4">
              <span className="text-xs font-semibold text-ink tabular-nums">Step 03</span>
              <h3 className="mt-1 font-display text-sm font-medium text-ink">Courier Collection</h3>
              <p className="mt-1 font-text text-xs text-ink-soft">
                Drop off at any authorized drop-off station or schedule a complimentary doorstep
                courier collection.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-indigo-100/60 bg-indigo-50/50 p-4 font-text text-xs text-ink-soft">
            <span className="font-semibold text-ink">Refund Timelines:</span> Once inspected by our
            atelier quality team (typically within 48 hours of return receipt), your refund is
            immediately credited to your original payment method.
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="text-center">
        <h3 className="font-display text-xl font-medium text-ink">
          Need to check on a package in transit?
        </h3>
        <p className="mt-2 font-text text-sm text-ink-soft">
          Enter your order reference code in our tracker for real-time delivery checkpoints.
        </p>
        <div className="mt-6 flex gap-4">
          <Button asChild>
            <Link href={routes.trackOrder}>
              Track your order
              <ArrowRight size={16} />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href={routes.faq}>Shipping FAQ</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
