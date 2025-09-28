import { create } from 'zustand';
interface CheckoutState {
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}
export const useCheckoutStore = create<CheckoutState>((set) => ({
  isCheckoutOpen: false,
  openCheckout: () => set({ isCheckoutOpen: true }),
  closeCheckout: () => set({ isCheckoutOpen: false }),
}));