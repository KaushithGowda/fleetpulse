import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'

import { axiosPrivate } from '@/src/lib/api/axios'

import { env } from '@/src/constants/env'

import { handleQueryError } from '@/src/utils/handleQueryError'

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
      const res = await axiosPrivate.get(`${env.apiBaseUrl}/api/stats`)
      return res.data
    },
  })

  useEffect(() => {
    if (isError) handleQueryError(error, 'Stats Fetch Failed⚠️')
  }, [error, isError])

  return {
    stats: data,
    isLoading,
    isError,
    isSuccess,
  }
}