'use client'

import {
  ProductCard,
  CartLine,
  FilterPanel,
  FilterChips,
  ReviewSummary,
} from '@/components/commerce'
import { Button, Price } from '@/components/ui'
import { OpenMirrorTry, TryOnTrigger } from '@/integration/mirror-try'
import type { Product } from '@/domain'
import { DEFAULT_QUERY } from '@/domain'
import type { QuoteLine } from '@/features/cart/quote'

const money = { currency: 'USD', locale: 'en-US' } as const

const cardLabels = {
  sale: 'Sale price',
  original: 'Original price',
  save: 'Save to wishlist',
  badges: { new: 'New', bestseller: 'Bestseller', limited: 'Limited', sale: 'Sale' },
}

const demoProduct: Product = {
  id: 'prod-ds-1',
  slug: 'spectral-silk-button-down',
  name: 'Spectral Silk Button-Down',
  category: 'clothing',
  subcategory: 'tops',
  summary: 'Compact silk shirt with taped seams and a concealed placket',
  description: 'A compact silk shirt, lined in cupro and finished with taped seams.',
  details: ['Compact mulberry silk', 'Taped seams', 'Concealed placket'],
  materials: '100% mulberry silk',
  care: ['Dry clean only', 'Do not tumble dry'],
  price: 42000,
  compareAtPrice: 52000,
  media: [
    {
      src: '/images/products/spectral-silk-button-down-1.webp',
      alt: 'Spectral Silk Button-Down, front',
      width: 600,
      height: 800,
    },
    {
      src: '/images/products/spectral-silk-button-down-2.webp',
      alt: 'Spectral Silk Button-Down, back',
      width: 600,
      height: 800,
    },
  ],
  optionGroups: [
    {
      key: 'size',
      label: 'Size',
      kind: 'size',
      values: [{ value: 'S' }, { value: 'M' }],
    },
  ],
  variants: [
    {
      id: 'v1',
      sku: 'PRY-AUR-SL-S',
      options: { color: 'Ink', size: 'S' },
      stock: 12,
      price: 42000,
    },
  ],
  tags: ['shirt', 'tops', 'silk'],
  collectionSlugs: ['new-season'],
  badges: ['new', 'sale'],
  rating: { average: 4.9, count: 38 },
  featured: true,
  createdAt: '2026-01-01T00:00:00.000Z',
}

const soldOutProduct: Product = {
  ...demoProduct,
  media: [
    {
      src: '/images/products/prismatic-poplin-shirt-1.webp',
      alt: 'Prismatic Poplin Shirt, front',
      width: 600,
      height: 800,
    },
  ],
  id: 'prod-ds-2',
  slug: 'prismatic-poplin-shirt',
  name: 'Prismatic Poplin Shirt',
  price: 28000,
  compareAtPrice: undefined,
  badges: [],
  variants: [
    {
      id: 'v3',
      sku: 'PRY-OPL-S',
      options: { color: 'Opal', size: 'S' },
      stock: 0,
      price: 28000,
    },
  ],
}

const sampleQuoteLine: QuoteLine = {
  productId: demoProduct.id,
  variantId: 'v1',
  slug: demoProduct.slug,
  category: demoProduct.category,
  subcategory: demoProduct.subcategory,
  name: demoProduct.name,
  image: demoProduct.media[0]!,
  options: { Color: 'Ink', Size: 'S' },
  quantity: 1,
  unitPrice: 42000,
  lineTotal: 42000,
}

export function CommerceDemos() {
  return (
    <div className="space-y-8">
      {/* Product Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink-soft">Product card: sale, saved and plain</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <ProductCard
            product={demoProduct}
            href={`/products/${demoProduct.slug}`}
            money={money}
            saved={false}
            onToggleSaved={() => {}}
            labels={cardLabels}
            tryOnSlot={<TryOnTrigger product={demoProduct} />}
          />
          <ProductCard
            product={soldOutProduct}
            href={`/products/${soldOutProduct.slug}`}
            money={money}
            saved={true}
            onToggleSaved={() => {}}
            labels={cardLabels}
          />
          <div className="flex flex-col justify-between border border-ink/10 bg-surface p-6">
            <div className="space-y-2">
              <span className="block text-xs text-ink-soft">Price</span>
              <Price
                amount={42000}
                compareAt={52000}
                currency="USD"
                locale="en-US"
                labels={{ sale: 'Sale price', original: 'Original price' }}
              />
            </div>
            <div className="space-y-2 border-t border-ink/10 pt-4">
              <span className="text-xs text-ink-soft">Review summary</span>
              <ReviewSummary
                rating={{ average: 4.9, count: 38 }}
                distribution={{ 1: 0, 2: 1, 3: 2, 4: 8, 5: 27 }}
                labels={{
                  heading: 'Customer reviews',
                  outOf: (avg) => `${avg} out of 5`,
                  count: (cnt) => `${cnt} reviews`,
                  stars: (s, c) => `${s} stars: ${c} reviews`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cart Line */}
      <div className="space-y-4 border border-ink/10 bg-surface p-6">
        <h3 className="text-sm font-medium text-ink-soft">Cart line</h3>
        <ul role="list">
          <CartLine
            line={sampleQuoteLine}
            href={`/products/${demoProduct.slug}`}
            money={money}
            onQuantityChange={() => {}}
            onRemove={() => {}}
            labels={{
              quantity: {
                group: 'Quantity',
                decrease: 'Decrease quantity',
                increase: 'Increase quantity',
              },
              remove: 'Remove item',
              outOfStock: 'Out of stock',
              limitedStock: 'Only 2 items left',
            }}
          />
        </ul>
      </div>

      {/* Filter Panel & Chips */}
      <div className="space-y-6 border border-ink/10 bg-surface p-6">
        <h3 className="text-sm font-medium text-ink-soft">Filters and active chips</h3>
        <FilterChips
          chips={[
            { key: 'cat-tops', label: 'Category: tops' },
            { key: 'size-m', label: 'Size M' },
            { key: 'color-ink', label: 'Colour: ink' },
          ]}
          onRemove={() => {}}
          onClear={() => {}}
          clearLabel="Clear all filters"
        />
        <FilterPanel
          facets={{
            subcategories: [
              { slug: 'tops', count: 9 },
              { slug: 'knitwear', count: 5 },
              { slug: 'outerwear', count: 7 },
            ],
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            colors: [
              { value: 'Ink', swatch: '#0a0a0b' },
              { value: 'Stone', swatch: '#c9c9cc' },
              { value: 'Prism violet', swatch: '#5b4b8a' },
            ],
            priceRange: { min: 10000, max: 80000 },
          }}
          query={DEFAULT_QUERY}
          money={money}
          onChange={() => {}}
          onClear={() => {}}
          labels={{
            title: 'Filters',
            subcategory: 'Category',
            size: 'Size',
            colour: 'Colour',
            price: 'Price',
            onSale: 'On sale only',
            minPrice: 'Min price',
            maxPrice: 'Max price',
            clear: 'Clear all',
          }}
        />
      </div>
    </div>
  )
}

export function MirrorTryDemo() {
  return (
    <div className="flex flex-wrap items-end gap-8 border border-ink/10 bg-surface p-6">
      <div className="space-y-2">
        <span className="block text-xs text-ink-soft">On a product card</span>
        <TryOnTrigger product={demoProduct} />
      </div>
      <div className="space-y-2">
        <span className="block text-xs text-ink-soft">On a product page</span>
        <TryOnTrigger product={demoProduct} size="md" />
      </div>
      <div className="space-y-2">
        <span className="block text-xs text-ink-soft">From store copy, no product</span>
        <Button asChild variant="secondary">
          <OpenMirrorTry>Open Mirror Try</OpenMirrorTry>
        </Button>
      </div>
    </div>
  )
}
