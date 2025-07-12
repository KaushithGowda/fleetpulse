import { env } from '@/src/constants/env'

import { useAuthStore } from '@/src/store/useAuthStore'

import { axiosPublic } from '@/src/lib/api/axios'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { showToast } from '@/src/utils/showToast'
import { handleQueryError } from '@/src/utils/handleQueryError'

export const useCredentialsLogin = () => {

  const {
    mutateAsync,
    data,
    error,
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
  })

  useEffect(() => {
    if (isSuccess && data?.token && data?.user) {
      const { token, user } = data
      useAuthStore.getState().setAuth(token, user)
      showToast({ isSuccess: true, successTitle: 'Logged In✅', successDesc: 'Welcome back buddy!' })
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (isError) handleQueryError(error, 'Login Failed⚠️')
  }, [error, isError])

  const login = async (email: string, password: string) => {
    try {
      await mutateAsync({ email, password })
      return { success: true }
    } catch (err) {
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
