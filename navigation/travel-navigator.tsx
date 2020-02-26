import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { DetailComponent } from '../src/travel/detail.component';
import { TravelScreen } from '../src/travel';
import ParentStack from './home.navigator';

const Stack = createStackNavigator();

export const TravelNavigator = (): React.ReactElement => (
    <ParentStack sTitle='Travel' sSub='2 Departure'>
        <Stack.Screen name={AppRoute.TRAVEL} component={TravelScreen} />
        <Stack.Screen name={AppRoute.DETAIL_TRAVEL} component={DetailComponent} />
    </ParentStack>
);

// export const DetailNavigator = (): React.ReactElement => (
//     <ParentStack sTitle='Travel' sSub='2 Departure'>
//         <Stack.Screen name={AppRoute.DETAIL_TRAVEL} component={DetailComponent} />
//     </ParentStack>
// );


// const mapStateToProps = state => {
//     return {
//         session: state.home.DATA
//     }
// }


// export const ProjectNavigator = connect(mapStateToProps)(Navigator)