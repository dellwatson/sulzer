import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import { Surface, Snackbar, Button, Title, TextInput } from 'react-native-paper';
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
                title='Departure'
            />
            <Text>19/3/2019</Text>
        </TravelGroup>

        <TravelGroup
            connector
            lokasi='Keberangkatan'
        >
            <HeaderGroup
                title='Departure'
            />
            <Text>19/3/2019</Text>
        </TravelGroup>

  </ScrollView>
);


const TravelGroup = props => (
    <Box connector={props.connector}>
        {props.children}
        <TitleSmall>Lokasi {props.lokasi}</TitleSmall>
            <TextInput
                style={{minHeight: 40}}
                mode='outlined'
                // label='07:20:20'
                // value={this.state.text}
                // onChangeText={text => this.setState({ text })}
            />

            <View style={{ flexDirection: 'row' }}>
                <Text>Jalan Keveer</Text>
                <Text>Jalan Keveer</Text>
            </View>

            <TitleSmall >Waktu Keberangkatan</TitleSmall>
            <TextInput
                mode='outlined'
                label='07:20:20'
                // value={this.state.text}
                // onChangeText={text => this.setState({ text })}
            />

            <TitleSmall >Upload Foto</TitleSmall>
            <View style={{height: 40, width: 100, backgroundColor:'black', marginVertical: 10}}/>


            <Button
                style={{marginTop: 20}}  
                // style={{width: 100, borderRadius:}}
                //ganti jadi auth true ?
                mode="contained" onPress={() => console.log('as') }>
                Confirm
            </Button>
        </Box>
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:SPACE,
    // alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },

});
