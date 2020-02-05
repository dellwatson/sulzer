import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import { Surface, Snackbar } from 'react-native-paper';

const { width, height } = Dimensions.get('window');
const SPACE = 20

export const HomeScreen = (props) => (
  <View style={styles.container}>
    
    <TouchableOpacity
      onPress={() => props.navigation.navigate('Project')}
    >
      <Surface
        style={styles.surface}>
        <Text>Project</Text>
      </Surface>
    </TouchableOpacity>


    <TouchableOpacity onPress={() => props.navigation.push('Attendance')}>
      <Surface
        style={styles.surface}>
        <Text>Attendance</Text>
      </Surface>
    </TouchableOpacity>


    <TouchableOpacity
      onPress={() => props.navigation.navigate('Travel')}
    >
      <Surface
        style={styles.surface}>
        <Text>Travel</Text>
      </Surface>
    </TouchableOpacity>


    <TouchableOpacity
      onPress={() => props.navigation.navigate('Team')}
    >
      <Surface
        style={styles.surface}>
        <Text>Team / Trans</Text>
      </Surface>
    </TouchableOpacity>





    <Snackbar
          visible={true}
      onDismiss={() => console.log('x')}
      duration={1000}
          action={{
            label: 'Undo',
            onPress: () => {
              // Do something
            },
          }}
        >
          Hey there! I'm a Snackbar.
          Hey there! I'm a Snackbar.
          Hey there! I'm a Snackbar.
          Hey there! I'm a Snackbar.
        </Snackbar>
  </View>
);

const styles = StyleSheet.create({
  surface: {
    elevation: 2,
    margin: SPACE,
    borderRadius: 5,
    padding: 10,
    height: 40,
    width:width/2 - (SPACE*2)
  },
  container: {
    flex: 1,
    paddingTop:SPACE,
    justifyContent: 'center',
    // alignContent: 'center',
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  text: {
    textAlign: 'center',
  },
   bottom: {
    // position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
