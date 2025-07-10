import { useAuthStore } from '@/src/store/useAuthStore'
import { axiosPublic } from '@/src/lib/api/axios'
import { useMutation } from '@tanstack/react-query'

export const useCredentialsLogin = () => {

  const {
    mutateAsync,
    isPending: isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const res = await axiosPublic.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/mobile-login`,
        { email, password }
      )
      return res.data
    },
    onSuccess: (data) => {
      const { token, user } = data
      if (token && user) {
        useAuthStore.getState().setAuth(token, user)
        // router.replace('/(tabs)/maps')
      }
    },
  })

  const login = async (email: string, password: string) => {
    try {
      await mutateAsync({ email, password })
      return { success: true }
    } catch (err) {
      console.error(err)
      return { success: false }
    }
  }

  return {
    login,
    error: isError ? (error as any)?.response?.data?.error || 'Something went wrong' : null,
    success: isSuccess ? 'Login successful' : null,
    isLoading,
  }
}
