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

export const SignInScreen = (props: SignInScreenProps) => {

  const [shouldRemember, setShouldRemember] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>(null);

  const theme = useTheme()

  // const onFormSubmit = (values: SignInData): void => {
  //   navigateHome();
  // };

  const navigateHome = (): void => {
    props.navigation.navigate(AppRoute.HOME);
    //  create global context for AUTH to true
  };

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
        value={username}
        onChangeText={text => setUsername(text)}
        style={{ marginVertical: 10 }}
      />
      <Button
        style={{ marginTop: 20, padding: 5 }}
        //ganti jadi auth true ?
        mode="contained" onPress={() => navigateHome()}>
        <Text style={{ color: 'white' }}>Login</Text>
      </Button>

    </View>
  );
};

