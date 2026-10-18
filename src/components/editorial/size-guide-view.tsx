'use client'

import { useId, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from '@/components/icons'
import { Button } from '@/components/ui'
import { routes } from '@/config/routes'

type Unit = 'cm' | 'in'

interface SizeRow {
  size: string
  chestCm: [number, number]
  waistCm: [number, number]
  hipsCm: [number, number]
  sleeveCm: [number, number]
}

const SIZE_CHART: SizeRow[] = [
  { size: 'XS', chestCm: [86, 91], waistCm: [71, 76], hipsCm: [86, 91], sleeveCm: [81, 83] },
  { size: 'S', chestCm: [91, 96], waistCm: [76, 81], hipsCm: [91, 96], sleeveCm: [83, 85] },
  { size: 'M', chestCm: [96, 102], waistCm: [81, 86], hipsCm: [96, 102], sleeveCm: [85, 87] },
  { size: 'L', chestCm: [102, 108], waistCm: [86, 92], hipsCm: [102, 108], sleeveCm: [87, 89] },
  { size: 'XL', chestCm: [108, 114], waistCm: [92, 98], hipsCm: [108, 114], sleeveCm: [89, 91] },
  { size: 'XXL', chestCm: [114, 120], waistCm: [98, 104], hipsCm: [114, 120], sleeveCm: [91, 93] },
]

function formatRange(range: [number, number], unit: Unit): string {
  if (unit === 'cm') {
    return `${range[0]} – ${range[1]} cm`
  }
  const minIn = (range[0] / 2.54).toFixed(1)
  const maxIn = (range[1] / 2.54).toFixed(1)
  return `${minIn} – ${maxIn} in`
}

export function SizeGuideView() {
  const [unit, setUnit] = useState<Unit>('cm')

  // Interactive Size Finder state
  const [chestInput, setChestInput] = useState<number>(98)
  const [waistInput, setWaistInput] = useState<number>(83)
  const [hipsInput, setHipsInput] = useState<number>(99)
  const [fitPreference, setFitPreference] = useState<'fitted' | 'regular' | 'relaxed'>('regular')

  const chestId = useId()
  const waistId = useId()
  const hipsId = useId()

  // Convert inputs to cm for calculation if needed
  const recommendedSize = useMemo(() => {
    const chest = unit === 'cm' ? chestInput : chestInput * 2.54
    const waist = unit === 'cm' ? waistInput : waistInput * 2.54

    // Adjust for fit preference and prominent waist
    const adjustedChest =
      fitPreference === 'fitted' ? chest + 2 : fitPreference === 'relaxed' ? chest - 2 : chest
    const effectiveMetric = Math.max(adjustedChest, waist * 1.1)

    for (const row of SIZE_CHART) {
      if (effectiveMetric >= row.chestCm[0] && effectiveMetric <= row.chestCm[1]) {
        return row.size
      }
    }

    if (adjustedChest < SIZE_CHART[0].chestCm[0]) return 'XS'
    if (adjustedChest > SIZE_CHART[SIZE_CHART.length - 1].chestCm[1]) return 'XXL'
    return 'M'
  }, [chestInput, waistInput, fitPreference, unit])

  return (
    <div className="page-container py-10 md:py-14">
      {/* Header */}
      <div className="mb-10 max-w-2xl md:mb-14">
        <h1 className="font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
          Size guide
        </h1>
        <p className="mt-4 font-text text-base text-ink-soft md:text-lg">
          Check the charts below, or enter your measurements to get a suggested size.
        </p>

        {/* Unit Selector */}
        <div className="mt-8 inline-flex items-center rounded-md border border-ink/10 bg-surface p-1">
          <button
            onClick={() => setUnit('cm')}
            className={`rounded-md px-5 py-2 text-xs font-semibold tabular-nums transition ${
              unit === 'cm' ? 'bg-brand text-on-brand' : 'text-ink-soft hover:text-ink'
            }`}
          >
            Metric (cm)
          </button>
          <button
            onClick={() => setUnit('in')}
            className={`rounded-md px-5 py-2 text-xs font-semibold tabular-nums transition ${
              unit === 'in' ? 'bg-brand text-on-brand' : 'text-ink-soft hover:text-ink'
            }`}
          >
            Imperial (in)
          </button>
        </div>
      </div>

      {/* Interactive Size Calculator Section */}
      <section className="mb-16 overflow-hidden rounded-3xl border border-ink/10 bg-surface p-8 md:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Controls */}
          <div className="space-y-6 lg:col-span-7">
            <div>
              <h2 className="mt-1 font-display text-2xl font-medium text-ink md:text-3xl">
                Find your size
              </h2>
              <p className="mt-2 font-text text-sm text-ink-soft">
                Adjust your anatomical measurements below. Our sizing algorithm accounts for ease
                and textile drape.
              </p>
            </div>

            {/* Sliders */}
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm font-medium text-ink">
                  <label htmlFor={chestId}>Chest Circumference</label>
                  <span className="font-semibold text-brand tabular-nums">
                    {chestInput} {unit}
                  </span>
                </div>
                <input
                  id={chestId}
                  type="range"
                  min={unit === 'cm' ? 80 : 31}
                  max={unit === 'cm' ? 125 : 50}
                  value={chestInput}
                  onChange={(e) => setChestInput(Number(e.target.value))}
                  className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-ink/10 accent-brand"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium text-ink">
                  <label htmlFor={waistId}>Waist Circumference</label>
                  <span className="font-semibold text-brand tabular-nums">
                    {waistInput} {unit}
                  </span>
                </div>
                <input
                  id={waistId}
                  type="range"
                  min={unit === 'cm' ? 65 : 25}
                  max={unit === 'cm' ? 115 : 45}
                  value={waistInput}
                  onChange={(e) => setWaistInput(Number(e.target.value))}
                  className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-ink/10 accent-brand"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium text-ink">
                  <label htmlFor={hipsId}>Hip Circumference</label>
                  <span className="font-semibold text-brand tabular-nums">
                    {hipsInput} {unit}
                  </span>
                </div>
                <input
                  id={hipsId}
                  type="range"
                  min={unit === 'cm' ? 80 : 31}
                  max={unit === 'cm' ? 125 : 50}
                  value={hipsInput}
                  onChange={(e) => setHipsInput(Number(e.target.value))}
                  className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-ink/10 accent-brand"
                />
              </div>

              {/* Fit Preference */}
              <div>
                <span className="mb-2 block text-sm font-medium text-ink">
                  Drape & Fit Preference
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['fitted', 'regular', 'relaxed'] as const).map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setFitPreference(pref)}
                      className={`rounded-xl border p-2.5 font-text text-xs font-medium capitalize transition ${
                        fitPreference === pref
                          ? 'border-brand bg-brand/10 font-semibold text-brand'
                          : 'border-ink/10 bg-surface text-ink-soft hover:bg-white'
                      }`}
                    >
                      {pref === 'fitted'
                        ? 'Architectural'
                        : pref === 'regular'
                          ? 'True Fit'
                          : 'Relaxed Drape'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation Output Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-ink/10 bg-surface p-8 text-center">
              <span className="text-xs text-ink-faint tabular-nums">Recommended Brand Size</span>
              <div className="my-4 font-display text-6xl font-medium tracking-tight text-brand md:text-7xl">
                {recommendedSize}
              </div>
              <p className="font-text text-sm font-medium text-ink">
                Optimized for{' '}
                {fitPreference === 'fitted'
                  ? 'close architectural tailoring'
                  : fitPreference === 'regular'
                    ? 'standard drape'
                    : 'flowing oversized volume'}
              </p>
              <p className="mt-2 font-text text-xs leading-relaxed text-ink-soft">
                Matches chest measurements between{' '}
                {formatRange(
                  SIZE_CHART.find((r) => r.size === recommendedSize)?.chestCm || [96, 102],
                  unit,
                )}
                .
              </p>

              <div className="mt-6 border-t border-ink/10 pt-6">
                <Button asChild size="lg" className="w-full justify-center">
                  <Link href={routes.shop}>
                    Shop In Size {recommendedSize}
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standardized Measurement Table */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-medium text-ink">
              Standard Garment Measurement Chart
            </h2>
            <p className="font-text text-sm text-ink-soft">
              All dimensions denote body measurements in {unit === 'cm' ? 'centimeters' : 'inches'}.
            </p>
          </div>
        </div>

        <div
          tabIndex={0}
          role="region"
          aria-label="Size chart, scrolls sideways on small screens"
          className="overflow-x-auto rounded-3xl border border-ink/10 bg-surface"
        >
          <table className="w-full border-collapse text-left font-text text-sm">
            <thead>
              <tr className="border-b border-ink/10 bg-ink/5">
                <th className="p-4 pl-6 text-xs font-semibold text-ink tabular-nums">Size</th>
                <th className="p-4 text-xs font-semibold text-ink tabular-nums">Chest</th>
                <th className="p-4 text-xs font-semibold text-ink tabular-nums">Waist</th>
                <th className="p-4 text-xs font-semibold text-ink tabular-nums">Hips</th>
                <th className="p-4 pr-6 text-xs font-semibold text-ink tabular-nums">
                  Sleeve Length
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SIZE_CHART.map((row) => (
                <tr
                  key={row.size}
                  className={`transition hover:bg-ink/5 ${
                    row.size === recommendedSize ? 'bg-brand/5 font-semibold' : ''
                  }`}
                >
                  <td className="p-4 pl-6 font-semibold text-ink tabular-nums">
                    {row.size}
                    {row.size === recommendedSize && (
                      <span className="ml-2 rounded-md bg-brand/10 px-2 py-0.5 text-[10px] text-brand">
                        Your Fit
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-ink-soft">{formatRange(row.chestCm, unit)}</td>
                  <td className="p-4 text-ink-soft">{formatRange(row.waistCm, unit)}</td>
                  <td className="p-4 text-ink-soft">{formatRange(row.hipsCm, unit)}</td>
                  <td className="p-4 pr-6 text-ink-soft">{formatRange(row.sleeveCm, unit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How to Measure Anatomical Guide */}
      <section className="rounded-3xl border border-ink/10 bg-surface p-8 md:p-12">
        <h2 className="mb-6 font-display text-2xl font-medium text-ink">
          How to Measure with Precision
        </h2>
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-ink/10 bg-surface p-5">
            <span className="text-xs font-semibold text-brand tabular-nums">01. Chest</span>
            <h3 className="mt-1 font-display text-base font-medium text-ink">
              Across Fullest Point
            </h3>
            <p className="mt-2 font-text text-xs leading-relaxed text-ink-soft">
              Wrap the tape level around the fullest portion of your chest, keeping the tape taut
              but comfortably flat across shoulder blades.
            </p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-surface p-5">
            <span className="text-xs font-semibold text-brand tabular-nums">02. Waist</span>
            <h3 className="mt-1 font-display text-base font-medium text-ink">
              Natural Crease Line
            </h3>
            <p className="mt-2 font-text text-xs leading-relaxed text-ink-soft">
              Bend gently sideways to locate your natural waistline crease, typically an inch above
              your belly button. Measure without holding your breath.
            </p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-surface p-5">
            <span className="text-xs font-semibold text-brand tabular-nums">03. Hips</span>
            <h3 className="mt-1 font-display text-base font-medium text-ink">
              Fullest Pelvic Span
            </h3>
            <p className="mt-2 font-text text-xs leading-relaxed text-ink-soft">
              Stand with heels together and pass the tape horizontally around the widest part of
              your hips and seat.
            </p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-surface p-5">
            <span className="text-xs font-semibold text-brand tabular-nums">04. Sleeve</span>
            <h3 className="mt-1 font-display text-base font-medium text-ink">
              Center Back to Wrist
            </h3>
            <p className="mt-2 font-text text-xs leading-relaxed text-ink-soft">
              Measure from the center back of your neck, across the shoulder point, down along the
              bent elbow to your prominent wrist bone.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
