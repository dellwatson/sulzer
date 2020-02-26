import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar, Avatar, Caption, Appbar } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector, CustomHeader } from '../../components/util.component'
import { connect } from 'react-redux'
import { getTransaction } from './action'
import { ApprovedStatus, PendingStatus, OngoingStatus } from './detail.component'

const { width, height } = Dimensions.get('window');
const SPACE = 20


const Screen = (props) => {
  useEffect(() => {
    props.getTransaction()
  }, [])

  return (
    <>
      <View style={styles.container}>
        {props.trans.isStatus && props.trans.list.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => props.navigation.navigate('DetailTransaction', { user: props.session, attendances: item })}
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              marginHorizontal: 40, marginVertical: 5,
              padding: 10, elevation: 4, borderRadius: 10,
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
              <Text style={{ fontWeight: 'bold', marginRight: 10, paddingVertical: item.attendance_type === 'travel' ? 3 : 0 }}>
                {item.attendance_type === 'attendance' ? `Day ${item.attendance_sequence}` : item.travel_type === 'leave' ? `Keberangkatan` : `Kepulangan`}
              </Text>
              {item.attendance_type === 'attendance' && <Caption>{item.checkin_time}</Caption>}
            </View>

            {item.accepted ? <ApprovedStatus /> : item.checkout_time ? <PendingStatus /> : <OngoingStatus />}
          </TouchableOpacity>
        ))}

      </View>
    </>
  );
}

const mapStateToProps = state => {
  return {
    trans: state.trans.DATA,
    session: state.home.DATA
  }
}

export const TransactionScreen = connect(mapStateToProps, { getTransaction })(Screen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACE,
  },
  text: {
    textAlign: 'center',
  },
});
