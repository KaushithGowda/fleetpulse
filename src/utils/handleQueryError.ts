import { showToast } from "@/src/utils/showToast"

export const handleQueryError = (err: any, title = 'Error') => {
    const raw = err?.response?.data?.error
    const msg = typeof raw === 'string' ? raw : raw?.[0]?.message ?? 'Unexpected error'
    showToast({ isError: true, errorTitle: title, errorDesc: msg })
}