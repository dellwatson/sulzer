import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { SignInScreen } from '../src/auth';

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.SIGN_IN} component={SignInScreen}/>
  </Stack.Navigator>
);

type AuthNavigatorParams = {
    [AppRoute.SIGN_IN]: undefined;
  }
  
  export interface SignInScreenProps {
    navigation: StackNavigationProp<AuthNavigatorParams, AppRoute.SIGN_IN>;
    route: RouteProp<AuthNavigatorParams, AppRoute.SIGN_IN>;
  }