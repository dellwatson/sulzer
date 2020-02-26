import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { DetailComponent } from '../src/travel/detail.component';
import { TravelScreen } from '../src/travel';
import ParentStack from './home.navigator';

const Stack = createStackNavigator();

export const TransNavigator = (): React.ReactElement => (
    <ParentStack sTitle='Transaction'>
        <Stack.Screen name={AppRoute.TRANSACTION} component={TravelScreen} />
        <Stack.Screen name={AppRoute.DETAIL_TRANSACTION} component={DetailNavigator} />
    </ParentStack>
);

export const DetailNavigator = (): React.ReactElement => (
    <ParentStack sTitle='Transaction'>
        <Stack.Screen name={AppRoute.DETAIL_TRANSACTION} component={DetailComponent} />
    </ParentStack>
);



// const mapStateToProps = state => {
//     return {
//         session: state.home.DATA
//     }
// }


// export const ProjectNavigator = connect(mapStateToProps)(Navigator)