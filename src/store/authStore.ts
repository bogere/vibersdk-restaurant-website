import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@shared/types';
interface AuthState {
  user: User | null;
  isAuthDialogOpen: boolean;
  login: (user: User) => void;
  logout: () => void;
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
}
// Mock user for demonstration purposes
export const MOCK_USER: User = {
  id: 'user_1',
  name: 'Alex Ryder',
  email: 'alex.ryder@example.com',
};
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthDialogOpen: false,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      openAuthDialog: () => set({ isAuthDialogOpen: true }),
      closeAuthDialog: () => set({ isAuthDialogOpen: false }),
    }),
    {
      name: 'aetheria-eatery-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);