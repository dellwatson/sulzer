import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { TouchableOpacity, View, Text } from 'react-native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { Appbar, useTheme, Avatar, Title, Subheading } from 'react-native-paper';
import { HomeScreen } from '../src/home';
import { ProfileScreen } from '../src/profile';
import { TransactionScreen } from '../src/transaction';
import { AttendNavigator } from './attend-navigator';
import { TravelNavigator } from './travel-navigator';
import { ProjectNavigator } from './project-navigator';
import { TeamNavigator } from './team-navigator';


const Stack = createStackNavigator();

export const HomeNavigator = (): React.ReactElement => {
  return (
    <ParentStack backButton={false} sTitle='Robert' sSub='Welcome back'>
      <Stack.Screen name={AppRoute.DASHBOARD} component={HomeScreen} />
      <Stack.Screen name={AppRoute.PROFILE} component={ProfileScreen} />
      <Stack.Screen name={AppRoute.PROJECT} component={ProjectNavigator} />
      <Stack.Screen name={AppRoute.TEAM} component={TeamNavigator} />
      <Stack.Screen name={AppRoute.TRANSACTION} component={TransactionScreen} />
      <Stack.Screen name={AppRoute.TRAVEL} component={TravelNavigator} />
      <Stack.Screen name={AppRoute.ATTENDANCE} component={AttendNavigator} />
    </ParentStack>
  );
}

export const ParentStack = ({ backButton = true, children, sTitle, sSub, }) => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ previous, navigation }) => {
          return (
            !previous &&
            <Appbar.Header
              theme={{ colors: { primary: theme.colors.surface } }}
              style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: backButton ? 0 : 20, paddingRight: 20 }}
            >
              <View style={{ flexDirection: 'row', }}>
                {backButton &&
                  <Appbar.BackAction
                    // style={{ borderWidth: 1 }}
                    onPress={() => navigation.pop()}
                    color='white'
                  />}

                <View style={{ justifyContent: 'center' }}>
                  {sSub && <Subheading style={{ color: 'white' }}>{sSub}</Subheading>}
                  <Title style={{ fontSize: 26, bottom: sSub ? 5 : 0, color: 'white' }}>{sTitle}</Title>
                </View>
              </View>



              <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ marginHorizontal: 5, borderBottomWidth: 1, borderColor: 'white' }}>
                    <Text style={{ color: 'white' }}>Koordinator</Text>
                    {/* change */}
                  </View>

                  <Avatar.Image
                    size={40}
                    source={{
                      uri:
                        'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
                    }}
                  />
                </View>
              </TouchableOpacity>
            </Appbar.Header>
          );
        }
      }} >
      {children}
    </Stack.Navigator>
  )
}


//  ((navigation as any) as DrawerNavigationProp<{}>).openDrawer();



