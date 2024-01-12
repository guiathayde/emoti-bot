import React, { ReactNode } from 'react';
import { PaperProvider } from 'react-native-paper';

import { BluetoothProvider } from './bluetooth';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <PaperProvider>
      <BluetoothProvider>{children}</BluetoothProvider>
    </PaperProvider>
  );
}
