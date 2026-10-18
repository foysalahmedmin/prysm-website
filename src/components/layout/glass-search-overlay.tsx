'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { MagnifyingGlass, X } from '@/components/icons'
import type { Product } from '@/domain'
import { searchProductsAction } from '@/features/catalog/actions'
import { useUiStore } from '@/stores/ui-store'

export function GlassSearchOverlay() {
  const open = useUiStore((s) => s.open === 'search')
  const closePanel = useUiStore((s) => s.closePanel)
  const recentSearches = useUiStore((s) => s.recentSearches)
  const addRecentSearch = useUiStore((s) => s.addRecentSearch)
  const clearRecentSearches = useUiStore((s) => s.clearRecentSearches)

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClose = () => {
    setQuery('')
    closePanel()
  }

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  useEffect(() => {
    const trimmed = query.trim()
    if (!trimmed) return

    let cancelled = false
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const items = await searchProductsAction(trimmed)
        if (!cancelled) {
          setResults(items)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }, 200)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [query])

  if (!open) return null

  const displayedResults = query.trim() ? results : []
  const isSearching = query.trim() ? loading : false

  const handleSelectProduct = (product: Product) => {
    addRecentSearch(product.name)
    handleClose()
  }

  const handleSelectRecent = (term: string) => {
    setQuery(term)
    addRecentSearch(term)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search catalog"
      className="animate-in fade-in fixed inset-0 z-50 flex items-start justify-center bg-ink/25 px-4 pt-20 backdrop-blur-md duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div className="glass-strong animate-in zoom-in-95 w-full max-w-2xl rounded-3xl border border-white/80 p-6 duration-150">
        <div className="flex items-center gap-3 border-b border-white/40 pb-4">
          <MagnifyingGlass size={22} className="shrink-0 text-ink-soft" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search eyewear, apparel, collections..."
            aria-label="Search products"
            className="w-full bg-transparent font-text text-base text-ink placeholder:text-ink-faint focus:outline-none md:text-lg"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search text"
              className="rounded-md p-1 text-ink-faint transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close search"
            className="glass rounded-md p-1.5 text-ink transition-colors hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-focus"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content area: Recent Searches or Results */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1">
          {query.trim() === '' ? (
            <div>
              {recentSearches.length > 0 && (
                <div className="py-2">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-ink-faint tabular-nums">Recent Searches</span>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-xs text-ink-faint tabular-nums transition-colors hover:text-ink"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => handleSelectRecent(term)}
                        className="glass rounded-md px-3.5 py-1.5 text-xs font-medium text-ink transition-all hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-focus"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : isSearching ? (
            <div className="animate-pulse py-12 text-center text-xs text-ink-faint tabular-nums">
              Searching the light spectrum...
            </div>
          ) : displayedResults.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-text text-sm text-ink-soft">
                No products found matching &ldquo;{query}&rdquo;
              </p>
              <p className="mt-1 text-xs text-ink-faint tabular-nums">
                Try another term or browse our collections
              </p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-white/40">
              {displayedResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={() => handleSelectProduct(product)}
                  className="flex items-center gap-4 rounded-2xl px-2 py-3 transition-colors hover:bg-white/40 focus-visible:outline-2 focus-visible:outline-focus"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white/50">
                    {product.media[0] && (
                      <Image
                        src={product.media[0].src}
                        alt={product.media[0].alt}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-text text-sm font-medium text-ink">
                      {product.name}
                    </div>
                    <div className="text-xs text-ink-faint capitalize tabular-nums">
                      {product.category} · {product.subcategory}
                    </div>
                  </div>
                  <div className="shrink-0 text-xs font-medium text-ink tabular-nums">
                    ${(product.price / 100).toFixed(2)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
