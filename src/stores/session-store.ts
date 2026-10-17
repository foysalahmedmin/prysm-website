import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Address, Customer } from '@/domain'
import { persistOptions } from './persist'

export interface SessionState {
  customer: Customer | null
  addresses: Address[]
  isAuthenticated: boolean
  login: (email: string, name?: string) => void
  register: (name: string, email: string) => void
  logout: () => void
  updateProfile: (data: Partial<Omit<Customer, 'id'>>) => void
  addAddress: (address: Omit<Address, 'id'>) => Address
  updateAddress: (id: string, address: Partial<Address>) => void
  deleteAddress: (id: string) => void
  setDefaultAddress: (id: string) => void
  clearSession: () => void
}

const DEFAULT_DEMO_ADDRESSES: Address[] = [
  {
    id: 'addr_demo_1',
    name: 'Elena Rostova',
    line1: '108 Spectral Way',
    line2: 'Suite 4B',
    city: 'Stockholm',
    region: 'Stockholm',
    postcode: '111 22',
    country: 'Sweden',
    phone: '+46 8 123 4567',
    isDefault: true,
  },
]

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      customer: null,
      addresses: DEFAULT_DEMO_ADDRESSES,
      isAuthenticated: false,

      login: (email, name = 'Valued Collector') =>
        set((state) => ({
          isAuthenticated: true,
          customer: {
            id: 'cust_demo_1',
            email: email.trim().toLowerCase(),
            name: state.customer?.name ?? name,
            phone: state.customer?.phone ?? '+46 8 123 4567',
          },
        })),

      register: (name, email) =>
        set({
          isAuthenticated: true,
          customer: {
            id: `cust_${Date.now()}`,
            name: name.trim(),
            email: email.trim().toLowerCase(),
          },
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          customer: null,
        }),

      updateProfile: (data) =>
        set((state) => ({
          customer: state.customer ? { ...state.customer, ...data } : null,
        })),

      addAddress: (address) => {
        const id = `addr_${Date.now()}`
        const newAddr: Address = { ...address, id }
        set((state) => {
          const isFirst = state.addresses.length === 0
          const willBeDefault = address.isDefault || isFirst
          const cleanAddrs = willBeDefault
            ? state.addresses.map((a) => ({ ...a, isDefault: false }))
            : state.addresses
          return {
            addresses: [...cleanAddrs, { ...newAddr, isDefault: willBeDefault }],
          }
        })
        return newAddr
      },

      updateAddress: (id, updated) =>
        set((state) => ({
          addresses: state.addresses.map((a) => {
            if (a.id !== id) {
              return updated.isDefault ? { ...a, isDefault: false } : a
            }
            return { ...a, ...updated }
          }),
        })),

      deleteAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        })),

      setDefaultAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        })),

      clearSession: () =>
        set({
          customer: null,
          addresses: DEFAULT_DEMO_ADDRESSES,
          isAuthenticated: false,
        }),
    }),
    {
      ...persistOptions('session'),
      partialize: (state) => ({
        customer: state.customer,
        addresses: state.addresses,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
