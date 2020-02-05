import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationNativeContainer } from '@react-navigation/native';
import { AppNavigator } from './navigation/app.navigator';
import { AppRoute } from './navigation/app-routes';

export default function App() {
  const isAuthorized: boolean = false;

  return (
    <PaperProvider>
      <NavigationNativeContainer>
        <AppNavigator initialRouteName={isAuthorized ? AppRoute.HOME : AppRoute.AUTH}/>
      </NavigationNativeContainer>
    </PaperProvider>
  );
}

