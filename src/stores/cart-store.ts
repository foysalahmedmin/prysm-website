import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartLineInput } from '@/domain'
import { persistOptions } from './persist'

export const MAX_LINE_QUANTITY = 10

interface CartState {
  lines: CartLineInput[]
  add: (line: { productId: string; variantId: string; quantity?: number }) => void
  setQuantity: (variantId: string, quantity: number) => void
  remove: (variantId: string) => void
  clear: () => void
}

const clamp = (quantity: number) => Math.min(Math.max(Math.trunc(quantity), 0), MAX_LINE_QUANTITY)

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: ({ productId, variantId, quantity = 1 }) =>
        set((state) => {
          const existing = state.lines.find((line) => line.variantId === variantId)
          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line.variantId === variantId
                  ? { ...line, quantity: clamp(line.quantity + quantity) }
                  : line,
              ),
            }
          }
          return { lines: [...state.lines, { productId, variantId, quantity: clamp(quantity) }] }
        }),
      setQuantity: (variantId, quantity) =>
        set((state) => ({
          lines:
            clamp(quantity) === 0
              ? state.lines.filter((line) => line.variantId !== variantId)
              : state.lines.map((line) =>
                  line.variantId === variantId ? { ...line, quantity: clamp(quantity) } : line,
                ),
        })),
      remove: (variantId) =>
        set((state) => ({ lines: state.lines.filter((line) => line.variantId !== variantId) })),
      clear: () => set({ lines: [] }),
    }),
    { ...persistOptions('cart'), partialize: (state) => ({ lines: state.lines }) },
  ),
)

export const selectItemCount = (state: Pick<CartState, 'lines'>): number =>
  state.lines.reduce((sum, line) => sum + line.quantity, 0)
