import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar, Button, Title } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector } from '../../components/util.component'

const { width, height } = Dimensions.get('window');
const SPACE = 20

export const ProjectScreen = (props) => {
  const [confirm, setConfirm] = useState(null)

  return (
    <View style={styles.container}>
      <Box >
        <HeaderGroup
          withStatus
          title='New Project'
          number='0789'
        />

        <Text>19/3/2019</Text>

        <TitleSmall >Lokasi</TitleSmall>
        <View style={{}}>
          <Text>Lokasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasi bold</Text>
        </View>



        <TitleSmall>Waktu</TitleSmall>
        <View style={{}}>
          <Text>Lokasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasiasi bold</Text>
        </View>

        {!confirm && <Button
          style={{ marginTop: 20 }}
          mode="contained" onPress={() => setConfirm(true)}>
          <Text style={{ color: 'white' }}>Confirm</Text>
        </Button>}
      </Box>

      {confirm &&
        <Box connector>
          <Text>Silahkan Klik menu travel ketika anda sudah mulai menuju lokasi proyek.</Text>
        </Box>
      }
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: SPACE,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },

});
