'use client'

import { useId } from 'react'
import { toMinor } from '@/domain'
import type { FilterPanelProps } from './contract'

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

/** Native inputs: checkboxes, radios and number fields. Brands may restyle or swap them for switches and keys. */
export function FilterPanel({ facets, query, money, onChange, onClear, labels }: FilterPanelProps) {
  const id = useId()
  const major = (minor?: number) => (minor === undefined ? '' : String(minor / 100))
  const parse = (value: string) => (value === '' ? undefined : toMinor(Number(value)))

  return (
    <form aria-label={labels.title} onSubmit={(event) => event.preventDefault()}>
      <fieldset>
        <legend>{labels.subcategory}</legend>
        {facets.subcategories.map((sub) => (
          <label key={sub.slug}>
            <input
              type="radio"
              name={`${id}-sub`}
              checked={query.subcategory === sub.slug}
              onChange={() => onChange({ subcategory: sub.slug })}
            />
            {sub.slug} ({sub.count})
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>{labels.size}</legend>
        {facets.sizes.map((size) => (
          <label key={size}>
            <input
              type="checkbox"
              checked={query.sizes.includes(size)}
              onChange={() => onChange({ sizes: toggle(query.sizes, size) })}
            />
            {size}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>{labels.colour}</legend>
        {facets.colors.map((color) => (
          <label key={color.value}>
            <input
              type="checkbox"
              checked={query.colors.includes(color.value)}
              onChange={() => onChange({ colors: toggle(query.colors, color.value) })}
            />
            {color.value}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>{`${labels.price} (${money.currency})`}</legend>
        <label>
          {labels.minPrice}
          <input
            type="number"
            min={0}
            value={major(query.minPrice)}
            onChange={(event) => onChange({ minPrice: parse(event.target.value) })}
          />
        </label>
        <label>
          {labels.maxPrice}
          <input
            type="number"
            min={0}
            value={major(query.maxPrice)}
            onChange={(event) => onChange({ maxPrice: parse(event.target.value) })}
          />
        </label>
      </fieldset>
      <label>
        <input
          type="checkbox"
          checked={query.onSale}
          onChange={() => onChange({ onSale: !query.onSale })}
        />
        {labels.onSale}
      </label>
      <button type="button" onClick={onClear}>
        {labels.clear}
      </button>
    </form>
  )
}
