'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { ConnectedProductCard } from '@/components/commerce/connected-product-card'
import type { FilterPanelProps } from '@/components/commerce/contract'
import { FilterChips, type FilterChip } from '@/components/commerce/filter-chips'
import { FilterPanel } from '@/components/commerce/filter-panel'
import { ArrowLeft, ArrowRight, CaretDown, Faders } from '@/components/icons'
import { Button, Dialog } from '@/components/ui'
import type { Facets, Product, ProductQuery, SortKey } from '@/domain'
import { serializeProductQuery } from '@/features/catalog/query-params'
import { cn } from '@/lib/cn'
import { Reveal } from '@/lib/motion'

const defaultFilterLabels: FilterPanelProps['labels'] = {
  title: 'Filters',
  subcategory: 'Category',
  size: 'Size',
  colour: 'Colour',
  price: 'Price',
  onSale: 'On sale only',
  minPrice: 'Min price',
  maxPrice: 'Max price',
  clear: 'Clear all',
}

const defaultMoney = { currency: 'USD', locale: 'en-US' } as const

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
]

interface ProductListViewProps {
  products: Product[]
  total: number
  facets: Facets
  query: ProductQuery
  title: string
  description?: string
  basePath: string
}

export function ProductListView({
  products,
  total,
  facets,
  query,
  title,
  description,
  basePath,
}: ProductListViewProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [layout, setLayout] = useState<'sidebar' | 'drawer'>('sidebar')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const navigateWith = (partial: Partial<ProductQuery>) => {
    const next: ProductQuery = {
      ...query,
      ...partial,
      // Reset to page 1 on filter/sort changes if page not explicitly provided
      page: partial.page ?? (partial.sort ? query.page : 1),
    }
    const queryString = serializeProductQuery(next)
    startTransition(() => {
      router.push(queryString ? `${basePath}?${queryString}` : basePath, { scroll: false })
    })
  }

  // Build active filter chips
  const chips: FilterChip[] = []
  if (query.subcategory) {
    chips.push({ key: 'subcategory', label: query.subcategory.replace(/-/g, ' ') })
  }
  query.sizes?.forEach((s) => chips.push({ key: `size:${s}`, label: `Size ${s}` }))
  query.colors?.forEach((c) => chips.push({ key: `color:${c}`, label: c }))
  if (query.minPrice !== undefined) {
    chips.push({ key: 'minPrice', label: `From $${query.minPrice / 100}` })
  }
  if (query.maxPrice !== undefined) {
    chips.push({ key: 'maxPrice', label: `Up to $${query.maxPrice / 100}` })
  }
  if (query.onSale) chips.push({ key: 'onSale', label: 'On sale' })

  const handleRemoveChip = (key: string) => {
    if (key === 'subcategory') navigateWith({ subcategory: undefined })
    else if (key.startsWith('size:')) {
      const s = key.replace('size:', '')
      navigateWith({ sizes: query.sizes?.filter((item) => item !== s) })
    } else if (key.startsWith('color:')) {
      const c = key.replace('color:', '')
      navigateWith({ colors: query.colors?.filter((item) => item !== c) })
    } else if (key === 'minPrice') navigateWith({ minPrice: undefined })
    else if (key === 'maxPrice') navigateWith({ maxPrice: undefined })
    else if (key === 'onSale') navigateWith({ onSale: false })
  }

  const handleClearAll = () => {
    navigateWith({
      subcategory: undefined,
      sizes: [],
      colors: [],
      minPrice: undefined,
      maxPrice: undefined,
      onSale: false,
    })
  }

  const totalPages = Math.ceil(total / query.pageSize)
  const sidebar = layout === 'sidebar'

  return (
    <div className="page-container pt-10 pb-20 md:pt-14">
      <header className="flex flex-col gap-3 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
              {description}
            </p>
          ) : null}
        </div>
        <p className="text-sm text-ink-soft tabular-nums">
          {total} {total === 1 ? 'piece' : 'pieces'}
        </p>
      </header>

      {/* Toolbar */}
      <div className="sticky top-16 z-30 -mx-4 flex items-center justify-between gap-3 border-y border-ink/10 bg-canvas/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setDrawerOpen(true)}
            className={cn('h-10 gap-2 px-4', sidebar && 'lg:hidden')}
          >
            <Faders size={16} aria-hidden="true" />
            Filters{chips.length > 0 ? ` (${chips.length})` : ''}
          </Button>
          <div
            role="group"
            aria-label="Filter layout"
            className="hidden items-center rounded-md border border-ink/15 p-0.5 text-sm lg:flex"
          >
            {(['sidebar', 'drawer'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                aria-pressed={layout === mode}
                onClick={() => setLayout(mode)}
                className={cn(
                  'h-9 rounded-sm px-3.5 capitalize transition-colors focus-visible:outline-2 focus-visible:outline-focus',
                  layout === mode ? 'bg-ink text-on-brand' : 'text-ink-soft hover:text-ink',
                )}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <label htmlFor="sort-select" className="sr-only">
            Sort by
          </label>
          <select
            id="sort-select"
            value={query.sort}
            onChange={(e) => navigateWith({ sort: e.target.value as SortKey })}
            className="h-10 cursor-pointer appearance-none rounded-md border border-ink/15 bg-surface pr-9 pl-4 text-sm text-ink focus-visible:outline-2 focus-visible:outline-focus"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <CaretDown
            size={14}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-ink-soft"
          />
        </div>
      </div>

      {chips.length > 0 ? (
        <FilterChips
          chips={chips}
          onRemove={handleRemoveChip}
          onClear={handleClearAll}
          clearLabel="Clear all filters"
          className="pt-5"
        />
      ) : null}

      <div
        className={cn(
          'grid grid-cols-1 items-start gap-x-10 gap-y-8 pt-8',
          sidebar && 'lg:grid-cols-[17rem_1fr]',
        )}
      >
        {sidebar ? (
          <aside className="sticky top-36 hidden max-h-[calc(100vh-10rem)] overflow-y-auto pr-1 lg:block">
            <FilterPanel
              facets={facets}
              query={query}
              money={defaultMoney}
              onChange={(next) => navigateWith(next)}
              onClear={handleClearAll}
              labels={defaultFilterLabels}
            />
          </aside>
        ) : null}

        <div className={cn('transition-opacity duration-200', isPending && 'opacity-60')}>
          {products.length === 0 ? (
            <div className="rounded-md border border-ink/10 bg-surface px-6 py-16 text-center">
              <h2 className="font-display text-xl font-medium text-ink">
                Nothing matches those filters
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
                Widen the price range or remove a size or colour to see more pieces.
              </p>
              <Button variant="secondary" size="md" onClick={handleClearAll} className="mt-6">
                Clear all filters
              </Button>
            </div>
          ) : (
            <ul
              className={cn(
                'grid grid-cols-2 gap-x-3 gap-y-6 md:gap-x-5 md:gap-y-8',
                sidebar ? 'md:grid-cols-3' : 'md:grid-cols-3 xl:grid-cols-4',
              )}
            >
              {products.map((product, idx) => (
                <Reveal as="li" key={product.id} delay={(idx % 4) * 70} className="flex">
                  <ConnectedProductCard product={product} priority={idx < 4} className="w-full" />
                </Reveal>
              ))}
            </ul>
          )}

          {totalPages > 1 ? (
            <nav aria-label="Pagination" className="flex items-center justify-center gap-5 pt-14">
              <Button
                variant="secondary"
                size="sm"
                disabled={query.page <= 1}
                onClick={() => navigateWith({ page: query.page - 1 })}
              >
                <ArrowLeft size={14} aria-hidden="true" />
                <span>Previous</span>
              </Button>
              <span className="text-sm text-ink-soft tabular-nums">
                Page {query.page} of {totalPages}
              </span>
              <Button
                variant="secondary"
                size="sm"
                disabled={query.page >= totalPages}
                onClick={() => navigateWith({ page: query.page + 1 })}
              >
                <span>Next</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Button>
            </nav>
          ) : null}
        </div>
      </div>

      <Dialog
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title="Filters"
        closeLabel="Close filters"
        side="right"
        className="flex flex-col overflow-hidden"
      >
        <div className="-mx-1 flex-1 overflow-y-auto px-1 pb-4">
          <FilterPanel
            embedded
            facets={facets}
            query={query}
            money={defaultMoney}
            onChange={(next) => navigateWith(next)}
            onClear={handleClearAll}
            labels={defaultFilterLabels}
          />
        </div>
        <div className="border-t border-ink/10 pt-4">
          <Button className="w-full" onClick={() => setDrawerOpen(false)}>
            Show {total} {total === 1 ? 'piece' : 'pieces'}
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
