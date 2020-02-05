import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar, Button, Title, TextInput } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector, AvatarText, } from '../../components/util.component'
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const SPACE = 20

export const DetailComponent = (props) => (
    <ScrollView style={styles.container}>
        <Box>
            <View style={{ flexDirection: 'row' }}>
                <AvatarText />

                <View>
                    <Text>NIK : 012321312</Text>
                    <HeaderGroup
                        title='New Project'
                        number='0789'
                    />
                </View>
            </View>


            <TitleSmall >Departure</TitleSmall>
            <Text>232/1232/3232/111</Text>

            <TitleSmall >Lokasi Keberangkatan</TitleSmall>
            <Text>Bandara bnadung</Text>

            <TitleSmall >Arrival</TitleSmall>
            <Text>Bandara bnadung</Text>

            <TitleSmall >Lokasi Sampai</TitleSmall>
            <Text>Bandara Jakarta</Text>

            <TitleSmall >Catatan</TitleSmall>
            <Text>kendaraan macet</Text>

            <View style={{}}>
                <TitleSmall>
                    Deskripsi
                    </TitleSmall>
                <TextInput
                    style={{ minHeight: 40 }}
                    mode='outlined'
                />
            </View>


            <View style={{ flexDirection: 'row' }}>
                <Button
                    style={{ marginTop: 20 }}
                    // style={{width: 100, borderRadius:}}
                    //ganti jadi auth true ?
                    mode="contained" onPress={() => console.log('as')}>
                    Edit
            </Button>
                <Button
                    style={{ marginTop: 20 }}
                    // style={{width: 100, borderRadius:}}
                    //ganti jadi auth true ?
                    mode="contained" onPress={() => console.log('as')}>
                    Confirm
            </Button>
            </View>
        </Box>

    </ScrollView>
);



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
