import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar, Avatar, Caption, Subheading } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector, AvatarText } from '../../components/util.component'
import { connect } from 'react-redux'
import { getStaffInfo } from './action'

const { width, height } = Dimensions.get('window');
const SPACE = 20

/**
 * TODO:
 * refresh, kasih loading
 */

const Screen = (props) => {

  React.useEffect(() => {
    props.getStaffInfo()
  }, [])


  return (
    <View style={styles.container}>
      {props.staff.isStatus
        && props.staff.list.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => props.navigation.push('StatusTeam', { data: item.attendances, user: item.user })}
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              marginHorizontal: 40, marginVertical: 10,
              padding: 10, elevation: 4, borderRadius: 10,
            }}>

            <AvatarText imgSource={item.user.image} name={item.user.name} job={item.user.role} />

            <View style={{ flex: 1, backgroundColor: 'white' }}>
              <Subheading>NIK: -</Subheading>
              <Subheading>Last Activity:</Subheading>
              <Caption>19/23/2019</Caption>
              <Caption>Masuk: 08:09:09</Caption>
              {/* item.attendances[last array].time */}
            </View>
          </TouchableOpacity>
        ))
      }
    </View>
  );
}

const mapStateToProps = state => {
  return {
    staff: state.staff.DATA
  }
}

export const TeamScreen = connect(mapStateToProps, { getStaffInfo })(Screen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACE,
  },
  text: {
    textAlign: 'center',
  },
});



