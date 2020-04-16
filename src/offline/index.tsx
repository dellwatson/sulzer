import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, AsyncStorage, Alert } from 'react-native';
import { Surface, Snackbar, Button, Title, Caption, Subheading, Divider, TextInput } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BoxNumber, InvertBoxNumber } from '../../components/util.component'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import { calcDuration } from '../attendance'

// import { getProjects } from './action'
import moment from 'moment'

const { width, height } = Dimensions.get('window');
const SPACE = 20

/**
 * what to do if it's zero
 */

const Screen = (props) => {

    const [compareData, setCompareData] = useState(null)
    const [warnEmptyData, setWarnEmptyData] = useState(null)


    const [state, setState] = useState(null)

    const [attendance, setAttendace] = React.useState(null)
    const [attendanceData, setAttendanceData] = React.useState(null)
    //     "attendance_type": "attendance",
    // "checkin_time": null,
    // "checkout_time": null,
    // "estimation_time": null,
    // "checkin_latitude": null,
    // "checkout_latitude": null,
    // "checkin_longitude": null,
    // "checkout_longitude": null,
    // "checkin_location": null,
    // "checkout_location": null,
    // "description": null,
    // "status": "new",
    // "revision_version": null,
    // "revision_time": null,
    // "accepted": false,
    // "accepted_time": null,
    // })


    useEffect(() => {
        loadCompareStorage()
    }, [])

    const loadCompareStorage = async () => {
        try {
            const result = await AsyncStorage.getItem('@comparator');

            if (result !== null) {
                setCompareData(JSON.parse(result))
            } else {
                setWarnEmptyData(true)
                alert('No ongoing project recorded or saved')
            }

        } catch (error) {
            // Error retrieving data
        }
    }
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
    }

    useEffect(() => {
        if (!attendanceData) {
            setAttendanceData(attendance === 'travel' ? default_travel : default_absence)
        }

        if (attendanceData && attendanceData.checkout_time) {
            //klo ada OUT last, berarti reset
            setAttendanceData(default_absence)


        } else if (attendanceData && !attendanceData.checkout_time) {
            // kalo tidak ada berarti masih lanjut IN, 
            setAttendanceData(attendanceData)

        }

    }, [attendance])

    const [formAttendance, setFormAttendance] = React.useState({
        "attendance_type": attendance,
        "travel_type": '',
        attendance_time: null,
        estimation_time: '0',
        "description": '',
        longitude: null,
        latitude: null,
        image: null,
        location: '',
    })

    const checkBeforeStorage = async () => {

        const NEW_DATA = {
            "project_key": state.key,
            "data": formAttendance
        }

        if (attendance === 'travel' && !!state.latest_travel && !!state.latest_travel.checkout_time && state.latest_travel.travel_type === 'return' &&
            state.role === 'staff'
        ) {
            alert(`Hey your travel is out of quota, it seems you already travel to return.`)
            return
        }

        if (attendance === 'travel' && !!state.latest_travel && !!state.latest_travel.checkout_time &&
            (state.latest_travel.travel_type === 'return' || state.latest_travel.travel_type === 'migrate') &&
            state.role === 'koordinator' && compareData.length === 1
        ) {
            alert(`Hey your travel is out of quota, it seems you have only 1 ongoing project`)
            return
        }


        //ambil data storage saved,
        //gabungin data nya
        //baru saved

        try {
            const result = await AsyncStorage.getItem('@offline');

            if (result === null) {
                _storeData([NEW_DATA])
            }

            if (result !== null) {
                const OFFLINE_DATA = await JSON.parse(result)
                _storeData([...OFFLINE_DATA, NEW_DATA])
            }


        } catch (error) {
            alert('Error saving offline data in storage, perhaps your storage is full')
            // Error retrieving data
        }

    }


    const _storeData = async (DATA) => {
        console.log(DATA)
        try {
            await AsyncStorage.setItem('@offline', JSON.stringify(DATA))
            console.log('SAVED @DATA')

            console.log(fakeServerReturn())
            constructNewDataComparator(fakeServerReturn())


        } catch (e) {
            console.log(e)
            alert('Error proses saving')
        }
    }

    const fakeServerReturn = () => {

        const old_data = attendanceData

        return {
            "attendance_type": formAttendance.attendance_type,

            "checkin_location": old_data && !!old_data.checkin_location ? old_data.checkin_location : formAttendance.location,
            "checkout_location": old_data && old_data.checkout_time ? formAttendance.location : null,

            "checkin_time": old_data && !!old_data.checkin_time ? old_data.checkin_time : formAttendance.attendance_time,
            "checkout_time": old_data && old_data.checkin_time ? formAttendance.attendance_time : null,      //pengennya jadi

            "estimation_time": formAttendance.estimation_time,
            "description": formAttendance.description,
            "travel_type": formAttendance.travel_type,


            "checkin_image": null,
            "checkout_image": null,

            "checkin_latitude": null,
            "checkin_longitude": null,

            "checkout_latitude": null,
            "checkout_longitude": null,

            "status": 'offline'
        }
    }


    const constructNewDataComparator = async (form) => {

        try {
            const result = await AsyncStorage.getItem('@comparator');

            const PROJECTS = await JSON.parse(result).map(item => {

                if (item.project_code === state.project_code) {
                    return {
                        ...item,
                        ...form.attendance_type === 'attendance' ? { latest_absence: form } : { latest_travel: form }
                    }

                } else { return item }
            })

            saveNewDataComparator(PROJECTS).then(() => {
                alert('Success saving data in storage ')
                props.navigation.goBack()
            })

        } catch (error) {
            alert('Error proses saving')
        }

    }

    const saveNewDataComparator = async (newArray) => {
        try {
            await AsyncStorage.setItem('@comparator', JSON.stringify(newArray))
            return
        } catch (e) {
            console.log(e)
            // saving error
        }
    }




    const doSubmit = () => {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to save this information ? ',
            [
                { text: `Cancel`, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => checkBeforeStorage() },
            ],
            { cancelable: false }
        )
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 60 }}
            //   refreshControl={<RefreshControl refreshing={project.isFetching} onRefresh={doRefresh} />}
            style={styles.container}>

            {warnEmptyData && <Text style={{ color: 'red' }}>No ongoing project recorded or saved when you were online</Text>}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold' }}>Choose Project :</Text>
                <View />
            </View>


            {compareData &&
                <Picker
                    selectedValue={state}
                    style={{ height: 50, width: '100%' }}
                    onValueChange={(itemValue, itemIndex) => {
                        setState(itemValue)
                        setAttendace(null)
                    }}>
                    <Picker.Item label='Select Project' value={null} />
                    {compareData.map((item, i) => <Picker.Item key={i} label={item.project_code} value={item} />)}
                </Picker>
            }

            {state &&
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>Choose Type:</Text>
                    <Picker
                        selectedValue={attendance}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) => {
                            setAttendace(itemValue)
                            setAttendanceData(itemValue === 'travel' ? state.latest_travel : state.latest_absence)
                            //set migrate to false

                            console.log(itemValue === 'travel' // perbedaan attendance sama travel
                                ?
                                (!!state.latest_travel   // kalo 0, depart(baru),    ada travel ?
                                    ?
                                    !state.latest_travel.checkout_time && state.latest_travel.travel_type === 'depart'// check depart udah IN ?   
                                        ?
                                        'depart2'
                                        :
                                        compareData.length > 1 ?
                                            'migrate' :
                                            'return'

                                    :
                                    'depart1')  //bkin travel baru depart
                                :
                                'attendance')
                            setFormAttendance({
                                ...formAttendance,
                                "attendance_type": itemValue, //
                                "travel_type":
                                    itemValue === 'travel' // perbedaan attendance sama travel
                                        ?
                                        (!!state.latest_travel   // kalo 0, depart(baru),    ada travel ?
                                            ?
                                            !state.latest_travel.checkout_time && state.latest_travel.travel_type === 'depart'// check depart udah IN ?   
                                                ?
                                                //check if ada ongoing project yg lain ? -> klo ada migration, klo gk ada return
                                                'depart'
                                                :
                                                compareData.length > 1 ?
                                                    'migrate' :
                                                    'return'

                                            :
                                            'depart')  //bkin travel baru depart
                                        :
                                        '',
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
                <View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ marginBottom: 20 }}><Text style={{ fontWeight: 'bold', }}>Attendance - </Text>{state.project_code}</Text>

                        <Text style={{ fontWeight: 'bold', }}>Clock In</Text>
                        <Text style={{ color: 'grey' }}>{!!attendanceData && attendanceData.checkin_time ? moment(attendanceData.checkin_time).format('dddd, MMMM Do YYYY') : moment().format('dddd, MMMM Do YYYY')}</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    value={!!attendanceData && attendanceData.checkin_time ? moment(attendanceData.checkin_time).format('HH:mm') : moment().format('HH:mm')}
                                    disabled
                                    mode='outlined'
                                />
                            </View>
                            <View style={{ flex: 1, paddingLeft: 20 }} />
                        </View>


                        {
                            attendanceData.checkin_time &&
                            <>
                                <Divider style={{ marginVertical: 20 }} />

                                <Text style={{ fontWeight: 'bold' }}>Clock Out</Text>

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: 'grey' }}>{moment().format('dddd, MMMM Do YYYY')}</Text>


                                        <TextInput
                                            value={moment().format('HH:mm')}
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
                                    </View>
                                </View>


                                <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Description</Text>
                                <TextInput
                                    placeholder='description'
                                    value={formAttendance.description}
                                    onChangeText={text => setFormAttendance({ ...formAttendance, description: text })}
                                    mode='outlined'
                                />
                            </>
                        }
                    </View>


                    <Button
                        style={{ marginTop: 40 }}
                        labelStyle={{ color: 'white' }}
                        mode="contained"
                        onPress={() => doSubmit()}
                    // disabled={update.isFetching}
                    >
                        {!!state.latest_absence && state.latest_absence.checkin_time ? 'Submit' : 'Confirm'}
                    </Button>
                </View>
            }

            {state && attendance === 'travel' && attendanceData &&
                <View style={{ marginTop: 20 }}>
                    <Text><Text style={{ fontWeight: 'bold' }}>Attendance - </Text>{state.project_code}</Text>


                    {/* FIRST */}
                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Location Departure</Text>
                    <TextInput
                        placeholder='location...'
                        value={!!attendanceData && attendanceData.checkin_time ? attendanceData.checkin_location : formAttendance.location}
                        onChangeText={text => setFormAttendance({ ...formAttendance, location: text })}
                        mode='outlined'
                        disabled={!!attendanceData && !!attendanceData.checkin_time}
                    />



                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Time Departure</Text>
                    <Text style={{ color: 'grey' }}>{!!attendanceData && attendanceData.checkin_time ? moment(attendanceData.checkin_time).format('dddd, MMMM Do YYYY') : moment().format('dddd, MMMM Do YYYY')}</Text>

                    <TextInput
                        // style={{ flex: 0.5 }}
                        value={!!attendanceData && attendanceData.checkin_time ? moment(attendanceData.checkin_time).format('HH:mm') : moment().format('HH:mm')}
                        disabled
                        mode='outlined'
                    />


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

                            <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Time Arrival</Text>
                            <Text style={{ color: 'grey' }}>{moment().format('dddd, MMMM Do YYYY')}</Text>
                            <TextInput
                                value={moment().format('HH:mm')}
                                disabled
                                mode='outlined'
                            />


                            <Text style={{ fontWeight: 'bold' }}>Description</Text>
                            <TextInput
                                placeholder='description ...'
                                value={formAttendance.description}
                                onChangeText={text => setFormAttendance({ ...formAttendance, description: text })}
                                mode='outlined'
                            />
                        </>
                    }

                    <Button
                        style={{ marginTop: 20 }}
                        labelStyle={{ color: 'white' }}
                        mode="contained"
                        onPress={() => doSubmit()}
                    >
                        Confirm
                        </Button>
                </View>
            }

        </ScrollView>
    );
}


const mapStateToProps = state => {
    return {
        // session: state.home.DATA
        project: state.project.DATA

    }
}

export const OfflineAttendance = connect(mapStateToProps, {
    // getProjects
})(Screen)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: SPACE,
        // paddingBottom: 60,
        // backgroundColor: 'red'
    },
    text: {
        textAlign: 'center',
    },

});

