import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, StatusBar, Image, ScrollView, Alert, AsyncStorage } from 'react-native';
import { resetAuth } from '../auth/action'
import { connect } from 'react-redux'
import { NetworkContext } from '../../NetworkProvider'
import { LinearGradient } from 'expo-linear-gradient';
import { Surface, Snackbar, Appbar, Avatar, Title, Caption, Button, useTheme, Subheading } from 'react-native-paper';

class WrapperHeader extends PureComponent {
    static contextType = NetworkContext;


    doLogout = async () => {
        try {
            await AsyncStorage.removeItem('@login');
            await this.props.resetAuth()
        } catch(error) {
            // Error retrieving data
        }
    }



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
                    <Appbar style={ { elevation: 0, justifyContent: 'space-between', width: '100%', borderWidth: 0, backgroundColor: this.context.isConnected ? '#5FA1FC' : 'grey' } }>
                        <View />

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


export default connect(null, { resetAuth })(WrapperHeader)







//   return (
//     <LinearGradient
//       colors={['grey', '#EDEFF1']}
//       locations={[0.5, 0.5]}
//       style={{ flex: 1 }}>
//       <StatusBar barStyle="light-content" />


