import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';

import { TextInput, Title, Subheading, Button } from 'react-native-paper';

import { SignInScreenProps } from '../../navigation/auth.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { FormInput } from '../../components/form-input.component';

export const SignInScreen = (props: SignInScreenProps) => {

  const [shouldRemember, setShouldRemember] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>(null);

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
    <View style={{ flex: 1, padding: 20, justifyContent:'center' }}>

      <Title style={{fontWeight:'500', fontSize:30}}>Sulzer</Title>
      <Title style={{fontWeight:'500', fontSize:30}}>Indonesia</Title>
      <Subheading>Attendance</Subheading>

        <TextInput
        label='NIK'
        value={username}
        onChangeText={text => setUsername(text)}
      />
      
        <TextInput
        label='Password'
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <Button 
        //ganti jadi auth true ?
        mode="contained" onPress={() => navigateHome()}>

        Login
      </Button>
  
    </View>
  );
};

