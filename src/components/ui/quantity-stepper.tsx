'use client'

export interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  labels: { group: string; decrease: string; increase: string }
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  labels,
}: QuantityStepperProps) {
  const set = (next: number) => onChange(Math.min(max, Math.max(min, next)))
  return (
    <div role="group" aria-label={labels.group}>
      <button
        type="button"
        aria-label={labels.decrease}
        disabled={value <= min}
        onClick={() => set(value - 1)}
      >
        −
      </button>
      <output aria-live="polite">{value}</output>
      <button
        type="button"
        aria-label={labels.increase}
        disabled={value >= max}
        onClick={() => set(value + 1)}
      >
        +
      </button>
    </div>
  )
}
