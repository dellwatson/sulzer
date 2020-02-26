import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar, Avatar, Caption, Appbar } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector, StatusBall, CustomHeader } from '../../components/util.component'

const { width, height } = Dimensions.get('window');
const SPACE = 20

export const ApprovedStatus = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, marginLeft: -10 }}>
        <StatusBall backgroundColor='seagreen' />
        <Text style={{ color: 'seagreen' }}>Approved</Text>
    </View>
)

export const PendingStatus = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, marginLeft: -10 }}>

        <StatusBall backgroundColor='red' />
        <Text style={{ color: 'red' }}>Pending</Text>
    </View>
)

export const OngoingStatus = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, marginLeft: -10 }}>

        <StatusBall backgroundColor='orange' />
        <Text style={{ color: 'orange' }}>Ongoing</Text>
    </View>
)

export const TeamStatusScreen = (props) => {


    return (
        <>
            <CustomHeader
                sTitle='Team'
            />
            <View style={styles.container}>
                {props.route.params.data.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => props.navigation.navigate('DetailTeam', { user: props.route.params.user, attendances: item })}
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: SPACE,
    },
    text: {
        textAlign: 'center',
    },
});
