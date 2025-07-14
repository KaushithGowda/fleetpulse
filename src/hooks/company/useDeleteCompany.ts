import { env } from '@/src/constants/env';
import { axiosPrivate } from '@/src/lib/api/axios';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import { showToast } from '@/src/utils/showToast';
import { handleQueryError } from '@/src/utils/handleQueryError';

export const useDeleteCompany = () => {
    const {
        mutateAsync,
        data,
        error,
        isPending: isLoading,
        isSuccess,
        isError,
    } = useMutation({
        mutationFn: async (id: string) => {
            const res = await axiosPrivate.delete(`${env.apiBaseUrl}/api/companies/${id}`);
            return res.data;
        },
    });

    useEffect(() => {
        if (isSuccess) {
            showToast({
                isSuccess: true,
                successTitle: 'Company Deleted ✅',
                successDesc: 'Company has been removed.',
            });
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            handleQueryError(error, 'Company Deletion Failed ❌');
        }
    }, [error, isError]);

    const deleteCompany = async (id: string) => {
        try {
            await mutateAsync(id);
            return { success: true };
        } catch (err) {
            return { success: false };
        }
    };

    return {
        deleteCompany,
        isLoading,
        isSuccess,
        isError,
        data,
    };
};