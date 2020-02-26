import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { AuthNavigator } from './auth.navigator';
import { HomeNavigator } from './home.navigator';
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    auth: state.auth.token
  }
}

const Stack = createStackNavigator();

const AppNavigator = (props): React.ReactElement => {

  return (
    <Stack.Navigator {...props} headerMode='none'>
      {
        props.auth ?
          <Stack.Screen name={AppRoute.HOME} component={HomeNavigator} />
          :
          <Stack.Screen name={AppRoute.AUTH} component={AuthNavigator} />
      }
    </Stack.Navigator>
  );
}

export default connect(mapStateToProps)(AppNavigator)

// langsung signInScreen ?