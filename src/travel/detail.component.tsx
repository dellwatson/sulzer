import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Surface, Snackbar, Button, Title, TextInput, Caption, IconButton } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector, CustomHeader, } from '../../components/util.component'
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { triggerTravel, clearTrigger, getTravel } from './action'

const { width, height } = Dimensions.get('window');
const SPACE = 20

const Screen = (props) => {
    const { item } = props.route.params
    const [state, setState] = useState(item)



    useEffect(() => {
        console.log('render Effect')

        if (!props.trigger_status.isFetching && props.trigger_status.isStatus) {
            setState(props.trigger_status)

            console.log('UPDATE BARU NI')
            props.getTravel()
        }
    }, [props.trigger_status.isStatus])

    useEffect(() => {
        return () => {
            props.clearTrigger()
        }
    }, [])

    // first
    const doConfirm = () => {
        console.log('click')

        let form = {
            attendance_type: 'travel',
            travel_type: item.travel_type,
            attendance_time: '2020-10-10 13:00:00'
        }
        props.triggerTravel(form)
    }

    // second confirm
    const doSubmit = () => {
        console.log('click')

        let form = {
            attendance_type: 'travel',
            travel_type: item.travel_type,
            attendance_time: '2020-10-10 15:00:00', //gnti
            // description: ''

        }
        props.triggerTravel(form)
    }

    return (
        <>
            <CustomHeader sTitle='Travel' />
            <ScrollView style={styles.container}>

                <TravelGroup
                    lokasi='Keberangkatan'
                    lock={state.checkin_time}
                    type={item.travel_type}
                    onPress={() => doConfirm()}
                >
                    <HeaderGroup
                        withStatus
                        title={item.travel_type === 'leave' ? 'Departure' : "Returning"}
                    />
                    {/* <Caption>{props.item.checkin_time}</Caption> */}
                    {/* ganti hari sekarang */}
                </TravelGroup>

                {state.checkin_time &&
                    <TravelGroup
                        connector
                        lokasi='Sampai'
                        lock={state.checkout_time}
                        type={item.travel_type}
                        onPress={() => doSubmit()}

                    />
                }

            </ScrollView>
        </>
    );
}


const TravelGroup = props => {

    const { lock, type, onPress } = props

    return (
        <Box connector={props.connector}>
            {props.children}
            <TitleSmall>Lokasi {props.lokasi}</TitleSmall>
            <TextInput
                style={{ minHeight: 40 }}
                mode='outlined'
                disabled={lock}
            // label='07:20:20'
            // value={this.state.text}
            // onChangeText={text => this.setState({ text })}
            />

            <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
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

            <TitleSmall >Waktu Sampai</TitleSmall>
            <TextInput
                mode='outlined'
                label='07:20:20'
                disabled={lock}

            />

            <TitleSmall >Upload Foto</TitleSmall>

            <TouchableOpacity>
                <Image
                    style={{ height: 50, width: 50, marginRight: 5 }}
                    source={require('../../assets/upload.png')}
                    resizeMode='contain'
                />
            </TouchableOpacity>


            {!lock && <Button
                style={{ marginTop: 20 }}
                mode="contained" onPress={onPress}>
                <Text style={{ color: 'white' }}>Confirm</Text>
            </Button>
            }
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        trigger_status: state.travel.UPDATE
    }
}

export const DetailComponent = connect(mapStateToProps, { triggerTravel, clearTrigger, getTravel })(Screen)

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
