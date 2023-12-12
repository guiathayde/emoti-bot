import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppProvider } from './hooks';

import { Routes } from './routes';

export function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <Routes />
      </AppProvider>
    </NavigationContainer>
  );
}
