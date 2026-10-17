import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkle } from '@/components/icons'
import { ConnectedProductCard } from '@/components/commerce/connected-product-card'
import { NewsletterSection } from '@/components/commerce/newsletter-section'
import { Button } from '@/components/ui'
import type { JournalPost, Product } from '@/domain'
import { pageMetadata } from '@/lib/metadata'
import { services } from '@/services'

export const generateMetadata = () => pageMetadata('home')

export default async function HomePage() {
  const home = await services.content.getHome()

  // Fetch featured products
  const featuredProducts = (
    await Promise.all(
      home.featuredRail.productSlugs.map((slug) => services.catalog.getProduct(slug)),
    )
  ).filter((p): p is Product => p !== null)

  // Fetch journal teasers
  const teaserPosts = (
    await Promise.all(
      home.journalTeasers.postSlugs.map((slug) => services.content.getJournalPost(slug)),
    )
  ).filter((post): post is JournalPost => post !== null)

  return (
    <div className="space-y-16 md:space-y-28 pb-16">
      {/* 1. Hero Section */}
      <section aria-label="Brand statement" className="relative overflow-hidden pt-4 md:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs font-semibold tracking-wider uppercase text-brand">
              <Sparkle size={14} className="text-brand animate-pulse" />
              <span>{home.hero.eyecatch}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.08]">
              {home.hero.headline}
            </h1>

            <p className="max-w-xl font-text text-base md:text-lg text-ink-soft leading-relaxed">
              {home.hero.body}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href={home.hero.cta.href}>
                <Button variant="primary" size="lg" className="rounded-full px-8 shadow-md">
                  <span>{home.hero.cta.label}</span>
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/collections">
                <Button variant="secondary" size="lg" className="rounded-full px-7">
                  Explore Collections
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="glass edge relative aspect-[4/5] w-full overflow-hidden rounded-[32px] p-2.5 shadow-2xl">
              <div className="relative h-full w-full overflow-hidden rounded-[24px]">
                <Image
                  src={home.hero.media.src}
                  alt={home.hero.media.alt}
                  width={home.hero.media.width}
                  height={home.hero.media.height}
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            {/* Ambient Refraction Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-8 -right-8 -z-10 h-72 w-72 rounded-full bg-brand/30 blur-3xl opacity-60"
            />
          </div>
        </div>
      </section>

      {/* 2. Featured Rail */}
      <section aria-labelledby="featured-heading" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 id="featured-heading" className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
              {home.featuredRail.title}
            </h2>
            <p className="mt-1 font-text text-sm md:text-base text-ink-soft">
              {home.featuredRail.subtitle}
            </p>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-ink hover:text-brand transition"
          >
            <span>View All Pieces</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, idx) => (
            <ConnectedProductCard
              key={product.id}
              product={product}
              priority={idx < 2}
            />
          ))}
        </div>
      </section>

      {/* 3. Category Entry Points */}
      <section aria-labelledby="categories-heading" className="space-y-8">
        <div>
          <h2 id="categories-heading" className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
            Category Archetypes
          </h2>
          <p className="mt-1 font-text text-sm md:text-base text-ink-soft">
            Spectral clothing, refractive accessories, and architectural jewelry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {home.categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="glass edge group relative flex flex-col overflow-hidden rounded-[28px] p-3 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-surface">
                <Image
                  src={cat.media.src}
                  alt={cat.media.alt}
                  width={cat.media.width}
                  height={cat.media.height}
                  sizes="(min-width: 768px) 33vw, 90vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-ink">
                  <h3 className="font-display text-xl font-bold tracking-tight">{cat.title}</h3>
                  <p className="font-text text-xs text-ink-soft mt-0.5">{cat.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Editorial Spotlight */}
      <section
        aria-labelledby="editorial-heading"
        className="glass glass-strong edge relative overflow-hidden rounded-[32px] p-6 md:p-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-square w-full overflow-hidden rounded-[24px]">
            <Image
              src={home.editorial.media.src}
              alt={home.editorial.media.alt}
              width={home.editorial.media.width}
              height={home.editorial.media.height}
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
              Editorial Spotlight
            </span>
            <h2 id="editorial-heading" className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
              {home.editorial.title}
            </h2>
            <blockquote className="border-l-2 border-brand pl-4 font-display text-lg italic text-ink/90">
              "{home.editorial.quote}"
            </blockquote>
            <p className="font-text text-sm md:text-base text-ink-soft leading-relaxed">
              {home.editorial.body}
            </p>
            {home.editorial.cta ? (
              <div>
                <Link href={home.editorial.cta.href}>
                  <Button variant="secondary" size="md" className="rounded-full px-6">
                    <span>{home.editorial.cta.label}</span>
                    <ArrowRight size={14} className="ml-1.5" />
                  </Button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* 5. Mirror Try Explainer */}
      <section
        aria-labelledby="explainer-heading"
        className="glass edge relative overflow-hidden rounded-[32px] p-8 md:p-14 space-y-10"
      >
        <div className="max-w-2xl space-y-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
            Virtual Try-On
          </span>
          <h2 id="explainer-heading" className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
            {home.mirrorTryExplainer.title}
          </h2>
          <p className="font-text text-sm md:text-base text-ink-soft">
            {home.mirrorTryExplainer.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {home.mirrorTryExplainer.steps.map((step) => (
            <div
              key={step.step}
              className="glass glass-strong rounded-[24px] p-6 space-y-3 relative overflow-hidden"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 font-mono text-sm font-bold text-brand">
                0{step.step}
              </div>
              <h3 className="font-display text-base font-bold text-ink">{step.title}</h3>
              <p className="font-text text-xs md:text-sm text-ink-soft leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <Link href="/shop">
            <Button variant="primary" size="md" className="rounded-full px-7 shadow-sm">
              <span>{home.mirrorTryExplainer.cta.label}</span>
              <ArrowRight size={14} className="ml-1.5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 6. Journal Teasers */}
      <section aria-labelledby="journal-heading" className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 id="journal-heading" className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
            {home.journalTeasers.title}
          </h2>
          <Link
            href="/journal"
            className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-ink hover:text-brand transition"
          >
            <span>All Dispatches</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teaserPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="glass edge group relative flex flex-col overflow-hidden rounded-[28px] p-4 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px] bg-surface">
                <Image
                  src={post.cover.src}
                  alt={post.cover.alt}
                  width={post.cover.width}
                  height={post.cover.height}
                  sizes="(min-width: 768px) 50vw, 90vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 space-y-2 px-1">
                <span className="font-mono text-xs text-ink-soft">
                  {post.readingMinutes} min read
                </span>
                <h3 className="font-display text-lg font-bold text-ink group-hover:text-brand transition">
                  {post.title}
                </h3>
                <p className="line-clamp-2 font-text text-xs md:text-sm text-ink-soft">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Newsletter */}
      <NewsletterSection
        title={home.newsletter.title}
        description={home.newsletter.description}
        placeholder={home.newsletter.placeholder}
        cta={home.newsletter.cta}
      />
    </div>
  )
}
