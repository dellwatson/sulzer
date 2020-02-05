import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { DetailComponent } from '../src/attendance/detail.component';
import { AttendanceScreen } from '../src/attendance';
import { ParentStack } from './home.navigator';

const Stack = createStackNavigator();

export const AttendNavigator = (): React.ReactElement => (
    <ParentStack sTitle='Attendance' >
        <Stack.Screen name={AppRoute.ATTENDANCE} component={AttendanceScreen} />
        <Stack.Screen name={AppRoute.DETAIL_ATTEND} component={DetailNavigator} />
    </ParentStack>
);

export const DetailNavigator = (): React.ReactElement => (
    <ParentStack sTitle='Attendance' >
        <Stack.Screen name={AppRoute.DETAIL_ATTEND} component={DetailComponent} />
    </ParentStack>
);

