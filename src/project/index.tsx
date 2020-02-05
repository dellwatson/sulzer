import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar, Button, Title, Caption, Subheading } from 'react-native-paper';
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

        <Caption>19/3/2019</Caption>

        <TitleSmall >Lokasi</TitleSmall>
        <View style={{}}>
          <Subheading>Jl. Sudirman no.12</Subheading>
        </View>



        <TitleSmall>Waktu</TitleSmall>
        <View style={{}}>
          <Subheading>Mulai: 07:08:09 </Subheading>
          <Subheading>Selesai: 09:08:09 </Subheading>
        </View>

        {!confirm && <Button
          style={{ marginTop: 20 }}
          mode="contained" onPress={() => setConfirm(true)}>
          <Text style={{ color: 'white' }}>Confirm</Text>
        </Button>}
      </Box>

      {confirm &&
        <Box connector>
          <Subheading>Silahkan Klik menu travel ketika anda sudah mulai menuju lokasi proyek.</Subheading>
        </Box>
      }
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: SPACE,
  },
  text: {
    textAlign: 'center',
  },

});
