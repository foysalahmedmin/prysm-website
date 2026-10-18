'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { ConnectedProductCard } from '@/components/commerce/connected-product-card'
import { Gallery } from '@/components/commerce/gallery'
import { ReviewSummary } from '@/components/commerce/review-summary'
import { Check, Heart, Star } from '@/components/icons'
import { Button, Price } from '@/components/ui'
import type { Product, Review } from '@/domain'
import { TryOnTrigger } from '@/integration/mirror-try'
import { cn } from '@/lib/cn'
import { useCartStore } from '@/stores/cart-store'
import { useToastStore } from '@/stores/toast-store'
import { useUiStore } from '@/stores/ui-store'
import { selectIsSaved, useWishlistStore } from '@/stores/wishlist-store'

const defaultMoney = { currency: 'USD', locale: 'en-US' } as const

const galleryLabels = {
  group: 'Product images',
  previous: 'Previous image',
  next: 'Next image',
  position: (current: number, total: number) => `Image ${current} of ${total}`,
}

const priceLabels = {
  sale: 'Sale price',
  original: 'Original price',
}

const emptySubscribe = () => () => {}

interface ProductDetailViewProps {
  product: Product
  reviews: Review[]
  relatedProducts: Product[]
  allCatalogProducts?: Product[]
}

export function ProductDetailView({
  product,
  reviews,
  relatedProducts,
  allCatalogProducts = [],
}: ProductDetailViewProps) {
  // Option selection state: initialize with first available values from optionGroups
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    for (const group of product.optionGroups) {
      if (group.values.length > 0) {
        initial[group.key] = group.values[0]!.value
      }
    }
    return initial
  })

  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'shipping'>('details')
  const [justAdded, setJustAdded] = useState(false)

  // Wishlist state with hydration safety
  const saved = useWishlistStore(selectIsSaved(product.id))
  const toggleWishlist = useWishlistStore((state) => state.toggle)
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  // Track product view in UI store
  const recordProductView = useUiStore((state) => state.recordProductView)
  const recentlyViewedIds = useUiStore((state) => state.recentlyViewedIds)

  useEffect(() => {
    recordProductView(product.id)
  }, [product.id, recordProductView])

  // Find matching variant
  const selectedVariant =
    product.variants.find((v) =>
      Object.entries(selectedOptions).every(
        ([key, val]) => v.options[key] === val || v.options[key.toLowerCase()] === val,
      ),
    ) ?? product.variants[0]!

  const isOutOfStock = selectedVariant.stock === 0
  const effectivePrice = selectedVariant.price ?? product.price

  const handleOptionChange = (groupKey: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupKey]: value,
    }))
  }

  const handleAddToBag = () => {
    if (isOutOfStock) return

    useCartStore.getState().add({
      productId: product.id,
      variantId: selectedVariant.id,
      quantity,
    })

    useToastStore.getState().showToast({
      message: `Added ${product.name} to Bag`,
      type: 'success',
    })

    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)

    // Open cart drawer
    useUiStore.getState().openPanel('cart')
  }

  // Calculate review statistics
  const distribution: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  reviews.forEach((r) => {
    const star = Math.min(Math.max(r.rating, 1), 5) as 1 | 2 | 3 | 4 | 5
    distribution[star] = (distribution[star] || 0) + 1
  })

  // Filter recently viewed items from catalog
  const recentlyViewedProducts = isHydrated
    ? recentlyViewedIds
        .filter((id) => id !== product.id)
        .map((id) => allCatalogProducts.find((p) => p.id === id))
        .filter((p): p is Product => p !== undefined)
        .slice(0, 4)
    : []

  return (
    <div className="page-container space-y-20 pt-6 pb-20 md:space-y-28 md:pt-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-ink-soft tabular-nums">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/shop" className="hover:text-ink">
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/shop/${product.category}`} className="capitalize hover:text-ink">
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="line-clamp-1 font-semibold text-ink">{product.name}</li>
        </ol>
      </nav>

      {/* Main Two-Column PDP Section */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Gallery */}
        <div className="lg:sticky lg:top-24 lg:col-span-7">
          <Gallery media={product.media} labels={galleryLabels} />
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="space-y-7 lg:col-span-5">
          {/* Badges & Category */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-ink-soft capitalize">
              {product.subcategory.replace(/-/g, ' ')}
            </span>
            {product.badges.map((badge) => (
              <span
                key={badge}
                className={cn(
                  'rounded-md px-2.5 py-0.5 text-[11px] font-semibold tabular-nums',
                  badge === 'sale' ? 'bg-danger text-on-danger' : 'bg-canvas text-ink',
                )}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl leading-tight font-medium tracking-tight text-balance text-ink md:text-5xl">
            {product.name}
          </h1>

          {/* Price & Reviews Anchor */}
          <div className="flex items-center justify-between border-b border-ink/10 pb-4">
            <Price
              amount={effectivePrice}
              compareAt={product.compareAtPrice}
              currency={defaultMoney.currency}
              locale={defaultMoney.locale}
              labels={priceLabels}
              className="text-xl font-medium"
            />

            {product.rating ? (
              <a
                href="#reviews"
                className="flex items-center gap-1.5 text-xs text-ink-soft tabular-nums transition hover:text-ink"
              >
                <div className="flex text-brand">
                  <Star size={14} weight="fill" className="text-ink" />
                </div>
                <span className="font-semibold text-ink">{product.rating.average.toFixed(1)}</span>
                <span>({product.rating.count})</span>
              </a>
            ) : null}
          </div>

          {/* Summary */}
          <p className="font-text text-sm leading-relaxed text-ink-soft md:text-base">
            {product.summary}
          </p>

          {/* Option Pickers */}
          <div className="space-y-4 pt-2">
            {product.optionGroups.map((optGroup) => {
              const groupKey = optGroup.key
              const currentValue = selectedOptions[groupKey]

              return (
                <div key={optGroup.key} className="space-y-2">
                  <div className="flex items-center justify-between text-xs tabular-nums">
                    <span className="text-sm font-medium text-ink">
                      {optGroup.label}:{' '}
                      <span className="font-normal text-ink-soft">{currentValue}</span>
                    </span>
                    {optGroup.kind === 'size' ? (
                      <Link href="/size-guide" className="text-ink-soft underline hover:text-ink">
                        Size Guide
                      </Link>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {optGroup.values.map((val) => {
                      const isSelected = currentValue === val.value
                      if (optGroup.kind === 'color' && val.swatch) {
                        return (
                          <button
                            key={val.value}
                            type="button"
                            aria-label={val.value}
                            aria-pressed={isSelected}
                            title={val.value}
                            onClick={() => handleOptionChange(optGroup.key, val.value)}
                            className={cn(
                              'flex h-9 w-9 items-center justify-center rounded-[50%] border transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                              isSelected
                                ? 'border-ink ring-1 ring-ink ring-offset-2'
                                : 'border-ink/20',
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className="h-full w-full rounded-[50%]"
                              style={{ backgroundColor: val.swatch }}
                            />
                          </button>
                        )
                      }
                      return (
                        <button
                          key={val.value}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => handleOptionChange(optGroup.key, val.value)}
                          className={cn(
                            'h-11 min-w-12 rounded-sm border px-4 text-sm tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                            isSelected
                              ? 'border-ink bg-ink text-on-brand'
                              : 'border-ink/20 text-ink hover:border-ink',
                          )}
                        >
                          {val.value}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4 border-t border-ink/10 pt-4">
            <div className="flex items-center gap-3">
              <label htmlFor="pdp-quantity" className="text-xs font-semibold text-ink tabular-nums">
                Quantity:
              </label>
              <div className="flex items-center rounded-sm border border-ink/20 p-1">
                <button
                  type="button"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-ink hover:bg-ink/5 disabled:opacity-30"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-semibold text-ink tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  disabled={quantity >= 10}
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-ink hover:bg-ink/5 disabled:opacity-30"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2 [&>:first-child]:basis-full">
              <Button
                variant="primary"
                size="lg"
                disabled={isOutOfStock}
                onClick={handleAddToBag}
                className="w-full text-sm font-medium"
              >
                {justAdded ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={16} /> Added to Bag
                  </span>
                ) : isOutOfStock ? (
                  'Sold Out'
                ) : (
                  'Add to Bag'
                )}
              </Button>

              {/* Mirror Try Trigger */}
              <TryOnTrigger
                product={product}
                variantId={selectedVariant.id}
                source="pdp"
                className="flex h-14 items-center rounded-md border border-ink/20 px-5 text-sm font-medium text-ink transition-colors hover:border-ink"
              />

              {/* Wishlist Button */}
              <button
                type="button"
                aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  'flex h-14 w-14 items-center justify-center rounded-md border border-ink/20 text-ink transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-focus',
                  isHydrated && saved && 'text-danger',
                )}
              >
                <Heart weight={isHydrated && saved ? 'fill' : 'light'} size={20} />
              </button>
            </div>
          </div>

          {/* Service assurances */}
          <div className="grid grid-cols-2 gap-3 pt-4 text-xs text-ink-soft tabular-nums">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" />
              <span>Complimentary shipping $150+</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" />
              <span>30-day archival returns</span>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="space-y-4 border-t border-ink/10 pt-6">
            <div className="flex gap-4 border-b border-ink/10 pb-2">
              {(['details', 'materials', 'shipping'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'pb-1 text-xs font-semibold tabular-nums transition',
                    activeTab === tab
                      ? 'border-b-2 border-brand text-ink'
                      : 'text-ink-soft hover:text-ink',
                  )}
                >
                  {tab === 'details'
                    ? 'Details'
                    : tab === 'materials'
                      ? 'Materials & Care'
                      : 'Shipping'}
                </button>
              ))}
            </div>

            <div className="min-h-[100px] font-text text-sm leading-relaxed text-ink-soft">
              {activeTab === 'details' ? (
                <div className="space-y-3">
                  <p>{product.description}</p>
                  <ul className="list-disc space-y-1 pl-5 text-xs">
                    {product.details.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : activeTab === 'materials' ? (
                <div className="space-y-3">
                  <p className="font-semibold text-ink">
                    Material Composition: {product.materials}
                  </p>
                  <ul className="list-disc space-y-1 pl-5 text-xs">
                    {product.care.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  <p>• Dispatched from Zurich laboratory hub within 24 hours.</p>
                  <p>• Standard carbon-neutral delivery: 3–5 business days ($8, free over $150).</p>
                  <p>• Express priority courier: 1–2 business days ($18 flat rate).</p>
                  <p>• 30-day complimentary returns on unworn items with original seals intact.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section
        id="reviews"
        aria-labelledby="reviews-heading"
        className="space-y-8 border-t border-ink/10 pt-8"
      >
        <h2
          id="reviews-heading"
          className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl"
        >
          Verified Client Reviews
        </h2>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <ReviewSummary
              rating={product.rating ?? { average: 5, count: reviews.length }}
              distribution={distribution}
              labels={{
                heading: 'Client Satisfaction',
                outOf: (avg) => `${avg} out of 5 stars`,
                count: (cnt) => `Based on ${cnt} verified reviews`,
                stars: (s, c) => `${s} stars: ${c}`,
              }}
            />
          </div>

          <div className="space-y-4 lg:col-span-7">
            {reviews.map((rev) => (
              <div key={rev.id} className="space-y-2.5 border-b border-ink/10 pb-6 last:border-b-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-ink tabular-nums">
                      {rev.author}
                    </span>
                    {rev.verified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] text-brand tabular-nums">
                        <Check size={10} aria-hidden="true" /> Verified
                      </span>
                    ) : null}
                  </div>
                  <span className="text-[11px] text-ink-faint tabular-nums">
                    {new Date(rev.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex text-brand">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={12}
                      weight={idx < rev.rating ? 'fill' : 'light'}
                      className={idx < rev.rating ? 'text-ink' : 'text-ink/25'}
                    />
                  ))}
                </div>

                <h3 className="font-display text-sm font-medium text-ink">{rev.title}</h3>
                <p className="font-text text-xs leading-relaxed text-ink-soft">{rev.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products Rail */}
      {relatedProducts.length > 0 ? (
        <section
          aria-labelledby="related-heading"
          className="space-y-8 border-t border-ink/10 pt-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2
                id="related-heading"
                className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl"
              >
                Related Archetypes
              </h2>
              <p className="mt-1 font-text text-sm text-ink-soft">
                Explore complementary silhouettes from the same design laboratory
              </p>
            </div>
            <Link
              href={`/shop/${product.category}`}
              className="text-xs font-semibold text-brand tabular-nums hover:underline"
            >
              View More
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {relatedProducts.map((rel) => (
              <ConnectedProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Recently Viewed Rail */}
      {recentlyViewedProducts.length > 0 ? (
        <section aria-labelledby="recent-heading" className="space-y-8 border-t border-ink/10 pt-8">
          <h2
            id="recent-heading"
            className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl"
          >
            Recently Viewed
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {recentlyViewedProducts.map((rec) => (
              <ConnectedProductCard key={rec.id} product={rec} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
