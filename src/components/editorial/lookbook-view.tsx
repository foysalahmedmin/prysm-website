'use client'

import Image from 'next/image'
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
        <span className="inline-flex items-center gap-1.5 rounded-md bg-brand/10 px-3 py-1 text-xs font-semibold text-brand tabular-nums">
          <Sparkle size={12} />
          {lookbook.season} Lookbook
        </span>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink md:text-6xl">
          {lookbook.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-text text-base text-ink-soft md:text-lg">
          {lookbook.description}
        </p>

        {/* Look Selector Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {lookbook.looks.map((look, idx) => (
            <button
              key={look.id}
              onClick={() => setActiveLookIndex(idx)}
              className={`rounded-md px-5 py-2 text-xs font-semibold tabular-nums transition ${
                activeLookIndex === idx
                  ? 'bg-brand text-on-brand'
                  : 'border border-white/70 bg-white/60 text-ink-soft hover:bg-white hover:text-ink'
              }`}
            >
              Look {String(idx + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Active Look Presentation */}
      {currentLook && (
        <section className="mb-20 grid items-start gap-8 lg:grid-cols-12">
          {/* Main Visual with Lens Frame */}
          <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/70 p-3 backdrop-blur-xl lg:col-span-7">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100">
              <Image
                priority
                src={currentLook.media.src}
                alt={currentLook.media.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />

              {/* Floating Hotspot indicator badge */}
              <div className="absolute bottom-6 left-6 max-w-xs rounded-2xl border border-white/80 bg-white/85 p-4 backdrop-blur-md">
                <span className="text-xs font-semibold text-brand tabular-nums">
                  Active Dossier
                </span>
                <p className="mt-1 font-display text-sm font-medium text-ink">
                  {currentLook.title}
                </p>
                <p className="mt-1 line-clamp-2 font-text text-xs text-ink-soft">
                  {currentLook.description}
                </p>
              </div>
            </div>
          </div>

          {/* Shoppable Products Side Rail */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="rounded-3xl border border-white/80 bg-white/70 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
                <div>
                  <h2 className="font-display text-xl font-medium text-ink">Pieces in This Look</h2>
                  <p className="font-text text-xs text-ink-soft">
                    {currentProducts.length} shoppable garment
                    {currentProducts.length === 1 ? '' : 's'}
                  </p>
                </div>
                <Link
                  href={routes.shop}
                  className="inline-flex items-center gap-1 font-text text-xs font-semibold text-brand hover:underline"
                >
                  Shop all <ArrowRight size={12} />
                </Link>
              </div>

              {/* Shoppable Product Grid / Hotspot cards */}
              <div className="mt-6 space-y-6">
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="overflow-hidden rounded-2xl border border-white/80 bg-white/80 p-2 transition"
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
        <h2 className="mb-8 text-center font-display text-2xl font-medium text-ink md:text-3xl">
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
              className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/60 p-4 backdrop-blur-md transition hover:-translate-y-1"
            >
              <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={look.media.src}
                  alt={look.media.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-brand tabular-nums">
                  Look {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="font-text text-xs text-ink-faint">
                  {look.productSlugs.length} piece{look.productSlugs.length === 1 ? '' : 's'}
                </span>
              </div>
              <h3 className="mt-2 font-display text-base font-medium text-ink transition group-hover:text-brand">
                {look.title}
              </h3>
              <p className="mt-1 line-clamp-2 font-text text-xs text-ink-soft">
                {look.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
