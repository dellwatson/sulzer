import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, StatusBar } from 'react-native';
import { Surface, Snackbar, Title, useTheme } from 'react-native-paper';
import { connect } from 'react-redux'
import { getSession } from './action'


const { width, height } = Dimensions.get('window');
const SPACE = 20

const HomeScreen = (props) => {
  const theme = useTheme()

  useEffect(() => {
    props.getSession()

  }, [])

  const { session } = props

  /**
   * WAIT ISSTATUS all option
   */

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Project', { 'test': 'asd' })}
        style={styles.surface}
      >
        <Image
          resizeMode='contain'
          style={{ width: WIDTH_IMAGE, height: WIDTH_IMAGE }}
          source={require('../../assets/project_ic.png')} />
        <Title style={{ color: theme.colors.primary, marginTop: 5 }}>Project</Title>
      </TouchableOpacity>


      <TouchableOpacity
        onPress={() => props.navigation.navigate('Attendance')}
        style={styles.surface}
      >
        <Image
          resizeMode='contain'
          style={{ width: WIDTH_IMAGE, height: WIDTH_IMAGE }}
          source={require('../../assets/attendance_ic.png')} />
        <Title style={{ color: theme.colors.primary, marginTop: 5 }}>Attendance</Title>
      </TouchableOpacity>


      <TouchableOpacity
        onPress={() => props.navigation.navigate('Travel')}
        style={styles.surface}
      >
        <Image
          resizeMode='contain'
          style={{ width: WIDTH_IMAGE, height: WIDTH_IMAGE }}
          source={require('../../assets/travel_ic.png')} />
        <Title style={{ color: theme.colors.primary, marginTop: 5 }}>Travel</Title>
      </TouchableOpacity>


      {!session.isStatus &&
        <TouchableOpacity
          // onPress={() => props.navigation.navigate('Travel')}
          style={styles.surface}
        >
          <Image
            resizeMode='contain'
            style={{ width: WIDTH_IMAGE, height: WIDTH_IMAGE }}
            source={require('../../assets/team_ic.png')} />
          <Title style={{ color: 'white', marginTop: 5 }}>Loading</Title>
        </TouchableOpacity>
      }


      {session.isStatus && session.role === 'coordinator' &&
        <TouchableOpacity
          onPress={() => props.navigation.navigate('TestTeam')}
          style={styles.surface}
        >
          <Image
            resizeMode='contain'
            style={{ width: WIDTH_IMAGE, height: WIDTH_IMAGE }}
            source={require('../../assets/team_ic.png')} />
          <Title style={{ color: theme.colors.primary, marginTop: 5 }}>Team</Title>
        </TouchableOpacity>
      }

      {session.isStatus && session.role !== 'coordinator' &&

        <TouchableOpacity
          onPress={() => props.navigation.navigate('Transaction')}
          style={styles.surface}
        >
          <Image
            resizeMode='contain'
            style={{ width: WIDTH_IMAGE, height: WIDTH_IMAGE }}
            source={require('../../assets/team_ic.png')} />
          <Title style={{ color: theme.colors.primary, marginTop: 5 }}>Transaction</Title>
        </TouchableOpacity>
      }







      <Snackbar
        style={{ backgroundColor: theme.colors.primary, }}
        visible={true}
        onDismiss={() => console.log('x')}
        duration={1000}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}
      >
        <Text style={{ color: 'white' }}>Anda telah ke sign in di project baru, Silahkan menuju ke menu project anda</Text>
      </Snackbar>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    session: state.home.DATA
  }
}

export default connect(mapStateToProps, { getSession })(HomeScreen)



const WIDTH_BOX = width / 2 - (SPACE * 2);
const WIDTH_IMAGE = WIDTH_BOX - (SPACE * 4)

const styles = StyleSheet.create({
  surface: {
    elevation: 2,
    margin: SPACE,
    borderRadius: 5,
    padding: SPACE,
    width: width / 2 - (SPACE * 2),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    paddingTop: SPACE,
    justifyContent: 'center',
    // alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
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
