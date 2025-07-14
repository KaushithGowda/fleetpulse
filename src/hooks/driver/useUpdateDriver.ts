import { env } from '@/src/constants/env'

import { axiosPrivate } from '@/src/lib/api/axios'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { showToast } from '@/src/utils/showToast'
import { handleQueryError } from '@/src/utils/handleQueryError'

import { DriverType } from '@/src/types/driver'

export const useUpdateDriver = () => {
    const {
        mutateAsync,
        data,
        error,
        isPending: isLoading,
        isSuccess,
        isError,
    } = useMutation({
        mutationFn: async (driver: DriverType) => {
            const res = await axiosPrivate.put(`${env.apiBaseUrl}/api/drivers/${driver.id}`, driver)
            return res.data
        },
    })

    useEffect(() => {
        if (isSuccess) {
            showToast({
                isSuccess: true,
                successTitle: 'Driver Updated ✅',
                successDesc: 'Driver details have been updated.',
            })
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            handleQueryError(error, 'Driver Update Failed ❌')
        }
    }, [error, isError])

    const updateDriver = async (driver: DriverType) => {
        try {
            await mutateAsync(driver)
            return { success: true }
        } catch (err) {
            return { success: false }
        }
    }

    return {
        updateDriver,
        isLoading,
        isSuccess,
        isError,
        data,
    }
}