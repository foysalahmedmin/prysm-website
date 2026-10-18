'use client'

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { getState, launcherFocused, open } from './controller'
import { useMirrorTryState } from './hooks'
import { Logo } from './icons'

/**
 * The floating "Virtual Trial" card. It starts in a corner and the shopper can drag it anywhere;
 * the spot is kept as a share of the free space, so it stays put when the window is resized.
 */

const STORAGE_KEY = 'mirror-try:launcher'
/** Gap kept between the card and the edge of the window, in pixels. */
const EDGE = 8
/** How far the pointer must travel before a press becomes a drag. */
const DRAG_THRESHOLD = 5
const KEY_STEP = 16

interface Spot {
  /** 0 is the left edge, 1 the right. */
  x: number
  /** 0 is the top edge, 1 the bottom. */
  y: number
}

const clamp = (value: number) => Math.min(1, Math.max(0, value))

function readSpot(): Spot | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const spot = JSON.parse(raw) as Partial<Spot>
    return typeof spot.x === 'number' && typeof spot.y === 'number'
      ? { x: clamp(spot.x), y: clamp(spot.y) }
      : null
  } catch {
    return null
  }
}

function saveSpot(spot: Spot) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(spot))
  } catch {
    // Private mode: the card keeps its spot for this page view only.
  }
}

/** Where a card whose top-left corner sits at (left, top) is, as a share of the free space. */
function spotFor(element: HTMLElement, left: number, top: number): Spot {
  const freeX = window.innerWidth - 2 * EDGE - element.offsetWidth
  const freeY = window.innerHeight - 2 * EDGE - element.offsetHeight
  return {
    x: freeX > 0 ? clamp((left - EDGE) / freeX) : 0,
    y: freeY > 0 ? clamp((top - EDGE) / freeY) : 1,
  }
}

function placement(spot: Spot): CSSProperties {
  // `left`/`top` percentages are of the window; `translate` percentages are of the card itself.
  return {
    left: `calc(${EDGE}px + ${spot.x} * (100% - ${2 * EDGE}px))`,
    top: `calc(${EDGE}px + ${spot.y} * (100% - ${2 * EDGE}px))`,
    translate: `${-spot.x * 100}% ${-spot.y * 100}%`,
  }
}

interface Press {
  pointerId: number
  startX: number
  startY: number
  left: number
  top: number
  dragging: boolean
}

export function Launcher({ corner }: { corner: 'bottom-left' | 'bottom-right' }) {
  const { phase } = useMirrorTryState()
  const ref = useRef<HTMLButtonElement>(null)
  const press = useRef<Press | null>(null)
  const justDragged = useRef(false)
  const [spot, setSpot] = useState<Spot | null>(readSpot)
  const [dragging, setDragging] = useState(false)
  const live = ['measuring', 'ready', 'initiating', 'live', 'ended'].includes(phase)

  // Coming back from a minimised panel: put focus where the shopper left it.
  useEffect(() => {
    if (getState().focusLauncher) {
      ref.current?.focus()
      launcherFocused()
    }
  }, [])

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    }
    const move = moves[event.key]
    const element = ref.current
    if (!move || !element) return
    event.preventDefault()
    const step = event.shiftKey ? KEY_STEP * 4 : KEY_STEP
    const rect = element.getBoundingClientRect()
    const next = spotFor(element, rect.left + move[0] * step, rect.top + move[1] * step)
    setSpot(next)
    saveSpot(next)
  }

  return (
    <button
      ref={ref}
      type="button"
      className="smoke launcher"
      data-corner={corner}
      data-placed={spot ? '' : undefined}
      data-dragging={dragging ? '' : undefined}
      style={spot ? placement(spot) : undefined}
      aria-describedby="mt-launcher-help"
      onPointerDown={(event) => {
        if (event.button !== 0 || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        press.current = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startY: event.clientY,
          left: rect.left,
          top: rect.top,
          dragging: false,
        }
        ref.current.setPointerCapture?.(event.pointerId)
      }}
      onPointerMove={(event) => {
        const current = press.current
        const element = ref.current
        if (!current || !element || current.pointerId !== event.pointerId) return
        const dx = event.clientX - current.startX
        const dy = event.clientY - current.startY
        if (!current.dragging && Math.hypot(dx, dy) < DRAG_THRESHOLD) return
        if (!current.dragging) {
          current.dragging = true
          setDragging(true)
        }
        setSpot(spotFor(element, current.left + dx, current.top + dy))
      }}
      onPointerUp={(event) => {
        const current = press.current
        press.current = null
        if (ref.current?.hasPointerCapture?.(event.pointerId)) {
          ref.current.releasePointerCapture(event.pointerId)
        }
        if (!current?.dragging || !ref.current) return
        setDragging(false)
        justDragged.current = true
        const rect = ref.current.getBoundingClientRect()
        saveSpot(spotFor(ref.current, rect.left, rect.top))
      }}
      onPointerCancel={() => {
        press.current = null
        setDragging(false)
      }}
      onClick={() => {
        if (justDragged.current) {
          justDragged.current = false
          return
        }
        open()
      }}
      onKeyDown={onKeyDown}
    >
      <Logo />
      <span>Virtual Trial</span>
      {live ? (
        <>
          <span className="live" aria-hidden="true" />
          <span className="sr-only">, camera on</span>
        </>
      ) : null}
      <span id="mt-launcher-help" className="sr-only" hidden>
        Opens Mirror Try. Drag, or use the arrow keys, to move it.
      </span>
    </button>
  )
}
