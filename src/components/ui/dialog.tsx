'use client'

import { Dialog as RadixDialog } from 'radix-ui'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: ReactNode
  title: string
  description?: string
  closeLabel: string
  /** Layout hint for the brand skin: a centred modal, or a drawer from the right or bottom. */
  side?: 'center' | 'right' | 'bottom'
  className?: string
  children?: ReactNode
}

/** Modal with focus trap, Escape to close and focus return, courtesy of Radix. Title is required. */
export function Dialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  closeLabel,
  side = 'center',
  className,
  children,
}: DialogProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger> : null}
      <RadixDialog.Portal>
        <RadixDialog.Overlay data-overlay="" />
        <RadixDialog.Content
          data-side={side}
          className={cn(className)}
          {...(description ? {} : { 'aria-describedby': undefined })}
        >
          <RadixDialog.Title>{title}</RadixDialog.Title>
          {description ? <RadixDialog.Description>{description}</RadixDialog.Description> : null}
          {children}
          <RadixDialog.Close aria-label={closeLabel}>×</RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
