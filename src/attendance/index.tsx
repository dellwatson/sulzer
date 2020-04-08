import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, RefreshControl, Alert, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Surface, Snackbar, Caption, TextInput, Divider, Button, Title } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector } from '../../components/util.component'
import { connect } from 'react-redux'
import {
    getPersonAttendance, clearPersonAttendance, getAttendance, editAttendance,
    acceptAttendance, getAttendanceStaff, clearAttendanceStaff, getAttendanceAbsence, getAttendanceTravel,
    triggerAttendance, clearTrigger, resetAttendance,
    acceptEditReset
} from './action'
import { getStaffInfo } from '../team/action'
import { Picker } from '@react-native-community/picker';
import Modal from "react-native-modal";
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
const SPACE = 20
import moment from 'moment'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const default_absence = {
    "attendance_type": "attendance",
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
    "timescreate": 1584425302,
    "timesupdate": 1584425302
}
const default_travel = {
    "attendance_type": "travel",
    "travel_type": "depart",
    "checkin_time": null,
    "checkin_image": null,
    "checkout_image": null,
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
    "timescreate": 1584425302,
    "timesupdate": 1584425302
}

const Screen = (props) => {
    const { koor, authority, self_item, staff_key, project_key, project_code } = props.route.params

    const { staff_attendance, self_attendance, edit_status, accept_status } = props

    const STATUS = self_item ? self_attendance.isStatus : staff_attendance.isStatus
    const LIST = self_item ? self_attendance.list : staff_attendance.list
    const FETCHING = self_item ? self_attendance.isFetching : staff_attendance.isFetching

    const [modal, showModal] = React.useState(false)
    const [modalApproval, showModalApproval] = React.useState(false)

    const [dataModal, setDatamodal] = React.useState(null)

    const [selfLoaded, setSelfLoad] = React.useState(koor ? false : true)


    /**
  
     * login staff:
     * auth false
     * koor false
     * self true
     * 
     * 
     * login koor, check koor
     * auth false
     * koor true
     * self true
     * 
     * login koor, check staff
     * auth true
     * koor true
     * self false
     * 
     * 
     */
    React.useEffect(() => {
        if (self_item) {
            if (!selfLoaded) return

            props.getAttendance(project_key)
            setSelfLoad(true)
        } else {
            props.getAttendanceStaff(staff_key)
        }

        return () => doClear()
    }, [])


    const doRefresh = () => self_item ? props.getAttendance(project_key) : props.getAttendanceStaff(staff_key)

    const doClear = () => {
        props.clearAttendanceStaff()
        if (koor) return
        props.resetAttendance()
    }

    React.useEffect(() => {
        if (!accept_status.isFetching && accept_status.isStatus ||
            !edit_status.isFetching && edit_status.isStatus
        ) {
            doRefresh()
        }
    }, [accept_status, edit_status])

    return (
        <>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 60 }}
                refreshControl={<RefreshControl refreshing={FETCHING} onRefresh={doRefresh} />}
                style={styles.container}>
                {STATUS && LIST.filter(item => item.checkout_time && !item.accepted).map((item, i) => (
                    <ListCard
                        item={item}
                        key={i}
                        onPress={() => {
                            setDatamodal(item)
                            showModalApproval(true)
                        }} />
                ))}

                {STATUS && LIST.filter(item => !item.checkout_time || item.accepted).map((item, i) => (
                    <ListCard
                        item={item}
                        key={i}
                        onPress={() => {
                            setDatamodal(item)
                            showModalApproval(true)
                        }} />
                ))}
            </ScrollView>


            {self_item &&
                <TouchableOpacity
                    onPress={() => showModal(true)}
                    style={{ width: '80%', alignSelf: 'center', borderRadius: 20, backgroundColor: '#5FA1FC', marginVertical: 20, padding: 10, alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Attendance</Text>
                </TouchableOpacity>
            }

            <ModalAttendanceRedux
                open={modal}
                onClose={() => showModal(false)}
            />

            {dataModal &&
                <ModalApprovalRedux
                    projectTitle={project_code}
                    onRefresh={doRefresh}
                    projectId={project_key}
                    dataModal={dataModal}
                    authority={authority}
                    open={modalApproval}
                    onClose={() => showModalApproval(false)}
                />
            }
        </>
    );
}

const ListCard = ({ onPress, item }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                marginHorizontal: SPACE,
                marginVertical: SPACE / 2,
                borderRadius: 5,
                elevation: 2,
                padding: SPACE,
                width: width - SPACE * 2,
                // height: 120,
                backgroundColor: 'white',
                flexDirection: 'row'
            }}
        >
            <View style={{ flex: 1, borderWidth: 0 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>{item.attendance_type === 'travel' ? 'Travel' : 'Absence'}</Text>
                <Text style={{ color: 'grey' }}>{moment(item.checkin_time).format('dddd, MMMM Do YYYY')}</Text>
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <Image
                        style={{ height: 24, width: 24, marginRight: 10 }}
                        source={item.attendance_type === 'travel' ? require('../../assets/depart.png') : require('../../assets/a_in.png')}
                        resizeMode='contain'
                    />
                    <Text style={{ color: 'grey' }}>{moment(item.checkin_time).format('HH:mm')}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <Image
                        style={{ height: 24, width: 24, marginRight: 10 }}
                        source={item.attendance_type === 'travel' ? require('../../assets/arrival.png') : require('../../assets/a_out.png')}
                        resizeMode='contain'
                    />
                    <Text style={{ color: 'grey' }}>{item.checkout_time ? moment(item.checkout_time).format('HH:mm') : '-'}</Text>
                </View>
            </View>

            <View style={{ borderWidth: 0, justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Text style={{
                    fontWeight: 'bold', fontSize: 16,
                    color: item.checkout_time ? item.accepted ? 'green' : 'red' : 'orange'
                }}>
                    {item.checkout_time ? item.accepted ? 'Approved' : 'Pending' : 'Ongoing'}
                </Text>

                {item.attendance_type !== 'travel' && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 46, marginRight: 10, color: '#5FA1FC' }}>
                        {item.checkout_time && calcDuration(item.checkout_time, item.checkin_time)}
                    </Text>
                    <Text style={{ fontWeight: 'bold' }}>{item.checkout_time && 'hours'}</Text>
                </View>}
            </View>
        </TouchableOpacity>
    )
}


const toCalc = (curr, before, overtime = false) => {
    //kalo malem diganti

    // console.log(curr - before)
    if (overtime) {
        const z = (curr - before) - 9
        // console.log(z)
        return z < 0 ? '0' : z.toString()
    }

    const result = curr - before
    return result.toString()
}

const calcDuration = (curr, before, overtime = false) => {

    const DURATIONX = moment.duration(moment(curr).diff(moment(before))).asHours();
    const DURATION = Math.floor(DURATIONX)

    if (overtime) {

        const z = DURATION - 9
        // console.log(z)
        return z < 0 ? '0' : z.toString()
    }

    return DURATION.toString()
}


const ModalApproval = props => {

    const { open, onClose, authority, dataModal, projectId, accept_status, onRefresh, edit_status, projectTitle } = props
    const [newForm, setNewForm] = React.useState(dataModal)

    const TRAVEL = dataModal.attendance_type === 'travel'
    const attendance = TRAVEL ? 'travel' : 'attendance'

    const getStatus = () => {
        return dataModal.checkout_time ? newForm.accepted ? 'Approved' : 'Pending' : 'Ongoing' //ganti dataModal to newForm karena saat update bakal setNewForm baru
    }
    const getColorStatus = () => {
        return dataModal.checkout_time ? newForm.accepted ? 'green' : 'red' : 'orange' //ganti dataModal to newForm karena saat update bakal setNewForm baru
    }

    React.useEffect(() => {
        if (!accept_status.isFetching && accept_status.isStatus) {
            onRefresh()
        }
    }, [accept_status])

    /**
     * OPEN ALERT, KALO CANCEL, SET DATAMODAL LAGI
     */


    const [edit, setEdit] = React.useState(false) // kasih alert
    const [showTimePicker, setShowTimePicker] = React.useState(false)
    const [showDatePicker, setShowDatePicker] = React.useState(false)

    const [isCheckinTimePicker, setIsCheckinTimePicker] = React.useState(true) // 'out

    const [placeholderTime, setPlaceholderTime] = React.useState(moment(dataModal.checkin_time))


    React.useEffect(() => {
        setNewForm(dataModal)
    }, [open])

    const closeModal = async () => {
        // after edit // approve -> refresh, 
        await props.acceptEditReset() //ONLY EDIT --> tidak berguna ? karena saat close modal menggunakan dataModal
        await setEdit(false)
        //edit status clear, approve status clear
        onClose()
    }

    const finishEdit = () => {
        const { estimation_time } = newForm
        const ET = estimation_time ? estimation_time : '0'

        const editForm = {
            ...newForm,
            estimation_time: ET,
            checkin_time: moment(newForm.checkin_time).format('YYYY-MM-D HH:mm:ss'),
            checkout_time: moment(newForm.checkout_time).format('YYYY-MM-D HH:mm:ss'),
        }
        props.editAttendance(editForm, dataModal.key)
    }


    React.useEffect(() => {
        if (!edit_status.isFetching && edit_status.isStatus) {
            edit_status.message && alert(edit_status.message)
            setEdit(false)
        }
    }, [edit_status])

    //KASIH ALERT FINISH EDIT, klo gagal, kasih error warning dibawah
    //kklo bener _> alert edit right -> setEdit false

    //edit message dri

    const showAlertEdit = () => {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to change this information?',
            [
                { text: 'Continue to Edit', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => finishEdit() },
                // { text: 'Continue to edit', onPress: () => console.log('Ask me later pressed') },
            ],
            { cancelable: false }
        )
    }

    React.useEffect(() => {
        if (!accept_status.isFetching && accept_status.isStatus) {
            alert('Approval successful')
            setNewForm({
                ...dataModal,
                ...accept_status
            })
        }
    }, [accept_status])


    ////////////
    const [gpsLocationIN, setGpsLocationIN] = React.useState(null)
    const [gpsLocationOUT, setGpsLocationOUT] = React.useState(null)

    const getGeocodeAsync = async (location, isCheckin) => {
        let geocode = await Location.reverseGeocodeAsync(location)

        if (isCheckin) {
            // console.log('set console here, to avoid bug ?')
            await setGpsLocationIN(`${geocode[0].street}, ${geocode[0].region}, ${geocode[0].city}`)
        } else {
            await setGpsLocationOUT(`${geocode[0].street}, ${geocode[0].region}, ${geocode[0].city}`)
        }
    }


    const checkLocationPermission = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            setGpsLocationIN('Location permission is not granted')
            setGpsLocationOUT('Location permission is not granted')
        }

        if (status === 'granted' && dataModal) {
            if (dataModal.checkin_latitude && dataModal.checkin_latitude !== 'null') {
                // console.log('set console here, to avoid bug ?')
                await getGeocodeAsync({ latitude: Number(dataModal.checkin_latitude), longitude: Number(dataModal.checkin_longitude) }, true)
            }
            if (dataModal.checkout_latitude && dataModal.checkout_latitude !== 'null') {
                await getGeocodeAsync({ latitude: Number(dataModal.checkout_latitude), longitude: Number(dataModal.checkout_longitude) }, false)
            }
        }

    }

    React.useEffect(() => {
        checkLocationPermission()
    }, [])


    return (
        <Modal
            useNativeDriver
            onBackdropPress={closeModal}
            onBackButtonPress={closeModal}
            isVisible={open}
            style={{ width: '100%', margin: 0, marginTop: 60, }}
        >
            <ScrollView
                contentContainerStyle={{ paddingBottom: 60 }}
                style={{ flex: 1, backgroundColor: 'white', width: '100%', margin: 0, padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{
                        fontWeight: 'bold',
                    }}>Status : <Text style={{ fontSize: 22, color: getColorStatus() }}>{getStatus()}</Text></Text>
                    <Text style={{ fontWeight: 'bold' }} onPress={closeModal}>X</Text>
                </View>

                <Text style={{ marginTop: 10 }}><Text style={{ fontWeight: 'bold' }}>Type</Text> : {TRAVEL ? 'Travel' : 'Absence'}</Text>
                <Text style={{ marginVertical: 5 }}><Text style={{ fontWeight: 'bold' }}>Attendance - </Text>{projectTitle}</Text>
                <Text style={{ color: 'grey', }}>{moment(dataModal.checkin_time).format('dddd, MMMM Do YYYY')}</Text>

                {showTimePicker &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={new Date(Number(placeholderTime))} //jaddiin function 
                        mode='time'
                        display="clock"
                        is24Hour={true}
                        onChange={(event, date) => {
                            if (event.type === 'dismissed') {
                                setShowTimePicker(false)
                            }
                            if (event.type === 'set') {
                                const formattedDate = moment(date.toISOString()).format('YYYY-MM-DD HH:mm:ss')
                                const formDate = isCheckinTimePicker ? { checkin_time: formattedDate } : { checkout_time: formattedDate }
                                setShowTimePicker(false)
                                setNewForm({
                                    ...newForm,
                                    ...formDate
                                })
                            }
                        }}
                    />
                }

                {showDatePicker &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={new Date(Number(placeholderTime))} //jaddiin function 
                        mode='date'
                        display="calendar"
                        is24Hour={true}
                        onChange={(event, date) => {
                            if (event.type === 'dismissed') {
                                setShowDatePicker(false)
                            }
                            if (event.type === 'set') {
                                const formattedDate = moment(date.toISOString()).format('YYYY-MM-DD HH:mm:ss')
                                const formDate = isCheckinTimePicker ? { checkin_time: formattedDate } : { checkout_time: formattedDate }
                                setShowDatePicker(false)
                                setNewForm({
                                    ...newForm,
                                    ...formDate
                                })
                            }
                        }}
                    />
                }


                {attendance === 'attendance' &&
                    <>
                        <TouchableOpacity onPress={() => {
                            if (!edit) return
                            if (!isCheckinTimePicker) setIsCheckinTimePicker(true)
                            setPlaceholderTime(moment(newForm.checkin_time))
                            setShowDatePicker(true)
                        }}>
                            <Text style={{ marginTop: 20, color: 'grey' }}><Text style={{ fontWeight: 'bold', marginTop: 20, color: 'black' }}>Clock In  </Text>{moment(newForm.checkin_time).format('YYYY-MM-D')}</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={() => {
                                    if (!edit) return
                                    if (!isCheckinTimePicker) setIsCheckinTimePicker(true)
                                    setPlaceholderTime(moment(newForm.checkin_time))
                                    setShowTimePicker(true)
                                }}>
                                    <TextInput
                                        value={moment(newForm.checkin_time).format('HH:mm')}
                                        disabled
                                        mode='outlined'
                                        style={{ backgroundColor: edit ? 'white' : '#eee' }}
                                    // awal formny di set dari dataModal
                                    // dari form ?
                                    />
                                </TouchableOpacity>

                            </View>

                            <View style={{ flex: 1, paddingLeft: 20 }} />
                        </View>


                        <Divider style={{ marginVertical: 20 }} />

                        {/* --------------------------------------------------------------------- */}
                        {dataModal.checkout_time &&
                            <>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity onPress={() => {
                                            if (!edit) return
                                            if (isCheckinTimePicker) setIsCheckinTimePicker(false)
                                            setPlaceholderTime(moment(newForm.checkout_time))
                                            setShowDatePicker(true)
                                        }}>
                                            <Text style={{ color: 'grey' }}><Text style={{ fontWeight: 'bold', color: 'black' }}>Clock Out  </Text>{moment(newForm.checkout_time).format('YYYY-MM-D')}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            if (!edit) return
                                            if (isCheckinTimePicker) setIsCheckinTimePicker(false)
                                            setPlaceholderTime(moment(newForm.checkout_time))
                                            setShowTimePicker(true)
                                        }}>
                                            <TextInput
                                                value={moment(newForm.checkout_time).format('HH:mm')}
                                                disabled
                                                mode='outlined'
                                                style={{ backgroundColor: edit ? 'white' : '#eee' }}

                                            />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flex: 1, paddingLeft: 20 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Total</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TextInput
                                                style={{ backgroundColor: '#eee' }}
                                                value={calcDuration(newForm.checkout_time, newForm.checkin_time)}
                                                disabled
                                                mode='outlined'
                                            />
                                            <Text style={{ paddingLeft: 10 }}>Hours</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Estimate Working</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TextInput
                                                value={newForm.estimation_time ? newForm.estimation_time.toString() : null}
                                                disabled={!edit}
                                                mode='outlined'
                                                onChangeText={text => setNewForm({ ...newForm, estimation_time: text })}
                                                keyboardType='numeric'
                                                style={{ backgroundColor: edit ? 'white' : '#eee' }}
                                            />
                                            <Text style={{ paddingLeft: 10 }}>Hours</Text>
                                        </View>
                                    </View>

                                    <View style={{ flex: 1, paddingLeft: 20 }}>
                                        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Overtime</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TextInput
                                                style={{ backgroundColor: '#eee' }}
                                                value={calcDuration(newForm.checkout_time, newForm.checkin_time, true)}
                                                disabled
                                                mode='outlined'
                                            />
                                            <Text style={{ paddingLeft: 10 }}>Hours</Text>
                                        </View>
                                    </View>
                                </View>

                                <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Description</Text>
                                <TextInput
                                    // placeholder='description'
                                    style={{ backgroundColor: edit ? 'white' : '#eee' }}
                                    value={newForm.description ? newForm.description : ''}
                                    mode='outlined'
                                    disabled={!edit}
                                    onChangeText={text => setNewForm({ ...newForm, description: text })}
                                />
                            </>}
                    </>}


                {/* --------------------APPROVAL TRAVEL------------------------------------------------- */}

                {attendance === 'travel' &&
                    <>
                        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Location Departure</Text>

                        <TextInput
                            style={{ backgroundColor: edit ? 'white' : '#eee' }}
                            value={newForm.checkin_location ? newForm.checkin_location : ''}
                            mode='outlined'
                            disabled={!edit}
                            onChangeText={text => setNewForm({ ...newForm, checkin_location: text })}

                        />

                        <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                            <TouchableOpacity>
                                <Image
                                    style={{ height: 30, width: 30, marginRight: 5 }}
                                    source={require('../../assets/location.png')}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                            <View style={{ flex: 1 }}>
                                <Caption>{dataModal.checkin_latitude ? gpsLocationIN : 'User didnt setup'}</Caption>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => {
                            if (!edit) return
                            if (isCheckinTimePicker) setIsCheckinTimePicker(true)
                            setPlaceholderTime(moment(newForm.checkin_time))
                            setShowDatePicker(true)
                        }}>
                            <Text style={{ color: 'grey', marginTop: 20 }}><Text style={{ fontWeight: 'bold', color: 'black' }}>Time Departure  </Text>{moment(newForm.checkin_time).format('YYYY-MM-D')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            if (!edit) return
                            if (!isCheckinTimePicker) setIsCheckinTimePicker(true)
                            setPlaceholderTime(moment(newForm.checkin_time))
                            setShowTimePicker(true)
                        }}>
                            <TextInput
                                style={{ backgroundColor: edit ? 'white' : '#eee' }}
                                value={moment(newForm.checkin_time).format('HH:mm')}
                                disabled
                                mode='outlined'
                            />
                        </TouchableOpacity>

                        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Photo</Text>
                        <Image
                            style={{ height: 100, width: 100, marginRight: 5 }}
                            source={newForm.checkin_image ? { uri: newForm.checkin_image } : require('../../assets/upload.png')}
                            resizeMode='contain'
                        />


                        <Divider style={{ marginVertical: 20 }} />

                        {/* SECOND */}
                        {dataModal.checkout_time &&
                            <>
                                <Text style={{ fontWeight: 'bold' }}>Location Arrival</Text>
                                <TextInput
                                    style={{ backgroundColor: edit ? 'white' : '#eee' }}
                                    // placeholder='location ...'
                                    // value={description}
                                    mode='outlined'
                                    value={newForm.checkout_location ? newForm.checkout_location : ''}
                                    disabled={!edit}
                                    onChangeText={text => setNewForm({ ...newForm, checkout_location: text })}
                                />

                                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                                    <TouchableOpacity>
                                        <Image
                                            style={{ height: 30, width: 30, marginRight: 5 }}
                                            source={require('../../assets/location.png')}
                                            resizeMode='contain'
                                        />
                                    </TouchableOpacity>
                                    <View style={{ flex: 1 }}>
                                        <Caption>{dataModal.checkout_latitude ? gpsLocationOUT : 'User didnt setup'}</Caption>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    if (!edit) return
                                    if (isCheckinTimePicker) setIsCheckinTimePicker(false)
                                    setPlaceholderTime(moment(newForm.checkout_time))
                                    setShowDatePicker(true)
                                }}>
                                    <Text style={{ color: 'grey', marginTop: 20 }}><Text style={{ fontWeight: 'bold', color: 'black' }}>Time Arrival  </Text>{moment(newForm.checkout_time).format('YYYY-MM-D')}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    if (!edit) return
                                    if (isCheckinTimePicker) setIsCheckinTimePicker(false)
                                    setPlaceholderTime(moment(newForm.checkout_time))
                                    setShowTimePicker(true)
                                }}>
                                    <TextInput
                                        style={{ backgroundColor: edit ? 'white' : '#eee' }}

                                        value={moment(newForm.checkout_time).format('HH:mm')}
                                        disabled
                                        mode='outlined'
                                    />
                                </TouchableOpacity>

                                <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Photo</Text>
                                {/* <TouchableOpacity> */}
                                <Image
                                    style={{ height: 100, width: 100, marginRight: 5 }}
                                    source={newForm.checkout_image ? { uri: newForm.checkout_image } : require('../../assets/upload.png')}
                                    resizeMode='contain'
                                />
                                {/* </TouchableOpacity> */}

                                <Text style={{ fontWeight: 'bold' }}>Description</Text>
                                <TextInput
                                    style={{ backgroundColor: edit ? 'white' : '#eee' }}
                                    disabled={!edit}
                                    value={newForm.description ? newForm.description : ''}
                                    mode='outlined'
                                    onChangeText={text => setNewForm({ ...newForm, description: text })}

                                />
                            </>}
                    </>}



                {authority && dataModal.checkout_time && !newForm.accepted &&
                    <View style={{ flexDirection: 'row', marginTop: 40, width: '100%', justifyContent: 'space-around' }}>
                        <Button
                            disabled={edit_status.isFetching || accept_status.isFetching}
                            loading={accept_status.isFetching}

                            style={{ flex: 1, marginRight: 10 }} labelStyle={{ color: 'white' }} mode="contained" onPress={() => props.acceptAttendance(dataModal.key)}>
                            {!accept_status.isFetching && 'Approve'}
                        </Button>

                        {!edit &&
                            <Button
                                disabled={edit_status.isFetching || accept_status.isFetching}
                                loading={edit_status.isFetching}
                                style={{ flex: 1, marginRight: 1 }} mode="outlined" onPress={() => setEdit(true)}>
                                {!edit_status.isFetching && 'Edit'}
                            </Button>}

                        {edit && //TAMBAHAN DI FUNCTION KIRIM PROPS
                            <Button
                                disabled={edit_status.isFetching || accept_status.isFetching}
                                loading={edit_status.isFetching}
                                labelStyle={{ color: 'white' }}
                                style={{ flex: 1, backgroundColor: 'orange', marginRight: 1 }} mode="outlined" onPress={showAlertEdit}>
                                {!edit_status.isFetching && 'Save Edit'}
                            </Button>
                        }
                    </View>
                }
                {(edit_status.isStatus === false || accept_status.isStatus === false) &&
                    <Text style={{ fontWeight: 'bold', color: 'red', alignSelf: 'center', margin: 10 }}>Something Error</Text>}

            </ScrollView>
        </Modal>
    )
}


const ModalAttendance = props => {
    const { open, onClose, project, absence, travel, update } = props

    const [state, setState] = React.useState(null)
    const [stateIndex, setStateIndex] = React.useState(0)

    const [attendance, setAttendace] = React.useState(null)
    const [attendanceData, setAttendaceData] = React.useState(null)


    const resetModal = () => {
        setState(null)
        setAttendace(null)
        setSelectedImage(null)
        setGpsLocationIN(null)
        setGpsLocationOUT(null)
        props.clearTrigger()
        // props.resetAttendance()
    }

    const closeModal = () => {
        resetModal()
        onClose()
    }

    const refreshAttendance = () => { //when state is filled up
        props.getAttendanceAbsence(project.list[stateIndex].key)
        props.getAttendanceTravel(project.list[stateIndex].key)
    }



    let [selectedImage, setSelectedImage] = React.useState(null);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.uri });

        const fileType = pickerResult.uri.split('.')
        const fileName = fileType[fileType.length - 2].split('/')

        const imageFile = {
            uri: pickerResult.uri,
            type: `${pickerResult.type}/${fileType[fileType.length - 1]}`,
            name: `${fileName[fileName.length - 1]}.${fileType[fileType.length - 1]}`,
        }


        setFormAttendance({
            ...formAttendance,
            image: imageFile
        })
    };




    React.useEffect(() => {
        if (!update.isFetching && update.isStatus) {
            if (!!update.message) { alert(update.message) }

            closeModal()
        }
    }, [update])


    React.useEffect(() => {
        if (state) { refreshAttendance() }

        // return () => props.resetAttendance()
    }, [state])



    React.useEffect(() => {
        if (attendance === 'attendance' && absence.isStatus && absence.list.length !== 0) {
            console.log('CHECK DATA')

            if (!absence.list[absence.list.length - 1].checkout_time) { //last array belom complete checkout
                console.log('TARO DATA')
                setAttendaceData(absence.list[absence.list.length - 1]) //taro data yg last array tadi
            } else {
                setAttendaceData(default_absence)
            }
        } else if (attendance === 'attendance' && absence.isStatus) {
            setAttendaceData(default_absence)
        }

        if (attendance === 'travel' && travel.isStatus && travel.list.length !== 0) {
            console.log('CHECK travelll DATA')
            if (!travel.list[travel.list.length - 1].checkout_time) { //last array belom complete checkout

                const curr_data_In = travel.list[travel.list.length - 1]

                //taro/load data IN
                setAttendaceData(curr_data_In) //taro data yg last array tadi



                // load data gelocation
                if (!!curr_data_In.checkin_latitude && curr_data_In.checkin_latitude !== 'null') {
                    const latitude = Number(curr_data_In.checkin_latitude);
                    const longitude = Number(curr_data_In.checkin_longitude);
                    getGeocodeAsync({ latitude, longitude }, true)
                }

                // let { status } = await Permissions.askAsync(Permissions.LOCATION);
                // if (status !== 'granted') {
                //     alert('Permission to access location was denied')
                // }

            } else {
                setAttendaceData(default_travel)
            }
            // if (travel.list[0].checkout_time) {
            //     setTravelType('return')
            // }
        } else if (attendance === 'travel' && travel.isStatus) {
            setAttendaceData(default_travel)
        }

    }, [attendance])



    /**
     * data for state for input
     */
    const [formAttendance, setFormAttendance] = React.useState({
        "attendance_type": attendance,
        "travel_type": attendance === 'travel' ? travel.list.length > 0 ? travel.list[0].checkout_time ? 'return' : 'depart' : 'depart' : '',
        attendance_time: moment().format('YYYY-MM-DD HH:mm:ss'),
        estimation_time: '0',
        "description": '',
        longitude: null,
        latitude: null,
        image: null,
        location: '',
    })


    const doSubmit = () => {

        props.triggerAttendance(formAttendance, project.list[stateIndex].key)
    }

    // const [gpsLocation, setGpsLocation] = React.useState(null)
    const [gpsLocationIN, setGpsLocationIN] = React.useState(null)
    const [gpsLocationOUT, setGpsLocationOUT] = React.useState(null)

    const getLocationAsync = async (isCheckin) => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('Permission to access location was denied')
        }

        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
        const { latitude, longitude } = location.coords

        setFormAttendance({
            ...formAttendance,
            latitude, longitude
        })
        getGeocodeAsync({ latitude, longitude }, isCheckin)
    };

    //useffect call this getGeocodeAsync
    /**
     * bisa panggil getGeo apa engga kalo Permission denied?
     * 
     */
    const getGeocodeAsync = async (location, isCheckin) => {
        let geocode = await Location.reverseGeocodeAsync(location)

        if (isCheckin) {
            setGpsLocationIN(`${geocode[0].street}, ${geocode[0].region}, ${geocode[0].city}`)
        } else {
            setGpsLocationOUT(`${geocode[0].street}, ${geocode[0].region}, ${geocode[0].city}`)
        }
    }


    return (
        <Modal
            useNativeDriver
            onBackdropPress={closeModal}
            onBackButtonPress={closeModal}
            isVisible={open}
            style={{ width: '100%', margin: 0, marginTop: 60, }}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 60 }}
                style={{ flex: 1, backgroundColor: 'white', width: '100%', margin: 0, padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'bold' }}>Choose Project :</Text>
                    <Text style={{ fontWeight: 'bold' }} onPress={closeModal}>X</Text>
                </View>

                <Picker
                    selectedValue={state}
                    style={{ height: 50, width: '100%' }}
                    onValueChange={(itemValue, itemIndex) => {
                        setState(itemValue)
                        setStateIndex(itemIndex - 1)
                        setAttendace(null)
                    }}>
                    <Picker.Item label='Select Project' value={null} />
                    {project.isStatus && project.list.map((item, i) => <Picker.Item key={i} label={item.project_code} value={item.key} />)}
                </Picker>
                {(absence.isFetching || travel.isFetching) && <ActivityIndicator />}
                {/* {console.log(absence)}
                {console.log(travel)} */}
                {/* kasih retry */}
                {state && absence.isStatus && travel.isStatus &&
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontWeight: 'bold' }}>Choose Type:</Text>
                        <Picker
                            selectedValue={attendance}
                            style={{ height: 50, width: '100%' }}
                            onValueChange={(itemValue, itemIndex) => {
                                setAttendace(itemValue)
                                setFormAttendance({
                                    ...formAttendance,
                                    "attendance_type": itemValue,
                                    "travel_type": itemValue === 'travel' ? travel.list.length > 0 ? travel.list[0].checkout_time ? 'return' : 'depart' : 'depart' : '',
                                    attendance_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                                    estimation_time: '0',
                                    "description": '',
                                    longitude: null, //setup disni geolocationny ?
                                    latitude: null,
                                    image: null,
                                    location: '',
                                })
                            }}>
                            <Picker.Item label='Select Type' value={null} />
                            <Picker.Item label='Travel' value='travel' />
                            <Picker.Item label='Absence' value='attendance' />
                        </Picker>
                    </View> //kasih loading
                }


                {state && attendance === 'attendance' && attendanceData &&
                    <>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ marginBottom: 20 }}><Text style={{ fontWeight: 'bold', }}>Attendance - </Text>{project.list[stateIndex].project_code}</Text>
                            {/* <Text style={{ color: 'grey', fontSize: 11 }}>{attendanceData.checkin_time ? moment(attendanceData.checkin_time).format('dddd, MMMM Do YYYY') : moment().format('dddd, MMMM Do YYYY')}</Text> */}
                            {/* kasih today */}


                            <Text style={{ fontWeight: 'bold', }}>Clock In</Text>
                            <Text style={{ color: 'grey' }}>{attendanceData.checkin_time ? moment(attendanceData.checkin_time).format('dddd, MMMM Do YYYY') : moment().format('dddd, MMMM Do YYYY')}</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        value={attendanceData.checkin_time ? moment(attendanceData.checkin_time).format('HH:mm') : moment().format('HH:mm')}
                                        disabled
                                        mode='outlined'
                                    />
                                </View>
                                {/* {console.log(moment(attendanceData.checkin_time).format('X') - moment().format('X'))} */}
                                <View style={{ flex: 1, paddingLeft: 20 }} />
                            </View>

                            <TouchableOpacity
                                onPress={() => !!attendanceData.checkin_time ? null : getLocationAsync(true)}
                                style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                                <Image
                                    style={{ height: 30, width: 30, marginRight: 5 }}
                                    source={require('../../assets/location.png')}
                                    resizeMode='contain'
                                />
                                <View
                                    style={{ flex: 1 }}>
                                    <Caption>{
                                        !!attendanceData.checkin_time ? //check masih IN atau sudah OUT
                                            attendanceData.checkin_latitude ?
                                                gpsLocationIN
                                                :
                                                `Location not setup` //check user masukin data gps IN ?
                                            :
                                            formAttendance.latitude ?
                                                gpsLocationIN ?
                                                    gpsLocationIN
                                                    :
                                                    'loading...'
                                                :
                                                'get location'
                                    }</Caption>
                                </View>
                            </TouchableOpacity>

                            {
                                attendanceData.checkin_time &&
                                <>
                                    <Divider style={{ marginVertical: 20 }} />

                                    <Text style={{ fontWeight: 'bold' }}>Clock Out</Text>

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: 'grey' }}>{moment().format('dddd, MMMM Do YYYY')}</Text>


                                            <TextInput
                                                value={attendanceData.checkout_time ? moment(attendanceData.checkout_time).format('HH:mm') : moment().format('HH:mm')}
                                                disabled
                                                mode='outlined'
                                            />
                                        </View>
                                        <View style={{ flex: 1, paddingLeft: 20 }}>
                                            <Text style={{ fontWeight: 'bold' }}>Total</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <TextInput
                                                    value={calcDuration(moment(), attendanceData.checkin_time)}
                                                    disabled
                                                    mode='outlined'
                                                />
                                                <Text style={{ paddingLeft: 10 }}>Hours</Text>
                                            </View>

                                        </View>
                                    </View>


                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Estimate Working</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <TextInput
                                                    value={formAttendance.estimation_time}
                                                    mode='outlined'
                                                    onChangeText={text => setFormAttendance({ ...formAttendance, estimation_time: text })}
                                                />
                                                <Text style={{ paddingLeft: 10 }}>Hours</Text>
                                            </View>
                                        </View>

                                        <View style={{ flex: 1, paddingLeft: 20 }}>
                                            <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Overtime</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <TextInput
                                                    value={calcDuration(moment(), attendanceData.checkin_time, true)}
                                                    disabled
                                                    mode='outlined'
                                                />
                                                <Text style={{ paddingLeft: 10 }}>Hours</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => getLocationAsync(false)}
                                        style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                                        <Image
                                            style={{ height: 30, width: 30, marginRight: 5 }}
                                            source={require('../../assets/location.png')}
                                            resizeMode='contain'
                                        />
                                        <View
                                            style={{ flex: 1 }}>
                                            <Caption>{
                                                formAttendance.latitude ?
                                                    gpsLocationOUT ?
                                                        gpsLocationOUT
                                                        :
                                                        'loading...'
                                                    :
                                                    'get location'
                                            }</Caption>
                                        </View>
                                    </TouchableOpacity>

                                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Description</Text>
                                    <TextInput
                                        placeholder='description'
                                        value={formAttendance.description}
                                        onChangeText={text => setFormAttendance({ ...formAttendance, description: text })}
                                        mode='outlined'
                                    />
                                    {/* {console.log(formAttendance)} */}
                                </>
                            }
                        </View>

                        {attendanceData && !attendance.checkout_time &&
                            <Button
                                style={{ marginTop: 40 }}
                                labelStyle={{ color: 'white' }}
                                mode="contained"
                                onPress={() => doSubmit()}
                                disabled={update.isFetching}>
                                {attendanceData.checkin_time ? 'Submit' : 'Confirm'}
                            </Button>
                        }
                    </>
                }

                {state && attendance === 'travel' && attendanceData &&
                    <>
                        <View style={{ marginTop: 20 }}>
                            <Text><Text style={{ fontWeight: 'bold' }}>Attendance - </Text>{project.list[stateIndex].project_code}</Text>
                            <Text style={{ color: 'grey', fontSize: 11 }}>{attendanceData.checkin_time ? moment(attendanceData.checkin_time).format('dddd, MMMM Do YYYY') : moment().format('dddd, MMMM Do YYYY')}</Text>

                            {/* FIRST */}
                            <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Location Departure</Text>
                            <TextInput
                                placeholder='location...'
                                value={attendanceData.checkin_time ? attendanceData.checkin_location : formAttendance.location}
                                onChangeText={text => setFormAttendance({ ...formAttendance, location: text })}
                                mode='outlined'
                                disabled={!!attendanceData.checkin_time}
                            />

                            <TouchableOpacity
                                onPress={() => !!attendanceData.checkin_time ? null : getLocationAsync(true)}
                                style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                                <Image
                                    style={{ height: 30, width: 30, marginRight: 5 }}
                                    source={require('../../assets/location.png')}
                                    resizeMode='contain'
                                />
                                <View
                                    style={{ flex: 1 }}>
                                    <Caption>{
                                        !!attendanceData.checkin_time ? //check masih IN atau sudah OUT
                                            attendanceData.checkin_latitude ?
                                                gpsLocationIN
                                                :
                                                `Location not setup` //check user masukin data gps IN ?
                                            :
                                            formAttendance.latitude ?
                                                gpsLocationIN ?
                                                    gpsLocationIN
                                                    :
                                                    'loading...'
                                                :
                                                'get location'
                                    }</Caption>
                                </View>
                            </TouchableOpacity>

                            <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Time Departure</Text>
                            <TextInput
                                value={attendanceData.checkin_time ? moment(attendanceData.checkin_time).format('HH:mm') : moment().format('HH:mm')}
                                disabled
                                mode='outlined'
                            />

                            <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Photo</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onPress={() => attendanceData.checkin_time ? null : openImagePickerAsync()}
                                    style={{ flex: 1 }}>
                                    <Image
                                        style={{ height: 100, width: 100, marginRight: 5 }}
                                        source={
                                            attendanceData.checkout_image && attendanceData.checkout_image !== 'null' ?
                                                { uri: attendanceData.checkout_image }//+ jpg ?
                                                :
                                                selectedImage ? { uri: selectedImage.localUri } :
                                                    require('../../assets/upload.png')
                                        }
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                                <View style={{ flex: 1 }} />
                            </View>



                            {attendanceData.checkin_time &&
                                <>
                                    <Divider style={{ marginVertical: 20 }} />

                                    {/* SECOND */}
                                    <Text style={{ fontWeight: 'bold' }}>Location Arrival</Text>
                                    <TextInput
                                        placeholder='location...'
                                        value={formAttendance.location}
                                        onChangeText={text => setFormAttendance({ ...formAttendance, location: text })}
                                        mode='outlined'
                                    />

                                    <TouchableOpacity
                                        onPress={() => getLocationAsync(false)}
                                        style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                                        <Image
                                            style={{ height: 30, width: 30, marginRight: 5 }}
                                            source={require('../../assets/location.png')}
                                            resizeMode='contain'
                                        />
                                        <View
                                            style={{ flex: 1 }}>
                                            <Caption>{
                                                formAttendance.latitude ?
                                                    gpsLocationOUT ?
                                                        gpsLocationOUT
                                                        :
                                                        'loading...'
                                                    :
                                                    'get location'
                                            }</Caption>
                                        </View>
                                    </TouchableOpacity>


                                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Time Arrival</Text>
                                    <TextInput
                                        value={attendanceData.checkout_time ? moment(attendanceData.checkout_time).format('HH:mm') : moment().format('HH:mm')}
                                        disabled
                                        mode='outlined'
                                    />

                                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Photo</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            onPress={openImagePickerAsync}
                                            style={{ flex: 1 }}>
                                            <Image
                                                style={{ height: 100, width: 100, marginRight: 5 }}
                                                source={selectedImage ? { uri: selectedImage.localUri } : require('../../assets/upload.png')}
                                                resizeMode='contain'
                                            />
                                        </TouchableOpacity>
                                        <View style={{ flex: 1 }} />
                                    </View>

                                    <Text style={{ fontWeight: 'bold' }}>Description</Text>
                                    <TextInput
                                        placeholder='description ...'
                                        value={formAttendance.description}
                                        onChangeText={text => setFormAttendance({ ...formAttendance, description: text })}
                                        mode='outlined'
                                    />

                                </>
                            }

                            {attendanceData && !attendance.checkout_time &&
                                <Button
                                    style={{ marginTop: 20 }}
                                    labelStyle={{ color: 'white' }}
                                    mode="contained"
                                    onPress={() => doSubmit()}
                                    // onPress={() => console.log(formAttendance)}
                                    disabled={update.isFetching}>
                                    {attendanceData.checkin_time ? 'Confirm' : 'Confirm'}
                                </Button>
                            }
                        </View>
                    </>
                }

            </ScrollView>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        project: state.project.DATA,
        travel: state.attendance.TRAVEL,
        absence: state.attendance.ABSENCE,
        update: state.attendance.UPDATE,
        self_attendance: state.attendance.DATA,
        staff_attendance: state.attendance.STAFF,
        accept_status: state.attendance.ACCEPT,
        edit_status: state.attendance.EDIT,

        person: state.attendance.PERSON
    }
}

export const ModalAttendanceRedux = connect(mapStateToProps, { getAttendanceAbsence, getAttendanceTravel, triggerAttendance, clearTrigger, resetAttendance })(ModalAttendance)
export const ModalApprovalRedux = connect(mapStateToProps, { getStaffInfo, acceptAttendance, editAttendance, acceptEditReset })(ModalApproval)


export const AttendanceScreen = connect(mapStateToProps, { getAttendance, clearPersonAttendance, getAttendanceStaff, clearAttendanceStaff, resetAttendance })(Screen)



const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: SPACE,
    },
    text: {
        textAlign: 'center',
    },
});
