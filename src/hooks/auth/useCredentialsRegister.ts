

import { useAuthStore } from '@/src/store/useAuthStore'
import { axiosPublic } from '@/src/lib/api/axios'
import { useMutation } from '@tanstack/react-query'
import { env } from '@/src/constants/env'

export const useCredentialsRegister = () => {

    const {
        mutateAsync,
        isPending: isLoading,
        isSuccess,
        isError,
        error,
    } = useMutation({
        mutationFn: async ({ name, email, password }: { name: string; email: string; password: string }) => {
            const res = await axiosPublic.post(
                `${env.apiBaseUrl}/auth/register`,
                { name, email, password }
            )
            return res.data
        },
        onSuccess: (data) => {
            const { token, user } = data
            if (token && user) {
                useAuthStore.getState().setAuth(token, user)
            }
        },
    })

    const register = async (name: string, email: string, password: string) => {
        try {
            await mutateAsync({ name, email, password })
            return { success: true }
        } catch (err) {
            console.error(err)
            return { success: false }
        }
    }

    return {
        register,
        error: isError ? (error as any)?.response?.data?.error || 'Something went wrong' : null,
        success: isSuccess ? 'Registration successful' : null,
        isLoading,
    }
}