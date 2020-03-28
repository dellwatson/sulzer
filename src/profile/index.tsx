import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, StatusBar, Image, ScrollView } from 'react-native';
import { Surface, Snackbar, Appbar, Avatar, Title, Caption, Button, useTheme, Subheading } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector, StatusBall, AvatarText } from '../../components/util.component'
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '@react-navigation/stack';
import { connect } from 'react-redux'
import { getProjects } from '../project/action'
import { getSession } from './action'
import { resetAuth } from '../auth/action'
import { ModalAttendanceRedux } from '../attendance';

const { width, height } = Dimensions.get('window');
const SPACE = 20

const Screen = (props) => {

  const theme = useTheme();

  const {
    project,
    session,
    // koor,
    navigation } = props;
  const EMPTY = project.length === 0

  const [modal, showModal] = React.useState(false)


  useEffect(() => {
    // console.log('screen load')
    props.getProjects()
    props.getSession()
  }, [])

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     props.getProjects()

  //   });
  //   return unsubscribe;
  // }, [navigation]);

  return (
    <LinearGradient
      colors={['#5FA1FC', '#EDEFF1']}
      locations={[0.5, 0.5]}
      style={{ flex: 1 }}>

      <StatusBar barStyle="light-content" />

      <View style={{ height: 80, justifyContent: 'flex-end', zIndex: 1, }}>
        <Appbar style={{ elevation: 0, justifyContent: 'space-between', width: '100%', borderWidth: 0 }}>

          {/* TODO: change */}
          <View
          />

          <TouchableOpacity
            onPress={() => props.resetAuth()} // 
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Text style={{ color: 'white', marginRight: 10, fontWeight: 'bold' }}>Logout</Text>
            <Image
              style={{ height: 24, width: 24, marginRight: 10 }}
              source={require('../../assets/logout.png')}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </Appbar>
      </View>


      <View style={{ backgroundColor: 'white', borderRadius: 30, height: height / 2, alignItems: 'center', zIndex: 2, elevation: 4, top: 50, flex: 1 }}>

        {session.isStatus &&
          session.image &&
          <Avatar.Image
            style={{ bottom: 50, }}
            size={100}
            source={{
              uri: session.image
            }}
          />}

        {session.isStatus &&
          !session.image &&
          <Avatar.Text
            style={{
              bottom: 50,
              backgroundColor: 'grey'
            }}
            size={100}
            color='white'
            label={session.name.split(" ").map((n) => n[0]).join(".")}
          />}

        {!session.isStatus &&
          <Avatar.Text
            style={{
              bottom: 50,
              backgroundColor: 'grey'
            }}
            size={100}
            color='white'
          />}


        <View style={{
          bottom: 50, alignItems: 'center',
          // backgroundColor: 'red',
          borderColor: '#eee',
          borderBottomWidth: 1, width: '100%', paddingBottom: 20,
          // elevation: 2
        }}>
          <View style={{ alignItems: 'center' }}>

            <Title>{session.name}</Title>
            <View style={{
              borderColor: 'red',
              borderTopWidth: 0, padding: 2, alignItems: 'center', justifyContent: 'center'
            }}>
              {/* <Caption>{session.role}</Caption> */}
              {/* <Caption>Koor</Caption> */}
            </View>

            <Subheading style={{ color: 'grey' }}>NIK: API-REQUIRED</Subheading>
          </View>
        </View>


        {/* status */}
        {project.isStatus &&
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'row', justifyContent: 'space-between',
              paddingTop: 10,
              paddingBottom: 60,

            }}
            style={{
              width: '100%',
              // padding: '5%',
              paddingHorizontal: '5%'
            }}>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Project')}
              style={{
                elevation: 2,
                borderRadius: 10,
                width: width / 2.5,
                padding: 20,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                resizeMode='contain'
                source={require('../../assets/project_ic.png')} />
              <Title style={{ color: theme.colors.primary, marginTop: 5 }}>Project</Title>
            </TouchableOpacity>



            <TouchableOpacity
              onPress={() => showModal(true)}
              style={{
                elevation: 2,
                borderRadius: 10,
                width: width / 2.5,
                padding: 20,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                resizeMode='contain'
                source={require('../../assets/attendance_ic.png')} />
              <Title style={{ color: theme.colors.primary, marginTop: 5 }}>Attendance</Title>
            </TouchableOpacity>
          </ScrollView>
        }

      </View>

      {project.isStatus &&
        <ModalAttendanceRedux
          open={modal}
          onClose={() => showModal(false)}
        />}
    </LinearGradient>
  );
}


const mapStateToProps = state => {
  return {
    // koor: state.auth.koor,
    session: state.profile.DATA,
    project: state.project.DATA //arr,

  }
}

export const ProfileScreen = connect(mapStateToProps, {
  getProjects,
  getSession,
  resetAuth
  //logout
})(Screen)

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
