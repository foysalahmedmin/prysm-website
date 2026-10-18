'use client'

import { useEffect, useRef, type KeyboardEvent } from 'react'
import { AccountScreen } from './account'
import {
  closeSheet,
  closeView,
  dismissNotice,
  minimize,
  openAccount,
  toggleMaximize,
  type MirrorTryState,
} from './controller'
import { useMirrorTryState } from './hooks'
import { CollapseIcon, ExpandIcon, Logo, MinusIcon, UserIcon } from './icons'
import { TrialScreen } from './trial'

/** Reads notices out and clears them. Each screen draws the notice where it fits that screen. */
function Notices({ notice }: { notice: MirrorTryState['notice'] }) {
  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => dismissNotice(notice.id), 3600)
    return () => clearTimeout(timer)
  }, [notice])

  return (
    <p className="sr-only" role="status" aria-live="polite">
      {notice?.text}
    </p>
  )
}

/** The Virtual Trial window. It never blocks the store: shoppers can keep browsing around it. */
export function Panel() {
  const state = useMirrorTryState()
  const ref = useRef<HTMLElement>(null)

  const lastView = useRef(state.view)

  useEffect(() => {
    if (state.open) ref.current?.focus()
  }, [state.open])

  // Back from an account screen: keep focus in the window rather than dropping it on the page.
  useEffect(() => {
    if (state.view === 'trial' && lastView.current !== 'trial') ref.current?.focus()
    lastView.current = state.view
  }, [state.view])

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Escape') return
    event.preventDefault()
    if (state.sheet) closeSheet()
    else if (state.view !== 'trial') closeView()
    else minimize()
  }

  return (
    <section
      ref={ref}
      className="panel"
      role="dialog"
      aria-modal="false"
      aria-labelledby="mt-title"
      tabIndex={-1}
      hidden={!state.open}
      data-maximized={state.maximized ? '' : undefined}
      onKeyDown={onKeyDown}
    >
      <header className="header">
        <span className="brand">
          <Logo />
        </span>
        <h2 id="mt-title" className="title">
          Virtual Trial
        </h2>
        <div className="controls">
          <button
            type="button"
            className="ctrl"
            data-raised=""
            aria-label={state.user ? `Your account, ${state.user.name}` : 'Log in or sign up'}
            onClick={openAccount}
          >
            <UserIcon size={19} />
          </button>
          <button type="button" className="ctrl" aria-label="Minimize" onClick={minimize}>
            <MinusIcon size={19} />
          </button>
          <button
            type="button"
            className="ctrl"
            data-action="maximize"
            aria-label="Full screen"
            aria-pressed={state.maximized}
            onClick={toggleMaximize}
          >
            {state.maximized ? <CollapseIcon size={18} /> : <ExpandIcon size={18} />}
          </button>
        </div>
      </header>

      <div className="body">
        {state.view === 'trial' ? <TrialScreen /> : <AccountScreen view={state.view} />}
        <Notices notice={state.notice} />
      </div>
    </section>
  )
}
