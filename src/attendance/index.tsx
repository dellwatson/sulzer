import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar, Caption } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector } from '../../components/util.component'

const { width, height } = Dimensions.get('window');
const SPACE = 20

const dummy = [
    {
        title: 'Day 1',
        date: '19/3/2019'
    },
    {
        title: 'Day 2',
        date: '132'
    },
    {
        title: 'Day 3',
        date: '123232'
    },
    {
        title: 'Day 4',
        date: '123232'
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
                    backgroundColor: 'white',
                    marginHorizontal: 40, marginVertical: 5,
                    padding: 10, elevation: 4, borderRadius: 10,
                    paddingHorizontal: 30,
                    // justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TitleSmall>{item.title}</TitleSmall>
                    <Caption>{item.date}</Caption>
                </Surface>
            </TouchableOpacity>
        )
        )}
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
