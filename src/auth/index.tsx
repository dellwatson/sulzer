import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  StatusBar,
  AsyncStorage, Dimensions
} from 'react-native';

import { TextInput, Title, Subheading, Button, useTheme, Headline } from 'react-native-paper';

import { SignInScreenProps } from '../../navigation/auth.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { FormInput } from '../../components/form-input.component';
import { loginAction, setAccessToken, setKoor } from './action'
import { connect } from 'react-redux'
import OfflineBanner from '../../components/OfflineBanner';



const SignInScreen = (props) => {
  const [shouldRemember, setShouldRemember] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>(null);
  const [password, setPassword] = React.useState<string>(null);

  const theme = useTheme()

  const doLogin = () => {
    let form = {
      number: username,
      password
    }

    props.loginAction(form)
  }



  React.useEffect(() => {
    if (!props.signin_status.isFetching && props.signin_status.isStatus) {
      const TOKEN = `Bearer ${props.signin_status.token}`

      const storeData = async () => {
        try {
          await AsyncStorage.setItem('@login', TOKEN)
          await props.setAccessToken(TOKEN)
        } catch (e) {
          // saving error
        }
      }

      storeData()
    }
  }, [props.signin_status])


  return (
    <View style={{ flex: 1, padding: 20, }}>
      <OfflineBanner />
      <StatusBar barStyle="light-content" />
      <View style={{ paddingVertical: 40 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 45, color: theme.colors.primary }}>Sulzer</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 45, color: theme.colors.primary }}>Indonesia</Text>
        <Headline style={{ color: theme.colors.primary }}>Attendance</Headline>
      </View>

      <TextInput
        label='NIK'
        mode='outlined'
        value={username}
        onChangeText={text => setUsername(text)}
      />

      <TextInput
        label='Password'
        mode='outlined'
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
        style={{ marginVertical: 10 }}
      />
      <Button
        disabled={props.signin_status.isFetching}
        style={{ marginTop: 20, padding: 5 }}
        loading={props.signin_status.isFetching}
        //ganti jadi auth true ?
        mode="contained" onPress={() => doLogin()}>
        <Text style={{ color: 'white' }}>Login </Text>
      </Button>

      {props.signin_status.isStatus === false && <Text style={{ fontWeight: 'bold', alignSelf: 'center', color: 'red', margin: 10 }}>Login Error</Text>}

    </View>
  );
};
const mapStateToProps = state => {
  return {
    signin_status: state.auth.signin
  }
}

export default connect(mapStateToProps, { loginAction, setAccessToken, setKoor })(SignInScreen)
