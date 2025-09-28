import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Product } from '@shared/types';
import { toast } from 'sonner';
interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  setDrawerOpen: (isOpen: boolean) => void;
}
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
        toast.success(`${product.name} added to cart!`);
      },
      removeItem: (productId) => {
        const { items } = get();
        const itemToRemove = items.find(item => item.id === productId);
        if (itemToRemove) {
            toast.error(`${itemToRemove.name} removed from cart.`);
        }
        set({
          items: items.filter((item) => item.id !== productId),
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
        } else {
          set({
            items: get().items.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            ),
          });
        }
      },
      clearCart: () => {
        set({ items: [] });
        toast.info('Cart cleared.');
      },
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
      setDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),
    }),
    {
      name: 'aetheria-eatery-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
// Selectors
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartTotalItems = () => useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));
export const useCartTotalPrice = () => useCartStore((state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0));
export const useIsCartDrawerOpen = () => useCartStore((state) => state.isDrawerOpen);