import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar, Button, Title, Avatar } from 'react-native-paper';


const { width, height } = Dimensions.get('window');
const SPACE = 20

export const AvatarText = props => (
  <View style={{ paddingRight: 10 }}>
    <Avatar.Image
      size={50}
      source={{
        uri:
          'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
      }}
    />
    <View style={{ borderBottomWidth: 2, marginRight: 10, marginTop: 5 }}>
      <Text style={{ fontWeight: 'bold' }}>Robert</Text>
    </View>
    <Text>Koordinator</Text>
  </View>
)

export const TitleSmall = props => <Title style={{ fontSize: 16, marginRight: 5 }}>{props.children}</Title>

export const HeaderGroup = props => (
  <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center' }}>
    {/* status, props green red */}
    {props.withStatus && <StatusBall />}

    <Title style={{ marginRight: 10 }}>{props.title}</Title>
    {props.number &&
      <Text>-  {props.number}</Text>
    }
  </View>
)

export const StatusBall = ({ backgroundColor = 'red' }) => <View style={{ width: 15, height: 15, backgroundColor, borderRadius: 50, marginHorizontal: 10 }} />

export const Box = props => (
  <View>
    {props.connector && <BarConnector />}
    <Surface style={{
      borderRadius: 5,
      padding: 20,
      backgroundColor: 'white',
      // zIndex:10,
      // justifyContent: 'flex-start',
      elevation: 2,
      marginHorizontal: 40,
      marginVertical: 20
    }}>
      {props.children}
    </Surface>
  </View>
)

export const BarConnector = props => (
  <View style={{
    position: 'absolute', backgroundColor: 'grey', height: 80, width: 5, top: -30,
    // zIndex: 5,
    marginHorizontal: 60,
    // marginBottom:
  }} />
)
