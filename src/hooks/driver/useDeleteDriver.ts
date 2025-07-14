import { env } from '@/src/constants/env'

import { axiosPrivate } from '@/src/lib/api/axios'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { showToast } from '@/src/utils/showToast'
import { handleQueryError } from '@/src/utils/handleQueryError'

export const useDeleteDriver = () => {
    const {
        mutateAsync,
        data,
        error,
        isPending: isLoading,
        isSuccess,
        isError,
    } = useMutation({
        mutationFn: async (id: string) => {
            const res = await axiosPrivate.delete(`${env.apiBaseUrl}/api/drivers/${id}`)
            return res.data
        },
    })

    useEffect(() => {
        if (isSuccess) {
            showToast({
                isSuccess: true,
                successTitle: 'Driver Deleted ✅',
                successDesc: 'Driver has been removed.',
            })
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            handleQueryError(error, 'Driver Deletion Failed ❌')
        }
    }, [error, isError])

    const deleteDriver = async (id: string) => {
        try {
            await mutateAsync(id)
            return { success: true }
        } catch (err) {
            return { success: false }
        }
    }

    return {
        deleteDriver,
        isLoading,
        isSuccess,
        isError,
        data,
    }
}