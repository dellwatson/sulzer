import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, RefreshControl } from 'react-native';
import { Surface, Snackbar, Button, Title, Caption, Subheading, useTheme } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BoxNumber, InvertBoxNumber } from '../../components/util.component'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import { getProjects } from './action'
import moment from 'moment'

const { width, height } = Dimensions.get('window');
const SPACE = 20

const Screen = (props) => {
  const { project, navigation } = props

  const doRefresh = () => {
    props.getProjects()
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      props.getProjects()

    });

    return unsubscribe;
  }, [navigation]);


  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={project.isFetching} onRefresh={doRefresh} />}
      style={styles.container}>


      {project.isStatus && project.list.find(item => item.project_status === 'ongoing') &&
        <View style={{ flexDirection: 'row' }}>
          <Title style={{ marginLeft: 20, fontWeight: 'bold' }}>Ongoing Project</Title>
          <View style={{ justifyContent: 'center', padding: 20, flex: 1 }}>
            <View style={{ borderWidth: 1, borderColor: '#5FA1FC' }} />
          </View>
        </View>
      }
      {project.isStatus && project.list.map((item, i) => (
        <ProjectCard
          key={i}
          item={item}
          navigation={props.navigation}
          koor={item.role === "coordinator"} />
      )
      )}

      {project.isStatus && project.list.find(item => item.project_status !== 'ongoing') &&
        <View style={{ flexDirection: 'row' }}>
          <Title style={{ marginLeft: 20, fontWeight: 'bold' }}>Project History</Title>
          <View style={{ justifyContent: 'center', padding: 20, flex: 1 }}>
            <View style={{ borderWidth: 1, borderColor: '#5FA1FC' }} />
          </View>
        </View>}

      {project.isStatus && project.list.filter(item => item.project_status !== 'ongoing').map((item, i) => {
        return (
          <ProjectCard
            key={i}
            item={item}
            navigation={props.navigation}
            koor={item.role === "coordinator"} />
        )
      })
      }
    </ScrollView>
  );
}


const ProjectCard = ({ koor, navigation, item, }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (koor) {
          navigation.navigate('Team', { project_key: item.key, koor, project_code: item.project_code })
        } else {
          //delete attendances arr
          navigation.navigate('Attendance', { project_key: item.key, koor, authority: false, self_item: true, project_code: item.project_code })
        }
      }}
      // key={i}
      style={{
        marginHorizontal: SPACE,
        marginVertical: SPACE / 2,
        borderRadius: 5,
        elevation: 3,
        padding: SPACE,
        width: width - SPACE * 2,
        // height: 120,
        backgroundColor: 'white',
      }} >
      {/* top */}
      <View style={{ borderBottomWidth: koor ? 1 : 0, borderColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>

        {/* left */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../assets/project_ic.png')} />
          <View style={{ borderWidth: 0, paddingLeft: 10, flex: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.project_code}</Text>
            <Text style={{ fontSize: 11, color: 'grey' }}>{moment(item.timescreate).format('dddd, D-MM-YYYY')}</Text>
            <Text style={{
              padding: 5,
              borderRadius: 10,
              marginTop: 5,
              alignSelf: 'flex-start',
              fontSize: 11,
              color: 'white', fontWeight: 'bold', backgroundColor: item.project_status === 'ongoing' ? 'orange' : 'green'
            }}>
              {item.project_status}</Text>
          </View>
        </View>

        {/*  right */}
        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>My Attendances</Text>
          <View style={{ flexDirection: 'row' }}>
            <BoxNumber
              color='#5FA1FC'
              number={item.total_my_attendance}
              title='Total'
            />
            <BoxNumber
              color='seagreen'
              number={item.total_my_attendance_accepted}
              title='Approved'
            />
            <BoxNumber
              color='red'
              number={item.total_my_attendance_pending}
              title='Pending'
            />
          </View>
        </View>
      </View>

      {/* bottom */}
      {item.role === 'coordinator' &&
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
          <View>
            <Text style={{ fontWeight: 'bold' }}>Team Attendances</Text>
            <Text style={{ color: 'orange', fontSize: 11 }}>[ Koordinator ]</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <InvertBoxNumber
              color='grey'
              number={item.total_participants}
              title='Peoples'
            />
            <InvertBoxNumber
              color='#5FA1FC'
              number={item.total_attendances}
              title='Total'
            />
            <InvertBoxNumber
              color='seagreen'
              number={item.total_attendances_accepted}
              title='Approved'
            />
            <InvertBoxNumber
              color='red'
              number={item.total_attendances_pending}
              title='Pending'
            />
          </View>
        </View>}

    </TouchableOpacity>
  )
}

const mapStateToProps = state => {
  return {
    // session: state.home.DATA
    project: state.project.DATA

  }
}

export const ProjectScreen = connect(mapStateToProps, { getProjects })(Screen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding:20,
    paddingTop: SPACE,
    paddingBottom: SPACE,
    // backgroundColor: 'red'
  },
  text: {
    textAlign: 'center',
  },

});
