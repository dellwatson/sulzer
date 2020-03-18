import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Surface, Snackbar, Button, Title, Caption, Subheading, useTheme } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BoxNumber, InvertBoxNumber } from '../../components/util.component'
import { connect } from 'react-redux'
import { refresh } from '../team/action'
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
const SPACE = 20

const Screen = (props) => {
  const theme = useTheme();
  const { koor } = props.route.params

  const { project } = props

  const attendances_arr = [
    // {
    //   "key": 11,
    //   "attendance_type": "attendance",
    //   "attendance_sequence": 2,
    //   "checkin_time": 1602399600,
    //   "checkout_time": 1602403200,
    //   "estimation_time": null,
    //   "checkin_latitude": null,
    //   "checkout_latitude": null,
    //   "checkin_longitude": null,
    //   "checkout_longitude": null,
    //   "checkin_location": null,
    //   "checkout_location": null,
    //   "description": null,
    //   "status": "new",
    //   "revision_version": null,
    //   "revision_time": null,
    //   "accepted": false,
    //   "accepted_time": null,
    //   "timescreate": 1584425402,
    //   "timesupdate": 1584425407
    // },
    // {
    //   "key": 10,
    //   "attendance_type": "attendance",
    //   "attendance_sequence": 1,
    //   "checkin_time": 1602313200,
    //   "checkout_time": 1602313200,
    //   "estimation_time": null,
    //   "checkin_latitude": null,
    //   "checkout_latitude": null,
    //   "checkin_longitude": null,
    //   "checkout_longitude": null,
    //   "checkin_location": null,
    //   "checkout_location": null,
    //   "description": "a3",
    //   "status": "new",
    //   "revision_version": null,
    //   "revision_time": null,
    //   "accepted": false,
    //   "accepted_time": null,
    //   "timescreate": 1584425384,
    //   "timesupdate": 1584425388
    // }
  ]



  return (
    <ScrollView style={styles.container}>
      {project.list.map((item, i) => {
        return (
          <TouchableOpacity
            onPress={() => {
              if (koor) {
                props.navigation.navigate('Team', { project_key: item.key })
              } else {
                props.navigation.navigate('Attendance', { project_key: item.key, koor, authority: false, attendances_arr })
              }
            }}
            key={i}
            style={{
              marginHorizontal: SPACE,
              marginVertical: SPACE / 2,
              borderRadius: 5,
              elevation: 2,
              padding: SPACE,
              width: width - SPACE * 2,
              // height: 120,
              backgroundColor: 'white',
            }} >
            {/* top */}
            <View style={{ borderBottomWidth: koor ? 1 : 0, borderColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>

              {/* left */}
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image source={require('../../assets/project_ic.png')} />
                <View style={{ borderWidth: 0, paddingLeft: 10 }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.project_code}</Text>
                  <Text style={{ fontSize: 11 }}>Started October 2019</Text>
                  <View />
                </View>
              </View>

              {/*  right */}
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={{ fontWeight: 'bold' }}>My Attendances</Text>
                <View style={{ flexDirection: 'row' }}>
                  <BoxNumber
                    color={theme.colors.primary}
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
            {koor &&
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                <View>
                  <Text style={{ fontWeight: 'bold' }}>Team Attendances</Text>
                  <Text style={{ color: 'orange', fontSize: 11 }}>[ Koordinator ]</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <InvertBoxNumber
                    color='grey'
                    number={99}
                    title='Peoples'
                  />
                  <InvertBoxNumber
                    color={theme.colors.primary}
                    number={99}
                    title='Total'
                  />
                  <InvertBoxNumber
                    color='seagreen'
                    number={99}
                    title='Approved'
                  />
                  <InvertBoxNumber
                    color='red'
                    number={99}
                    title='Pending'
                  />
                </View>
              </View>}

          </TouchableOpacity>
        )
      })}
    </ScrollView>
  );
}



const mapStateToProps = state => {
  return {
    // session: state.home.DATA
    project: state.project.DATA

  }
}

export const ProjectScreen = connect(mapStateToProps, { refresh })(Screen)


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
