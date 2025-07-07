import { ReactNode } from 'react';
import { ReactQueryProvider } from './ReactQueryProvider';
import { ToastProvider } from './toast-provider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <GestureHandlerRootView>
      <ReactQueryProvider>
        <ToastProvider />
        {children}
      </ReactQueryProvider>
    </GestureHandlerRootView>
  );
};
