import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { DetailComponent } from '../src/transaction/detail.component';
import { TransactionScreen } from '../src/transaction';
import ParentStack from './home.navigator';

const Stack = createStackNavigator();

export const TransNavigator = (): React.ReactElement => (
    <ParentStack sTitle='Transaction'>
        <Stack.Screen name={AppRoute.TRANSACTION} component={TransactionScreen} />
        <Stack.Screen name={AppRoute.DETAIL_TRANSACTION} component={DetailComponent} />
    </ParentStack>
);
