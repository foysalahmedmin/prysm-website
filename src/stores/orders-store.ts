import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Order } from '@/domain'
import { persistOptions } from './persist'

export interface OrdersState {
  orders: Order[]
  addOrder: (order: Order) => void
  getOrder: (id: string) => Order | undefined
  getOrderByNumber: (number: string) => Order | undefined
  clearOrders: () => void
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders.filter((o) => o.id !== order.id)],
        })),
      getOrder: (id) => get().orders.find((o) => o.id === id),
      getOrderByNumber: (number) =>
        get().orders.find(
          (o) => o.number.trim().toLowerCase() === number.trim().toLowerCase(),
        ),
      clearOrders: () => set({ orders: [] }),
    }),
    {
      ...persistOptions('orders'),
      partialize: (state) => ({ orders: state.orders }),
    },
  ),
)
