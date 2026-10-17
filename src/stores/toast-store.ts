import { create } from 'zustand'

export type ToastType = 'info' | 'success' | 'error'

export interface ToastItem {
  id: string
  message: string
  type?: ToastType
  duration?: number
}

interface ToastState {
  toasts: ToastItem[]
  showToast: (toast: Omit<ToastItem, 'id'> | string) => string
  dismissToast: (id: string) => void
}

let counter = 0

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],
  showToast: (toast) => {
    const id = `toast-${++counter}-${Date.now()}`
    const item: ToastItem =
      typeof toast === 'string'
        ? { id, message: toast, type: 'info', duration: 4000 }
        : {
            id,
            message: toast.message,
            type: toast.type ?? 'info',
            duration: toast.duration ?? 4000,
          }

    set((state) => ({
      toasts: [...state.toasts, item],
    }))

    if (item.duration && item.duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }))
      }, item.duration)
    }

    return id
  },
  dismissToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }))
  },
}))

export function useToast() {
  const showToast = useToastStore((s) => s.showToast)
  const dismissToast = useToastStore((s) => s.dismissToast)
  const toasts = useToastStore((s) => s.toasts)
  return { showToast, dismissToast, toasts }
}
