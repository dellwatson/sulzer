import React from 'react';
import { View, Dimensions, Text } from 'react-native'
const { width, height } = Dimensions.get('window');
import { NetworkContext } from '../NetworkProvider'


export default class ExampleComponent extends React.PureComponent {
    static contextType = NetworkContext;
    render() {
        return (
            <>
                {!this.context.isConnected &&
                    <View style={{
                        position: 'absolute', backgroundColor: 'grey', width, padding: 20, paddingTop: 40, justifyContent: 'center', alignItems: 'center',
                        zIndex: 1000
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'white', letterSpacing: 2 }}>offline</Text>
                    </View>
                }
            </>
        );
    }

}

