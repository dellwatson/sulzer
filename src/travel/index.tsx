import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector } from '../../components/util.component'
import { connect } from 'react-redux'
import { getTravel } from './action'

const { width, height } = Dimensions.get('window');
const SPACE = 20

const dummy = [
  {
    title: 'Departure Project',
  },
  {
    title: 'Return Project',
  },

]

const Screen = (props) => {

  React.useEffect(() => {
    props.getTravel()
  }, [])

  return (
    <View style={styles.container}>

      {props.travel.isStatus && props.travel.list.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            marginHorizontal: 40, marginVertical: 5,
            backgroundColor: 'white',
            elevation: 4,
            borderRadius: 10,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={() => props.navigation.push('DetailTravel')}
        >
          <TitleSmall>{item.travel_type === 'leave' ? 'Departure' : 'Return'}</TitleSmall>
        </TouchableOpacity>
      ))}

      {props.travel.isStatus && props.travel.list.length === 0 &&
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginHorizontal: 40, marginVertical: 5,
            backgroundColor: 'white',
            elevation: 4,
            borderRadius: 10,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={() => props.navigation.push('DetailTravel')}
        >
          <TitleSmall>Departure</TitleSmall>
        </TouchableOpacity>
      }

    </View>
  );
}

const mapStateToProps = state => {
  return {
    travel: state.travel.DATA,
    session: state.home.DATA
  }
}


export const TravelScreen = connect(mapStateToProps, { getTravel })(Screen)

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
