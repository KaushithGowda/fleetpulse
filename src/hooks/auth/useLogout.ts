import { useRouter } from 'expo-router'
import { useAuthStore } from '@/store/useAuthStore'

export const useLogout = () => {
  const router = useRouter()

  const logout = () => {
    useAuthStore.getState().logout()
    router.replace('/(auth)/login')
  }

  return { logout }
}