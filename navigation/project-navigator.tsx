import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { ProjectScreen } from '../src/project';
import { ParentStack } from './home.navigator';

const Stack = createStackNavigator();

export const ProjectNavigator = (): React.ReactElement => {
    return (
        <ParentStack sTitle='Project' sSub='1 New Project'>
            <Stack.Screen name={AppRoute.PROJECT} component={ProjectScreen} />
        </ParentStack>

    );
}
