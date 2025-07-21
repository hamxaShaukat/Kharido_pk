"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  quantity: number;
  stock: number; // Add stock tracking
}

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  notifications: {
    id: string;
    message: string;
    type: "success" | "error" | "warning";
  }[];

  // Actions
  addToCart: (product: Omit<CartItem, "quantity">) => boolean;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => boolean;
  clearCart: () => void;

  // Computed values
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: string) => number;
  getCartItem: (productId: string) => CartItem | undefined;

  // Notifications
  addNotification: (
    message: string,
    type: "success" | "error" | "warning"
  ) => void;
  removeNotification: (id: string) => void;

  // Utility
  setLoading: (loading: boolean) => void;
  updateItemStock: (productId: string, newStock: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      notifications: [],

      addToCart: (product) => {
        const state = get();
        const existingItem = state.items.find((item) => item.id === product.id);

        if (existingItem) {
          // Check if we can add one more
          if (existingItem.quantity >= existingItem.stock) {
            get().addNotification(
              `Cannot add more ${product.name}. Only ${existingItem.stock} available in stock.`,
              "warning"
            );
            return false;
          }

          // If item exists and stock allows, increase quantity
          set((state) => ({
            items: state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }));
          get().addNotification(`Added ${product.name} to cart`, "success");
          return true;
        } else {
          // Check if product has stock
          if (product.stock <= 0) {
            get().addNotification(`${product.name} is out of stock`, "error");
            return false;
          }

          // If item doesn't exist, add it with quantity 1
          set((state) => ({
            items: [...state.items, { ...product, quantity: 1 }],
          }));
          get().addNotification(`Added ${product.name} to cart`, "success");
          return true;
        }
      },

      removeFromCart: (productId) => {
        const item = get().items.find((item) => item.id === productId);
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
        if (item) {
          get().addNotification(`Removed ${item.name} from cart`, "success");
        }
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return true;
        }

        const item = get().items.find((item) => item.id === productId);
        if (!item) return false;

        // Check stock limit
        if (quantity > item.stock) {
          get().addNotification(
            `Cannot add more ${item.name}. Only ${item.stock} available in stock.`,
            "warning"
          );
          return false;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }));
        return true;
      },

      clearCart: () => {
        set({ items: [] });
        get().addNotification("Cart cleared", "success");
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemQuantity: (productId) => {
        const item = get().items.find((item) => item.id === productId);
        return item ? item.quantity : 0;
      },

      getCartItem: (productId) => {
        return get().items.find((item) => item.id === productId);
      },

      addNotification: (message, type) => {
        const id = Math.random().toString(36).substr(2, 9);
        set((state) => ({
          notifications: [...state.notifications, { id, message, type }],
        }));

        // Auto remove after 3 seconds
        setTimeout(() => {
          get().removeNotification(id);
        }, 3000);
      },

      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((notif) => notif.id !== id),
        }));
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      updateItemStock: (productId, newStock) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === productId) {
              // If new stock is less than current quantity, adjust quantity
              const adjustedQuantity = Math.min(item.quantity, newStock);
              if (adjustedQuantity < item.quantity) {
                get().addNotification(
                  `${item.name} quantity adjusted due to stock changes`,
                  "warning"
                );
              }
              return { ...item, stock: newStock, quantity: adjustedQuantity };
            }
            return item;
          }),
        }));
      },
    }),
    {
      name: "ecostore-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// Selectors for better performance
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartTotalItems = () =>
  useCartStore((state) => {
    const items = state.items;
    return items.reduce((total, item) => total + item.quantity, 0);
  });
export const useCartTotalPrice = () =>
  useCartStore((state) => state.getTotalPrice());
export const useCartActions = () =>
  useCartStore((state) => ({
    addToCart: state.addToCart,
    removeFromCart: state.removeFromCart,
    updateQuantity: state.updateQuantity,
    clearCart: state.clearCart,
  }));
export const useCartNotifications = () =>
  useCartStore((state) => state.notifications);