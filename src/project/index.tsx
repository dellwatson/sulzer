import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar, Button, Title, Caption, Subheading } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector } from '../../components/util.component'
import { connect } from 'react-redux'
import { refresh } from '../team/action'
const { width, height } = Dimensions.get('window');
const SPACE = 20

const Screen = (props) => {
  const [confirm, setConfirm] = useState(null)

  const funRefresh = () => {
    props.refresh()
    setConfirm(true)
  }

  return (
    <View style={styles.container}>

      <Box >
        <HeaderGroup
          withStatus
          title={props.session.active_project.title ? props.session.active_project.title : 'Title'}
          number={props.session.active_project.project_code}
        />

        <Caption>{props.session.active_project.timescreate}</Caption>

        {/* <TitleSmall >Lokasi</TitleSmall>
        <View style={{}}>
          <Subheading>Jl. Sudirman no.12</Subheading>
        </View> */}



        <TitleSmall>Waktu</TitleSmall>
        <View style={{}}>
          <Subheading>Mulai: {props.session.active_project.timescreate} </Subheading>
          <Subheading>Selesai: {props.session.active_project.due_date ? props.session.active_project.due_date : '-'} </Subheading>
        </View>

        {!confirm && <Button
          style={{ marginTop: 20 }}
          mode="contained" onPress={() => funRefresh()}>
          <Text style={{ color: 'white' }}>Confirm</Text>
        </Button>}
        <Text>use confirm to clear attendances/travel</Text>
      </Box>

      {confirm &&
        <Box connector>
          <Subheading>Silahkan Klik menu travel ketika anda sudah mulai menuju lokasi proyek.</Subheading>
        </Box>
      }
    </View>
  );
}

const mapStateToProps = state => {
  return {
    session: state.home.DATA
  }
}

export const ProjectScreen = connect(mapStateToProps, { refresh })(Screen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: SPACE,
  },
  text: {
    textAlign: 'center',
  },

});
