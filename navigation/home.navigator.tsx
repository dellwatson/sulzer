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

const Stack = createStackNavigator();


export const HomeNavigator = () => {


  return (
    <ParentStack
      backButton={false}
      // session={session}
      // sTitle={session.isStatus && session.name}
      // sRole={session.isStatus && session.roles[0].name}
      sSub='Welcome back'
      screenRoute='Home'
    >

      <Stack.Screen name={AppRoute.DASHBOARD} component={HomeScreen} />
      <Stack.Screen name={AppRoute.TEST_TEAM} component={TeamNavigator} />

      <Stack.Screen name={AppRoute.PROFILE} component={ProfileScreen} />
      <Stack.Screen name={AppRoute.PROJECT} component={ProjectNavigator} />
      <Stack.Screen name={AppRoute.TRANSACTION} component={TransNavigator} />
      <Stack.Screen name={AppRoute.TRAVEL} component={TravelNavigator} />
      <Stack.Screen name={AppRoute.ATTENDANCE} component={AttendNavigator} />
    </ParentStack>
  );
}

// export const HomeNavigator = connect(mapStateToProps)(MainNavigator)


const ParentStack = (props) => {
  const { backButton = true, children, sTitle, sSub, screenRoute, } = props

  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ previous, navigation }) => {
          return (
            !previous && <CustomHeader
              backButton={backButton}
              sTitle={sTitle}
              // session={session}
              sSub={sSub}
              screenRoute={screenRoute}

            />
          );
        }
      }} >
      {children}
    </Stack.Navigator>
  )
}

// export const Header

export default ParentStack


//  ((navigation as any) as DrawerNavigationProp<{}>).openDrawer();



