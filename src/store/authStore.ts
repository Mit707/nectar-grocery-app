import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isOnboarded: boolean
  login: (user: User) => void
  logout: () => void
  setOnboarded: () => void
  updateUser: (partial: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isOnboarded: false,

      login: (user) => set({ user, isAuthenticated: true }),

      logout: () => set({ user: null, isAuthenticated: false }),

      setOnboarded: () => set({ isOnboarded: true }),

      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),
    }),
    {
      name: 'nectar-auth',
    },
  ),
)
