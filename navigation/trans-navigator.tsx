import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { DetailComponent } from '../src/travel/detail.component';
import { TravelScreen } from '../src/travel';
import { Appbar, useTheme, Avatar } from 'react-native-paper';

const Stack = createStackNavigator();

export const TransNavigator = (): React.ReactElement => {
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
            <Stack.Screen name={AppRoute.TRANSACTION} component={TravelScreen}/>
            <Stack.Screen name={AppRoute.DETAIL_TRANSACTION} component={DetailComponent}/>
        </Stack.Navigator>
    );
}


