'use client'

import { Accordion as RadixAccordion } from 'radix-ui'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface AccordionItem {
  value: string
  title: string
  content: ReactNode
}

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  return (
    <RadixAccordion.Root type="single" collapsible className={cn('w-full space-y-2', className)}>
      {items.map((item) => (
        <RadixAccordion.Item
          key={item.value}
          value={item.value}
          className="glass glass-strong overflow-hidden rounded-md transition-all"
        >
          <RadixAccordion.Header className="m-0">
            <RadixAccordion.Trigger className="flex w-full items-center justify-between p-5 font-text text-base font-semibold text-ink transition-colors hover:text-ink/80 focus-visible:outline-2 focus-visible:outline-focus">
              <span>{item.title}</span>
              <span
                aria-hidden="true"
                className="text-xl leading-none transition-transform duration-200"
              >
                +
              </span>
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className="px-5 pb-5 font-text text-sm text-ink-soft">
            {item.content}
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  )
}
