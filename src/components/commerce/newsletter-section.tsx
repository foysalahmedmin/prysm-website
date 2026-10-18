'use client'

import { useState } from 'react'
import { ArrowRight, Check } from '@/components/icons'
import { cn } from '@/lib/cn'

interface NewsletterSectionProps {
  title: string
  description: string
  placeholder: string
  cta: string
  className?: string
}

/** A full-width black band: one line of copy, one field. */
export function NewsletterSection({
  title,
  description,
  placeholder,
  cta,
  className,
}: NewsletterSectionProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setStatus('loading')
    setTimeout(() => setStatus('success'), 400)
  }

  return (
    <section aria-labelledby="newsletter-heading" className={cn('bg-ink text-on-brand', className)}>
      <div className="page-container grid gap-10 py-16 md:grid-cols-2 md:items-end md:py-24">
        <div>
          <h2
            id="newsletter-heading"
            className="font-display text-3xl leading-tight font-medium tracking-tight md:text-5xl"
          >
            {title}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-on-brand/70 md:text-base">
            {description}
          </p>
        </div>

        {status === 'success' ? (
          <p className="flex items-center gap-2 text-sm text-on-brand" role="status">
            <Check size={16} aria-hidden="true" />
            Thank you for subscribing. Your first dispatch is on its way.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-3 border-b border-on-brand/40"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              aria-label="Email address for newsletter"
              className="h-12 flex-1 bg-transparent text-base text-on-brand placeholder:text-on-brand/50 focus-visible:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="mb-2 inline-flex h-9 shrink-0 items-center gap-2 rounded-md bg-on-brand px-4 text-sm font-medium text-ink transition hover:bg-on-brand/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-brand disabled:opacity-60"
            >
              {cta}
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
