import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { NavigationNativeContainer } from '@react-navigation/native';
import AppNavigator from './navigation/app.navigator';
import { AppRoute } from './navigation/app-routes';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store'
import { enableScreens } from 'react-native-screens';
enableScreens();

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5FA1FC',
    accent: 'white',
    // text: 'red',
    // background: 'green',
    surface: '#5FA1FC',
    placeholder: 'grey',
    // backdrop: 'yellow'
  },
};

export default function App() {
  const isAuthorized: boolean = true;

  return (
    <ReduxProvider store={store}>
      <PaperProvider {...{ theme }}>
        <NavigationNativeContainer>
          <AppNavigator initialRouteName={isAuthorized ? AppRoute.HOME : AppRoute.AUTH} />
        </NavigationNativeContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}

