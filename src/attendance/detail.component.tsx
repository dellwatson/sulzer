import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar, Button, Title, TextInput, Caption, Subheading } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector, CustomHeader, } from '../../components/util.component'
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { triggerAttendance, clearTrigger, getAttendance } from './action'
// import {}

const { width, height } = Dimensions.get('window');
const SPACE = 20

const Screen = (props) => {
  const { project_code, day, date, item } = props.route.params
  const [state, setState] = useState(item)

  /**
   * newest pasti belom confirmed
   * 
   * 
   * ongoing pasti udah confirmed
   * finished juga udah confirmed
   * 
   * 
   * ongoing pasti belom submit
   * finish pasti udah submit
   * 
   * 
   * check ongoing vs finish --> item.checkout
   */

  /**
   * TODO: kasih loading button
   * ganti inputtime  buat new ke time picker
   * time yg udah ke submit jadi disabled input
   */


  React.useEffect(() => {
    console.log('render Effect')

    if (!props.trigger_status.isFetching && props.trigger_status.isStatus) {
      setState(props.trigger_status)

      console.log('UPDATE BARU NI')
      props.getAttendance()
    }
  }, [props.trigger_status.isStatus])

  React.useEffect(() => {
    return () => {
      props.clearTrigger()
    }
  }, [])

  const doConfirm = () => {
    let form = {
      attendance_type: 'attendance',
      attendance_time: '2020-10-10 13:00:00'
    }
    props.triggerAttendance(form)
  }

  const doSubmit = () => {
    let form = {
      attendance_type: 'attendance',
      attendance_time: '2020-10-10 15:00:00', //gnti
      // description: ''

    }
    props.triggerAttendance(form)
  }

  return (
    <>
      <CustomHeader
        sTitle='Attendance'
      />
      <ScrollView style={styles.container}>
        <Box>
          <HeaderGroup
            withStatus
            title='Attendance'
            number={project_code}
          />

          <Caption>{date}</Caption>

          <TitleSmall >Day {day}</TitleSmall>
          <Text style={{ color: 'grey' }}>Masuk</Text>
          {/* kalo new kasih input, kalo engga kasih text */}
          <TextInput
            mode='outlined'
            label='07:20:20' // moment sekarang kalo new, kalo dari confirm udah true -> checkin_time
            disabled={state.checkin_time}
          />



          {!state.checkin_time && <Button
            style={{ marginTop: 20 }}
            mode="contained" onPress={() => doConfirm()}>
            <Text style={{ color: 'white' }}>Confirm</Text>
          </Button>}
        </Box>

        {/* bakal check submit dulu diawal/state finish */}
        {state.checkin_time &&
          <Box connector>
            <Caption>{date}</Caption>

            <View style={{ flexDirection: 'row', }}>
              <View style={{ marginRight: 15, flex: 1 }}>
                <TitleSmall>
                  Pulang
            </TitleSmall>
                <TextInput
                  mode='outlined'
                  label='07:20:20'
                  disabled={state.checkout_time}
                />
              </View>

              <View style={{ flex: 1 }}>
                <TitleSmall>
                  Total Jam Kerja
            </TitleSmall>
                <TextInput
                  mode='outlined'
                  label='Auto '
                  disabled={true}

                />
              </View>
            </View>

            <View style={{}}>
              <TitleSmall>
                Jumlah Estimasi Waktu
                </TitleSmall>
              <TextInput
                mode='outlined'
                label='9 Jam'
                disabled={state.checkout_time}

              // value={this.state.text}
              // onChangeText={text => this.setState({ text })}
              />
            </View>

            <Subheading style={{ color: 'green' }}>Waktu Lembur 0 Jam</Subheading>

            <View style={{}}>
              <TitleSmall>
                Deskripsi
          </TitleSmall>
              <TextInput
                style={{ minHeight: 70 }}
                mode='outlined'
                disabled={state.checkout_time}

              />
            </View>

            {!state.checkout_time &&
              <Button
                style={{ marginTop: 20 }}
                mode="contained" onPress={() => doSubmit()}>
                <Text style={{ color: 'white' }}>
                  Submit
          </Text>
              </Button>
            }

          </Box>
        }
      </ScrollView>
    </>
  );
}

const mapStateToProps = state => {
  return {
    trigger_status: state.attendance.UPDATE
  }
}

export const DetailComponent = connect(mapStateToProps, { triggerAttendance, clearTrigger, getAttendance })(Screen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: SPACE,
    // alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },

});
