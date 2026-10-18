import Image from 'next/image'
import Link from 'next/link'
import { ConnectedProductCard } from '@/components/commerce/connected-product-card'
import { NewsletterSection } from '@/components/commerce/newsletter-section'
import { ArrowRight, Star } from '@/components/icons'
import { Button } from '@/components/ui'
import { formatMoney, type JournalPost, type Product, type Review } from '@/domain'
import { Reveal } from '@/lib/motion'
import { pageMetadata } from '@/lib/metadata'
import { services } from '@/services'

export const generateMetadata = () => pageMetadata('home')

const MONEY = { currency: 'USD', locale: 'en-US' } as const

function SectionHeading({
  id,
  title,
  subtitle,
  href,
  hrefLabel,
}: {
  id: string
  title: string
  subtitle?: string
  href?: string
  hrefLabel?: string
}) {
  return (
    <div className="flex items-end justify-between gap-6 pb-8 md:pb-10">
      <div>
        <h2
          id={id}
          className="font-display text-3xl leading-tight font-medium tracking-tight text-ink md:text-4xl"
        >
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 max-w-lg text-sm text-ink-soft md:text-base">{subtitle}</p>
        ) : null}
      </div>
      {href && hrefLabel ? (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ink underline-offset-4 hover:underline"
        >
          {hrefLabel}
          <ArrowRight
            size={14}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      ) : null}
    </div>
  )
}

export default async function HomePage() {
  const [home, lookbook] = await Promise.all([
    services.content.getHome(),
    services.content.getLookbook(),
  ])

  const featuredProducts = (
    await Promise.all(
      home.featuredRail.productSlugs.map((slug) => services.catalog.getProduct(slug)),
    )
  ).filter((p): p is Product => p !== null)

  const teaserPosts = (
    await Promise.all(
      home.journalTeasers.postSlugs.map((slug) => services.content.getJournalPost(slug)),
    )
  ).filter((post): post is JournalPost => post !== null)

  const reviewPicks = (
    await Promise.all(
      featuredProducts.slice(0, 3).map(async (product) => {
        const review = (await services.catalog.listReviews(product.id)).find((r) => r.rating === 5)
        return review ? { review, product } : null
      }),
    )
  ).filter((pick): pick is { review: Review; product: Product } => pick !== null)

  const spotlight = featuredProducts[0]
  const [mainCategory, ...sideCategories] = home.categories

  return (
    <div>
      {/* Hero: one photograph, one frosted pane */}
      <section
        aria-label="Brand statement"
        className="relative isolate h-[calc(100svh-7rem)] max-h-[60rem] min-h-[34rem] w-full overflow-hidden bg-canvas"
      >
        <Image
          src={home.hero.media.src}
          alt={home.hero.media.alt}
          fill
          priority
          sizes="100vw"
          className="prysm-settle -z-10 object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/35 via-ink/0 to-ink/0"
        />
        <div className="relative page-container flex h-full items-end justify-between gap-8 pb-6 md:pb-12">
          <div
            className="glass glass-strong prysm-rise max-w-xl p-6 md:p-10"
            style={{ ['--delay' as string]: '200ms' }}
          >
            <p className="text-sm text-ink-soft">{home.hero.eyecatch}</p>
            <h1 className="mt-3 font-display text-4xl leading-[1.02] font-medium tracking-tight text-ink sm:text-5xl md:text-6xl">
              {home.hero.headline}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
              {home.hero.body}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button asChild size="md">
                <Link href={home.hero.cta.href}>
                  {home.hero.cta.label}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </Button>
              <Link
                href="/collections"
                className="text-sm font-medium text-ink underline-offset-4 hover:underline"
              >
                Collections
              </Link>
            </div>
          </div>

          {spotlight ? (
            <Link
              href={`/products/${spotlight.slug}`}
              className="glass glass-strong prysm-rise hidden w-64 shrink-0 items-center gap-4 p-3 lg:flex"
              style={{ ['--delay' as string]: '450ms' }}
            >
              <span className="relative block h-20 w-16 shrink-0 overflow-hidden bg-canvas">
                <Image
                  src={spotlight.media[0]!.src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0 text-sm">
                <span className="block text-xs text-ink-soft">Featured</span>
                <span className="mt-0.5 line-clamp-2 block leading-snug font-medium text-ink">
                  {spotlight.name}
                </span>
                <span className="mt-1 block text-ink-soft tabular-nums">
                  {formatMoney(spotlight.price, MONEY)}
                </span>
              </span>
            </Link>
          ) : null}
        </div>
      </section>

      {/* Featured pieces */}
      <section aria-labelledby="featured-heading" className="page-container py-16 md:py-24">
        <Reveal>
          <SectionHeading
            id="featured-heading"
            title={home.featuredRail.title}
            subtitle={home.featuredRail.subtitle}
            href="/shop"
            hrefLabel="Shop all"
          />
        </Reveal>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-4 md:gap-x-5">
          {featuredProducts.map((product, idx) => (
            <Reveal as="li" key={product.id} delay={idx * 80} className="flex">
              <ConnectedProductCard product={product} priority={idx < 2} className="w-full" />
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Categories: one large tile, two stacked */}
      {mainCategory ? (
        <section aria-labelledby="categories-heading" className="page-container pb-16 md:pb-24">
          <Reveal>
            <SectionHeading id="categories-heading" title="Shop by category" />
          </Reveal>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:grid-rows-2">
            {[mainCategory, ...sideCategories].map((cat, idx) => (
              <Reveal
                key={cat.slug}
                delay={idx * 90}
                className={idx === 0 ? 'md:col-span-6 md:row-span-2' : 'md:col-span-6'}
              >
                <Link
                  href={`/shop/${cat.slug}`}
                  className={`group relative block h-full overflow-hidden bg-canvas ${idx === 0 ? 'aspect-[4/5] md:aspect-auto md:min-h-[44rem]' : 'aspect-[16/10] md:aspect-auto md:min-h-[21.5rem]'}`}
                >
                  <Image
                    src={cat.media.src}
                    alt={cat.media.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/40 via-ink/0 to-ink/0"
                  />
                  <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 md:inset-x-6 md:bottom-6">
                    <span className="glass glass-strong px-4 py-3">
                      <span className="block font-display text-xl font-medium text-ink">
                        {cat.title}
                      </span>
                      <span className="block text-xs text-ink-soft">{cat.subtitle}</span>
                    </span>
                    <span className="glass hidden h-11 w-11 items-center justify-center rounded-full text-ink transition-transform duration-300 group-hover:translate-x-1 sm:flex">
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* Editorial: a dark band, picture on the left, copy on the right */}
      <section aria-labelledby="editorial-heading" className="bg-ink text-on-brand">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[40rem]">
            <Image
              src={home.editorial.media.src}
              alt={home.editorial.media.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <Reveal className="flex flex-col justify-center gap-6 px-6 py-14 md:px-14 md:py-20 lg:px-24">
            <h2
              id="editorial-heading"
              className="font-display text-3xl leading-tight font-medium tracking-tight md:text-5xl"
            >
              {home.editorial.title}
            </h2>
            <blockquote className="max-w-md font-display text-xl leading-snug text-on-brand/90 md:text-2xl">
              &ldquo;{home.editorial.quote}&rdquo;
            </blockquote>
            <p className="max-w-md text-sm leading-relaxed text-on-brand/65 md:text-base">
              {home.editorial.body}
            </p>
            {home.editorial.cta ? (
              <Link
                href={home.editorial.cta.href}
                className="group inline-flex w-fit items-center gap-2 border-b border-on-brand/60 pb-1 text-sm font-medium text-on-brand transition-colors hover:border-on-brand"
              >
                {home.editorial.cta.label}
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            ) : null}
          </Reveal>
        </div>
      </section>

      {/* Lookbook */}
      <section aria-labelledby="lookbook-heading" className="page-container py-16 md:py-24">
        <Reveal>
          <SectionHeading
            id="lookbook-heading"
            title={lookbook.title}
            subtitle={lookbook.season}
            href="/lookbook"
            hrefLabel="Open lookbook"
          />
        </Reveal>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-5">
          {lookbook.looks.slice(0, 3).map((look, idx) => (
            <Reveal as="li" key={look.id} delay={idx * 100}>
              <Link href="/lookbook" className="group block">
                <span className="relative block aspect-[3/4] overflow-hidden bg-canvas">
                  <Image
                    src={look.media.src}
                    alt={look.media.alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                  />
                </span>
                <span className="mt-3 block text-sm font-medium text-ink">
                  {look.title.replace(/^Look \d+\s*[—-]\s*/, '')}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Mirror Try: a real sequence, so the steps are numbered */}
      <section aria-labelledby="explainer-heading" className="border-y border-ink/10 bg-surface">
        <div className="page-container grid gap-12 py-16 md:py-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2
              id="explainer-heading"
              className="font-display text-3xl leading-tight font-medium tracking-tight text-ink md:text-4xl"
            >
              {home.mirrorTryExplainer.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
              {home.mirrorTryExplainer.subtitle}
            </p>
            <Button asChild className="mt-7">
              <Link href="/shop">
                {home.mirrorTryExplainer.cta.label}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
          <ol className="grid gap-px bg-ink/10 sm:grid-cols-3 lg:col-span-8">
            {home.mirrorTryExplainer.steps.map((step, idx) => (
              <Reveal as="li" key={step.step} delay={idx * 100} className="bg-surface p-6 md:p-8">
                <span className="font-display text-4xl font-light text-ink-faint tabular-nums">
                  {String(step.step).padStart(2, '0')}
                </span>
                <h3 className="mt-6 text-base font-medium text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Reviews: real quotes from the catalogue */}
      {reviewPicks.length > 0 ? (
        <section aria-labelledby="reviews-heading" className="page-container pt-16 md:pt-24">
          <Reveal>
            <SectionHeading id="reviews-heading" title="What customers say" />
          </Reveal>
          <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
            {reviewPicks.map(({ review, product }, idx) => (
              <Reveal
                as="li"
                key={review.id}
                delay={idx * 100}
                className="border-t border-ink pt-6"
              >
                <div
                  role="img"
                  aria-label={`${review.rating} out of 5 stars`}
                  className="flex gap-0.5"
                >
                  {Array.from({ length: review.rating }, (_, i) => (
                    <Star key={i} size={14} weight="fill" aria-hidden="true" className="text-ink" />
                  ))}
                </div>
                <blockquote className="mt-4 font-display text-xl leading-snug font-medium text-ink">
                  &ldquo;{review.title}&rdquo;
                </blockquote>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{review.body}</p>
                <p className="mt-5 text-xs text-ink-soft">
                  {review.author}
                  {review.verified ? ' · Verified purchase' : ''}
                </p>
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-1 inline-block text-sm text-ink underline-offset-4 hover:underline"
                >
                  {product.name}
                </Link>
              </Reveal>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Journal */}
      <section aria-labelledby="journal-heading" className="page-container py-16 md:py-24">
        <Reveal>
          <SectionHeading
            id="journal-heading"
            title={home.journalTeasers.title}
            href="/journal"
            hrefLabel="All stories"
          />
        </Reveal>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {teaserPosts.map((post, idx) => (
            <Reveal as="li" key={post.slug} delay={idx * 100}>
              <Link
                href={`/journal/${post.slug}`}
                className="group block border border-ink/10 bg-surface"
              >
                <span className="relative block aspect-[16/10] overflow-hidden bg-canvas">
                  <Image
                    src={post.cover.src}
                    alt={post.cover.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  />
                </span>
                <span className="block px-5 pt-5 pb-6">
                  <span className="block text-xs text-ink-soft">
                    {post.readingMinutes} min read
                  </span>
                  <span className="mt-2 block font-display text-xl leading-snug font-medium text-ink">
                    {post.title}
                  </span>
                  <span className="mt-2 line-clamp-2 block text-sm text-ink-soft">
                    {post.excerpt}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* The basics, stated once */}
      <section aria-label="Shipping, returns and payment" className="border-t border-ink/10">
        <dl className="page-container grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4 md:py-12">
          {[
            ['Free shipping', 'On orders over $150'],
            ['30-day returns', 'Unworn, with tags attached'],
            ['Try before you buy', 'Preview the fit with Mirror Try'],
            ['Secure checkout', 'Encrypted card payment'],
          ].map(([title, text]) => (
            <div key={title}>
              <dt className="text-sm font-medium text-ink">{title}</dt>
              <dd className="mt-1 text-sm text-ink-soft">{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <NewsletterSection
        title={home.newsletter.title}
        description={home.newsletter.description}
        placeholder={home.newsletter.placeholder}
        cta={home.newsletter.cta}
      />
    </div>
  )
}
