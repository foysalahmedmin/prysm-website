'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ConnectedProductCard } from '@/components/commerce/connected-product-card'
import { ArrowRight, Sparkle } from '@/components/icons'
import { routes } from '@/config/routes'
import type { LookbookContent, Product } from '@/domain'

export function LookbookView({
  lookbook,
  products = [],
}: {
  lookbook: LookbookContent
  products?: Product[]
}) {
  const [activeLookIndex, setActiveLookIndex] = useState(0)
  const productMap = new Map(products.map((p) => [p.slug, p]))

  const currentLook = lookbook.looks[activeLookIndex] || lookbook.looks[0]
  const currentProducts = currentLook
    ? currentLook.productSlugs
        .map((slug) => productMap.get(slug))
        .filter((p): p is Product => Boolean(p))
    : []

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      {/* Editorial Header */}
      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-brand">
          <Sparkle size={12} />
          {lookbook.season} Lookbook
        </span>
        <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold tracking-tight text-ink">
          {lookbook.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-text text-base md:text-lg text-ink-soft">
          {lookbook.description}
        </p>

        {/* Look Selector Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {lookbook.looks.map((look, idx) => (
            <button
              key={look.id}
              onClick={() => setActiveLookIndex(idx)}
              className={`rounded-full px-5 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition ${
                activeLookIndex === idx
                  ? 'bg-brand text-on-brand shadow-glass-strong'
                  : 'bg-white/60 text-ink-soft hover:bg-white hover:text-ink border border-white/70'
              }`}
            >
              Look {String(idx + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Active Look Presentation */}
      {currentLook && (
        <section className="mb-20 grid gap-8 lg:grid-cols-12 items-start">
          {/* Main Visual with Lens Frame */}
          <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/70 p-3 shadow-glass-strong backdrop-blur-xl lg:col-span-7">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100">
              <img
                src={currentLook.media.src}
                alt={currentLook.media.alt}
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />

              {/* Floating Hotspot indicator badge */}
              <div className="absolute bottom-6 left-6 rounded-2xl border border-white/80 bg-white/85 p-4 shadow-glass backdrop-blur-md max-w-xs">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
                  Active Dossier
                </span>
                <p className="mt-1 font-display text-sm font-bold text-ink">
                  {currentLook.title}
                </p>
                <p className="mt-1 font-text text-xs text-ink-soft line-clamp-2">
                  {currentLook.description}
                </p>
              </div>
            </div>
          </div>

          {/* Shoppable Products Side Rail */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="rounded-3xl border border-white/80 bg-white/70 p-6 shadow-glass backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-ink">
                    Pieces in This Look
                  </h2>
                  <p className="font-text text-xs text-ink-soft">
                    {currentProducts.length} shoppable garment{currentProducts.length === 1 ? '' : 's'}
                  </p>
                </div>
                <Link
                  href={routes.shop}
                  className="font-text text-xs font-semibold text-brand hover:underline inline-flex items-center gap-1"
                >
                  Shop all <ArrowRight size={12} />
                </Link>
              </div>

              {/* Shoppable Product Grid / Hotspot cards */}
              <div className="mt-6 space-y-6">
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="overflow-hidden rounded-2xl border border-white/80 bg-white/80 p-2 shadow-sm transition hover:shadow-glass"
                  >
                    <ConnectedProductCard product={product} />
                  </div>
                ))}

                {currentProducts.length === 0 && (
                  <div className="py-8 text-center text-sm text-ink-soft">
                    Select a look above to explore its optical tailoring components.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Looks Overview Grid */}
      <section className="border-t border-slate-200/80 pt-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-ink mb-8 text-center">
          Complete Seasonal Collection
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {lookbook.looks.map((look, idx) => (
            <div
              key={look.id}
              onClick={() => {
                setActiveLookIndex(idx)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="group cursor-pointer flex flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/60 p-4 shadow-glass backdrop-blur-md transition hover:-translate-y-1 hover:shadow-glass-strong"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100 mb-4">
                <img
                  src={look.media.src}
                  alt={look.media.alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase font-semibold text-brand">
                  Look {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="font-text text-xs text-ink-faint">
                  {look.productSlugs.length} piece{look.productSlugs.length === 1 ? '' : 's'}
                </span>
              </div>
              <h3 className="mt-2 font-display text-base font-bold text-ink group-hover:text-brand transition">
                {look.title}
              </h3>
              <p className="mt-1 font-text text-xs text-ink-soft line-clamp-2">
                {look.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
