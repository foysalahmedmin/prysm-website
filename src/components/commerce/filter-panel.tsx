'use client'

import { useId } from 'react'
import { toMinor } from '@/domain'
import { cn } from '@/lib/cn'
import type { FilterPanelProps } from './contract'

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

export function FilterPanel({
  facets,
  query,
  money,
  onChange,
  onClear,
  labels,
  className,
}: FilterPanelProps & { className?: string }) {
  const id = useId()
  const major = (minor?: number) => (minor === undefined ? '' : String(minor / 100))
  const parse = (value: string) => (value === '' ? undefined : toMinor(Number(value)))

  return (
    <form
      aria-label={labels.title}
      onSubmit={(event) => event.preventDefault()}
      className={cn('glass glass-strong space-y-6 rounded-[24px] p-6', className)}
    >
      <div className="flex items-center justify-between border-b border-white/40 pb-2">
        <h3 className="font-display text-lg font-bold text-ink">{labels.title}</h3>
        <button
          type="button"
          onClick={onClear}
          className="font-mono text-xs font-medium text-ink-soft underline hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
        >
          {labels.clear}
        </button>
      </div>

      {facets.subcategories.length > 0 ? (
        <fieldset className="space-y-3">
          <legend className="font-text text-sm font-semibold text-ink">{labels.subcategory}</legend>
          <div className="space-y-2">
            {facets.subcategories.map((sub) => (
              <label
                key={sub.slug}
                className="flex cursor-pointer items-center gap-2.5 font-text text-sm text-ink-soft hover:text-ink"
              >
                <input
                  type="radio"
                  name={`${id}-sub`}
                  checked={query.subcategory === sub.slug}
                  onChange={() => onChange({ subcategory: sub.slug })}
                  className="h-4 w-4 rounded-full border-border-strong text-brand focus:ring-focus"
                />
                <span>
                  {sub.slug} <span className="font-mono text-xs text-ink-faint">({sub.count})</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <fieldset className="space-y-3">
        <legend className="font-text text-sm font-semibold text-ink">{labels.size}</legend>
        <div className="flex flex-wrap gap-2">
          {facets.sizes.map((size) => {
            const checked = query.sizes.includes(size)
            return (
              <label
                key={size}
                className={cn(
                  'glass flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-[12px] px-3 font-mono text-xs font-semibold transition-all',
                  checked ? 'bg-brand text-on-brand shadow-sm' : 'text-ink hover:border-ink/40',
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange({ sizes: toggle(query.sizes, size) })}
                  className="sr-only"
                />
                {size}
              </label>
            )
          })}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="font-text text-sm font-semibold text-ink">{labels.colour}</legend>
        <div className="flex flex-wrap gap-2">
          {facets.colors.map((color) => {
            const checked = query.colors.includes(color.value)
            return (
              <label
                key={color.value}
                className={cn(
                  'glass flex h-9 cursor-pointer items-center gap-2 rounded-full px-3 font-text text-xs font-medium transition-all',
                  checked ? 'bg-brand text-on-brand shadow-sm' : 'text-ink hover:border-ink/40',
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange({ colors: toggle(query.colors, color.value) })}
                  className="sr-only"
                />
                <span
                  className="h-3 w-3 rounded-full border border-black/10"
                  style={{ backgroundColor: color.swatch }}
                />
                {color.value}
              </label>
            )
          })}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="font-text text-sm font-semibold text-ink">
          {`${labels.price} (${money.currency})`}
        </legend>
        <div className="flex items-center gap-3">
          <label className="flex-1 font-text text-xs text-ink-soft">
            <span className="mb-1 block">{labels.minPrice}</span>
            <input
              type="number"
              min={0}
              value={major(query.minPrice)}
              onChange={(event) => onChange({ minPrice: parse(event.target.value) })}
              className="glass glass-strong h-10 w-full rounded-[12px] border border-border-strong px-3 font-mono text-xs text-ink focus:outline-2 focus:outline-focus"
            />
          </label>
          <span className="mt-5 text-ink-faint">—</span>
          <label className="flex-1 font-text text-xs text-ink-soft">
            <span className="mb-1 block">{labels.maxPrice}</span>
            <input
              type="number"
              min={0}
              value={major(query.maxPrice)}
              onChange={(event) => onChange({ maxPrice: parse(event.target.value) })}
              className="glass glass-strong h-10 w-full rounded-[12px] border border-border-strong px-3 font-mono text-xs text-ink focus:outline-2 focus:outline-focus"
            />
          </label>
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-center gap-2.5 pt-2 font-text text-sm font-medium text-ink">
        <input
          type="checkbox"
          checked={query.onSale}
          onChange={() => onChange({ onSale: !query.onSale })}
          className="h-4 w-4 rounded border-border-strong text-brand focus:ring-focus"
        />
        {labels.onSale}
      </label>
    </form>
  )
}
