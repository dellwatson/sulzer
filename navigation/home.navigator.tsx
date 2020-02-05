import React from 'react';
import { RouteProp } from '@react-navigation/core';
import {TouchableOpacity} from 'react-native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { Appbar, useTheme, Avatar } from 'react-native-paper';
import { HomeScreen } from '../src/home';
import { ProfileScreen } from '../src/profile';
import { ProjectScreen } from '../src/project';
import { TeamScreen } from '../src/team';
import { TransactionScreen } from '../src/transaction';
import { TravelScreen } from '../src/travel';
import { AttendanceScreen } from '../src/attendance';
import { AttendNavigator } from './attend-navigator';
import { TravelNavigator } from './travel-navigator';
import { ProjectNavigator } from './project-navigator';
import { TeamNavigator } from './team-navigator';


const Stack = createStackNavigator();

export const HomeNavigator = (): React.ReactElement => {
  const theme = useTheme();
    
    return (
    <Stack.Navigator
      // initialRouteName="FeedList"
      headerMode="screen"
      screenOptions={{
      header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          // console.log('options ' + options.title)
        const title = 'XXX'
        //   options.headerTitle !== undefined
        //     ? options.headerTitle
        //     : options.title !== undefined
        //     ? options.title
        //     : scene.route.name;

        return (
          !previous && <Appbar.Header
            theme={{ colors: { primary: theme.colors.surface } }}
          >
            {previous &&
              <Appbar.BackAction
                onPress={() => navigation.pop()}
                color={theme.colors.primary}
              />  }
            
            <Appbar.Content
              title={ title
                // title === 'Feed' ? (
                //   <MaterialCommunityIcons
                //     style={{ marginRight: 10 }}
                //     name="twitter"
                //     size={40}
                //     color={theme.colors.primary}
                //   />
                // ) : (
                //   title
                // )
              }
              titleStyle={{
                fontSize: 18,
                fontWeight: 'bold',
                color: theme.colors.primary,
              }}
                />
                

            <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => navigation.navigate('Profile')}
              >
                <Avatar.Image
                  size={40}
                  source={{
                    uri:
                      'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
                  }}
                />
              </TouchableOpacity>

          </Appbar.Header>
        );
      },
    }}
    >
        <Stack.Screen name={AppRoute.DASHBOARD} component={HomeScreen} />
        <Stack.Screen name={AppRoute.PROFILE} component={ProfileScreen} />
        <Stack.Screen name={AppRoute.PROJECT} component={ProjectNavigator} />
        <Stack.Screen name={AppRoute.TEAM} component={TeamNavigator} />
        <Stack.Screen name={AppRoute.TRANSACTION} component={TransactionScreen} />
        <Stack.Screen name={AppRoute.TRAVEL} component={TravelNavigator} />
        <Stack.Screen name={AppRoute.ATTENDANCE} component={AttendNavigator} />
  </Stack.Navigator>
    );
 }

//  ((navigation as any) as DrawerNavigationProp<{}>).openDrawer();



