import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  StatusBar

} from 'react-native';

import { TextInput, Title, Subheading, Button, useTheme, Headline } from 'react-native-paper';

import { SignInScreenProps } from '../../navigation/auth.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { FormInput } from '../../components/form-input.component';
import { loginAction, setAccessToken, setKoor } from './action'
import { connect } from 'react-redux'

// const SignInScreen = (props: SignInScreenProps) => {
const SignInScreen = (props) => {

  const [shouldRemember, setShouldRemember] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>(null);
  const [password, setPassword] = React.useState<string>(null);

  const theme = useTheme()

  // const onFormSubmit = (values: SignInData): void => {
  //   navigateHome();
  // };

  const navigateHome = (): void => {
    props.navigation.navigate(AppRoute.HOME);
    //  create global context for AUTH to true
  };

  const doLogin = () => {
    // let form = {
    //   email: username,
    //   password
    // }

    // const body = new FormData();

    // for (const key of Object.keys(form)) {
    //   body.append(key, form[key]);
    // }


    // props.loginAction(body)
    props.setAccessToken(`Bearer eyJpdiI6ImVaVlN4QWFVTHNlMTVHMllDSVwvd1NnPT0iLCJ2YWx1ZSI6IkZ1KzNpd1dBT2QrU1BMd090YXdubUE9PSIsIm1hYyI6IjI5ZDljMGMwZjliOWRjOWJmMjcyNjM1MzQ2ZDAxNzgyOWFlMGNhYTRhNWRlMDg1ZjRlNGU3ZDYxNTc3MTk1Y2QifQ==`)

  }

  const doLogin2 = () => {
    props.setKoor()
    props.setAccessToken(`Bearer eyJpdiI6IkJjOUlBNVdaSWY0ZHlUMkJJeGR5WFE9PSIsInZhbHVlIjoiRFBwWDRhK3l6bzJ1Y2lyeUt3bWNhdz09IiwibWFjIjoiOGM5YmE0ZjQ2YWEyMDQyZGY4NGJkYmU3Yzg4MDZkYmEzOGQ4ZjQzNWZiNTMyMDRmY2JlZTkxZWQwMDNmYmQ3ZSJ9`)
  }




  // React.useEffect(() => {
  //   console.log('useffect')
  //   if (!props.signin_status.isFetching && props.signin_status.isStatus) {
  //     console.log('useffect scope2')

  //     props.setAccessToken(`Bearer ${props.signin_status.token}`)

  //     props.navigation.navigate('Home')
  //     console.log(props.signin_status)
  //     //saveToken
  //     //navigate
  //   }
  // }, [])


  /**
   * login -> succes 
   * saveAccess --> Async
   * 
   * 
   */

  // const onPasswordIconPress = (): void => {
  //   setPasswordVisible(!passwordVisible);
  // };




  return (
    <View style={{ flex: 1, padding: 20, }}>
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
        style={{ marginTop: 20, padding: 5 }}
        //ganti jadi auth true ?
        mode="contained" onPress={() => doLogin()}>
        <Text style={{ color: 'white' }}>Login as Staff - Subrata </Text>
      </Button>
      <Button
        style={{ marginTop: 20, padding: 5 }}
        //ganti jadi auth true ?
        mode="contained" onPress={() => doLogin2()}>
        <Text style={{ color: 'white' }}>Login as Koor - Kadek</Text>
      </Button>

    </View>
  );
};
const mapStateToProps = state => {
  return {
    signin_status: state.auth.signin
  }
}

export default connect(mapStateToProps, { loginAction, setAccessToken, setKoor })(SignInScreen)
