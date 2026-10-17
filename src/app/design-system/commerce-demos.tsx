'use client'

import {
  ProductCard,
  CartLine,
  FilterPanel,
  FilterChips,
  ReviewSummary,
} from '@/components/commerce'
import { Price } from '@/components/ui'
import { TryOnTrigger } from '@/integration/mirror-try'
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
  slug: 'aurel-trench-slate',
  name: 'Aurel Refractive Trench',
  category: 'clothing',
  subcategory: 'outerwear',
  summary: 'Lightweight weather membrane with prismatic edge seal',
  description: 'Precision-tailored weather coat with refractive spectrum detailing.',
  details: [
    'Water-repellent technical silk',
    'Refractive heat-bonded seams',
    'Concealed front closure',
  ],
  materials: '100% Recycled Technical Polyamide',
  care: ['Dry clean only', 'Do not tumble dry'],
  price: 42000,
  compareAtPrice: 52000,
  media: [
    {
      src: '/images/placeholder.svg',
      alt: 'Aurel Trench Front',
      width: 600,
      height: 800,
    },
    {
      src: '/images/placeholder.svg',
      alt: 'Aurel Trench Back',
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
      options: { color: 'Slate', size: 'S' },
      stock: 12,
      price: 42000,
    },
  ],
  tags: ['coat', 'outerwear', 'light'],
  collectionSlugs: ['new-season'],
  badges: ['new', 'sale'],
  rating: { average: 4.9, count: 38 },
  featured: true,
  createdAt: '2026-01-01T00:00:00.000Z',
}

const soldOutProduct: Product = {
  ...demoProduct,
  id: 'prod-ds-2',
  slug: 'prism-silk-blouse',
  name: 'Prism Silk Blouse',
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
  options: { Color: 'Slate', Size: 'S' },
  quantity: 1,
  unitPrice: 42000,
  lineTotal: 42000,
}

export function CommerceDemos() {
  return (
    <div className="space-y-8">
      {/* Product Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium tracking-wider text-[var(--color-ink-soft)] uppercase">
          Product Card States (Standard, Sale, Out-of-Stock)
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <ProductCard
            product={demoProduct}
            href={`/products/${demoProduct.slug}`}
            money={money}
            saved={false}
            onToggleSaved={() => {}}
            labels={cardLabels}
            tryOnSlot={<TryOnTrigger product={demoProduct} source="plp" label="Try on" />}
          />
          <ProductCard
            product={soldOutProduct}
            href={`/products/${soldOutProduct.slug}`}
            money={money}
            saved={true}
            onToggleSaved={() => {}}
            labels={cardLabels}
          />
          <div className="glass flex flex-col justify-between rounded-2xl p-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-[var(--color-ink-faint)]">
                Price Formatting
              </span>
              <Price
                amount={42000}
                compareAt={52000}
                currency="USD"
                locale="en-US"
                labels={{ sale: 'Sale price', original: 'Original price' }}
              />
            </div>
            <div className="space-y-2 border-t border-[var(--color-line)] pt-4">
              <span className="font-mono text-xs text-[var(--color-ink-faint)]">
                Review Summary
              </span>
              <ReviewSummary
                rating={{ average: 4.9, count: 38 }}
                distribution={{ 1: 0, 2: 1, 3: 2, 4: 8, 5: 27 }}
                labels={{
                  heading: 'Customer Reviews',
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
      <div className="glass space-y-4 rounded-2xl p-6">
        <h3 className="text-sm font-medium tracking-wider text-[var(--color-ink-soft)] uppercase">
          Cart Line (Interactive Stepper & Removal)
        </h3>
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
      <div className="glass space-y-6 rounded-2xl p-6">
        <h3 className="text-sm font-medium tracking-wider text-[var(--color-ink-soft)] uppercase">
          Filter System & Active Chips
        </h3>
        <FilterChips
          chips={[
            { key: 'cat-coats', label: 'Category: Outerwear' },
            { key: 'size-m', label: 'Size: M' },
            { key: 'color-slate', label: 'Color: Slate' },
          ]}
          onRemove={() => {}}
          onClear={() => {}}
          clearLabel="Clear all filters"
        />
        <FilterPanel
          facets={{
            subcategories: [
              { slug: 'outerwear', count: 12 },
              { slug: 'knitwear', count: 8 },
              { slug: 'tailoring', count: 14 },
            ],
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            colors: [
              { value: 'Slate', swatch: '#475569' },
              { value: 'Sand', swatch: '#E2D9CC' },
              { value: 'Rose', swatch: '#FFDCE6' },
            ],
            priceRange: { min: 10000, max: 80000 },
          }}
          query={DEFAULT_QUERY}
          money={money}
          onChange={() => {}}
          onClear={() => {}}
          labels={{
            title: 'Refine Selection',
            subcategory: 'Subcategory',
            size: 'Size',
            colour: 'Colour',
            price: 'Price Range',
            onSale: 'Sale Items Only',
            minPrice: 'Minimum Price',
            maxPrice: 'Maximum Price',
            clear: 'Clear All',
          }}
        />
      </div>
    </div>
  )
}

export function MirrorTryDemo() {
  return (
    <div className="glass flex flex-wrap items-center gap-6 rounded-2xl p-6">
      <div className="space-y-2">
        <span className="font-mono text-xs text-[var(--color-ink-faint)] uppercase">
          Card Context
        </span>
        <div>
          <TryOnTrigger product={demoProduct} source="plp" label="Try on" />
        </div>
      </div>

      <div className="space-y-2">
        <span className="font-mono text-xs text-[var(--color-ink-faint)] uppercase">
          PDP Context
        </span>
        <div>
          <TryOnTrigger
            product={demoProduct}
            source="pdp"
            label="Virtual Fitting Room"
            className="px-6 py-3"
          />
        </div>
      </div>
    </div>
  )
}
