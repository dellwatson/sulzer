import React from 'react';
import { AsyncStorage } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { AuthNavigator } from './auth.navigator';
import { DashboardNavigator } from './dashboard-navigator';
import { connect } from 'react-redux'
import { ProfileScreen } from '../src/profile';
import { setAccessToken } from '../src/auth/action'

const mapStateToProps = state => {
  return {
    auth: state.auth.token
  }
}

const Stack = createStackNavigator();

const AppNavigator = (props): React.ReactElement => {


  // React.useEffect(() => {
  //   const _retrieveData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('@login');
  //       if (value !== null) {
  //         props.setAccessToken(value)
  //       }
  //     } catch (error) {
  //       // Error retrieving data
  //     }
  //   };

  //   _retrieveData()
  // }, [])

  return (
    <Stack.Navigator {...props} headerMode='none'>

      {
        props.auth ?
          <Stack.Screen name={AppRoute.PROFILE} component={DashboardNavigator} />
          :
          <Stack.Screen name={AppRoute.AUTH} component={AuthNavigator} />
      }
    </Stack.Navigator>
  );
}

export default connect(mapStateToProps, { setAccessToken })(AppNavigator)

// langsung signInScreen ?