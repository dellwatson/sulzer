import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar, Button, Title, TextInput, Subheading, Caption } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector, AvatarText, } from '../../components/util.component'
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const SPACE = 20

export const DetailComponent = (props) => (

    <ScrollView style={styles.container}>

        <Box>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <AvatarText />

                <View>
                    <Subheading>NIK : 012321312</Subheading>
                    <HeaderGroup
                        title='New Project'
                        number='0789'
                    />
                </View>
            </View>

            {/* status approved?  */}

            <Title >Departure</Title>
            <Caption>232/1232/3232/111</Caption>

            <Title >Lokasi Keberangkatan</Title>
            <Caption>Bandara bnadung</Caption>

            <Title >Arrival</Title>
            <Caption>Bandara bnadung</Caption>

            <Title >Lokasi Sampai</Title>
            <Caption>Bandara Jakarta</Caption>

            <Title >Catatan</Title>
            <Caption>kendaraan macet</Caption>

            <View style={{}}>
                <Title>
                    Deskripsi
                    </Title>
                <TextInput
                    style={{ minHeight: 40 }}
                    mode='outlined'
                />
            </View>


            <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-evenly' }}>
                <Button
                    style={{ marginRight: 5 }}
                    mode="text" onPress={() => console.log('as')}>
                    <Text style={{ color: '#5FA1FC' }}>Edit</Text>
                </Button>
                <Button
                    // style={{width: 100, borderRadius:}}
                    //ganti jadi auth true ?
                    mode="contained" onPress={() => console.log('as')}>
                    <Text style={{ color: 'white' }}>Approve</Text>
                </Button>
            </View>
        </Box>

    </ScrollView>
);

// departure

// attendance


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
