'use client'

import { useState } from 'react'
import { ArrowRight, Check } from '@/components/icons'
import { Button } from '@/components/ui'
import { cn } from '@/lib/cn'

interface NewsletterSectionProps {
  title: string
  description: string
  placeholder: string
  cta: string
  className?: string
}

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
    setTimeout(() => {
      setStatus('success')
    }, 400)
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className={cn(
        'glass glass-strong edge relative overflow-hidden rounded-[32px] p-8 md:p-14 text-center',
        className,
      )}
    >
      <div className="relative z-10 mx-auto max-w-2xl space-y-4">
        <h2 id="newsletter-heading" className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
          {title}
        </h2>
        <p className="font-text text-sm md:text-base text-ink-soft">{description}</p>

        {status === 'success' ? (
          <div className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-ink shadow-sm">
            <Check size={16} className="text-brand" />
            <span>Thank you for subscribing. You will receive dispatches shortly.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col sm:flex-row gap-2.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              aria-label="Email address for newsletter"
              className="glass glass-strong h-11 flex-1 rounded-full px-5 font-text text-sm text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-focus"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={status === 'loading'}
              className="h-11 rounded-full px-6"
            >
              <span>{cta}</span>
              <ArrowRight size={14} className="ml-1.5" />
            </Button>
          </form>
        )}
      </div>

      {/* Ambient spectral glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-gradient-to-r from-brand/20 via-focus/20 to-brand/10 blur-3xl opacity-50"
      />
    </section>
  )
}
