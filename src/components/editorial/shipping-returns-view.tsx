'use client'

import Link from 'next/link'
import { ArrowRight, Check, Sparkle } from '@/components/icons'
import { Button } from '@/components/ui'
import { routes } from '@/config/routes'

export function ShippingReturnsView() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 font-mono text-xs font-semibold tracking-wider text-brand uppercase">
          <Sparkle size={12} />
          Global Logistics & Guarantee
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Shipping & Returns
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-text text-base text-ink-soft md:text-lg">
          We ensure every garment is handled with archival care from our atelier to your door. Enjoy
          complimentary domestic delivery over $150 and hassle-free returns.
        </p>
      </div>

      {/* Shipping Rates & Timelines Grid */}
      <section className="mb-16">
        <h2 className="mb-6 font-display text-2xl font-bold text-ink">
          Delivery Options & Timelines
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="shadow-glass rounded-3xl border border-white/80 bg-white/70 p-6 backdrop-blur-xl">
            <span className="font-mono text-xs font-semibold tracking-wider text-brand uppercase">
              Standard Ground
            </span>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-ink">$8</span>
              <span className="font-text text-xs text-ink-soft">or Free over $150</span>
            </div>
            <p className="font-text text-sm text-ink-soft">
              Delivered within 3 to 6 business days via carbon-neutral ground courier.
            </p>
            <ul className="mt-4 space-y-2 border-t border-slate-200/60 pt-4 font-text text-xs text-ink-soft">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-500" />
                Live encrypted tracking
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-500" />
                Signature upon delivery
              </li>
            </ul>
          </div>

          <div className="shadow-glass-strong relative rounded-3xl border-2 border-brand/40 bg-white/80 p-6 backdrop-blur-xl">
            <span className="absolute -top-3 right-6 rounded-full bg-brand px-3 py-0.5 font-mono text-[10px] font-bold tracking-wider text-on-brand uppercase shadow-sm">
              Recommended
            </span>
            <span className="font-mono text-xs font-semibold tracking-wider text-brand uppercase">
              Express Air Delivery
            </span>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-ink">$18</span>
              <span className="font-text text-xs text-ink-soft">Flat rate</span>
            </div>
            <p className="font-text text-sm text-ink-soft">
              Guaranteed delivery within 1 to 2 business days via priority air courier.
            </p>
            <ul className="mt-4 space-y-2 border-t border-slate-200/60 pt-4 font-text text-xs text-ink-soft">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-500" />
                Same-day atelier dispatch before 14:00
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-500" />
                Priority customs clearance
              </li>
            </ul>
          </div>

          <div className="shadow-glass rounded-3xl border border-white/80 bg-white/70 p-6 backdrop-blur-xl">
            <span className="font-mono text-xs font-semibold tracking-wider text-brand uppercase">
              International Express
            </span>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-ink">$28</span>
              <span className="font-text text-xs text-ink-soft">Duties pre-paid</span>
            </div>
            <p className="font-text text-sm text-ink-soft">
              Worldwide delivery to 60+ countries in 2 to 4 business days via DHL Express.
            </p>
            <ul className="mt-4 space-y-2 border-t border-slate-200/60 pt-4 font-text text-xs text-ink-soft">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-500" />
                All duties & taxes included
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-500" />
                Zero surprise doorstep customs fees
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Returns Policy & Process */}
      <section className="shadow-glass mb-16 rounded-3xl border border-white/80 bg-white/70 p-8 backdrop-blur-xl md:p-12">
        <div className="max-w-3xl">
          <span className="font-mono text-xs font-semibold tracking-wider text-brand uppercase">
            Complimentary 30-Day Policy
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink md:text-3xl">
            Atelier Returns & Exchanges
          </h2>
          <p className="mt-3 font-text text-base leading-relaxed text-ink-soft">
            We want you to feel complete confidence in the drape, fit, and optical behavior of your
            pieces. If a garment does not meet your expectations, we accept returns within 30 days
            of receipt.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="border-l-2 border-brand pl-4">
              <span className="font-mono text-xs font-bold text-ink">Step 01</span>
              <h3 className="mt-1 font-display text-sm font-bold text-ink">Request Online</h3>
              <p className="mt-1 font-text text-xs text-ink-soft">
                Log into your Account or track order portal to generate your prepaid DHL / courier
                shipping label.
              </p>
            </div>

            <div className="border-l-2 border-brand pl-4">
              <span className="font-mono text-xs font-bold text-ink">Step 02</span>
              <h3 className="mt-1 font-display text-sm font-bold text-ink">Package Garment</h3>
              <p className="mt-1 font-text text-xs text-ink-soft">
                Place unworn pieces inside their original garment shroud and rigid presentation
                slide box with security tags attached.
              </p>
            </div>

            <div className="border-l-2 border-brand pl-4">
              <span className="font-mono text-xs font-bold text-ink">Step 03</span>
              <h3 className="mt-1 font-display text-sm font-bold text-ink">Courier Collection</h3>
              <p className="mt-1 font-text text-xs text-ink-soft">
                Drop off at any authorized drop-off station or schedule a complimentary doorstep
                courier collection.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-indigo-100/60 bg-indigo-50/50 p-4 font-text text-xs text-ink-soft">
            <span className="font-bold text-ink">Refund Timelines:</span> Once inspected by our
            atelier quality team (typically within 48 hours of return receipt), your refund is
            immediately credited to your original payment method.
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="text-center">
        <h3 className="font-display text-xl font-bold text-ink">
          Need to check on a package in transit?
        </h3>
        <p className="mt-2 font-text text-sm text-ink-soft">
          Enter your order reference code in our tracker for real-time delivery checkpoints.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button asChild>
            <Link href={routes.trackOrder}>
              Track Your Order
              <ArrowRight size={16} />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href={routes.faq}>Review Shipping FAQ</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
