import Toast from 'react-native-toast-message'

type toastType = {
  isError?: boolean
  isSuccess?: boolean
  isLoading?: boolean
  errorTitle?: string
  errorDesc?: string
  successTitle?: string
  successDesc?: string
  loadingMsg?: string
}

export function showToast({
  isError,
  isSuccess,
  isLoading,
  errorTitle,
  errorDesc,
  successTitle,
  successDesc,
  loadingMsg,
}: toastType) {
  if (isError) Toast.show({ type: 'error', text1: errorTitle || 'Something went wrong⚠️', text2: errorDesc || '' })
  else if (isSuccess) Toast.show({ type: 'success', text1: successTitle || 'Success 🙌', text2: successDesc || '' })
  else if (isLoading) Toast.show({ type: 'info', text1: loadingMsg || 'Loading...' })
}