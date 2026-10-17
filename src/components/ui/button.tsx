'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

// PRYSM skin of the shared Button contract: same props and behaviour as the reference,
// different look. Variants map to the design file: solid ink pill, glass pill, text-only.
const button = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-full font-text font-semibold',
    'transition-[transform,box-shadow] duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
    'disabled:pointer-events-none disabled:opacity-50 aria-busy:cursor-progress',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-brand text-on-brand shadow-[0_14px_30px_-10px_rgb(15_20_36/0.55)]',
          'hover:-translate-y-0.5',
          'hover:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--color-focus),0_18px_34px_-10px_rgb(15_20_36/0.6)]',
        ],
        secondary: 'glass glass-strong text-ink hover:-translate-y-0.5',
        ghost: 'text-ink hover:bg-ink/5',
      },
      size: {
        sm: 'h-11 px-5 text-sm',
        md: 'h-12 px-7 text-[15px]',
        lg: 'h-14 px-9 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
  loading?: boolean
  /** Render the child element (for example a Next.js <Link>) instead of a <button>. */
  asChild?: boolean
}

export function Button({
  variant,
  size,
  loading = false,
  asChild = false,
  className,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  const Component = asChild ? Slot.Root : 'button'
  const buttonOnly = asChild ? {} : { type, disabled: disabled || loading }
  return (
    <Component
      data-variant={variant ?? 'primary'}
      data-size={size ?? 'md'}
      aria-busy={loading || undefined}
      className={cn(button({ variant, size }), className)}
      {...buttonOnly}
      {...rest}
    />
  )
}
