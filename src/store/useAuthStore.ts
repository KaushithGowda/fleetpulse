import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import * as Keychain from 'react-native-keychain'
import { setupAxiosAuthInterceptor } from '@/src/lib/api/setupAxiosAuthInterceptor'

type AuthStore = {
  user: { id: string; email: string } | null
  hasHydrated: boolean
  setAuth: (token: string, user: AuthStore['user']) => void
  logout: () => void
  setHasHydrated: (value: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      hasHydrated: false,
      setAuth: async (token, user) => {
        await Keychain.setGenericPassword('auth', token, { service: 'auth-token' })
        set({ user })
        setupAxiosAuthInterceptor()
      },
      logout: async () => {
        await Keychain.resetGenericPassword({ service: 'auth-token' })
        set({ user: null })
      },
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: async (key) => {
          try {
            const credentials = await Keychain.getGenericPassword({ service: key })
            return credentials ? JSON.parse(credentials.password) : null
          } catch (e) {
            console.warn('Failed to load user from Keychain:', e)
            return null
          }
        },
        setItem: async (key, value) => {
          try {
            await Keychain.setGenericPassword('auth', JSON.stringify(value), { service: key })
          } catch (e) {
            console.warn('Failed to save user to Keychain:', e)
          }
        },
        removeItem: async (key) => {
          try {
            await Keychain.resetGenericPassword({ service: key })
          } catch (e) {
            console.warn('Failed to remove user from Keychain:', e)
          }
        },
      },
      onRehydrateStorage: () => async (state) => {
        state?.setHasHydrated(true)
        try {
          const tokenCreds = await Keychain.getGenericPassword({ service: 'auth-token' })
          if (tokenCreds) {
            setupAxiosAuthInterceptor()
          }
        } catch (e) {
          console.warn('Failed to rehydrate token:', e)
        }
      },
    }
  )
)