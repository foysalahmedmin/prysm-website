'use client'

import Link from 'next/link'
import { ArrowRight, Sparkle } from '@/components/icons'
import { Button } from '@/components/ui'
import { brand } from '@/config/brand'
import { routes } from '@/config/routes'

const PILLARS = [
  {
    title: 'Refractive Textiles',
    description:
      'We infuse natural mulberry silks and technical wools with microscopic optical particles that scatter ambient light into subtle chromatic spectra.',
  },
  {
    title: 'Architectural Volumes',
    description:
      'Garments drafted with structural precision. Laser-bonded seams and calculated balance lines ensure fluidity without compromising architectural posture.',
  },
  {
    title: 'Virtual Fitting Technology',
    description:
      'Through our Mirror Try optical engine, shoppers can preview dynamic textile break points and sleeve drape before garments leave our atelier.',
  },
]

const TIMELINE = [
  {
    year: '2021',
    title: 'The Optics Atelier',
    description:
      'Founded in New York as an experimental studio investigating light-responsive suiting.',
  },
  {
    year: '2023',
    title: 'Prismatic Silk Patent',
    description:
      'Developed our proprietary low-micron silica infusion process in collaboration with heritage Como weavers.',
  },
  {
    year: '2025',
    title: 'Flagship & Fitting Chamber',
    description:
      'Opened Broome Street flagship featuring physical and virtual try-on fitting chambers.',
  },
  {
    year: '2026',
    title: 'Global Atelier Network',
    description: 'Expanded bespoke consultations to Paris and Tokyo galleries.',
  },
]

export function AboutView() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      {/* Hero Section */}
      <div className="relative mb-16 overflow-hidden rounded-3xl border border-ink/10 bg-surface p-8 md:p-14">
        <div className="max-w-2xl">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-md bg-brand/10 px-3 py-1 text-xs font-semibold text-brand tabular-nums">
            <Sparkle size={12} />
            Our Atelier & Manifesto
          </span>
          <h1 className="font-display text-3xl font-medium tracking-tight text-ink md:text-5xl">
            Tailoring Cut to Catch the Light.
          </h1>
          <p className="mt-4 font-text text-base leading-relaxed text-ink-soft md:text-lg">
            {brand.name} was established on a single principle: luxury tailoring should interact
            dynamically with its environment. By marrying traditional bespoke tailoring with optical
            physics, we craft garments that transform under sunlight, flash photography, and evening
            gallery illuminations.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href={routes.shop}>
                Explore the Collection
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={routes.lookbook}>View Lookbook</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Pillars Grid */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-medium text-ink md:text-3xl">
            Foundations of Optical Design
          </h2>
          <p className="mt-2 font-text text-sm text-ink-soft md:text-base">
            Where precision chemistry meets master cutting.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-ink/10 bg-white/60 p-6 backdrop-blur-md transition hover:-translate-y-1"
            >
              <h3 className="font-display text-lg font-medium text-ink">{pillar.title}</h3>
              <p className="mt-3 font-text text-sm leading-relaxed text-ink-soft">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Atelier Timeline */}
      <section className="mb-16 rounded-3xl border border-ink/10 bg-white/70 p-8 md:p-12">
        <h2 className="mb-8 text-center font-display text-2xl font-medium text-ink">
          Atelier Chronicle
        </h2>
        <div className="grid gap-8 md:grid-cols-4">
          {TIMELINE.map((step) => (
            <div
              key={step.year}
              className="relative border-l-2 border-brand/30 pl-4 md:border-t-2 md:border-l-0 md:pt-4"
            >
              <span className="text-xs font-semibold text-brand tabular-nums">{step.year}</span>
              <h4 className="mt-1 font-display text-base font-medium text-ink">{step.title}</h4>
              <p className="mt-2 font-text text-xs leading-relaxed text-ink-soft">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sustainability & Ethics */}
      <section className="rounded-3xl border border-ink/10 bg-ink p-8 text-white md:p-12">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold text-indigo-300 tabular-nums">
            Conscious Creation
          </span>
          <h2 className="mt-2 font-display text-2xl font-medium md:text-3xl">
            Zero-Waste Cutting & Ethical Sourcing
          </h2>
          <p className="mt-4 font-text text-sm leading-relaxed text-slate-300 md:text-base">
            Every pattern piece is digitally mapped using nesting algorithms to achieve 96.8% cloth
            yield, virtually eliminating scrap offcuts. All wools are certified non-mulesed
            Tasmanian merino, and our silk mills recycle 99% of wastewater in closed-loop thermal
            recovery systems.
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              href={routes.stores}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4 hover:text-indigo-200"
            >
              Visit Our Ateliers <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
