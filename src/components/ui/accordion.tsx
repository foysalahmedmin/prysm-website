'use client'

import { Accordion as RadixAccordion } from 'radix-ui'
import type { ReactNode } from 'react'

export interface AccordionItem {
  value: string
  title: string
  content: ReactNode
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <RadixAccordion.Root type="single" collapsible>
      {items.map((item) => (
        <RadixAccordion.Item key={item.value} value={item.value}>
          <RadixAccordion.Header>
            <RadixAccordion.Trigger>{item.title}</RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content>{item.content}</RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  )
}
