import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Surface, Snackbar, Button, Title, Caption, Subheading, useTheme } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BoxNumber, InvertBoxNumber } from '../../components/util.component'
import { connect } from 'react-redux'
import { refresh } from '../team/action'
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment'
const { width, height } = Dimensions.get('window');
const SPACE = 20

const Screen = (props) => {
  const theme = useTheme();
  const { koor } = props.route.params

  const { project } = props

  const attendances_arr = [

  ]



  return (
    <ScrollView style={styles.container}>
      {project.list.map((item, i) => {
        return (
          <TouchableOpacity
            onPress={() => {
              if (koor) {
                props.navigation.navigate('Team', { project_key: item.key, koor })
              } else {
                //delete attendances arr
                props.navigation.navigate('Attendance', { project_key: item.key, koor, authority: false, attendances_arr, self_item: true })
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
                  <Text style={{ fontSize: 11 }}>{moment(item.timescreate).format('dddd, D-MM-YYYY')}</Text>
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
                    number={item.total_participants}
                    title='Peoples'
                  />
                  <InvertBoxNumber
                    color={theme.colors.primary}
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
