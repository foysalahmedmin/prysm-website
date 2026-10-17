'use client'

import Link from 'next/link'
import { ArrowRight, Sparkle } from '@/components/icons'
import { routes } from '@/config/routes'
import type { JournalPost } from '@/domain'

function ClockIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

export function JournalView({ posts }: { posts: JournalPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-ink">The Journal</h1>
        <p className="mt-4 text-ink-soft">New editorial essays will be published shortly.</p>
      </div>
    )
  }

  const [featured, ...rest] = posts

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-brand">
          <Sparkle size={12} />
          Editorial Essays & Textile Science
        </span>
        <h1 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight text-ink">
          The PRYSM Journal
        </h1>
        <p className="mt-3 max-w-2xl font-text text-base text-ink-soft">
          Explorations in optical textiles, architectural construction, and the philosophy of living in light.
        </p>
      </div>

      {/* Featured Hero Article */}
      {featured && (
        <article className="mb-16 overflow-hidden rounded-3xl border border-white/80 bg-white/70 shadow-glass-strong backdrop-blur-xl transition hover:shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-slate-100">
              <img
                src={featured.cover.src}
                alt={featured.cover.alt}
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-between p-8 md:p-12">
              <div>
                <div className="flex items-center gap-4 text-xs font-mono uppercase text-ink-faint">
                  <time dateTime={featured.publishedAt}>
                    {new Date(featured.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-brand">
                    <ClockIcon size={12} />
                    {featured.readingMinutes} min read
                  </span>
                </div>

                <h2 className="mt-4 font-display text-2xl md:text-3xl font-bold leading-snug text-ink">
                  <Link href={routes.journalPost(featured.slug)} className="hover:text-brand transition">
                    {featured.title}
                  </Link>
                </h2>

                <p className="mt-4 font-text text-sm md:text-base leading-relaxed text-ink-soft">
                  {featured.excerpt}
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href={routes.journalPost(featured.slug)}
                  className="inline-flex items-center gap-2 font-display text-sm font-bold text-brand hover:underline"
                >
                  Read Full Essay <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* Secondary Articles Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/60 shadow-glass backdrop-blur-md transition hover:-translate-y-1 hover:shadow-glass-strong"
          >
            <Link href={routes.journalPost(post.slug)} className="aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src={post.cover.src}
                alt={post.cover.alt}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </Link>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <div className="flex items-center gap-3 text-[11px] font-mono uppercase text-ink-faint">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                  <span>·</span>
                  <span className="text-brand">{post.readingMinutes} min read</span>
                </div>

                <h3 className="mt-3 font-display text-lg font-bold leading-snug text-ink">
                  <Link href={routes.journalPost(post.slug)} className="hover:text-brand transition">
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-2 font-text text-xs text-ink-soft line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/50">
                <Link
                  href={routes.journalPost(post.slug)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-ink hover:text-brand"
                >
                  Read Story <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
