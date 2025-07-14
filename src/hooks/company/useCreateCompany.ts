import { env } from '@/src/constants/env';
import { axiosPrivate } from '@/src/lib/api/axios';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import { showToast } from '@/src/utils/showToast';
import { handleQueryError } from '@/src/utils/handleQueryError';

import { CompanyType } from '@/src/types/company';

export const useCreateCompany = () => {
    const {
        mutateAsync,
        data,
        error,
        isPending: isLoading,
        isSuccess,
        isError,
    } = useMutation({
        mutationFn: async (company: CompanyType) => {
            const res = await axiosPrivate.post(`${env.apiBaseUrl}/api/companies`, company);
            return res.data;
        },
    });

    useEffect(() => {
        if (isSuccess) {
            showToast({
                isSuccess: true,
                successTitle: 'Company Created ✅',
                successDesc: 'Company has been added successfully!',
            });
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            handleQueryError(error, 'Company Creation Failed ❌');
        }
    }, [error, isError]);

    const createCompany = async (company: CompanyType) => {
        try {
            await mutateAsync(company);
            return { success: true };
        } catch (err) {
            return { success: false };
        }
    };

    return {
        createCompany,
        isLoading,
        isSuccess,
        isError,
        data,
    };
};