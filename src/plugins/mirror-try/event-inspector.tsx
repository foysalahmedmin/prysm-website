'use client'

import { Bug, CaretDown, CaretUp, Trash } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useMirrorTry } from './provider'
import type { TryOnEventMap, TryOnEventName } from './types'

interface EventLogEntry {
  id: string
  timestamp: string
  event: TryOnEventName
  payload: unknown
}

const TRACKED_EVENTS: readonly TryOnEventName[] = [
  'tryon:open',
  'tryon:ready',
  'tryon:variant-change',
  'tryon:capture',
  'tryon:add-to-cart',
  'tryon:close',
  'tryon:error',
]

/**
 * Diagnostics panel that streams adapter events with timestamps and payloads.
 * Lives inside the plugin folder as an official developer tool.
 */
export function MirrorTryEventInspector() {
  const { adapter } = useMirrorTry()
  const [isOpen, setIsOpen] = useState(false)
  const [logs, setLogs] = useState<EventLogEntry[]>([])

  useEffect(() => {
    // Check if ?inspector=1 is present in the URL on mount
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('inspector') === '1') {
        Promise.resolve().then(() => setIsOpen(true))
      }
    }

    // Subscribe to all plugin lifecycle events
    const unsubs = TRACKED_EVENTS.map((event) =>
      adapter.on(event, (payload: TryOnEventMap[typeof event]) => {
        const entry: EventLogEntry = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          timestamp: new Date().toLocaleTimeString(),
          event,
          payload,
        }
        setLogs((prev) => [entry, ...prev].slice(0, 50))
      }),
    )

    return () => {
      unsubs.forEach((unsub) => unsub())
    }
  }, [adapter])

  return (
    <div
      data-mt-part="event-inspector"
      className="fixed bottom-4 left-4 z-50 font-mono text-xs text-neutral-200"
    >
      <div className="flex items-center gap-2 rounded-t-lg bg-neutral-900/90 px-3 py-1.5 shadow-xl backdrop-blur-md border border-neutral-700/60">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 font-medium hover:text-white"
        >
          <Bug size={14} className="text-emerald-400" />
          <span>Mirror Try Events ({logs.length})</span>
          {isOpen ? <CaretDown size={12} /> : <CaretUp size={12} />}
        </button>

        {isOpen && (
          <button
            type="button"
            onClick={() => setLogs([])}
            className="ml-auto text-neutral-400 hover:text-rose-400 p-1"
            title="Clear event logs"
          >
            <Trash size={12} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="max-h-72 w-80 md:w-96 overflow-y-auto rounded-b-lg border-x border-b border-neutral-700/60 bg-neutral-950/95 p-2 shadow-2xl backdrop-blur-md">
          {logs.length === 0 ? (
            <div className="py-6 text-center text-neutral-500">
              No events recorded yet. Trigger a try-on session to see telemetry.
            </div>
          ) : (
            <ul className="space-y-2">
              {logs.map((log) => (
                <li
                  key={log.id}
                  className="rounded border border-neutral-800 bg-neutral-900/60 p-2"
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span
                      className={
                        log.event === 'tryon:error'
                          ? 'text-rose-400'
                          : log.event === 'tryon:add-to-cart'
                            ? 'text-emerald-400'
                            : 'text-sky-400'
                      }
                    >
                      {log.event}
                    </span>
                    <span className="text-[10px] text-neutral-500">{log.timestamp}</span>
                  </div>
                  <pre className="mt-1 overflow-x-auto text-[10px] text-neutral-300">
                    {JSON.stringify(log.payload, null, 2)}
                  </pre>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
