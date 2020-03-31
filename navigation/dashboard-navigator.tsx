import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { Appbar, useTheme, Avatar, Title, Subheading, Snackbar } from 'react-native-paper';
import { ProfileScreen } from '../src/profile';
import { connect } from 'react-redux'
import { CustomHeader } from '../components/util.component';
import { ProjectScreen } from '../src/project';
import { TeamScreen } from '../src/team';
import { AttendanceScreen } from '../src/attendance';
import { NetworkContext } from '../NetworkProvider'
const { width, height } = Dimensions.get('window');

const Stack = createStackNavigator();

const PRIMARY_COLOR = '#5FA1FC'

export class DashboardNavigator extends React.PureComponent {
    static contextType = NetworkContext;

    render() {
        return (
            <>
                {!this.context.isConnected &&
                    <Snackbar
                        visible={true}
                        onDismiss={() => null}>
                        You're Offline
                    </Snackbar>
                }
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: this.context.isConnected ? PRIMARY_COLOR : 'grey',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            color: 'white',
                            fontWeight: 'bold',
                        },
                        // headerTitle: 'test',
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
            </>
        );
    }
}




