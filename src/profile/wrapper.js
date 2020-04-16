import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, StatusBar, Image, ScrollView, Alert, AsyncStorage } from 'react-native';
import { resetAuth } from '../auth/action'
import { triggerAttendance } from '../attendance/action'
import { setLoading, setCount, setLoadOffline } from './action'
import { connect } from 'react-redux'
import { NetworkContext } from '../../NetworkProvider'
import { LinearGradient } from 'expo-linear-gradient';
import { Surface, Snackbar, Appbar, Avatar, Title, Caption, Button, useTheme, Subheading } from 'react-native-paper';

class WrapperHeader extends PureComponent {
    static contextType = NetworkContext;

    state = {
        isOnline: this.context.isConnected
    }

    doLogout = async () => {
        /**
         * TODO: apus comparison data + savedstorage data too
         */
        try {
            await AsyncStorage.removeItem('@login');
            await this.props.resetAuth()
        } catch(error) {
            // Error retrieving data
        }
    }

    // componentDidMount() {
    //     console.log('HEY DIDMOUNT HERE')
    // }



    componentDidUpdate(prevState) {

        // works a connection - listener
        if(this.context.isConnected && !this.state.isOnline) {
            console.log('SET ONLINE')
            this.setState({ isOnline: true })

            /**
             * gonna do check reconnect here.
             * 
             * mungkin bakal kirim status online ke redux ?
             * sehingga saat online di home bisa di rewash?
             */


            // * setState pause ?
            // getOfflineStorage()




        } else if(!this.context.isConnected && this.state.isOnline) {
            console.log('SET OFFLINE')
            this.setState({ isOnline: false })


            /**
             * what to do here
             */
        }

    }

    /**
     * posisi reconnect,
     * 
     * bakal pause, kasih loading
     */
    getOfflineStorage = async () => {
        // tell redux hasFinishedLoadOffline -> false
        //loading true
        //number ?

        this.props.setLoadOffline(false)
        this.props.setLoading(true)

        console.log('offline trigger')

        try {
            const result = await AsyncStorage.getItem('@offline');

            if(result === null) {
                this.props.setLoadOffline(true)
                this.props.setLoading(false)
                //stop loading ?
                return
            }

            if(result !== null) {
                //do something
                console.log('gonna do something')

                // const OFFLINE_DATA = JSON.parse(result).map(item => {
                //     this.props.triggerAttendance(item.data, item.project_key)
                // })
                let count = 0

                for await(const item of JSON.parse(result)) {
                    console.log('LOOPING', item)

                    const send_attendances = async () => {
                        console.log('TRIGGER SEND', count)
                        const doFetch = await this.props.triggerAttendance(item.data, item.project_key)

                        console.log('tehn ')
                        count = count + 1



                        //     .catch(e => {
                        //         console.log(e)
                        //         send_attendances()
                        //     })
                    }


                    send_attendances()
                }

                console.log('finished looping')

                this._deleteComparator().then(() => {
                    this.props.setLoadOffline(true)
                    this.props.setLoading(false)

                    console.log('SET LOAD OFFLINE TO TRUE')
                })

                // delete compartor, try to set new comparator ?

                // tell redux hasFinishedLoadOffline -> true


                /**
                 * 
                 * parse data... copy original data
                 * 
                 * 
                 * 
                 * split array ?->  map array ... buat kasih tau number
                 * 
                 * item array -> fetch -> success 
                 * 
                 * if success, remove item from orginal array -> setStorage baru
                 * 
                 * resolve from Storage baru, then continue [UPDATE]
                 * 
                 * SUCCESS THEN CAN CONTINUE, if fail -> repeat ? 
                 * 
                 * if all complete,[delete project / remove async], delete comparator too ? unpause --> setOnline -> rewash( set new data)--> ke redux ?
                 * 
                 */

            }

        } catch(error) {
            // Error retrieving data
        }
    }

    _deleteComparator = async () => {
        try {
            await AsyncStorage.removeItem('@offline');
            await AsyncStorage.removeItem('@comparator');

            console.log('ALL DELETED')

        } catch(error) {
            console.log('error delete comparator')
            alert('something error ')
            // Error retrieving data
        }
    }

    //setStorageAgain = async () => {}  //stringify

    showAlertLogout = () => {
        Alert.alert(
            'Alert',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.doLogout() },
                // { text: 'Continue to edit', onPress: () => console.log('Ask me later pressed') },
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <LinearGradient
                colors={ [this.context.isConnected ? '#5FA1FC' : 'grey', '#EDEFF1'] }
                locations={ [0.5, 0.5] }
                style={ { flex: 1, zIndex: 20 } }>
                <View style={ { height: 80, justifyContent: 'flex-end', zIndex: 1, } }>
                    <Appbar style={ { elevation: 0, justifyContent: 'space-between', width: '100%', borderWidth: 0, backgroundColor: this.state.isOnline ? '#5FA1FC' : 'grey' } }>
                        <View />


                        <TouchableOpacity
                            onPress={ () => this.getOfflineStorage() } // and clear AsyncStorage, CALL ALERT FIRST
                            style={ { flexDirection: 'row', alignItems: 'center' } }
                        >
                            <Text style={ { color: 'white', marginRight: 10, fontWeight: 'bold' } }>DO OFFLINE</Text>
                            <Image
                                style={ { height: 24, width: 24, marginRight: 10 } }
                                source={ require('../../assets/logout.png') }
                                resizeMode='contain'
                            />
                        </TouchableOpacity>

                        { this.context.isConnected ?
                            <TouchableOpacity
                                onPress={ () => this.showAlertLogout() } // and clear AsyncStorage, CALL ALERT FIRST
                                style={ { flexDirection: 'row', alignItems: 'center' } }
                            >
                                <Text style={ { color: 'white', marginRight: 10, fontWeight: 'bold' } }>Logout</Text>
                                <Image
                                    style={ { height: 24, width: 24, marginRight: 10 } }
                                    source={ require('../../assets/logout.png') }
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                            :
                            <Text style={ { color: 'white', marginRight: 10, fontWeight: 'bold', letterSpacing: 2 } }>Offline</Text>
                        }
                    </Appbar>
                </View>
                { this.props.children }
            </LinearGradient>
        )
    }
}


export default connect(null, { resetAuth, triggerAttendance, setLoading, setCount, setLoadOffline })(WrapperHeader)







//   return (
//     <LinearGradient
//       colors={['grey', '#EDEFF1']}
//       locations={[0.5, 0.5]}
//       style={{ flex: 1 }}>
//       <StatusBar barStyle="light-content" />


