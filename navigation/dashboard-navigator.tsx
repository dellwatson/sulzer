import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { TouchableOpacity, View, Text } from 'react-native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { Appbar, useTheme, Avatar, Title, Subheading } from 'react-native-paper';
import HomeScreen from '../src/home';
import { ProfileScreen } from '../src/profile';
import { TransactionScreen } from '../src/transaction';
import { AttendNavigator } from './attend-navigator';
import { TravelNavigator } from './travel-navigator';
import { ProjectNavigator } from './project-navigator';
import { TeamNavigator } from './team-navigator';
import { TransNavigator } from './trans-navigator';
import { connect } from 'react-redux'
import { CustomHeader } from '../components/util.component';
import { ProjectScreen } from '../src/project';
import { TeamScreen } from '../src/team';
import { AttendanceScreen } from '../src/attendance';

const Stack = createStackNavigator();


export const DashboardNavigator = () => {

    const theme = useTheme()
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: 'white',
                    fontWeight: 'bold',
                },
            }}

        >
            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name={AppRoute.PROFILE}
                component={ProfileScreen} />
            <Stack.Screen

                name={AppRoute.PROJECT}
                component={ProjectScreen} />
            <Stack.Screen
                name={AppRoute.TEAM}
                component={TeamScreen} />
            <Stack.Screen
                name={AppRoute.ATTENDANCE}
                component={AttendanceScreen} />

        </Stack.Navigator>
    );
}




