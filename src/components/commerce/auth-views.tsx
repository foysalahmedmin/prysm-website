'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight, Check } from '@/components/icons'
import { Button } from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionStore } from '@/stores/session-store'

export function LoginView() {
  const router = useRouter()
  const login = useSessionStore((s) => s.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please provide your email and password.')
      return
    }
    login(email)
    router.push(routes.account)
  }

  const handleQuickDemoLogin = () => {
    login('elena.rostova@example.com', 'Elena Rostova')
    router.push(routes.account)
  }

  return (
    <div className="glass glass-strong rounded-3xl border border-ink/10 p-8">
      <div className="text-center">
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          Sign in
        </h1>
        <p className="mt-2 font-text text-xs text-ink-soft sm:text-sm">
          Sign in to see your orders and saved pieces.
        </p>
      </div>

      {error ? (
        <div className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-600">
          {error}
        </div>
      ) : null}

      {/* 1-Click Demo Entry */}
      <div className="border-accent-cyan/30 bg-accent-cyan/10 mt-6 rounded-2xl border p-4 text-center">
        <p className="flex items-center justify-center gap-1.5 text-xs font-semibold text-ink tabular-nums">
          Demo account
        </p>
        <p className="mt-1 font-text text-[11px] text-ink-soft">
          Sign in as Elena Rostova, with sample orders and addresses.
        </p>
        <Button
          type="button"
          size="sm"
          onClick={handleQuickDemoLogin}
          className="mt-3 w-full bg-ink text-canvas hover:bg-ink/90"
        >
          Use demo account
        </Button>
      </div>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/40" />
        <span className="text-[10px] text-ink-faint tabular-nums">Or use your email</span>
        <div className="h-px flex-1 bg-white/40" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="mb-1 block text-xs text-ink-soft tabular-nums">
            Email Address
          </label>
          <input
            id="login-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-md border border-ink/25 bg-surface p-3 font-text text-sm text-ink placeholder:text-ink-faint hover:border-ink/50 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="login-pwd" className="block text-xs text-ink-soft tabular-nums">
              Password
            </label>
            <Link
              href={routes.forgotPassword}
              className="text-[11px] text-ink-soft tabular-nums hover:text-ink"
            >
              Forgot Password?
            </Link>
          </div>
          <input
            id="login-pwd"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-md border border-ink/25 bg-surface p-3 font-text text-sm text-ink placeholder:text-ink-faint hover:border-ink/50 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          />
        </div>

        <div className="pt-2">
          <Button type="submit" size="lg" className="w-full">
            Sign in
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center font-text text-xs text-ink-soft">
        Don&apos;t have an account?{' '}
        <Link href={routes.register} className="font-semibold text-ink underline hover:text-ink/80">
          Create an account
        </Link>
      </div>
    </div>
  )
}

export function RegisterView() {
  const router = useRouter()
  const register = useSessionStore((s) => s.register)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setError('Please complete all registration fields.')
      return
    }
    register(name, email)
    router.push(routes.account)
  }

  return (
    <div className="glass glass-strong rounded-3xl border border-ink/10 p-8">
      <div className="text-center">
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          Register
        </h1>
        <p className="mt-2 font-text text-xs text-ink-soft sm:text-sm">
          Save pieces, check out faster and follow your orders.
        </p>
      </div>

      {error ? (
        <div className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-600">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="reg-name" className="mb-1 block text-xs text-ink-soft tabular-nums">
            Full Name
          </label>
          <input
            id="reg-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Elena Rostova"
            className="w-full rounded-md border border-ink/25 bg-surface p-3 font-text text-sm text-ink placeholder:text-ink-faint hover:border-ink/50 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          />
        </div>

        <div>
          <label htmlFor="reg-email" className="mb-1 block text-xs text-ink-soft tabular-nums">
            Email Address
          </label>
          <input
            id="reg-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-md border border-ink/25 bg-surface p-3 font-text text-sm text-ink placeholder:text-ink-faint hover:border-ink/50 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          />
        </div>

        <div>
          <label htmlFor="reg-pwd" className="mb-1 block text-xs text-ink-soft tabular-nums">
            Password
          </label>
          <input
            id="reg-pwd"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-md border border-ink/25 bg-surface p-3 font-text text-sm text-ink placeholder:text-ink-faint hover:border-ink/50 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          />
        </div>

        <div className="pt-2">
          <Button type="submit" size="lg" className="w-full">
            Create account
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center font-text text-xs text-ink-soft">
        Already have an account?{' '}
        <Link href={routes.login} className="font-semibold text-ink underline hover:text-ink/80">
          Sign In
        </Link>
      </div>
    </div>
  )
}

export function ForgotPasswordView() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <div className="glass glass-strong rounded-3xl border border-ink/10 p-8">
      <div className="text-center">
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          Reset password
        </h1>
        <p className="mt-2 font-text text-xs text-ink-soft sm:text-sm">
          Enter your email and we will send you a link to reset your password.
        </p>
      </div>

      {submitted ? (
        <div className="mt-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-canvas">
            <Check size={20} />
          </div>
          <p className="mt-3 font-text text-sm font-semibold text-emerald-800">Check your email</p>
          <p className="mt-1 font-text text-xs text-emerald-700">
            We sent a password reset link to <strong>{email}</strong>.
          </p>
          <div className="mt-6">
            <Button asChild size="sm">
              <Link href={routes.login}>Return to Sign In</Link>
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="forgot-email" className="mb-1 block text-xs text-ink-soft tabular-nums">
              Email Address
            </label>
            <input
              id="forgot-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-ink/25 bg-surface p-3 font-text text-sm text-ink placeholder:text-ink-faint hover:border-ink/50 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" size="lg" className="w-full">
              Send reset link
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>

          <div className="text-center font-text text-xs text-ink-soft">
            <Link href={routes.login} className="hover:text-ink">
              &larr; Back to Sign In
            </Link>
          </div>
        </form>
      )}
    </div>
  )
}
