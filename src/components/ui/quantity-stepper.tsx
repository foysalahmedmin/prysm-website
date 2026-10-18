'use client'

import { cn } from '@/lib/cn'

export interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  labels: { group: string; decrease: string; increase: string }
  className?: string
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  labels,
  className,
}: QuantityStepperProps) {
  const set = (next: number) => onChange(Math.min(max, Math.max(min, next)))
  return (
    <div
      role="group"
      aria-label={labels.group}
      className={cn('glass inline-flex h-11 items-center gap-2 rounded-md px-2', className)}
    >
      <button
        type="button"
        aria-label={labels.decrease}
        disabled={value <= min}
        onClick={() => set(value - 1)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-ink transition hover:bg-ink/10 focus-visible:outline-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-30"
      >
        −
      </button>
      <output
        aria-live="polite"
        className="min-w-6 text-center text-sm font-medium text-ink tabular-nums"
      >
        {value}
      </output>
      <button
        type="button"
        aria-label={labels.increase}
        disabled={value >= max}
        onClick={() => set(value + 1)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-ink transition hover:bg-ink/10 focus-visible:outline-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-30"
      >
        +
      </button>
    </div>
  )
}
