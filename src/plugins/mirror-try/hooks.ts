'use client'

import { useSyncExternalStore } from 'react'
import { getServerState, getState, subscribe, type MirrorTryState } from './controller'

export function useMirrorTryState(): MirrorTryState {
  return useSyncExternalStore(subscribe, getState, getServerState)
}

function subscribeClock(onTick: () => void) {
  const timer = setInterval(onTick, 1000)
  return () => clearInterval(timer)
}

const currentSecond = () => Math.floor(Date.now() / 1000)

/** The current time in whole seconds, re-rendering once a second while mounted. */
export function useClock(): number {
  return useSyncExternalStore(subscribeClock, currentSecond, () => 0)
}
