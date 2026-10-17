'use client'

import { Slot } from 'radix-ui'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  /** Render the child element (for example a Next.js <Link>) instead of a <button>. */
  asChild?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
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
      data-variant={variant}
      data-size={size}
      aria-busy={loading || undefined}
      className={cn(className)}
      {...buttonOnly}
      {...rest}
    />
  )
}
