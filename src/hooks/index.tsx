import React, { ReactNode } from 'react';
import { PaperProvider } from 'react-native-paper';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return <PaperProvider>{children}</PaperProvider>;
}
