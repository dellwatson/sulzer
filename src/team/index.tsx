import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar, Avatar, Caption, Subheading } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector, AvatarText } from '../../components/util.component'

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


export const TeamScreen = (props) => (
  <View style={styles.container}>
    {dummy.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => props.navigation.push('StatusTeam')}
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          marginHorizontal: 40, marginVertical: 10,
          padding: 10, elevation: 4, borderRadius: 10,
        }}>

        <AvatarText />

        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Subheading>NIK: 01212321312</Subheading>
          <Subheading>Last Activity:</Subheading>
          <Caption>19/23/2019</Caption>
          <Caption>Masuk: 08:09:09</Caption>
        </View>

      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACE,
  },
  text: {
    textAlign: 'center',
  },
});
