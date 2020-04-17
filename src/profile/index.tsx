import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, StatusBar, Image, ScrollView, Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import { Surface, Snackbar, Appbar, Avatar, Title, Caption, Button, useTheme, Subheading } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector, StatusBall, AvatarText } from '../../components/util.component'
import { connect } from 'react-redux'
import { getProjects } from '../project/action'
import { getSession, getAttendanceInfo, setLoading } from './action'
import { resetAuth } from '../auth/action'
import { ModalAttendanceRedux } from '../attendance';
import OfflineBanner from '../../components/OfflineBanner';
import WrapperHeader from './wrapper';
import ButtonWrapper from './button-wrapper';

const { width, height } = Dimensions.get('window');
const SPACE = 20


const Screen = (props) => {

  const theme = useTheme();

  const {
    project,
    session,
    // koor,
    navigation } = props;

  const [modal, showModal] = React.useState(false)


  useEffect(() => {
    // console.log('screen load')
    props.getProjects()
    props.getSession()

  }, [])





  const prepareStorageSaving = async () => {
    console.log('################ PREPARE RUNNING ')

    const ARRAY_PROJECT = project.list.filter(data => data.project_status === 'ongoing')

    let CHECK = []

    for await (const item of ARRAY_PROJECT) {
      const ARRAY_ATTENDANCES = await props.getAttendanceInfo(item.key)

      const absence_array = await ARRAY_ATTENDANCES.data.length > 0 ? ARRAY_ATTENDANCES.data.filter(item => item.attendance_type === 'attendance') : []
      const travel_array = await ARRAY_ATTENDANCES.data.length > 0 ? ARRAY_ATTENDANCES.data.filter(item => item.attendance_type === 'travel') : []

      const newObj = await {
        ...item,
        latest_absence: ARRAY_ATTENDANCES.data.length > 0 ? absence_array[absence_array.length - 1] : null,
        latest_travel: ARRAY_ATTENDANCES.data.length > 0 ? travel_array[travel_array.length - 1] : null,
      }

      CHECK = [...CHECK, newObj]
    }

    _storeData(CHECK).then(() => {
      props.setLoading(false)
    })
    // .then((x) => console.log(x)) //stop loading ?
    // console.log(CHECK)

    //kirim ke redux global -> set up new
  }

  const _storeData = async (DATA) => {
    try {
      await AsyncStorage.setItem('@comparator', JSON.stringify(DATA))
      console.log('SAVED @home')
    } catch (e) {
      console.log(e)
      alert('Error proses backup')
      // saving error
    }
  }

  /**
   * useEffect detect 
   * 
   * hasFinishedLoadOffline ? && isLoading true
   * do load new comparator
   * 
   * setLoading false
   */
  const { isLoading, hasFinishedLoadOffline } = props

  useEffect(() => {
    console.log('*******   props.redux trigger')

    getCompareDataAgain()

  }, [isLoading, hasFinishedLoadOffline])


  const getCompareDataAgain = () => {
    console.log('COMPARE DATA AGAIN')
    console.log(hasFinishedLoadOffline, isLoading)
    // butuh true true
    if (props.hasFinishedLoadOffline && props.isLoading) {
      console.log('REWASH  BABY')
      prepareStorageSaving()
    }
  }


  /**
   * saat masuk apps check data offline exist ?
   * 
   * saat logout clean all
   */
  useEffect(() => {

    /**
     * @wrapper
     * saat masuk apps: isLoading true 
     * 
     * check offline storage -> kalo ada
     * do getOfflineStorage ( isLoading  true, hasFinishedLoadOffline false)
     * 
     * klo gk ada isLoading false
     */

    if (project.isStatus) {

      //kasih loading fullscreen?
      if (project.list.length === 0) return
      prepareStorageSaving()

    }
  }, [project])


  const showIsiData = async () => {
    try {
      const result = await AsyncStorage.getItem('@comparator');
      console.log('PARSE HOME: ---> ', JSON.parse(result))

    } catch (error) {
      // Error retrieving data
    }
  }
  const showIsiDataOFFLINE = async () => {
    try {
      const result = await AsyncStorage.getItem('@offline');
      console.log('###OFFLINE: ---> ', JSON.parse(result))

    } catch (error) {
      // Error retrieving data
    }
  }
  const deleteDataoffline = async () => {
    try {
      await AsyncStorage.removeItem('@offline');

    } catch (error) {
      // Error retrieving data
    }
  }


  useEffect(() => {
    if (props.count === props.count_length) {
      console.log('~~~~~~~~USE EFFECT DETECT UDAH SAMA ~~~~~~~~~~~~~~~~~')
    }

  }, [props.count])


  return (
    <>
      {props.isLoading &&
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'rgba( 0, 0, 0, 0.6 )',
            zIndex: 2000, justifyContent: 'center', alignItems: 'center',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          }}>
          <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 40 }}>
            <ActivityIndicator size='large' />
            <Text>{`${props.count}/${props.count_length}`}</Text>
          </View>
        </View>
      }

      <WrapperHeader
        getCompareData={() => getCompareDataAgain()}
      >
        <TouchableOpacity
          onPress={showIsiData}
          style={{
            elevation: 2,
            borderRadius: 10,
            width: width / 3,
            padding: 2,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Title style={{ color: theme.colors.primary, marginTop: 5 }}>TEST</Title>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={showIsiDataOFFLINE}
          style={{
            elevation: 2,
            borderRadius: 10,
            width: width / 3,
            padding: 2,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Title style={{ color: theme.colors.primary, marginTop: 5 }}>data offline</Title>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={deleteDataoffline}
          style={{
            elevation: 2,
            borderRadius: 10,
            width: width / 3,
            padding: 2,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Title style={{ color: theme.colors.primary, marginTop: 5 }}>delete data offline</Title>
        </TouchableOpacity>

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

              <ButtonWrapper navigation={props.navigation}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Project')}
                  style={{
                    elevation: 2,
                    borderRadius: 10,
                    width: width / 4,
                    padding: 5,
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
                    width: width / 4,
                    padding: 5,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <Image
                    resizeMode='contain'
                    source={require('../../assets/attendance_ic.png')} />
                  <Title style={{ color: theme.colors.primary, marginTop: 5 }}>Attendance</Title>
                </TouchableOpacity>
              </ButtonWrapper>

            </ScrollView>
          }

        </View>

        {project.isStatus &&
          <ModalAttendanceRedux
            open={modal}
            onClose={() => showModal(false)}
          />}

      </WrapperHeader>
    </>
  );
}


const mapStateToProps = state => {
  return {
    // koor: state.auth.koor,
    session: state.profile.DATA,
    project: state.project.DATA, //arr,
    isLoading: state.profile.offline_behaviour.isLoading,
    count: state.profile.offline_behaviour.count,
    hasFinishedLoadOffline: state.profile.offline_behaviour.hasFinishedLoadOffline,
    count_length: state.profile.length
  }
}

export const ProfileScreen = connect(mapStateToProps, {
  getProjects,
  getSession,
  resetAuth,
  getAttendanceInfo,
  setLoading
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
