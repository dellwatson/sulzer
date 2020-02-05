import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import { Surface, Snackbar } from 'react-native-paper';

const { width, height } = Dimensions.get('window');
const SPACE = 20

export const TransactionScreen = (props) => (
  <View style={styles.container}>
    <Surface
      style={styles.surface}>
      <Text>Hello1</Text>
    </Surface>
    <Surface style={styles.surface}>
      <Text>Hello1</Text>
    </Surface>
    <Surface
      style={styles.surface}>
      <Text>Hello1</Text>
    </Surface>

    {/* expecptional: prop get AUTH */}
    <Surface style={styles.surface}>
      <Text>Hello1</Text>
    </Surface>



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
