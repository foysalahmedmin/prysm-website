'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MagnifyingGlass } from '@/components/icons'
import { Accordion, Button } from '@/components/ui'
import { routes } from '@/config/routes'
import type { FaqItem } from '@/domain'

export function FaqView({ items = [] }: { items: FaqItem[] }) {
  const [selectedGroup, setSelectedGroup] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Derive unique groups
  const groups = useMemo(() => {
    const set = new Set<string>()
    items.forEach((item) => set.add(item.group))
    return ['All', ...Array.from(set)]
  }, [items])

  // Filter items by category and search term
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesGroup = selectedGroup === 'All' || item.group === selectedGroup
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesGroup && matchesSearch
    })
  }, [items, selectedGroup, searchQuery])

  // Map to Accordion items
  const accordionItems = useMemo(() => {
    return filteredItems.map((item) => ({
      value: item.id,
      title: item.question,
      content: (
        <div className="pt-2">
          <p className="font-text text-sm leading-relaxed text-ink-soft">{item.answer}</p>
          <div className="mt-3">
            <span className="inline-block rounded-md bg-ink/5 px-2 py-0.5 text-[10px] text-ink-faint tabular-nums">
              Topic: {item.group}
            </span>
          </div>
        </div>
      ),
    }))
  }, [filteredItems])

  return (
    <div className="page-container py-10 md:py-14">
      {/* Header */}
      <div className="mb-10 max-w-2xl md:mb-14">
        <h1 className="font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 font-text text-base text-ink-soft md:text-lg">
          Answers to client inquiries regarding orders, global express delivery, virtual fitting
          technology, and optical textile maintenance.
        </p>

        {/* Search Bar */}
        <div className="relative mt-8 max-w-lg">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-ink-faint">
            <MagnifyingGlass size={18} />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="glass glass-strong h-13 w-full rounded-md border border-border-strong pr-5 pl-11 font-text text-sm text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-focus"
          />
        </div>

        {/* Group / Category Filter Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`rounded-md px-4 py-1.5 text-xs font-semibold tabular-nums transition ${
                selectedGroup === group
                  ? 'bg-brand text-on-brand'
                  : 'border border-ink/10 bg-surface text-ink-soft hover:bg-white hover:text-ink'
              }`}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="max-w-3xl">
        <h2 className="sr-only">Questions</h2>
        {accordionItems.length > 0 ? (
          <Accordion items={accordionItems} />
        ) : (
          <div className="py-12 text-center">
            <p className="font-display text-lg font-medium text-ink">No matching questions found</p>
            <p className="mt-2 font-text text-sm text-ink-soft">
              Try adjusting your search terms or clearing category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedGroup('All')
              }}
              className="mt-4 text-xs font-semibold text-brand tabular-nums hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Contact us Support Banner */}
      <div className="mt-16 max-w-3xl border-t border-ink/10 pt-8 md:flex md:items-center md:justify-between">
        <div>
          <h3 className="font-display text-xl font-medium text-ink">Still have a question?</h3>
          <p className="mt-1 font-text text-sm text-ink-soft">
            Our team can help with sizing, orders and anything else.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <Button asChild>
            <Link href={routes.contact}>
              Contact us
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
