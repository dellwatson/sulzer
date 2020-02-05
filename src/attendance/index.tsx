import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import { Surface, Snackbar } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector } from '../../components/util.component'

const { width, height } = Dimensions.get('window');
const SPACE = 20

const dummy = [
    {
        title: 'day1',
        date:'123232'
    },
    {
        title: 'day2',
        date:'123232'
    },
    {
        title: 'day1',
        date:'123232'
    },
    {
        title: 'day2',
        date:'123232'
    },
]

export const AttendanceScreen = (props) => (
  <View style={styles.container}>
        {dummy.map((item, index) => (
            <TouchableOpacity
                key={index} 
                onPress={() => props.navigation.push('DetailAttendance')}
            >
                <Surface style={{
                    flexDirection: 'row',
                    // backgroundColor:'white',
                    marginHorizontal: 40, marginVertical: 5,
                    padding: 10, elevation: 4, borderRadius: 10,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                <TitleSmall>{item.title}</TitleSmall>
                <Text>{item.date}</Text>
            </Surface>
        </TouchableOpacity>
        )
    ) }
  </View>
);



const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop:SPACE,
  },
  text: {
    textAlign: 'center',
  },
});
