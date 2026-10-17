import type { ReactNode } from 'react'
import type { QuantityStepperProps } from '@/components/ui'
import type { Badge, Facets, Media, MoneyFormat, Product, ProductQuery } from '@/domain'
import type { QuoteLine } from '@/features/cart/quote'

/**
 * Props every store's commerce components accept, whatever they look like. Features built in
 * Phases 5 to 8 depend on these shapes, so a store may add props but never rename or remove them.
 * All copy arrives through `labels`; components never contain user-facing text.
 */

export interface ProductCardProps {
  product: Pick<
    Product,
    'id' | 'slug' | 'name' | 'media' | 'price' | 'compareAtPrice' | 'badges' | 'rating'
  >
  href: string
  money: MoneyFormat
  saved: boolean
  onToggleSaved: (productId: string) => void
  /** True for above-the-fold cards, so the image loads with priority. */
  priority?: boolean
  /** Slot for a Mirror Try trigger (or any other add-on). The card knows nothing about plugins. */
  tryOnSlot?: ReactNode
  labels: {
    sale: string
    original: string
    /** Constant label for the wishlist toggle; its state is exposed with aria-pressed. */
    save: string
    badges: Record<Badge, string>
  }
}

export interface CartLineProps {
  line: QuoteLine
  href: string
  money: MoneyFormat
  onQuantityChange: (variantId: string, quantity: number) => void
  onRemove: (variantId: string) => void
  labels: {
    quantity: QuantityStepperProps['labels']
    remove: string
    outOfStock: string
    limitedStock: string
  }
  /** Slot for extra actions, such as a Mirror Try link. */
  extra?: ReactNode
}

export interface FilterPanelProps {
  facets: Facets
  query: ProductQuery
  money: MoneyFormat
  onChange: (next: Partial<ProductQuery>) => void
  onClear: () => void
  labels: {
    title: string
    subcategory: string
    size: string
    colour: string
    price: string
    onSale: string
    minPrice: string
    maxPrice: string
    clear: string
  }
}

export interface GalleryProps {
  media: Media[]
  labels: {
    group: string
    previous: string
    next: string
    /** For example "Image 2 of 5". */
    position: (current: number, total: number) => string
  }
}

export interface ReviewSummaryProps {
  rating: Product['rating']
  distribution: Record<1 | 2 | 3 | 4 | 5, number>
  labels: {
    heading: string
    outOf: (average: number) => string
    count: (count: number) => string
    stars: (stars: number, count: number) => string
  }
}
