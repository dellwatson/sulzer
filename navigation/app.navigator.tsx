import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { AuthNavigator } from './auth.navigator';
import { HomeNavigator } from './home.navigator';

const Stack = createStackNavigator();

export const AppNavigator = (props): React.ReactElement => {
  const isLoggedIn = true;

  return (
    <Stack.Navigator {...props} headerMode='none'>
      {/* {
        isLoggedIn ? 
        <Stack.Screen name={AppRoute.HOME} component={HomeNavigator}/>
        :
        <Stack.Screen name={AppRoute.AUTH} component={AuthNavigator} />
    } */}
    <Stack.Screen name={AppRoute.AUTH} component={AuthNavigator}/>
    <Stack.Screen name={AppRoute.HOME} component={HomeNavigator}/>
  </Stack.Navigator>
);
}

// langsung signInScreen ?