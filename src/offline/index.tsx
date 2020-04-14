import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, RefreshControl, Alert, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Surface, Snackbar, Caption, TextInput, Divider, Button, Title } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector } from '../../components/util.component'
import { connect } from 'react-redux'
// import {
//     getPersonAttendance, clearPersonAttendance, getAttendance, editAttendance,
//     acceptAttendance, getAttendanceStaff, clearAttendanceStaff, getAttendanceAbsence, getAttendanceTravel,
//     triggerAttendance, clearTrigger, resetAttendance,
//     acceptEditReset
// } from './action'
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


const OfflineAttendance = props => {
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
            // console.log('CHECK DATA')

            if (!absence.list[absence.list.length - 1].checkout_time) { //last array belom complete checkout
                // console.log('TARO DATA')

                const curr_data_In = absence.list[absence.list.length - 1]

                setAttendaceData(absence.list[absence.list.length - 1]) //taro data yg last array tad

                if (!!curr_data_In.checkin_latitude && curr_data_In.checkin_latitude !== 'null') {
                    const latitude = Number(curr_data_In.checkin_latitude);
                    const longitude = Number(curr_data_In.checkin_longitude);
                    getGeocodeAsync({ latitude, longitude }, true)
                }

            } else {
                setAttendaceData(default_absence)
            }
        } else if (attendance === 'attendance' && absence.isStatus) {
            setAttendaceData(default_absence)
        }



        if (attendance === 'travel' && travel.isStatus && travel.list.length !== 0) {
            // console.log('CHECK travelll DATA')
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

            } else if (travel.list.length === 2) {
                alert(`It seems you already complete your travel in this project, new data wouldn't be recorded`)
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
                            <Text style={{ color: 'grey' }}>{attendanceData.checkin_time ? moment(attendanceData.checkin_time).format('dddd, MMMM Do YYYY') : moment().format('dddd, MMMM Do YYYY')}</Text>

                            <TextInput
                                // style={{ flex: 0.5 }}
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
                                            attendanceData.checkin_image && attendanceData.checkin_image !== 'null' ?
                                                { uri: attendanceData.checkin_image }//+ jpg ?
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
                                    <Text style={{ color: 'grey' }}>{moment().format('dddd, MMMM Do YYYY')}</Text>
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