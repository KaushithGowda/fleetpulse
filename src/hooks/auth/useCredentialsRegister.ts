import { env } from '@/src/constants/env'

import { useAuthStore } from '@/src/store/useAuthStore'

import { axiosPublic } from '@/src/lib/api/axios'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { showToast } from '@/src/utils/showToast'
import { handleQueryError } from '@/src/utils/handleQueryError'

export const useCredentialsRegister = () => {

    const {
        mutateAsync,
        data,
        error,
        isPending: isLoading,
        isSuccess,
        isError,
    } = useMutation({
        mutationFn: async ({ name, email, password }: { name: string; email: string; password: string }) => {
            const res = await axiosPublic.post(
                `${env.apiBaseUrl}/auth/register`,
                { name: name.trim().toLowerCase(), email: email.trim().toLowerCase(), password }
            )
            return res.data
        },
    })

    useEffect(() => {
        if (isSuccess && data?.token && data?.user) {
            const { token, user } = data
            useAuthStore.getState().setAuth(token, user)
            showToast({ isSuccess: true, successTitle: 'Welcome to our community👯‍♀️', successDesc: 'We are going to have a lot of fun together' })
        }
    }, [isSuccess, data])

    useEffect(() => {
        if (isError) {
            handleQueryError(error, 'Registration Failed⚠️')
        }
    }, [isError, error])

    const register = async (name: string, email: string, password: string) => {
        try {
            await mutateAsync({ name, email, password })
            return { success: true }
        } catch {
            return { success: false }
        }
    }

    return {
        register,
        isLoading,
        isSuccess,
        isError
    }
}