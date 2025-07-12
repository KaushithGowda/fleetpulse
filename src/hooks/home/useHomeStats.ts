import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { axiosPrivate } from '@/src/lib/api/axios'
import { showToast } from '@/src/utils/showToast'
import { env } from '@/src/constants/env'

export const useHomeStats = () => {
  const {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['home-stats'],
    queryFn: async () => {
      const res = await axiosPrivate.get(`${env.apiBaseUrl}/stats`)
      return res.data
    },
  })

  useEffect(() => {
    if (isError) {
      const rawError = (error as any)?.response?.data?.error
      const errorMessage =
        typeof rawError === 'string'
          ? rawError
          : Array.isArray(rawError) && rawError.length > 0
            ? rawError[0].message
            : 'Failed to load stats'

      showToast({
        isError: true,
        errorTitle: 'Stats Fetch Failed⚠️',
        errorDesc: errorMessage,
      })
    }
  }, [error, isError])

  return {
    stats: data,
    isLoading,
    isError,
    isSuccess,
  }
}