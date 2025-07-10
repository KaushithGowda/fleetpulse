import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'

import * as Google from 'expo-auth-session/providers/google'
import { axiosPublic } from '@/lib/api/axios'
import { useMutation } from '@tanstack/react-query'

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    redirectUri: 'com.thegarage.app:/oauth2redirect',
  })

  const router = useRouter()

  const {
    mutateAsync,
    isPending: isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async (googleAccessToken: string) => {
      const res = await axiosPublic.post('/api/mobile-login/google', {
        token: googleAccessToken,
      })
      return res.data
    },
    onSuccess: (data) => {
      const { token, user } = data
      if (token && user) {
        useAuthStore.getState().setAuth(token, user)
        router.replace('/(tabs)/maps')
      }
    },
  })

  useEffect(() => {
    if (response?.type === 'success') {
      const googleAccessToken = response.authentication?.accessToken
      if (googleAccessToken) {
        const handleGoogleLogin = async () => {
          try {
            await mutateAsync(googleAccessToken)
          } catch (err) {
            console.error('Google login error:', err)
          }
        }
        handleGoogleLogin()
      }
    }
  }, [response])

  return {
    promptAsync,
    request,
    error: isError
      ? (error as any)?.response?.data?.error || 'Something went wrong'
      : null,
    success: isSuccess ? 'Login successful' : null,
    isLoading,
  }
}
