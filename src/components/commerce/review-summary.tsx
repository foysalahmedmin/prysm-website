import { useId } from 'react'
import { cn } from '@/lib/cn'
import type { ReviewSummaryProps } from './contract'

const ROWS = [5, 4, 3, 2, 1] as const

export function ReviewSummary({
  rating,
  distribution,
  labels,
  className,
}: ReviewSummaryProps & { className?: string }) {
  const headingId = useId()
  const total = ROWS.reduce((sum, stars) => sum + distribution[stars], 0)
  return (
    <section
      aria-labelledby={headingId}
      className={cn('glass glass-strong space-y-5 rounded-[24px] p-6', className)}
    >
      <h2 id={headingId} className="font-display text-lg font-bold text-ink">
        {labels.heading}
      </h2>
      <div className="flex items-baseline gap-3">
        <p className="font-display text-4xl font-extrabold text-ink">
          {labels.outOf(rating.average)}
        </p>
        <p className="font-mono text-xs text-ink-faint">{labels.count(rating.count)}</p>
      </div>

      <ul className="space-y-2.5 pt-2">
        {ROWS.map((stars) => {
          const share = total === 0 ? 0 : distribution[stars] / total
          return (
            <li key={stars} className="flex items-center gap-3 font-mono text-xs text-ink-soft">
              <span className="w-24 shrink-0">{labels.stars(stars, distribution[stars])}</span>
              <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/60">
                <span
                  aria-hidden="true"
                  data-share={share}
                  className="spectrum-line absolute inset-y-0 left-0"
                  style={{ width: `${Math.round(share * 100)}%` }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
