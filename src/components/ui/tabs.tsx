'use client'

import { Tabs as RadixTabs } from 'radix-ui'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface TabItem {
  value: string
  label: string
  content: ReactNode
}

export function Tabs({
  items,
  defaultValue,
  label,
  className,
}: {
  items: TabItem[]
  defaultValue?: string
  label: string
  className?: string
}) {
  return (
    <RadixTabs.Root
      defaultValue={defaultValue ?? items[0]?.value}
      className={cn('w-full', className)}
    >
      <RadixTabs.List
        aria-label={label}
        className="glass inline-flex items-center gap-1 rounded-full p-1"
      >
        {items.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            className="rounded-full px-5 py-2 font-text text-sm font-medium text-ink-soft transition-all duration-200 data-[state=active]:bg-brand data-[state=active]:text-on-brand data-[state=active]:shadow-sm focus-visible:outline-2 focus-visible:outline-focus"
          >
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {items.map((item) => (
        <RadixTabs.Content
          key={item.value}
          value={item.value}
          className="mt-4 focus-visible:outline-none"
        >
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  )
}
