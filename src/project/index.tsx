import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import { Surface, Snackbar, Button, Title } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector } from '../../components/util.component'

const { width, height } = Dimensions.get('window');
const SPACE = 20

export const ProjectScreen = (props) => (
  <View style={styles.container}>

    
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



        <TitleSmall>Waktu</TitleSmall>
        <View style={{}}>
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
      <Text>Silahkan Klik menu travel ketika anda sudah mulai menuju lokasi proyek.</Text>
    </Box>

  </View>
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:SPACE,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },

});
