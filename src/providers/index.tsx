import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { ToastProvider } from "./toast-provider";
import { ReactNode } from 'react';
import { PaperProvider, Portal } from "react-native-paper";

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <Portal.Host>
          <ReactQueryProvider>
            <ToastProvider />
            {children}
          </ReactQueryProvider>
        </Portal.Host>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};