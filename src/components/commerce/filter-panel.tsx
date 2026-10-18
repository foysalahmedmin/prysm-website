'use client'

import { useId, useState, type ReactNode } from 'react'
import { CaretDown } from '@/components/icons'
import { toMinor } from '@/domain'
import { cn } from '@/lib/cn'
import type { FilterPanelProps } from './contract'

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

const SWATCHES_SHOWN = 14

/** One collapsible group. The legend carries the group name; the button inside it folds the group. */
function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const bodyId = useId()
  return (
    <fieldset className="border-t border-ink/10 py-4 first:border-t-0 first:pt-0">
      <legend className="float-left w-full">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between py-0.5 text-left text-sm font-medium text-ink focus-visible:outline-2 focus-visible:outline-focus"
        >
          {title}
          <CaretDown
            size={14}
            aria-hidden="true"
            className={cn('text-ink-soft transition-transform duration-300', open && 'rotate-180')}
          />
        </button>
      </legend>
      <div id={bodyId} hidden={!open} className="clear-both pt-3">
        {children}
      </div>
    </fieldset>
  )
}

/** Two thumbs on one track. Dragging is local; the filter is applied when the thumb is let go. */
function PriceSlider({
  min,
  max,
  low,
  high,
  labels,
  onCommit,
}: {
  min: number
  max: number
  low: number
  high: number
  labels: { min: string; max: string }
  onCommit: (low: number, high: number) => void
}) {
  const [range, setRange] = useState<[number, number]>([low, high])
  const span = Math.max(1, max - min)
  const left = ((range[0] - min) / span) * 100
  const right = ((range[1] - min) / span) * 100
  const commit = () => onCommit(range[0], range[1])

  return (
    <div className="px-1 pt-1 pb-5">
      <div className="relative h-5">
        <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-ink/20" />
        <div
          className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-ink"
          style={{ left: `${left}%`, width: `${Math.max(0, right - left)}%` }}
        />
        <input
          type="range"
          aria-label={labels.min}
          min={min}
          max={max}
          step={10}
          value={range[0]}
          onChange={(event) =>
            setRange([Math.min(Number(event.target.value), range[1] - 10), range[1]])
          }
          onPointerUp={commit}
          onKeyUp={commit}
          className="range-thumb"
        />
        <input
          type="range"
          aria-label={labels.max}
          min={min}
          max={max}
          step={10}
          value={range[1]}
          onChange={(event) =>
            setRange([range[0], Math.max(Number(event.target.value), range[0] + 10)])
          }
          onPointerUp={commit}
          onKeyUp={commit}
          className="range-thumb"
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-ink-soft tabular-nums">
        <span>{range[0]}</span>
        <span>{range[1]}</span>
      </div>
    </div>
  )
}

export function FilterPanel({
  facets,
  query,
  money,
  onChange,
  onClear,
  labels,
  className,
  embedded = false,
}: FilterPanelProps & { className?: string; embedded?: boolean }) {
  const id = useId()
  const [allColours, setAllColours] = useState(false)
  const major = (minor?: number) => (minor === undefined ? '' : String(minor / 100))
  const parse = (value: string) => (value === '' ? undefined : toMinor(Number(value)))

  const floor = Math.floor(facets.priceRange.min / 100 / 10) * 10
  const ceil = Math.ceil(facets.priceRange.max / 100 / 10) * 10
  const low = Math.min(
    Math.max(query.minPrice !== undefined ? query.minPrice / 100 : floor, floor),
    ceil,
  )
  const high = Math.max(
    Math.min(query.maxPrice !== undefined ? query.maxPrice / 100 : ceil, ceil),
    floor,
  )
  const colours = allColours ? facets.colors : facets.colors.slice(0, SWATCHES_SHOWN)

  return (
    <form
      aria-label={labels.title}
      onSubmit={(event) => event.preventDefault()}
      className={cn(!embedded && 'rounded-md border border-ink/10 bg-surface p-5', className)}
    >
      <div className={cn('flex items-center justify-between pb-4', embedded && 'justify-end')}>
        {embedded ? null : <h2 className="text-base font-medium text-ink">{labels.title}</h2>}
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-ink-soft underline underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
        >
          {labels.clear}
        </button>
      </div>

      {facets.subcategories.length > 0 ? (
        <Section title={labels.subcategory}>
          <div className="space-y-1">
            {facets.subcategories.map((sub) => {
              const checked = query.subcategory === sub.slug
              return (
                <label
                  key={sub.slug}
                  className={cn(
                    'flex cursor-pointer items-center justify-between py-1 text-sm capitalize transition-colors',
                    checked ? 'font-medium text-ink' : 'text-ink-soft hover:text-ink',
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name={`${id}-sub`}
                      checked={checked}
                      onChange={() => onChange({ subcategory: sub.slug })}
                      className="h-3.5 w-3.5 accent-ink"
                    />
                    {sub.slug.replace(/-/g, ' ')}
                  </span>
                  <span className="text-xs text-ink-faint tabular-nums">{sub.count}</span>
                </label>
              )
            })}
          </div>
        </Section>
      ) : null}

      <Section title={labels.size}>
        <div className="flex flex-wrap gap-1.5">
          {facets.sizes.map((size) => {
            const checked = query.sizes.includes(size)
            return (
              <label
                key={size}
                className={cn(
                  'flex h-9 min-w-11 cursor-pointer items-center justify-center rounded-sm border px-2.5 text-xs transition-colors has-focus-visible:outline-2 has-focus-visible:outline-focus',
                  checked
                    ? 'border-ink bg-ink text-on-brand'
                    : 'border-ink/20 text-ink hover:border-ink',
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
      </Section>

      <Section title={labels.colour}>
        <div className="flex flex-wrap gap-2">
          {colours.map((color) => {
            const checked = query.colors.includes(color.value)
            return (
              <label
                key={color.value}
                title={color.value}
                className={cn(
                  'relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-[50%] border transition-all has-focus-visible:outline-2 has-focus-visible:outline-focus',
                  checked ? 'border-ink ring-1 ring-ink ring-offset-2' : 'border-ink/20',
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange({ colors: toggle(query.colors, color.value) })}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className="h-full w-full rounded-[50%]"
                  style={{ backgroundColor: color.swatch ?? '#cfcfd2' }}
                />
                <span className="sr-only">{color.value}</span>
              </label>
            )
          })}
        </div>
        {facets.colors.length > SWATCHES_SHOWN ? (
          <button
            type="button"
            onClick={() => setAllColours((value) => !value)}
            className="mt-3 text-xs text-ink-soft underline underline-offset-4 hover:text-ink"
          >
            {allColours ? 'Show fewer' : `Show all ${facets.colors.length}`}
          </button>
        ) : null}
      </Section>

      <Section title={`${labels.price} (${money.currency})`}>
        <PriceSlider
          key={`${low}-${high}`}
          min={floor}
          max={ceil}
          low={low}
          high={high}
          labels={{ min: `${labels.minPrice} slider`, max: `${labels.maxPrice} slider` }}
          onCommit={(nextLow, nextHigh) =>
            onChange({
              minPrice: nextLow <= floor ? undefined : toMinor(nextLow),
              maxPrice: nextHigh >= ceil ? undefined : toMinor(nextHigh),
            })
          }
        />
        <div className="flex items-center gap-3">
          <label className="flex-1 text-xs text-ink-soft">
            <span className="mb-1 block">{labels.minPrice}</span>
            <input
              type="number"
              min={0}
              value={major(query.minPrice)}
              onChange={(event) => onChange({ minPrice: parse(event.target.value) })}
              className="h-10 w-full rounded-sm border border-ink/20 bg-surface px-3 text-sm text-ink tabular-nums focus:outline-2 focus:outline-focus"
            />
          </label>
          <span className="mt-5 text-ink-faint">–</span>
          <label className="flex-1 text-xs text-ink-soft">
            <span className="mb-1 block">{labels.maxPrice}</span>
            <input
              type="number"
              min={0}
              value={major(query.maxPrice)}
              onChange={(event) => onChange({ maxPrice: parse(event.target.value) })}
              className="h-10 w-full rounded-sm border border-ink/20 bg-surface px-3 text-sm text-ink tabular-nums focus:outline-2 focus:outline-focus"
            />
          </label>
        </div>
      </Section>

      <div className="border-t border-ink/10 pt-4">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
          <input
            type="checkbox"
            checked={query.onSale}
            onChange={() => onChange({ onSale: !query.onSale })}
            className="h-4 w-4 accent-ink"
          />
          {labels.onSale}
        </label>
      </div>
    </form>
  )
}
