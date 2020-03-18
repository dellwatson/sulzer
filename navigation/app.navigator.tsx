import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { AuthNavigator } from './auth.navigator';
import { DashboardNavigator } from './dashboard-navigator';
import { connect } from 'react-redux'
import { ProfileScreen } from '../src/profile';

const mapStateToProps = state => {
  return {
    auth: state.auth.token
  }
}

const Stack = createStackNavigator();

const AppNavigator = (props): React.ReactElement => {

  return (
    <Stack.Navigator {...props} headerMode='none'>
      {/* <Stack.Screen name={AppRoute.PROFILE} component={DashboardNavigator} /> */}

      {
        props.auth ?
          <Stack.Screen name={AppRoute.PROFILE} component={DashboardNavigator} />
          :
          <Stack.Screen name={AppRoute.AUTH} component={AuthNavigator} />
      }
    </Stack.Navigator>
  );
}

export default connect(mapStateToProps)(AppNavigator)

// langsung signInScreen ?