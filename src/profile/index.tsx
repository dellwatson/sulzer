import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { Surface, Snackbar, Appbar, Avatar, Title, Caption, Button, useTheme } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector, StatusBall, AvatarText } from '../../components/util.component'
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '@react-navigation/stack';
const { width, height } = Dimensions.get('window');
const SPACE = 20

export const ProfileScreen = (props) => {
  const theme = useTheme();

  return (
    <LinearGradient
      colors={['grey', 'grey']}
      locations={[0.5, 0.5]}
      style={{ flex: 1 }}>

      <StatusBar barStyle="light-content" />

      <View style={{ height: 80, justifyContent: 'flex-end', zIndex: 1 }}>
        <Appbar style={{ backgroundColor: 'grey' }}>
          <Appbar.BackAction
            onPress={() => props.navigation.pop()}
            color='white'
          />
        </Appbar>
      </View>


      <View style={{ backgroundColor: 'white', borderRadius: 10, height: height / 2, alignItems: 'center', zIndex: 2 }}>
        <Avatar.Image
          style={{ bottom: 20, }}
          size={80}
          source={{
            uri:
              'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
          }}
        />
        <View style={{ flex: 1, bottom: 20, alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }}>

            <Title> Robert </Title>
            <View style={{ borderColor: 'red', borderTopWidth: 1, padding: 2, alignItems: 'center', justifyContent: 'center' }}>
              <Caption>Staff</Caption>
            </View>

            <Text>NIK: 022132132211</Text>
          </View>
        </View>



        <Button
          style={{ marginBottom: 20 }}
          mode="contained" onPress={() => console.log('as')}>
          Logout
      </Button>
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  surface: {
    elevation: 2,
    margin: SPACE,
    borderRadius: 5,
    padding: 10,
    height: 40,
    width: width / 2 - (SPACE * 2)
  },
  container: {
    flex: 1,
    paddingTop: SPACE,
    // justifyContent: 'center',
    backgroundColor: 'red'
  },
  text: {
    textAlign: 'center',
  },
  bottom: {
    // position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
