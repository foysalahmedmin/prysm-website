'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from '@/components/icons'
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
    timeZone: 'UTC',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <article className="page-container py-10 md:py-14">
      {/* Navigation Breadcrumb */}
      <div className="mb-8">
        <Link
          href={routes.journal}
          className="inline-flex items-center gap-2 font-text text-sm font-medium text-ink-soft transition hover:text-ink"
        >
          <ArrowLeft size={16} />
          Back to Journal
        </Link>
      </div>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 text-xs text-ink-faint tabular-nums">
          <span>·</span>
          <time dateTime={post.publishedAt}>{publishedDate}</time>
          <span>·</span>
          <span className="flex items-center gap-1 text-ink-soft">
            <ClockIcon size={12} />
            {post.readingMinutes} min read
          </span>
        </div>

        <h1 className="font-display text-3xl leading-tight font-medium tracking-tight text-ink md:text-5xl">
          {post.title}
        </h1>

        <p className="mt-5 font-text text-lg leading-relaxed text-ink-soft md:text-xl">
          {post.excerpt}
        </p>
      </header>

      {/* Hero Media */}
      <div className="relative mb-12 overflow-hidden rounded-3xl border border-ink/10 bg-surface">
        <Image
          priority
          src={post.cover.src}
          alt={post.cover.alt}
          width={post.cover.width}
          height={post.cover.height}
          sizes="(min-width: 1024px) 768px, 100vw"
          className="aspect-[16/9] w-full object-cover"
        />
        <div className="border-t border-ink/10 p-3 text-center font-text text-xs text-ink-faint">
          {post.cover.alt}
        </div>
      </div>

      {/* Article Body */}
      <div className="prose prose-slate max-w-none space-y-6 font-text text-base leading-relaxed text-ink-soft md:text-lg">
        {post.body.map((paragraph, idx) => (
          <p
            key={idx}
            className="first-letter:font-display first-letter:text-2xl first-letter:font-medium"
          >
            {paragraph}
          </p>
        ))}

        {/* Pull Quote */}
        <blockquote className="my-10 rounded-2xl border-l-4 border-brand bg-surface p-6 md:p-8">
          <p className="font-display text-lg font-medium text-ink italic md:text-xl">
            &ldquo;When luxury tailoring is drafted with structural physics, garments cease being
            passive coverings and become dynamic lenses for light and posture.&rdquo;
          </p>
          <cite className="mt-3 block text-xs text-ink-faint not-italic tabular-nums">
            — PRYSM Atelier Research Note
          </cite>
        </blockquote>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-20 border-t border-ink/10 pt-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl font-medium text-ink">Related Essays</h2>
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
                className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface p-5 transition"
              >
                <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl bg-ink/5">
                  <Image
                    src={related.cover.src}
                    alt={related.cover.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-ink-faint tabular-nums">
                  <ClockIcon size={12} />
                  <span>{related.readingMinutes} min</span>
                </div>
                <h3 className="mt-2 font-display text-base font-medium text-ink transition group-hover:text-brand">
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
