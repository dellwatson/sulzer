import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar, Button, Title, Avatar, Appbar, useTheme, Subheading } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'

const { width, height } = Dimensions.get('window');
const SPACE = 20

export const AvatarText = ({ name, job, imgSource }) => (
  <View style={{ paddingRight: 10 }}>

    {imgSource &&
      <Avatar.Image
        size={50}
        source={{
          uri:
            imgSource,
        }}
      />
    }

    {!imgSource &&
      <Avatar.Text
        size={50}
        label={name.split(" ").map((n) => n[0]).join(".")}
        color='white'
        style={{
          backgroundColor: '#5FA1FC'
        }}
      />
    }

    <View style={{ borderBottomWidth: 2, marginRight: 10, marginTop: 5 }}>
      <Text style={{ fontWeight: 'bold' }}>{name}</Text>
    </View>
    <Text>{job}</Text>
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
      zIndex: 10,
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
    zIndex: 5,
    marginHorizontal: 60,
    // marginBottom:
  }} />
)


// pake memo

const HEADER = ({ backButton = true, sTitle, sSub, screenRoute, session }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const TITLE = screenRoute === 'Home' ? (session.isStatus && session.name) : sTitle

  return (
    <Appbar.Header
      theme={{ colors: { primary: theme.colors.surface } }}
      style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: backButton ? 0 : 20, paddingRight: 20 }}
    >
      <View style={{ flexDirection: 'row', }}>
        {backButton &&
          <Appbar.BackAction
            // style={{ borderWidth: 1 }}
            onPress={() => navigation.goBack()}
            color='white'
          />}

        <View style={{ justifyContent: 'center' }}>
          {sSub && <Subheading style={{ color: 'white' }}>{sSub}</Subheading>}
          <Title style={{ fontSize: 26, bottom: sSub ? 5 : 0, color: 'white' }}>{TITLE}</Title>
        </View>
      </View>



      <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginHorizontal: 5, borderBottomWidth: 1, borderColor: 'white' }}>
            <Text style={{ color: 'white' }}>{session.isStatus && session.role}</Text>
            {/* change */}
          </View>


          {session.isStatus && !session.image &&
            <Avatar.Text
              size={40}
              label={session.name.split(" ").map((n) => n[0]).join(".")}
              color='white'
              style={{
                backgroundColor: 'grey'
              }}
            />
          }

          {session.isStatus && session.image &&
            <Avatar.Image
              size={40}
              source={{
                uri: session.image,
              }}
            />
          }
        </View>
      </TouchableOpacity>
    </Appbar.Header>
  )
}

const mapStateToProps = state => {
  return {
    session: state.home.DATA
  }
}


export const CustomHeader = connect(mapStateToProps)(HEADER)

