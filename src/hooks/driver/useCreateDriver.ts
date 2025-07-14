import { env } from '@/src/constants/env'

import { axiosPrivate } from '@/src/lib/api/axios'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { showToast } from '@/src/utils/showToast'
import { handleQueryError } from '@/src/utils/handleQueryError'

import { DriverType } from '@/src/types/driver'

export const useCreateDriver = () => {
    const {
        mutateAsync,
        data,
        error,
        isPending: isLoading,
        isSuccess,
        isError,
    } = useMutation({
        mutationFn: async (driver: DriverType) => {
            const res = await axiosPrivate.post(`${env.apiBaseUrl}/api/drivers`, driver)
            return res.data
        },
    })

    useEffect(() => {
        if (isSuccess) {
            showToast({
                isSuccess: true,
                successTitle: 'Driver Created ✅',
                successDesc: 'Driver has been added successfully!',
            })
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            handleQueryError(error, 'Driver Creation Failed ❌')
        }
    }, [error, isError])

    const createDriver = async (driver: DriverType) => {
        try {
            await mutateAsync(driver)
            return { success: true }
        } catch (err) {
            return { success: false }
        }
    }

    return {
        createDriver,
        isLoading,
        isSuccess,
        isError,
        data,
    }
}