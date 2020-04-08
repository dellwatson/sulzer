import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { NavigationNativeContainer } from '@react-navigation/native';
import AppNavigator from './navigation/app.navigator';
import { AppRoute } from './navigation/app-routes';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store'
import { enableScreens } from 'react-native-screens';

import { NetworkProvider } from './NetworkProvider';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';

enableScreens();

// dsn: 'https://867ea11902384157b3a54708cca5bd5c@sentry.io/5184801'
// 907d52370d274532b7b31351b7d63151da64a1f759f745ea80b797913e4bd57d  token
// sulzer
// sobat-teknologi-zj

Sentry.init({
  dsn: 'https://867ea11902384157b3a54708cca5bd5c@sentry.io/5184801',
  enableInExpoDevelopment: false,
  debug: true
});

Sentry.setRelease(Constants.manifest.version);


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

  React.useEffect(() => {
    const _retrieveData = async () => {
      try {
        const token = await AsyncStorage.getItem('@login');
        if (token !== null) {
          store.dispatch({ type: `SAVE_ACCESS_TOKEN`, token })
        }
      } catch (error) {
        // Error retrieving data
      }
    };

    _retrieveData()
  }, [])

  return (
    <NetworkProvider>
      <ReduxProvider store={store}>
        <PaperProvider {...{ theme }}>
          <NavigationNativeContainer>
            <AppNavigator initialRouteName={isAuthorized ? AppRoute.HOME : AppRoute.AUTH} />
          </NavigationNativeContainer>
        </PaperProvider>
      </ReduxProvider>
    </NetworkProvider>
  );
}

