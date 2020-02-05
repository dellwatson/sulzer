import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar, Button, Title, TextInput, Caption, Subheading } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector, } from '../../components/util.component'
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const SPACE = 20

export const DetailComponent = (props) => {
  const [confirm, setConfirm] = useState(null)
  return (
    <ScrollView style={styles.container}>
      <Box>
        <HeaderGroup
          withStatus
          title='Attendance'
          number='0789'
        />

        <Caption>19/3/2019</Caption>

        <TitleSmall >Hari 1</TitleSmall>
        <Text style={{ color: 'grey' }}>Masuk</Text>
        <TextInput
          mode='outlined'
          label='07:20:20'
        />

        {!confirm && <Button
          style={{ marginTop: 20 }}
          mode="contained" onPress={() => setConfirm(true)}>
          <Text style={{ color: 'white' }}>Confirm</Text>
        </Button>}
      </Box>

      {confirm && <Box connector>
        <Caption>19/3/2019</Caption>

        <View style={{ flexDirection: 'row', }}>
          <View style={{ marginRight: 15, flex: 1 }}>
            <TitleSmall>
              Pulang
            </TitleSmall>
            <TextInput
              mode='outlined'
              label='07:20:20'
            />
          </View>

          <View style={{ flex: 1 }}>
            <TitleSmall>
              Total Jam Kerja
            </TitleSmall>
            <TextInput
              mode='outlined'
              label='9 Jam'
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

        <Subheading style={{ color: 'green' }}>Waktu Lembur 0 Jam</Subheading>

        <View style={{}}>
          <TitleSmall>
            Deskripsi
          </TitleSmall>
          <TextInput
            style={{ minHeight: 70 }}
            mode='outlined'
          />
        </View>

        <Button
          style={{ marginTop: 20 }}
          mode="contained" onPress={() => console.log('as')}>
          <Text style={{ color: 'white' }}>
            Submit
          </Text>
        </Button>
      </Box>}
    </ScrollView>
  );
}



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
