import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Surface, Snackbar, Button, Title, TextInput, Caption, IconButton } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector, } from '../../components/util.component'
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const SPACE = 20

export const DetailComponent = (props) => (
    <ScrollView style={styles.container}>

        <TravelGroup
            lokasi='Keberangkatan'
        >
            <HeaderGroup
                withStatus
                title='Departure'
            />
            <Caption>19/3/2019</Caption>
        </TravelGroup>

        <TravelGroup
            connector
            lokasi='Sampai'
        />

    </ScrollView>
);


const TravelGroup = props => (
    <Box connector={props.connector}>
        {props.children}
        <TitleSmall>Lokasi {props.lokasi}</TitleSmall>
        <TextInput
            style={{ minHeight: 40 }}
            mode='outlined'
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
        />

        <TitleSmall >Upload Foto</TitleSmall>
        <TouchableOpacity>
            <Image
                style={{ height: 50, width: 50, marginRight: 5 }}
                source={require('../../assets/upload.png')}
                resizeMode='contain'
            />
        </TouchableOpacity>


        <Button
            style={{ marginTop: 20 }}
            mode="contained" onPress={() => console.log('as')}>
            <Text style={{ color: 'white' }}>Confirm</Text>
        </Button>
    </Box>
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
