import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PointerPlacerView from './src/PointerPlacerView';

const pointerImage = require('./src/assets/pointer.png')

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <PointerPlacerView
          pointerImage={pointerImage}
          pointerSize={48}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
