'use client'

import { RadioGroup } from 'radix-ui'
import { cn } from '@/lib/cn'

export interface PickerOption {
  value: string
  label: string
  /** Hex colour for colour options. */
  swatch?: string
  unavailable?: boolean
}

export interface OptionPickerProps {
  label: string
  options: PickerOption[]
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

/** Single choice from a few options (sizes, colours, materials). Arrow keys move the selection. */
export function OptionPicker({
  label,
  options,
  value,
  onValueChange,
  className,
}: OptionPickerProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <span className="font-text text-sm font-medium text-ink">{label}</span>
      <RadioGroup.Root
        aria-label={label}
        value={value}
        onValueChange={onValueChange}
        className="flex flex-wrap gap-2.5"
      >
        {options.map((option) => (
          <RadioGroup.Item
            key={option.value}
            value={option.value}
            disabled={option.unavailable}
            aria-label={option.label}
            style={option.swatch ? { ['--swatch' as string]: option.swatch } : undefined}
            className={cn(
              'glass relative flex h-[52px] min-w-[52px] items-center justify-center rounded-md px-3 text-sm font-medium text-ink tabular-nums transition-all duration-200',
              'hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
              'data-[state=checked]:bg-brand data-[state=checked]:text-on-brand',
              option.unavailable &&
                'cursor-not-allowed opacity-40 after:absolute after:inset-x-0 after:top-1/2 after:h-px after:-rotate-45 after:bg-ink/60',
            )}
          >
            {option.swatch ? (
              <span
                className="h-6 w-6 rounded-full border border-black/10"
                style={{ backgroundColor: option.swatch }}
              />
            ) : (
              option.label
            )}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  )
}
