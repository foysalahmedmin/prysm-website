'use client'

import { RadioGroup } from 'radix-ui'

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
}

/** Single choice from a few options (sizes, colours, materials). Arrow keys move the selection. */
export function OptionPicker({ label, options, value, onValueChange }: OptionPickerProps) {
  return (
    <RadioGroup.Root aria-label={label} value={value} onValueChange={onValueChange}>
      {options.map((option) => (
        <RadioGroup.Item
          key={option.value}
          value={option.value}
          disabled={option.unavailable}
          aria-label={option.label}
          style={option.swatch ? { ['--swatch' as string]: option.swatch } : undefined}
        >
          {option.swatch ? null : option.label}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}
