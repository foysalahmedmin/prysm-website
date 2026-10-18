'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, ShoppingBag, Trash } from '@/components/icons'
import { Button } from '@/components/ui'
import { brand } from '@/config/brand'
import { routes } from '@/config/routes'
import { formatMoney } from '@/domain'
import type { Product } from '@/domain'
import { TryOnTrigger } from '@/integration/mirror-try'
import { useCartStore } from '@/stores/cart-store'
import { useHydrated } from '@/stores/hydration'
import { useToastStore } from '@/stores/toast-store'
import { useUiStore } from '@/stores/ui-store'
import { useWishlistStore } from '@/stores/wishlist-store'

const MONEY = { currency: brand.currency, locale: brand.locale }

export function WishlistView() {
  const hydrated = useHydrated()
  const productIds = useWishlistStore((s) => s.productIds)
  const toggleWishlist = useWishlistStore((s) => s.toggle)
  const addToCart = useCartStore((s) => s.add)
  const openPanel = useUiStore((s) => s.openPanel)
  const showToast = useToastStore((s) => s.showToast)

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!hydrated) return
    let cancelled = false

    Promise.resolve().then(() => {
      if (cancelled) return
      if (productIds.length === 0) {
        setProducts([])
        setLoading(false)
        return
      }

      setLoading(true)
      import('@/services')
        .then(({ services }) => services.catalog.getProductsByIds(productIds))
        .then((prods) => {
          if (!cancelled) {
            setProducts(prods)
            setLoading(false)
          }
        })
        .catch(() => {
          if (!cancelled) setLoading(false)
        })
    })

    return () => {
      cancelled = true
    }
  }, [hydrated, productIds])

  const handleMoveToBag = (product: Product) => {
    const availableVariant = product.variants.find((v) => v.stock > 0) ?? product.variants[0]
    if (!availableVariant) return

    addToCart({
      productId: product.id,
      variantId: availableVariant.id,
      quantity: 1,
    })
    toggleWishlist(product.id)
    showToast({
      message: `${product.name} moved to your shopping bag.`,
      type: 'success',
    })
    openPanel('cart')
  }

  if (!hydrated || loading) {
    return (
      <div className="mx-auto min-h-[50vh] max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="glass mx-auto max-w-sm rounded-3xl p-8">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-ink border-t-transparent" />
          <p className="mt-4 text-xs text-ink-soft tabular-nums">Loading Wishlist...</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="mx-auto min-h-[60vh] max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="glass glass-strong mx-auto max-w-xl rounded-3xl p-12">
          <h1 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Your wishlist is empty
          </h1>
          <p className="mt-4 font-text text-sm leading-relaxed text-ink-soft sm:text-base">
            Tap the heart on any piece to save it here, then try it on with Mirror Try.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href={routes.shop}>
                Continue shopping
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container py-10 md:py-14">
      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-4 border-b border-ink/10 pb-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Saved Pieces ({products.length})
          </h1>
        </div>
        <Link
          href={routes.shop}
          className="inline-flex items-center text-xs text-ink tabular-nums transition-colors hover:text-ink-soft"
        >
          Continue Exploring &rarr;
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          const mainImg = product.media[0]
          return (
            <div
              key={product.id}
              className="glass glass-strong group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-ink/10 p-4 transition-all duration-300"
            >
              <div>
                {/* Media Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-surface">
                  {mainImg ? (
                    <Image
                      src={mainImg.src}
                      alt={mainImg.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : null}

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={`Remove ${product.name} from wishlist`}
                    className="glass absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-white hover:text-ink"
                  >
                    <Trash size={16} />
                  </button>
                </div>

                {/* Details */}
                <div className="mt-4">
                  <span className="text-[10px] text-ink-faint tabular-nums">
                    {product.subcategory}
                  </span>
                  <h3 className="mt-1 font-display text-base font-medium text-ink">
                    <Link href={routes.product(product.slug)} className="hover:underline">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-ink tabular-nums">
                    {formatMoney(product.price, MONEY)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-2">
                <Button size="sm" onClick={() => handleMoveToBag(product)} className="w-full">
                  <ShoppingBag size={14} className="mr-1.5" />
                  Move to Bag
                </Button>
                <div className="flex justify-center">
                  <TryOnTrigger
                    product={product}
                    source="wishlist"
                    label="Mirror Try"
                    className="text-xs"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
