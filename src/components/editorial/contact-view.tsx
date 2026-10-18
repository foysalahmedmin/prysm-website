'use client'

import { useState } from 'react'
import { ArrowRight } from '@/components/icons'
import { Button, TextField } from '@/components/ui'
import { brand } from '@/config/brand'

interface FormState {
  name: string
  email: string
  topic: string
  orderNumber: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  topic?: string
  message?: string
}

const TOPICS = [
  { value: 'order', label: 'Order Inquiry & Delivery Status' },
  { value: 'fitting', label: 'Private Styling & Virtual Fitting Consultation' },
  { value: 'care', label: 'Optical Textile Care & Atelier Repairs' },
  { value: 'press', label: 'Press, Media & Wholesale Inquiries' },
  { value: 'other', label: 'General Concierge Inquiry' },
]

export function ContactView() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    topic: 'order',
    orderNumber: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [ticketId, setTicketId] = useState('')

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.name.trim()) {
      newErrors.name = 'Please provide your full name.'
    }
    if (!form.email.trim()) {
      newErrors.email = 'Please provide your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please provide a valid email address.'
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = 'Please provide a message with at least 10 characters.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setTicketId(`PRY-${Math.floor(100000 + Math.random() * 900000)}`)
    }, 800)
  }

  const handleReset = () => {
    setForm({
      name: '',
      email: '',
      topic: 'order',
      orderNumber: '',
      message: '',
    })
    setErrors({})
    setSubmitted(false)
  }

  return (
    <div className="page-container py-10 md:py-14">
      {/* Header */}
      <div className="mb-10 max-w-2xl md:mb-14">
        <h1 className="font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
          Contact us
        </h1>
        <p className="mt-4 font-text text-base text-ink-soft md:text-lg">
          Questions about sizing, an order or a store visit? Send us a message and we will reply by
          email.
        </p>
      </div>

      <div className="grid items-start gap-12 lg:grid-cols-12">
        {/* Contact Form Card */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-ink/10 bg-surface p-8 md:p-10">
            {submitted ? (
              <div className="animate-fade-in py-6 text-center" role="status">
                <h2 className="font-display text-2xl font-medium text-ink md:text-3xl">
                  Message sent
                </h2>
                <p className="mt-2 text-xs font-semibold text-brand tabular-nums">
                  Reference: {ticketId}
                </p>
                <p className="mx-auto mt-4 max-w-md font-text text-sm leading-relaxed text-ink-soft md:text-base">
                  Thank you for reaching out, {form.name}. Our atelier concierge has received your
                  request and will respond to{' '}
                  <span className="font-semibold text-ink">{form.email}</span> within 4 business
                  hours.
                </p>

                <div className="mt-8">
                  <Button onClick={handleReset} variant="secondary">
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <h2 className="font-display text-xl font-medium text-ink">Send us a message</h2>
                  <p className="mt-1 font-text text-xs text-ink-soft">
                    All communications are handled with discretion by our New York advisory staff.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <TextField
                    label="Full Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    error={errors.name}
                    placeholder="Evelyn Thorne"
                  />
                  <TextField
                    label="Email Address"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    error={errors.email}
                    placeholder="evelyn@domain.com"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="topic-select"
                      className="font-text text-sm font-medium text-ink"
                    >
                      Topic
                    </label>
                    <select
                      id="topic-select"
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="glass glass-strong h-12 w-full rounded-md border border-border-strong px-4 font-text text-sm text-ink focus-visible:outline-2 focus-visible:outline-focus"
                    >
                      {TOPICS.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <TextField
                    label="Order Number (Optional)"
                    value={form.orderNumber}
                    onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                    placeholder="e.g. PRY-10829"
                    hint="Add it if your question is about an order"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message-input" className="font-text text-sm font-medium text-ink">
                    Message
                  </label>
                  <textarea
                    id="message-input"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How may our concierge assist with your garments or fit?"
                    className="glass glass-strong w-full rounded-md border border-border-strong p-4 font-text text-sm text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-focus"
                  />
                  {errors.message ? (
                    <p className="font-text text-xs text-danger" role="alert">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full justify-center"
                >
                  {isSubmitting ? 'Transmitting to Concierge...' : 'Send message'}
                  <ArrowRight size={16} />
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Studio Contacts & Operating Hours Side Card */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-3xl border border-ink/10 bg-surface p-8">
            <h3 className="font-display text-lg font-medium text-ink">Contact details</h3>
            <ul className="mt-5 space-y-4 font-text text-sm">
              <li className="flex flex-col">
                <span className="text-xs text-ink-faint tabular-nums">Email</span>
                <a
                  href={`mailto:concierge@${brand.id}-atelier.com`}
                  className="mt-1 font-semibold text-brand hover:underline"
                >
                  concierge@{brand.id}-atelier.com
                </a>
              </li>
              <li className="flex flex-col">
                <span className="text-xs text-ink-faint tabular-nums">Telephone Advisory</span>
                <span className="mt-1 font-medium text-ink">+1 (212) 555-0192</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs text-ink-faint tabular-nums">Operating Hours</span>
                <span className="mt-1 text-ink-soft">
                  Monday – Friday: 09:00 – 19:00 EST
                  <br />
                  Saturday – Sunday: 11:00 – 17:00 EST
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-ink/10 bg-surface p-8">
            <h3 className="font-display text-lg font-medium text-ink">
              SoHo Flagship Consultations
            </h3>
            <p className="mt-3 font-text text-sm leading-relaxed text-ink-soft">
              Private fitting chamber sessions and garment previews are available by advance booking
              at 482 Broome Street, New York.
            </p>
            <div className="mt-4 border-t border-ink/10 pt-4 text-xs text-brand tabular-nums">
              Walk-ins accommodated subject to fitting chamber availability.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
