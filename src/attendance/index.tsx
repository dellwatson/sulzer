import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Surface, Snackbar, Caption, TextInput, Divider, Button, Title } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector } from '../../components/util.component'
import { connect } from 'react-redux'
import { getPersonAttendance, clearPersonAttendance, getAttendanceAbsence, getAttendanceTravel, triggerAttendance, clearTrigger, resetAttendance } from './action'
import { getStaffInfo } from '../team/action'
import { Picker } from '@react-native-community/picker';
import Modal from "react-native-modal";
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
const SPACE = 20
import moment from 'moment'


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
    const { attendances_arr, koor, authority, self_item } = props.route.params

    const [attendance_list, setAttendance_list] = React.useState(koor ? attendances_arr : []) //

    const [modal, showModal] = React.useState(false)
    const [modalApproval, showModalApproval] = React.useState(false)

    const [dataModal, setDatamodal] = React.useState(null)

    React.useEffect(() => {
        if (!koor) {
            console.log('KOOR GET ATTENDANCE')
            props.getPersonAttendance(props.route.params.project_key) //klo dari project dpet key ? dari team ?
        }
        return () => props.clearPersonAttendance()
    }, [])


    React.useEffect(() => {

        if (!props.person.isFetching && props.person.isStatus) {
            console.log('SELF ATTENDANCE IN ATTENDANCE, SET NEW ATTENDANCE LIST')
            setAttendance_list(props.person.list)
        }
    }, [props.person.isStatus])

    // return CLEAR 

    return (
        <>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 60 }}
                style={styles.container}>

                {attendance_list.map((item, i) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setDatamodal(item)
                                showModalApproval(true)
                            }}
                            key={i}
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
                                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{item.attendance_type === 'travel' ? 'Travel' : 'Absence'}</Text>
                                <Text>{moment(item.checkin_time).format('dddd, MMMM Do YYYY')}</Text>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Image
                                        style={{ height: 20, width: 20, marginRight: 10 }}
                                        source={item.attendance_type === 'travel' ? require('../../assets/depart.png') : require('../../assets/a_in.png')}
                                        resizeMode='contain'
                                    />
                                    <Text>{moment(item.checkin_time).format('HH:mm:ss')}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Image
                                        style={{ height: 20, width: 20, marginRight: 10 }}
                                        source={item.attendance_type === 'travel' ? require('../../assets/arrival.png') : require('../../assets/a_out.png')}
                                        resizeMode='contain'
                                    />
                                    <Text>{item.checkout_time ? moment(item.checkout_time).format('HH:mm:ss') : '-'}</Text>
                                </View>
                            </View>

                            <View style={{ borderWidth: 0, justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{item.checkout_time ? item.accepted ? 'Approved' : 'Pending' : 'Ongoing'}</Text>

                                {!item.accepted && item.attendance_type !== 'travel' && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 40, marginRight: 10 }}>8</Text>
                                    <Text>hours</Text>
                                </View>}
                            </View>

                        </TouchableOpacity>
                    )
                })}
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
                    dataModal={dataModal}
                    authority={authority}
                    open={modalApproval}
                    onClose={() => showModalApproval(false)}
                />
            }
        </>
    );
}

const toCalc = (curr, before, overtime = false) => {
    console.log('CALC')
    console.log(curr - before)
    if (overtime) {
        const z = (curr - before) - 9
        console.log(z)
        return z < 0 ? '0' : z.toString()
    }

    const result = curr - before
    return result.toString()
}

const ModalApproval = props => {

    const { open, onClose, authority, dataModal } = props
    const TRAVEL = dataModal.attendance_type === 'travel'
    const attendance = TRAVEL ? 'travel' : 'attendance'

    const getStatus = () => {
        return dataModal.checkout_time ? dataModal.accepted ? 'Approved' : 'Pending' : 'Ongoing'
    }

    return (
        <Modal
            useNativeDriver
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            isVisible={open}
            style={{ width: '100%', margin: 0, marginTop: 60, }}
        >
            <ScrollView
                contentContainerStyle={{ paddingBottom: 60 }}
                style={{ flex: 1, backgroundColor: 'white', width: '100%', margin: 0, padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'bold' }}>Status : {getStatus()}</Text>
                    <Text style={{ fontWeight: 'bold' }} onPress={onClose}>X</Text>
                </View>

                <Text><Text style={{ fontWeight: 'bold', marginTop: 20 }}>Type</Text> : {TRAVEL ? 'Travel' : 'Absence'}</Text>
                <Text><Text style={{ fontWeight: 'bold', marginTop: 20 }}>Attendance - </Text>{}</Text>
                <Text style={{ color: 'grey', fontSize: 11, }}>{moment(dataModal.timescreate).format('dddd, MMMM Do YYYY')}</Text>

                {attendance === 'attendance' &&
                    <>
                        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Clock In</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    value={moment(dataModal.checkin_time).format('HH:mm:ss')}
                                    disabled
                                    mode='outlined'
                                />
                            </View>

                            <View style={{ flex: 1, paddingLeft: 20 }} />
                        </View>


                        <Divider style={{ marginVertical: 20 }} />

                        {/* --------------------------------------------------------------------- */}
                        {dataModal.checkout_time &&
                            <>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Clock Out</Text>
                                        <TextInput
                                            value={moment(dataModal.checkout_time).format('HH:mm:ss')}
                                            disabled
                                            mode='outlined'
                                        />
                                    </View>

                                    <View style={{ flex: 1, paddingLeft: 20 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Total</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TextInput
                                                value={toCalc(Number(moment(dataModal.checkout_time).format('HH')), Number(moment(dataModal.checkin_time).format('HH')))}
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
                                                // value='9'
                                                disabled
                                                mode='outlined'
                                            />
                                            <Text style={{ paddingLeft: 10 }}>Hours</Text>
                                        </View>
                                    </View>

                                    <View style={{ flex: 1, paddingLeft: 20 }}>
                                        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Overtime</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TextInput
                                                value={toCalc(Number(moment(dataModal.checkout_time).format('HH')), Number(moment(dataModal.checkin_time).format('HH')), true)}
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
                                    value={dataModal.description ? dataModal.description : ''}
                                    mode='outlined'
                                    disabled
                                />
                            </>}
                    </>}


                {/* --------------------APPROVAL TRAVEL------------------------------------------------- */}

                {attendance === 'travel' &&
                    <>
                        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Location Departure</Text>
                        <TextInput
                            value={dataModal.checkin_location}
                            // placeholder='location ...'
                            // value={description}
                            mode='outlined'
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
                                <Caption>Jalan Keveer</Caption>
                            </View>
                        </View>

                        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Time Departure</Text>
                        <TextInput
                            value={moment(dataModal.checkin_time).format('HH:mm:ss')}
                            disabled
                            mode='outlined'
                        />

                        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Photo</Text>
                        {/* <TouchableOpacity> */}
                        <Image
                            style={{ height: 100, width: 100, marginRight: 5 }}
                            source={require('../../assets/upload.png')}
                            resizeMode='contain'
                        />
                        {/* </TouchableOpacity> */}


                        <Divider style={{ marginVertical: 20 }} />

                        {/* SECOND */}
                        {dataModal.checkout_time &&
                            <>
                                <Text style={{ fontWeight: 'bold' }}>Location Arrival</Text>
                                <TextInput
                                    // placeholder='location ...'
                                    // value={description}
                                    mode='outlined'
                                    value={dataModal.checkout_location}
                                    disabled

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
                                        <Caption>Jalan Keveer</Caption>
                                    </View>
                                </View>

                                <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Time Arrival</Text>
                                <TextInput
                                    value={moment(dataModal.checkout_time).format('HH:mm:ss')}
                                    disabled
                                    mode='outlined'
                                />

                                <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Photo</Text>
                                {/* <TouchableOpacity> */}
                                <Image
                                    style={{ height: 100, width: 100, marginRight: 5 }}
                                    source={require('../../assets/upload.png')}
                                    resizeMode='contain'
                                />
                                {/* </TouchableOpacity> */}

                                <Text style={{ fontWeight: 'bold' }}>Description</Text>
                                <TextInput
                                    disabled
                                    value={dataModal.description}
                                    // placeholder='descr'
                                    // value={description}
                                    mode='outlined'
                                />
                            </>}
                    </>}


                {authority && dataModal.checkout_time && !dataModal.accepted &&
                    <View style={{ flexDirection: 'row', marginTop: 40, width: '100%', justifyContent: 'space-around' }}>
                        <Button style={{ flex: 1, marginRight: 20 }} labelStyle={{ color: 'white' }} mode="contained" onPress={() => props.getStaffInfo()}>
                            Approve
                        </Button>

                        <Button style={{ flex: 1 }} mode="outlined" onPress={() => console.log('Pressed')}>
                            Edit
                        </Button>
                    </View>
                }
            </ScrollView>
        </Modal>
    )
}






const ModalAttendance = props => {
    const { open, onClose, project, absence, travel, update } = props

    // console.log(moment().format('YYYY-MM-D HH:mm:ss'))
    const [state, setState] = React.useState(null)
    const [stateIndex, setStateIndex] = React.useState(0)

    const [attendance, setAttendace] = React.useState(null)
    const [attendanceData, setAttendaceData] = React.useState(null)
    // console.log(attendance)
    // console.log(attendanceData)

    // const [travelType, setTravelType] = React.useState('depart')





    const resetModal = () => {
        setState(null)
        setAttendace(null)
        // props.resetAttendance()
        props.clearTrigger()
    }

    const closeModal = () => {
        resetModal()
        onClose()
    }

    const refreshAttendance = () => { //when state is filled up
        props.getAttendanceAbsence(project.list[stateIndex].key)
        props.getAttendanceTravel(project.list[stateIndex].key)
    }


    React.useEffect(() => {
        console.log('RESET')
        return () => resetModal()
    }, [])


    React.useEffect(() => {
        if (!update.isFetching && update.isStatus) {
            console.log('UPDATE BARU NI')
            // refreshAttendance()
            closeModal()
        }
    }, [update.isStatus])


    React.useEffect(() => {
        if (state) { refreshAttendance() }

        // return () => props.resetAttendance()
    }, [state])



    React.useEffect(() => {
        console.log('EFFECT ATTENDANCE')
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
                console.log('TARO travelll  DATA')
                setAttendaceData(travel.list[travel.list.length - 1]) //taro data yg last array tadi
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
        "travel_type": attendance === 'travel' ? travel.list.length > 0 ? travel.list[0].checkout_time ? 'return' : 'depart' : 'depart' : null,
        attendance_time: moment().format('YYYY-MM-D HH:mm:ss'),
        "description": null,
        longitude: null,
        latitude: null,
        location: null,
        image: null,
    })
    console.log(formAttendance)

    const doSubmit = () => {
        props.triggerAttendance(formAttendance, project.list[stateIndex].key)
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
                    {project.list.map((item, i) => <Picker.Item key={i} label={item.project_code} value={item.key} />)}
                </Picker>

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
                                    "travel_type": itemValue === 'travel' ? travel.list.length > 0 ? travel.list[0].checkout_time ? 'return' : 'depart' : 'depart' : null,
                                    attendance_time: moment().format('YYYY-MM-D HH:mm:ss'),
                                    "description": null,
                                    longitude: null,
                                    latitude: null,
                                    location: null,
                                    image: null,
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
                            <Text><Text style={{ fontWeight: 'bold' }}>Attendance - </Text>{project.list[stateIndex].project_code}</Text>
                            <Text style={{ color: 'grey', fontSize: 11 }}>{attendanceData.checkin_time ? moment(attendanceData.checkin_time).format('dddd, MMMM Do YYYY') : moment().format('dddd, MMMM Do YYYY')}</Text>
                            {/* kasih today */}

                            <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Clock In</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        value={attendanceData.checkin_time ? moment(attendanceData.checkin_time).format('HH:mm:ss') : moment().format('HH:mm:ss')}
                                        disabled
                                        mode='outlined'
                                    />
                                </View>
                                {/* {console.log(moment(attendanceData.checkin_time).format('X') - moment().format('X'))} */}
                                <View style={{ flex: 1, paddingLeft: 20 }} />
                            </View>

                            {
                                attendanceData.checkin_time &&
                                <>
                                    <Divider style={{ marginVertical: 20 }} />
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontWeight: 'bold' }}>Clock Out</Text>
                                            <TextInput
                                                value={attendanceData.checkout_time ? moment(attendanceData.checkout_time).format('HH:mm:ss') : moment().format('HH:mm:ss')}
                                                disabled
                                                mode='outlined'
                                            />
                                        </View>
                                        <View style={{ flex: 1, paddingLeft: 20 }}>
                                            <Text style={{ fontWeight: 'bold' }}>Total</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <TextInput
                                                    value={toCalc(Number(moment().format('HH')), Number(moment(attendanceData.checkin_time).format('HH')))}
                                                    // value={moment.duration(moment(currentTIME).diff(moment(attendanceData.checkin_time))).hours().toString()}
                                                    disabled
                                                    mode='outlined'
                                                />
                                                <Text style={{ paddingLeft: 10 }}>Hours</Text>
                                            </View>

                                        </View>
                                    </View>

                                    {/* {console.log(moment().format('HH') - moment(attendanceData.checkin_time).format('HH'))} */}

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Estimate Working</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <TextInput
                                                    // value='9'
                                                    // disabled
                                                    mode='outlined'
                                                />
                                                <Text style={{ paddingLeft: 10 }}>Hours</Text>
                                            </View>
                                        </View>

                                        <View style={{ flex: 1, paddingLeft: 20 }}>
                                            <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Overtime</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <TextInput
                                                    value={toCalc(Number(moment().format('HH')), Number(moment(attendanceData.checkin_time).format('HH')), true)}
                                                    disabled
                                                    mode='outlined'
                                                />
                                                <Text style={{ paddingLeft: 10 }}>Hours</Text>
                                            </View>
                                        </View>
                                    </View>

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
                                value={attendanceData.checkin_time ? attendanceData.location : formAttendance.location}
                                onChangeText={text => setFormAttendance({ ...formAttendance, location: text })}
                                mode='outlined'
                                disabled={!!attendanceData.checkin_time}
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
                                    <Caption>Jalan Keveer</Caption>
                                </View>
                            </View>

                            <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Time Departure</Text>
                            <TextInput
                                value={attendanceData.checkin_time ? moment(attendanceData.checkin_time).format('HH:mm:ss') : moment().format('HH:mm:ss')}
                                disabled
                                mode='outlined'
                            />

                            <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Photo</Text>
                            {/* <TouchableOpacity> */}
                            <Image
                                style={{ height: 100, width: 100, marginRight: 5 }}
                                source={require('../../assets/upload.png')}
                                resizeMode='contain'
                            />
                            {/* </TouchableOpacity> */}


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

                                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                                        <TouchableOpacity>
                                            <Image
                                                style={{ height: 30, width: 30, marginRight: 5 }}
                                                source={require('../../assets/location.png')}
                                                resizeMode='contain'
                                            />
                                        </TouchableOpacity>
                                        <View style={{ flex: 1 }}>
                                            <Caption>Jalan Keveer</Caption>
                                        </View>
                                    </View>

                                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Time Arrival</Text>
                                    <TextInput
                                        value={attendanceData.checkout_time ? moment(attendanceData.checkout_time).format('HH:mm:ss') : moment().format('HH:mm:ss')}
                                        disabled
                                        mode='outlined'
                                    />

                                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Photo</Text>
                                    {/* <TouchableOpacity> */}
                                    <Image
                                        style={{ height: 100, width: 100, marginRight: 5 }}
                                        source={require('../../assets/upload.png')}
                                        resizeMode='contain'
                                    />
                                    {/* </TouchableOpacity> */}

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
        person: state.attendance.PERSON
    }
}

export const ModalAttendanceRedux = connect(mapStateToProps, { getAttendanceAbsence, getAttendanceTravel, triggerAttendance, clearTrigger, resetAttendance })(ModalAttendance)
export const ModalApprovalRedux = connect(mapStateToProps, { getStaffInfo })(ModalApproval)


export const AttendanceScreen = connect(mapStateToProps, { getPersonAttendance, clearPersonAttendance })(Screen)



const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: SPACE,
    },
    text: {
        textAlign: 'center',
    },
});
