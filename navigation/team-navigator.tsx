import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { TeamScreen } from '../src/team';
import { TeamStatusScreen } from '../src/team/status.component';
import { DetailComponent } from '../src/team/detail.component';
import ParentStack from './home.navigator';

const Stack = createStackNavigator();

export const TeamNavigator = (): React.ReactElement => (
    <ParentStack sTitle='Team'>
        <Stack.Screen name={AppRoute.TEAM} component={TeamScreen} />
        <Stack.Screen name={AppRoute.STATUS_TEAM} component={TeamStatusScreen} />
        <Stack.Screen name={AppRoute.DETAIL_TEAM} component={DetailComponent} />
    </ParentStack>
);


// const mapStateToProps = state => {
//     return {
//         session: state.home.DATA
//     }
// }


// export const ProjectNavigator = connect(mapStateToProps)(Navigator)