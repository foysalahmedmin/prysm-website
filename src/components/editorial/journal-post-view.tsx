'use client'

import Link from 'next/link'
import { ArrowLeft, Sparkle } from '@/components/icons'
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

export function JournalPostView({
  post,
  relatedPosts = [],
}: {
  post: JournalPost
  relatedPosts?: JournalPost[]
}) {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      {/* Navigation Breadcrumb */}
      <div className="mb-8">
        <Link
          href={routes.journal}
          className="inline-flex items-center gap-2 font-text text-sm font-medium text-ink-soft hover:text-ink transition"
        >
          <ArrowLeft size={16} />
          Back to Journal
        </Link>
      </div>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-ink-faint">
          <span className="inline-flex items-center gap-1 text-brand font-semibold">
            <Sparkle size={12} />
            Editorial Essay
          </span>
          <span>·</span>
          <time dateTime={post.publishedAt}>{publishedDate}</time>
          <span>·</span>
          <span className="flex items-center gap-1 text-ink-soft">
            <ClockIcon size={12} />
            {post.readingMinutes} min read
          </span>
        </div>

        <h1 className="mt-4 font-display text-3xl md:text-5xl font-bold tracking-tight text-ink leading-tight">
          {post.title}
        </h1>

        <p className="mt-5 font-text text-lg md:text-xl leading-relaxed text-ink-soft">
          {post.excerpt}
        </p>
      </header>

      {/* Hero Media */}
      <div className="relative mb-12 overflow-hidden rounded-3xl border border-white/80 bg-white/60 shadow-glass-strong">
        <img
          src={post.cover.src}
          alt={post.cover.alt}
          className="aspect-[16/9] w-full object-cover"
        />
        <div className="p-3 text-center font-text text-xs text-ink-faint border-t border-white/60">
          {post.cover.alt}
        </div>
      </div>

      {/* Article Body */}
      <div className="prose prose-slate max-w-none space-y-6 font-text text-base md:text-lg leading-relaxed text-ink-soft">
        {post.body.map((paragraph, idx) => (
          <p key={idx} className="first-letter:font-display first-letter:text-2xl first-letter:font-bold">
            {paragraph}
          </p>
        ))}

        {/* Pull Quote */}
        <blockquote className="my-10 rounded-2xl border-l-4 border-brand bg-white/70 p-6 md:p-8 shadow-glass backdrop-blur-md">
          <p className="font-display text-lg md:text-xl italic font-semibold text-ink">
            &ldquo;When luxury tailoring is drafted with structural physics, garments cease being passive coverings and become dynamic lenses for light and posture.&rdquo;
          </p>
          <cite className="mt-3 block font-mono text-xs uppercase tracking-wider text-ink-faint not-italic">
            — PRYSM Atelier Research Note
          </cite>
        </blockquote>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-20 border-t border-slate-200/80 pt-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-ink">Related Essays</h2>
            <Link
              href={routes.journal}
              className="font-text text-sm font-semibold text-brand hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={routes.journalPost(related.slug)}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/60 p-5 shadow-glass backdrop-blur-md transition hover:-translate-y-1 hover:shadow-glass-strong"
              >
                <div className="aspect-[16/9] overflow-hidden rounded-xl bg-slate-100 mb-4">
                  <img
                    src={related.cover.src}
                    alt={related.cover.alt}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-ink-faint">
                  <ClockIcon size={12} />
                  <span>{related.readingMinutes} min</span>
                </div>
                <h3 className="mt-2 font-display text-base font-bold text-ink group-hover:text-brand transition">
                  {related.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
