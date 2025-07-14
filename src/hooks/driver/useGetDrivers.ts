import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { axiosPrivate } from '@/src/lib/api/axios'

import { env } from '@/src/constants/env'

import { handleQueryError } from '@/src/utils/handleQueryError'

type UseGetDriversParams = {
    search?: string
    limit?: number
    offset?: number
}

export const useGetDrivers = ({
    search = '',
    limit = 10,
    offset = 0,
}: UseGetDriversParams) => {
    const {
        data,
        error,
        isLoading,
        isError,
        isSuccess,
        refetch
    } = useQuery({
        queryKey: ['drivers', search, limit, offset],
        queryFn: async () => {
            const res = await axiosPrivate.get(`${env.apiBaseUrl}/api/drivers`, {
                params: {
                    search,
                    limit: Number(limit),
                    offset: Number(offset),
                },
            })
            return res.data
        },
        placeholderData: (prev) => prev ?? { data: [], total: 0 },
        staleTime: 1000 * 5
    })

    useEffect(() => {
        if (isError) handleQueryError(error, 'Failed to get drivers⚠️')
    }, [error, isError])

    return {
        drivers: data?.data || [],
        total: data?.total || 0,
        refetch,
        isLoading,
        isError,
        isSuccess,
    }
}