import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

export const ToastProvider = () => {
    const insets = useSafeAreaInsets();
    return <Toast topOffset={insets.top}/>
}