'use client'

import { Tabs as RadixTabs } from 'radix-ui'
import type { ReactNode } from 'react'

export interface TabItem {
  value: string
  label: string
  content: ReactNode
}

export function Tabs({
  items,
  defaultValue,
  label,
}: {
  items: TabItem[]
  defaultValue?: string
  label: string
}) {
  return (
    <RadixTabs.Root defaultValue={defaultValue ?? items[0]?.value}>
      <RadixTabs.List aria-label={label}>
        {items.map((item) => (
          <RadixTabs.Trigger key={item.value} value={item.value}>
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {items.map((item) => (
        <RadixTabs.Content key={item.value} value={item.value}>
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  )
}
