import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar, Avatar } from 'react-native-paper';
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
      >
        <Surface style={{
          flexDirection: 'row',
          // backgroundColor:'white',
          marginHorizontal: 40, marginVertical: 5,
          padding: 10, elevation: 4, borderRadius: 10,
          // justifyContent: 'center', alignItems: 'center'
        }}>

          <AvatarText />

          <View style={{ flex: 1, backgroundColor: 'red' }}>
            <Text>NIK: 01212321312</Text>
            <Text>NIK: 01212321312</Text>
            <Text>NIK: 01212321312</Text>
            <Text>NIK: 01212321312</Text>
          </View>
        </Surface>

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
