import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, StatusBar, Image, ScrollView, Alert, AsyncStorage } from 'react-native';
import { Surface, Snackbar, Appbar, Avatar, Title, Caption, Button, useTheme, Subheading } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector, StatusBall, AvatarText } from '../../components/util.component'
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '@react-navigation/stack';
import { connect } from 'react-redux'
import { getProjects } from '../project/action'
import { getSession } from './action'
import { resetAuth } from '../auth/action'
import { ModalAttendanceRedux } from '../attendance';
import OfflineBanner from '../../components/OfflineBanner';
import WrapperHeader from './wrapper';


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


  return (
    <WrapperHeader>
      <View style={{ backgroundColor: 'white', borderRadius: 30, height: height / 2, alignItems: 'center', zIndex: 2, elevation: 4, top: 50, flex: 1, }}>
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
              backgroundColor: '#333'
            }}
            size={100}
            color='white'
            label={session.name.split(" ").map((n) => n[0]).join(".")}
          />}

        {!session.isStatus &&
          <Avatar.Text
            style={{
              bottom: 50,
              backgroundColor: '#333'
            }}
            size={100}
            color='white'
          />}


        <View style={{
          bottom: 50, alignItems: 'center',
          borderColor: '#eee',
          borderBottomWidth: 1, width: '100%', paddingBottom: 20,
        }}>
          <View style={{ alignItems: 'center' }}>

            <Title>{session.name}</Title>
            <View style={{
              borderColor: 'red',
              borderTopWidth: 0, padding: 2, alignItems: 'center', justifyContent: 'center'
            }}>
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

    </WrapperHeader>
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
