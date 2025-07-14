import { env } from '@/src/constants/env';
import { axiosPrivate } from '@/src/lib/api/axios';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import { showToast } from '@/src/utils/showToast';
import { handleQueryError } from '@/src/utils/handleQueryError';

import { CompanyType } from '@/src/types/company';

export const useUpdateCompany = () => {
    const {
        mutateAsync,
        data,
        error,
        isPending: isLoading,
        isSuccess,
        isError,
    } = useMutation({
        mutationFn: async (company: CompanyType) => {
            const res = await axiosPrivate.put(`${env.apiBaseUrl}/api/companies/${company.id}`, company);
            return res.data;
        },
    });

    useEffect(() => {
        if (isSuccess) {
            showToast({
                isSuccess: true,
                successTitle: 'Company Updated ✅',
                successDesc: 'Company details have been updated.',
            });
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            handleQueryError(error, 'Company Update Failed ❌');
        }
    }, [error, isError]);

    const updateCompany = async (company: CompanyType) => {
        try {
            await mutateAsync(company);
            return { success: true };
        } catch (err) {
            return { success: false };
        }
    };

    return {
        updateCompany,
        isLoading,
        isSuccess,
        isError,
        data,
    };
};