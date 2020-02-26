import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar, Caption } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector } from '../../components/util.component'
import { connect } from 'react-redux'
import { getAttendance } from './action'
const { width, height } = Dimensions.get('window');
const SPACE = 20


const Screen = (props) => {

    React.useEffect(() => {
        props.getAttendance()
    }, [])

    const { project_code } = props.session.active_project


    return (
        <View style={styles.container}>
            {props.attendance.isStatus && props.attendance.list.length > 0 && props.attendance.list.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => props.navigation.navigate('DetailAttendance', { project_code, day: item.attendance_sequence, date: item.checkin_time, item })}
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
                            <TitleSmall>Day {item.attendance_sequence}</TitleSmall>
                            <Caption>{item.checkin_time}</Caption>
                        </Surface>
                    </TouchableOpacity>
                )
            }
            )}

            {props.attendance.isStatus && props.attendance.list.length === 0 &&
                <TouchableOpacity
                    onPress={() => props.navigation.push('DetailAttendance', {
                        project_code, day: '1', date: 'moment this day', item: {
                            "attendance_type": "attendance",
                            "attendance_sequence": 1,
                            "checkin_time": null,
                            "checkout_time": null,
                            "estimation_time": null,
                            "checkin_latitude": null,
                            "checkout_latitude": null,
                            "checkin_longitude": null,
                            "checkout_longitude": null,
                            "checkin_location": null,
                            "checkout_location": null,
                            "description": null,
                            "status": "new",
                            "revision_version": null,
                            "revision_time": null,
                            "accepted": false,
                            "accepted_time": null,
                        }
                    })}
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
                        <TitleSmall>Day 1</TitleSmall>
                        <Caption>moment this day</Caption>
                    </Surface>
                </TouchableOpacity>
            }

            {props.attendance.isStatus && props.attendance.list.length !== 0 && props.attendance.list[props.attendance.list.length - 1].checkout_time &&
                <TouchableOpacity
                    onPress={() => props.navigation.push('DetailAttendance', {
                        project_code, day: props.attendance.list.length + 1, date: 'moment latest day + 1<', item: {
                            "attendance_type": "attendance",
                            "attendance_sequence": props.attendance.list.length + 1,
                            "checkin_time": null,
                            "checkout_time": null,
                            "estimation_time": null,
                            "checkin_latitude": null,
                            "checkout_latitude": null,
                            "checkin_longitude": null,
                            "checkout_longitude": null,
                            "checkin_location": null,
                            "checkout_location": null,
                            "description": null,
                            "status": "new",
                            "revision_version": null,
                            "revision_time": null,
                            "accepted": false,
                            "accepted_time": null,
                            // "timescreate": 1582724674,
                            // "timesupdate": 1582735454
                        }
                    })}
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
                        <TitleSmall>Day {props.attendance.list.length + 1}</TitleSmall>
                        <Caption>moment latest day + 1</Caption>
                    </Surface>
                </TouchableOpacity>
            }


        </View>
    );
}

const mapStateToProps = state => {
    return {
        attendance: state.attendance.DATA,
        session: state.home.DATA
    }
}

export const AttendanceScreen = connect(mapStateToProps, { getAttendance })(Screen)



const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: SPACE,
    },
    text: {
        textAlign: 'center',
    },
});
