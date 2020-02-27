import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar, Button, Title, TextInput, Subheading, Caption, Appbar, Avatar } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector, AvatarText, CustomHeader, } from '../../components/util.component'
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { ApprovedStatus, PendingStatus, OngoingStatus } from './status.component';
import { updateAccept, getStaffInfo } from './action'
import { connect } from 'react-redux'

const { width, height } = Dimensions.get('window');
const SPACE = 20

const Screen = props => {

    const { user, attendances } = props.route.params

    React.useEffect(() => {
        if (props.accept_status.isStatus) {
            console.log('SUCCESS ACCEPT, NOW REFRESH PARENT')
            props.getStaffInfo()
        }
    }, [props.accept_status.isStatus])

    const doAccept = () => {
        console.log('click')

        props.updateAccept(attendances.key)
    }

    return (
        <>
            <CustomHeader
                sTitle='Team'
            />
            <ScrollView style={styles.container}>
                <Box>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <AvatarText name={user.name} imgSource={user.img} job={user.role} />

                        <View>
                            <Subheading>NIK : -</Subheading>
                            <HeaderGroup
                            // title='New Project'
                            // number='0789'
                            />
                        </View>
                    </View>

                    {/* status approved?  */}
                    {
                        attendances.attendance_type === 'travel' ?
                            <TravelText date={attendances.checkin_time} />
                            :
                            <AttendanceText date={attendances.checkin_time} title={`Day ${attendances.attendance_sequence}`} />
                    }

                    {user.role === 'coordinator' || attendances.accepted &&
                        <>
                            <Title style={{ marginBottom: 5 }}>Status:</Title>
                            {attendances.accepted ? <ApprovedStatus /> : attendances.checkout_time ? <PendingStatus /> : <OngoingStatus />}
                        </>
                    }

                    {user.role === 'coordinator' &&
                        <>
                            <Title style={{ marginBottom: 5 }}>Status:</Title>
                            {attendances.accepted ? <ApprovedStatus /> : attendances.checkout_time ? <PendingStatus /> : <OngoingStatus />}
                        </>
                    }


                    {/* {user.role !== 'coordinator' && attendances.accepted &&
                        <>
                            <Title style={{ marginBottom: 5 }}>Status:</Title>
                            {attendances.accepted ? <ApprovedStatus /> : attendances.checkout_time ? <PendingStatus /> : <OngoingStatus />}
                        </>
                    } */}

                    {user.role !== 'coordinator' && !attendances.accepted && attendances.checkout_time &&
                        <>
                            <Title>Deskripsi</Title>
                            <TextInput
                                mode='outlined'
                                style={{ minHeight: 40 }}
                            />
                            <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-evenly' }}>
                                <Button
                                    style={{ marginRight: 5 }}
                                    mode="text" onPress={() => console.log('as')}>
                                    <Text style={{ color: '#5FA1FC' }}>Edit</Text>
                                </Button>
                                <Button
                                    // style={{width: 100, borderRadius:}}
                                    //ganti jadi auth true ?
                                    mode="contained" onPress={doAccept}>
                                    <Text style={{ color: 'white' }}>Approve</Text>
                                </Button>
                            </View>
                        </>
                    }
                </Box>

            </ScrollView>
        </>
    );
}

const mapStateToProps = state => {
    return {
        accept_status: state.staff.ACCEPT
    }
}

export const DetailComponent = connect(mapStateToProps, { updateAccept })(Screen)

const TravelText = ({ date }) => (
    <>
        <Title >Departure</Title>
        <Caption>{date}</Caption>

        <Title >Lokasi Keberangkatan</Title>
        <Caption>Bandara bnadung</Caption>

        <Title >Arrival</Title>
        <Caption>Bandara bnadung</Caption>

        <Title >Lokasi Sampai</Title>
        <Caption>Bandara Jakarta</Caption>

        <Title >Catatan</Title>
        <Caption>kendaraan macet</Caption>
    </>
)

const AttendanceText = ({ title, date }) => (
    <>
        <Title >Attendance</Title>
        <Caption>{date}</Caption>

        <Title >{title}</Title>

        <View style={{ marginRight: 15, }}>
            <TitleSmall>Masuk</TitleSmall>
            <TextInput
                mode='outlined'
                label='07:20:20'
            />
        </View>

        <View style={{ flexDirection: 'row', }}>
            <View style={{ marginRight: 15, flex: 1 }}>
                <TitleSmall>Pulang</TitleSmall>
                <TextInput
                    mode='outlined'
                    label='07:20:20'
                />
            </View>

            <View style={{ flex: 1 }}>
                <TitleSmall> Total Jam Kerja</TitleSmall>
                <TextInput
                    mode='outlined'
                    label='9 Jam'
                />
            </View>
        </View>

        <View style={{ marginTop: 5 }}>
            <TitleSmall>Jumlah Estimasi Waktu</TitleSmall>
            <TextInput
                mode='outlined'
                label='9 Jam'
            />
        </View>

        <Title >Catatan</Title>
        <Caption>kendaraan macet</Caption>
    </>
)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: SPACE,
        // alignItems: 'center',
    },
    text: {
        textAlign: 'center',
    },

});
