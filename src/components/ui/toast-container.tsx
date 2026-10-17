'use client'

import { useToastStore } from '@/stores/toast-store'

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts)
  const dismissToast = useToastStore((s) => s.dismissToast)

  if (toasts.length === 0) return null

  return (
    <div
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      className="pointer-events-none fixed right-6 bottom-6 z-50 flex w-full max-w-sm flex-col gap-2"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="glass-strong animate-in fade-in slide-in-from-bottom-2 pointer-events-auto flex items-center justify-between gap-3 rounded-full border border-white/60 px-5 py-3 text-sm text-ink shadow-xl backdrop-blur-md duration-200"
        >
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                toast.type === 'error'
                  ? 'bg-danger'
                  : toast.type === 'success'
                    ? 'bg-success'
                    : 'bg-focus'
              }`}
            />
            <span className="font-medium">{toast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            className="rounded-full p-1 font-mono text-xs text-ink-faint hover:text-ink focus:ring-1 focus:ring-focus focus:outline-none"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
