'use client'

import { X } from '@/components/icons'
import { cn } from '@/lib/cn'

export interface FilterChip {
  key: string
  label: string
}

export interface FilterChipsProps {
  chips: FilterChip[]
  onRemove: (key: string) => void
  onClear: () => void
  clearLabel: string
  className?: string
}

export function FilterChips({ chips, onRemove, onClear, clearLabel, className }: FilterChipsProps) {
  if (chips.length === 0) return null

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="glass glass-strong inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-medium text-ink shadow-sm"
        >
          <span>{chip.label}</span>
          <button
            type="button"
            aria-label={`Remove filter: ${chip.label}`}
            onClick={() => onRemove(chip.key)}
            className="inline-flex h-4 w-4 items-center justify-center rounded-full text-ink-soft transition hover:bg-ink/10 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="ml-2 font-mono text-xs font-medium text-ink-soft underline transition hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
      >
        {clearLabel}
      </button>
    </div>
  )
}
