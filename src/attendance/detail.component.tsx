import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import { Surface, Snackbar, Button, Title, TextInput } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector, } from '../../components/util.component'
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const SPACE = 20

export const DetailComponent = (props) => (
  <ScrollView style={styles.container}>
    <Box>
      {/* HeaderSurface */}
      <HeaderGroup
        title='New Project'
        number='0789'
      />
        
        <Text>19/3/2019</Text>

      {/* TextGroup */}
        <TitleSmall >Lokasi</TitleSmall>
        <View style={{ }}>
          <Text>Lokasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasi bold</Text>
        </View>


      <Button
        style={{marginTop: 20}}  
        // style={{width: 100, borderRadius:}}
          //ganti jadi auth true ?
          mode="contained" onPress={() => console.log('as') }>
          Confirm
        </Button>
    </Box>

    <Box connector>
        <Text>19/3/2019</Text>
            <View style={{ flexDirection: 'row', }}>
                <View style={{}}>
                    <TitleSmall>
                        Pulang
                    </TitleSmall>
                    <TextInput
                        mode='outlined'
                        label='07:20:20'
                        // value={this.state.text}
                        // onChangeText={text => this.setState({ text })}
                    />
                </View>
              
                <View style={{}}>
                    <TitleSmall>
                        Total Jam Kerja
                    </TitleSmall>
                    <TextInput
                        mode='outlined'
                        label='9 Jam'
                        // value={this.state.text}
                        // onChangeText={text => this.setState({ text })}
                    />
                </View>
            </View>
            
            <View style={{}}>
                <TitleSmall>
                    Jumlah Estimasi Waktu
                </TitleSmall>
                <TextInput
                    mode='outlined'
                    label='9 Jam'
                    // value={this.state.text}
                    // onChangeText={text => this.setState({ text })}
                />
            </View>

            <Text>Waktu Lembur 0 Jam</Text>

            <View style={{}}>
                <TitleSmall>
                    Deskripsi
                </TitleSmall>
                <TextInput
                    style={{height: 60}}
                    mode='outlined'
                    // label='9 Jam'
                    // value={this.state.text}
                    // onChangeText={text => this.setState({ text })}
                />
            </View>

            <Button
                style={{marginTop: 20}}  
                mode="contained" onPress={() => console.log('as') }>
                Submit
            </Button>
    </Box>
  </ScrollView>
);



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
