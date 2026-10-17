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
  const sideClasses = {
    center:
      'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg w-[calc(100%-2rem)] rounded-[28px]',
    right: 'fixed inset-y-0 right-0 w-full max-w-md h-full rounded-l-[28px]',
    bottom: 'fixed inset-x-0 bottom-0 w-full max-h-[85vh] rounded-t-[28px]',
  }[side]

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger> : null}
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          data-overlay=""
          className="fixed inset-0 z-50 bg-[#0f1424]/[0.28] backdrop-blur-sm transition-opacity"
        />
        <RadixDialog.Content
          data-side={side}
          className={cn(
            'glass glass-strong z-50 p-6 shadow-2xl focus:outline-none',
            sideClasses,
            className,
          )}
          {...(description ? {} : { 'aria-describedby': undefined })}
        >
          <div className="flex items-center justify-between pb-4">
            <RadixDialog.Title className="font-display text-xl font-bold text-ink">
              {title}
            </RadixDialog.Title>
            <RadixDialog.Close
              aria-label={closeLabel}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-lg leading-none text-ink hover:bg-ink/10 focus-visible:outline-2 focus-visible:outline-focus"
            >
              ×
            </RadixDialog.Close>
          </div>
          {description ? (
            <RadixDialog.Description className="pb-4 font-text text-sm text-ink-soft">
              {description}
            </RadixDialog.Description>
          ) : null}
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
