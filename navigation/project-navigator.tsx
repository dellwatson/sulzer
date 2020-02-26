import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { ProjectScreen } from '../src/project';
import ParentStack from './home.navigator';
import { connect } from 'react-redux'

const Stack = createStackNavigator();


const Navigator = ({ session }): React.ReactElement => {
    return (
        <ParentStack
            sTitle='Project'
            sSub='1 New Project' >
            <Stack.Screen name={AppRoute.PROJECT} component={ProjectScreen} />
        </ParentStack>

    );
}

const mapStateToProps = state => {
    return {
        session: state.home.DATA
    }
}


export const ProjectNavigator = connect(mapStateToProps)(Navigator)

