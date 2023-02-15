import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import React, { Component } from 'react';
import FileList from './components/FileList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastFileAdded: null,
    }
  }

  createNewFile = async () => {
    // random-ish filename
    let timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    let rando = ("" + Math.random()).substring(2, 8);
    let rFileName = timestamp + rando + '.txt';

    await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + rFileName,
      "This is the file " + rFileName
    );
    this.setLastFileAdded(rFileName);
  }

  setLastFileAdded(filename) {
    this.setState ({
      lastFileAdded: filename,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text>These are my files.</Text>
          <Button title="Generate"
            onPress={this.createNewFile} />
        </View>
        <View style={styles.container}>
          <FileList
            directoryUri={FileSystem.documentDirectory}
            forceUpdate={this.state.lastFileAdded}
          />
        </View>
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
})
