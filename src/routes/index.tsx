import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Classes } from '../screens/Classes';
import { FacialRecognition } from '../screens/FacialRecognition';
import { About } from '../screens/About';
import { Chat } from '../screens/Chat';

export type AppNativeStackNavigatorProps = {
  Home: undefined;
  Classes: undefined;
  FacialRecognition: undefined;
  About: undefined;
  Chat: undefined;
};

const App = createNativeStackNavigator<AppNativeStackNavigatorProps>();

export const Routes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <App.Screen name="Home" component={Home} />
      <App.Screen name="Classes" component={Classes} />
      <App.Screen name="FacialRecognition" component={FacialRecognition} />
      <App.Screen name="About" component={About} />
      <App.Screen name="Chat" component={Chat} />
    </App.Navigator>
  );
};
