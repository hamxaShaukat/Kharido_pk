"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  thumbnail: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isLoading: boolean

  // Actions
  addToCart: (product: Omit<CartItem, "quantity">) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void

  // Computed values
  getTotalItems: () => number
  getTotalPrice: () => number
  getItemQuantity: (productId: string) => number
  getCartItem: (productId: string) => CartItem | undefined

  // Utility
  setLoading: (loading: boolean) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      addToCart: (product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)

          if (existingItem) {
            // If item exists, increase quantity
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            }
          } else {
            // If item doesn't exist, add it with quantity 1
            return {
              items: [...state.items, { ...product, quantity: 1 }],
            }
          }
        })
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
          return
        }

        set((state) => ({
          items: state.items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getItemQuantity: (productId) => {
        const item = get().items.find((item) => item.id === productId)
        return item ? item.quantity : 0
      },

      getCartItem: (productId) => {
        return get().items.find((item) => item.id === productId)
      },

      setLoading: (loading) => {
        set({ isLoading: loading })
      },
    }),
    {
      name: "ecostore-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
)

// Selectors for better performance
export const useCartItems = () => useCartStore((state) => state.items)
export const useCartTotalItems = () =>
  useCartStore((state) => {
    const items = state.items;
    return items.reduce((total, item) => total + item.quantity, 0);
  });

export const useCartTotalPrice = () => useCartStore((state) => state.getTotalPrice())
export const useCartActions = () =>
  useCartStore((state) => ({
    addToCart: state.addToCart,
    removeFromCart: state.removeFromCart,
    updateQuantity: state.updateQuantity,
    clearCart: state.clearCart,
  }))
