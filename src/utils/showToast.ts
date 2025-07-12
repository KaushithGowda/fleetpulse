import Toast from 'react-native-toast-message'

type toastType = {
  isError?: boolean
  isSuccess?: boolean
  isLoading?: boolean
  errorMsg?: string
  successMsg?: string
  loadingMsg?: string
}

export function showToast({
  isError,
  isSuccess,
  isLoading,
  errorMsg,
  successMsg,
  loadingMsg,
}: toastType) {
  if (isError) Toast.show({ type: 'error', text1: errorMsg || 'Something went wrong!' })
  else if (isSuccess) Toast.show({ type: 'success', text1: successMsg || 'Success!' })
  else if (isLoading) Toast.show({ type: 'info', text1: loadingMsg || 'Loading...' })
}