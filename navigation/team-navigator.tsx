import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { Appbar, useTheme, Avatar } from 'react-native-paper';
import { TeamScreen } from '../src/team';
import { TeamStatusScreen } from '../src/team/status.component';
import { DetailComponent } from '../src/team/detail.component';

const Stack = createStackNavigator();

export const TeamNavigator = (): React.ReactElement => {
    const theme = useTheme();
    return (
        <Stack.Navigator headerMode='screen'
            screenOptions={{
                header: ({ scene, previous, navigation }) => {
                    const { options } = scene.descriptor;
                    const title = 'XXX'
                    return (
                        <Appbar.Header
                            theme={{ colors: { primary: theme.colors.surface } }}
                        >
                            <Appbar.BackAction
                                onPress={() => navigation.pop()}
                                color={theme.colors.primary}
                            />
                        </Appbar.Header>
                    );
                },
            }}
        >
            <Stack.Screen name={AppRoute.TEAM} component={TeamScreen} />
            <Stack.Screen name={AppRoute.STATUS_TEAM} component={TeamStatusScreen} />
            <Stack.Screen name={AppRoute.DETAIL_TEAM} component={DetailComponent} />
        </Stack.Navigator>
    );
}