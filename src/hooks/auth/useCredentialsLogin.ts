import { env } from '@/src/constants/env'

import { useAuthStore } from '@/src/store/useAuthStore'

import { axiosPublic } from '@/src/lib/api/axios'
import { useMutation } from '@tanstack/react-query'

import { showToast } from '@/src/utils/showToast'

export const useCredentialsLogin = () => {

  const {
    mutateAsync,
    isPending: isLoading,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const res = await axiosPublic.post(
        `${env.apiBaseUrl}/auth/login`,
        { email: email.trim().toLowerCase(), password },
      )
      return res.data
    },
    onSuccess: (data) => {
      const { token, user } = data
      if (token && user) {
        useAuthStore.getState().setAuth(token, user)
        showToast({ isSuccess: true, successTitle: 'Logged In✅', successDesc: 'Welcome back buddy' })
      }
    },
  })

  const login = async (email: string, password: string) => {
    try {
      await mutateAsync({ email, password })
      return { success: true }
    } catch (err) {
      const rawErrors = (err as any)?.response?.data?.error
      let errorMessage = 'Something went wrong'
      if (Array.isArray(rawErrors) && rawErrors.length > 0) {
        errorMessage = rawErrors[0].message
      } else if (typeof rawErrors === 'string') {
        errorMessage = rawErrors
      }
      showToast({ isError: true, errorTitle: 'Login Failed⚠️', errorDesc: errorMessage })
      return { success: false }
    }
  }

  return {
    login,
    isLoading,
    isSuccess,
    isError
  }
}
