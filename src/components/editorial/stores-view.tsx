'use client'

import Link from 'next/link'
import { ArrowRight, Sparkle } from '@/components/icons'
import { Button } from '@/components/ui'
import { routes } from '@/config/routes'
import type { Store } from '@/domain'

export function StoresView({ stores = [] }: { stores: Store[] }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-brand/10 px-3 py-1 text-xs font-semibold text-brand tabular-nums">
          <Sparkle size={12} />
          Global Boutiques & Ateliers
        </span>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
          Flagships & Fitting Chambers
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-text text-base text-ink-soft md:text-lg">
          Experience our optical textiles in person. Every boutique features physical garment
          archives, dedicated private fitting chambers, and optical mirror analysis.
        </p>
      </div>

      {/* Stores Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        {stores.map((store) => (
          <div
            key={store.id}
            className="flex flex-col justify-between overflow-hidden rounded-3xl border border-ink/10 bg-white/70 p-8 transition hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-brand tabular-nums">
                  {store.city.split(',')[0]}
                </span>
                <span className="text-xs text-ink-faint tabular-nums">{store.country}</span>
              </div>

              <h2 className="mt-3 font-display text-2xl font-medium text-ink">{store.name}</h2>

              <div className="mt-6 space-y-4 font-text text-sm">
                <div>
                  <span className="block text-xs text-ink-faint tabular-nums">Address</span>
                  <p className="mt-1 font-medium text-ink">{store.address}</p>
                  <p className="text-ink-soft">
                    {store.city}, {store.country}
                  </p>
                </div>

                <div>
                  <span className="block text-xs text-ink-faint tabular-nums">
                    Phone & Advisory
                  </span>
                  <p className="mt-1 font-medium text-ink">{store.phone}</p>
                </div>

                <div>
                  <span className="block text-xs text-ink-faint tabular-nums">Opening Hours</span>
                  <ul className="mt-1 space-y-1 text-ink-soft">
                    {store.hours.map((line, idx) => (
                      <li key={idx} className="text-xs leading-relaxed">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200/60 pt-6">
              <Button asChild variant="secondary" className="w-full justify-center text-xs">
                <Link href={routes.contact}>
                  Book Consultation
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Consultation Banner */}
      <div className="mt-16 rounded-3xl border border-ink/10 bg-surface p-8 text-center md:flex md:items-center md:justify-between md:text-left">
        <div>
          <h3 className="font-display text-xl font-medium text-ink">
            Private Virtual Consultations
          </h3>
          <p className="mt-1 font-text text-sm text-ink-soft">
            Unable to visit a flagship? Connect with a master stylist via encrypted 1-on-1 virtual
            chamber session.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <Button asChild>
            <Link href={routes.contact}>Schedule Virtual Appointment</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
