import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector } from '../../components/util.component'

const { width, height } = Dimensions.get('window');
const SPACE = 20

const dummy = [
  {
    title: 'Keberangkatan Project',
  },
  {
    title: 'Kepulangan Project',
  },

]

export const TravelScreen = (props) => (
  <View style={styles.container}>
    {dummy.map((item, index) => (
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
        <TitleSmall>{item.title}</TitleSmall>
      </TouchableOpacity>
    ))}
  </View>
);

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
