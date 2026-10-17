import { useId } from 'react'
import type { ReviewSummaryProps } from './contract'

const ROWS = [5, 4, 3, 2, 1] as const

export function ReviewSummary({ rating, distribution, labels }: ReviewSummaryProps) {
  const headingId = useId()
  const total = ROWS.reduce((sum, stars) => sum + distribution[stars], 0)
  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>{labels.heading}</h2>
      <p>{labels.outOf(rating.average)}</p>
      <p>{labels.count(rating.count)}</p>
      <ul>
        {ROWS.map((stars) => (
          <li key={stars}>
            {labels.stars(stars, distribution[stars])}
            <span aria-hidden="true" data-share={total === 0 ? 0 : distribution[stars] / total} />
          </li>
        ))}
      </ul>
    </section>
  )
}
