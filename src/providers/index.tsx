import { ReactNode } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider, Portal } from "react-native-paper";

import { ReactQueryProvider } from "@/src/providers/ReactQueryProvider";
import { ToastProvider } from '@/src/providers/toast-provider';

import LoadingOverlay from "@/src/components/LoadingOverlay/LoadingOverlay";

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <Portal.Host>
          <ReactQueryProvider>
            <LoadingOverlay />
            {children}
          </ReactQueryProvider>
          <ToastProvider />
        </Portal.Host>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};