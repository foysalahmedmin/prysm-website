'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { ConnectedProductCard } from '@/components/commerce/connected-product-card'
import { Gallery } from '@/components/commerce/gallery'
import { ReviewSummary } from '@/components/commerce/review-summary'
import { Check, Heart, Sparkle } from '@/components/icons'
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
    <div className="page-container space-y-16 pb-16 md:space-y-24">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-soft">
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
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: Gallery */}
        <div className="sticky top-24 lg:col-span-7">
          <div className="glass edge rounded-[32px] p-3 shadow-lg md:p-5">
            <Gallery media={product.media} labels={galleryLabels} />
          </div>
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="space-y-6 lg:col-span-5">
          {/* Badges & Category */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-semibold tracking-wider text-brand uppercase">
              {product.subcategory}
            </span>
            {product.badges.map((badge) => (
              <span
                key={badge}
                className={cn(
                  'rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-wider uppercase',
                  badge === 'sale'
                    ? 'bg-danger text-on-danger'
                    : 'glass glass-strong text-ink shadow-sm',
                )}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
            {product.name}
          </h1>

          {/* Price & Reviews Anchor */}
          <div className="flex items-center justify-between border-b border-white/20 pb-4">
            <Price
              amount={effectivePrice}
              compareAt={product.compareAtPrice}
              currency={defaultMoney.currency}
              locale={defaultMoney.locale}
              labels={priceLabels}
              className="text-2xl font-bold"
            />

            {product.rating ? (
              <a
                href="#reviews"
                className="flex items-center gap-1.5 font-mono text-xs text-ink-soft transition hover:text-ink"
              >
                <div className="flex text-brand">
                  <Sparkle size={14} className="fill-brand text-brand" />
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
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-semibold tracking-wider text-ink uppercase">
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

                      return (
                        <button
                          key={val.value}
                          type="button"
                          onClick={() => handleOptionChange(optGroup.key, val.value)}
                          className={cn(
                            'glass glass-strong h-10 min-w-10 rounded-full px-4 font-mono text-xs font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-focus',
                            isSelected
                              ? 'scale-105 bg-brand text-on-brand shadow-md'
                              : 'text-ink hover:scale-102 hover:text-brand',
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
          <div className="space-y-4 border-t border-white/20 pt-4">
            <div className="flex items-center gap-3">
              <label
                htmlFor="pdp-quantity"
                className="font-mono text-xs font-semibold tracking-wider text-ink uppercase"
              >
                Quantity:
              </label>
              <div className="glass glass-strong flex items-center rounded-full p-1">
                <button
                  type="button"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-ink hover:bg-ink/10 disabled:opacity-30"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono text-xs font-bold text-ink">
                  {quantity}
                </span>
                <button
                  type="button"
                  disabled={quantity >= 10}
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-ink hover:bg-ink/10 disabled:opacity-30"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                disabled={isOutOfStock}
                onClick={handleAddToBag}
                className="flex-1 rounded-full text-sm font-semibold shadow-md"
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
                className="glass rounded-full px-5 py-3 text-sm font-semibold shadow-sm transition hover:scale-105"
              />

              {/* Wishlist Button */}
              <button
                type="button"
                aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  'glass flex h-12 w-12 items-center justify-center rounded-full text-ink transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-focus',
                  isHydrated && saved && 'text-danger',
                )}
              >
                <Heart weight={isHydrated && saved ? 'fill' : 'light'} size={20} />
              </button>
            </div>
          </div>

          {/* Service assurances */}
          <div className="grid grid-cols-2 gap-3 pt-4 font-mono text-xs text-ink-soft">
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
          <div className="space-y-4 border-t border-white/20 pt-6">
            <div className="flex gap-4 border-b border-white/20 pb-2">
              {(['details', 'materials', 'shipping'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'pb-1 font-mono text-xs font-semibold tracking-wider uppercase transition',
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
        className="space-y-8 border-t border-white/20 pt-8"
      >
        <h2
          id="reviews-heading"
          className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl"
        >
          Verified Client Reviews
        </h2>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="glass edge sticky top-24 rounded-[28px] p-6 lg:col-span-5">
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
              <div key={rev.id} className="glass glass-strong space-y-2.5 rounded-[24px] p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-ink">{rev.author}</span>
                    {rev.verified ? (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-brand">
                        <Sparkle size={10} /> Verified
                      </span>
                    ) : null}
                  </div>
                  <span className="font-mono text-[11px] text-ink-faint">
                    {new Date(rev.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex text-brand">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Sparkle
                      key={idx}
                      size={12}
                      className={idx < rev.rating ? 'fill-brand text-brand' : 'text-ink/20'}
                    />
                  ))}
                </div>

                <h3 className="font-display text-sm font-bold text-ink">{rev.title}</h3>
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
          className="space-y-8 border-t border-white/20 pt-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2
                id="related-heading"
                className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl"
              >
                Related Archetypes
              </h2>
              <p className="mt-1 font-text text-sm text-ink-soft">
                Explore complementary silhouettes from the same design laboratory
              </p>
            </div>
            <Link
              href={`/shop/${product.category}`}
              className="font-mono text-xs font-semibold tracking-wider text-brand uppercase hover:underline"
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
        <section
          aria-labelledby="recent-heading"
          className="space-y-8 border-t border-white/20 pt-8"
        >
          <h2
            id="recent-heading"
            className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl"
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
