import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Surface, Snackbar, Avatar, Caption, Subheading, Title } from 'react-native-paper';
import { TitleSmall, HeaderGroup, BoxNumber, AvatarTextRow } from '../../components/util.component'
import { connect } from 'react-redux'
import { getStaffInfo } from './action'
import { getAttendance } from '../attendance/action'

const { width, height } = Dimensions.get('window');
const SPACE = 20

/**
 * TODO:
 * refresh, kasih loading
 */

const Screen = (props) => {
  const { project_key, koor } = props.route.params
  const { staff, self_attendance, session } = props

  // console.log(self_attendance)
  /**
   * bug attendance/team back
   * anti koor -> new attendance create
   */

  React.useEffect(() => {
    props.getAttendance(project_key)
    props.getStaffInfo(project_key)

  }, [])

  // console.log(self_attendance)

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 60 }}
      style={styles.container}>

      {self_attendance.isStatus &&
        <>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Attendance', { attendances_arr: self_attendance.list, koor, authority: false, self_item: true })}
            style={{
              marginHorizontal: SPACE,
              marginVertical: SPACE / 3,
              borderRadius: 5,
              elevation: 2,
              padding: SPACE,
              width: width - SPACE * 2,
              // height: 120,
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <AvatarTextRow
              name={session.name}
              job='Koordinator'
            />

            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontWeight: 'bold' }}>My Attendances</Text>
              <View style={{ flexDirection: 'row' }}>
                <BoxNumber
                  // color={theme.colors.primary}
                  number={self_attendance.list.length}
                  title='Total'
                />
                <BoxNumber
                  color='seagreen'
                  number='00'
                  title='Approved'
                />
                <BoxNumber
                  color='red'
                  number={self_attendance.list.length}
                  title='Pending'
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <Title style={{ marginLeft: 20, fontWeight: 'bold' }}>Team Project</Title>
            <View style={{ justifyContent: 'center', padding: 20, flex: 1 }}>
              <View style={{ borderWidth: 1, borderColor: '#5FA1FC' }} />
            </View>
          </View>

        </>
      }


      {staff.isStatus && staff.list.map((item, i) => {
        // console.log(item)
        return (
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Attendance', { attendances_arr: item.attendances, koor, authority: true, self_item: false })}
            key={i}
            style={{
              marginHorizontal: SPACE,
              marginVertical: SPACE / 3,
              borderRadius: 5,
              elevation: 2,
              padding: SPACE,
              width: width - SPACE * 2,
              // height: 120,
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <AvatarTextRow
              name={item.user.name}
              job={item.user_type}
            />

            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontWeight: 'bold' }}>My Attendances</Text>
              <View style={{ flexDirection: 'row' }}>
                <BoxNumber
                  // color={theme.colors.primary}
                  number={item.total_attendances}
                  title='Total'
                />
                <BoxNumber
                  color='seagreen'
                  number={item.total_attendances_accepted}
                  title='Approved'
                />
                <BoxNumber
                  color='red'
                  number={item.total_attendances_pending}
                  title='Pending'
                />
              </View>
            </View>
          </TouchableOpacity>
        )
      })}

    </ScrollView>
  );
}

const mapStateToProps = state => {
  return {
    staff: state.staff.DATA,
    self_attendance: state.attendance.DATA,
    session: state.profile.DATA

  }
}

export const TeamScreen = connect(mapStateToProps, { getStaffInfo, getAttendance })(Screen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACE,
    paddingBottom: SPACE,
  },
  text: {
    textAlign: 'center',
  },
});



