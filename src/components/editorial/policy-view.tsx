'use client'

import Link from 'next/link'
import { Sparkle } from '@/components/icons'
import { routes } from '@/config/routes'

export interface PolicySection {
  heading: string
  content: string[]
}

export function PolicyView({
  title,
  subtitle,
  lastUpdated,
  sections,
}: {
  title: string
  subtitle: string
  lastUpdated: string
  sections: PolicySection[]
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      {/* Header */}
      <div className="mb-12">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 font-mono text-xs font-semibold tracking-wider text-brand uppercase">
          <Sparkle size={12} />
          Legal & Governance Charter
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          {title}
        </h1>
        <p className="mt-3 font-text text-base text-ink-soft md:text-lg">{subtitle}</p>
        <div className="mt-4 font-mono text-xs text-ink-faint">Last revised: {lastUpdated}</div>
      </div>

      {/* Content Sections */}
      <div className="shadow-glass rounded-3xl border border-white/80 bg-white/70 p-8 backdrop-blur-xl md:p-12">
        <div className="space-y-10">
          {sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="border-b border-slate-200/60 pb-3 font-display text-xl font-bold text-ink md:text-2xl">
                {section.heading}
              </h2>
              <div className="space-y-3 font-text text-sm leading-relaxed text-ink-soft md:text-base">
                {section.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Support footer */}
      <div className="mt-12 text-center font-text text-sm text-ink-soft">
        Questions regarding our policies? Write to{' '}
        <Link href={routes.contact} className="font-semibold text-brand hover:underline">
          our Atelier Concierge
        </Link>
        .
      </div>
    </div>
  )
}
