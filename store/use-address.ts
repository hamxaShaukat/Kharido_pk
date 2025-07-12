"use client"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface SavedAddress {
  id: string
  name: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
  createdAt: string
}

interface AddressStore {
  addresses: SavedAddress[]
  selectedAddressId: string | null

  // Actions
  saveAddress: (address: Omit<SavedAddress, "id" | "createdAt">) => string
  updateAddress: (id: string, address: Partial<SavedAddress>) => void
  deleteAddress: (id: string) => void
  setDefaultAddress: (id: string) => void
  selectAddress: (id: string) => void
  getSelectedAddress: () => SavedAddress | null
}

export const useAddressStore = create<AddressStore>()(
  persist(
    (set, get) => ({
      addresses: [],
      selectedAddressId: null,

      saveAddress: (addressData) => {
        const id = Math.random().toString(36).substr(2, 9)
        const newAddress: SavedAddress = {
          ...addressData,
          id,
          createdAt: new Date().toISOString(),
        }

        set((state) => {
          // If this is the first address, make it default
          if (state.addresses.length === 0) {
            newAddress.isDefault = true
          }

          // If this address is set as default, remove default from others
          if (newAddress.isDefault) {
            state.addresses.forEach((addr) => {
              addr.isDefault = false
            })
          }

          return {
            addresses: [...state.addresses, newAddress],
            selectedAddressId: id,
          }
        })

        return id
      },

      updateAddress: (id, updates) => {
        set((state) => ({
          addresses: state.addresses.map((addr) => (addr.id === id ? { ...addr, ...updates } : addr)),
        }))
      },

      deleteAddress: (id) => {
        set((state) => {
          const newAddresses = state.addresses.filter((addr) => addr.id !== id)
          let newSelectedId = state.selectedAddressId

          // If deleted address was selected, select the default one or first one
          if (state.selectedAddressId === id) {
            const defaultAddr = newAddresses.find((addr) => addr.isDefault)
            newSelectedId = defaultAddr ? defaultAddr.id : newAddresses[0]?.id || null
          }

          return {
            addresses: newAddresses,
            selectedAddressId: newSelectedId,
          }
        })
      },

      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((addr) => ({
            ...addr,
            isDefault: addr.id === id,
          })),
        }))
      },

      selectAddress: (id) => {
        set({ selectedAddressId: id })
      },

      getSelectedAddress: () => {
        const state = get()
        return state.addresses.find((addr) => addr.id === state.selectedAddressId) || null
      },
    }),
    {
      name: "ecostore-addresses",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
